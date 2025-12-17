const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Table = require('../models/Table');
const PartyDuration = require('../models/PartyDuration');

/**
 * Smart Wait Time Calculator
 * 
 * Algorithm:
 * 1. Find all tables with capacity >= partySize
 * 2. If any table is available → return 5 min (cleaning buffer)
 * 3. For occupied tables: calculate when they'll be free
 * 4. Return earliest availability + 5 min buffer
 */
const calculateWaitTime = async (restaurantId, partySize) => {
  try {
    // Get party duration for this size
    let partyDuration = await PartyDuration.findOne({ partySize });
    if (!partyDuration) {
      // Fallback: use closest party size or default
      partyDuration = await PartyDuration.findOne({ partySize: { $gte: partySize } }).sort({ partySize: 1 });
      if (!partyDuration) {
        partyDuration = { avgDuration: 90 }; // Default 90 minutes
      }
    }

    // Find all tables that can accommodate this party size
    const suitableTables = await Table.find({
      restaurantId: new mongoose.Types.ObjectId(restaurantId),
      capacity: { $gte: partySize },
      isActive: true
    }).sort({ capacity: 1 }); // Prefer smaller tables first

    if (suitableTables.length === 0) {
      // No suitable tables exist
      return { waitTime: 60, message: 'No suitable tables available' };
    }

    // Check for available tables
    const availableTables = suitableTables.filter(t => t.status === 'available');
    
    if (availableTables.length > 0) {
      // Table is available! Just cleaning buffer
      return { 
        waitTime: 5, 
        tableId: availableTables[0]._id,
        message: 'Table available shortly' 
      };
    }

    // All tables are occupied - calculate when the earliest will be free
    const occupiedTables = suitableTables.filter(t => t.status === 'occupied' && t.seatedAt);
    
    if (occupiedTables.length === 0) {
      // Tables exist but are in cleaning/reserved state
      return { waitTime: 10, message: 'Tables being prepared' };
    }

    // Calculate expected end time for each occupied table
    const now = new Date();
    const tableAvailabilities = await Promise.all(
      occupiedTables.map(async (table) => {
        // Get the current booking for this table
        const booking = await Booking.findOne({
          tableId: table._id,
          status: { $in: ['seated', 'confirmed'] }
        });

        if (!booking) {
          // No active booking, table should be free soon
          return { tableId: table._id, minutesUntilFree: 5 };
        }

        // Get party duration for this booking's party size
        let duration = partyDuration.avgDuration;
        const bookingDuration = await PartyDuration.findOne({ partySize: booking.partySize });
        if (bookingDuration) {
          duration = bookingDuration.avgDuration;
        }

        // Calculate expected end time
        const seatedTime = new Date(table.seatedAt);
        const expectedEnd = new Date(seatedTime.getTime() + duration * 60 * 1000);
        const minutesUntilFree = Math.max(0, Math.ceil((expectedEnd - now) / (60 * 1000)));

        return { tableId: table._id, minutesUntilFree, expectedEnd };
      })
    );

    // Find the earliest available table
    tableAvailabilities.sort((a, b) => a.minutesUntilFree - b.minutesUntilFree);
    const earliest = tableAvailabilities[0];

    // Add 5 minutes buffer for cleaning
    const waitTime = earliest.minutesUntilFree + 5;

    return {
      waitTime: Math.max(waitTime, 5), // Minimum 5 minutes
      tableId: earliest.tableId,
      message: `Estimated wait: ${waitTime} minutes`
    };

  } catch (error) {
    console.error('Error calculating wait time:', error);
    return { waitTime: 30, message: 'Default wait time' }; // Fallback
  }
};

/**
 * Get dynamic wait time range for display
 * Returns { min: X, max: Y } for "X-Y minutes" display
 */
const getWaitTimeRange = async (restaurantId, partySize) => {
  const result = await calculateWaitTime(restaurantId, partySize);
  const waitTime = result.waitTime;
  
  // Create a range (±5 minutes)
  const min = Math.max(5, waitTime - 5);
  const max = waitTime + 5;
  
  return {
    min,
    max,
    exact: waitTime,
    tableId: result.tableId,
    message: result.message
  };
};

module.exports = { calculateWaitTime, getWaitTimeRange };