const logger = require('../logger/logger')

const errorRoutes = require('express').Router()


const responseError = (req, res) => {
    res.render('error')
    logger.warn('Se esta intentando acceder a una ruta inexistente')
}
 
errorRoutes
    .get('*', responseError)
    .post('*', responseError)
    .delete('*', responseError)
    .put('*', responseError)
 
module.exports = errorRoutes