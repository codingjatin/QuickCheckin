export interface Customer {
  id: string;
  name: string;
  phone: string;
  partySize: number;
  status: 'waiting' | 'notified' | 'seated' | 'cancelled';
  estimatedWait: number;
  checkInTime: Date;
  notifiedTime?: Date;
  seatedTime?: Date;
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
  customerId?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  totalTables: number;
  activeWaitlist: number;
  averageWait: number;
}

export interface Message {
  id: string;
  customerId: string;
  customerName: string;
  phone: string;
  message: string;
  timestamp: Date;
  type: 'notification' | 'reminder' | 'seated';
}

export type WaitlistEvent = {
  type: 'customer_added' | 'customer_notified' | 'customer_seated' | 'customer_cancelled' | 'table_updated';
  data: Customer | Table;
  timestamp: Date;
};