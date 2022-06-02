import express from "express";

const initialRouter = express.Router();

initialRouter.get('/', (req, res) => {
    res.redirect('/login');
})

initialRouter.get('/home', (req, res) => {
    const userName = req.user.userName;
    res.render('home', {userName});
})

export default initialRouter;