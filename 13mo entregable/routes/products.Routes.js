const productFakeRoute = require('express').Router();
const { isAuthenticated } = require('../middlewares/authMiddleware.js');
const { productGenerator } = require('../daos/products/productGeneratorTest.js');


productFakeRoute.get('/', isAuthenticated, (req, res, next) => {
  const listElem = productGenerator(5);
  res.render('home', {listElem });
});

module.exports = productFakeRoute;
