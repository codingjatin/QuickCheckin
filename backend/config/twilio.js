const twilio = require('twilio');

// Initialize Twilio client
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Verify phone number format
const isValidPhoneNumber = (phone) => {
  // Basic validation - in production, use a library like libphonenumber
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10;
};

// Format phone number for Twilio
const formatPhoneNumberForTwilio = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `+1${cleaned}`; // US numbers
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned}`;
  } else {
    return `+${cleaned}`;
  }
};

// Send SMS with retry logic
const sendSMSWithRetry = async (to, message, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: formatPhoneNumberForTwilio(to)
      });
      
      console.log(`SMS sent successfully on attempt ${attempt}:`, result.sid);
      return { success: true, messageId: result.sid };
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error.message);
      
      if (attempt === maxRetries) {
        return { 
          success: false, 
          error: `Failed after ${maxRetries} attempts: ${error.message}` 
        };
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
    }
  }
};

module.exports = {
  twilioClient,
  isValidPhoneNumber,
  formatPhoneNumberForTwilio,
  sendSMSWithRetry
};