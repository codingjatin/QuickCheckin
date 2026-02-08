const crypto = require('crypto');

/**
 * Middleware to verify Telnyx webhook signatures
 * This prevents spoofed webhooks from being processed
 * 
 * Telnyx sends a signature in the 'telnyx-signature-ed25519' header
 * which must be verified using the public key
 */
const verifyTelnyxSignature = (req, res, next) => {
  // Skip verification in development if no public key configured
  if (process.env.NODE_ENV !== 'production' && !process.env.TELNYX_PUBLIC_KEY) {
    console.warn('⚠️ Telnyx signature verification skipped (dev mode, no public key)');
    return next();
  }

  const publicKey = process.env.TELNYX_PUBLIC_KEY;
  
  if (!publicKey) {
    console.warn('⚠️ TELNYX_PUBLIC_KEY not configured. Skipping signature verification (INSECURE - Add key for production).');
    return next();
  }

  const signature = req.headers['telnyx-signature-ed25519'];
  const timestamp = req.headers['telnyx-timestamp'];
  
  if (!signature || !timestamp) {
    console.warn('Missing Telnyx signature headers');
    return res.status(401).json({ message: 'Missing webhook signature' });
  }

  // Check timestamp to prevent replay attacks (allow 5 minute window)
  const timestampAge = Math.abs(Date.now() / 1000 - parseInt(timestamp));
  if (timestampAge > 300) {
    console.warn('Telnyx webhook timestamp too old:', timestampAge);
    return res.status(401).json({ message: 'Webhook timestamp too old' });
  }

  try {
    // Construct the signed payload
    const rawBody = JSON.stringify(req.body);
    const signedPayload = `${timestamp}|${rawBody}`;
    
    // Verify the signature using Ed25519
    const isValid = crypto.verify(
      null, // Ed25519 doesn't use a hash algorithm parameter
      Buffer.from(signedPayload),
      {
        key: `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`,
        format: 'pem',
        type: 'spki'
      },
      Buffer.from(signature, 'base64')
    );

    if (!isValid) {
      console.warn('Invalid Telnyx webhook signature');
      return res.status(401).json({ message: 'Invalid webhook signature' });
    }

    next();
  } catch (error) {
    console.error('Error verifying Telnyx signature:', error.message);
    return res.status(401).json({ message: 'Webhook verification failed' });
  }
};

module.exports = { verifyTelnyxSignature };
