import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ClearMessagesButton from "./ClearMessagesButton";

const FriendList = ({ friends, selectedFriend, setSelectFriend }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedFriendId, setSelectedFriendId] = useState(
    selectedFriend?.id || null
  );
  const handleFriendClick = (friend) => {
    setSelectFriend(friend);
    setSelectedFriendId(friend.id);
    navigate("/chat");
  };

  const handleNavigationClick = () => {
    setSelectedFriendId(null);
    navigate("/");
    setSelectFriend(null);
  };

  return (
    <div className="friend-list">
      <h2>Friends List</h2>
      {friends.length === 0 ? (
        <p>Not connected</p>
      ) : (
        friends.map((friend) => (
          <div
            key={friend.id}
            onClick={() => handleFriendClick(friend)}
            className={`friend-item ${
              selectedFriendId === friend.id ? "selected" : ""
            }`}
          >
            {friend.name}
          </div>
        ))
      )}
      {location.pathname === "/chat" && (
        <div>
          <div className="home-link" onClick={() => handleNavigationClick()}>
            Home
          </div>
          <div>
            <ClearMessagesButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendList;
