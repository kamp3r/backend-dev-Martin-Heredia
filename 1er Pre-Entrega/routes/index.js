import productsRouter from './products.router.js';

const routerApi = (app)=>{
    app.use('/api/productos', productsRouter);
    app.use('/api/carrito', cartRouter)
}

export default routerApi;