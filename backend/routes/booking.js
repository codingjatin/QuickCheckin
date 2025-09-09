const express = require('express');
const router = express.Router();
const {
  createBooking,
  notifyCustomer,
  handleCustomerResponse,
  getBookingStatus
} = require('../controllers/bookingController');
const { validateBookingData } = require('../middleware/validation');
const { authenticateRestaurantAdmin } = require('../middleware/auth');

// Public routes
router.post('/:restaurantId/bookings', validateBookingData, createBooking);
router.post('/sms-callback', handleCustomerResponse);
router.get('/:restaurantId/bookings/:bookingId', getBookingStatus);

// Protected routes
router.post('/:restaurantId/bookings/:bookingId/notify', authenticateRestaurantAdmin, notifyCustomer);

module.exports = router;