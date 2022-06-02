import express from 'express'

const logoutRouter = express.Router()

logoutRouter.get('/', (req, res)=>{
    res.locals.currentUser = req.user
    res.render('logout')
    res.clearCookie('session.mongoDB')
})

logoutRouter.post('/', (req, res) => {
    res.redirect('/logout')
    req.logout()
})

export default logoutRouter;