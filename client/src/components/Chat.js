import React from 'react';
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";

const Chat = ({selectedFriend, messages, sendMessage, isLoading}) => {
    return (
        <div>
            <h3>You are chatting with {selectedFriend && selectedFriend.name}</h3>
            {selectedFriend && <ChatWindow messages={messages} />}
            {selectedFriend && <MessageInput sendMessage={sendMessage} isLoading={isLoading}/>}
        </div>
    )
}

export default Chat;