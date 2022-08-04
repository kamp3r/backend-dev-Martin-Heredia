const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: { type: String },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    phone: { type: String, required: true },
    password: { type: String, required: true},
    picture: { data: Buffer, type: String },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    createdAt: { type: Date},
})

module.exports = {
    User: mongoose.model('User', userSchema),
};