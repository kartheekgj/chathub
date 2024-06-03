const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const friendsFilePath = path.join(__dirname, "data", "friendslist.json");
const messagesFilePath = path.join(__dirname, "data", "chathistory.json");
const repliesFilePath = path.join(__dirname, "data", "replies.json");

const generateRandomReplies = () => {
  const replies = readJSONFile(repliesFilePath)["replies"];
  return replies[Math.floor(Math.random() * replies.length)];
};
const readJSONFile = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const writeJSONFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

app.get("/api/friends", (req, res) => {
  const friends = readJSONFile(friendsFilePath);
  res.json(friends);
});

app.get("/api/messages/:friendId", (req, res) => {
  const friendId = req.params.friendId;
  const messages = readJSONFile(messagesFilePath);
  res.json(messages[friendId] || []);
});

app.delete("/api/messages/clearall", (req, res) => {
  const messages = readJSONFile(messagesFilePath);

  for (let friendId in messages) {
    messages[friendId] = [];
  }

  writeJSONFile(messagesFilePath, messages);
  res.json({ message: "All messages cleared successfully" });
});

app.post("/api/messages/:friendId", async (req, res) => {
  const friendId = req.params.friendId;
  const message = req.body;
  const messages = await readJSONFile(messagesFilePath);
  const friends = await readJSONFile(friendsFilePath);
  const [currFriend] = friends.filter((val) => val.id == friendId);
  
  if (!messages[friendId]) {
    messages[friendId] = [];
  }
  messages[friendId].push(message);
  const friendReply = {
    sender: currFriend?.name || `Bot ${friendId}`,
    text: generateRandomReplies(),
    timestamp: new Date().toISOString(),
  };
  messages[friendId].push(friendReply);

  writeJSONFile(messagesFilePath, messages);
  await delay(2000);
  res.status(201).json({ sent: message, reply: friendReply });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
