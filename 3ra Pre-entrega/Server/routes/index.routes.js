const ProductRouter = require('./product.routes');

const routerAPI = (app) => {
  app.use('/api/products', ProductRouter);
};

module.exports = routerAPI;