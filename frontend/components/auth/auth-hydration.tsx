"use client";

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/auth-store';

export function AuthHydration() {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    // Restore auth state from localStorage on mount
    hydrate();
  }, [hydrate]);

  return null;
}
