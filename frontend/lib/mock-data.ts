import { Customer, Restaurant, SMSMessage } from './types';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    partySize: 2,
    checkInTime: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    status: 'waiting',
    estimatedWaitMinutes: 25,
  },
  {
    id: '2',
    name: 'Mike Chen',
    phone: '+1 (555) 234-5678',
    partySize: 4,
    checkInTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    status: 'notified',
    estimatedWaitMinutes: 5,
    notificationSentAt: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: '3',
    name: 'Emma Davis',
    phone: '+1 (555) 345-6789',
    partySize: 3,
    checkInTime: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    status: 'seated',
    estimatedWaitMinutes: 0,
    tableId: 'table-1',
  },
  {
    id: '4',
    name: 'Alex Rodriguez',
    phone: '+1 (555) 456-7890',
    partySize: 6,
    checkInTime: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    status: 'waiting',
    estimatedWaitMinutes: 35,
  },
];

export const mockRestaurant: Restaurant = {
  id: 'restaurant-1',
  name: 'Bella Vista',
  city: 'San Francisco',
  status: 'active',
  createdAt: new Date('2024-01-15'),
  tables: [
    { id: 'table-1', number: 1, capacity: 2, status: 'occupied', customerId: '3' },
    { id: 'table-2', number: 2, capacity: 4, status: 'available' },
    { id: 'table-3', number: 3, capacity: 4, status: 'available' },
    { id: 'table-4', number: 4, capacity: 6, status: 'cleaning' },
    { id: 'table-5', number: 5, capacity: 2, status: 'holding', holdStartTime: new Date(), customerId: '2' },
    { id: 'table-6', number: 6, capacity: 8, status: 'available' },
  ],
  settings: {
    gracePeriodMinutes: 15,
    reminderDelayMinutes: 7,
    smsTemplates: {
      tableReady: 'Hi {name}! Your table for {partySize} at {restaurant} is ready. Please arrive within 15 minutes.',
      reminder: 'Please reply quickly with Y (Yes) or N (No) so we can continue further.',
      cancelled: 'Hi {name}, your reservation at {restaurant} has been cancelled due to no response.',
    },
  },
};

export const mockSMSMessages: SMSMessage[] = [
  {
    id: '1',
    customerId: '2',
    restaurantId: 'restaurant-1',
    direction: 'outgoing',
    message: 'Hi Mike! Your table for 4 at Bella Vista is ready. Please arrive within 15 minutes.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    type: 'notification',
  },
  {
    id: '2',
    customerId: '2',
    restaurantId: 'restaurant-1',
    direction: 'incoming',
    message: 'Y',
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    type: 'response',
  },
];

export const mockSuperAdminRestaurants: Restaurant[] = [
  mockRestaurant,
  {
    id: 'restaurant-2',
    name: 'Ocean Breeze',
    city: 'Miami',
    status: 'active',
    createdAt: new Date('2024-02-01'),
    tables: [],
    settings: mockRestaurant.settings,
  },
  {
    id: 'restaurant-3',
    name: 'Mountain View Bistro',
    city: 'Denver',
    status: 'inactive',
    createdAt: new Date('2024-01-20'),
    tables: [],
    settings: mockRestaurant.settings,
  },
];