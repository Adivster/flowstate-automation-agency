
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
        case 'yellow': return 'border-amber-500 hover:border-amber-600 bg-gradient-to-br from-amber-50/90 to-white/90';
        case 'green': return 'border-emerald-500 hover:border-emerald-600 bg-gradient-to-br from-emerald-50/90 to-white/90';
        case 'orange': return 'border-orange-500 hover:border-orange-600 bg-gradient-to-br from-orange-50/90 to-white/90';
        case 'coral': return 'border-red-500 hover:border-red-600 bg-gradient-to-br from-red-50/90 to-white/90';
        case 'aqua': return 'border-cyan-500 hover:border-cyan-600 bg-gradient-to-br from-cyan-50/90 to-white/90';
        case 'gold': return 'border-yellow-500 hover:border-yellow-600 bg-gradient-to-br from-yellow-50/90 to-white/90';
        case 'blue': return 'border-blue-500 hover:border-blue-600 bg-gradient-to-br from-blue-50/90 to-white/90';
        case 'lavender': return 'border-purple-500 hover:border-purple-600 bg-gradient-to-br from-purple-50/90 to-white/90';
        default: return 'border-emerald-500 hover:border-emerald-600 bg-gradient-to-br from-emerald-50/90 to-white/90';
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
        isDark ? 'bg-flow-background/20 backdrop-blur-md text-flow-foreground' : 'backdrop-blur-sm text-gray-800',
        className
      )}
      {...motionProps}
    >
      {children}
    </Component>
  );
};

export default SolarpunkPanel;
