const boom = require('@hapi/boom');
const MongoHandler = require('../../services/mongoHandler');

class OrderHandler extends MongoHandler {
    constructor() {
        super('orders', {
            products: [ {
                id: String,
                title: String,
                quantity: {
                    type: Number,
                    default: 1
                },
            }],
            amount: Number,
            address: String,
            status: String
        })
    }
}