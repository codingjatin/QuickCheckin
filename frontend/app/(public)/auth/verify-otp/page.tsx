'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export default function VerifyOTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const restaurantId = searchParams.get('restaurantId');
  const phone = searchParams.get('phone');

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!restaurantId || !phone) {
      toast.error('Missing verification parameters');
      router.push('/signup');
    }
  }, [restaurantId, phone, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantId,
          phone,
          otp
        })
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Invalid OTP');
        setLoading(false);
        return;
      }

      // Store session token
      localStorage.setItem('sessionToken', data.sessionToken);
      localStorage.setItem('restaurant', JSON.stringify(data.restaurant));

      toast.success('Account verified! Redirecting to dashboard...');
      
      setTimeout(() => {
        router.push('/admin');
      }, 1000);

    } catch (error: any) {
      console.error('OTP verification error:', error);
      toast.error('Verification failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Phone</h1>
          <p className="text-gray-600">
            We sent a 6-digit code to<br />
            <span className="font-medium text-gray-900">{phone}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              required
              className="w-full px-4 py-3 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent tracking-widest"
              placeholder="000000"
              autoFocus
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              Code expires in 10 minutes
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Didn't receive the code?{' '}
            <button 
              className="text-blue-600 hover:underline font-medium"
              onClick={() => toast.info('Please wait 60 seconds before requesting a new code')}
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
