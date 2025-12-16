const { sendSMS, formatPhoneNumber } = require('../utils/telnyxService');

// Send booking confirmation SMS
const sendBookingConfirmation = async (booking) => {
  try {
    const message = `Hi ${booking.customerName}, your table for ${booking.partySize} is confirmed at ${booking.restaurantId.name}. Your estimated wait time is ${booking.waitTime} minutes.`;
    
    const formattedPhone = formatPhoneNumber(booking.customerPhone);
    const result = await sendSMS(formattedPhone, message);
    
    return result;
  } catch (error) {
    console.error('Send booking confirmation error:', error);
    return { success: false, error: error.message };
  }
};

// Send table ready notification
const sendTableReadyNotification = async (booking) => {
  try {
    const message = `Your table is ready at ${booking.restaurantId.name}. Please arrive within 15 minutes. Reply with Y (Yes) or N (No).`;
    
    const formattedPhone = formatPhoneNumber(booking.customerPhone);
    const result = await sendSMS(formattedPhone, message);
    
    return result;
  } catch (error) {
    console.error('Send table ready notification error:', error);
    return { success: false, error: error.message };
  }
};

// Send reminder notification
const sendReminderNotification = async (booking) => {
  try {
    const message = `Please reply quickly with Y (Yes) or N (No) so we can continue further.`;
    
    const formattedPhone = formatPhoneNumber(booking.customerPhone);
    const result = await sendSMS(formattedPhone, message);
    
    return result;
  } catch (error) {
    console.error('Send reminder notification error:', error);
    return { success: false, error: error.message };
  }
};

// Send confirmation response
const sendConfirmationResponse = async (phone, message) => {
  try {
    const formattedPhone = formatPhoneNumber(phone);
    const result = await sendSMS(formattedPhone, message);
    
    return result;
  } catch (error) {
    console.error('Send confirmation response error:', error);
    return { success: false, error: error.message };
  }
};

// Bulk notifications for restaurant staff
const sendStaffNotifications = async (restaurant, message) => {
  try {
    // In a real implementation, you would get staff phone numbers from the database
    const staffNumbers = [restaurant.phone]; // Using restaurant phone as default
    
    const results = await Promise.all(
      staffNumbers.map(async phone => {
        const formattedPhone = formatPhoneNumber(phone);
        return await sendSMS(formattedPhone, message);
      })
    );
    
    return results;
  } catch (error) {
    console.error('Send staff notifications error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendBookingConfirmation,
  sendTableReadyNotification,
  sendReminderNotification,
  sendConfirmationResponse,
  sendStaffNotifications
};