import { useEffect } from 'react';
import { useWaitlistStore } from '../store/waitlistStore';
import { useToast } from './useToast';

export const useWaitlist = () => {
  const store = useWaitlistStore();
  const { addToast } = useToast();

  useEffect(() => {
    // Simulate periodic updates to estimated wait times
    const interval = setInterval(() => {
      // This would normally come from SSE or WebSocket updates
      console.log('Updating wait times...');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const notifyCustomerWithToast = (id: string) => {
    store.notifyCustomer(id);
    addToast({
      message: 'Customer notified successfully',
      type: 'success',
    });
  };

  const seatCustomerWithToast = (customerId: string, tableId: string) => {
    store.seatCustomer(customerId, tableId);
    addToast({
      message: 'Customer seated successfully',
      type: 'success',
    });
  };

  const cancelCustomerWithToast = (id: string) => {
    store.cancelCustomer(id);
    addToast({
      message: 'Customer removed from waitlist',
      type: 'info',
    });
  };

  return {
    ...store,
    notifyCustomer: notifyCustomerWithToast,
    seatCustomer: seatCustomerWithToast,
    cancelCustomer: cancelCustomerWithToast,
  };
};