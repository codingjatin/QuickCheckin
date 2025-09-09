const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerPhone: {
    type: String,
    required: true,
    trim: true
  },
  partySize: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ['waiting', 'notified', 'confirmed', 'seated', 'cancelled', 'noshow'],
    default: 'waiting'
  },
  waitTime: {
    type: Number,
    default: 0
  },
  estimatedSeatingTime: {
    type: Date
  },
  notificationSentAt: {
    type: Date
  },
  confirmationReceivedAt: {
    type: Date
  },
  checkInTime: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
bookingSchema.index({ restaurantId: 1, status: 1 });
bookingSchema.index({ restaurantId: 1, createdAt: -1 });
bookingSchema.index({ customerPhone: 1 });
bookingSchema.index({ estimatedSeatingTime: 1 });

// TTL index to automatically remove old bookings after 24 hours
bookingSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model('Booking', bookingSchema);