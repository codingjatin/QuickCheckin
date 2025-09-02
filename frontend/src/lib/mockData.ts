import { Customer, Table, Restaurant, Message } from './types';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    phone: '(555) 123-4567',
    partySize: 4,
    status: 'waiting',
    estimatedWait: 25,
    checkInTime: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: '2',
    name: 'Mike Chen',
    phone: '(555) 987-6543',
    partySize: 2,
    status: 'notified',
    estimatedWait: 10,
    checkInTime: new Date(Date.now() - 45 * 60 * 1000),
    notifiedTime: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    phone: '(555) 456-7890',
    partySize: 6,
    status: 'seated',
    estimatedWait: 0,
    checkInTime: new Date(Date.now() - 60 * 60 * 1000),
    seatedTime: new Date(Date.now() - 10 * 60 * 1000),
  },
];

export const mockTables: Table[] = Array.from({ length: 12 }, (_, i) => ({
  id: `table-${i + 1}`,
  number: i + 1,
  capacity: [2, 4, 6][i % 3],
  status: i < 4 ? 'occupied' : i < 8 ? 'available' : 'reserved',
  customerId: i < 4 ? mockCustomers[i % mockCustomers.length]?.id : undefined,
}));

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Garden Bistro',
    address: '123 Main St, Downtown',
    phone: '(555) 001-2345',
    totalTables: 12,
    activeWaitlist: 8,
    averageWait: 22,
  },
  {
    id: '2',
    name: 'Ocean View Restaurant',
    address: '456 Coastal Rd, Seaside',
    phone: '(555) 002-3456',
    totalTables: 18,
    activeWaitlist: 12,
    averageWait: 35,
  },
  {
    id: '3',
    name: 'Urban Kitchen',
    address: '789 City Ave, Midtown',
    phone: '(555) 003-4567',
    totalTables: 15,
    activeWaitlist: 6,
    averageWait: 18,
  },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    customerId: '2',
    customerName: 'Mike Chen',
    phone: '(555) 987-6543',
    message: 'Your table is ready! Please come to the host stand.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    type: 'notification',
  },
  {
    id: '2',
    customerId: '1',
    customerName: 'Sarah Johnson',
    phone: '(555) 123-4567',
    message: 'Thank you for waiting. Your estimated wait time is 20-25 minutes.',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    type: 'reminder',
  },
];