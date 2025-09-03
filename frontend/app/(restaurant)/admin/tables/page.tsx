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
  Utensils
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function TablesPage() {
  const { 
    tables, 
    customers, 
    updateTable, 
    releaseTable, 
    markSeated 
  } = useWaitlistStore();

  const getTableStatusColor = (status: TableType['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'holding':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'occupied':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cleaning':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
    const table = tables.find(t => t.id === tableId);
    if (!table?.customerId) return undefined;
    return customers.find(c => c.id === table.customerId);
  };

  const handleReleaseTable = (tableId: string) => {
    releaseTable(tableId);
  };

  const handleMarkCleaned = (tableId: string) => {
    updateTable(tableId, { status: 'available' });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Table Management</h1>
        <p className="text-gray-600">Monitor and manage your restaurant's seating capacity</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{tables.filter(t => t.status === 'available').length}</p>
                <p className="text-xs text-muted-foreground">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{tables.filter(t => t.status === 'holding').length}</p>
                <p className="text-xs text-muted-foreground">Holding</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{tables.filter(t => t.status === 'occupied').length}</p>
                <p className="text-xs text-muted-foreground">Occupied</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Utensils className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-2xl font-bold">{tables.filter(t => t.status === 'cleaning').length}</p>
                <p className="text-xs text-muted-foreground">Cleaning</p>
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
            <Card key={table.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TableIcon className="h-5 w-5 text-gray-600" />
                    <CardTitle className="text-lg">Table {table.number}</CardTitle>
                  </div>
                  <Badge className={getStatusColor(table.status)}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(table.status)}
                      <span className="capitalize">{table.status}</span>
                    </div>
                  </Badge>
                </div>
                <CardDescription>
                  Seats up to {table.capacity} people
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                {customer && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-sm">{customer.name}</p>
                    <p className="text-xs text-gray-500">
                      Party of {customer.partySize}
                    </p>
                    {table.holdStartTime && (
                      <p className="text-xs text-blue-600 mt-1">
                        Holding for {formatDistanceToNow(table.holdStartTime, { addSuffix: true })}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  {table.status === 'available' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      disabled
                    >
                      Ready for Guests
                    </Button>
                  )}
                  
                  {table.status === 'holding' && customer && (
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        onClick={() => handleMarkSeated(customer.id)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark Seated
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReleaseTable(table.id)}
                        className="w-full"
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
                      className="w-full"
                    >
                      Mark for Cleaning
                    </Button>
                  )}
                  
                  {table.status === 'cleaning' && (
                    <Button
                      size="sm"
                      onClick={() => handleMarkCleaned(table.id)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700"
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