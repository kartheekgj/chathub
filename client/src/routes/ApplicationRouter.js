import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Chat from "../components/Chat";
import FriendList from "../components/FriendsList";
import { useFriends } from "../providers/FriendProvider";
import { useMessages } from "../providers/MessageProvider";

const ApplicationRouter = () => {
  const { friends, setSelectedFriend, selectedFriend } = useFriends();
  const { messages, sendMessage, isLoading } = useMessages();
  return (
    <Router>
      <div className="App">
        <FriendList friends={friends} setSelectFriend={setSelectedFriend} selectedFriend={selectedFriend} />    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/chat"
            element={
              <Chat
                selectedFriend={selectedFriend}
                messages={messages}
                sendMessage={sendMessage}
                isLoading={isLoading}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default ApplicationRouter;
