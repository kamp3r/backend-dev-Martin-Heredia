const express = require('express');
const { Router } = express;

const router = Router()

const ApiRestful = require('../API/functions.js');
const object = new ApiRestful()

// Desc     get products
// route    GET /api/productos
// access   Private

router.get('/', (req, res)=>{
    const products = object.getObjects();
    return res.render('index', { products });
})

// Desc     get product by id.
// route    GET /api/productos/:id
// access   Private

router.get('/productos', (req, res)=>{
    const listElem = object.getObjects();
    return res.render('products', {listElem});
})

// Desc     create product
// route    POST /api/productos
// access   Private


router.post('/productos', (req, res)=>{
    const products = object.addObject(req.body)
    const listElem = object.getObjects();
    res.render('products', {listElem});
})

// Desc     update product
// route    PUT /api/productos/:id
// access   Private


router.put('/:id', (req, res)=>{
    const product = object.updateObjectById(req.params.id, req.body);
    (product != undefined) ? res.json(product) : res.status(404).json({error: 'No se encontró el producto a borrar'})
})

// Desc     delete product
// route    DELETE /api/productos/:id
// access   Private


router.delete('/:id', (req, res)=>{
    const product = object.deleteObjectById(req.params.id);
    (product != undefined) ? res.json(product) : res.status(404).json({error: 'No se encontró el producto a borrar'})
})


module.exports = router;