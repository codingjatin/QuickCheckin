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
  const [isAudioReady, setIsAudioReady] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUnlockedRef = useRef(false);

  // Initialize audio for notification sound
  useEffect(() => {
    if (typeof window !== 'undefined' && playSound) {
      try {
        audioRef.current = new Audio('/sounds/bell_notification.mp3');
        audioRef.current.volume = 0.7;
        audioRef.current.preload = 'auto';
        
        // Handle audio load errors
        audioRef.current.onerror = (e) => {
          console.error('[Audio] Failed to load notification sound:', e);
        };
        
        audioRef.current.oncanplaythrough = () => {
          console.log('[Audio] Notification sound loaded and ready');
        };

        // Try to unlock audio on any user interaction (browser autoplay policy)
        const unlockAudio = async () => {
          if (!audioUnlockedRef.current && audioRef.current) {
            try {
              // Create a short silent play to unlock
              audioRef.current.volume = 0;
              await audioRef.current.play();
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
              audioRef.current.volume = 0.7;
              audioUnlockedRef.current = true;
              setIsAudioReady(true);
              console.log('[Audio] ✅ Notification sound unlocked successfully');
              
              // Remove listeners once unlocked
              document.removeEventListener('click', unlockAudio);
              document.removeEventListener('touchstart', unlockAudio);
              document.removeEventListener('keydown', unlockAudio);
            } catch (err) {
              console.log('[Audio] Could not unlock yet, waiting for user interaction...');
            }
          }
        };

        // Add listeners for user interaction to unlock audio
        document.addEventListener('click', unlockAudio);
        document.addEventListener('touchstart', unlockAudio);
        document.addEventListener('keydown', unlockAudio);
        
        // Also try to unlock immediately in case autoplay is allowed
        unlockAudio();

        return () => {
          document.removeEventListener('click', unlockAudio);
          document.removeEventListener('touchstart', unlockAudio);
          document.removeEventListener('keydown', unlockAudio);
        };
      } catch (err) {
        console.error('[Audio] Error initializing notification sound:', err);
        audioRef.current = null;
      }
    }
  }, [playSound]);

  const playNotificationSound = useCallback(() => {
    if (audioRef.current && playSound) {
      console.log('[Audio] 🔔 Attempting to play notification sound...');
      console.log('[Audio] Audio unlocked:', audioUnlockedRef.current);
      
      audioRef.current.currentTime = 0;
      audioRef.current.play()
        .then(() => {
          console.log('[Audio] ✅ Notification sound played successfully');
        })
        .catch(err => {
          console.error('[Audio] ❌ Failed to play notification sound:', err.message);
          console.log('[Audio] Tip: Click anywhere on the page to enable sounds');
        });
    } else {
      console.log('[Audio] Sound not available - audioRef:', !!audioRef.current, 'playSound:', playSound);
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
            console.log('[SSE] 📨 Event received:', eventData.type, eventData);

            switch (eventData.type) {
              case 'connected':
                console.log('[SSE] Connection confirmed');
                break;
              case 'new_booking':
                console.log('[SSE] 🆕 NEW BOOKING - Playing sound!');
                playNotificationSound();
                onNewBooking?.(eventData.data);
                break;
              case 'status_change':
                console.log('[SSE] 🔄 Status change');
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
  }, [restaurantId, onNewBooking, onStatusChange, onNewMessage, onWaitTimeUpdate, playNotificationSound]);

  return { isConnected, isAudioReady, testSound: playNotificationSound };
}
