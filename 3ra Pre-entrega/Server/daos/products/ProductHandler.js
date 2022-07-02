const boom = require('@hapi/boom');
const moment = require('moment');
const MongoHandler = require('../../services/mongoHandler');

class ProductHandler extends MongoHandler {
  constructor() {
    super('product', {
      _id: { type: String, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      thumbnail: { type: String, required: true },
      description: { type: String, required: true },
      code: { type: String, required: true },
      stock: { type: Number, required: true },
      createdAt: { type: Date },
      updatedAt: { type: Date },
    });
  }
  async getProducts() {
    const products = await this.collection.find({});
    const productsArray = products.map((product) => {
      return {
        id: product._id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        description: product.description,
        code: product.code,
        stock: product.stock,
        createdAt: moment(product.createdAt).format('DD-MM-YYYY HH:mm:ss'),
        updatedAt: moment(product.updatedAt).format('DD-MM-YYYY HH:mm:ss'),
      };
    });
    return productsArray;
  }
  async getProductById(id) {
    const product = await this.collection.findOne({ id: id });
    if (!product) {
      throw boom.notFound('No product found');
    }
    return {
      id: product._id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      description: product.description,
      code: product.code,
      stock: product.stock,
      createdAt: moment(product.createdAt).format('DD-MM-YYYY HH:mm:ss'),
      updatedAt: moment(product.updatedAt).format('DD-MM-YYYY HH:mm:ss'),
    };
  }
  async updateProduct(id, data) {
    const productToUpdate = await this.collection.findByIdAndUpdate(id, data);
    if (!productToUpdate) {
      throw boom.notFound('No product found');
    }
    return { message: 'Product updated' };
  }
  async deleteProduct(id) {
    const deletedProduct = await this.collection.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw boom.notFound('No product found');
    }
    return { message: `Product with ${id} deleted` };
  }
}

module.exports = ProductHandler;
