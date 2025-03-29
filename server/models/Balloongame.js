const mongoose = require('mongoose');

const BalloongameSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
});

// const LeaderboardSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     score: {
//         type: Number,
//         required: true
//     }
// });     



const BalloongameModel = mongoose.model('signup', BalloongameSchema);
// const LeaderboardModel = mongoose.model('leaderboard', LeaderboardSchema);

module.exports = BalloongameModel;
// module.exports = LeaderboardModel
