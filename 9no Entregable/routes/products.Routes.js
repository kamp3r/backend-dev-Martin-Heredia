import express from 'express';
import { productGenerator } from '../daos/products/productGeneratorTest.js';

const productFakeRoute = express.Router();

productFakeRoute.get('/', (req, res) => {
    res.json(productGenerator(5));
})



export default productFakeRoute;