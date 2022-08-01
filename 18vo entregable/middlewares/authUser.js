const logger = require('../utils/logger/logger')
const { verifyToken } = require('../utils/auth/auth')

const authUser = async (req, res, next) => {
    try {
      if (!req.cookies.token) {
        throw new Error('No token provided')
      } else {
        const token = req.cookies.token;
        verifyToken(token)
        next()
      }
    } catch (err) {
      logger.error(err)
      next()
    }
  }
module.exports = authUser
