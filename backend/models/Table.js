const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound index for better query performance
tableSchema.index({ restaurantId: 1, capacity: 1 });
tableSchema.index({ restaurantId: 1, isAvailable: 1 });

module.exports = mongoose.model('Table', tableSchema);