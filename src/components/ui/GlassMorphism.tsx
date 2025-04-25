import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/theme-provider';
import { motion } from 'framer-motion';

type GlassMorphismProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'accent' | 'dark' | 'light' | 'success' | 'warning' | 'error' | 'nature' | 'sunlit' | 'sky';
  intensity?: 'low' | 'medium' | 'high';
  blur?: boolean;
  borderOpacity?: number;
  hoverEffect?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  animate?: boolean;
};

export const GlassMorphism: React.FC<GlassMorphismProps> = ({
  children,
  className,
  variant = 'default',
  intensity = 'medium',
  blur = true,
  borderOpacity = 0.2,
  hoverEffect = false,
  style,
  onClick,
  animate = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const getBackgroundVariant = () => {
    if (isDark) {
      switch (variant) {
        case 'accent':
          return 'bg-gradient-to-br from-black/90 to-flow-accent/20 border-flow-accent/30';
        case 'dark':
          return 'bg-gradient-to-br from-black/95 to-gray-900/50 border-white/10';
        case 'light':
          return 'bg-gradient-to-br from-black/80 to-white/5 border-white/20';
        case 'success':
          return 'bg-gradient-to-br from-black/90 to-green-950/30 border-green-500/30';
        case 'warning':
          return 'bg-gradient-to-br from-black/90 to-amber-950/30 border-amber-500/30';
        case 'error':
          return 'bg-gradient-to-br from-black/90 to-red-950/30 border-red-500/30';
        case 'nature':
          return 'bg-gradient-to-br from-black/90 to-emerald-950/30 border-emerald-400/30';
        case 'sunlit':
          return 'bg-gradient-to-br from-black/90 to-amber-950/30 border-amber-400/30';
        case 'sky':
          return 'bg-gradient-to-br from-black/90 to-sky-950/30 border-sky-400/30';
        default:
          return 'bg-gradient-to-br from-black/90 to-gray-900/30 border-flow-border/30';
      }
    } else {
      switch (variant) {
        case 'accent':
          return 'bg-amber-50/90 border-emerald-300 text-emerald-900';
        case 'dark':
          return 'bg-emerald-900/10 border-emerald-900/30 text-emerald-900';
        case 'light':
          return 'bg-white/90 border-amber-200 text-gray-800';
        case 'success':
          return 'bg-green-50/90 border-green-400 text-green-800';
        case 'warning':
          return 'bg-amber-50/90 border-amber-400 text-amber-800';
        case 'error':
          return 'bg-red-50/90 border-red-400 text-red-800';
        case 'nature':
          return 'bg-emerald-50/90 border-emerald-400 text-emerald-800';
        case 'sunlit':
          return 'bg-amber-50/90 border-amber-300 text-amber-800';
        case 'sky':
          return 'bg-sky-50/90 border-sky-400 text-sky-800';
        default:
          return 'bg-white/90 border-emerald-200 text-gray-800';
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
      return 'transition-all duration-300 hover:bg-opacity-40 hover:border-opacity-60 hover:shadow-lg hover:shadow-flow-accent/10';
    } else {
      return 'transition-all duration-300 hover:bg-opacity-90 hover:border-opacity-70 hover:shadow-md hover:shadow-emerald-300/20';
    }
  };

  const getGlowEffect = () => {
    if (!isDark) return {};
    
    return {
      boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5), 
                  inset 0 0 32px rgba(255, 255, 255, 0.05), 
                  0 0 2px rgba(255, 255, 255, 0.1)`,
      backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
    };
  };
  
  const Component = animate ? motion.div : 'div';
  
  return (
    <Component
      className={cn(
        'rounded-lg border',
        getBackgroundVariant(),
        blur ? getIntensity() : '',
        getHoverEffect(),
        'transition-all duration-300',
        className
      )}
      style={{
        ...getGlowEffect(),
        ...style
      }}
      onClick={onClick}
      {...(animate ? {
        initial: { opacity: 0, y: 5 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 }
      } : {})}
    >
      {children}
    </Component>
  );
};

export default GlassMorphism;
