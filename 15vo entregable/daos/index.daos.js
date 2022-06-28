const ChatHandler = require ("./chat/ChatHandler.js");
const UserHandler = require("./user/userHandler.js");
const ProductHandler = require("./products/ProductHandler.js");

const chatHandler = new ChatHandler();
const userDao = new UserHandler();
const productHandler = new ProductHandler();

module.exports= {chatHandler, userDao, productHandler};