
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
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
      // Cyberpunk theme variants (dark mode)
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
        case 'nature':
          return 'bg-emerald-600/10 border-emerald-400/30';
        case 'sunlit':
          return 'bg-amber-500/10 border-amber-400/30';
        case 'sky':
          return 'bg-sky-500/10 border-sky-400/30';
        default:
          return 'bg-black/30 border-flow-border/30';
      }
    } else {
      // Solarpunk light theme variants
      switch (variant) {
        case 'accent':
          return 'bg-amber-50/80 border-emerald-200 text-emerald-900';
        case 'dark':
          return 'bg-emerald-900/10 border-emerald-900/20 text-emerald-900';
        case 'light':
          return 'bg-white/70 border-amber-100/50 text-gray-800';
        case 'success':
          return 'bg-green-50/80 border-green-300 text-green-800';
        case 'warning':
          return 'bg-amber-50/80 border-amber-300 text-amber-800';
        case 'error':
          return 'bg-red-50/80 border-red-300 text-red-800';
        case 'nature':
          return 'bg-emerald-50/70 border-emerald-300/80 text-emerald-800';
        case 'sunlit':
          return 'bg-amber-50/80 border-amber-200 text-amber-800';
        case 'sky':
          return 'bg-sky-50/70 border-sky-300/60 text-sky-800';
        default:
          return 'bg-white/70 border-emerald-100 text-gray-800';
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
    
    // Subtle light source on cyberpunk glass elements
    return {
      backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      boxShadow: `0 4px 20px -5px rgba(0, 0, 0, 0.4), inset 0 0 4px rgba(255, 255, 255, 0.05)`,
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

// For backwards compatibility, add default export
export default GlassMorphism;
