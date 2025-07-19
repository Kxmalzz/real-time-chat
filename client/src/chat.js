// src/chat.js
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Sidebar from './components/Sidebar';
import ChatBox from './components/ChatBox';

const socket = io('http://localhost:5000');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState(sessionStorage.getItem("username") || " ");
  const [joined, setJoined] = useState(false);
  const chatEndRef = useRef(null);
  const [selectedUser, setSelectedUser] = useState(null);


  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('previous_messages', (msgs) => {
      setMessages(msgs);
    });

    return () => {
      socket.off('message');
      socket.off('previous_messages');
    };
  }, []);

  useEffect(() => {
    socket.on('connect', () => console.log('✅ Connected to server'));
    socket.on('disconnect', () => console.log('❌ Disconnected from server'));

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) setJoined(true);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('send_message', {
        text: message,
        user: username,
        
        time: new Date().toLocaleTimeString(),
      });
      setMessage('');
    }
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("username");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (!joined) {
  return (
    <div className="chat-layout" style={{ display: 'flex', height: '100vh' }}>

      <Sidebar onSelectUser={(user) => setSelectedUser(user)} />
<ChatBox toUser={selectedUser}
        messages={messages}
        message={message}
        setMessage={setMessage}
        username={username}
        handleSendMessage={handleSendMessage}
        chatEndRef={chatEndRef}
        
      />
    </div>
  );
};};

export default Chat;