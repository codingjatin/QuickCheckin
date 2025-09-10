'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWaitlistStore } from '@/lib/store';
import { Table as TableType, Customer } from '@/lib/types';
import {
  Table as TableIcon,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Utensils,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function TablesPage() {
  const { tables, customers, updateTable, releaseTable, markSeated } = useWaitlistStore();

  const getTableStatusColor = (status: TableType['status']) => {
    switch (status) {
      case 'available':
        return 'bg-success/10 text-success border border-success/30';
      case 'holding':
        return 'bg-info/10 text-info border border-info/30';
      case 'occupied':
        return 'bg-secondary/10 text-secondary-600 border border-secondary-600/30';
      case 'cleaning':
        return 'bg-ink/10 text-ink border border-ink/20';
      default:
        return 'bg-ink/10 text-ink border border-ink/20';
    }
  };

  const getStatusIcon = (status: TableType['status']) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-4 w-4" />;
      case 'holding':
        return <Clock className="h-4 w-4" />;
      case 'occupied':
        return <Users className="h-4 w-4" />;
      case 'cleaning':
        return <Utensils className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getCustomerForTable = (tableId: string): Customer | undefined => {
    const table = tables.find((t) => t.id === tableId);
    if (!table?.customerId) return undefined;
    return customers.find((c) => c.id === table.customerId);
  };

  const handleReleaseTable = (tableId: string) => {
    releaseTable(tableId);
  };

  const handleMarkCleaned = (tableId: string) => {
    updateTable(tableId, { status: 'available' });
  };

  return (
    <div className="space-y-8 text-ink">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Table Management</h1>
        <p className="text-muted">Monitor and manage your restaurant&apos;s seating capacity</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-panel border border-border shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <p className="text-2xl font-bold">
                  {tables.filter((t) => t.status === 'available').length}
                </p>
                <p className="text-xs text-muted">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-panel border border-border shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-info" />
              <div>
                <p className="text-2xl font-bold">
                  {tables.filter((t) => t.status === 'holding').length}
                </p>
                <p className="text-xs text-muted">Holding</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-panel border border-border shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-secondary-600" />
              <div>
                <p className="text-2xl font-bold">
                  {tables.filter((t) => t.status === 'occupied').length}
                </p>
                <p className="text-xs text-muted">Occupied</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-panel border border-border shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Utensils className="h-5 w-5 text-ink/70" />
              <div>
                <p className="text-2xl font-bold">
                  {tables.filter((t) => t.status === 'cleaning').length}
                </p>
                <p className="text-xs text-muted">Cleaning</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tables.map((table) => {
          const customer = getCustomerForTable(table.id);

          return (
            <Card key={table.id} className="overflow-hidden bg-panel border border-border shadow-soft">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TableIcon className="h-5 w-5 text-ink/70" />
                    <CardTitle className="text-lg">Table {table.number}</CardTitle>
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
                {customer && (
                  <div className="mb-4 p-3 bg-off rounded-lg ring-1 ring-border">
                    <p className="font-medium text-sm">{customer.name}</p>
                    <p className="text-xs text-muted">Party of {customer.partySize}</p>
                    {table.holdStartTime && (
                      <p className="text-xs text-info mt-1">
                        Holding for {formatDistanceToNow(table.holdStartTime, { addSuffix: true })}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  {table.status === 'available' && (
                    <Button size="sm" variant="outline" className="w-full border-border text-ink hover:bg-off" disabled>
                      Ready for Guests
                    </Button>
                  )}

                  {table.status === 'holding' && customer && (
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        onClick={() => markSeated(customer.id)}
                        className="w-full bg-success hover:bg-success/90 text-white"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark Seated
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReleaseTable(table.id)}
                        className="w-full border-border text-ink hover:bg-off"
                      >
                        Release Table
                      </Button>
                    </div>
                  )}

                  {table.status === 'occupied' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateTable(table.id, { status: 'cleaning' })}
                      className="w-full border-border text-ink hover:bg-off"
                    >
                      Mark for Cleaning
                    </Button>
                  )}

                  {table.status === 'cleaning' && (
                    <Button
                      size="sm"
                      onClick={() => handleMarkCleaned(table.id)}
                      className="w-full bg-primary hover:bg-primary-600 text-white"
                    >
                      Mark Clean
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
