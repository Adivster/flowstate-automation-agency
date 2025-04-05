
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TransitionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const TransitionWrapper: React.FC<TransitionWrapperProps> = ({
  children,
  className,
  delay = 0,
}) => {
  return (
    <div
      className={cn('animate-fade-in will-change-transform', className)}
      style={{ 
        animationDelay: `${delay}ms`, 
        animationFillMode: 'forwards',
        animationDuration: '400ms'
      }}
    >
      {children}
    </div>
  );
};

export default TransitionWrapper;
