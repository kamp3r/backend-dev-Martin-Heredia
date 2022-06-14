import express from "express";

const initialRouter = express.Router();

initialRouter.get('/', (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/home')
    }else{
    res.redirect('/login');
    }
})

initialRouter.get('/home', (req, res) => {
    const userName = req.user.userName;
    res.render('home', {userName});
})

export default initialRouter;