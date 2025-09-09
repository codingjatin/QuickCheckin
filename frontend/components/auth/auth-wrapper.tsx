'use client';

import { useAuthStore } from '@/lib/auth-store';
import { LoginForm } from './login-form';
import { OtpForm } from './otp-form';

interface AuthWrapperProps {
  children: React.ReactNode;
  requiredRole?: 'guest' | 'admin';
}

export function AuthWrapper({ children, requiredRole }: AuthWrapperProps) {
  const { isAuthenticated, userRole, currentStep } = useAuthStore();

  // If user is authenticated and has the required role, show the content
  if (isAuthenticated && (!requiredRole || userRole === requiredRole)) {
    return <>{children}</>;
  }

  // Show appropriate auth step
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage/10 via-off-white to-sage/5 flex items-center justify-center p-4">
      {currentStep === 'login' && <LoginForm />}
      {currentStep === 'otp' && <OtpForm />}
    </div>
  );
}