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
        return 'bg-sage/20 text-charcoal';
      case 'notified':
        return 'bg-deep-brown/20 text-deep-brown';
      case 'seated':
        return 'bg-sage/30 text-charcoal';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-charcoal/20 text-charcoal';
      default:
        return 'bg-charcoal/20 text-charcoal';
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
        <Card className="bg-off-white border-sage/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-charcoal">{t('totalWaiting')}</CardTitle>
            <Users className="h-4 w-4 text-charcoal/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-charcoal">{waitingCustomers.length}</div>
            <p className="text-xs text-charcoal/60">{t('activeInQueue')}</p>
          </CardContent>
        </Card>

        <Card className="bg-off-white border-sage/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-charcoal">{t('avgWaitTime')}</CardTitle>
            <Clock className="h-4 w-4 text-charcoal/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-charcoal">28 min</div>
            <p className="text-xs text-charcoal/60">{t('currentEstimate')}</p>
          </CardContent>
        </Card>

        <Card className="bg-off-white border-sage/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-charcoal">{t('availableTables')}</CardTitle>
            <CheckCircle className="h-4 w-4 text-charcoal/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-charcoal">{availableTables.length}</div>
            <p className="text-xs text-charcoal/60">{t('readyToSeat')}</p>
          </CardContent>
        </Card>

        <Card className="bg-off-white border-sage/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-charcoal">{t('todaysSeated')}</CardTitle>
            <Users className="h-4 w-4 text-charcoal/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-charcoal">42</div>
            <p className="text-xs text-charcoal/60">{t('totalCustomers')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Waitlist Management */}
      <Card className="bg-off-white border-sage/20">
        <CardHeader>
          <CardTitle className="flex items-center text-charcoal">
            <Users className="h-5 w-5 mr-2" />
            {t('activeWaitlist')}
          </CardTitle>
          <CardDescription className="text-charcoal/70">
            {t('manageCustomerQueue')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeCustomers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-charcoal/40 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-charcoal mb-2">{t('noCustomersWaiting')}</h3>
              <p className="text-charcoal/60">{t('customersWillAppear')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeCustomers.map((customer, index) => (
                <div 
                  key={customer.id}
                  className="flex items-center justify-between p-4 border border-sage/20 rounded-lg hover:bg-sage/5 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-sage/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-deep-brown">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-charcoal">{customer.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-charcoal/60">
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
                        className="bg-deep-brown hover:bg-deep-brown/90 text-off-white"
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
                        className="bg-sage hover:bg-sage/90 text-charcoal"
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