import express from 'express';

const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
    res.render('login');
})

loginRouter.post('/login', (req, res) => {
    const {userName} = req.body;
    req.session.user = userName;
    res.redirect('/api/products-test')
});

loginRouter.get('/login', (req, res) => {
  const { userName } = req.body;
  req.session.user = userName;
  res.render('login');
});

loginRouter.get('/logout', (req, res) => {
    const userName = req.session.user;
    res.render('logout', {userName});
    req.session.destroy();
})


export default loginRouter;
