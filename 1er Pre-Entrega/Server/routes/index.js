import productsRouter from './products.router.js';
import cartRouter from './cart.router.js';
import errorRoutes from './error.router.js';

const routerApi = (app)=>{
    app.use('/api/productos', productsRouter);
    app.use('/api/carrito', cartRouter)
    app.use('*', errorRoutes)
}

export default routerApi;