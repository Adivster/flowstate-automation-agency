
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'dashboard' | 'office' | 'workflows' | 'tasks' | 'knowledge' | 'business' | 'analytics' | 'courses';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  active?: boolean;
  position?: 'sidebar' | 'toolbar' | 'panel';
  tooltip?: string;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon,
  label,
  onClick,
  variant = 'default',
  size = 'md',
  className,
  disabled = false,
  active = false,
  position = 'toolbar',
  tooltip
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Get variant-specific styling
  const getVariantStyles = () => {
    if (isDark) {
      // Cyberpunk theme
      switch (variant) {
        case 'dashboard':
          return 'bg-blue-500/10 border-blue-500/50 hover:bg-blue-500/20 text-blue-500 dark:text-blue-400';
        case 'office':
          return 'bg-purple-500/10 border-purple-500/50 hover:bg-purple-500/20 text-purple-500 dark:text-purple-400';
        case 'workflows':
          return 'bg-lime-500/10 border-lime-500/50 hover:bg-lime-500/20 text-lime-500 dark:text-lime-400';
        case 'tasks':
          return 'bg-red-500/10 border-red-500/50 hover:bg-red-500/20 text-red-500 dark:text-red-400';
        case 'knowledge':
          return 'bg-teal-500/10 border-teal-500/50 hover:bg-teal-500/20 text-teal-500 dark:text-teal-400';
        case 'business':
          return 'bg-amber-500/10 border-amber-500/50 hover:bg-amber-500/20 text-amber-500 dark:text-amber-400';
        case 'analytics':
          return 'bg-pink-500/10 border-pink-500/50 hover:bg-pink-500/20 text-pink-500 dark:text-pink-400';
        case 'courses':
          return 'bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/20 text-orange-500 dark:text-orange-400';
        case 'primary':
          return 'bg-flow-accent/10 border-flow-accent/50 hover:bg-flow-accent/20 text-flow-accent';
        default:
          return 'bg-white/10 border-white/30 hover:bg-white/20 text-white/80';
      }
    } else {
      // Solarpunk theme
      switch (variant) {
        case 'dashboard':
          return 'bg-blue-100 border-blue-300 hover:bg-blue-200 text-blue-700';
        case 'office':
          return 'bg-emerald-100 border-emerald-300 hover:bg-emerald-200 text-emerald-700';
        case 'workflows':
          return 'bg-orange-100 border-orange-300 hover:bg-orange-200 text-orange-700';
        case 'tasks':
          return 'bg-red-100 border-red-300 hover:bg-red-200 text-red-700';
        case 'knowledge':
          return 'bg-teal-100 border-teal-300 hover:bg-teal-200 text-teal-700';
        case 'business':
          return 'bg-amber-100 border-amber-300 hover:bg-amber-200 text-amber-700';
        case 'analytics':
          return 'bg-blue-100 border-blue-300 hover:bg-blue-200 text-blue-700';
        case 'courses':
          return 'bg-purple-100 border-purple-300 hover:bg-purple-200 text-purple-700';
        case 'primary':
          return 'bg-emerald-100 border-emerald-300 hover:bg-emerald-200 text-emerald-700';
        default:
          return 'bg-white/80 border-emerald-300 hover:bg-emerald-100 text-emerald-700';
      }
    }
  };

  // Get size-specific styling
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1.5 text-xs rounded-md';
      case 'lg':
        return 'px-5 py-2.5 text-base rounded-lg';
      default: // md
        return 'px-3 py-2 text-sm rounded-md';
    }
  };

  // Get position-specific styling
  const getPositionStyles = () => {
    if (position === 'sidebar') {
      return size === 'sm' ? 'w-8 h-8 p-0 rounded-full' : 'w-full';
    }
    return '';
  };

  // Get active state styling
  const getActiveStyles = () => {
    if (!active) return '';
    
    if (isDark) {
      return variant === 'default' 
        ? 'bg-white/30 text-white border-white/50' 
        : `bg-${variant}-500/30 text-${variant}-300 border-${variant}-500/70`;
    } else {
      return variant === 'default'
        ? 'bg-emerald-200 text-emerald-900 border-emerald-500'
        : `bg-${variant}-200 text-${variant}-900 border-${variant}-500`;
    }
  };

  // Animation variants
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.03,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    tap: { 
      scale: 0.97,
      transition: { duration: 0.1, ease: "easeIn" }
    },
    disabled: {
      opacity: 0.5,
      scale: 1
    }
  };

  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      className={cn(
        'flex items-center justify-center gap-2 border transition-colors',
        getVariantStyles(),
        getSizeStyles(),
        getPositionStyles(),
        'font-medium',
        isDark ? 'shadow-lg shadow-black/30' : 'shadow-sm',
        active && getActiveStyles(),
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      initial="rest"
      animate={disabled ? "disabled" : "rest"}
      whileHover={disabled ? "disabled" : "hover"}
      whileTap={disabled ? "disabled" : "tap"}
      variants={buttonVariants}
      disabled={disabled}
      title={tooltip}
    >
      {icon}
      {(position !== 'sidebar' || size !== 'sm') && <span>{label}</span>}
    </motion.button>
  );
};
