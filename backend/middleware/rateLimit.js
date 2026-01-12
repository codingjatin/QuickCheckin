const rateLimit = require('express-rate-limit');

// General rate limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 160, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiter for sensitive operations
const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 11, // limit each IP to 5 requests per windowMs
  message: 'Too many attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// OTP-specific rate limiter
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes (was 1 hour)
  max: 10, // limit each IP to 10 OTP requests per 15 minutes (was 3 per hour)
  message: 'Too many OTP requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// SSE connection rate limiter
const sseLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 SSE connections per minute
  message: 'Too many SSE connections, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Dynamic rate limiting based on user type
const dynamicRateLimiter = (req, res, next) => {
  // Check if user is authenticated (super admin or restaurant admin)
  if (req.superAdmin || req.restaurant) {
    // Authenticated users get higher limits
    return rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 500, // Higher limit for authenticated users
      message: 'Too many requests, please try again later.',
      standardHeaders: true,
      legacyHeaders: false,
    })(req, res, next);
  } else {
    // Anonymous users get lower limits
    return rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100, // Lower limit for anonymous users
      message: 'Too many requests, please try again later.',
      standardHeaders: true,
      legacyHeaders: false,
    })(req, res, next);
  }
};

module.exports = {
  generalLimiter,
  strictLimiter,
  otpLimiter,
  sseLimiter,
  dynamicRateLimiter
};