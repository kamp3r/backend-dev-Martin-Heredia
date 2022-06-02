import productFakeRoute from "./products.Routes.js";
import loginRouter from "./login.Routes.js";
import logoutRouter from "./logout.Routes.js";
import registerRouter from "./register.Routes.js";
import initialRouter from "./initial.Routes.js";


const routerApi = (app) =>{
    app.use('/home', productFakeRoute);
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
    app.use('/logout', logoutRouter);
    app.use('/', initialRouter)
}

export default routerApi;
