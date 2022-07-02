const logErrors = (error, req, res, next) => {
  console.error(error);
  next(error);
};

const boomErrorHandler = (error, req, res, next) => {
  if (error.isBoom) {
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  }
  next(error);
};

module.exports = { logErrors, boomErrorHandler };
