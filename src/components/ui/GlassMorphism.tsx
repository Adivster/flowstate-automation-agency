
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassMorphismProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export const GlassMorphism: React.FC<GlassMorphismProps> = ({
  children,
  className,
  intensity = 'medium',
}) => {
  const intensityClasses = {
    low: 'bg-white/5 backdrop-blur-sm border border-white/10',
    medium: 'bg-white/10 backdrop-blur-md border border-white/20',
    high: 'bg-white/20 backdrop-blur-lg border border-white/30',
  };

  return (
    <div
      className={cn(
        'glass transition-all duration-300',
        intensityClasses[intensity],
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassMorphism;
