const express = require('express');
const router = express.Router();
const sseEmitter = require('../utils/sseEmitter');
const { authenticateUser } = require('../middleware/auth');

// SSE endpoint for real-time updates
router.get('/:restaurantId/events', (req, res) => {
  const { restaurantId } = req.params;

  // Validate token from query (since EventSource doesn't support headers easily)
  const token = req.query.token || req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Token required for SSE connection' });
  }

  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // For nginx
  res.flushHeaders();

  // Send initial connection message
  res.write(`data: ${JSON.stringify({ type: 'connected', restaurantId })}\n\n`);

  // Add client to emitter
  sseEmitter.addClient(restaurantId, res);

  // Keep connection alive with heartbeat
  const heartbeat = setInterval(() => {
    res.write(`:heartbeat\n\n`);
  }, 30000);

  // Handle client disconnect
  req.on('close', () => {
    clearInterval(heartbeat);
    sseEmitter.removeClient(restaurantId, res);
  });
});

module.exports = router;