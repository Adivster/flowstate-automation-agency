
import React from 'react';
import { cn } from '@/lib/utils';

interface InfoChipProps {
  label: string;
  className?: string;
  variant?: 'default' | 'subtle' | 'outline' | 'accent';
}

export const InfoChip: React.FC<InfoChipProps> = ({
  label,
  className,
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'bg-flow-muted text-flow-muted-foreground',
    subtle: 'bg-flow-muted/50 text-flow-muted-foreground',
    outline: 'border border-flow-border bg-transparent text-flow-foreground',
    accent: 'bg-flow-accent text-flow-accent-foreground',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full transition-colors',
        variantClasses[variant],
        className
      )}
    >
      {label}
    </span>
  );
};

export default InfoChip;
