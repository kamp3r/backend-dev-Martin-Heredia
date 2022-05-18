import productFakeRoute from "./products.Routes.js";

const routerApi = (app) =>{
    app.use('/api/products-test', productFakeRoute);
}

export default routerApi;
