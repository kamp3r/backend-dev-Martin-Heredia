const routerApi = (app)=>{
    app.use('/', require('./products.router.js'));
}

module.exports = routerApi;