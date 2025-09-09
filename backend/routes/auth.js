const express = require('express');
const router = express.Router();
const {
  requestLoginOTP,
  verifyLoginOTP,
  validateSession,
  logout
} = require('../controllers/authController');
const { otpLimiter } = require('../middleware/rateLimit');

// Request OTP for restaurant admin login
router.post('/request-otp', otpLimiter, requestLoginOTP);

// Verify OTP and login
router.post('/verify-otp', verifyLoginOTP);

// Validate session (middleware for protected routes)
router.post('/validate-session', validateSession);

// Logout
router.post('/logout', logout);

module.exports = router;