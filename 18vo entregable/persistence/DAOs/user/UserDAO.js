const { User } = require('../../../models/user');
const InterfaceUser = require('./InterfaceUser');
const UserDTO = require('../../DTOs/UserDto');
const logger = require('../../../utils/logger/logger');

class UserMongoDAO extends InterfaceUser {
  static instance;
  constructor(model, UserDTO) {
    super();
    this.model = model;
    this.UserDTO = UserDTO;
    require('../../connection/connectionMongo.js')
  }
  static getInstance(model, UserDTO) {
    if (!this.instance) {
      this.instance = new UserMongoDAO(model, UserDTO);
    }
    return this.instance;
  }
  async getById(id) {
    const user = await this.model.findById(id).lean();
    if (!user) return undefined;
    const {
      _id,
      name,
      lastName,
      email,
      profilePicture,
      phone,
      address,
      timestamp,
    } = user;
    return new this.UserDTO(
      _id,
      name,
      lastName,
      email,
      phone,
      profilePicture,
      address,
      timestamp
    ).toJSON();
  }

  async save(user) {
    try{
        const { _id, name, lastName, email, phone, address, profilePicture } = await this.model.create(user);
        return new this.UserDTO(_id, name, lastName, email, phone, profilePicture, address).toJSON();
    }catch(err){
        logger.error(err);
        throw err;
    }
  }
}

module.exports = UserMongoDAO.getInstance(User, UserDTO)