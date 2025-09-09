const express = require('express');
const router = express.Router();
const {
  login,
  getRestaurants,
  addRestaurant,
  toggleRestaurantStatus,
  deleteRestaurant,
  requestPasswordResetOTP,
  resetPasswordWithOTP
} = require('../controllers/superAdminController');
const { authenticateSuperAdmin } = require('../middleware/auth');
const { validateRestaurantData } = require('../middleware/validation');

// Public routes
router.post('/login', login);
router.post('/request-password-reset-otp', requestPasswordResetOTP);
router.post('/reset-password-with-otp', resetPasswordWithOTP);

// Protected routes
router.get('/restaurants', authenticateSuperAdmin, getRestaurants);
router.post('/restaurants', authenticateSuperAdmin, validateRestaurantData, addRestaurant);
router.patch('/restaurants/:restaurantId/toggle-status', authenticateSuperAdmin, toggleRestaurantStatus);
router.delete('/restaurants/:restaurantId', authenticateSuperAdmin, deleteRestaurant);

module.exports = router;