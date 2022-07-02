const MongoHandler = require ("../../container/mongoHandler.js");

class ProductDaoMongo extends MongoHandler {
    constructor() {
        super("product", {
            id: {type: String, required: true},
            title: { type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true },
            description: { type: String, required: true },
            code: { type: String, required: true },
            stock: { type: Number, required: true },
            timestamp: { type: Date },
        });
    }
}

module.exports = ProductDaoMongo