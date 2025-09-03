'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';
import { LoginForm } from '@/components/auth/login-form';
import { OtpForm } from '@/components/auth/otp-form';
import { CheckCircle } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const { isAuthenticated, userRole, currentStep } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && userRole) {
      // Redirect based on user role
      if (userRole === 'guest') {
        router.push('/kiosk');
      } else if (userRole === 'admin') {
        router.push('/admin');
      }
    }
  }, [isAuthenticated, userRole, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <CheckCircle className="h-10 w-10 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">QuickCheck</h1>
          </div>
        </div>

        {/* Auth Forms */}
        {currentStep === 'login' && <LoginForm />}
        {currentStep === 'otp' && <OtpForm />}
      </div>
    </div>
  );
}