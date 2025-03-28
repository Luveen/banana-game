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

const BalloongameModel = mongoose.model('signup', BalloongameSchema);
module.exports = BalloongameModel;