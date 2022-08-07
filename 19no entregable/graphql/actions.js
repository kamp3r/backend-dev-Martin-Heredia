const ProductService = require('../services/ProductService');

module.exports = {
    getProductBy: (id) =>{
        return ProductService.getById(id);
    },
    getProducts: () =>{
        return ProductService.getAll();
    },
    createProduct: ({data}) =>{
        return ProductService.create(data);
    },
    updateProduct: (id, {data}) =>{
        return ProductService.update(id, data);
    },
    deleteProduct: (id) =>{
        return ProductService.delete(id);
    }
}