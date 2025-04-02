const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const BalloongameModel = require("./models/balloongame");
const LeaderboardModel = require("./models/Leaderboard");

// const { response } = require('express');

const app = express();
app.use(express.json());
app.use(cors());

//creating connection with MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/balloongame", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  BalloongameModel.findOne({ username: username }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Sucessfully logged in");
      } else {
        res.json("Invalid credentials");
      }
    } else {
      res.json("User does not exist");
    }
  });
});

app.post("/register", (req, res) => {
  BalloongameModel.create(req.body)
    .then((signup) => res.json(signup))
    .catch((err) => res.json(err));
});

// score needs to be in decending order
app.get("/leaderboard", (req, res) => {
  LeaderboardModel.find(req.body)
    .sort({ score: -1 }) // Sort by score in descending order
    .limit(10) // Limit to top 10 scores
    .then((entries) => res.json(entries))
    .catch((err) => res.json(err));
});

// Update the leaderboard with the user's score
app.post("/leaderboard", async (req, res) => {
  const { username, score} = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  } 

  try {
    // Increment the score by 10 for the given username
    const updatedEntry = await LeaderboardModel.findOneAndUpdate(
      { username }, // Find by username
      { $inc: { score: 10 } }, // Increment the score by 10
      { new: true, upsert: true, setDefaultsOnInsert: true } // Create a new entry if the user doesn't exist
    );

    res.json(updatedEntry);
  } catch (err) {
    console.error("Error updating leaderboard:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on 3001");
});
