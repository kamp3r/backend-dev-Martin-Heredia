const MongoHandler = require('../../services/mongoHandler');
const bcrypt = require('bcrypt');

class UserHandler extends MongoHandler {
  constructor() {
    super('users', {
      _id: { type: String },
      email: { type: String, required: true, index: true },
      password: { type: String, required: true },
    });
  }
  encryptPassword(password) {
    const hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    return hashedPass;
  }
  compareEncrypt(password, hashedPass) {
    return bcrypt.compareSync(password, hashedPass);
  }
  async getUserByEmail(email) {
    try {
      const user = await this.collection.findOne({ email: email });
      return user;
    } catch (err) {
      console.log(err);
    }
  }
  async updateUser(id, user) {
    try {
      const updatedUser = await this.collection.updateOne(
        { _id: id },
        { $set: user }
      );
      return updatedUser;
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
