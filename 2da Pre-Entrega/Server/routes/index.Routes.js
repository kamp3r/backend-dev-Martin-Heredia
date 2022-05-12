import CartRoute from "./cart.Routes.js";
import errorRoutes from "./error.Routes.js";
import persistRoute from "./persist.Routes.js";
import ProductRoute from "./products.Routes.js";

const routerApi = (app)=>{
    app.use('/api/cart', CartRoute);
    app.use('/api/products', ProductRoute);
    app.use('/api/persist', persistRoute);
    app.use('*', errorRoutes)
}

export default routerApi