'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/lib/auth-store';
import { apiClient, Booking, DashboardStats, Table } from '@/lib/api-client';
import { useSSE } from '@/hooks/useSSE';
import { useTranslation } from '@/lib/i18n';
import { Clock, Users, MessageCircle, CheckCircle, X, Phone, Loader2, Wifi, WifiOff, Table as TableIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isAuthenticated, userRole, isLoading: authLoading, restaurantData } = useAuthStore();
  
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  // Table selection modal state
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedTableId, setSelectedTableId] = useState<string>('');
  const [showTableModal, setShowTableModal] = useState(false);

  const restaurantId = restaurantData?.id;

  // Custom party popup state
  const [showCustomPartyPopup, setShowCustomPartyPopup] = useState(false);
  const [customPartyBooking, setCustomPartyBooking] = useState<Booking | null>(null);

  // Fetch data from backend
  const fetchData = useCallback(async () => {
    if (!restaurantId) return;
    
    try {
      const [statsRes, bookingsRes, settingsRes] = await Promise.all([
        apiClient.getDashboardStats(restaurantId),
        apiClient.getBookings(restaurantId, 'waiting,notified,confirmed,seated'),
        apiClient.getSettings(restaurantId)
      ]);

      if (statsRes.data) {
        setStats(statsRes.data);
      }
      if (bookingsRes.data) {
        setBookings(bookingsRes.data.bookings);
      }
      if (settingsRes.data?.tables) {
        setTables(settingsRes.data.tables);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [restaurantId]);

  // SSE handlers for real-time updates
  const handleNewBooking = useCallback((data: any) => {
    const booking = data.booking;
    
    // Check if it's a custom party booking
    if (booking?.isCustomParty) {
      setCustomPartyBooking(booking);
      setShowCustomPartyPopup(true);
      toast.warning('🚨 Custom Party Alert!', {
        description: `${booking.customerName} - Party of ${booking.partySize} needs assistance`,
        duration: 10000
      });
    } else {
      toast.success('New booking received!', {
        description: `${booking?.customerName} - Party of ${booking?.partySize}`
      });
    }
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

  // Open table selection modal
  const openTableSelector = (booking: Booking) => {
    setSelectedBooking(booking);
    setSelectedTableId('');
    setShowTableModal(true);
  };

  // Get available tables that can accommodate the party size
  const getAvailableTables = (partySize: number) => {
    return tables.filter(t => 
      t.status === 'available' && 
      t.isActive && 
      t.capacity >= partySize
    );
  };

  // Handle mark seated with selected table
  const handleMarkSeated = async () => {
    if (!selectedBooking || !selectedTableId) {
      toast.error('Please select a table');
      return;
    }
    
    const bookingId = selectedBooking._id || selectedBooking.id;
    setActionLoading(bookingId);
    
    try {
      const result = await apiClient.markSeated(bookingId, selectedTableId);
      if (result.error) {
        toast.error(result.error.message);
      } else {
        toast.success('Customer seated!');
        setShowTableModal(false);
        setSelectedBooking(null);
        setSelectedTableId('');
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
      {/* Custom Party Popup Modal */}
      {showCustomPartyPopup && customPartyBooking && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] animate-in fade-in duration-200">
          <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 animate-in zoom-in-95 duration-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amber-800 mb-2">
                🚨 Custom Party Alert!
              </h3>
              <p className="text-amber-700 mb-6">
                A large party needs personal assistance
              </p>
              
              <div className="bg-white rounded-xl p-4 mb-6 text-left space-y-3">
                <div className="flex justify-between">
                  <span className="text-amber-700 font-medium">Customer:</span>
                  <span className="font-bold text-amber-900">{customPartyBooking.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-700 font-medium">Party Size:</span>
                  <span className="font-bold text-amber-900">{customPartyBooking.partySize} people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-700 font-medium">Phone:</span>
                  <span className="font-bold text-amber-900">{customPartyBooking.customerPhone}</span>
                </div>
              </div>
              
              <div className="bg-amber-100 rounded-lg p-3 mb-6">
                <p className="text-sm text-amber-800">
                  <strong>Action Required:</strong> Please send a staff member to assist this customer at the kiosk area.
                </p>
              </div>
              
              <Button 
                className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-lg"
                onClick={() => {
                  setShowCustomPartyPopup(false);
                  setCustomPartyBooking(null);
                }}
              >
                Got it, I'll assist them
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Table Selection Modal */}
      {showTableModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-panel border border-border rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-2">Select Table</h3>
            <p className="text-muted mb-4">
              Assign a table for <span className="font-medium text-ink">{selectedBooking.customerName}</span> (Party of {selectedBooking.partySize})
            </p>
            
            {(() => {
              const availableTables = getAvailableTables(selectedBooking.partySize);
              
              if (availableTables.length === 0) {
                return (
                  <div className="text-center py-6">
                    <TableIcon className="h-12 w-12 text-muted mx-auto mb-3" />
                    <p className="text-muted">No available tables for party of {selectedBooking.partySize}</p>
                    <p className="text-sm text-muted mt-1">Please wait for a table to become available</p>
                  </div>
                );
              }
              
              return (
                <div className="space-y-3">
                  <label className="text-sm font-medium">Available Tables (Capacity ≥ {selectedBooking.partySize})</label>
                  <select
                    value={selectedTableId}
                    onChange={(e) => setSelectedTableId(e.target.value)}
                    className="w-full h-12 px-4 rounded-lg border border-border bg-panel text-ink focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">-- Select a table --</option>
                    {availableTables.map(table => (
                      <option key={table._id} value={table._id}>
                        Table {table.tableNumber} (Seats {table.capacity})
                      </option>
                    ))}
                  </select>
                </div>
              );
            })()}
            
            <div className="flex gap-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setShowTableModal(false);
                  setSelectedBooking(null);
                  setSelectedTableId('');
                }}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-success hover:bg-success/90 text-white"
                onClick={handleMarkSeated}
                disabled={!selectedTableId || actionLoading === (selectedBooking._id || selectedBooking.id)}
              >
                {actionLoading === (selectedBooking._id || selectedBooking.id) ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                Confirm Seating
              </Button>
            </div>
          </div>
        </div>
      )}

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
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{booking.customerName}</h3>
                          {booking.isCustomParty && (
                            <Badge className="bg-amber-100 text-amber-800 border-amber-300 text-xs">
                              Custom Party
                            </Badge>
                          )}
                        </div>
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
                          onClick={() => openTableSelector(booking)}
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
