import React from 'react';
import { Clock, Users, Phone, MoreVertical, MessageSquare, UserCheck } from 'lucide-react';
import { Customer } from '../lib/types';
import { StatusBadge } from './ui/StatusBadge';
import { Button } from './ui/Button';
import { formatTime, formatWaitTime } from '../lib/utils';

interface WaitlistCardProps {
  customer: Customer;
  onNotify: (id: string) => void;
  onSeat: (id: string) => void;
  onCancel: (id: string) => void;
  position: number;
}

export const WaitlistCard: React.FC<WaitlistCardProps> = ({
  customer,
  onNotify,
  onSeat,
  onCancel,
  position,
}) => {
  const canNotify = customer.status === 'waiting';
  const canSeat = customer.status === 'notified';
  const isCompleted = customer.status === 'seated' || customer.status === 'cancelled';

  const getWaitTime = () => {
    const now = new Date();
    const checkInTime = new Date(customer.checkInTime);
    const waitedMinutes = Math.floor((now.getTime() - checkInTime.getTime()) / (1000 * 60));
    return waitedMinutes;
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100/50 hover:shadow-medium transition-all duration-300 group">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
            <span className="text-primary font-bold text-lg">#{position}</span>
          </div>
          <div>
            <h3 className="font-bold text-xl text-muted mb-1">{customer.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted/70">
              <Phone className="h-4 w-4" />
              <span className="font-medium">{customer.phone}</span>
            </div>
          </div>
        </div>
        <StatusBadge status={customer.status} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1 text-muted/70 mb-2">
            <Users className="h-4 w-4" />
            <span className="text-xs font-medium">Party Size</span>
          </div>
          <p className="text-2xl font-bold text-muted">{customer.partySize}</p>
        </div>
        <div className="bg-accent/10 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1 text-muted/70 mb-2">
            <Clock className="h-4 w-4" />
            <span className="text-xs font-medium">Estimated</span>
          </div>
          <p className="text-2xl font-bold text-accent">{formatWaitTime(customer.estimatedWait)}</p>
        </div>
        <div className="bg-primary/10 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1 text-muted/70 mb-2">
            <Clock className="h-4 w-4" />
            <span className="text-xs font-medium">Waited</span>
          </div>
          <p className="text-2xl font-bold text-primary">{getWaitTime()}m</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-muted/60 mb-6">
        <span>Check-in: {formatTime(customer.checkInTime)}</span>
        {customer.notifiedTime && (
          <span>Notified: {formatTime(customer.notifiedTime)}</span>
        )}
      </div>

      {!isCompleted && (
        <div className="flex gap-3">
          {canNotify && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onNotify(customer.id)}
              className="flex-1"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Notify Customer
            </Button>
          )}
          {canSeat && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onSeat(customer.id)}
              className="flex-1"
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Seat Now
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCancel(customer.id)}
            className="px-4 hover:bg-error/10 hover:text-error"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};