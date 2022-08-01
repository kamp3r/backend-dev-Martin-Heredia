const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [{ code: String, quantity: Number, name: String, price: Number }],
  email: { type: String, required: true },
  total: { type: Number, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['pending', 'sended'], default: 'pending' },
});

module.exports = {
  Order: mongoose.model('Order', orderSchema),
};
