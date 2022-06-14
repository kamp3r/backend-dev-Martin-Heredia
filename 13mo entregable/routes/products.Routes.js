import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { productGenerator } from '../daos/products/productGeneratorTest.js';

const productFakeRoute = express.Router();

productFakeRoute.get('/', isAuthenticated, (req, res, next) => {
  const listElem = productGenerator(5);
  res.render('home', {listElem });
});

export default productFakeRoute;
