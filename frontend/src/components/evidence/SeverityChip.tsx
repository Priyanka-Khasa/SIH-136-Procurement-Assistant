import React from 'react';
import { cn } from '../../lib/utils';
import type { Severity } from '../../types/evidence';

interface SeverityChipProps {
  severity: Severity;
  className?: string;
}

const config: Record<Severity, { label: string; classes: string }> = {
  critical: { label: 'Critical', classes: 'bg-red-100 text-red-800 border-red-200' },
  major:    { label: 'Major',    classes: 'bg-amber-100 text-amber-800 border-amber-200' },
  minor:    { label: 'Minor',    classes: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  info:     { label: 'Info',     classes: 'bg-blue-100 text-blue-600 border-blue-200' },
};

export const SeverityChip: React.FC<SeverityChipProps> = ({ severity, className }) => {
  const { label, classes } = config[severity];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
        classes,
        className
      )}
    >
      {label}
    </span>
  );
};
