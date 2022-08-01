const DAOFactory = require('../DAO/factory');
const { configuration } = require('../config/config');

class ProductService {
  constructor(){
    this.productDAO = DAOFactory.getPersistence('User', configuration.persistence);
  }
  async getBy(email) {
    return await this.productDAO.readOne(email);
  }
  async create(data) {
    return await this.productDAO.create(data);
  }
  async update(id, data) {
    return await this.productDAO.update(id, data);
  }
  async delete(id) {
    return await this.productDAO.delete(id);
  }  
}

module.exports = new ProductService();