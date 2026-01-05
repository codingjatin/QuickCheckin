const Restaurant = require('../models/Restaurant');
const Session = require('../models/Session');
const SubscriptionHistory = require('../models/SubscriptionHistory');
const generateOTP = require('../utils/otpGenerator');
const { sendSMS, formatPhoneNumber } = require('../utils/telnyxService');
const {
  getPriceForRestaurant,
  createStripeCustomer,
  createStripeSubscription,
  stripe
} = require('../utils/stripeService');

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

    // Debug logging
    console.log('[OTP Verify] Looking for session with:', { restaurantId, phone, otp });
    
    // Verify OTP
    const session = await Session.findOne({ restaurantId, phone, otp });
    
    console.log('[OTP Verify] Session found:', session ? 'YES' : 'NO');
    
    if (!session) {
      // Check if there's ANY session for this restaurant/phone (for debugging)
      const anySessions = await Session.find({ restaurantId, phone });
      console.log('[OTP Verify] Sessions for this restaurant/phone:', anySessions.length);
      if (anySessions.length > 0) {
        console.log('[OTP Verify] Session OTPs:', anySessions.map(s => s.otp));
      }
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
      role: 'admin', // Add required role field
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

/**
 * Verify if business number is available
 * GET /api/auth/verify-business-number?number=XX-XXXXX&country=US
 */
const verifyBusinessNumber = async (req, res) => {
  try {
    const { number, country } = req.query;

    if (!number || !country) {
      return res.status(400).json({ message: 'Business number and country are required.' });
    }

    // Validate format
    const cleanNumber = number.trim().replace(/[^0-9]/g, '');
    
    if (!['US', 'CA'].includes(country)) {
      return res.status(400).json({ message: 'Country must be US or CA.' });
    }

    // Both US EIN and CA BN are 9 digits
    if (cleanNumber.length !== 9) {
      return res.status(400).json({ 
        message: country === 'US' 
          ? 'EIN must be 9 digits' 
          : 'Business Number must be 9 digits' 
      });
    }

    // Check uniqueness
    const existing = await Restaurant.findOne({ businessNumber: number.trim() });
    
    if (existing) {
      return res.status(409).json({ 
        available: false,
        message: 'This business is already registered. Please login instead.' 
      });
    }

    res.json({ available: true });
  } catch (error) {
    console.error('Verify business number error:', error);
    res.status(500).json({ message: 'Server error verifying business number.' });
  }
};

/**
 * Restaurant Self-Service Signup
 * POST /api/auth/signup
 */
const signup = async (req, res) => {
  try {
    const {
      restaurantName,
      country,
      state,
      city,
      businessNumber,
      email,
      phone,
      seatCapacity,
      paymentMethodId // Stripe payment method ID from frontend
    } = req.body;

    // Validation
    if (!restaurantName || !country || !city || !businessNumber || !email || !phone || !seatCapacity || !paymentMethodId) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (!['US', 'CA'].includes(country)) {
      return res.status(400).json({ message: 'Country must be US or CA.' });
    }

    if (seatCapacity < 1) {
      return res.status(400).json({ message: 'Seat capacity must be at least 1.' });
    }

    // Check business number uniqueness BEFORE Stripe
    const existing = await Restaurant.findOne({ businessNumber: businessNumber.trim() });
    if (existing) {
      return res.status(409).json({message: 'This business is already registered.' });
    }

    // Check email uniqueness
    const existingEmail = await Restaurant.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(409).json({ message: 'This email is already registered.' });
    }

    // Get pricing based on seat capacity
    const { priceId, plan, amount, currency } = getPriceForRestaurant(country, seatCapacity);

    // Create Stripe Customer
    const customerResult = await createStripeCustomer({
      email: email.toLowerCase(),
      name: restaurantName,
      phone: formatPhoneNumber(phone),
      metadata: {
        businessNumber,
        country,
        state: state || '',
        city,
        seatCapacity: seatCapacity.toString()
      }
    });

    if (!customerResult.success) {
      return res.status(500).json({ message: 'Payment processing error. Please try again.' });
    }

    const { customer } = customerResult;

    // Attach payment method to customer
    try {
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customer.id
      });

      await stripe.customers.update(customer.id, {
        invoice_settings: {
          default_payment_method: paymentMethodId
        }
      });
    } catch (error) {
      console.error('Payment method attach error:', error);
      // Clean up: delete the customer
      await stripe.customers.del(customer.id);
      return res.status(400).json({ message: 'Invalid payment method. Please try again.' });
    }

    // Create Stripe Subscription with 30-day trial
    const subscriptionResult = await createStripeSubscription({
      customerId: customer.id,
      priceId,
      trialDays: 30
    });

    if (!subscriptionResult.success) {
      // Clean up customer
      await stripe.customers.del(customer.id);
      return res.status(500).json({ message: 'Subscription creation failed. Please try again.' });
    }

    const { subscription } = subscriptionResult;

    // Create Restaurant in database
    const restaurant = new Restaurant({
      name: restaurantName,
      country,
      state,
      city,
      businessNumber: businessNumber.trim(),
      email: email.toLowerCase(),
      phone,
      seatCapacity,
      subscriptionPlan: plan,
      subscriptionStatus: 'trialing',
      stripeCustomerId: customer.id,
      stripeSubscriptionId: subscription.id,
      subscriptionStartDate: new Date(),
      subscriptionEndDate: new Date(subscription.trial_end * 1000),
      // During trial, next billing date is when trial ends
      nextBillingDate: new Date(subscription.trial_end * 1000),
      signupSource: 'self-service',
      isActive: true,
      createdBy: null
    });

    await restaurant.save();

    // Log subscription history
    await SubscriptionHistory.create({
      restaurantId: restaurant._id,
      action: 'trial_started',
      toPlan: plan,
      amount: amount * 100,
      currency,
      stripeSubscriptionId: subscription.id,
      metadata: {
        trialEndDate: subscription.trial_end,
        seatCapacity
      }
    });

    // Send welcome SMS
    const welcomeMsg = `Welcome to QuickCheck! Your 30-day free trial has started. Reply HELP for support.`;
    await sendSMS(formatPhoneNumber(phone), welcomeMsg);

    // Generate OTP for login
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const session = new Session({
      restaurantId: restaurant._id,
      phone,
      role: 'admin',
      otp,
      expiresAt
    });
    await session.save();

    // Send OTP
    const otpMsg = `Your QuickCheck login OTP is: ${otp}. Valid for 10 minutes.`;
    await sendSMS(formatPhoneNumber(phone), otpMsg);

    res.status(201).json({
      message: 'Signup successful! OTP sent to your phone.',
      restaurantId: restaurant._id,
      trialEndDate: subscription.trial_end,
      plan,
      amount,
      currency
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup. Please try again.' });
  }
};

module.exports = {
  requestLoginOTP,
  verifyLoginOTP,
  validateSession,
  logout,
  verifyBusinessNumber,
  signup
};