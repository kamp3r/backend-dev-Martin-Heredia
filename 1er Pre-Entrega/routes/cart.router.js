import { Router } from 'express';


const cartRouter = Router()



// Desc     create cart
// route    POST /api/carrito/
// access   Private

cartRouter.post('/',(req,res)=>{

})

// Desc     delete cart by id
// route    DELETE /api/carrito/:id
// access   Private

cartRouter.delete('/:id',(req,res)=>{

})

// Desc     get cart by id.
// route    GET /api/carrito/:id/productos
// access   Private

cartRouter.get('/:id/productos',(req,res)=>{
})

// Desc     add product to cart by id
// route    POST /api/carrito/:id/productos
// access   Private

cartRouter.post('/:id/productos',(req,res)=>{

})

// Desc     delete cart by idCart and idProduct
// route    DELETE /api/carrito/:idCart/productos/:idProduct
// access   Private

cartRouter.delete('/:id/productos/:idProduct',(req,res)=>{

})

export default cartRouter