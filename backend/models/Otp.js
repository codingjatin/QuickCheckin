const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  otp: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// TTL index to automatically remove expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Index for faster lookups
otpSchema.index({ email: 1 });

module.exports = mongoose.model('Otp', otpSchema);