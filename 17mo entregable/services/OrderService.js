const DAOFactory = require('../DAO/factory');
const { configuration } = require('../config/config');

class OrderService{
  constructor(){
    this.orderDAO = DAOFactory.getPersistence('Order', configuration.persistence);
  }
  async create(data){
    return await this.orderDAO.create(data);
  }
}

module.exports = new OrderService();
