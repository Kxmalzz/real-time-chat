const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login route

const JWT_SECRET = 'secretkey123'; // replace with env var in production

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🔐 Basic email+password match (you can use bcrypt later)
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // ✅ Create token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: '1d',
    });

    // ✅ Send token and username
    res.status(200).json({
      message: 'Login successful',
      token,
      username: user.username, // or user.username if that’s the field name
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/messages/:user1/:user2', async (req, res) => {
  const { user1, user2 } = req.params;
  const messages = await Message.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 },
    ],
  }).sort({ timestamp: 1 });

  res.json(messages);
});

module.exports = router;
