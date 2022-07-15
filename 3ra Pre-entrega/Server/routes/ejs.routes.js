const ejsRouter = require('express').Router();
const isAuthenticated = require('../middlewares/auth.middleware');
const { productHandler } = require('../daos');

ejsRouter.get('/', (req, res) => {
  res.redirect('/home');
});

ejsRouter.get('/home', (req, res) => {
  res.render('home', {
    title: 'home',
    user: req.user,
    cart: req.session.cart,
  });
});

ejsRouter.get('/products', async (req, res) => {
  const products = await productHandler.getProducts();
  res.render('products', {
    products,
    title: 'products',
    user: req.user,
    cart: req.session.cart,
  });
});

ejsRouter.get('/register', (req, res) => {
  res.render('register', {
    title: 'register',
    user: req.user,
    cart: req.session.cart,
  });
});

ejsRouter.get('/login', (req, res) => {
  res.render('login', {
    title: 'login',
    user: req.user,
    cart: req.session.cart,
  });
});

ejsRouter.get('/profile', isAuthenticated, (req, res) => {
  res.render('profile', {
    title: 'profile',
    user: req.user,
    cart: req.session.cart,
  });
});

ejsRouter.get('/editProfile', isAuthenticated, (req, res) => {
  res.render('edit', {
    PATCH: true,
    title: 'editProfile',
    user: req.user,
    cart: req.session.cart,
  });
});

ejsRouter.get('/logout', isAuthenticated, (req, res) => {
  res.clearCookie('turbinasunmira');
  res.render('logout', {
    title: 'logout',
    user: req.user,
    cart: req.session.cart,
  });
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
});

ejsRouter.get('/about', (req, res) => {
  res.render('about', {
    title: 'about',
    user: req.user,
    cart: req.session.cart,
  });
});

ejsRouter.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'contact',
    user: req.user,
    cart: req.session.cart,
  });
});

ejsRouter.get('/detail/:id', async (req, res) => {
  const product = await productHandler.getProductById(req.params.id);
  res.render('productDetail', {
    product,
    title: `${product.name}`,
    user: req.user,
    cart: req.session.cart,
  });
});

ejsRouter.get('/myCart/checkout', async (req, res) => {
  if(req.session.cart == undefined){
    req.session.cart = [];}
  res.render('checkout', {
    title: 'checkout',
    user: req.user,
    cart: req.session.cart,
  });
});

ejsRouter.get('/admin', async (req, res) => {
  const products = await productHandler.getProducts();
  res.render('admin', {
    products,
    title: 'admin',
    user: req.user,
    cart: req.session.cart,
  });
});

ejsRouter.get('/admin/addProduct', async (req, res) => {
  res.render('addProducts', {
    title: 'addProducts',
    user: req.user,
    cart: req.session.cart,
  });
});

ejsRouter.get('/editProduct/:id', async (req, res) => {
  const product = await productHandler.getProductById(req.params.id);
  res.render('updateProd', {
    PATCH: true,
    product,
    title: 'updateProd',
    user: req.user,
    cart: req.session.cart,
  });
});

module.exports = ejsRouter;
