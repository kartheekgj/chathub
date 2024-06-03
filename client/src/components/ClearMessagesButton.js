import React from "react";
import { useMessages } from "../providers/MessageProvider";

const ClearMessagesButton = () => {
  const { clearAllMessages, messages } = useMessages();

  const handleClearMessages = () => {
    clearAllMessages();
  };

  return (
   <>
    {
      messages && messages.length === 0? null : (
        <button className="home-link delete-link" onClick={handleClearMessages}>
          Clear All Messages
        </button>
      )
    }
   </>
  );
};

export default ClearMessagesButton;
