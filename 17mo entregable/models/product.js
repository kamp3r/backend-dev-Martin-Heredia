const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  stock: { type: Number, required: true },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});


module.exports = {
    Product: mongoose.model('Product', productSchema),
}
