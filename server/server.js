const express = require('express');
const http = require('http');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const User = require('./models/user');
const Message = require('./models/message');
const authRoutes=require('./routes/auth');
const dotenv = require('dotenv');
const router = express.Router();
const messageRoutes = require('./routes/messages');


module.exports = router;
dotenv.config();

const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

app.use('/api',authRoutes);
// ✅ Basic Test Route (put it here, it's okay!)
app.get('/', (req, res) => {
  res.send('🚀 Server is working!');
});

//mongodb connection
mongoose.connect('mongodb://localhost:27017/chat-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB error:', err));

// ✅ Socket Setup
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*", methods: ['GET', 'POST'] }
});

io.on('connection', (socket) => {
  console.log('⚡ New client connected');

  socket.on('send_message', async (data) => {
    const messageData = {
      ...data,
      time: new Date().toLocaleTimeString(),
    };
    try {
      const newMessage = new Message(messageData);
      await newMessage.save();
      io.emit('message', messageData);
      console.log('💾 Message saved:', messageData);
    } catch (error) {
      console.error('❌ Error saving message:', error.message);
    }
  });

  Message.find().then((msgs) => {
    socket.emit('previous_messages', msgs);
  });
});

// === ✅ USERS API ROUTE ===
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


server.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
