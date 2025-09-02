import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from './ui/Toast';
import { useToast } from '../hooks/useToast';

export const Layout: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="min-h-screen bg-background">
      <Outlet />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};