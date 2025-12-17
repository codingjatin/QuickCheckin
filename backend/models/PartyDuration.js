const mongoose = require('mongoose');

// Default party durations based on industry standards
const partyDurationSchema = new mongoose.Schema({
  partySize: {
    type: Number,
    required: true,
    min: 1,
    max: 20,
    unique: true
  },
  minDuration: {
    type: Number,
    required: true,
    min: 15 // minimum 15 minutes
  },
  maxDuration: {
    type: Number,
    required: true
  },
  avgDuration: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for quick lookup
partyDurationSchema.index({ partySize: 1 }, { unique: true });

module.exports = mongoose.model('PartyDuration', partyDurationSchema);
