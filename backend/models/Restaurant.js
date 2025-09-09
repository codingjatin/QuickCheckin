const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  businessNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  logo: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  avgWaitTime: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SuperAdmin',
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
restaurantSchema.index({ isActive: 1, city: 1 });
restaurantSchema.index({ email: 1 }, { unique: true });
restaurantSchema.index({ businessNumber: 1 }, { unique: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);