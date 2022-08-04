const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  author: {
    id: String,
    name: String,
    lastname: String,
    age: Number,
    nickname: String,
    avatar: String,
  },
  messageText: String,
  date: String,
  id: String,
},
{ versionKey: false }
);

module.exports = {
  Message: mongoose.model('Message', messageSchema),
};