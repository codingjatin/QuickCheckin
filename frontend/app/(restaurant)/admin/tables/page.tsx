'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/lib/auth-store';
import { apiClient, Table } from '@/lib/api-client';
import { toast } from 'sonner';
import {
  Table as TableIcon,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Utensils,
  Loader2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

export default function TablesPage() {
  const { restaurantData } = useAuthStore();
  const restaurantId = restaurantData?.id;

  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updatingTableId, setUpdatingTableId] = useState<string | null>(null);

  // Fetch tables from backend
  const fetchTables = useCallback(async () => {
    if (!restaurantId) return;
    
    try {
      const result = await apiClient.getSettings(restaurantId);
      if (result.data?.tables) {
        setTables(result.data.tables);
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
      toast.error('Failed to load tables');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    fetchTables();
    // Poll every 15 seconds for real-time updates
    const interval = setInterval(fetchTables, 15000);
    return () => clearInterval(interval);
  }, [fetchTables]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchTables();
  };

  const handleUpdateStatus = async (tableId: string, status: 'available' | 'cleaning' | 'occupied') => {
    setUpdatingTableId(tableId);
    try {
      const result = await apiClient.updateTableStatus(tableId, status);
      if (result.data) {
        toast.success(result.data.message);
        // Update local state
        setTables(prev => prev.map(t => 
          t._id === tableId ? { ...t, status } : t
        ));
      } else if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      toast.error('Failed to update table status');
    } finally {
      setUpdatingTableId(null);
    }
  };

  const getTableStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-success/10 text-success border border-success/30';
      case 'reserved':
        return 'bg-info/10 text-info border border-info/30';
      case 'occupied':
        return 'bg-orange-500/10 text-orange-600 border border-orange-500/30';
      case 'cleaning':
        return 'bg-purple-500/10 text-purple-600 border border-purple-500/30';
      default:
        return 'bg-ink/10 text-ink border border-ink/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-4 w-4" />;
      case 'reserved':
        return <Clock className="h-4 w-4" />;
      case 'occupied':
        return <Users className="h-4 w-4" />;
      case 'cleaning':
        return <Sparkles className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const stats = {
    available: tables.filter(t => t.status === 'available').length,
    reserved: tables.filter(t => t.status === 'reserved').length,
    occupied: tables.filter(t => t.status === 'occupied').length,
    cleaning: tables.filter(t => t.status === 'cleaning').length,
  };

  return (
    <div className="space-y-8 text-ink">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Table Management</h1>
          <p className="text-muted">Monitor and manage your restaurant&apos;s seating capacity</p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          disabled={refreshing}
          className="border-border"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-panel border border-border shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <p className="text-2xl font-bold">{stats.available}</p>
                <p className="text-xs text-muted">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-panel border border-border shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{stats.occupied}</p>
                <p className="text-xs text-muted">Occupied</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-panel border border-border shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{stats.cleaning}</p>
                <p className="text-xs text-muted">Cleaning</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-panel border border-border shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-info" />
              <div>
                <p className="text-2xl font-bold">{stats.reserved}</p>
                <p className="text-xs text-muted">Reserved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Grid */}
      {tables.length === 0 ? (
        <Card className="bg-panel border border-border shadow-soft">
          <CardContent className="py-12 text-center">
            <TableIcon className="h-12 w-12 text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No tables configured</h3>
            <p className="text-muted mb-4">Go to Settings → Table Configuration to add tables</p>
            <Button 
              onClick={() => window.location.href = '/admin/settings'}
              className="bg-primary hover:bg-primary-600 text-white"
            >
              Configure Tables
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tables.filter(t => t.isActive).map((table) => (
            <Card key={table._id} className="overflow-hidden bg-panel border border-border shadow-soft">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TableIcon className="h-5 w-5 text-ink/70" />
                    <CardTitle className="text-lg">Table {table.tableNumber}</CardTitle>
                  </div>
                  <Badge className={`${getTableStatusColor(table.status)} rounded-md`}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(table.status)}
                      <span className="capitalize">{table.status}</span>
                    </div>
                  </Badge>
                </div>
                <CardDescription className="text-muted">
                  Seats up to {table.capacity} people
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-2">
                  {/* Available - Ready for guests */}
                  {table.status === 'available' && (
                    <div className="bg-success/10 rounded-lg p-3 text-center">
                      <CheckCircle className="h-6 w-6 text-success mx-auto mb-1" />
                      <p className="text-sm font-medium text-success">Ready for Guests</p>
                    </div>
                  )}

                  {/* Occupied - Show Mark for Cleaning button */}
                  {table.status === 'occupied' && (
                    <Button
                      size="sm"
                      onClick={() => handleUpdateStatus(table._id, 'cleaning')}
                      disabled={updatingTableId === table._id}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      {updatingTableId === table._id ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4 mr-2" />
                      )}
                      Mark for Cleaning
                    </Button>
                  )}

                  {/* Cleaning - Show Mark Available button */}
                  {table.status === 'cleaning' && (
                    <Button
                      size="sm"
                      onClick={() => handleUpdateStatus(table._id, 'available')}
                      disabled={updatingTableId === table._id}
                      className="w-full bg-success hover:bg-success/90 text-white"
                    >
                      {updatingTableId === table._id ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      Mark Available
                    </Button>
                  )}

                  {/* Reserved */}
                  {table.status === 'reserved' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-info text-info hover:bg-info/10"
                      disabled
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Reserved
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
