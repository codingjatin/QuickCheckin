const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = async (to, message) => {
  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });
    
    console.log('SMS sent successfully:', result.sid);
    return true;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return false;
  }
};

module.exports = {
  sendSMS
};