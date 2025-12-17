'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/lib/auth-store';
import { apiClient, Booking, DashboardStats } from '@/lib/api-client';
import { useSSE } from '@/hooks/useSSE';
import { useTranslation } from '@/lib/i18n';
import { Clock, Users, MessageCircle, CheckCircle, X, Phone, Loader2, Wifi, WifiOff } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isAuthenticated, userRole, isLoading: authLoading, restaurantData } = useAuthStore();
  
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const restaurantId = restaurantData?.id;

  // Fetch data from backend
  const fetchData = useCallback(async () => {
    if (!restaurantId) return;
    
    try {
      const [statsRes, bookingsRes] = await Promise.all([
        apiClient.getDashboardStats(restaurantId),
        apiClient.getBookings(restaurantId, 'waiting,notified,confirmed,seated')
      ]);

      if (statsRes.data) {
        setStats(statsRes.data);
      }
      if (bookingsRes.data) {
        setBookings(bookingsRes.data.bookings);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [restaurantId]);

  // SSE handlers for real-time updates
  const handleNewBooking = useCallback((data: any) => {
    toast.success('New booking received!', {
      description: `${data.booking?.customerName} - Party of ${data.booking?.partySize}`
    });
    fetchData(); // Refresh data
  }, [fetchData]);

  const handleStatusChange = useCallback(() => {
    fetchData(); // Refresh data on any status change
  }, [fetchData]);

  // Connect to SSE for real-time updates
  const { isConnected } = useSSE({
    restaurantId: restaurantId || '',
    onNewBooking: handleNewBooking,
    onStatusChange: handleStatusChange,
    playSound: true
  });

  // Initial data load
  useEffect(() => {
    if (!authLoading && isAuthenticated && restaurantId) {
      fetchData();
      // Also poll every 30 seconds as backup
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }
  }, [authLoading, isAuthenticated, restaurantId, fetchData]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.replace('/auth');
      } else if (userRole !== 'admin') {
        router.replace('/kiosk');
      }
    }
  }, [isAuthenticated, userRole, authLoading, router]);

  // Action handlers
  const handleNotify = async (booking: Booking) => {
    const bookingId = booking._id || booking.id;
    setActionLoading(bookingId);
    try {
      const result = await apiClient.notifyCustomer(bookingId);
      if (result.error) {
        toast.error(result.error.message);
      } else {
        toast.success('Customer notified!');
        fetchData();
      }
    } catch (error) {
      toast.error('Failed to notify customer');
    } finally {
      setActionLoading(null);
    }
  };

  const handleMarkSeated = async (booking: Booking) => {
    const bookingId = booking._id || booking.id;
    setActionLoading(bookingId);
    try {
      const result = await apiClient.markSeated(bookingId);
      if (result.error) {
        toast.error(result.error.message);
      } else {
        toast.success('Customer seated!');
        fetchData();
      }
    } catch (error) {
      toast.error('Failed to mark as seated');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async (booking: Booking) => {
    const bookingId = booking._id || booking.id;
    setActionLoading(bookingId);
    try {
      const result = await apiClient.cancelBooking(bookingId);
      if (result.error) {
        toast.error(result.error.message);
      } else {
        toast.success('Booking cancelled');
        fetchData();
      }
    } catch (error) {
      toast.error('Failed to cancel booking');
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'bg-off text-ink ring-1 ring-border';
      case 'notified':
        return 'bg-info/10 text-info border-0';
      case 'confirmed':
        return 'bg-primary/10 text-primary border-0';
      case 'seated':
        return 'bg-success/10 text-success border-0';
      case 'cancelled':
        return 'bg-error/10 text-error border-0';
      default:
        return 'bg-ink/10 text-ink border-0';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting':
        return t('inQueue') || 'In Queue';
      case 'notified':
        return t('tableReady') || 'Table Ready';
      case 'confirmed':
        return 'Confirmed';
      case 'seated':
        return t('seated') || 'Seated';
      case 'cancelled':
        return t('cancelled') || 'Cancelled';
      default:
        return status;
    }
  };

  // Loading state
  if (authLoading || !isAuthenticated || userRole !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const activeBookings = bookings.filter(b => 
    ['waiting', 'notified', 'confirmed', 'seated'].includes(b.status)
  );

  return (
    <div className="space-y-8 text-ink">
      {/* Connection Status */}
      <div className="flex items-center gap-2 text-sm">
        {isConnected ? (
          <>
            <Wifi className="h-4 w-4 text-success" />
            <span className="text-success">Live updates active</span>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4 text-muted" />
            <span className="text-muted">Connecting...</span>
          </>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-panel border border-border shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalWaiting') || 'Total Waiting'}</CardTitle>
            <Users className="h-4 w-4 text-ink/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats?.totalWaiting || 0}
            </div>
            <p className="text-xs text-muted">{t('activeInQueue') || 'Active in queue'}</p>
          </CardContent>
        </Card>

        <Card className="bg-panel border border-border shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('avgWaitTime') || 'Avg Wait Time'}</CardTitle>
            <Clock className="h-4 w-4 text-ink/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : `${stats?.avgWaitTime || 0} min`}
            </div>
            <p className="text-xs text-muted">{t('currentEstimate') || 'Current estimate'}</p>
          </CardContent>
        </Card>

        <Card className="bg-panel border border-border shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('availableTables') || 'Available Tables'}</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats?.availableTables || 0}
            </div>
            <p className="text-xs text-muted">{t('readyToSeat') || 'Ready to seat'}</p>
          </CardContent>
        </Card>

        <Card className="bg-panel border border-border shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('todaysSeated') || "Today's Seated"}</CardTitle>
            <Users className="h-4 w-4 text-ink/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats?.todaysSeated || 0}
            </div>
            <p className="text-xs text-muted">{t('totalCustomers') || 'Total customers'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Waitlist Management */}
      <Card className="bg-panel border border-border shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary" />
            {t('activeWaitlist') || 'Active Waitlist'}
          </CardTitle>
          <CardDescription className="text-muted">
            {t('manageCustomerQueue') || 'Manage customer queue and seating'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : activeBookings.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">{t('noCustomersWaiting') || 'No customers waiting'}</h3>
              <p className="text-muted">{t('customersWillAppear') || 'Customers will appear here when they join'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeBookings.map((booking, index) => {
                const bookingId = booking._id || booking.id;
                const isActionLoading = actionLoading === bookingId;

                return (
                  <div
                    key={bookingId}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-off transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{booking.customerName}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            Party of {booking.partySize}
                          </span>
                          <span className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {booking.customerPhone}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatDistanceToNow(new Date(booking.checkInTime || booking.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge className={`${getStatusColor(booking.status)} rounded-md`}>
                        {getStatusText(booking.status)}
                      </Badge>

                      {booking.status === 'waiting' && (
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary-600 text-white"
                          onClick={() => handleNotify(booking)}
                          disabled={isActionLoading}
                        >
                          {isActionLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {t('notify') || 'Table Ready'}
                            </>
                          )}
                        </Button>
                      )}

                      {['notified', 'confirmed'].includes(booking.status) && (
                        <Button
                          size="sm"
                          onClick={() => handleMarkSeated(booking)}
                          className="bg-success hover:bg-success/90 text-white"
                          disabled={isActionLoading}
                        >
                          {isActionLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              {t('markSeated') || 'Mark Seated'}
                            </>
                          )}
                        </Button>
                      )}

                      {['waiting', 'notified', 'confirmed'].includes(booking.status) && (
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => handleCancel(booking)}
                          disabled={isActionLoading}
                        >
                          {isActionLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <X className="h-4 w-4 mr-1" />
                              {t('cancel') || 'Cancel'}
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
