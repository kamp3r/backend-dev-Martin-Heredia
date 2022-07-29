const ProductRouter = require('express').Router();
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/Product.Controllers');
const { uploadImgProd } = require("../middlewares/multer.middleware");
const validatorSchema = require('../middlewares/validatorSchema.middleware');
const {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
} = require('../schemas/product.schema');

ProductRouter.get('/:id?', getProducts)
ProductRouter.post('/',uploadImgProd.single('thumbnail'), validatorSchema(createProductSchema),createProduct)

ProductRouter.patch('/edit/:id',uploadImgProd.single('thumbnail'), validatorSchema(getProductSchema),validatorSchema(updateProductSchema), updateProduct );

ProductRouter.delete('/:id', deleteProduct );

module.exports = ProductRouter;
