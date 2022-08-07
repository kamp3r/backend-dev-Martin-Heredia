const ProductRouter = require('express').Router();
const ProductController = require('../controllers/Product.controller');
const { uploadImgProd } = require("../middlewares/multer.middleware");

ProductRouter.get('/:id?', ProductController.getProducts)
ProductRouter.post('/',uploadImgProd.single('thumbnail'), ProductController.createProduct)

ProductRouter.patch('/edit/:id',uploadImgProd.single('thumbnail'), ProductController.updateProduct);

ProductRouter.delete('/:id', ProductController.deleteProduct );



module.exports = ProductRouter;
