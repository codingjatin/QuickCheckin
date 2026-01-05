const express = require('express');
const router = express.Router();
const {
  getSubscription,
  upgradeSubscription,
  downgradeSubscription,
  cancelDowngrade,
  cancelSubscription,
  updatePaymentMethod,
  updateSeatCapacity
} = require('../controllers/subscriptionController');
const { authenticateUser } = require('../middleware/auth');

// All subscription routes require authentication
router.use(authenticateUser);

// Get subscription details
router.get('/:id/subscription', getSubscription);

// Upgrade to Large plan (immediate with proration)
router.post('/:id/subscription/upgrade', upgradeSubscription);

// Downgrade to Small plan (scheduled for next billing cycle)
router.post('/:id/subscription/downgrade', downgradeSubscription);

// Cancel pending downgrade
router.post('/:id/subscription/cancel-downgrade', cancelDowngrade);

// Cancel subscription
router.post('/:id/subscription/cancel', cancelSubscription);

// Update payment method
router.post('/:id/payment-method', updatePaymentMethod);

// Update seat capacity (may trigger plan change)
router.post('/:id/seat-capacity', updateSeatCapacity);

module.exports = router;
