import React from 'react';
import { Table as TableIcon } from 'lucide-react';
import { Table } from '../lib/types';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';

interface TableGridProps {
  tables: Table[];
  onTableSelect?: (tableId: string) => void;
  onReleaseTable?: (tableId: string) => void;
  selectable?: boolean;
}

export const TableGrid: React.FC<TableGridProps> = ({
  tables,
  onTableSelect,
  onReleaseTable,
  selectable = false,
}) => {
  const getTableStatusColor = (status: Table['status']) => {
    switch (status) {
      case 'available':
        return 'bg-success/10 border-success/20 text-success';
      case 'occupied':
        return 'bg-error/10 border-error/20 text-error';
      case 'reserved':
        return 'bg-warning/10 border-warning/20 text-warning';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-600';
    }
  };

  const getStatusLabel = (status: Table['status']) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'occupied':
        return 'Occupied';
      case 'reserved':
        return 'Reserved';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tables.map((table) => (
        <Card
          key={table.id}
          className={cn(
            'text-center transition-all duration-200',
            selectable && table.status === 'available' && 'hover:shadow-lg cursor-pointer hover:scale-105',
            selectable && table.status !== 'available' && 'opacity-50'
          )}
          onClick={() => selectable && table.status === 'available' && onTableSelect?.(table.id)}
        >
          <CardContent className="p-4">
            <div className={cn(
              'w-16 h-16 rounded-xl mx-auto mb-3 flex items-center justify-center border-2',
              getTableStatusColor(table.status)
            )}>
              <TableIcon className="h-8 w-8" />
            </div>
            <h3 className="font-semibold text-muted mb-1">Table {table.number}</h3>
            <p className="text-sm text-muted/70 mb-2">Seats {table.capacity}</p>
            <div className="mb-3">
              <span className={cn(
                'inline-block px-2 py-1 rounded-full text-xs font-medium',
                getTableStatusColor(table.status)
              )}>
                {getStatusLabel(table.status)}
              </span>
            </div>
            {table.status === 'occupied' && onReleaseTable && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onReleaseTable(table.id);
                }}
                className="w-full text-xs"
              >
                Release
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};