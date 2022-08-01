const AuthRouter = require('express').Router();
const AuthUser = require('../middlewares/authUser.js');
const { uploadImgUser } = require('../middlewares/multer.middleware');
const UserController = require('../controllers/User.controller');

AuthRouter.post(
  '/register',
  uploadImgUser.single('picture'),
  UserController.registerUser
);

AuthRouter.post('/login', UserController.loginUser);

AuthRouter.patch(
  '/edit/:id',
  AuthUser,
  uploadImgUser.single('picture'),
  UserController.updateUser
);

module.exports = AuthRouter;
