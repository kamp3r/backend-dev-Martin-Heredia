const multer = require('multer');
const path = require('path');

//users
const storageUsers = multer.diskStorage({
    destination: path.join(__dirname, '../public/images/users'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const uploadImgUser = multer({
    storage: storageUsers,
})

//products
const storageProducts = multer.diskStorage({
    destination: path.join(__dirname, '../public/images/products'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const uploadImgProd = multer({
    storage: storageProducts
})

module.exports = {uploadImgUser, uploadImgProd};