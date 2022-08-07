const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const InterfaceDao = require('../InterfaceDao');

let instance = null;

class Memory extends InterfaceDao {
  constructor() {
    super();
    this.collection = [];
  }
  static getInstance() {
    if (!instance) {
      instance = new Memory();
    }
    return instance;
  }
  async create(data) {
    const newProduct = {
      _id: uuidv4(),
      title: data.title,
      price: data.price,
      thumbnail: data.thumbnail,
      description: data.description,
      code: data.code,
      stock: data.stock,
      createdAt: moment().format('DD-MM-YYYY HH:mm:ss'),
      updatedAt: moment().format('DD-MM-YYYY HH:mm:ss'),
    };
    this.collection.push(newProduct);
    return newProduct;
  }
  async readAll() {
    return this.collection;
  }
  async readOne(id) {
    const product = this.collection.filter((e) => e.id == id);
    return product[0];
  }
  async update(id, data) {
    let product = this.collection.filter((p) => p.id == id);
    if (product.length) {
      let productUpdated = Object.assign(product[0], data);
      productUpdated.updatedAt = moment().format('DD-MM-YYYY HH:mm:ss');
      return productUpdated;
    } else {
      return false;
    }
  }
  async delete(id) {
    let index = this.products.findIndex((p) => p.id == id);
    if (index >= 0) {
      const productDeleted = this.products.splice(index, 1);
      return productDeleted[0];
    } else {
      return false;
    }
  }
}

module.exports = Memory;
