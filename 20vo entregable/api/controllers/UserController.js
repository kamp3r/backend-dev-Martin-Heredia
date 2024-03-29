/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
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
  getById: async (req, res) => {
    try {
      const user = await User.findOne({ id: req.params._id });
      if (!user) {
        return res.status(404).send({
          message: 'No user found',
        });
      }
      return res
        .status(200)
        .send({ success: true, message: 'User found', data: user });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  create: async (req, res) => {
    try {
      req
        .file('picture')
        .upload(
          { dirname: '../../assets/images/users' },
          async (err, uploadedFiles) => {
            if (err) {
              return res.status(500).json(err);
            }
            if (uploadedFiles.length === 0) {
              return res.badRequest('No file was uploaded');
            }
            sails.log.info(uploadedFiles[0]);
            const user = await User.create({
              ...req.body,
              picture: 'uploaded' + uploadedFiles[0].filename,
            });
            return res.status(200).send({
              success: true,
              message: 'User created',
              data: user,
            });
          }
        );
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  update: async (req, res) => {
    try {
      if (!req.body.picture) {
        const user = await User.updateOne({ id: req.params._id }, req.body);
        return res
          .status(200)
          .send({ success: true, message: 'User updated', data: user });
      }else{
        req
          .file('picture')
          .upload(
            { dirname: '../../assets/images/users' },
            async (err, uploadedFiles) => {
              if (err) {
                return res.status(500).json(err);
              }
              if (uploadedFiles.length === 0) {
                return res.badRequest('No file was uploaded');
              }
              sails.log.info(uploadedFiles[0]);
              const user = await User.updateOne({ id: req.params._id }, {...req.body, picture: 'uploaded' + uploadedFiles[0].filename});
              return res.status(200).send({
                success: true,
                message: 'User updated',
                data: user,
              });
            }
          );
      }
      if (!user) {
        return res.status(404).send({
          message: 'User not found',
        });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  delete: async (req, res) => {
    try {
      const user = await User.destroyOne({ id: req.params._id });
      if (!user) {
        return res.status(404).send({
          message: 'User not found',
        });
      }
      return res
        .status(200)
        .send({ success: true, message: 'User deleted', data: user });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
};
