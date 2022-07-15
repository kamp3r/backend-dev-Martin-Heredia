const ProductRouter = require('express').Router();
const { productHandler } = require('../daos');
const { uploadImgProd } = require("../middlewares/multer.middleware");
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

ProductRouter.post('/',uploadImgProd.single('thumbnail'), validatorSchema(createProductSchema),async (req, res, next) => {
    try {
      console.log(req.body);
      const data = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        thumbnail: req.file.filename,
        code: req.body.code,
        stock: req.body.stock,
      };
      await productHandler.createProduct(data);
      res.status(201).redirect('/admin');
    } catch (error) {
      next(error);
    }
  }
);

ProductRouter.patch('/edit/:id',uploadImgProd.single('thumbnail'), validatorSchema(getProductSchema),validatorSchema(updateProductSchema), async (req, res, next) => {
  try {
    const productInfo = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      code: req.body.code,
      stock: req.body.stock,
    }
    if(req.file){
      productInfo.thumbnail = req.file.filename
  }
    const updatedAt = new Date();
    await productHandler.updateProduct(req.params.id, {
      ...productInfo,
      updatedAt,
    });
    res.status(200).redirect('/admin');
  } catch (error) {
    next(error);
  }
});

ProductRouter.delete('/:id', async (req, res, next) => {
  try {
    const product = await productHandler.deleteProduct(req.params.id);
    res.status(200).redirect('/admin')
  } catch (error) {
    next(error);
  }
});

module.exports = ProductRouter;
