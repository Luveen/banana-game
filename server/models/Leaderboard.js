const mongoose = require("mongoose");

const LeaderboardSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure usernames are unique
  },
  score: {
    type: Number,
    required: true,
    default: 0, // Default score is 0 for new entries
  },
});

const LeaderboardModel = mongoose.model("leaderboard", LeaderboardSchema);

module.exports = LeaderboardModel;

