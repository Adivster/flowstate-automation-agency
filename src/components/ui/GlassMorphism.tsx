
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

type GlassMorphismProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'accent' | 'dark' | 'light' | 'success' | 'warning' | 'error';
  intensity?: 'low' | 'medium' | 'high';
  blur?: boolean;
  borderOpacity?: number;
  hoverEffect?: boolean;
  style?: React.CSSProperties; // Added style prop support
};

export const GlassMorphism: React.FC<GlassMorphismProps> = ({
  children,
  className,
  variant = 'default',
  intensity = 'medium',
  blur = true,
  borderOpacity = 0.2,
  hoverEffect = false,
  style, // Added style prop
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const getBackgroundVariant = () => {
    if (isDark) {
      switch (variant) {
        case 'accent':
          return 'bg-flow-accent/10 border-flow-accent/30';
        case 'dark':
          return 'bg-black/40 border-white/10';
        case 'light':
          return 'bg-white/10 border-white/20';
        case 'success':
          return 'bg-green-500/10 border-green-500/30';
        case 'warning':
          return 'bg-amber-500/10 border-amber-500/30';
        case 'error':
          return 'bg-red-500/10 border-red-500/30';
        default:
          return 'bg-black/30 border-flow-border/30';
      }
    } else {
      // Solarpunk light theme variants
      switch (variant) {
        case 'accent':
          return 'bg-amber-50/80 border-emerald-200';
        case 'dark':
          return 'bg-emerald-900/10 border-emerald-900/20';
        case 'light':
          return 'bg-white/70 border-amber-100/50';
        case 'success':
          return 'bg-green-50/80 border-green-300';
        case 'warning':
          return 'bg-amber-50/80 border-amber-300';
        case 'error':
          return 'bg-red-50/80 border-red-300';
        default:
          return 'bg-white/70 border-emerald-100';
      }
    }
  };
  
  const getIntensity = () => {
    if (isDark) {
      switch (intensity) {
        case 'low':
          return 'backdrop-blur-sm';
        case 'high':
          return 'backdrop-blur-xl';
        default:
          return 'backdrop-blur-md';
      }
    } else {
      // Light theme might need less intense blur
      switch (intensity) {
        case 'low':
          return 'backdrop-blur-sm';
        case 'high':
          return 'backdrop-blur-lg';
        default:
          return 'backdrop-blur-md';
      }
    }
  };
  
  const getHoverEffect = () => {
    if (!hoverEffect) return '';
    
    if (isDark) {
      return 'transition-all duration-300 hover:bg-opacity-40 hover:border-opacity-50 hover:shadow-lg';
    } else {
      return 'transition-all duration-300 hover:bg-opacity-90 hover:border-opacity-60 hover:shadow-md';
    }
  };
  
  return (
    <div
      className={cn(
        'rounded-lg border',
        getBackgroundVariant(),
        blur ? getIntensity() : '',
        getHoverEffect(),
        className
      )}
      style={style} // Apply the style prop
    >
      {children}
    </div>
  );
};

