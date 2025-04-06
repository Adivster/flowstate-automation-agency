
import React from 'react';
import { cn } from '@/lib/utils';

export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'default';

interface StatusBadgeProps {
  status: StatusType;
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  pulsing?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status = 'default',
  text,
  className,
  size = 'md',
  pulsing = false,
}) => {
  const statusClasses = {
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800/30',
    error: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800/30',
    info: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400 border-sky-200 dark:border-sky-800/30',
    default: 'bg-slate-100 text-slate-800 dark:bg-slate-800/30 dark:text-slate-400 border-slate-200 dark:border-slate-700/30',
  };
  
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2.5 py-0.5',
    lg: 'text-sm px-3 py-1',
  };
  
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border',
        statusClasses[status],
        sizeClasses[size],
        pulsing && 'animate-pulse-subtle',
        className
      )}
    >
      {status !== 'default' && (
        <span 
          className={cn(
            'w-1.5 h-1.5 rounded-full mr-1.5',
            {
              'bg-emerald-500': status === 'success',
              'bg-amber-500': status === 'warning',
              'bg-rose-500': status === 'error',
              'bg-sky-500': status === 'info',
            }
          )}
        />
      )}
      {text}
    </span>
  );
};

export default StatusBadge;
