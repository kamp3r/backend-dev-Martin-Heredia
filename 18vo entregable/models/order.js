const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
    total: { type: Number, default: 0 },
    status: { type: String, default: 'GENERATED' },
    timestamp: { type: Date, default: new Date()}
})

module.exports = {
    Order: mongoose.model('Order', orderSchema),
};