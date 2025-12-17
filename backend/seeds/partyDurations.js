const mongoose = require('mongoose');
const PartyDuration = require('../models/PartyDuration');

// Default party durations based on industry standards
const defaultDurations = [
  { partySize: 1, minDuration: 35, maxDuration: 45, avgDuration: 40, description: 'Solo diner - usually eats quickly' },
  { partySize: 2, minDuration: 60, maxDuration: 75, avgDuration: 67, description: 'Date night or catch-up, 1-2 courses' },
  { partySize: 3, minDuration: 75, maxDuration: 90, avgDuration: 82, description: 'Conversation flow slows eating slightly' },
  { partySize: 4, minDuration: 85, maxDuration: 95, avgDuration: 90, description: 'The golden standard - 1.5 hrs turnover' },
  { partySize: 5, minDuration: 90, maxDuration: 105, avgDuration: 97, description: 'Slightly longer ordering time' },
  { partySize: 6, minDuration: 105, maxDuration: 120, avgDuration: 112, description: 'Group dynamics, drinks before food' },
  { partySize: 7, minDuration: 115, maxDuration: 125, avgDuration: 120, description: '2 hours standard block' },
  { partySize: 8, minDuration: 120, maxDuration: 130, avgDuration: 125, description: 'High chance of lingering after payment' },
  { partySize: 9, minDuration: 125, maxDuration: 135, avgDuration: 130, description: 'Service slows down for large orders' },
  { partySize: 10, minDuration: 135, maxDuration: 150, avgDuration: 142, description: 'Often celebrating, high bill time' },
  { partySize: 11, minDuration: 145, maxDuration: 155, avgDuration: 150, description: '2.5 hours block' },
  { partySize: 12, minDuration: 145, maxDuration: 155, avgDuration: 150, description: '2.5 hours block' },
  { partySize: 13, minDuration: 155, maxDuration: 165, avgDuration: 160, description: 'Large party operations' },
  { partySize: 14, minDuration: 160, maxDuration: 170, avgDuration: 165, description: 'Large party operations' },
  { partySize: 15, minDuration: 175, maxDuration: 185, avgDuration: 180, description: '3 hours - logistical operation' }
];

async function seedPartyDurations() {
  try {
    // Check if already seeded
    const existingCount = await PartyDuration.countDocuments();
    if (existingCount > 0) {
      console.log('Party durations already seeded, skipping...');
      return;
    }

    // Insert default durations
    await PartyDuration.insertMany(defaultDurations);
    console.log('✅ Party durations seeded successfully');
  } catch (error) {
    console.error('Error seeding party durations:', error);
  }
}

module.exports = seedPartyDurations;
