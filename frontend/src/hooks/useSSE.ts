import { useEffect, useRef } from 'react';
import { WaitlistEvent } from '../lib/types';

interface UseSSEOptions {
  onEvent?: (event: WaitlistEvent) => void;
  enabled?: boolean;
}

export const useSSE = ({ onEvent, enabled = true }: UseSSEOptions = {}) => {
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!enabled || !onEvent) return;

    // Simulate SSE with random events
    const simulateEvent = () => {
      const eventTypes: WaitlistEvent['type'][] = [
        'customer_added',
        'customer_notified',
        'customer_seated',
        'table_updated',
      ];

      const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      
      // Generate mock event data based on type
      const mockEvent: WaitlistEvent = {
        type: randomType,
        data: {} as any, // This would be actual data in a real implementation
        timestamp: new Date(),
      };

      onEvent(mockEvent);
    };

    // Simulate events every 30-60 seconds
    intervalRef.current = setInterval(simulateEvent, Math.random() * 30000 + 30000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [onEvent, enabled]);

  const disconnect = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return { disconnect };
};