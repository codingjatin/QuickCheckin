const express = require('express');
const router = express.Router();
const {
  requestLoginOTP,
  verifyLoginOTP,
  validateSession,
  logout,
  verifyBusinessNumber,
  signup
} = require('../controllers/authController');
const { otpLimiter } = require('../middleware/rateLimit');

// ============================================
// EXISTING AUTH ROUTES (Restaurant Login)
// ============================================

// Request OTP for restaurant admin login
router.post('/request-otp', otpLimiter, requestLoginOTP);

// Verify OTP and login
router.post('/verify-otp', verifyLoginOTP);

// Validate session (middleware for protected routes)
router.post('/validate-session', validateSession);

// Logout
router.post('/logout', logout);

// ============================================
// NEW SELF-SERVICE SIGNUP ROUTES
// ============================================

// Verify business number availability (public)
router.get('/verify-business-number', verifyBusinessNumber);

// Self-service signup with Stripe (public)
router.post('/signup', signup);

module.exports = router;