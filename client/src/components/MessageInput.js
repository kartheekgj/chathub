import React, { useState } from "react";

const MessageInput = ({ sendMessage, isLoading }) => {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="message-input">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          isLoading ? "Waiting for response..." : "type a message..."
        }
      />
      <button type="submit" disabled={isLoading}>
        Send
      </button>
    </form>
  );
};

export default MessageInput;
