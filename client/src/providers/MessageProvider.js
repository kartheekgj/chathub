import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useFriends } from "./FriendProvider";

const MessageContext = createContext();

export const useMessages = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const { selectedFriend } = useFriends();
  const [messages, setMessages] = useState([]);
  const currentUser = useRef("You");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedFriend) {
      fetch(`/api/messages/${selectedFriend.id}`)
        .then((res) => res.json())
        .then((data) => setMessages(data));
    }
  }, [selectedFriend]);

  const sendMessage = (text) => {
    const message = {
      sender: currentUser.current,
      text,
      timestamp: new Date().toISOString(),
    };
    setIsLoading(true);
    
    setMessages([...messages, message]);
    fetch(`/api/messages/${selectedFriend.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    })
      .then((res) => res.json())
      .then((data) => {
        const replyText = data.reply.text;
        const replyMessage = {
          sender: data.reply.sender,
          text: replyText,
          timestamp: new Date().toISOString(),
        };
        setMessages((prevMessages) => [...prevMessages, replyMessage]);
        setIsLoading(false);
      });
  };

  const clearAllMessages = async() => {
    setIsLoading(true);
    await fetch(`/api/messages/clearall`,{
      method: "DELETE"
    });
    setIsLoading(false);
    setMessages([]);
  }

  return (
    <MessageContext.Provider value={{ messages, sendMessage, isLoading, clearAllMessages }}>
      {children}
    </MessageContext.Provider>
  );
};
