'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWaitlistStore } from '@/lib/store';
import { Customer } from '@/lib/types';
import { useTranslation } from '@/lib/i18n';
import { Clock, Users, MessageCircle, CheckCircle, X, Phone } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function AdminDashboard() {
  const { t } = useTranslation();
  const {
    customers,
    tables,
    assignTable,
    markSeated,
    cancelCustomer,
    sendSMS,
    updateCustomer,
  } = useWaitlistStore();

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const waitingCustomers = customers.filter(c => ['waiting', 'notified'].includes(c.status));
  const activeCustomers = customers.filter(c => ['waiting', 'notified', 'seated'].includes(c.status));
  const availableTables = tables.filter(t => t.status === 'available');

  const handleNotifyCustomer = (customer: Customer) => {
    const availableTable = availableTables.find(t => t.capacity >= customer.partySize);
    
    if (availableTable) {
      assignTable(customer.id, availableTable.id);
      sendSMS(
        customer.id,
        `Hi ${customer.name}! Your table for ${customer.partySize} at Bella Vista is ready. Please arrive within 15 minutes.`,
        'notification'
      );
      
      // Simulate customer response after 2 seconds for demo
      setTimeout(() => {
        updateCustomer(customer.id, {
          responseReceived: 'yes',
          responseTime: new Date(),
        });
      }, 2000);
    }
  };

  const handleMarkSeated = (customerId: string) => {
    markSeated(customerId);
  };

  const handleCancel = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      cancelCustomer(customerId);
      sendSMS(
        customerId,
        `Hi ${customer.name}, your reservation at Bella Vista has been cancelled due to no response.`,
        'cancelled'
      );
    }
  };

  const getStatusColor = (status: Customer['status']) => {
    switch (status) {
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'notified':
        return 'bg-blue-100 text-blue-800';
      case 'seated':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Customer['status']) => {
    switch (status) {
      case 'waiting':
        return t('inQueue');
      case 'notified':
        return t('tableReady');
      case 'seated':
        return t('seated');
      case 'cancelled':
        return t('cancelled');
      case 'no-show':
        return t('noShow');
      default:
        return status;
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalWaiting')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{waitingCustomers.length}</div>
            <p className="text-xs text-muted-foreground">{t('activeInQueue')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('avgWaitTime')}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28 min</div>
            <p className="text-xs text-muted-foreground">{t('currentEstimate')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('availableTables')}</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableTables.length}</div>
            <p className="text-xs text-muted-foreground">{t('readyToSeat')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('todaysSeated')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">{t('totalCustomers')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Waitlist Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            {t('activeWaitlist')}
          </CardTitle>
          <CardDescription>
            {t('manageCustomerQueue')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeCustomers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noCustomersWaiting')}</h3>
              <p className="text-gray-500">{t('customersWillAppear')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeCustomers.map((customer, index) => (
                <div 
                  key={customer.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-indigo-600">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{customer.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {t('partyOf')} {customer.partySize}
                        </span>
                        <span className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {customer.phone}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatDistanceToNow(customer.checkInTime, { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(customer.status)}>
                      {getStatusText(customer.status)}
                    </Badge>
                    
                    {customer.status === 'waiting' && (
                      <Button
                        size="sm"
                        onClick={() => handleNotifyCustomer(customer)}
                        disabled={availableTables.length === 0}
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {t('notify')}
                      </Button>
                    )}
                    
                    {customer.status === 'notified' && customer.responseReceived === 'yes' && (
                      <Button
                        size="sm"
                        onClick={() => handleMarkSeated(customer.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {t('markSeated')}
                      </Button>
                    )}
                    
                    {['waiting', 'notified'].includes(customer.status) && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleCancel(customer.id)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        {t('cancel')}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}