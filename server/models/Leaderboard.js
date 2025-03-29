const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    }
});  


const LeaderboardModel = mongoose.model('leaderboard', LeaderboardSchema);

module.exports = LeaderboardModel