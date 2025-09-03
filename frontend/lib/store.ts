'use client';

import { create } from 'zustand';
import { Customer, Table, SMSMessage } from './types';
import { mockCustomers, mockRestaurant, mockSMSMessages } from './mock-data';

interface WaitlistStore {
  customers: Customer[];
  tables: Table[];
  messages: SMSMessage[];
  addCustomer: (customer: Omit<Customer, 'id' | 'checkInTime' | 'estimatedWaitMinutes'>) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  updateTable: (id: string, updates: Partial<Table>) => void;
  assignTable: (customerId: string, tableId: string) => void;
  releaseTable: (tableId: string) => void;
  sendSMS: (customerId: string, message: string, type: SMSMessage['type']) => void;
  markSeated: (customerId: string) => void;
  cancelCustomer: (customerId: string) => void;
}

export const useWaitlistStore = create<WaitlistStore>((set, get) => ({
  customers: mockCustomers,
  tables: mockRestaurant.tables,
  messages: mockSMSMessages,

  addCustomer: (customerData) => {
    const newCustomer: Customer = {
      ...customerData,
      id: `customer-${Date.now()}`,
      checkInTime: new Date(),
      estimatedWaitMinutes: Math.floor(Math.random() * 40) + 10, // 10-50 minutes
      status: 'waiting',
    };
    set((state) => ({
      customers: [...state.customers, newCustomer],
    }));
  },

  updateCustomer: (id, updates) => {
    set((state) => ({
      customers: state.customers.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    }));
  },

  updateTable: (id, updates) => {
    set((state) => ({
      tables: state.tables.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    }));
  },

  assignTable: (customerId, tableId) => {
    set((state) => ({
      tables: state.tables.map((t) =>
        t.id === tableId 
          ? { ...t, status: 'holding', customerId, holdStartTime: new Date() }
          : t
      ),
      customers: state.customers.map((c) =>
        c.id === customerId
          ? { ...c, status: 'notified', tableId, notificationSentAt: new Date() }
          : c
      ),
    }));
  },

  releaseTable: (tableId) => {
    const { tables, customers } = get();
    const table = tables.find(t => t.id === tableId);
    
    set((state) => ({
      tables: state.tables.map((t) =>
        t.id === tableId 
          ? { ...t, status: 'available', customerId: undefined, holdStartTime: undefined }
          : t
      ),
      customers: table?.customerId 
        ? state.customers.map((c) =>
            c.id === table.customerId
              ? { ...c, status: 'cancelled', tableId: undefined }
              : c
          )
        : state.customers,
    }));
  },

  sendSMS: (customerId, message, type) => {
    const newMessage: SMSMessage = {
      id: `msg-${Date.now()}`,
      customerId,
      restaurantId: 'restaurant-1',
      direction: 'outgoing',
      message,
      timestamp: new Date(),
      type,
    };
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },

  markSeated: (customerId) => {
    set((state) => ({
      customers: state.customers.map((c) =>
        c.id === customerId
          ? { ...c, status: 'seated', estimatedWaitMinutes: 0 }
          : c
      ),
      tables: state.tables.map((t) =>
        t.customerId === customerId
          ? { ...t, status: 'occupied' }
          : t
      ),
    }));
  },

  cancelCustomer: (customerId) => {
    const { tables } = get();
    const customerTable = tables.find(t => t.customerId === customerId);
    
    set((state) => ({
      customers: state.customers.map((c) =>
        c.id === customerId
          ? { ...c, status: 'cancelled' }
          : c
      ),
      tables: customerTable
        ? state.tables.map((t) =>
            t.id === customerTable.id
              ? { ...t, status: 'available', customerId: undefined, holdStartTime: undefined }
              : t
          )
        : state.tables,
    }));
  },
}));