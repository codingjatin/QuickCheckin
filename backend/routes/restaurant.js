const express = require('express');
const router = express.Router();
const {
  requestLoginOTP,
  verifyLoginOTP,
  getSettings,
  updateSettings,
  getDashboardData,
  updateTables,
  updateTableStatus,
  updateLogo,
  getMessages
} = require('../controllers/restaurantController');
const { authenticateUser } = require('../middleware/auth');
const upload = require('../config/aws');

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

// Protected routes (require JWT)
router.get('/:restaurantId/settings', authenticateUser, getSettings);
router.put('/:restaurantId/settings', authenticateUser, updateSettings);
router.get('/:restaurantId/dashboard', authenticateUser, getDashboardData);
router.put('/:restaurantId/tables', authenticateUser, updateTables);
router.patch('/table/:tableId/status', authenticateUser, updateTableStatus);
router.post('/:restaurantId/logo', authenticateUser, upload.single('logo'), updateLogo);
router.get('/:restaurantId/messages', authenticateUser, getMessages);

module.exports = router;
