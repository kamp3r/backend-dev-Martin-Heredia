const MongoHandler = require('../../services/mongoHandler');
const {sendDeliveryMail} = require('../../mail/mailsender');

class CartHandler extends MongoHandler {
    constructor() {
        super('cart', {
            products: {type: Array, default: []},
            amount: {type: Number, default: 0},
            address: {type: String, default: ''},
            status: {type: String, default: 'pending'},
            userId: {type: String}
        })
    }
    async getCart(userId) {
        const cart = await this.collection.findOne({userId});
        return cart;
    }
    async createCart(data) {
        const newCart = await this.collection.create(data);
        await sendDeliveryMail(data)
        return newCart;
    }

}

module.exports = CartHandler;