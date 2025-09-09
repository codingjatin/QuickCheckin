const Booking = require('../models/Booking');
const Table = require('../models/Table');
const Restaurant = require('../models/Restaurant');
const calculateWaitTime = require('../utils/waitTimeCalculator');
const { notifyNewBooking } = require('./sseService');
const { sendBookingConfirmation } = require('./notificationService');

// Create a new booking with optimized logic
const createBooking = async (restaurantId, bookingData) => {
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant || !restaurant.isActive) {
      throw new Error('Restaurant not found or inactive');
    }

    // Calculate wait time
    const waitTime = await calculateWaitTime(restaurantId, bookingData.partySize);
    const estimatedSeatingTime = new Date(Date.now() + waitTime * 60 * 1000);

    // Create booking
    const booking = new Booking({
      restaurantId,
      ...bookingData,
      waitTime,
      estimatedSeatingTime
    });

    await booking.save();
    
    // Populate booking for SSE notification
    const populatedBooking = await Booking.findById(booking._id)
      .populate('restaurantId', 'name');
    
    // Send real-time update via SSE
    notifyNewBooking(restaurantId, populatedBooking);
    
    // Send confirmation notification
    await sendBookingConfirmation(populatedBooking);
    
    return {
      success: true,
      booking: populatedBooking
    };
  } catch (error) {
    console.error('Booking service error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get bookings with pagination and filtering
const getBookings = async (restaurantId, filters = {}, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    
    const query = { restaurantId, ...filters };
    
    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('restaurantId', 'name');
    
    const total = await Booking.countDocuments(query);
    
    return {
      success: true,
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    console.error('Get bookings service error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Update booking status
const updateBookingStatus = async (bookingId, status, additionalData = {}) => {
  try {
    const updateData = { status, ...additionalData };
    
    if (status === 'notified') {
      updateData.notificationSentAt = new Date();
    } else if (status === 'confirmed') {
      updateData.confirmationReceivedAt = new Date();
    }
    
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      updateData,
      { new: true }
    ).populate('restaurantId', 'name');
    
    if (!booking) {
      throw new Error('Booking not found');
    }
    
    return {
      success: true,
      booking
    };
  } catch (error) {
    console.error('Update booking status service error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get booking analytics for dashboard
const getBookingAnalytics = async (restaurantId, period = 'day') => {
  try {
    let startDate;
    const endDate = new Date();
    
    switch (period) {
      case 'day':
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      default:
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
    }
    
    // Get booking counts by status
    const statusCounts = await Booking.aggregate([
      {
        $match: {
          restaurantId: mongoose.Types.ObjectId(restaurantId),
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get average wait time
    const avgWaitTime = await Booking.aggregate([
      {
        $match: {
          restaurantId: mongoose.Types.ObjectId(restaurantId),
          status: { $in: ['confirmed', 'seated'] },
          confirmationReceivedAt: { $exists: true },
          checkInTime: { $exists: true },
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $addFields: {
          actualWaitTime: {
            $divide: [
              { $subtract: ['$confirmationReceivedAt', '$checkInTime'] },
              60000 // Convert milliseconds to minutes
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          avgWaitTime: { $avg: '$actualWaitTime' }
        }
      }
    ]);
    
    // Get peak hours
    const peakHours = await Booking.aggregate([
      {
        $match: {
          restaurantId: mongoose.Types.ObjectId(restaurantId),
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: { $hour: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      }
    ]);
    
    return {
      success: true,
      analytics: {
        statusCounts,
        avgWaitTime: avgWaitTime[0]?.avgWaitTime || 0,
        peakHours
      }
    };
  } catch (error) {
    console.error('Get booking analytics service error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = {
  createBooking,
  getBookings,
  updateBookingStatus,
  getBookingAnalytics
};