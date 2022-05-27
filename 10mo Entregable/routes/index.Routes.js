import productFakeRoute from "./products.Routes.js";
import loginRouter from "./login.Routes.js";

const routerApi = (app) =>{
    app.use('/api/products-test', productFakeRoute);
    app.use('/', loginRouter);
}

export default routerApi;
