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
  token: string | null;
  login: (phone: string, role: UserRole) => Promise<void>;
  verifyOtp: (enteredOtp: string) => Promise<boolean>;
  logout: () => void;
  setOtp: (otp: string) => void;
  hydrate: () => Promise<void>;
}

const TOKEN_KEY = 'auth_token';

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  userRole: null,
  phoneNumber: '',
  currentStep: 'login',
  otp: '',
  isLoading: false,
  restaurantData: null,
  token: null,

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

    if (data && data.token) {
      // Store token in localStorage
      localStorage.setItem(TOKEN_KEY, data.token);
      
      set({
        isAuthenticated: true,
        currentStep: 'authenticated',
        otp: '',
        restaurantData: data.restaurant || null,
        token: data.token,
      });

      toast.success('Login successful!');
      return true;
    }

    return false;
  },

  logout: () => {
    // Clear token from localStorage
    localStorage.removeItem(TOKEN_KEY);
    
    set({
      isAuthenticated: false,
      userRole: null,
      phoneNumber: '',
      currentStep: 'login',
      otp: '',
      isLoading: false,
      restaurantData: null,
      token: null,
    });
  },

  setOtp: (otp: string) => {
    set({ otp });
  },

  hydrate: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    
    if (!token) {
      return;
    }

    set({ isLoading: true });

    try {
      // Verify token with backend
      const { data, error } = await apiClient.validateToken(token);
      
      if (error || !data) {
        // Token is invalid, clear it
        localStorage.removeItem(TOKEN_KEY);
        set({ isLoading: false });
        return;
      }

      // Token is valid, restore auth state
      set({
        isAuthenticated: true,
        userRole: data.role,
        phoneNumber: data.phone,
        currentStep: 'authenticated',
        restaurantData: data.restaurant,
        token,
        isLoading: false,
      });
    } catch (error) {
      localStorage.removeItem(TOKEN_KEY);
      set({ isLoading: false });
    }
  },
}));