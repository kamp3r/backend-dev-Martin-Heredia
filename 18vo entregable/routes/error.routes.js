const errorRouter = require('express').Router();
const errorHandler = require('../controllers/Error.Controllers');

errorRouter.get('*', errorHandler);

module.exports = errorRouter;