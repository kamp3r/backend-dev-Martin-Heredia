const ChatHandler = require ("./chat/ChatHandler.js");
const UserHandler = require("./user/userHandler.js");

const chatHandler = new ChatHandler();
const userDao = new UserHandler();

module.exports= {chatHandler, userDao};