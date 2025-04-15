
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
      // Solarpunk theme accent styles
      switch (accentColor) {
        case 'yellow': return 'border-amber-300 hover:border-amber-400 bg-gradient-to-br from-amber-50/70 to-white/90';
        case 'green': return 'border-emerald-300 hover:border-emerald-400 bg-gradient-to-br from-emerald-50/70 to-white/90';
        case 'orange': return 'border-orange-300 hover:border-orange-400 bg-gradient-to-br from-orange-50/70 to-white/90';
        case 'coral': return 'border-red-300 hover:border-red-400 bg-gradient-to-br from-red-50/70 to-white/90';
        case 'aqua': return 'border-cyan-300 hover:border-cyan-400 bg-gradient-to-br from-cyan-50/70 to-white/90';
        case 'gold': return 'border-yellow-300 hover:border-yellow-400 bg-gradient-to-br from-yellow-50/70 to-white/90';
        case 'blue': return 'border-blue-300 hover:border-blue-400 bg-gradient-to-br from-blue-50/70 to-white/90';
        case 'lavender': return 'border-purple-300 hover:border-purple-400 bg-gradient-to-br from-purple-50/70 to-white/90';
        default: return 'border-emerald-300 hover:border-emerald-400 bg-gradient-to-br from-emerald-50/70 to-white/90';
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
