const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const InterfaceDao = require('../InterfaceDao');
const { Product } = require('../../models/Product');
const MongoDBConnection = require('../../db/connectionMongo');
const URI = require('../../db/uriDB');

let instance = null;

class MongoDB extends InterfaceDao {
  constructor() {
    super();
    this.collection = Product;
    this.connectDB();
  }
  static getInstance() {
    if (!instance) {
      instance = new MongoDB();
    }
    return instance;
  }
  async connectDB() {
    const database = await MongoDBConnection.getConnectionInstance(URI);
    await database.connect();
  }
  async create(data) {
    try {
      const product = await this.collection.create({
        ...data,
        _id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return product;
    } catch (err) {
      throw boom.badRequest(err);
    }
  }
  async readAll() {
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
  async readOne(id) {
    const product = await this.collection.findOne({ _id: id });
    if (!product) {
      throw new Error('Product not found');
    }
    return {
      _id: product._id,
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
  async update(id, data) {
    const productToUpdate = await this.collection.findByIdAndUpdate(id, data);
    if (!productToUpdate) {
      throw new Error('No product found');
    }
    return { message: 'Product updated' };
  }
  async delete(id) {
    const deletedProduct = await this.collection.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw boom.notFound('No product found');
    }
    return { message: `Product with ${id} deleted` };
  }
}

module.exports = MongoDB;
