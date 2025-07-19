const express = require("express");
const router = express.Router();
const Message = require("../models/message");

// POST: Send a new message
router.post("/", async (req, res) => {
  try {
    const { sender, receiver, text, user, time } = req.body;

    const newMessage = new Message({
      sender,
      receiver,
      text,
      user,
      time,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: "Error sending message", error: err });
  }
});

// GET: Get all messages between two users
router.get("/:sender/:receiver", async (req, res) => {
  try {
    const { sender, receiver } = req.params;

    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages", error: err });
  }
});

module.exports = router;