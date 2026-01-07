'use client';

import { motion } from 'framer-motion';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-off">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-display font-bold text-ink mb-4">Terms of Service</h1>
          <p className="text-muted mb-8">Last updated: January 7, 2026</p>

          <div className="prose prose-lg max-w-none text-ink">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">1. Agreement to Terms</h2>
              <p className="text-ink/80 mb-4">
                By accessing or using QuickCheck's restaurant waitlist management service ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not use our Service.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">2. Description of Service</h2>
              <p className="text-ink/80 mb-4">
                QuickCheck provides a digital waitlist management system for restaurants, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-ink/80 space-y-2">
                <li>Kiosk interface for customer check-in</li>
                <li>Real-time waitlist management dashboard</li>
                <li>SMS notifications for table availability</li>
                <li>Table management and capacity tracking</li>
                <li>Analytics and reporting tools</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">3. Account Registration</h2>
              <p className="text-ink/80 mb-4">
                To use the Service as a restaurant administrator, you must:
              </p>
              <ul className="list-disc pl-6 mb-4 text-ink/80 space-y-2">
                <li>Provide accurate and complete business information</li>
                <li>Have authority to bind your business to these Terms</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
              <p className="text-ink/80">
                You are responsible for all activities that occur under your account.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">4. Subscription and Payment</h2>
              
              <h3 className="text-xl font-medium text-ink mb-3">4.1 Subscription Plans</h3>
              <p className="text-ink/80 mb-4">
                We offer two subscription plans:
              </p>
              <ul className="list-disc pl-6 mb-4 text-ink/80 space-y-2">
                <li><strong>Small Plan:</strong> For restaurants with less than 50 seats</li>
                <li><strong>Large Plan:</strong> For restaurants with 50 or more seats</li>
              </ul>

              <h3 className="text-xl font-medium text-ink mb-3">4.2 Free Trial</h3>
              <p className="text-ink/80 mb-4">
                New subscribers receive a 30-day free trial. Your payment method will not be charged during the trial period. You may cancel at any time before the trial ends.
              </p>

              <h3 className="text-xl font-medium text-ink mb-3">4.3 Billing</h3>
              <p className="text-ink/80 mb-4">
                Subscriptions are billed monthly. Payment is processed automatically through Stripe on the billing date. All prices are in CAD for Canadian customers and USD for US customers.
              </p>

              <h3 className="text-xl font-medium text-ink mb-3">4.4 Cancellation</h3>
              <p className="text-ink/80">
                You may cancel your subscription at any time. Cancellation takes effect at the end of your current billing period. No refunds are provided for partial months.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">5. Acceptable Use</h2>
              <p className="text-ink/80 mb-4">You agree NOT to:</p>
              <ul className="list-disc pl-6 mb-4 text-ink/80 space-y-2">
                <li>Use the Service for any illegal purpose</li>
                <li>Send spam or unsolicited messages through our SMS features</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Reverse engineer or attempt to extract source code</li>
                <li>Use the Service to collect customer data for purposes beyond waitlist management</li>
                <li>Resell or sublicense the Service without our consent</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">6. SMS Communications</h2>
              <p className="text-ink/80 mb-4">
                By using our Service:
              </p>
              <ul className="list-disc pl-6 mb-4 text-ink/80 space-y-2">
                <li>Restaurant operators agree to only send waitlist-related notifications</li>
                <li>Customers joining the waitlist consent to receive SMS notifications</li>
                <li>SMS costs are included in your subscription—no additional per-message charges</li>
                <li>Message frequency varies based on service usage</li>
              </ul>
              <p className="text-ink/80">
                Standard messaging rates from your carrier may apply.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">7. Intellectual Property</h2>
              <p className="text-ink/80">
                The Service and its original content, features, and functionality are owned by QuickCheck and are protected by international copyright, trademark, and other intellectual property laws. You may not use our branding, logos, or trademarks without prior written consent.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">8. Data and Privacy</h2>
              <p className="text-ink/80">
                Your use of the Service is also governed by our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>. Please review it carefully. By using the Service, you consent to our data practices as described therein.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">9. Service Availability</h2>
              <p className="text-ink/80 mb-4">
                We strive for 99.9% uptime but cannot guarantee uninterrupted service. We are not liable for:
              </p>
              <ul className="list-disc pl-6 mb-4 text-ink/80 space-y-2">
                <li>Scheduled maintenance (with advance notice)</li>
                <li>Unscheduled outages due to factors beyond our control</li>
                <li>Third-party service failures (SMS carriers, payment processors)</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">10. Limitation of Liability</h2>
              <p className="text-ink/80 mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </p>
              <ul className="list-disc pl-6 mb-4 text-ink/80 space-y-2">
                <li>QuickCheck shall not be liable for any indirect, incidental, special, consequential, or punitive damages</li>
                <li>Our total liability shall not exceed the amount paid by you in the 12 months prior to the claim</li>
                <li>We are not responsible for missed notifications due to customer phone number errors or carrier issues</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">11. Disclaimer of Warranties</h2>
              <p className="text-ink/80">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">12. Indemnification</h2>
              <p className="text-ink/80">
                You agree to indemnify and hold harmless QuickCheck and its affiliates, officers, and employees from any claims, damages, or expenses arising from your use of the Service or violation of these Terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">13. Termination</h2>
              <p className="text-ink/80 mb-4">
                We may terminate or suspend your account immediately, without prior notice, for:
              </p>
              <ul className="list-disc pl-6 mb-4 text-ink/80 space-y-2">
                <li>Breach of these Terms</li>
                <li>Non-payment of subscription fees</li>
                <li>Fraudulent or illegal activity</li>
                <li>Abuse of our SMS system</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">14. Governing Law</h2>
              <p className="text-ink/80">
                These Terms shall be governed by and construed in accordance with the laws of the Province of Ontario, Canada, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Ontario.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">15. Changes to Terms</h2>
              <p className="text-ink/80">
                We reserve the right to modify these Terms at any time. We will provide at least 30 days' notice for material changes. Continued use of the Service after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">16. Contact Us</h2>
              <p className="text-ink/80">
                If you have questions about these Terms, please contact us at:
              </p>
              <p className="text-ink/80 mt-4">
                <strong>QuickCheck Inc.</strong><br />
                Email: <a href="mailto:legal@quickcheckin.ca" className="text-primary hover:underline">legal@quickcheckin.ca</a><br />
                Website: <a href="https://quickcheckin.ca" className="text-primary hover:underline">quickcheckin.ca</a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
