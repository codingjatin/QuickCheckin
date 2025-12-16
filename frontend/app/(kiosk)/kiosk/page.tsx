'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Phone, ArrowRight, Home, LogOut, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';
import { AuthWrapper } from '@/components/auth/auth-wrapper';
import { useTranslation } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/language-switcher';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';
import Link from 'next/link';

type KioskStep = 'party-size' | 'details' | 'confirmation' | 'success';

function KioskContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const [step, setStep] = useState<KioskStep>('party-size');
  const [partySize, setPartySize] = useState<number>(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waitTime, setWaitTime] = useState<number>(0);

  const { logout, phoneNumber, restaurantData } = useAuthStore();
  
  // Get restaurant ID from auth or use a default
  const restaurantId = restaurantData?.id || '675e3c5b2e4c8f001234abcd'; // TODO: Handle missing restaurant ID

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handlePartySizeSelect = (size: number) => {
    setPartySize(size);
    setStep('details');
  };

  const validateDetails = () => {
    const newErrors: { name?: string; phone?: string } = {};

    if (!name.trim()) {
      newErrors.name = t('pleaseEnterName');
    }

    if (!phone.trim()) {
      newErrors.phone = t('pleaseEnterPhone');
    } else if (!/^\d{10,}$/.test(phone)) {
      newErrors.phone = t('pleaseEnterValidPhone');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (validateDetails()) {
      setStep('confirmation');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const fullPhone = `${countryCode}${phone}`;
      
      const { data, error } = await apiClient.createBooking(
        restaurantId,
        name,
        fullPhone,
        partySize
      );

      if (error) {
        toast.error(error.message || 'Failed to create booking');
        setIsSubmitting(false);
        return;
      }

      if (data) {
        setWaitTime(data.booking.waitTime);
        setStep('success');
        toast.success('Booking confirmed! SMS sent to your phone.');
      }
    } catch (err) {
      toast.error('An error occurred while creating your booking');
      console.error('Booking error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFlow = () => {
    setStep('party-size');
    setPartySize(0);
    setName('');
    setPhone('');
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-off to-sage/10 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/"
              className="inline-flex items-center text-ink hover:text-ink/80"
            >
              <Home className="h-5 w-5 mr-2" />
              {t('home')}
            </Link>
            <div className="flex items-center space-x-2">
              <LanguageSwitcher />
              <Button variant="outline" onClick={handleLogout} className="border-ink/15 hover:bg-off">
                <LogOut className="h-4 w-4 mr-2" />
                {t('logout')}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <CheckCircle className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-display font-extrabold text-ink">QuickCheck</h1>
          </div>
          <p className="text-xl text-muted">
            {t('welcomeJoinWaitlist')}
          </p>
          <p className="text-sm text-muted">{t('loggedInAs')} {phoneNumber}</p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Flow */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-panel border border-border shadow-soft">
              {step === 'party-size' && (
                <div>
                  <CardHeader className="text-center p-0 mb-8">
                    <CardTitle className="text-2xl mb-2 text-ink">
                      {t('howManyPeople')}
                    </CardTitle>
                    <p className="text-muted">{t('selectPartySize')}</p>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-5 gap-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((size) => (
                        <Button
                          key={size}
                          size="lg"
                          variant={partySize === size ? 'default' : 'outline'}
                          className={`h-20 text-2xl font-bold ${
                            partySize === size
                              ? 'bg-primary hover:bg-primary-600 text-white'
                              : 'border-ink/15 text-ink hover:bg-off'
                          }`}
                          onClick={() => handlePartySizeSelect(size)}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </div>
              )}

              {step === 'details' && (
                <div>
                  <CardHeader className="text-center p-0 mb-8">
                    <CardTitle className="text-2xl mb-2 text-ink">
                      {t('yourInformation')}
                    </CardTitle>
                    <p className="text-muted">{t('wellTextYou')}</p>
                  </CardHeader>
                  <CardContent className="p-0 space-y-6">
                    <div>
                      <label className="block text-lg font-medium mb-3 text-ink">
                        {t('yourName')}
                      </label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('enterYourName')}
                        className="h-14 text-lg border-border focus-visible:ring-2 focus-visible:ring-primary"
                      />
                      {errors.name && (
                        <p className="text-error text-sm mt-2">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-lg font-medium mb-3 text-ink">
                        {t('phoneNumber')}
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="h-14 px-3 rounded-md border-border border bg-panel text-lg font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="+1">+1</option>
                          <option value="+91">+91</option>
                        </select>
                        <Input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="5551234567"
                          className="flex-1 h-14 text-lg border-border focus-visible:ring-2 focus-visible:ring-primary"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-error text-sm mt-2">{errors.phone}</p>
                      )}
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setStep('party-size')}
                        className="flex-1 h-14 text-lg border-ink/15 text-ink hover:bg-off"
                      >
                        {t('back')}
                      </Button>
                      <Button
                        size="lg"
                        onClick={handleConfirm}
                        className="flex-1 h-14 text-lg bg-primary hover:bg-primary-600 text-white"
                      >
                        {t('continue')}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              )}

              {step === 'confirmation' && (
                <div>
                  <CardHeader className="text-center p-0 mb-8">
                    <CardTitle className="text-2xl mb-2 text-ink">
                      {t('confirmYourDetails')}
                    </CardTitle>
                    <p className="text-muted">{t('doubleCheckEverything')}</p>
                  </CardHeader>
                  <CardContent className="p-0 space-y-6">
                    <div className="bg-off ring-1 ring-border rounded-xl2 p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-ink">{t('partySize')}</span>
                        <span className="text-lg text-ink">{partySize} {t('people')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-ink">{t('name')}</span>
                        <span className="text-lg text-ink">{name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-ink">{t('phone')}</span>
                        <span className="text-lg text-ink">{phone}</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setStep('details')}
                        className="flex-1 h-14 text-lg border-ink/15 text-ink hover:bg-off"
                      >
                        {t('editDetails')}
                      </Button>
                      <Button
                        size="lg"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex-1 h-14 text-lg bg-sage hover:bg-sage/90 text-ink"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Creating booking...
                          </>
                        ) : (
                          t('joinWaitlist')
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </div>
              )}

              {step === 'success' && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-4 text-ink">
                    {t('youreInLine')}
                  </h2>
                  <p className="text-xl text-muted mb-8">
                    {t('weveSentTextMessage')}
                  </p>
                  <div className="bg-off ring-1 ring-border rounded-xl2 p-6 mb-8">
                    <h3 className="font-semibold mb-2 text-ink">{t('currentWaitTime')}</h3>
                    <p className="text-3xl font-bold text-primary">
                      {waitTime || 25}-{(waitTime || 25) + 5} {t('minutes')}
                    </p>
                  </div>
                  <Button
                    size="lg"
                    onClick={resetFlow}
                    className="h-14 text-lg bg-primary hover:bg-primary-600 text-white"
                  >
                    {t('addAnotherParty')}
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* SMS Preview Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-panel border border-border shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center text-ink">
                  <Phone className="h-5 w-5 mr-2" />
                  {t('smsPreview')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-primary/10 rounded-lg p-4 border-l-4 border-primary">
                    <p className="font-medium text-ink mb-1">{t('tableReadyNotification')}</p>
                    <p className="text-sm text-muted">
                      "Hi {name || 'Customer'}! Your table for {partySize || 'X'} at Bella Vista is ready. Please arrive within 15 {t('minutes')}."
                    </p>
                  </div>

                  <div className="bg-sage/30 rounded-lg p-4 border-l-4 border-sage">
                    <p className="font-medium text-ink mb-1">{t('customerResponse')}</p>
                    <p className="text-sm text-muted">
                      "Y" (Yes, we're coming)
                    </p>
                  </div>

                  <div className="bg-off rounded-lg p-4 border-l-4 border-ink/40 ring-1 ring-border">
                    <p className="font-medium text-ink mb-1">{t('reminderIfNoResponse')}</p>
                    <p className="text-sm text-muted">
                      "Please reply quickly with Y (Yes) or N (No) so we can continue further."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KioskPage() {
  return (
    <AuthWrapper requiredRole="guest">
      <KioskContent />
    </AuthWrapper>
  );
}
