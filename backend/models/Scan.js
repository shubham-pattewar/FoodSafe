const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  scanData: {
    type: Object, // Optional: store raw results for historic purposes even if product changes later
  }
}, { timestamps: true });

const Scan = mongoose.model('Scan', scanSchema);

module.exports = Scan;
