const express = require('express');
const router = express.Router();
const { sseHandler } = require('../controllers/sseController');

// SSE connection endpoint
router.get('/:restaurantId/updates', sseHandler);

module.exports = router;