const Booking = require('../models/Booking');
const Restaurant = require('../models/Restaurant');
const Session = require('../models/Session');
const generateOTP = require('../utils/otpGenerator');
const calculateWaitTime = require('../utils/waitTimeCalculator');
const { sendSMS } = require('../utils/telnyxService');
const { formatPhoneNumber } = require('../utils/helpers');

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { customerName, customerPhone, partySize } = req.body;
    
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant || !restaurant.isActive) {
      return res.status(404).json({ message: 'Restaurant not found or inactive.' });
    }
    
    // Calculate wait time
    const waitTime = await calculateWaitTime(restaurantId, partySize);
    const estimatedSeatingTime = new Date(Date.now() + waitTime * 60 * 1000);
    
    // Create booking
    const booking = new Booking({
      restaurantId,
      customerName,
      customerPhone,
      partySize,
      waitTime,
      estimatedSeatingTime
    });
    
    await booking.save();
    
    // Send confirmation SMS to customer
    const formattedPhone = formatPhoneNumber(customerPhone);
    const message = `Hi ${customerName}, your table for ${partySize} is confirmed at ${restaurant.name}. Your estimated wait time is ${waitTime} minutes.`;
    
    await sendSMS(formattedPhone, message);
    
    res.status(201).json({
      message: 'Booking created successfully',
      booking: {
        id: booking._id,
        customerName,
        customerPhone,
        partySize,
        waitTime,
        estimatedSeatingTime: booking.estimatedSeatingTime
      }
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error creating booking.' });
  }
};

// Notify customer that table is ready
const notifyCustomer = async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    const booking = await Booking.findById(bookingId).populate('restaurantId');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }
    
    if (booking.status !== 'waiting') {
      return res.status(400).json({ message: 'Customer has already been notified.' });
    }
    
    // Update booking status
    booking.status = 'notified';
    booking.notificationSentAt = new Date();
    await booking.save();
    
    // Send notification SMS to customer
    const formattedPhone = formatPhoneNumber(booking.customerPhone);
    const message = `Your table is ready at ${booking.restaurantId.name}. Please arrive within 15 minutes. Reply with Y (Yes) or N (No).`;
    
    const smsSent = await sendSMS(formattedPhone, message);
    
    if (!smsSent) {
      return res.status(500).json({ message: 'Failed to send notification. Please try again.' });
    }
    
    res.json({ message: 'Customer notified successfully' });
  } catch (error) {
    console.error('Notify customer error:', error);
    res.status(500).json({ message: 'Server error notifying customer.' });
  }
};

// Handle customer response
const handleCustomerResponse = async (req, res) => {
  try {
    // Telnyx webhook payload structure
    const { data } = req.body;
    
    if (!data || !data.payload) {
      return res.status(400).json({ message: 'Invalid webhook payload.' });
    }

    const { payload } = data;
    const from = payload.from.phone_number;
    const body = payload.text;
    
    if (!from || !body) {
      return res.status(400).json({ message: 'Phone number and message body are required.' });
    }
    
    // Find the most recent booking from this phone number
    const booking = await Booking.findOne({
      customerPhone: from.replace('+', ''), // Adjust based on how you store phones
      status: 'notified'
    }).sort({ notificationSentAt: -1 }).populate('restaurantId');
    
    if (!booking) {
      // Try with + prefix if stored that way
       const bookingWithPlus = await Booking.findOne({
        customerPhone: from,
        status: 'notified'
      }).sort({ notificationSentAt: -1 }).populate('restaurantId');

      if (!bookingWithPlus) {
          return res.status(404).json({ message: 'No active booking found for this phone number.' });
      }
    }
    
    const response = body.trim().toUpperCase();
    
    if (response === 'Y') {
      // Customer is coming
      booking.status = 'confirmed';
      booking.confirmationReceivedAt = new Date();
      await booking.save();
      
      // Send confirmation message
      const message = `Thank you for confirming! We'll hold your table for 15 minutes. See you soon at ${booking.restaurantId.name}!`;
      await sendSMS(from, message);
      
    } else if (response === 'N') {
      // Customer is not coming
      booking.status = 'cancelled';
      await booking.save();
      
      // Send cancellation message
      const message = `Your booking at ${booking.restaurantId.name} has been cancelled. We hope to see you another time!`;
      await sendSMS(from, message);
      
    } else {
      // Invalid response
      const message = `Invalid response. Please reply with Y (Yes) or N (No) to confirm your booking.`;
      await sendSMS(from, message);
      
      return res.json({ message: 'Invalid response received' });
    }
    
    res.json({ message: 'Customer response processed successfully' });
  } catch (error) {
    console.error('Handle customer response error:', error);
    res.status(500).json({ message: 'Server error processing customer response.' });
  }
};

// Get booking status
const getBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    const booking = await Booking.findById(bookingId).populate('restaurantId', 'name logo');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }
    
    res.json({
      booking: {
        id: booking._id,
        customerName: booking.customerName,
        partySize: booking.partySize,
        status: booking.status,
        waitTime: booking.waitTime,
        estimatedSeatingTime: booking.estimatedSeatingTime,
        checkInTime: booking.checkInTime,
        restaurant: booking.restaurantId
      }
    });
  } catch (error) {
    console.error('Get booking status error:', error);
    res.status(500).json({ message: 'Server error fetching booking status.' });
  }
};

module.exports = {
  createBooking,
  notifyCustomer,
  handleCustomerResponse,
  getBookingStatus
};