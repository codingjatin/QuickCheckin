'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { apiClient } from '@/lib/api-client';

type SSEEventType = 'new_booking' | 'status_change' | 'new_message' | 'connected';

interface SSEEvent {
  type: SSEEventType;
  data: any;
  timestamp: string;
}

interface UseSSEOptions {
  restaurantId: string;
  onNewBooking?: (data: any) => void;
  onStatusChange?: (data: any) => void;
  onNewMessage?: (data: any) => void;
  playSound?: boolean;
}

export function useSSE(options: UseSSEOptions) {
  const { restaurantId, onNewBooking, onStatusChange, onNewMessage, playSound = true } = options;
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio for notification sound
  useEffect(() => {
    if (typeof window !== 'undefined' && playSound) {
      audioRef.current = new Audio('/sounds/notification.mp3');
      audioRef.current.volume = 0.7;
    }
  }, [playSound]);

  const playNotificationSound = useCallback(() => {
    if (audioRef.current && playSound) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => {
        console.log('Could not play notification sound:', err);
      });
    }
  }, [playSound]);

  useEffect(() => {
    if (!restaurantId) return;

    const sseUrl = apiClient.getSSEUrl(restaurantId);
    
    const connect = () => {
      try {
        eventSourceRef.current = new EventSource(sseUrl);

        eventSourceRef.current.onopen = () => {
          console.log('[SSE] Connected');
          setIsConnected(true);
        };

        eventSourceRef.current.onmessage = (event) => {
          try {
            const eventData: SSEEvent = JSON.parse(event.data);
            
            switch (eventData.type) {
              case 'connected':
                console.log('[SSE] Connection confirmed');
                break;
              case 'new_booking':
                playNotificationSound();
                onNewBooking?.(eventData.data);
                break;
              case 'status_change':
                onStatusChange?.(eventData.data);
                break;
              case 'new_message':
                onNewMessage?.(eventData.data);
                break;
            }
          } catch (e) {
            console.error('[SSE] Error parsing event:', e);
          }
        };

        eventSourceRef.current.onerror = (error) => {
          console.error('[SSE] Error:', error);
          setIsConnected(false);
          eventSourceRef.current?.close();
          
          // Reconnect after 5 seconds
          setTimeout(connect, 5000);
        };
      } catch (error) {
        console.error('[SSE] Failed to connect:', error);
        setTimeout(connect, 5000);
      }
    };

    connect();

    return () => {
      eventSourceRef.current?.close();
      setIsConnected(false);
    };
  }, [restaurantId, onNewBooking, onStatusChange, onNewMessage, playNotificationSound]);

  return { isConnected };
}
