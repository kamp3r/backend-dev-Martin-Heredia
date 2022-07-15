const errorRouter = require('express').Router();

errorRouter.get('*', (req, res) => {
  const error = new Error('Not Found');
  res.render('error', {
    error,
    title: 'Error',
    user: req.user,
}
)});

module.exports = errorRouter;