'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// US States
const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

// Canadian Provinces
const CA_PROVINCES = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
  'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island',
  'Quebec', 'Saskatchewan', 'Yukon'
];

function SignupForm() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  
  const [formData, setFormData] = useState({
    restaurantName: '',
    country: 'US',
    state: '',
    city: '',
    businessNumber: '',
    email: '',
    phone: '',
    seatCapacity: 30
  });

  const [loading, setLoading] = useState(false);
  const [verifyingBusinessNumber, setVerifyingBusinessNumber] = useState(false);
  const [businessNumberAvailable, setBusinessNumberAvailable] = useState<boolean | null>(null);

  // Calculate plan and pricing based on seat capacity
  const plan = formData.seatCapacity >= 50 ? 'Large' : 'Small';
  const price = plan === 'Small' ? 299 : 499;
  const currency = formData.country === 'CA' ? 'CAD' : 'USD';

  // Verify business number availability
  const verifyBusinessNumber = async (number: string, country: string) => {
    if (!number || number.replace(/[^0-9]/g, '').length !== 9) {
      setBusinessNumberAvailable(null);
      return;
    }

    setVerifyingBusinessNumber(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-business-number?number=${encodeURIComponent(number)}&country=${country}`
      );
      const data = await response.json();
      setBusinessNumberAvailable(data.available);
      if (!data.available) {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Business number verification error:', error);
    } finally {
      setVerifyingBusinessNumber(false);
    }
  };

  // Debounce business number verification
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.businessNumber) {
        verifyBusinessNumber(formData.businessNumber, formData.country);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [formData.businessNumber, formData.country]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error('Stripe is not loaded. Please refresh the page.');
      return;
    }

    if (businessNumberAvailable === false) {
      toast.error('This business number is already registered.');
      return;
    }

    setLoading(true);

    try {
      // Create payment method
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: formData.restaurantName,
          email: formData.email,
          phone: formData.phone,
          address: {
            city: formData.city,
            state: formData.state,
            country: formData.country
          }
        }
      });

      if (error) {
        toast.error(error.message || 'Payment method creation failed');
        setLoading(false);
        return;
      }

      // Call signup API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          paymentMethodId: paymentMethod.id
        })
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Signup failed');
        setLoading(false);
        return;
      }

      toast.success(data.message);
      
      // Redirect to OTP verification
      router.push(`/auth/verify-otp?restaurantId=${data.restaurantId}&phone=${encodeURIComponent(formData.phone)}`);

    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'seatCapacity' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-2">Start Your Free Trial</h1>
      <p className="text-center text-gray-600 mb-8">30 days free, no credit card charge until trial ends</p>

      {/* Restaurant Name */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Restaurant Name *
        </label>
        <input
          type="text"
          name="restaurantName"
          required
          value={formData.restaurantName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter restaurant name"
        />
      </div>

      {/* Country */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Country *
        </label>
        <select
          name="country"
          required
          value={formData.country}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="US">United States</option>
          <option value="CA">Canada</option>
        </select>
      </div>

      {/* State/Province */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {formData.country === 'US' ? 'State' : 'Province'} *
        </label>
        <select
          name="state"
          required
          value={formData.state}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select {formData.country === 'US' ? 'state' : 'province'}</option>
          {(formData.country === 'US' ? US_STATES : CA_PROVINCES).map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* City */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          City *
        </label>
        <input
          type="text"
          name="city"
          required
          value={formData.city}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter city"
        />
      </div>

      {/* Business Number */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {formData.country === 'US' ? 'EIN (Employer Identification Number)' : 'Business Number'} *
        </label>
        <div className="relative">
          <input
            type="text"
            name="businessNumber"
            required
            value={formData.businessNumber}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              businessNumberAvailable === false ? 'border-red-500' : 
              businessNumberAvailable === true ? 'border-green-500' : 'border-gray-300'
            }`}
            placeholder={formData.country === 'US' ? '12-3456789' : '123456789RC0001'}
          />
          {verifyingBusinessNumber && (
            <div className="absolute right-3 top-3">
              <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          )}
          {businessNumberAvailable === true && (
            <div className="absolute right-3 top-3 text-green-500">✓</div>
          )}
          {businessNumberAvailable === false && (
            <div className="absolute right-3 top-3 text-red-500">✗</div>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {formData.country === 'US' ? '9 digits (format: XX-XXXXXXX)' : '9 digits'}
        </p>
      </div>

      {/* Email */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contact Email *
        </label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="manager@restaurant.com"
        />
      </div>

      {/* Phone */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="+1 (555) 123-4567"
        />
        <p className="text-sm text-gray-500 mt-1">
          You'll receive an OTP via SMS to verify your account
        </p>
      </div>

      {/* Seat Capacity */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Total Seat Capacity *
        </label>
        <input
          type="number"
          name="seatCapacity"
          required
          min="1"
          value={formData.seatCapacity}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="50"
        />
        <p className="text-sm text-gray-500 mt-1">
          Total number of seats in your restaurant
        </p>
      </div>

      {/* Pricing Display */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Your Plan</p>
            <p className="text-2xl font-bold text-blue-600">{plan} Plan</p>
            <p className="text-sm text-gray-500">Based on {formData.seatCapacity} seats</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">${price}</p>
            <p className="text-sm text-gray-600">{currency}/month</p>
            <p className="text-xs text-green-600 font-medium">30 days FREE trial</p>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Method *
        </label>
        <div className="p-4 border border-gray-300 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': { color: '#aab7c4' }
                },
                invalid: { color: '#9e2146' }
              }
            }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Your card will not be charged during the 30-day trial period
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !stripe || businessNumberAvailable === false}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
      >
        {loading ? 'Creating Account...' : 'Start Free Trial'}
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account?{' '}
        <a href="/auth" className="text-blue-600 hover:underline">
          Log in here
        </a>
      </p>
    </form>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <Elements stripe={stripePromise}>
        <SignupForm />
      </Elements>
    </div>
  );
}
