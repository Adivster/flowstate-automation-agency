
import React, { ReactNode, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GlassMorphismProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  onClick?: () => void;
  variant?: 'default' | 'accent' | 'muted';
  hoverEffect?: boolean;
}

export const GlassMorphism: React.FC<GlassMorphismProps> = ({
  children,
  className,
  intensity = 'medium',
  onClick,
  variant = 'default',
  hoverEffect = false,
}) => {
  const intensityClasses = {
    low: 'bg-white/5 backdrop-blur-sm border border-white/10',
    medium: 'bg-white/10 backdrop-blur-md border border-white/20',
    high: 'bg-white/20 backdrop-blur-lg border border-white/30',
  };
  
  const variantClasses = {
    default: 'shadow-sm',
    accent: 'shadow-md border-flow-accent/30',
    muted: 'shadow-none opacity-80',
  };
  
  const hoverClasses = hoverEffect 
    ? 'transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:shadow-lg' 
    : 'transition-all duration-300';

  return (
    <div
      className={cn(
        'glass',
        intensityClasses[intensity],
        variantClasses[variant],
        hoverClasses,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassMorphism;
