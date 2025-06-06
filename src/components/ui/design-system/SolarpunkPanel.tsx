
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/theme-provider';
import { motion, HTMLMotionProps } from 'framer-motion';

interface SolarpunkPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  accentColor?: 'default' | 'yellow' | 'green' | 'orange' | 'coral' | 'aqua' | 'gold' | 'blue' | 'lavender' | 'teal';
  interactive?: boolean;
  elevated?: boolean;
  noBorder?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

export const SolarpunkPanel = forwardRef<HTMLDivElement, SolarpunkPanelProps>(({
  children,
  className,
  accentColor = 'default',
  interactive = false,
  elevated = false,
  noBorder = false,
  fullWidth = false,
  onClick,
  ...props
}, ref) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Get accent color styles based on the theme and accent color prop
  const getAccentColorStyles = () => {
    if (isDark) {
      // Cyberpunk theme accent styles - using the neon color palette
      switch (accentColor) {
        case 'yellow': return 'border-amber-400/50 hover:border-amber-400/70';
        case 'green': return 'border-lime-500/50 hover:border-lime-500/70';
        case 'orange': return 'border-orange-500/50 hover:border-orange-500/70';
        case 'coral': return 'border-red-400/50 hover:border-red-400/70';
        case 'aqua': return 'border-cyan-500/50 hover:border-cyan-500/70';
        case 'gold': return 'border-yellow-500/50 hover:border-yellow-500/70';
        case 'blue': return 'border-blue-500/50 hover:border-blue-500/70';
        case 'lavender': return 'border-purple-400/50 hover:border-purple-400/70';
        case 'teal': return 'border-teal-500/50 hover:border-teal-500/70';
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
        case 'teal': return 'border-teal-500 hover:border-teal-600 bg-gradient-to-br from-teal-50/90 to-white/90';
        default: return 'border-emerald-500 hover:border-emerald-600 bg-gradient-to-br from-emerald-50/90 to-white/90';
      }
    }
  };

  // Get shadow styles based on theme and elevation
  const getShadowStyles = () => {
    if (isDark) {
      // Cyberpunk glow based on accent color
      const getGlowColor = () => {
        switch (accentColor) {
          case 'yellow': return 'rgba(251, 191, 36, 0.3)';
          case 'green': return 'rgba(132, 204, 22, 0.3)';
          case 'orange': return 'rgba(249, 115, 22, 0.3)';
          case 'coral': return 'rgba(248, 113, 113, 0.3)';
          case 'aqua': return 'rgba(6, 182, 212, 0.3)';
          case 'gold': return 'rgba(250, 204, 21, 0.3)';
          case 'blue': return 'rgba(59, 130, 246, 0.3)';
          case 'lavender': return 'rgba(192, 132, 252, 0.3)';
          case 'teal': return 'rgba(20, 184, 166, 0.3)';
          default: return 'rgba(192, 132, 252, 0.3)';
        }
      };
      
      return elevated 
        ? `shadow-xl shadow-black/40 ${interactive ? `hover:shadow-[0_0_15px_${getGlowColor()}]` : ''}` 
        : `shadow-md shadow-black/20 ${interactive ? `hover:shadow-[0_0_10px_${getGlowColor()}]` : ''}`;
    } else {
      return elevated 
        ? 'shadow-xl shadow-black/10' 
        : 'shadow-md shadow-black/5';
    }
  };

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
  
  // Common className for both div and motion.div
  const commonClassName = cn(
    'rounded-xl overflow-hidden',
    !noBorder && 'border',
    fullWidth ? 'w-full' : '',
    getAccentColorStyles(),
    getShadowStyles(),
    interactive && 'cursor-pointer transition-all duration-300',
    isDark ? 'bg-flow-background/80 backdrop-blur-md text-flow-foreground' : 'backdrop-blur-sm text-gray-800',
    className
  );

  if (interactive) {
    // Use TypeScript type casting to handle the motion component properly
    return (
      <motion.div
        ref={ref}
        onClick={onClick}
        className={commonClassName}
        {...motionProps}
        // Safely spread other props, excluding any that might conflict with motion props
        {...(props as Omit<React.HTMLAttributes<HTMLDivElement>, keyof HTMLMotionProps<"div">>)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={commonClassName}
      {...props}
    >
      {children}
    </div>
  );
});

SolarpunkPanel.displayName = 'SolarpunkPanel';

export default SolarpunkPanel;
