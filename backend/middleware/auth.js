const jwt = require('jsonwebtoken');
const Restaurant = require('../models/Restaurant');

// Verify User (Restaurant Admin/Guest) JWT token
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verify restaurant exists
    const restaurant = await Restaurant.findById(decoded.restaurantId);
    if (!restaurant || !restaurant.isActive) {
      return res.status(401).json({ message: 'Restaurant not found or inactive.' });
    }
    
    req.user = {
      restaurantId: decoded.restaurantId,
      phone: decoded.phone,
      role: decoded.role,
      restaurant
    };
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid.' });
  }
};

// Verify Restaurant Admin session
const authenticateRestaurantAdmin = async (req, res, next) => {
  try {
    const { restaurantId, sessionToken } = req.body;

    if (!restaurantId || !sessionToken) {
      return res.status(400).json({ message: 'Restaurant ID and session token are required.' });
    }

    const Session = require('../models/Session');
    const session = await Session.findOne({
      restaurantId,
      otp: sessionToken,
      expiresAt: { $gt: new Date() }
    });

    if (!session) {
      return res.status(401).json({ message: 'Invalid or expired session.' });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant || !restaurant.isActive) {
      return res.status(404).json({ message: 'Restaurant not found or inactive.' });
    }

    req.restaurant = restaurant;
    req.session = session;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error during authentication.' });
  }
};

module.exports = {
  authenticateUser,
  authenticateRestaurantAdmin
};