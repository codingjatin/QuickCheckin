const validator = require('validator');

const validateEmail = (email) => {
  return validator.isEmail(email);
};

const validatePhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10;
};

const validateRestaurantData = (req, res, next) => {
  const { name, city, email, phone, businessNumber } = req.body;
  
  if (!name || !city || !email || !phone || !businessNumber) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }
  
  if (!validatePhone(phone)) {
    return res.status(400).json({ message: 'Invalid phone number.' });
  }
  
  next();
};

const validateBookingData = (req, res, next) => {
  const { customerName, customerPhone, partySize } = req.body;
  
  if (!customerName || !customerPhone || !partySize) {
    return res.status(400).json({ message: 'Customer name, phone, and party size are required.' });
  }
  
  if (!validatePhone(customerPhone)) {
    return res.status(400).json({ message: 'Invalid phone number.' });
  }
  
  if (partySize < 1) {
    return res.status(400).json({ message: 'Party size must be at least 1.' });
  }
  
  next();
};

module.exports = {
  validateRestaurantData,
  validateBookingData
};