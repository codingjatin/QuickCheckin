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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-off to-sage/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-panel/60 backdrop-blur supports-[backdrop-filter]:bg-panel/50 rounded-xl2 border border-border shadow-soft">
        {/* Logo */}
        <div className="text-center pt-8 pb-4 px-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <CheckCircle className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-display font-extrabold text-ink">QuickCheck</h1>
          </div>
          <p className="text-muted text-sm">
            Secure sign-in to access your dashboard
          </p>
        </div>

        {/* Auth Forms */}
        <div className="px-6 pb-8">
          {currentStep === 'login' && <LoginForm />}
          {currentStep === 'otp' && <OtpForm />}
        </div>
      </div>
    </div>
  );
}
