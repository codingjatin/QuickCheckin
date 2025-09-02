import { create } from 'zustand';
import { Customer, Table, Message } from '../lib/types';
import { mockCustomers, mockTables, mockMessages } from '../lib/mockData';
import { generateId } from '../lib/utils';

interface WaitlistState {
  customers: Customer[];
  tables: Table[];
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addCustomer: (customer: Omit<Customer, 'id' | 'checkInTime' | 'estimatedWait'>) => void;
  updateCustomerStatus: (id: string, status: Customer['status']) => void;
  cancelCustomer: (id: string) => void;
  notifyCustomer: (id: string) => void;
  seatCustomer: (customerId: string, tableId: string) => void;
  releaseTable: (tableId: string) => void;
  sendMessage: (customerId: string, message: string, type: Message['type']) => void;
  clearError: () => void;
}

export const useWaitlistStore = create<WaitlistState>((set, get) => ({
  customers: mockCustomers,
  tables: mockTables,
  messages: mockMessages,
  isLoading: false,
  error: null,

  addCustomer: (customerData) => {
    const newCustomer: Customer = {
      ...customerData,
      id: generateId(),
      checkInTime: new Date(),
      estimatedWait: Math.floor(Math.random() * 40) + 15, // 15-55 minutes
    };

    set((state) => ({
      customers: [...state.customers, newCustomer],
    }));

    // Simulate SSE update
    setTimeout(() => {
      get().sendMessage(
        newCustomer.id,
        `Welcome ${newCustomer.name}! You've been added to our waitlist. Estimated wait: ${newCustomer.estimatedWait} minutes.`,
        'notification'
      );
    }, 1000);
  },

  updateCustomerStatus: (id, status) => {
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === id
          ? {
              ...customer,
              status,
              notifiedTime: status === 'notified' ? new Date() : customer.notifiedTime,
              seatedTime: status === 'seated' ? new Date() : customer.seatedTime,
            }
          : customer
      ),
    }));
  },

  cancelCustomer: (id) => {
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === id ? { ...customer, status: 'cancelled' as const } : customer
      ),
    }));
  },

  notifyCustomer: (id) => {
    const customer = get().customers.find((c) => c.id === id);
    if (customer) {
      get().updateCustomerStatus(id, 'notified');
      get().sendMessage(
        id,
        `${customer.name}, your table is ready! Please come to the host stand.`,
        'notification'
      );
    }
  },

  seatCustomer: (customerId, tableId) => {
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === customerId
          ? { ...customer, status: 'seated' as const, seatedTime: new Date() }
          : customer
      ),
      tables: state.tables.map((table) =>
        table.id === tableId
          ? { ...table, status: 'occupied' as const, customerId }
          : table
      ),
    }));

    const customer = get().customers.find((c) => c.id === customerId);
    if (customer) {
      get().sendMessage(
        customerId,
        `${customer.name}, you have been seated at table ${get().tables.find(t => t.id === tableId)?.number}. Enjoy your meal!`,
        'seated'
      );
    }
  },

  releaseTable: (tableId) => {
    set((state) => ({
      tables: state.tables.map((table) =>
        table.id === tableId
          ? { ...table, status: 'available' as const, customerId: undefined }
          : table
      ),
    }));
  },

  sendMessage: (customerId, message, type) => {
    const customer = get().customers.find((c) => c.id === customerId);
    if (customer) {
      const newMessage: Message = {
        id: generateId(),
        customerId,
        customerName: customer.name,
        phone: customer.phone,
        message,
        timestamp: new Date(),
        type,
      };

      set((state) => ({
        messages: [newMessage, ...state.messages],
      }));
    }
  },

  clearError: () => set({ error: null }),
}));