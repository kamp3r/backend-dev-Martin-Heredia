const cartRouter = require('express').Router();
const { productHandler, cartHandler } = require('../daos/');

cartRouter.post('/add/:id', async (req, res, next) => {
  try {
    const product = await productHandler.getProductById(req.params.id);
    if (req.session.cart == undefined) {
      req.session.cart = [];
      req.session.cart.push({
        id: product._id,
        title: product.title,
        qty: 1,
        price: product.price,
        thumbnail: product.thumbnail,
      });
    } else {
      const cart = req.session.cart;
      let newProduct = true;
      for (let i = 0; i < req.session.cart.length; i++) {
        if (req.session.cart[i].id === product._id) {
          req.session.cart[i].qty++;
          newProduct = false;
          break;
        }
      }
      if (newProduct) {
        cart.push({
          id: product._id,
          title: product.title,
          qty: 1,
          price: product.price,
          thumbnail: product.thumbnail,
        });
      }
    }
    res.redirect('back');
  } catch (error) {
    next(error);
  }
});

cartRouter.post('/clearCart', async (req, res, next) => {
    try {
        req.session.cart = [];
        res.redirect('back');
    } catch (error) {
        next(error);
    }
});

cartRouter.post('/buy', async (req, res, next) => {
    try {
        const cart = req.session.cart;
        const user = req.user;
        const data = {
            user: user._id,
            products: cart,
            amount: cart.reduce((acc, cur) => acc + cur.price * cur.qty, 0),
            address: req.user.address,
            phone: req.user.phone,
            name: req.user.name,
            lastName: req.user.lastName,
            status: 'pending',
        };
        await cartHandler.createCart(data);
        req.session.cart = [];
        res.redirect('/');
    } catch (error) {
        next(error);
    }
});

cartRouter.delete('/delete/:id', async (req, res, next) => {
    try {
        const cart = req.session.cart;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === req.params.id) {
                cart.splice(i, 1);
                break;
            }
        }
        res.redirect('back');
    } catch (error) {
        next(error);
    }
})


module.exports = cartRouter;
