const productFakeRoute = require('express').Router();
const { isAuthenticated } = require('../middlewares/authMiddleware.js');
const { productHandler } = require('../daos/index.daos.js');


productFakeRoute.get('/', isAuthenticated, async (req, res, next) => {
  const listElem = await productHandler.getAllProducts();
  res.render('home', {listElem });
});

module.exports = productFakeRoute;
