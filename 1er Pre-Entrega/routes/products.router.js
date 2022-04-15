import { Router } from 'express';
import FileHandler from '../API/fileHandler.js';

const productsRouter = Router()

const storageProducts = new FileHandler('products.json')

// Desc     get product by id.
// route    GET /api/productos/:id
// access   Private

productsRouter.get('/:id?', (req, res)=>{
    const id = req.params.id;
    if(id){
        storageProducts.getById(id)
        .then(product => res.send(product))
        .catch(err => res.status(400).send(err))
    }else{
        storageProducts.getAllFrom()
        .then(products => res.send(products))
        .catch(err => res.json(err))
    }
})

// Desc     create product
// route    POST /api/productos
// access   Private


productsRouter.post('/', (req, res)=>{
    const product = req.body
    if(product.title && product.price && product.thumbnail && product.description && product.code && product.stock){
        storageProducts.save(product)
        res.json(product)
    }else{
        res.status(400).json({error: 'Faltan datos'})
    }
})

// Desc     update product
// route    PUT /api/productos/:id
// access   Private


productsRouter.put('/:id', (req, res)=>{
    const product = storageProducts.updateProductById(req.params.id, req.body);
    (product != undefined) ? res.json(res.body) : res.status(404).json({error: 'No se encontró el producto a modificar'})
})

// Desc     delete product
// route    DELETE /api/productos/:id
// access   Private


productsRouter.delete('/:id', (req, res)=>{
    const product = storageProducts.deleteProductById(req.params.id);
    (product != undefined) ? res.json(product) : res.status(404).json({error: 'No se encontró el producto a borrar'})
})


export default productsRouter