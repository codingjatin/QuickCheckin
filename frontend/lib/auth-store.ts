'use client';

import { create } from 'zustand';

export type UserRole = 'guest' | 'admin';

interface AuthState {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  phoneNumber: string;
  currentStep: 'login' | 'otp' | 'authenticated';
  otp: string;
  generatedOtp: string;
  login: (phone: string, role: UserRole) => void;
  verifyOtp: (enteredOtp: string) => boolean;
  logout: () => void;
  setOtp: (otp: string) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  userRole: null,
  phoneNumber: '',
  currentStep: 'login',
  otp: '',
  generatedOtp: '',

  login: (phone: string, role: UserRole) => {
    // Generate a random 4-digit OTP for demo
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    
    set({
      phoneNumber: phone,
      userRole: role,
      currentStep: 'otp',
      generatedOtp,
      otp: '',
    });

    // In demo, show the OTP in console for testing
    console.log(`Demo OTP for ${phone}: ${generatedOtp}`);
  },

  verifyOtp: (enteredOtp: string) => {
    const { generatedOtp } = get();
    
    if (enteredOtp === generatedOtp) {
      set({
        isAuthenticated: true,
        currentStep: 'authenticated',
        otp: '',
      });
      return true;
    }
    return false;
  },

  logout: () => {
    set({
      isAuthenticated: false,
      userRole: null,
      phoneNumber: '',
      currentStep: 'login',
      otp: '',
      generatedOtp: '',
    });
  },

  setOtp: (otp: string) => {
    set({ otp });
  },
}));