const EventEmitter = require('events');
const Redis = require('ioredis');

// Create a global event emitter for SSE
class SSEEmitter extends EventEmitter {
  constructor() {
    super();
    this.clients = new Map(); // Map of restaurantId -> Set of response objects
    
    // Redis Setup for Horizontal Scaling
    const redisUrl = process.env.REDIS_URL;
    
    if (redisUrl) {
      console.log('[SSE] Initializing Redis Pub/Sub for Autoscaling...');
      
      // 1. Publisher (sends events to Redis)
      this.pub = new Redis(redisUrl, {
        retryStrategy: (times) => Math.min(times * 50, 2000), // Retry connection logic
        reconnectOnError: false
      });
      
      // 2. Subscriber (listens for events from other servers)
      this.sub = new Redis(redisUrl, {
        retryStrategy: (times) => Math.min(times * 50, 2000)
      });
      
      this.pub.on('error', (err) => console.error('[SSE] Redis Pub Error:', err));
      this.sub.on('error', (err) => console.error('[SSE] Redis Sub Error:', err));

      // Subscribe to all SSE channels
      this.sub.subscribe('sse-broadcast', (err) => {
        if (err) console.error('[SSE] Failed to subscribe to Redis channel:', err);
        else console.log('[SSE] Subscribed to Redis broadcast channel');
      });

      // Listen for messages from Redis (triggered by ANY server instance)
      this.sub.on('message', (channel, message) => {
        try {
          const { restaurantId, type, data } = JSON.parse(message);
          // Broadcast to LOCAL clients connected to THIS server instance
          this.sendToLocalClients(restaurantId, type, data);
        } catch (error) {
          console.error('[SSE] Error processing Redis message:', error);
        }
      });
    } else {
      console.warn('[SSE] NO REDIS_URL FOUND. Running in single-instance mode safely. Autoscaling will NOT work.');
    }
  }

  // Add a client connection
  addClient(restaurantId, res) {
    if (!this.clients.has(restaurantId)) {
      this.clients.set(restaurantId, new Set());
    }
    this.clients.get(restaurantId).add(res);
    
    console.log(`[SSE] Client connected for restaurant ${restaurantId}. Total: ${this.clients.get(restaurantId).size}`);
  }

  // Remove a client connection
  removeClient(restaurantId, res) {
    if (this.clients.has(restaurantId)) {
      this.clients.get(restaurantId).delete(res);
      console.log(`[SSE] Client disconnected from restaurant ${restaurantId}`);
    }
  }

  // PUBLIC API: Broadcast event (Using Redis if available)
  sendToRestaurant(restaurantId, eventType, data) {
    if (this.pub) {
      // Setup: Publish to Redis -> Redis notifies ALL instances -> instances call sendToLocalClients
      this.pub.publish('sse-broadcast', JSON.stringify({
        restaurantId,
        type: eventType,
        data
      })).catch(err => console.error('[SSE] Publish error:', err));
    } else {
      // Fallback: Just send locally (Single instance mode)
      this.sendToLocalClients(restaurantId, eventType, data);
    }
  }

  // BROADCAST API: (Using Redis if available)
  broadcast(eventType, data) {
    // Note: Implementing global broadcast via same channel logic if needed, 
    // but typically we broadcast to specific restaurant.
    // For now, ignoring global broadcast as applied to "all restaurants" isn't a primary use case yet.
    // If needed, we would publish to a 'sse-global' channel.
    console.warn('[SSE] Global broadcast not fully implemented over Redis yet.');
  }

  // INTERNAL: Send to locally connected clients
  sendToLocalClients(restaurantId, eventType, data) {
    const clients = this.clients.get(restaurantId.toString());
    if (!clients || clients.size === 0) {
      return;
    }

    const eventData = JSON.stringify({
      type: eventType,
      data,
      timestamp: new Date().toISOString()
    });

    clients.forEach((res) => {
      try {
        res.write(`data: ${eventData}\n\n`);
      } catch (error) {
        console.error('[SSE] Error sending to client:', error);
        this.removeClient(restaurantId, res);
      }
    });
  }
}

// Create singleton instance
const sseEmitter = new SSEEmitter();

// Listen for events from booking controller (Local events trigger the Redis publish)
sseEmitter.on('booking', ({ restaurantId, type, booking }) => {
  sseEmitter.sendToRestaurant(restaurantId, type, { booking });
});

sseEmitter.on('message', ({ restaurantId, type, customerPhone }) => {
  sseEmitter.sendToRestaurant(restaurantId, type, { customerPhone });
});

sseEmitter.on('table', ({ restaurantId, type, table }) => {
  sseEmitter.sendToRestaurant(restaurantId, type, { table });
});

sseEmitter.on('waitTime', ({ restaurantId, type, waitTimes }) => {
  sseEmitter.sendToRestaurant(restaurantId, type, { waitTimes });
});

module.exports = sseEmitter;
