const productFakeRoute =  require("./products.Routes.js");
const loginRouter =  require("./login.Routes.js");
const logoutRouter =  require("./logout.Routes.js");
const registerRouter =  require("./register.Routes.js");
const initialRouter =  require("./initial.Routes.js");
const processRouter =  require("./process.Routes.js");
const random =  require("./randoms.Routes.js");


const routerApi = (app) =>{
    app.use('/home', productFakeRoute);
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
    app.use('/logout', logoutRouter);
    app.use('/', initialRouter)
    app.use('/', processRouter)
    app.use('/', random)
}

module.exports = routerApi;
