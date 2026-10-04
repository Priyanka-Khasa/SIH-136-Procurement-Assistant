import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

const variantStyles = {
  default: 'border border-border bg-surface text-text',
  success: 'border-transparent bg-teal/20 text-teal',
  warning: 'border-transparent bg-amber/20 text-amber',
  error: 'border-transparent bg-rose/20 text-rose',
  info: 'border-transparent bg-violet/20 text-violet',
};

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:ring-offset-2',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
