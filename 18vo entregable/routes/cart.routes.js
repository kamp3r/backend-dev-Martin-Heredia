const cartRouter = require('express').Router();
const { createAdd, clearCart, buy, deleteProduct } = require('../controllers/Cart.Controllers');

cartRouter.post('/add/:id', createAdd);


cartRouter.post('/clearCart', clearCart);

cartRouter.post('/buy', buy);

cartRouter.delete('/delete/:id', deleteProduct);

module.exports = cartRouter;
