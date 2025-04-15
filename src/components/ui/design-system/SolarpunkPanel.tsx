
import React from 'react';
import { cn } from '@/lib/utils';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

interface SolarpunkPanelProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: 'default' | 'yellow' | 'green' | 'orange' | 'coral' | 'aqua' | 'gold' | 'blue' | 'lavender';
  interactive?: boolean;
  elevated?: boolean;
  noBorder?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

export const SolarpunkPanel: React.FC<SolarpunkPanelProps> = ({
  children,
  className,
  accentColor = 'default',
  interactive = false,
  elevated = false,
  noBorder = false,
  fullWidth = false,
  onClick,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Get accent color styles based on the theme and accent color prop
  const getAccentColorStyles = () => {
    if (isDark) {
      // Cyberpunk theme accent styles
      switch (accentColor) {
        case 'yellow': return 'border-blue-500/50 hover:border-blue-500/70';
        case 'green': return 'border-purple-500/50 hover:border-purple-500/70';
        case 'orange': return 'border-lime-500/50 hover:border-lime-500/70';
        case 'coral': return 'border-red-500/50 hover:border-red-500/70';
        case 'aqua': return 'border-teal-500/50 hover:border-teal-500/70';
        case 'gold': return 'border-amber-500/50 hover:border-amber-500/70';
        case 'blue': return 'border-blue-500/50 hover:border-blue-500/70';
        case 'lavender': return 'border-orange-500/50 hover:border-orange-500/70';
        default: return 'border-flow-accent/50 hover:border-flow-accent/70';
      }
    } else {
      // Solarpunk theme accent styles - improved contrast
      switch (accentColor) {
        case 'yellow': return 'border-amber-400 hover:border-amber-500 bg-gradient-to-br from-amber-50/70 to-white/90';
        case 'green': return 'border-emerald-400 hover:border-emerald-500 bg-gradient-to-br from-emerald-50/70 to-white/90';
        case 'orange': return 'border-orange-400 hover:border-orange-500 bg-gradient-to-br from-orange-50/70 to-white/90';
        case 'coral': return 'border-red-400 hover:border-red-500 bg-gradient-to-br from-red-50/70 to-white/90';
        case 'aqua': return 'border-cyan-400 hover:border-cyan-500 bg-gradient-to-br from-cyan-50/70 to-white/90';
        case 'gold': return 'border-yellow-400 hover:border-yellow-500 bg-gradient-to-br from-yellow-50/70 to-white/90';
        case 'blue': return 'border-blue-400 hover:border-blue-500 bg-gradient-to-br from-blue-50/70 to-white/90';
        case 'lavender': return 'border-purple-400 hover:border-purple-500 bg-gradient-to-br from-purple-50/70 to-white/90';
        default: return 'border-emerald-400 hover:border-emerald-500 bg-gradient-to-br from-emerald-50/70 to-white/90';
      }
    }
  };

  // Get shadow styles based on theme and elevation
  const getShadowStyles = () => {
    if (isDark) {
      return elevated 
        ? 'shadow-xl shadow-black/40' 
        : 'shadow-md shadow-black/20';
    } else {
      return elevated 
        ? 'shadow-xl shadow-black/10' 
        : 'shadow-md shadow-black/5';
    }
  };

  // Get light mode background
  const getLightModeBackground = () => {
    if (!isDark) {
      switch (accentColor) {
        case 'yellow': return 'bg-amber-50/70';
        case 'green': return 'bg-emerald-50/70';
        case 'orange': return 'bg-orange-50/70';
        case 'coral': return 'bg-red-50/70';
        case 'aqua': return 'bg-cyan-50/70';
        case 'gold': return 'bg-yellow-50/70';
        case 'blue': return 'bg-blue-50/70';
        case 'lavender': return 'bg-purple-50/70';
        default: return 'bg-emerald-50/70';
      }
    }
    return '';
  };

  // Determine the panel component based on interactivity
  const Component = interactive ? motion.div : 'div';

  // Motion animation props for interactive panels
  const motionProps = interactive ? {
    whileHover: { 
      scale: 1.03, 
      transition: { duration: 0.3, ease: "easeOut" } 
    },
    transition: { 
      duration: 0.3 
    }
  } : {};

  return (
    <Component
      onClick={onClick}
      className={cn(
        'rounded-xl overflow-hidden',
        !noBorder && 'border-2',
        fullWidth ? 'w-full' : '',
        getAccentColorStyles(),
        getShadowStyles(),
        getLightModeBackground(),
        interactive && 'cursor-pointer transition-all duration-300',
        isDark ? 'bg-flow-background/20 backdrop-blur-md' : 'backdrop-blur-sm',
        className
      )}
      {...motionProps}
    >
      {children}
    </Component>
  );
};

export default SolarpunkPanel;
