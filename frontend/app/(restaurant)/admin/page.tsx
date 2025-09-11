'use client';

import React, { useState, useMemo, useCallback } from 'react';
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

  const waitingCustomers = useMemo(() =>
    customers.filter((c) => ['waiting', 'notified'].includes(c.status)),
    [customers]
  );

  const activeCustomers = useMemo(() =>
    customers.filter((c) => ['waiting', 'notified', 'seated'].includes(c.status)),
    [customers]
  );

  const availableTables = useMemo(() =>
    tables.filter((t) => t.status === 'available'),
    [tables]
  );

  const handleNotifyCustomer = useCallback((customer: Customer) => {
    const availableTable = availableTables.find((t) => t.capacity >= customer.partySize);

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
  }, [availableTables, assignTable, sendSMS, updateCustomer]);

  const handleMarkSeated = useCallback((customerId: string) => {
    markSeated(customerId);
  }, [markSeated]);

  const handleCancel = useCallback((customerId: string) => {
    const customer = customers.find((c) => c.id === customerId);
    if (customer) {
      cancelCustomer(customerId);
      sendSMS(
        customerId,
        `Hi ${customer.name}, your reservation at Bella Vista has been cancelled due to no response.`,
        'cancelled'
      );
    }
  }, [customers, cancelCustomer, sendSMS]);

  const getStatusColor = (status: Customer['status']) => {
    switch (status) {
      case 'waiting':
        return 'bg-off text-ink ring-1 ring-border';
      case 'notified':
        return 'bg-info/10 text-info border-0';
      case 'seated':
        return 'bg-success/10 text-success border-0';
      case 'cancelled':
        return 'bg-error/10 text-error border-0';
      case 'no-show':
        return 'bg-ink/10 text-ink border-0';
      default:
        return 'bg-ink/10 text-ink border-0';
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
    <div className="space-y-8 text-ink">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-panel border border-border shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium"> {t('totalWaiting')} </CardTitle>
            <Users className="h-4 w-4 text-ink/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{waitingCustomers.length}</div>
            <p className="text-xs text-muted">{t('activeInQueue')}</p>
          </CardContent>
        </Card>

        <Card className="bg-panel border border-border shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('avgWaitTime')}</CardTitle>
            <Clock className="h-4 w-4 text-ink/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28 min</div>
            <p className="text-xs text-muted">{t('currentEstimate')}</p>
          </CardContent>
        </Card>

        <Card className="bg-panel border border-border shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('availableTables')}</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableTables.length}</div>
            <p className="text-xs text-muted">{t('readyToSeat')}</p>
          </CardContent>
        </Card>

        <Card className="bg-panel border border-border shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('todaysSeated')}</CardTitle>
            <Users className="h-4 w-4 text-ink/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted">{t('totalCustomers')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Waitlist Management */}
      <Card className="bg-panel border border-border shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary" />
            {t('activeWaitlist')}
          </CardTitle>
          <CardDescription className="text-muted">
            {t('manageCustomerQueue')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeCustomers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">{t('noCustomersWaiting')}</h3>
              <p className="text-muted">{t('customersWillAppear')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeCustomers.map((customer, index) => (
                <div
                  key={customer.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-off transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{customer.name}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
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

                  <div className="flex items-center gap-3">
                    <Badge className={`${getStatusColor(customer.status)} rounded-md`}>
                      {getStatusText(customer.status)}
                    </Badge>

                    {customer.status === 'waiting' && (
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary-600 text-white"
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
                        className="bg-success hover:bg-success/90 text-white"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {t('markSeated')}
                      </Button>
                    )}

                    {['waiting', 'notified'].includes(customer.status) && (
                      <Button size="sm" variant="destructive" onClick={() => handleCancel(customer.id)}>
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
