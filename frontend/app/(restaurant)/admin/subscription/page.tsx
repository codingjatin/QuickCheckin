'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuthStore } from '@/lib/auth-store';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface SubscriptionData {
  subscription: {
    plan: string;
    status: string;
    seatCapacity: number;
    country: string;
    state: string;
    trialEnd: string | null;
    nextBillingDate: string | null;
    lastPaymentDate: string | null;
    pendingPlanChange: string | null;
  };
  history: Array<{
    _id: string;
    action: string;
    fromPlan?: string;
    toPlan?: string;
    amount?: number;
    currency?: string;
    createdAt: string;
  }>;
}

function PaymentMethodUpdate({ restaurantId, onSuccess }: { restaurantId: string; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error('Stripe not loaded');
      return;
    }

    setLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement
      });

      if (error) {
        toast.error(error.message || 'Payment method creation failed');
        setLoading(false);
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/restaurant/${restaurantId}/payment-method`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
        },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id })
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Update failed');
        setLoading(false);
        return;
      }

      toast.success('Payment method updated successfully');
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border border-gray-300 rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' }
              },
              invalid: { color: '#9e2146' }
            }
          }}
        />
      </div>
      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Updating...' : 'Update Payment Method'}
      </button>
    </form>
  );
}

export default function SubscriptionPage() {
  const { restaurantData } = useAuthStore();
  const restaurantId = restaurantData?._id || '';

  const [data, setData] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentUpdate, setShowPaymentUpdate] = useState(false);
  const [seatCapacity, setSeatCapacity] = useState(0);
  const [showSeatCapacityEdit, setShowSeatCapacityEdit] = useState(false);

  const fetchSubscription = async () => {
    if (!restaurantId) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/restaurant/${restaurantId}/subscription`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
          }
        }
      );

      if (response.ok) {
        const result = await response.json();
        setData(result);
        setSeatCapacity(result.subscription.seatCapacity);
      } else {
        console.error('Subscription fetch error:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, [restaurantId]);

  const handleUpgrade = async () => {
    if (!confirm('Upgrade to Large plan? You will be charged the prorated difference immediately.')) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/restaurant/${restaurantId}/subscription/upgrade`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
          }
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        fetchSubscription();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Upgrade failed');
    }
  };

  const handleDowngrade = async () => {
    if (!confirm('Downgrade to Small plan? This will take effect at your next billing cycle.')) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/restaurant/${restaurantId}/subscription/downgrade`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
          }
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        fetchSubscription();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Downgrade failed');
    }
  };

  const handleCancelDowngrade = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/restaurant/${restaurantId}/subscription/cancel-downgrade`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
          }
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        fetchSubscription();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to cancel downgrade');
    }
  };

  const handleUpdateSeatCapacity = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/restaurant/${restaurantId}/seat-capacity`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
          },
          body: JSON.stringify({ seatCapacity })
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        setShowSeatCapacityEdit(false);
        fetchSubscription();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Update failed');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Loading Subscription Information...</h2>
          <p className="text-blue-700">
            We're retrieving your subscription details. If this persists, please refresh the page or contact support.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  const { subscription, history } = data;
  const isLegacy = subscription.plan === 'legacy-free';
  const isTrialing = subscription.status === 'trialing';
  const isPastDue = subscription.status === 'past_due';

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold">Subscription Management</h1>

      {/* Status Banner */}
      {isPastDue && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-semibold">⚠️ Payment Failed - Update your payment method to avoid service interruption</p>
        </div>
      )}

      {isTrialing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">🎉 You're on a free trial until {new Date(subscription.trialEnd!).toLocaleDateString()}</p>
        </div>
      )}

      {/* Current Plan */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600">Plan</p>
            <p className="text-2xl font-bold capitalize">{subscription.plan}</p>
            {subscription.pendingPlanChange && (
              <p className="text-sm text-orange-600 mt-1">
                Scheduled downgrade to {subscription.pendingPlanChange} at next billing
              </p>
            )}
          </div>

          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className={`text-lg font-semibold capitalize ${
              subscription.status === 'active' ? 'text-green-600' :
              subscription.status === 'trialing' ? 'text-blue-600' :
              subscription.status === 'past_due' ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {subscription.status}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Seat Capacity</p>
            {showSeatCapacityEdit ? (
              <div className="flex gap-2 mt-2">
                <input
                  type="number"
                  value={seatCapacity}
                  onChange={(e) => setSeatCapacity(parseInt(e.target.value) || 0)}
                  min="1"
                  className="px-3 py-1 border border-gray-300 rounded"
                />
                <button onClick={handleUpdateSeatCapacity} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Save
                </button>
                <button onClick={() => setShowSeatCapacityEdit(false)} className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">{subscription.seatCapacity} seats</p>
                {!isLegacy && (
                  <button onClick={() => setShowSeatCapacityEdit(true)} className="text-sm text-blue-600 hover:underline">
                    Edit
                  </button>
                )}
              </div>
            )}
          </div>

          {subscription.nextBillingDate && (
            <div>
              <p className="text-sm text-gray-600">Next Billing Date</p>
              <p className="text-lg font-semibold">{new Date(subscription.nextBillingDate).toLocaleDateString()}</p>
            </div>
          )}
        </div>

        {/* Plan Actions */}
        {!isLegacy && (
          <div className="mt-6 flex flex-wrap gap-3">
            {subscription.plan === 'small' && !subscription.pendingPlanChange && (
              <button onClick={handleUpgrade} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Upgrade to Large
              </button>
            )}

            {subscription.plan === 'large' && !subscription.pendingPlanChange && (
              <button onClick={handleDowngrade} className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                Downgrade to Small
              </button>
            )}

            {subscription.pendingPlanChange && (
              <button onClick={handleCancelDowngrade} className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                Cancel Scheduled Downgrade
              </button>
            )}

            <button onClick={() => setShowPaymentUpdate(!showPaymentUpdate)} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Update Payment Method
            </button>
          </div>
        )}

        {isLegacy && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-semibold">✨ Legacy Plan - Free Forever</p>
            <p className="text-sm text-green-700 mt-1">Your account is on a grandfathered free plan with no billing.</p>
          </div>
        )}
      </div>

      {/* Payment Method Update */}
      {showPaymentUpdate && !isLegacy && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Update Payment Method</h2>
          <Elements stripe={stripePromise}>
            <PaymentMethodUpdate restaurantId={restaurantId} onSuccess={() => {
              setShowPaymentUpdate(false);
              toast.success('Payment method updated');
            }} />
          </Elements>
        </div>
      )}

      {/* Subscription History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Subscription History</h2>
        
        {history.length === 0 ? (
          <p className="text-gray-500">No history available</p>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div key={item._id} className="flex justify-between items-center border-b border-gray-200 pb-3">
                <div>
                  <p className="font-medium capitalize">{item.action.replace('_', ' ')}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString()}
                  </p>
                  {item.fromPlan && item.toPlan && (
                    <p className="text-sm text-gray-500">{item.fromPlan} → {item.toPlan}</p>
                  )}
                </div>
                {item.amount && (
                  <p className="font-semibold">
                    ${(item.amount / 100).toFixed(2)} {item.currency}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
