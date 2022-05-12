import MongoHandler from "../../container/mongoHandler.js";

class CartMongoDao extends MongoHandler {
    constructor() {
        super("carts", { 
            _id: {type: String, required: true},
            timestamp: { type: Date, required: true },
            products: { type: Array, required: true },
        });
    }
}

export default CartMongoDao
