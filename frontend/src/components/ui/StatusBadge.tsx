import React from 'react';
import { Customer } from '../../lib/types';
import { cn } from '../../lib/utils';

interface StatusBadgeProps {
  status: Customer['status'];
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const statusConfig = {
    waiting: {
      label: 'Waiting',
      className: 'bg-warning/15 text-warning border-warning/25 shadow-sm',
    },
    notified: {
      label: 'Notified',
      className: 'bg-accent/15 text-accent border-accent/25 shadow-sm',
    },
    seated: {
      label: 'Seated',
      className: 'bg-success/15 text-success border-success/25 shadow-sm',
    },
    cancelled: {
      label: 'Cancelled',
      className: 'bg-error/15 text-error border-error/25 shadow-sm',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};