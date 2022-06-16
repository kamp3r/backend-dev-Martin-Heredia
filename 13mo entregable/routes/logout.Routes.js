const logoutRouter = require('express').Router();

logoutRouter.get('/', (req, res, next)=>{
    res.locals.currentUser = req.user
    req.logout((err)=>{
        if(err){
            return next(err)
        }
    })
    res.clearCookie('session.mongoDB')
    res.render('logout')
})

logoutRouter.post('/', (req, res) => {
    res.redirect('/logout')
    req.logout()
})

module.exports = logoutRouter;