'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuthStore, UserRole } from '@/lib/auth-store';
import { useTranslation } from '@/lib/i18n';
import { Phone, ArrowRight, CheckCircle } from 'lucide-react';

export function LoginForm() {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');
  const [errors, setErrors] = useState<{ phone?: string; role?: string }>({});

  const { login } = useAuthStore();

  const validateForm = () => {
    const newErrors: { phone?: string; role?: string } = {};
    
    if (!phoneNumber.trim()) {
      newErrors.phone = t('pleaseEnterPhone');
    } else if (!/^\+?[\d\s()-]{10,}$/.test(phoneNumber)) {
      newErrors.phone = t('pleaseEnterValidPhone');
    }
    
    if (!selectedRole) {
      newErrors.role = t('pleaseSelectAccessType');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      login(phoneNumber, selectedRole as UserRole);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-off-white border-sage/20">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-6 w-6 text-deep-brown" />
        </div>
        <CardTitle className="text-2xl text-charcoal">{t('welcomeToQuickCheck')}</CardTitle>
        <CardDescription className="text-charcoal/70">
          {t('enterMobileNumber')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="phone" className="text-base font-medium text-charcoal">
            {t('mobileNumber')}
          </Label>
          <div className="relative mt-2">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-charcoal/40" />
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="pl-10 h-12 text-lg border-sage focus:ring-deep-brown"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
          )}
        </div>

        <div>
          <Label htmlFor="role" className="text-base font-medium text-charcoal">
            {t('accessType')}
          </Label>
          <Select value={selectedRole} onValueChange={(value: UserRole) => setSelectedRole(value)}>
            <SelectTrigger className="h-12 text-lg mt-2 border-sage focus:ring-deep-brown">
              <SelectValue placeholder={t('selectAccessType')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="guest">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-sage rounded-full"></div>
                  <span>{t('guestJoinWaitlist')}</span>
                </div>
              </SelectItem>
              <SelectItem value="admin">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-deep-brown rounded-full"></div>
                  <span>{t('adminRestaurantDashboard')}</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-2">{errors.role}</p>
          )}
        </div>

        <Button 
          onClick={handleContinue}
          className="w-full h-12 text-lg bg-deep-brown hover:bg-deep-brown/90 text-off-white"
          size="lg"
        >
          {t('continue')}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <div className="text-center text-sm text-charcoal/60">
          <p>You'll receive an OTP via SMS to verify your number</p>
        </div>
      </CardContent>
    </Card>
  );
}