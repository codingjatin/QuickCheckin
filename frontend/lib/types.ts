export interface Customer {
  id: string;
  name: string;
  phone: string;
  partySize: number;
  checkInTime: Date;
  status: 'waiting' | 'notified' | 'seated' | 'no-show' | 'cancelled';
  estimatedWaitMinutes: number;
  tableId?: string;
  notificationSentAt?: Date;
  responseReceived?: 'yes' | 'no';
  responseTime?: Date;
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: 'available' | 'holding' | 'occupied' | 'cleaning';
  holdStartTime?: Date;
  customerId?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  logo?: string;
  city: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  tables: Table[];
  settings: {
    gracePeriodMinutes: number;
    reminderDelayMinutes: number;
    smsTemplates: {
      tableReady: string;
      reminder: string;
      cancelled: string;
    };
  };
}

export interface SMSMessage {
  id: string;
  customerId: string;
  restaurantId: string;
  direction: 'outgoing' | 'incoming';
  message: string;
  timestamp: Date;
  type: 'notification' | 'reminder' | 'response' | 'cancelled';
}