const ProductRouter = require('express').Router();
const { productHandler } = require('../daos');
const validatorSchema = require('../middlewares/validatorSchema.middleware');
const {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
} = require('../schemas/product.schema');

ProductRouter.get('/:id?', async (req, res, next) => {
  try {
    if (req.params.id) {
      const product = await productHandler.getProductById(req.params.id);
      return res.status(200).json(product);
    } else {
      const products = await productHandler.getProducts();
      if (products.length === 0) {
        return res.status(200).json({ message: 'No products found' });
      }
      return res.status(200).json(products);
    }
  } catch (error) {
    next(error);
  }
});

ProductRouter.post(
  '/',
  validatorSchema(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const product = await productHandler.saveData(req.body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
);

ProductRouter.patch('/:id', async (req, res, next) => {
  try {
    const data = req.body;
    const updatedAt = new Date();
    const product = await productHandler.updateProduct(req.params.id, {
      ...data,
      updatedAt,
    });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

ProductRouter.delete('/:id', async (req, res, next) => {
  try {
    const product = await productHandler.deleteProduct(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = ProductRouter;
