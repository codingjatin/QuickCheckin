import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Users, CheckCircle, Clock, Smartphone, MapPin } from 'lucide-react';
import { checkInSchema, CheckInFormData } from '../lib/validations';
import { useWaitlistStore } from '../store/waitlistStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { formatPhone } from '../lib/utils';

export const Kiosk: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'welcome' | 'party-size' | 'details' | 'confirm' | 'success'>('welcome');
  const [partySize, setPartySize] = useState<number>(2);
  const [customerData, setCustomerData] = useState<CheckInFormData | null>(null);
  const addCustomer = useWaitlistStore((state) => state.addCustomer);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CheckInFormData>({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      partySize: 2,
    },
  });

  const phoneValue = watch('phone');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setValue('phone', formatPhone(value));
    }
  };

  const onSubmit = (data: CheckInFormData) => {
    setCustomerData(data);
    setStep('confirm');
  };

  const handleConfirm = () => {
    if (customerData) {
      addCustomer({
        name: customerData.name,
        phone: customerData.phone,
        partySize: customerData.partySize,
        status: 'waiting',
      });
      setStep('success');
    }
  };

  const WelcomeStep = () => (
    <div className="text-center max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-strong p-12 mb-8">
        <div className="bg-primary/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-muted mb-6 font-display">Welcome to The Garden Bistro</h1>
        <p className="text-xl text-muted/70 mb-8 leading-relaxed">
          Join our digital waitlist for a seamless dining experience. We'll notify you via SMS when your table is ready.
        </p>
        <div className="bg-accent/10 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center gap-4 text-muted">
            <div className="text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-accent" />
              <p className="text-sm font-medium">Current Wait</p>
              <p className="text-2xl font-bold">20-25 min</p>
            </div>
            <div className="w-px h-16 bg-gray-200"></div>
            <div className="text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-accent" />
              <p className="text-sm font-medium">Parties Ahead</p>
              <p className="text-2xl font-bold">6</p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => setStep('party-size')}
          size="lg"
          className="w-full shadow-medium hover:shadow-strong transition-all duration-300"
        >
          <Smartphone className="h-5 w-5 mr-3" />
          Join Waitlist
        </Button>
      </div>
      <div className="flex items-center justify-center gap-2 text-muted/60">
        <MapPin className="h-4 w-4" />
        <span className="text-sm">123 Main Street, Downtown • (555) 123-4567</span>
      </div>
    </div>
  );

  const PartySizeStep = () => (
    <Card className="max-w-lg mx-auto shadow-strong">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">How many in your party?</CardTitle>
        <p className="text-muted/70">Select the number of guests dining with you</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
            <button
              key={size}
              onClick={() => setPartySize(size)}
              className={`aspect-square rounded-2xl border-2 transition-all duration-200 hover:scale-105 ${
                partySize === size
                  ? 'border-primary bg-primary/10 text-primary shadow-medium'
                  : 'border-gray-200 hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <Users className="h-6 w-6 mb-2" />
                <span className="font-bold text-lg">{size}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-muted font-medium">Party larger than 8?</span>
            <input
              type="number"
              min="9"
              max="20"
              placeholder="9+"
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center font-semibold focus:ring-2 focus:ring-accent focus:border-transparent"
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 9) setPartySize(value);
              }}
            />
          </div>
        </div>
        <Button
          onClick={() => {
            setValue('partySize', partySize);
            setStep('details');
          }}
          className="w-full"
          size="lg"
        >
          Continue
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );

  const DetailsStep = () => (
    <Card className="max-w-lg mx-auto shadow-strong">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Your Contact Information</CardTitle>
        <p className="text-muted/70">We'll use this to notify you when your table is ready</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Full Name"
            {...register('name')}
            error={errors.name?.message}
            placeholder="Enter your full name"
            className="text-lg"
          />
          <Input
            label="Mobile Phone"
            value={phoneValue || ''}
            onChange={handlePhoneChange}
            error={errors.phone?.message}
            placeholder="(555) 123-4567"
            className="text-lg"
          />
          <div className="bg-accent/10 rounded-xl p-6">
            <div className="flex items-center justify-center gap-3 text-muted">
              <Users className="h-6 w-6 text-accent" />
              <span className="text-lg font-semibold">Party of {partySize}</span>
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <p className="text-sm text-blue-800 text-center">
              📱 You'll receive SMS updates about your table status
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep('party-size')}
              className="flex-1"
            >
              Back
            </Button>
            <Button type="submit" className="flex-1" size="lg">
              Review Details
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  const ConfirmStep = () => (
    <Card className="max-w-lg mx-auto shadow-strong">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Confirm Your Check-in</CardTitle>
        <p className="text-muted/70">Please review your information before joining the waitlist</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mb-8">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-muted mb-4 text-center">Reservation Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-muted/70 font-medium">Name:</span>
                <span className="font-semibold text-muted">{customerData?.name}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-muted/70 font-medium">Phone:</span>
                <span className="font-semibold text-muted">{customerData?.phone}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted/70 font-medium">Party Size:</span>
                <span className="font-semibold text-muted">{customerData?.partySize} guests</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-6 text-center">
            <Clock className="h-10 w-10 text-accent mx-auto mb-3" />
            <p className="text-sm text-muted/70 mb-2">Estimated Wait Time</p>
            <p className="text-3xl font-bold text-muted mb-2">20-25 minutes</p>
            <p className="text-sm text-muted/60">We'll send you updates via SMS</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setStep('details')}
            className="flex-1"
          >
            Edit Details
          </Button>
          <Button onClick={handleConfirm} className="flex-1" size="lg">
            Join Waitlist
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const SuccessStep = () => (
    <Card className="max-w-lg mx-auto text-center shadow-strong">
      <CardContent className="pt-8 pb-8">
        <div className="bg-success/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8 animate-scale-in">
          <CheckCircle className="h-12 w-12 text-success" />
        </div>
        <h2 className="text-3xl font-bold text-muted mb-4 font-display">You're All Set!</h2>
        <p className="text-lg text-muted/80 mb-8 leading-relaxed">
          Welcome to our waitlist! We'll send you SMS updates as your table becomes available.
        </p>
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-muted/70 mb-1">Your Position</p>
              <p className="text-2xl font-bold text-primary">#7</p>
            </div>
            <div>
              <p className="text-sm text-muted/70 mb-1">Estimated Wait</p>
              <p className="text-2xl font-bold text-accent">22 min</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 mb-8 border border-blue-200">
          <p className="text-sm text-blue-800 mb-2">📱 SMS notifications will be sent to:</p>
          <p className="font-semibold text-blue-900">{customerData?.phone}</p>
        </div>
        <div className="space-y-4">
          <Button onClick={() => navigate('/')} className="w-full" size="lg">
            Return to Home
          </Button>
          <p className="text-sm text-muted/60">
            Feel free to explore the area. We'll keep you updated!
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const getStepIndex = () => {
    const steps = ['welcome', 'party-size', 'details', 'confirm', 'success'];
    return steps.indexOf(step);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/3 to-primary/5">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-soft">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => {
                if (step === 'welcome') {
                  navigate('/');
                } else if (step === 'party-size') {
                  setStep('welcome');
                } else if (step === 'details') {
                  setStep('party-size');
                } else if (step === 'confirm') {
                  setStep('details');
                }
              }}
              className="p-3 hover:bg-primary/10"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-muted font-display">The Garden Bistro</h1>
              <p className="text-muted/70">Digital Waitlist Check-in</p>
            </div>
          </div>
        </div>
      </header>

      <div className="py-12 px-4">
        {/* Progress Indicator */}
        {step !== 'welcome' && step !== 'success' && (
          <div className="max-w-lg mx-auto mb-12">
            <div className="flex items-center justify-between">
              {[
                { key: 'party-size', label: 'Party Size' },
                { key: 'details', label: 'Details' },
                { key: 'confirm', label: 'Confirm' },
              ].map((stepItem, index) => (
                <div key={stepItem.key} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      getStepIndex() > index + 1 || step === stepItem.key
                        ? 'bg-primary text-background shadow-medium'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {getStepIndex() > index + 1 ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < 2 && (
                    <div className={`w-16 h-1 mx-3 rounded-full transition-all duration-300 ${
                      getStepIndex() > index + 1
                        ? 'bg-primary'
                        : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3">
              {[
                { key: 'party-size', label: 'Party Size' },
                { key: 'details', label: 'Details' },
                { key: 'confirm', label: 'Confirm' },
              ].map((stepItem) => (
                <span
                  key={stepItem.key}
                  className={`text-xs font-medium ${
                    step === stepItem.key ? 'text-primary' : 'text-muted/50'
                  }`}
                >
                  {stepItem.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="animate-fade-in">
          {step === 'welcome' && <WelcomeStep />}
          {step === 'party-size' && <PartySizeStep />}
          {step === 'details' && <DetailsStep />}
          {step === 'confirm' && <ConfirmStep />}
          {step === 'success' && <SuccessStep />}
        </div>
      </div>
    </div>
  );
};