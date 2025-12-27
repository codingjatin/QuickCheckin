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
const { authenticateUser } = require('../middleware/auth');
const { verifyTelnyxSignature } = require('../middleware/telnyxWebhook');

// ============================================
// PUBLIC ROUTES (No auth required)
// ============================================

// Create booking (from kiosk - public facing)
router.post('/:restaurantId/bookings', validateBookingData, createBooking);

// Get single booking status (customer can check their own booking)
router.get('/booking/:bookingId', getBookingStatus);

// Telnyx webhook for customer SMS responses (validated by signature)
router.post('/sms/inbound', verifyTelnyxSignature, handleCustomerResponse);

// ============================================
// PROTECTED ROUTES (Require authentication)
// ============================================

// Get all bookings for a restaurant (admin only)
router.get('/:restaurantId/bookings', authenticateUser, getBookings);

// Get dashboard stats (admin only)
router.get('/:restaurantId/dashboard-stats', authenticateUser, getDashboardStats);

// Notify customer (table ready) - admin only
router.post('/booking/:bookingId/notify', authenticateUser, notifyCustomer);

// Mark customer as seated - admin only
router.post('/booking/:bookingId/seated', authenticateUser, markSeated);

// Cancel booking - admin only
router.post('/booking/:bookingId/cancel', authenticateUser, cancelBooking);

// Complete booking (guest finished dining) - admin only
router.post('/booking/:bookingId/complete', authenticateUser, completeBooking);

module.exports = router;