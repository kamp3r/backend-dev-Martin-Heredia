import { Router } from 'express';
import ApiRestful from '../API/functions.js';

const productsRouter = Router()

const object = new ApiRestful()

// Desc     get product by id.
// route    GET /api/productos/:id
// access   Private

productsRouter.get('/:id?', (req, res)=>{
    const id = req.params.id;
    if(id){
        const product = object.getObjectById(id);
        (product.length > 0) ? res.json(product) : res.status(404).json({error: 'No se encontró el producto'})
    }else{
        const product = object.getObjects();
        (product.length > 0) ? res.json(product) : res.status(404).json({error: 'No se encontraron los productos'})
    }
})

// Desc     create product
// route    POST /api/productos
// access   Private


productsRouter.post('/', (req, res)=>{
    const product = req.body
    if(product.title && product.price && product.thumbnail){
        object.addObject(product)
        res.json(product)
    }else{
        res.status(400).json({error: 'Faltan datos'})
    }
})

// Desc     update product
// route    PUT /api/productos/:id
// access   Private


productsRouter.put('/:id', (req, res)=>{
    const product = object.updateObjectById(req.params.id, req.body);
    (product != undefined) ? res.json(product) : res.status(404).json({error: 'No se encontró el producto a borrar'})
})

// Desc     delete product
// route    DELETE /api/productos/:id
// access   Private


productsRouter.delete('/:id', (req, res)=>{
    const product = object.deleteObjectById(req.params.id);
    (product != undefined) ? res.json(product) : res.status(404).json({error: 'No se encontró el producto a borrar'})
})


export default productsRouter