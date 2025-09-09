const express = require('express');
const router = express.Router();
const {
  requestLoginOTP,
  verifyLoginOTP,
  getDashboardData,
  updateTables,
  updateLogo
} = require('../controllers/restaurantController');
const { authenticateRestaurantAdmin } = require('../middleware/auth');
const upload = require('../config/aws'); // Multer-S3 configuration

// Public routes
router.post('/request-login-otp', requestLoginOTP);
router.post('/verify-login-otp', verifyLoginOTP);

// Protected routes
router.get('/:restaurantId/dashboard', authenticateRestaurantAdmin, getDashboardData);
router.put('/:restaurantId/tables', authenticateRestaurantAdmin, updateTables);
router.post('/:restaurantId/logo', authenticateRestaurantAdmin, upload.single('logo'), updateLogo);

module.exports = router;
