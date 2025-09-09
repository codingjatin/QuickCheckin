const jwt = require('jsonwebtoken');
const SuperAdmin = require('../models/SuperAdmin');
const Restaurant = require('../models/Restaurant');

// Verify Super Admin JWT token
const authenticateSuperAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const superAdmin = await SuperAdmin.findById(decoded.id);
    
    if (!superAdmin) {
      return res.status(401).json({ message: 'Token is not valid.' });
    }
    
    req.superAdmin = superAdmin;
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
  authenticateSuperAdmin,
  authenticateRestaurantAdmin
};