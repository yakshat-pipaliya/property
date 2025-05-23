const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Constants = require('../Message/message');

const userSchema = new Schema({
    Email: {
        type: String,
        trim: true,
        unique: [true, Constants.EMAIL_ALREADY_EXISTS], 
        required: [true, Constants.EMAIL_REQUIRED], 
    },
    Phone: {
        type: String,
        trim: true,
        unique: [true, Constants.PHONE_ALREADY_EXISTS],
        required: [true, Constants.PHONE_REQUIRED], 
    },
    Password: {
        type: String,
        required: [true, Constants.PASSWORD_REQUIRED],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});

module.exports = mongoose.model('User', userSchema);
