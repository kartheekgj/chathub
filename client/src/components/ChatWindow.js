import React from 'react';

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index} className="message">
          <span><strong>{msg.sender}:</strong> {msg.text}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
