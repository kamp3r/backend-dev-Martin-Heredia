const logger = require('../utils/logger/logger');
const { verifyToken } = require('../utils/auth/auth');
const UserService = require('../services/UserService');

const authUser = async (req, res, next) => {
  if (req.cookies.token) {
    try {
      const token = verifyToken(req.cookies.token);
      const user = await UserService.getBy(token.email);
      req.user = user;
      return next();
    } catch (err) {
      logger.error(err.message);
      next();
    }
  } else {
    res.redirect('/login');
  }
};
module.exports = authUser;
