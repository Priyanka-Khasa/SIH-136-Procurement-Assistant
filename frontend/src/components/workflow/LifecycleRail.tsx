import { Check, Circle, LockKeyhole, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';

export const lifecycleStages = [
  'Draft',
  'Published',
  'Applications Open',
  'Evaluating',
  'Shortlisted',
  'Agreement Drafted',
  'Agreement Approved',
  'Pilot Running',
  'Evidence Submitted',
  'Validated',
  'Accepted',
  'Invoice Approved',
  'Payment Initiated',
  'Payment Confirmed',
  'Scale-up Review',
  'Decision Recorded',
] as const;

export type RailStageState = 'completed' | 'current' | 'blocked' | 'stale' | 'upcoming';

type LifecycleRailProps = {
  currentStage: string;
  blockedStage?: string;
  staleStages?: string[];
};

export function LifecycleRail({ currentStage, blockedStage, staleStages = [] }: LifecycleRailProps) {
  const currentIndex = lifecycleStages.indexOf(currentStage as (typeof lifecycleStages)[number]);

  return (
    <div className="overflow-x-auto pb-2" aria-label="Pilot lifecycle progress">
      <ol className="flex min-w-[1100px] items-start">
        {lifecycleStages.map((stage, index) => {
          const isCurrent = stage === currentStage;
          const isBlocked = stage === blockedStage;
          const isStale = staleStages.includes(stage);
          const isComplete = index < currentIndex && !isStale;
          const state: RailStageState = isStale ? 'stale' : isBlocked ? 'blocked' : isCurrent ? 'current' : isComplete ? 'completed' : 'upcoming';
          const Icon = state === 'completed' ? Check : state === 'blocked' ? LockKeyhole : state === 'stale' ? RotateCcw : Circle;

          return (
            <li key={stage} className="relative flex w-[150px] shrink-0 flex-col items-center px-2 text-center">
              {index < lifecycleStages.length - 1 && (
                <span className={cn('absolute left-1/2 top-4 h-px w-full', isComplete ? 'bg-teal' : 'bg-border')} aria-hidden="true" />
              )}
              <span
                className={cn(
                  'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border',
                  state === 'completed' && 'border-teal bg-teal/15 text-teal',
                  state === 'current' && 'border-saffron bg-saffron text-slate-950 ring-4 ring-saffron/15',
                  state === 'blocked' && 'border-rose bg-rose/15 text-rose',
                  state === 'stale' && 'border-amber bg-amber/15 text-amber',
                  state === 'upcoming' && 'border-border bg-raised text-muted',
                )}
                title={state}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className={cn('mt-2 text-xs font-medium', state === 'current' ? 'text-text' : 'text-muted')}>{stage}</span>
              <span className="mt-1 text-[10px] uppercase tracking-wider text-muted">{state}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
