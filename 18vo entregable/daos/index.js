const ChatHandler = require('./chat/ChatHandler');
const UserHandler = require('./users/UserHandler');
const ProductHandler = require('./products/ProductHandler');
const CartHandler = require('./cart/CartHandler');

const chatHandler = new ChatHandler();
const userHandler = new UserHandler();
const productHandler = new ProductHandler();
const cartHandler = new CartHandler();

module.exports = { chatHandler, userHandler, productHandler, cartHandler };
