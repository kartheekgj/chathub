import React from "react";
import ApplicationRouter from "./routes/ApplicationRouter";
import { FriendProvider } from "./providers/FriendProvider";
import { MessageProvider } from "./providers/MessageProvider";
import "./App.css";
function App() {
  return (
    <FriendProvider>
      <MessageProvider>
        <ApplicationRouter />
      </MessageProvider>
    </FriendProvider>
  );
}

export default App;
