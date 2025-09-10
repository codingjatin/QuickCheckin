'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Shield, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';

export default function SuperAdminAuth() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password.trim()) {
      newErrors.password = 'Please enter your password';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    // Simulate authentication - in real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Demo credentials
    if (email === 'admin@quickcheck.com' && password === 'admin123') {
      router.push('/super-admin');
    } else {
      setErrors({ password: 'Invalid email or password' });
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-off to-sage/10 flex items-center justify-center p-4 text-ink">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary-600 mb-6">
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-display font-extrabold">QuickCheck</h1>
          </div>
        </div>

        <Card className="w-full bg-panel border border-border shadow-soft">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-display">Super Admin Access</CardTitle>
            <CardDescription className="text-muted">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-base font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@quickcheck.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyPress}
                className="h-12 text-lg border-border focus-visible:ring-2 focus-visible:ring-primary mt-2"
              />
              {errors.email && <p className="text-error text-sm mt-2">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="password" className="text-base font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
                className="h-12 text-lg border-border focus-visible:ring-2 focus-visible:ring-primary mt-2"
              />
              {errors.password && <p className="text-error text-sm mt-2">{errors.password}</p>}
            </div>

            {/* Demo Helper */}
            <div className="bg-off ring-1 ring-border rounded-lg p-4">
              <p className="text-sm font-medium mb-1">Demo Credentials</p>
              <p className="text-sm text-muted">
                Email: <span className="font-mono">admin@quickcheck.com</span>
                <br />
                Password: <span className="font-mono">admin123</span>
              </p>
            </div>

            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full h-12 text-lg bg-primary hover:bg-primary-600 text-white"
              size="lg"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-2" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
