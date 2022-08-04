const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: {type: Array, default: [], required: true},
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['pending', 'sended'], default: 'pending' },
  userId: { type: String, required: true },
});

module.exports = {
  Order: mongoose.model('Order', orderSchema),
};
