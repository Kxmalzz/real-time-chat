// ChatBox.js
import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';

const ChatBox = ({
  toUser,
  messages,
  message,
  setMessage,
  username,
  handleSendMessage,
  chatEndRef
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={{ flex: 2, padding: 20, display: 'flex', flexDirection: 'column', background: '#a6acaf' }}>
      <h2>Welcome to Chatroom 😎, {username}</h2>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          border: '1px solid #ccc',
          backgroundColor: '#f4f6f7',
          padding: '1rem',
          marginBottom: 10,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              marginBottom: 10,
              textAlign: msg.user === username ? 'right' : 'left',
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{msg.user}</div>
            <div
              style={{
                display: 'inline-block',
                backgroundColor: msg.user === username ? '#e8daef' : '#aed6f1',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '10px',
                maxWidth: '70%',
              }}
            >
              {msg.text}
            </div>
            <div style={{ fontSize: 12, color: '#888' }}>{msg.time}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSendMessage} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          style={{
            marginRight: 8,
            padding: '0 10px',
            fontSize: 20,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ☺
        </button>
        {showEmojiPicker && (
          <div style={{ position: 'absolute', bottom: '60px', zIndex: 1000 }}>
            <EmojiPicker onEmojiClick={handleEmojiClick} previewConfig={{ showPreview: false }} />
          </div>
        )}
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flex: 1, padding: 10 }}
        />
        <button type="submit" style={{ padding: '10px 15px', marginLeft: 5 }}>Send</button>
      </form>
    </div>
  );
};

export default ChatBox;