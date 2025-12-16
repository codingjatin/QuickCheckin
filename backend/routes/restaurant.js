const express = require('express');
const router = express.Router();
const {
  requestLoginOTP,
  verifyLoginOTP,
  getDashboardData,
  updateTables,
  updateLogo
} = require('../controllers/restaurantController');
const { authenticateRestaurantAdmin, authenticateUser } = require('../middleware/auth');
const upload = require('../config/aws'); // Multer-S3 configuration

// Public routes
router.post('/request-login-otp', requestLoginOTP);
router.post('/verify-login-otp', verifyLoginOTP);

// Token validation endpoint
router.get('/me', authenticateUser, (req, res) => {
  res.json({
    restaurantId: req.user.restaurantId,
    phone: req.user.phone,
    role: req.user.role,
    restaurant: {
      id: req.user.restaurant._id,
      name: req.user.restaurant.name,
      city: req.user.restaurant.city,
      email: req.user.restaurant.email,
      phone: req.user.restaurant.phone,
      logo: req.user.restaurant.logo
    }
  });
});

// Protected routes
router.get('/:restaurantId/dashboard', authenticateRestaurantAdmin, getDashboardData);
router.put('/:restaurantId/tables', authenticateRestaurantAdmin, updateTables);
router.post('/:restaurantId/logo', authenticateRestaurantAdmin, upload.single('logo'), updateLogo);

module.exports = router;
