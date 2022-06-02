import express from 'express'

const logoutRouter = express.Router()

logoutRouter.get('/', (req, res, next)=>{
    res.locals.currentUser = req.user
    req.logout((err)=>{
        if(err){
            return next(err)
        }
    })
    res.render('logout')
})

logoutRouter.post('/', (req, res) => {
    res.redirect('/logout')
    req.logout()
})

export default logoutRouter;