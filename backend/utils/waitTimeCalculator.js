const Booking = require('../models/Booking');
const Table = require('../models/Table');

const calculateWaitTime = async (restaurantId, partySize) => {
  try {
    // Get current bookings ahead in queue
    const bookingsAhead = await Booking.countDocuments({
      restaurantId,
      status: 'waiting',
      createdAt: { $lt: new Date() }
    });
    
    // Get available tables that can accommodate the party size
    const availableTables = await Table.aggregate([
      { 
        $match: { 
          restaurantId: mongoose.Types.ObjectId(restaurantId), 
          capacity: { $gte: partySize }, 
          isAvailable: true 
        } 
      },
      { 
        $group: { 
          _id: null, 
          total: { $sum: '$quantity' } 
        } 
      }
    ]);
    
    const tablesAvailable = availableTables[0]?.total || 0;
    
    // Get restaurant's average wait time from past data
    const recentBookings = await Booking.find({
      restaurantId,
      status: { $in: ['seated', 'confirmed'] },
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // Last 7 days
    }).limit(100);
    
    let avgWaitTime = 30; // default 30 minutes
    
    if (recentBookings.length > 0) {
      const totalWaitTime = recentBookings.reduce((sum, booking) => {
        if (booking.confirmationReceivedAt && booking.checkInTime) {
          const waitTime = (booking.confirmationReceivedAt - booking.checkInTime) / (1000 * 60);
          return sum + waitTime;
        }
        return sum;
      }, 0);
      
      avgWaitTime = totalWaitTime / recentBookings.length;
    }
    
    // Calculate estimated wait time
    let estimatedWait = 0;
    if (tablesAvailable > 0) {
      estimatedWait = (bookingsAhead / tablesAvailable) * avgWaitTime;
    } else {
      estimatedWait = bookingsAhead * avgWaitTime;
    }
    
    // Add buffer time (10-15%)
    estimatedWait = estimatedWait * 1.15;
    
    return Math.round(Math.max(estimatedWait, 10)); // Minimum 10 minutes
  } catch (error) {
    console.error('Error calculating wait time:', error);
    return 30; // Default fallback
  }
};

module.exports = calculateWaitTime;