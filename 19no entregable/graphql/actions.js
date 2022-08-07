const ProductService = require('../services/ProductService');

module.exports = {
    getProductBy: async (id) =>{
        return await ProductService.getById(id);
    },
    getProducts: async() =>{
        return await ProductService.getAll();
    },
    createProduct: async({data}) =>{
        return await ProductService.create(data);
    },
    updateProduct: async (id, {data}) =>{
        return await ProductService.update(id, data);
    },
    deleteProduct: async(id) =>{
        return ProductService.delete(id);
    }
}