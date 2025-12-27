'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Phone, ArrowRight, Home, LogOut, Loader2, Users, Wifi, Battery, Signal } from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';
import { AuthWrapper } from '@/components/auth/auth-wrapper';
import { useTranslation } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/language-switcher';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';
import Link from 'next/link';

type KioskStep = 'party-size' | 'details' | 'confirmation' | 'success' | 'custom-request';

function KioskContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const [step, setStep] = useState<KioskStep>('party-size');
  const [partySize, setPartySize] = useState<number>(0);
  const [isCustom, setIsCustom] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waitTime, setWaitTime] = useState<number>(0);
  const [allowedPartySizes, setAllowedPartySizes] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);
  const [loadingSettings, setLoadingSettings] = useState(true);

  const { logout, phoneNumber, restaurantData } = useAuthStore();
  
  const restaurantId = restaurantData?.id || '';

  // Fetch allowed party sizes from table capacities
  useEffect(() => {
    const fetchSettings = async () => {
      if (!restaurantId) {
        setLoadingSettings(false);
        return;
      }
      
      try {
        const result = await apiClient.getSettings(restaurantId);
        if (result.data?.tables && result.data.tables.length > 0) {
          // Extract unique capacities from tables and sort them
          const capacities = result.data.tables
            .filter(t => t.isActive)
            .map(t => t.capacity);
          const uniqueCapacities = [...new Set(capacities)].sort((a, b) => a - b);
          
          if (uniqueCapacities.length > 0) {
            setAllowedPartySizes(uniqueCapacities);
          }
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoadingSettings(false);
      }
    };

    fetchSettings();
  }, [restaurantId]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handlePartySizeSelect = (size: number) => {
    setPartySize(size);
    setIsCustom(false);
    setStep('details');
  };

  const handleCustomSelect = () => {
    setIsCustom(true);
    setStep('custom-request');
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
    setIsCustom(false);
    setName('');
    setPhone('');
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-off to-sage/10">
      {/* Navbar */}
      <nav className="bg-panel border-b border-border shadow-soft sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/QuickCheck.svg"
                alt="QuickCheck logo"
                width={32}
                height={32}
              />
              <span className="text-xl font-display font-bold text-ink">QuickCheck</span>
            </Link>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-muted hidden sm:block">{phoneNumber}</span>
              <LanguageSwitcher />
              <Button variant="outline" size="sm" onClick={handleLogout} className="border-ink/15 hover:bg-off">
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">{t('logout')}</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto p-4 pt-8">
        {/* Welcome Text */}
        <div className="text-center mb-8">
          <p className="text-xl text-muted">
            {t('welcomeJoinWaitlist')} <span className="font-semibold text-primary">{restaurantData?.name}</span>
          </p>
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
                    {loadingSettings ? (
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-5 gap-4 mb-6">
                          {allowedPartySizes.map((size) => (
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
                        {/* Custom Option */}
                        <Button
                          size="lg"
                          variant="outline"
                          className="w-full h-16 text-lg font-medium border-2 border-dashed border-primary/50 text-primary hover:bg-primary/5"
                          onClick={handleCustomSelect}
                        >
                          <Users className="h-5 w-5 mr-2" />
                          Custom Party Size (Larger Groups)
                        </Button>
                      </>
                    )}
                  </CardContent>
                </div>
              )}

              {step === 'custom-request' && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-ink">
                    Large Party Request
                  </h2>
                  <p className="text-lg text-muted mb-6">
                    For larger groups, our executive will contact you shortly to arrange the best seating.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div>
                      <label className="block text-lg font-medium mb-2 text-ink">Your Name</label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="h-14 text-lg border-border focus-visible:ring-2 focus-visible:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-medium mb-2 text-ink">Phone Number</label>
                      <div className="flex gap-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="h-14 px-3 rounded-md border-border border bg-panel text-lg font-mono"
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
                    </div>
                  </div>

                  <div className="bg-off ring-1 ring-border rounded-xl p-4 mb-6">
                    <p className="text-sm text-muted">
                      📞 An executive will call you within 5 minutes to discuss your party size and seating preferences.
                    </p>
                  </div>

                  <div className="flex gap-4">
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
                      onClick={() => {
                        if (name && phone) {
                          toast.success('Request submitted! Our executive will contact you shortly.');
                          resetFlow();
                        } else {
                          toast.error('Please enter your name and phone number');
                        }
                      }}
                      className="flex-1 h-14 text-lg bg-primary hover:bg-primary-600 text-white"
                    >
                      Request Call
                    </Button>
                  </div>
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

                    <div className="flex gap-4 pt-4">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setStep('details')}
                        className="flex-1 h-14 text-lg border-border text-ink hover:bg-off font-medium"
                      >
                        {t('editDetails')}
                      </Button>
                      <Button
                        size="lg"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex-1 h-14 text-lg bg-primary hover:bg-primary-600 text-white font-medium"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Creating...
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

          {/* SMS Preview - Phone Mockup */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Phone Frame */}
              <div className="mx-auto max-w-[280px] sm:max-w-[320px]">
                <div className="bg-ink rounded-[2.5rem] p-2 shadow-2xl">
                  {/* Phone Screen */}
                  <div className="bg-white rounded-[2rem] overflow-hidden">
                    {/* Status Bar */}
                    <div className="bg-ink/5 px-6 py-2 flex items-center justify-between text-xs text-ink/70">
                      <span className="font-medium">9:41</span>
                      <div className="flex items-center gap-1">
                        <Signal className="h-3 w-3" />
                        <Wifi className="h-3 w-3" />
                        <Battery className="h-3 w-3" />
                      </div>
                    </div>
                    
                    {/* Messages Header */}
                    <div className="bg-ink/5 px-4 py-3 border-b border-ink/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-ink text-sm">Restaurant</p>
                          <p className="text-xs text-muted">SMS</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Messages */}
                    <div className="p-4 space-y-3 min-h-[300px] bg-gradient-to-b from-white to-ink/5">
                      {/* Incoming Message 1 */}
                      <div className="flex justify-start">
                        <div className="bg-ink/10 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[85%]">
                          <p className="text-sm text-ink">
                            Hi {name || 'Customer'}! Your table for {partySize || 'X'} is ready. Please arrive within 15 min. Reply Y to confirm.
                          </p>
                          <p className="text-[10px] text-muted mt-1">Now</p>
                        </div>
                      </div>
                      
                      {/* Outgoing Message */}
                      <div className="flex justify-end">
                        <div className="bg-primary text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[85%]">
                          <p className="text-sm">Y</p>
                          <p className="text-[10px] text-white/70 mt-1">Read</p>
                        </div>
                      </div>
                      
                      {/* Incoming Message 2 */}
                      <div className="flex justify-start">
                        <div className="bg-ink/10 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[85%]">
                          <p className="text-sm text-ink">
                            Great! We'll hold your table. See you soon! 🎉
                          </p>
                          <p className="text-[10px] text-muted mt-1">Now</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Input Area */}
                    <div className="px-4 py-3 border-t border-ink/10 bg-white">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-ink/5 rounded-full px-4 py-2">
                          <p className="text-sm text-muted">iMessage</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <ArrowRight className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Phone Label */}
                <p className="text-center text-sm text-muted mt-4">{t('smsPreview')}</p>
              </div>
            </div>
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
