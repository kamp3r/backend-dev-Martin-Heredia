const ProductService = require('../services/ProductService');
const OrderService = require('../services/OrderService');
const UserService = require('../services/UserService');
const { verifyToken } = require('../utils/auth/auth');
class CartController {
  constructor() {}

  async createAdd(req, res, next) {
    try {
      const product = await ProductService.getById(req.params.id);
      if (req.cookies.cart == undefined) {
        req.cookies.cart = [];
        req.cookies.cart.push({
          id: product._id,
          title: product.title,
          qty: 1,
          price: product.price,
          thumbnail: product.thumbnail,
        });
      } else {
        const cart = req.cookies.cart;
        let newProduct = true;
        for (let i = 0; i < req.cookies.cart.length; i++) {
          if (req.cookies.cart[i].id === product._id) {
            req.cookies.cart[i].qty++;
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
      res.cookie('cart', req.cookies.cart, {
          httpOnly: true,
        })
        .redirect('back');
    } catch (error) {
      next(error);
    }
  }
  async clearCart(req, res, next) {
    try {
      //clear cart
      req.cookies.cart = [];
      //clear cookie
      res.clearCookie('cart');
      res.redirect('back');
    } catch (err) {
      next(err);
    }
  }
  async deleteProduct(req, res, next) {
    try {
      //get cart from cookie
      const cart = req.cookies.cart;
      //find product index
      const productIndex = cart.findIndex((item) => item.id === req.params.id);
      //remove product
      cart.splice(productIndex, 1);
      //set cookie
      res.cookie('cart', cart, {
        httpOnly: true,
      });
      res.redirect('back');
    } catch (err) {
      next(err);
    }
  }
  async buy(req, res, next) {
    try {
      const cart = req.cookies.cart;
      const token = verifyToken(req.cookies.token)
      const user = await UserService.getBy(token.user);
      const data = {
        userId: user._id,
        products: cart,
        amount: cart.reduce(
          (total, item) => total + item.price * item.qty,
          0
        ),
        address: user.address,
        phone: user.phone,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
      };
      await OrderService.create(data);
      res.clearCookie('cart');
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CartController();
