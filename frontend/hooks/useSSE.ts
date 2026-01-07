'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { apiClient } from '@/lib/api-client';

type SSEEventType = 'new_booking' | 'status_change' | 'new_message' | 'wait_time_update' | 'connected';

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
  onWaitTimeUpdate?: (data: { waitTimes: Record<number, number> }) => void;
  playSound?: boolean;
}

export function useSSE(options: UseSSEOptions) {
  const { restaurantId, onNewBooking, onStatusChange, onNewMessage, onWaitTimeUpdate, playSound = true } = options;
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUnlockedRef = useRef(false);

  // Initialize audio for notification sound
  useEffect(() => {
    if (typeof window !== 'undefined' && playSound) {
      try {
        audioRef.current = new Audio('/sounds/bell_notification.wav');
        audioRef.current.volume = 0.7;
        audioRef.current.preload = 'auto';
        
        // Try to unlock audio on any user interaction (browser autoplay policy)
        const unlockAudio = () => {
          if (!audioUnlockedRef.current && audioRef.current) {
            // Play and immediately pause to "unlock" the audio context
            audioRef.current.play().then(() => {
              audioRef.current?.pause();
              audioRef.current!.currentTime = 0;
              audioUnlockedRef.current = true;
              console.log('[Audio] Notification sound unlocked');
            }).catch(() => {
              // Still locked, will try again on next interaction
            });
          }
        };
        
        // Add listeners for user interaction to unlock audio
        document.addEventListener('click', unlockAudio, { once: false });
        document.addEventListener('touchstart', unlockAudio, { once: false });
        document.addEventListener('keydown', unlockAudio, { once: false });
        
        return () => {
          document.removeEventListener('click', unlockAudio);
          document.removeEventListener('touchstart', unlockAudio);
          document.removeEventListener('keydown', unlockAudio);
        };
      } catch (err) {
        console.log('Notification sound not available:', err);
        audioRef.current = null;
      }
    }
  }, [playSound]);

  const playNotificationSound = useCallback(() => {
    if (audioRef.current && playSound) {
      console.log('[Audio] Playing notification sound...');
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => {
        console.log('Could not play notification sound (user interaction required):', err);
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
              case 'wait_time_update':
                onWaitTimeUpdate?.(eventData.data);
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
