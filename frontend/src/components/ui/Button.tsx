import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-primary text-background hover:bg-primary/90 shadow-soft hover:shadow-medium active:scale-95',
    secondary: 'bg-accent text-primary hover:bg-accent/90 shadow-soft hover:shadow-medium active:scale-95',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-background active:scale-95',
    ghost: 'text-muted hover:bg-accent/20 active:scale-95',
  };

  const sizeClasses = {
    sm: 'px-4 py-2.5 text-sm',
    md: 'px-6 py-3.5 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed hover:shadow-soft',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};