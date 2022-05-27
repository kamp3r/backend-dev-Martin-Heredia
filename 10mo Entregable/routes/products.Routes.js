import express from 'express';
import { productGenerator } from '../daos/products/productGeneratorTest.js';

const productFakeRoute = express.Router();

productFakeRoute.get('/', (req, res) => {
    const userName = req.session.user;
    if(userName){
        const lista = productGenerator(5);
        res.render ('home', {userName, lista});
    }else{
        res.redirect('/login');
    }
    
})



export default productFakeRoute;