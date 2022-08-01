const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 0 },
    timestamp: { type: Date},
});


module.exports = { Cart: mongoose.model('Cart', cartSchema) };