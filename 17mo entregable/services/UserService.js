const DAOFactory = require('../DAO/factory');
const { configuration } = require('../config/config');

class ProductService {
  constructor(){
    this.userDao = DAOFactory.getPersistence('User', configuration.persistence);
  }
  async getBy(email) {
    return await this.userDao.readOne(email);
  }
  async create(data) {
    return await this.userDao.create(data);
  }
  async update(id, data) {
    return await this.userDao.update(id, data);
  }
  async delete(id) {
    return await this.userDao.delete(id);
  }  
}

module.exports = new ProductService();