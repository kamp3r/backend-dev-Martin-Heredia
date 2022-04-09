import { Router } from 'express';
import ApiRestful from '../API/functions.js';

const cartRouter = Router()

const object = new ApiRestful()

// Desc     create cart
// route    POST /api/carrito/
// access   Private


// Desc     delete cart by id
// route    DELETE /api/carrito/:id
// access   Private


// Desc     get cart by id.
// route    GET /api/carrito/:id/productos
// access   Private


// Desc     add product to cart by id
// route    POST /api/carrito/:id/productos
// access   Private

// Desc     delete cart by idCart and idProduct
// route    DELETE /api/carrito/:idCart/productos/:idProduct
// access   Private