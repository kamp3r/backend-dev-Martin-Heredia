const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  code: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  timestamp: { type: Date, default: new Date.toLocaleString()}
});


module.exports = {
    Product: mongoose.model('Product', productSchema),
}
