const ChatHandler = require('./chat/ChatHandler');
const UserHandler = require('./users/UserHandler');
const ProductHandler = require('./products/ProductHandler');

const chatHandler = new ChatHandler();
const userHandler = new UserHandler();
const productHandler = new ProductHandler();

module.exports = { chatHandler, userHandler, productHandler };
