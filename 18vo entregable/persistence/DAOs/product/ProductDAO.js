const { Product } = require('../../../models/product');
const ProductDTO = require('../../DTOs/ProductDto');
const InterfaceProduct = require('./interfaceProd');
const ObjectId = require('mongoose').Types.ObjectId;

class ProductMongoDAO extends InterfaceProduct {
  static instance;

  constructor(model, DTO) {
    super();
    this.model = this.model;
    this.DTO = DTO;
    require('../../connection/connectionMongo.js')
  }

  static getInstance(schema, dto) {
    if (!this.instance) {
      this.instance = new ProductMongoDAO(schema, dto);
    }
    return this.instance;
  }

  async getById(id) {
    if (!ObjectId.isValid(id)) {
      return undefined;
    }
    const product = await this.model.findById(id);
    if (!product) {
      return undefined;
    }

    const {
      _id,
      title,
      price,
      description,
      code,
      thumbnail,
      stock,
      timestamp,
    } = product;

    return new this.DTO(
      _id,
      title,
      price,
      description,
      code,
      thumbnail,
      stock,
      timestamp
    ).toJSON();
  }

  async getAll() {
    const products = await this.model.find().lean();
    return products.map((product) => {
      new this.DTO(
        product._id,
        product.title,
        product.price,
        product.description,
        product.code,
        product.thumbnail,
        product.stock,
        product.timestamp
      ).toJSON();
    });
  }
  async save(product) {
    const {
      _id,
      title,
      price,
      description,
      code,
      thumbnail,
      stock,
      timestamp,
    } = await this.model.create(product);
    return new this.DTO(
      _id,
      title,
      price,
      description,
      code,
      thumbnail,
      stock,
      timestamp
    ).toJSON();
  }

  async update(id, product) {
    const update = await this.model.updateOne({ _id: id }, { $set: product });
    if (!update) return undefined;

    return this.getById(id);
  }

  async delete(id) {
    const product = await this.model.getById(id);
    if (!product) return undefined;
    await this.model.findOneAndDelete({ _id: id });
    return product;
  }
}

module.exports = ProductMongoDAO.getInstance(Product, ProductDTO);

