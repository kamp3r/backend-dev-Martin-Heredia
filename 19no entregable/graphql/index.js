const { graphqlHTTP } = require('express-graphql');
const schema = require('./productSchema');
const { createProduct, getProducts, getProductBy, updateProduct, deleteProduct } = require('./actions');

module.exports = (app) => {
  app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      rootValue: {
        getProductBy,
        createProduct,
        getProducts,
        updateProduct,
        deleteProduct,
      },
      graphiql: true,
    })
  );
};
