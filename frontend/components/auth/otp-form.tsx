'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/lib/auth-store';
import { useTranslation } from '@/lib/i18n';
import { MessageSquare, ArrowLeft, CheckCircle } from 'lucide-react';

export function OtpForm() {
  const { t } = useTranslation();
  const [otpInput, setOtpInput] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const { phoneNumber, userRole, generatedOtp, verifyOtp, logout } = useAuthStore();

  // Auto-focus OTP input
  useEffect(() => {
    const input = document.getElementById('otp-input') as HTMLInputElement | null;
    input?.focus();
  }, []);

  const handleVerifyOtp = async () => {
    if (otpInput.length !== 4) {
      setError(t('pleaseEnterCompleteOtp'));
      return;
    }

    setIsVerifying(true);
    setError('');

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const isValid = verifyOtp(otpInput);
    if (!isValid) {
      setError(t('invalidOtp'));
      setOtpInput('');
    }

    setIsVerifying(false);
  };

  const handleOtpChange = (value: string) => {
    // Only allow numbers and limit to 4 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 4);
    setOtpInput(numericValue);
    setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && otpInput.length === 4) {
      handleVerifyOtp();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-panel border border-border shadow-soft">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <MessageSquare className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl text-ink">{t('verifyYourNumber')}</CardTitle>
        <CardDescription className="text-muted">
          {t('weveSentCode')}
          <br />
          <span className="font-medium text-ink">{phoneNumber}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="otp-input" className="text-base font-medium text-ink">
            {t('enterOtpCode')}
          </Label>
          <Input
            id="otp-input"
            type="text"
            inputMode="numeric"
            placeholder="1234"
            value={otpInput}
            onChange={(e) => handleOtpChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="mt-2 h-12 text-2xl text-center tracking-widest font-mono border-border focus-visible:ring-2 focus-visible:ring-primary"
            maxLength={4}
          />
          {error && <p className="text-error text-sm mt-2">{error}</p>}
        </div>

        {/* Demo Helper */}
        <div className="bg-off ring-1 ring-border rounded-lg p-4">
          <p className="text-sm text-ink font-medium mb-1">{t('demoMode')}</p>
          <p className="text-sm text-muted">
            {t('yourOtpIs')} <span className="font-mono font-bold text-ink">{generatedOtp}</span>
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleVerifyOtp}
            disabled={otpInput.length !== 4 || isVerifying}
            className="w-full h-12 text-lg bg-primary hover:bg-primary-600 text-white"
            size="lg"
          >
            {isVerifying ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                {t('verifying')}
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                {t('verifyAndContinue')}
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={logout}
            className="w-full h-12 text-lg border-border text-ink hover:bg-off"
            size="lg"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            {t('backToLogin')}
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted mb-2">
            {t('accessing')} <span className="font-medium capitalize">{t(userRole || 'guest')}</span> {t('panel')}
          </p>
          <Button variant="link" className="text-sm text-primary p-0">
            {t('didntReceiveCode')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
