const logger = require('../utils/logger/logger');
const UserService = require('../services/UserService');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/auth/auth.js');

class UserController {
  constructor() {}

  async registerUser(req, res, next) {
    try {
      const data = {
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.full_phone[1],
        password: req.body.password,
        picture: req.file.filename,
      };
      await UserService.create(data);
      res.status(201).redirect('/');
    } catch (error) {
      next(error);
    }
  }
  async loginUser(req, res, next) {
    try {
      const data = {
        email: req.body.email,
        password: req.body.password,
      };
      const user = await UserService.getBy(data.email);
      if (!user) {
        throw new Error('User not found');
      }
      const isValid = await bcrypt.compare(data.password, user.password);
      if (!isValid) {
        throw new Error('Invalid password');
      }
      const token = generateToken({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        phone: user.phone,
        role: user.role,
        picture: user.picture,
      });
      res.cookie('token', token, {
          httpOnly: true,
        }).redirect('/profile');
    } catch (error) {
      logger.error('Error: ', error);
    }
  }
  async updateUser(req, res, next) {
    try {
      const data = {
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.full_phone[1],
        password: req.body.password,
      };
      if (req.file) {
        data.picture = req.file.filename;
      }
      await UserService.update(req.params.id, data);
      res.status(200).redirect('/profile');
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new UserController();
