// Store connected clients by restaurant ID
const clients = new Map();

// Add client to SSE connections
const addClient = (restaurantId, res) => {
  if (!clients.has(restaurantId)) {
    clients.set(restaurantId, new Set());
  }
  clients.get(restaurantId).add(res);
  
  // Remove client on connection close
  res.on('close', () => {
    removeClient(restaurantId, res);
  });
};

// Remove client from SSE connections
const removeClient = (restaurantId, res) => {
  if (clients.has(restaurantId)) {
    clients.get(restaurantId).delete(res);
    
    // Clean up empty sets
    if (clients.get(restaurantId).size === 0) {
      clients.delete(restaurantId);
    }
  }
};

// Send data to all clients for a specific restaurant
const sendToClients = (restaurantId, data) => {
  if (clients.has(restaurantId)) {
    clients.get(restaurantId).forEach(client => {
      try {
        client.write(`data: ${JSON.stringify(data)}\n\n`);
      } catch (error) {
        console.error('Error sending SSE data:', error);
        removeClient(restaurantId, client);
      }
    });
  }
};

// Notify about new booking
const notifyNewBooking = (restaurantId, booking) => {
  const data = {
    type: 'NEW_BOOKING',
    data: booking,
    timestamp: new Date().toISOString()
  };
  
  sendToClients(restaurantId, data);
};

// Notify about booking status change
const notifyBookingStatusChange = (restaurantId, bookingId, status) => {
  const data = {
    type: 'BOOKING_STATUS_CHANGE',
    data: {
      bookingId,
      status
    },
    timestamp: new Date().toISOString()
  };
  
  sendToClients(restaurantId, data);
};

// Notify about table status change
const notifyTableStatusChange = (restaurantId, tableData) => {
  const data = {
    type: 'TABLE_STATUS_CHANGE',
    data: tableData,
    timestamp: new Date().toISOString()
  };
  
  sendToClients(restaurantId, data);
};

// Notify about wait time update
const notifyWaitTimeUpdate = (restaurantId, waitTime) => {
  const data = {
    type: 'WAIT_TIME_UPDATE',
    data: { waitTime },
    timestamp: new Date().toISOString()
  };
  
  sendToClients(restaurantId, data);
};

// Get connected clients count for a restaurant
const getConnectedClientsCount = (restaurantId) => {
  return clients.has(restaurantId) ? clients.get(restaurantId).size : 0;
};

// Get all connected clients count
const getAllConnectedClientsCount = () => {
  let total = 0;
  for (const clientSet of clients.values()) {
    total += clientSet.size;
  }
  return total;
};

module.exports = {
  addClient,
  removeClient,
  notifyNewBooking,
  notifyBookingStatusChange,
  notifyTableStatusChange,
  notifyWaitTimeUpdate,
  getConnectedClientsCount,
  getAllConnectedClientsCount
};