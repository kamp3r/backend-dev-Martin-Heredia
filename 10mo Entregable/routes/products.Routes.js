import express from 'express';
import { productGenerator } from '../daos/products/productGeneratorTest.js';

const productFakeRoute = express.Router();

productFakeRoute.get('/', (req, res) => {
    if(req.session.user){
        const lista = productGenerator(5);
        res.render ('prods', {lista});
    }else{
        res.redirect('/login');
    }
    
})



export default productFakeRoute;