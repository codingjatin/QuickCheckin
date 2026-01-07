'use client';

import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-off">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-display font-bold text-ink mb-4">Privacy Policy</h1>
          <p className="text-muted mb-8">Last updated: January 7, 2026</p>

          <div className="prose prose-lg max-w-none text-ink">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">1. Introduction</h2>
              <p className="text-ink/80 mb-4">
                QuickCheck ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our restaurant waitlist management service.
              </p>
              <p className="text-ink/80">
                By using QuickCheck, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-ink mb-3">For Restaurant Owners/Administrators:</h3>
              <ul className="list-disc pl-6 mb-4 text-ink/80 space-y-2">
                <li><strong>Business Information:</strong> Restaurant name, address, city, email, phone number, business registration number</li>
                <li><strong>Account Information:</strong> Phone number for authentication via SMS OTP</li>
                <li><strong>Payment Information:</strong> Processed securely through Stripe (we do not store credit card details)</li>
                <li><strong>Subscription Data:</strong> Plan type, billing history, subscription status</li>
              </ul>

              <h3 className="text-xl font-medium text-ink mb-3">For Restaurant Customers (Waitlist):</h3>
              <ul className="list-disc pl-6 mb-4 text-ink/80 space-y-2">
                <li><strong>Personal Information:</strong> Name and phone number</li>
                <li><strong>Waitlist Data:</strong> Party size, check-in time, booking status</li>
                <li><strong>SMS Communications:</strong> Messages sent to/from your phone regarding your waitlist status</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">3. How We Use Your Information</h2>
              <p className="text-ink/80 mb-4">We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-6 mb-4 text-ink/80 space-y-2">
                <li>To provide and maintain our waitlist management service</li>
                <li>To send SMS notifications about table availability and waitlist status</li>
                <li>To process payments and manage subscriptions</li>
                <li>To authenticate restaurant administrators via SMS OTP</li>
                <li>To improve our service and customer experience</li>
                <li>To communicate important service updates</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">4. Data Retention</h2>
              <p className="text-ink/80 mb-4">
                <strong>Customer Waitlist Data:</strong> Booking records and SMS message logs are automatically deleted after <strong>48 hours</strong>. We do not retain customer personal information beyond this period.
              </p>
              <p className="text-ink/80">
                <strong>Restaurant Business Data:</strong> Account information is retained for as long as the account is active. Upon account deletion, data is removed within 30 days.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">5. Third-Party Services</h2>
              <p className="text-ink/80 mb-4">We use the following third-party services:</p>
              <ul className="list-disc pl-6 mb-4 text-ink/80 space-y-2">
                <li><strong>Telnyx:</strong> For SMS messaging. Their privacy policy: <a href="https://telnyx.com/privacy-policy" className="text-primary hover:underline">telnyx.com/privacy-policy</a></li>
                <li><strong>Stripe:</strong> For payment processing. Their privacy policy: <a href="https://stripe.com/privacy" className="text-primary hover:underline">stripe.com/privacy</a></li>
                <li><strong>MongoDB Atlas:</strong> For secure cloud data storage</li>
              </ul>
              <p className="text-ink/80">
                These services are PCI-DSS and SOC 2 compliant, ensuring your data is handled securely.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">6. Data Security</h2>
              <p className="text-ink/80 mb-4">
                We implement industry-standard security measures including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-ink/80 space-y-2">
                <li>HTTPS encryption for all data in transit</li>
                <li>Encrypted database storage</li>
                <li>JWT-based authentication with token expiration</li>
                <li>OTP-based phone verification</li>
                <li>No storage of credit card information on our servers</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">7. Your Rights</h2>
              <p className="text-ink/80 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 text-ink/80 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
              </ul>
              <p className="text-ink/80">
                To exercise these rights, contact us at <a href="mailto:privacy@quickcheckin.ca" className="text-primary hover:underline">privacy@quickcheckin.ca</a>
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">8. Children's Privacy</h2>
              <p className="text-ink/80">
                Our service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">9. Changes to This Policy</h2>
              <p className="text-ink/80">
                We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">10. Contact Us</h2>
              <p className="text-ink/80">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-ink/80 mt-4">
                <strong>QuickCheck Inc.</strong><br />
                Email: <a href="mailto:privacy@quickcheckin.ca" className="text-primary hover:underline">privacy@quickcheckin.ca</a><br />
                Website: <a href="https://quickcheckin.ca" className="text-primary hover:underline">quickcheckin.ca</a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
