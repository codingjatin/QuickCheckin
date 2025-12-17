const EventEmitter = require('events');

// Create a global event emitter for SSE
class SSEEmitter extends EventEmitter {
  constructor() {
    super();
    this.clients = new Map(); // Map of restaurantId -> Set of response objects
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

  // Send event to all clients of a restaurant
  sendToRestaurant(restaurantId, eventType, data) {
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

  // Broadcast to all connected clients
  broadcast(eventType, data) {
    const eventData = JSON.stringify({
      type: eventType,
      data,
      timestamp: new Date().toISOString()
    });

    this.clients.forEach((clients, restaurantId) => {
      clients.forEach((res) => {
        try {
          res.write(`data: ${eventData}\n\n`);
        } catch (error) {
          console.error('[SSE] Error broadcasting to client:', error);
          this.removeClient(restaurantId, res);
        }
      });
    });
  }
}

// Create singleton instance
const sseEmitter = new SSEEmitter();

// Listen for events from booking controller
sseEmitter.on('booking', ({ restaurantId, type, booking }) => {
  sseEmitter.sendToRestaurant(restaurantId, type, { booking });
});

sseEmitter.on('message', ({ restaurantId, type, customerPhone }) => {
  sseEmitter.sendToRestaurant(restaurantId, type, { customerPhone });
});

sseEmitter.on('table', ({ restaurantId, type, table }) => {
  sseEmitter.sendToRestaurant(restaurantId, type, { table });
});

module.exports = sseEmitter;
