const express = require('express');
const router = express.Router();
const {
  createBooking,
  notifyCustomer,
  markSeated,
  cancelBooking,
  completeBooking,
  handleCustomerResponse,
  getBookingStatus,
  getBookings,
  getDashboardStats
} = require('../controllers/bookingController');
const { validateBookingData } = require('../middleware/validation');

// Create booking (from kiosk)
router.post('/:restaurantId/bookings', validateBookingData, createBooking);

// Get all bookings for a restaurant
router.get('/:restaurantId/bookings', getBookings);

// Get dashboard stats
router.get('/:restaurantId/dashboard-stats', getDashboardStats);

// Get single booking status
router.get('/booking/:bookingId', getBookingStatus);

// Notify customer (table ready)
router.post('/booking/:bookingId/notify', notifyCustomer);

// Mark customer as seated
router.post('/booking/:bookingId/seated', markSeated);

// Cancel booking
router.post('/booking/:bookingId/cancel', cancelBooking);

// Complete booking (guest finished dining)
router.post('/booking/:bookingId/complete', completeBooking);

// Telnyx webhook for customer SMS responses
router.post('/sms/inbound', handleCustomerResponse);

module.exports = router;