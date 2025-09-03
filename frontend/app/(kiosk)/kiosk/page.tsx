'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, Phone, ArrowRight, Home, LogOut } from 'lucide-react';
import { useWaitlistStore } from '@/lib/store';
import { useAuthStore } from '@/lib/auth-store';
import { AuthWrapper } from '@/components/auth/auth-wrapper';
import { useTranslation } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/language-switcher';
import Link from 'next/link';

type KioskStep = 'party-size' | 'details' | 'confirmation' | 'success';

function KioskContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const [step, setStep] = useState<KioskStep>('party-size');
  const [partySize, setPartySize] = useState<number>(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  
  const addCustomer = useWaitlistStore((state) => state.addCustomer);
  const { logout, phoneNumber } = useAuthStore();

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
    } else if (!/^\+?[\d\s()-]{10,}$/.test(phone)) {
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

  const handleSubmit = () => {
    addCustomer({
      name,
      phone,
      partySize,
      status: 'waiting',
    });
    setStep('success');
  };

  const resetFlow = () => {
    setStep('party-size');
    setPartySize(0);
    setName('');
    setPhone('');
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-700">
              <Home className="h-5 w-5 mr-2" />
              {t('home')}
            </Link>
            <div className="flex items-center space-x-2">
              <LanguageSwitcher />
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                {t('logout')}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <CheckCircle className="h-10 w-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">QuickCheck</h1>
          </div>
          <p className="text-xl text-gray-600">
            {t('welcomeJoinWaitlist')}
          </p>
          <p className="text-sm text-gray-500">{t('loggedInAs')} {phoneNumber}</p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Flow */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              {step === 'party-size' && (
                <div>
                  <CardHeader className="text-center p-0 mb-8">
                    <CardTitle className="text-2xl mb-2">{t('howManyPeople')}</CardTitle>
                    <p className="text-gray-600">{t('selectPartySize')}</p>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-5 gap-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((size) => (
                        <Button
                          key={size}
                          size="lg"
                          variant={partySize === size ? "default" : "outline"}
                          className="h-20 text-2xl font-bold"
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
                    <CardTitle className="text-2xl mb-2">{t('yourInformation')}</CardTitle>
                    <p className="text-gray-600">{t('wellTextYou')}</p>
                  </CardHeader>
                  <CardContent className="p-0 space-y-6">
                    <div>
                      <label className="block text-lg font-medium mb-3">{t('yourName')}</label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('enterYourName')}
                        className="h-14 text-lg"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-lg font-medium mb-3">{t('phoneNumber')}</label>
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(555) 123-4567"
                        className="h-14 text-lg"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
                      )}
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setStep('party-size')}
                        className="flex-1 h-14 text-lg"
                      >
                        {t('back')}
                      </Button>
                      <Button
                        size="lg"
                        onClick={handleConfirm}
                        className="flex-1 h-14 text-lg"
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
                    <CardTitle className="text-2xl mb-2">{t('confirmYourDetails')}</CardTitle>
                    <p className="text-gray-600">{t('doubleCheckEverything')}</p>
                  </CardHeader>
                  <CardContent className="p-0 space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium">{t('partySize')}</span>
                        <span className="text-lg">{partySize} {t('people')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium">{t('name')}</span>
                        <span className="text-lg">{name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium">{t('phone')}</span>
                        <span className="text-lg">{phone}</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setStep('details')}
                        className="flex-1 h-14 text-lg"
                      >
                        {t('editDetails')}
                      </Button>
                      <Button
                        size="lg"
                        onClick={handleSubmit}
                        className="flex-1 h-14 text-lg bg-green-600 hover:bg-green-700"
                      >
                        {t('joinWaitlist')}
                      </Button>
                    </div>
                  </CardContent>
                </div>
              )}

              {step === 'success' && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{t('youreInLine')}</h2>
                  <p className="text-xl text-gray-600 mb-8">
                    {t('weveSentTextMessage')}
                  </p>
                  <div className="bg-indigo-50 rounded-lg p-6 mb-8">
                    <h3 className="font-semibold mb-2">{t('currentWaitTime')}</h3>
                    <p className="text-3xl font-bold text-indigo-600">25-30 {t('minutes')}</p>
                  </div>
                  <Button size="lg" onClick={resetFlow} className="h-14 text-lg">
                    {t('addAnotherParty')}
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* SMS Preview Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  {t('smsPreview')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="font-medium text-blue-900 mb-1">{t('tableReadyNotification')}</p>
                    <p className="text-sm text-blue-700">
                      "Hi {name || 'Customer'}! Your table for {partySize || 'X'} at Bella Vista is ready. Please arrive within 15 {t('minutes')}."
                    </p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <p className="font-medium text-green-900 mb-1">{t('customerResponse')}</p>
                    <p className="text-sm text-green-700">
                      "Y" (Yes, we're coming)
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                    <p className="font-medium text-yellow-900 mb-1">{t('reminderIfNoResponse')}</p>
                    <p className="text-sm text-yellow-700">
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