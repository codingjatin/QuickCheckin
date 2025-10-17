const Restaurant = require('../models/Restaurant');
const Table = require('../models/Table');
const Booking = require('../models/Booking');
const Session = require('../models/Session');
const generateOTP = require('../utils/otpGenerator');
const { sendSMS } = require('../utils/twilioService');
const { formatPhoneNumber } = require('../utils/helpers');

// Restaurant Admin Login - Request OTP
const requestLoginOTP = async (req, res) => {
  try {
    const { phone, role } = req.body;

    if (!phone || !role) {
      return res.status(400).json({ message: 'Phone number and role are required.' });
    }

    if (!['admin', 'guest'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be admin or guest.' });
    }

    const restaurant = await Restaurant.findOne({ phone });
    if (!restaurant || !restaurant.isActive) {
      return res.status(404).json({ message: 'Account not found or not activated.' });
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Save session with OTP
    await Session.findOneAndUpdate(
      { restaurantId: restaurant._id, phone, role },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    // Format phone number for SMS
    const formattedPhone = formatPhoneNumber(phone);

    // Send OTP via SMS
    const message = `Your QuickCheck login OTP is: ${otp}. It will expire in 10 minutes.`;
    const smsSent = await sendSMS(formattedPhone, message);

    if (!smsSent) {
      return res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
    }

    res.json({ message: 'OTP sent successfully to your phone number' });
  } catch (error) {
    console.error('Request login OTP error:', error);
    res.status(500).json({ message: 'Server error sending OTP.' });
  }
};

// Restaurant Admin Login - Verify OTP
const verifyLoginOTP = async (req, res) => {
  try {
    const { phone, role, otp } = req.body;

    if (!phone || !role || !otp) {
      return res.status(400).json({ message: 'Phone number, role, and OTP are required.' });
    }

    if (!['admin', 'guest'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be admin or guest.' });
    }

    // Find restaurant by phone
    const restaurant = await Restaurant.findOne({ phone });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found.' });
    }

    // Verify OTP
    const session = await Session.findOne({ restaurantId: restaurant._id, phone, role, otp });
    if (!session) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    if (session.expiresAt < new Date()) {
      await Session.findByIdAndDelete(session._id);
      return res.status(400).json({ message: 'OTP has expired.' });
    }

    // Delete used session
    await Session.findByIdAndDelete(session._id);

    res.json({
      message: 'Login successful',
      restaurant: {
        id: restaurant._id,
        name: restaurant.name,
        city: restaurant.city,
        email: restaurant.email,
        phone: restaurant.phone,
        logo: restaurant.logo
      }
    });
  } catch (error) {
    console.error('Verify login OTP error:', error);
    res.status(500).json({ message: 'Server error verifying OTP.' });
  }
};

// Get restaurant dashboard data
const getDashboardData = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant || !restaurant.isActive) {
      return res.status(404).json({ message: 'Restaurant not found or inactive.' });
    }
    
    // Get current bookings
    const currentBookings = await Booking.find({ restaurantId, status: 'waiting' })
      .sort({ createdAt: 1 });
    
    // Get table configuration
    const tables = await Table.find({ restaurantId });
    
    // Calculate available tables
    const availableTables = tables.reduce((total, table) => {
      return total + (table.isAvailable ? table.quantity : 0);
    }, 0);
    
    // Calculate total waiting customers
    const totalWaiting = currentBookings.length;
    
    // Calculate average wait time
    const avgWaitTime = restaurant.avgWaitTime;
    
    res.json({
      restaurant: {
        name: restaurant.name,
        logo: restaurant.logo
      },
      dashboard: {
        totalWaiting,
        availableTables,
        avgWaitTime
      },
      bookings: currentBookings,
      tables
    });
  } catch (error) {
    console.error('Get dashboard data error:', error);
    res.status(500).json({ message: 'Server error fetching dashboard data.' });
  }
};

// Update restaurant tables configuration
const updateTables = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { tables } = req.body;
    
    if (!Array.isArray(tables)) {
      return res.status(400).json({ message: 'Tables array is required.' });
    }
    
    // Delete existing tables for this restaurant
    await Table.deleteMany({ restaurantId });
    
    // Create new tables
    const tablePromises = tables.map(table => {
      return Table.create({
        restaurantId,
        capacity: table.capacity,
        quantity: table.quantity,
        isAvailable: true
      });
    });
    
    await Promise.all(tablePromises);
    
    res.json({ message: 'Tables updated successfully' });
  } catch (error) {
    console.error('Update tables error:', error);
    res.status(500).json({ message: 'Server error updating tables.' });
  }
};

// Update restaurant logo
const updateLogo = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Logo image is required.' });
    }
    
    // Get the S3 URL from the uploaded file
    const logoUrl = req.file.location;
    
    // Update restaurant logo
    await Restaurant.findByIdAndUpdate(restaurantId, { logo: logoUrl });
    
    res.json({ 
      message: 'Logo updated successfully',
      logoUrl 
    });
  } catch (error) {
    console.error('Update logo error:', error);
    res.status(500).json({ message: 'Server error updating logo.' });
  }
};

module.exports = {
  requestLoginOTP,
  verifyLoginOTP,
  getDashboardData,
  updateTables,
  updateLogo
};