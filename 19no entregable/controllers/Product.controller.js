const logger = require('../utils/logger/logger');
const ProductService = require('../services/ProductService');

class ProductController {
  constructor() {}

  async getProducts(req, res, next) {
    try {
      if (req.params.id) {
        const product = await ProductService.getById(req.params.id);
        return res.status(200).json(product);
      } else {
        const products = await ProductService.getAll();
        if (products.length === 0) {
          return res.status(200).json({ message: 'No products found' });
        }
        return res.status(200).json(products);
      }
    } catch (err) {
      logger.error('Error retrieving products');
    }
  }
  async createProduct(req, res, next) {
    try {
      if(!req.file){
        const product = await ProductService.create(req.body);
        return res.status(201).json(product).redirect('/admin');
      }else{
      const data = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        thumbnail: req.file.filename,
        code: req.body.code,
        stock: req.body.stock,
      };
       const product = await ProductService.create(data);
      res.status(201).json(product).redirect('/admin');
    }
    } catch (error) {
      next(error);
    }
  }
  async updateProduct(req, res, next) {
    try {
      const productInfo = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        code: req.body.code,
        stock: req.body.stock,
      };
      if (req.file) {
        productInfo.thumbnail = req.file.filename;
      }
      const updatedAt = new Date();
      const updated = await ProductService.update(req.params.id, {
        ...productInfo,
        updatedAt,
      });
      res.status(200).json(updated).redirect('/admin');
    } catch (error) {
      next(error);
    }
  }
  async deleteProduct(req, res, next) {
    try {
      const toBeDeleted = await ProductService.delete(req.params.id);
      res.status(200).json(toBeDeleted).redirect('/admin');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
