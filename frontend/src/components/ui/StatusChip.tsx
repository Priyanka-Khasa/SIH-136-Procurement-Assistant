import React from 'react';
import { cn } from '../../lib/utils';

type Status = 'Verified' | 'Pending' | 'Disputed' | 'Needs Verification' | 'AI-Drafted' | 'Simulated';

export interface StatusChipProps extends React.HTMLAttributes<HTMLDivElement> {
  status: Status;
}

const statusStyles: Record<Status, string> = {
  Verified: 'bg-teal/10 text-teal border-teal/20',
  Pending: 'bg-amber/10 text-amber border-amber/20',
  Disputed: 'bg-rose/10 text-rose border-rose/20',
  'Needs Verification': 'bg-saffron/10 text-saffron border-saffron/20',
  'AI-Drafted': 'bg-violet/10 text-violet border-violet/20',
  Simulated: 'bg-muted/10 text-muted border-muted/20',
};

const dotColors: Record<Status, string> = {
  Verified: 'bg-teal',
  Pending: 'bg-amber animate-pulse',
  Disputed: 'bg-rose animate-pulse',
  'Needs Verification': 'bg-saffron animate-pulse',
  'AI-Drafted': 'bg-violet',
  Simulated: 'bg-muted',
};

export const StatusChip: React.FC<StatusChipProps> = ({ status, className, ...props }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        statusStyles[status],
        className
      )}
      {...props}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', dotColors[status])} />
      {status}
    </div>
  );
};
