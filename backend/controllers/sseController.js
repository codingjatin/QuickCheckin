// Store connected clients
const clients = new Map();

// SSE connection handler
const sseHandler = (req, res) => {
  const { restaurantId } = req.params;
  
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.flushHeaders();
  
  // Add client to the list
  if (!clients.has(restaurantId)) {
    clients.set(restaurantId, new Set());
  }
  clients.get(restaurantId).add(res);
  
  // Send initial data
  const initialData = {
    type: 'connected',
    message: 'SSE connection established',
    timestamp: new Date().toISOString()
  };
  
  res.write(`data: ${JSON.stringify(initialData)}\n\n`);
  
  // Remove client on connection close
  req.on('close', () => {
    if (clients.has(restaurantId)) {
      clients.get(restaurantId).delete(res);
      if (clients.get(restaurantId).size === 0) {
        clients.delete(restaurantId);
      }
    }
  });
};

// Send update to all connected clients for a restaurant
const sendUpdateToClients = (restaurantId, data) => {
  if (clients.has(restaurantId)) {
    clients.get(restaurantId).forEach(client => {
      client.write(`data: ${JSON.stringify(data)}\n\n`);
    });
  }
};

// Notify about new booking
const notifyNewBooking = (restaurantId, booking) => {
  const data = {
    type: 'new_booking',
    booking,
    timestamp: new Date().toISOString()
  };
  
  sendUpdateToClients(restaurantId, data);
};

// Notify about booking update
const notifyBookingUpdate = (restaurantId, bookingId, status) => {
  const data = {
    type: 'booking_update',
    bookingId,
    status,
    timestamp: new Date().toISOString()
  };
  
  sendUpdateToClients(restaurantId, data);
};

// Notify about table status change
const notifyTableUpdate = (restaurantId, tableData) => {
  const data = {
    type: 'table_update',
    tables: tableData,
    timestamp: new Date().toISOString()
  };
  
  sendUpdateToClients(restaurantId, data);
};

module.exports = {
  sseHandler,
  notifyNewBooking,
  notifyBookingUpdate,
  notifyTableUpdate
};