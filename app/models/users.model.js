const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: String,
    password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('user', userSchema);