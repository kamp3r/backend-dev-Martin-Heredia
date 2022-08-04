const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const bcrypt = require('bcrypt');
const InterfaceDao = require('../InterfaceDao');
const { User } = require('../../models/user');
const MongoDBConnection = require('../../db/connectionMongo');
const URI = require('../../db/uriDB');
const UserDTO = require('../../dto/userDTO');

let instance = null;

class MongoDB extends InterfaceDao {
  constructor() {
    super();
    this.collection = User;
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
    if (data.email) {
      const user = await this.collection.findOne({ email: data.email });
      if (user) {
        throw new Error('User already exists');
      }
    }
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.collection.create({
      _id: uuidv4(),
      ...data,
      password: hashed,
      createdAt: new Date(),
    });
    delete user._doc.password;
    return user;
  }
  async readOne(email) {
    const user = await this.collection.findOne({ email: email });
    if (!user) {
      throw new Error('User not found');
    }
    const userDTO = new UserDTO(
      user._id,
      user.name,
      user.lastName,
      user.password,
      user.email,
      user.address,
      user.phone,
      user.role,
      user.picture,
      user.createdAt
    );
    return userDTO.toJSON();
  }
  async update(id, data) {
    if (data.password.length > 0) {
      const hashed = await bcrypt.hash(data.password, 10);
      const updatedUser = await this.collection.findOneAndUpdate(id, {
        ...data,
        password: hashed,
      });
      return updatedUser;
    } else {
      delete data.password;
      const updatedUser = await this.collection.findOneAndUpdate(id, data);
      return updatedUser;
    }
  }
  async delete(id) {
    const user = await this.collection.findOneAndDelete({ _id: id });
    if (!user) {
      throw new Error('User not found');
    }
    return { message: 'User deleted' };
  }
}

module.exports = MongoDB;
