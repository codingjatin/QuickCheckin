const Restaurant = require('../models/Restaurant');
const Session = require('../models/Session');
const generateOTP = require('../utils/otpGenerator');
const { sendSMS, formatPhoneNumber } = require('../utils/telnyxService');

// Request OTP for restaurant admin login
const requestLoginOTP = async (req, res) => {
  try {
    const { restaurantId, phone } = req.body;

    if (!restaurantId || !phone) {
      return res.status(400).json({ message: 'Restaurant ID and phone number are required.' });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant || !restaurant.isActive) {
      return res.status(404).json({ message: 'Restaurant not found or inactive.' });
    }

    // Check if phone matches restaurant's registered phone
    const cleanedPhone = phone.replace(/\D/g, '');
    const cleanedRestaurantPhone = restaurant.phone.replace(/\D/g, '');

    if (cleanedPhone !== cleanedRestaurantPhone) {
      return res.status(401).json({ message: 'Phone number does not match restaurant records.' });
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Save session with OTP
    await Session.findOneAndUpdate(
      { restaurantId, phone },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    // Send OTP via SMS
    const formattedPhone = formatPhoneNumber(phone);
    const message = `QuickCheck: Your verification code is ${otp}. Enter it on the screen to proceed.`;

    const smsResult = await sendSMS(formattedPhone, message);

    if (!smsResult.success) {
      return res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
    }

    res.json({ message: 'OTP sent successfully to your phone number' });
  } catch (error) {
    console.error('Request login OTP error:', error);
    res.status(500).json({ message: 'Server error sending OTP.' });
  }
};

// Verify OTP for restaurant admin login
const verifyLoginOTP = async (req, res) => {
  try {
    const { restaurantId, phone, otp } = req.body;

    if (!restaurantId || !phone || !otp) {
      return res.status(400).json({ message: 'Restaurant ID, phone number, and OTP are required.' });
    }

    // Verify OTP
    const session = await Session.findOne({ restaurantId, phone, otp });
    if (!session) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    if (session.expiresAt < new Date()) {
      await Session.findByIdAndDelete(session._id);
      return res.status(400).json({ message: 'OTP has expired.' });
    }

    // Get restaurant details
    const restaurant = await Restaurant.findById(restaurantId);

    // Delete used session
    await Session.findByIdAndDelete(session._id);

    // Create a session token (in production, use JWT)
    const sessionToken = require('crypto').randomBytes(32).toString('hex');

    // Store session token with expiration
    await Session.create({
      restaurantId,
      phone,
      otp: sessionToken, // Reusing OTP field for session token
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    });

    res.json({
      message: 'Login successful',
      sessionToken,
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

// Validate session token
const validateSession = async (req, res, next) => {
  try {
    const { restaurantId, sessionToken } = req.body;

    if (!restaurantId || !sessionToken) {
      return res.status(400).json({ message: 'Restaurant ID and session token are required.' });
    }

    const session = await Session.findOne({
      restaurantId,
      otp: sessionToken,
      expiresAt: { $gt: new Date() }
    });

    if (!session) {
      return res.status(401).json({ message: 'Invalid or expired session.' });
    }

    // Extend session expiration
    session.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await session.save();

    req.restaurantId = restaurantId;
    next();
  } catch (error) {
    console.error('Validate session error:', error);
    res.status(500).json({ message: 'Server error validating session.' });
  }
};

// Logout - invalidate session
const logout = async (req, res) => {
  try {
    const { restaurantId, sessionToken } = req.body;

    await Session.deleteOne({ restaurantId, otp: sessionToken });

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error during logout.' });
  }
};

module.exports = {
  requestLoginOTP,
  verifyLoginOTP,
  validateSession,
  logout
};