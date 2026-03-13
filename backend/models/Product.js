const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  ingredients: [{
    type: String,
  }],
  hiddenSugars: [{
    type: String,
  }],
  additives: [{
    type: String,
  }],
  safetyScore: {
    type: Number,
    required: true,
  },
  warnings: [{
    type: String,
  }]
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
