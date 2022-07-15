const MongoHandler = require('../../services/mongoHandler');
const boom = require('@hapi/boom');
const { v4: uuidv4 } = require('uuid')
const {sendMail} = require('../../mail/mailsender');
const bcrypt = require('bcrypt');

class UserHandler extends MongoHandler {
  constructor() {
    super('users', {
      _id: { type: String },
      name: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      address: { type: String },
      phone: { type: String, required: true, unique: true },
      password: { type: String, required: true},
      picture: { data: Buffer, type: String },
      role: { type: String, default: 'user', enum: ['user', 'admin'] },
      createdAt: { type: Date},
    });
  }
  async createUser(data){
    try{
      const passwordHash = await bcrypt.hash(data.password, 10);
      const newUser = await this.collection.create({_id: uuidv4(),
        ...data,
        password: passwordHash,
        createdAt: new Date()
      });
      delete newUser._doc.password
      sendMail(newUser);
      return newUser;
    }catch(error){
      console.error(error);
    }
  }
  async getUserById(id) {
    try{
      const user = await this.collection.findOne({_id: id});
      delete user._doc.password;
      return user;
    }catch(error){
      console.error(error);
    }
  }
  async getUser(email, password) {
    try {
      const user = await this.collection.findOne({ email });
      if (!user) {
        throw boom.unauthorized('User not found');
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw boom.unauthorized('Invalid password');
      }
      delete user._doc.password;
      return user;
    } catch (err) {
      console.log(err);
    }
  }
  async updateUser(id, data) {
    try {
      if(data.password.length > 0){
      const user = await bcrypt.hash(data.password, 10)
      const updatedUser = await this.collection.findByIdAndUpdate(id, user);
      return updatedUser;
      }else{
        delete data.password;
        const updatedUser = await this.collection.findByIdAndUpdate(id, data);
        return updatedUser;
      }
      
    } catch (err) {
      console.log(err);
    }
  }
  async deleteUser(id) {
    try {
      const deletedUser = await this.collection.deleteOne({ _id: id });
      return deletedUser;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = UserHandler;
