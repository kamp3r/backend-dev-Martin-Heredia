import productsRouter from './products.router.js';
import cartRouter from './cart.router.js';

const routerApi = (app)=>{
    app.use('/api/productos', productsRouter);
    app.use('/api/carrito', cartRouter)
}

export default routerApi;