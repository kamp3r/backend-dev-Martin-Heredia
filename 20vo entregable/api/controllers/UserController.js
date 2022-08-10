/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const fs = require('fs');

module.exports = {
  get: async (req, res) => {
    try {
      const users = await User.find();
      if (!users) {
        return res.status(404).send({
          message: 'No users found',
        });
      }
      return res
        .status(200)
        .send({ success: true, message: 'Users found', data: users });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  create: async (req, res) => {
    try {
      const image = req.file('picture').upload({ dirname: '../../assets/images/users' }, async (err, uploadedFiles) => {
        if (err) {
          return res.status(500).json(err);
        }
        
      }
      );
      const userData = {
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
        picture: image,
      };
      const user = await User.create(userData);
      return res
        .status(200)
        .send({ success: true, message: 'User created', data: user });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
};
