const ProductRouter = require('./product.routes');
const AuthRouter = require('./auth.routes');
const ejsRouter = require('./ejs.routes');
const errorRouter = require('./error.routes');
const cartRouter = require('./cart.routes');

const routerAPI = (app) => {
  app.use('/api/products', ProductRouter);
  app.use('/auth', AuthRouter);
  app.use('/', ejsRouter);
  app.use('*', errorRouter);
  app.use('/cart', cartRouter);
};

module.exports = routerAPI;