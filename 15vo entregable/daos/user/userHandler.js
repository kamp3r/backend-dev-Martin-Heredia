const MongoHandler =  require('../../container/mongoHandler.js');
const bcrypt =  require('bcrypt');

class UserHandler extends MongoHandler {
  constructor() {
    super('users', {
      _id: {type: String},
      email: {type: String, required: true, index: true},
      password: {type: String, required: true,}
    });
  }
  encryptPassword(password) {
    const hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    return hashedPass;
  }
  compareEncrypt(password, hashedPass) {
   return bcrypt.compareSync(password, hashedPass);
  }
}

module.exports = UserHandler;
