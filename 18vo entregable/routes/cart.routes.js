const cartRouter = require('express').Router();
const CartController = require('../controllers/Cart.Controllers');

cartRouter.post('/add/:id', CartController.createAdd);

cartRouter.post('/clearCart', CartController.clearCart);

cartRouter.post('/buy', CartController.buy);

cartRouter.delete('/delete/:id', CartController.deleteProduct);

module.exports = cartRouter;
