'use client';

import { create } from 'zustand';
import { apiClient } from './api-client';
import { toast } from 'sonner';

export type UserRole = 'guest' | 'admin';

interface AuthState {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  phoneNumber: string;
  currentStep: 'login' | 'otp' | 'authenticated';
  otp: string;
  isLoading: boolean;
  restaurantData: any | null;
  login: (phone: string, role: UserRole) => Promise<void>;
  verifyOtp: (enteredOtp: string) => Promise<boolean>;
  logout: () => void;
  setOtp: (otp: string) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  userRole: null,
  phoneNumber: '',
  currentStep: 'login',
  otp: '',
  isLoading: false,
  restaurantData: null,

  login: async (phone: string, role: UserRole) => {
    set({ isLoading: true });
    
    const { data, error } = await apiClient.requestOTP(phone, role);
    
    set({ isLoading: false });
    
    if (error) {
      toast.error(error.message || 'Failed to send OTP');
      return;
    }

    set({
      phoneNumber: phone,
      userRole: role,
      currentStep: 'otp',
      otp: '',
    });

    toast.success('OTP sent to your phone number');
  },

  verifyOtp: async (enteredOtp: string) => {
    const { phoneNumber, userRole } = get();
    
    if (!phoneNumber || !userRole) {
      toast.error('Session expired. Please login again.');
      return false;
    }

    set({ isLoading: true });
    
    const { data, error } = await apiClient.verifyOTP(phoneNumber, userRole, enteredOtp);
    
    set({ isLoading: false });
    
    if (error) {
      toast.error(error.message || 'Invalid OTP');
      return false;
    }

    set({
      isAuthenticated: true,
      currentStep: 'authenticated',
      otp: '',
      restaurantData: data?.restaurant || null,
    });

    toast.success('Login successful!');
    return true;
  },

  logout: () => {
    set({
      isAuthenticated: false,
      userRole: null,
      phoneNumber: '',
      currentStep: 'login',
      otp: '',
      isLoading: false,
      restaurantData: null,
    });
  },

  setOtp: (otp: string) => {
    set({ otp });
  },
}));