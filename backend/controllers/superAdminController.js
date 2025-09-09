const jwt = require('jsonwebtoken');
const SuperAdmin = require('../models/SuperAdmin');
const Restaurant = require('../models/Restaurant');
const Otp = require('../models/Otp');
const generateOTP = require('../utils/otpGenerator');
const { sendSMS } = require('../utils/twilioService');
const { formatPhoneNumber } = require('../utils/helpers');

// Super Admin Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    
    const superAdmin = await SuperAdmin.findOne({ email, isActive: true });
    if (!superAdmin) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    
    const isPasswordValid = await superAdmin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    
    // Update last login
    superAdmin.lastLogin = new Date();
    await superAdmin.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { id: superAdmin._id, email: superAdmin.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    
    res.json({
      message: 'Login successful',
      token,
      superAdmin: {
        id: superAdmin._id,
        email: superAdmin.email,
        phone: superAdmin.phone
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
};

// Get all restaurants
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
      .populate('createdBy', 'email')
      .sort({ createdAt: -1 });
    
    res.json({
      count: restaurants.length,
      restaurants
    });
  } catch (error) {
    console.error('Get restaurants error:', error);
    res.status(500).json({ message: 'Server error fetching restaurants.' });
  }
};

// Add new restaurant
const addRestaurant = async (req, res) => {
  try {
    const { name, city, email, phone, businessNumber } = req.body;
    
    // Check if restaurant already exists
    const existingRestaurant = await Restaurant.findOne({
      $or: [{ email }, { businessNumber }]
    });
    
    if (existingRestaurant) {
      return res.status(400).json({ 
        message: 'Restaurant with this email or business number already exists.' 
      });
    }
    
    // Create new restaurant
    const restaurant = new Restaurant({
      name,
      city,
      email,
      phone,
      businessNumber,
      createdBy: req.superAdmin._id
    });
    
    await restaurant.save();
    
    res.status(201).json({
      message: 'Restaurant added successfully',
      restaurant
    });
  } catch (error) {
    console.error('Add restaurant error:', error);
    res.status(500).json({ message: 'Server error adding restaurant.' });
  }
};

// Toggle restaurant active status
const toggleRestaurantStatus = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found.' });
    }
    
    restaurant.isActive = !restaurant.isActive;
    await restaurant.save();
    
    res.json({
      message: `Restaurant ${restaurant.isActive ? 'activated' : 'deactivated'} successfully`,
      restaurant
    });
  } catch (error) {
    console.error('Toggle restaurant status error:', error);
    res.status(500).json({ message: 'Server error toggling restaurant status.' });
  }
};

// Delete restaurant
const deleteRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found.' });
    }
    
    await Restaurant.findByIdAndDelete(restaurantId);
    
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('Delete restaurant error:', error);
    res.status(500).json({ message: 'Server error deleting restaurant.' });
  }
};

// Request OTP for password reset
const requestPasswordResetOTP = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }
    
    const superAdmin = await SuperAdmin.findOne({ email, isActive: true });
    if (!superAdmin) {
      return res.status(404).json({ message: 'Super admin not found with this email.' });
    }
    
    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    
    // Save OTP to database
    await Otp.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true }
    );
    
    // Send OTP via SMS
    const formattedPhone = formatPhoneNumber(superAdmin.phone);
    const message = `Your QuickCheck password reset OTP is: ${otp}. It will expire in 10 minutes.`;

    const smsSent = await sendSMS(formattedPhone, message);

    if (!smsSent) {
      return res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
    }

    res.json({
      message: 'OTP sent to your registered phone number'
    });
  } catch (error) {
    console.error('Request OTP error:', error);
    res.status(500).json({ message: 'Server error generating OTP.' });
  }
};

// Reset password with OTP
const resetPasswordWithOTP = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email, OTP, and new password are required.' });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }
    
    // Verify OTP
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }
    
    if (otpRecord.expiresAt < new Date()) {
      await Otp.findByIdAndDelete(otpRecord._id);
      return res.status(400).json({ message: 'OTP has expired.' });
    }
    
    // Update password
    const superAdmin = await SuperAdmin.findOne({ email });
    superAdmin.password = newPassword;
    await superAdmin.save();
    
    // Delete used OTP
    await Otp.findByIdAndDelete(otpRecord._id);
    
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error resetting password.' });
  }
};

module.exports = {
  login,
  getRestaurants,
  addRestaurant,
  toggleRestaurantStatus,
  deleteRestaurant,
  requestPasswordResetOTP,
  resetPasswordWithOTP
};