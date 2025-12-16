const axios = require('axios');
const telnyx = require('telnyx')(process.env.TELNYX_API_KEY);

// Format phone number for Telnyx (E.164)
const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 10) {
    return `+1${cleaned}`; // US numbers
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned}`;
  } else {
    return `+${cleaned}`;
  }
};
const TELNYX_FROM = (process.env.TELNYX_PHONE_NUMBER || '').replace(/\D/g, ''); // digits only for sanity
const MESSAGING_PROFILE_ID = process.env.TELNYX_MESSAGING_PROFILE_ID; // add this to .env

const sendSMS = async (to, message, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const formattedTo = formatPhoneNumber(to);

      if (!TELNYX_FROM) throw new Error('TELNYX_PHONE_NUMBER not configured');
      const fromNumberE164 = `+${TELNYX_FROM}`;

      const payload = {
        from: fromNumberE164,
        to: formattedTo,
        text: message
      };

      if (MESSAGING_PROFILE_ID) payload.messaging_profile_id = MESSAGING_PROFILE_ID;

      console.log(`Sending SMS payload: ${JSON.stringify(payload)}`);

      // 1) Prefer the SDK .create if available
      if (telnyx && telnyx.messages && typeof telnyx.messages.create === 'function') {
        const resp = await telnyx.messages.create(payload);
        console.log('SMS sent via telnyx.messages.create:', resp?.data ?? resp);
        return { success: true, messageId: resp?.data?.id ?? resp?.id ?? null };
      }

      // 2) Fallback to SDK .send if available
      if (telnyx && telnyx.messages && typeof telnyx.messages.send === 'function') {
        const resp = await telnyx.messages.send(payload);
        console.log('SMS sent via telnyx.messages.send:', resp?.data ?? resp);
        return { success: true, messageId: resp?.data?.id ?? resp?.id ?? null };
      }

      // 3) Final fallback: direct REST call with axios
      const axiosResp = await axios.post(
        'https://api.telnyx.com/v2/messages',
        payload,
        {
          headers: {
            Authorization: `Bearer ${process.env.TELNYX_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('SMS sent via REST API:', axiosResp.data);
      return { success: true, messageId: axiosResp.data?.data?.id ?? null };

    } catch (error) {
      // Log full Telnyx error body if present
      if (error && error.response && error.response.data) {
        console.error(`Attempt ${attempt} failed - telnyx response:`, JSON.stringify(error.response.data));
      } else {
        console.error(`Attempt ${attempt} failed:`, error && error.message ? error.message : error);
      }

      if (attempt === maxRetries) {
        return {
          success: false,
          error: `Failed after ${maxRetries} attempts: ${error && error.message ? error.message : JSON.stringify(error)}`
        };
      }

      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
    }
  }
};

module.exports = {
  telnyx,
  formatPhoneNumber,
  sendSMS
};