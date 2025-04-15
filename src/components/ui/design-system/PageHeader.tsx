
import React from 'react';
import { cn } from '@/lib/utils';
import { GlassMorphism } from '../GlassMorphism';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  extendedTitle?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  actions?: React.ReactNode;
  className?: string;
  glassEffect?: boolean;
  accentColor?: string;
  variant?: 'default' | 'dashboard' | 'office' | 'workflows' | 'tasks' | 'knowledge' | 'business' | 'analytics' | 'courses';
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  extendedTitle,
  description,
  icon,
  iconColor,
  actions,
  className,
  glassEffect = false,
  accentColor,
  variant = 'default',
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Get the accent color based on variant and theme
  const getAccentColor = () => {
    if (accentColor) return accentColor;
    
    if (isDark) {
      // Cyberpunk theme colors
      switch(variant) {
        case 'dashboard': return 'from-blue-500/20 to-green-500/20 border-blue-500/50 text-blue-400';
        case 'office': return 'from-purple-500/20 to-violet-500/20 border-purple-500/50 text-purple-400';
        case 'workflows': return 'from-lime-500/20 to-green-500/20 border-lime-500/50 text-lime-400';
        case 'tasks': return 'from-red-500/20 to-rose-500/20 border-red-500/50 text-red-400';
        case 'knowledge': return 'from-teal-500/20 to-cyan-500/20 border-teal-500/50 text-teal-400';
        case 'business': return 'from-amber-500/20 to-yellow-500/20 border-amber-500/50 text-amber-400';
        case 'analytics': return 'from-pink-500/20 to-magenta-500/20 border-pink-500/50 text-pink-400';
        case 'courses': return 'from-orange-500/20 to-amber-500/20 border-orange-500/50 text-orange-400';
        default: return 'from-flow-accent/20 to-purple-500/20 border-flow-accent/50 text-flow-accent';
      }
    } else {
      // Solarpunk theme colors
      switch(variant) {
        case 'dashboard': return 'from-yellow-100 to-amber-100 border-yellow-300 text-amber-700';
        case 'office': return 'from-green-100 to-emerald-100 border-green-300 text-emerald-700';
        case 'workflows': return 'from-orange-100 to-amber-100 border-orange-300 text-amber-700';
        case 'tasks': return 'from-coral-100 to-red-100 border-coral-300 text-red-700';
        case 'knowledge': return 'from-blue-100 to-cyan-100 border-blue-300 text-cyan-700';
        case 'business': return 'from-amber-100 to-yellow-100 border-amber-300 text-amber-700';
        case 'analytics': return 'from-blue-100 to-indigo-100 border-blue-300 text-indigo-700';
        case 'courses': return 'from-lavender-100 to-purple-100 border-lavender-300 text-purple-700';
        default: return 'from-emerald-100 to-green-100 border-emerald-300 text-emerald-700';
      }
    }
  };

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    },
    hover: { 
      scale: 1.05, 
      rotate: [-1, 1, -1],
      filter: "brightness(1.2)",
      transition: { duration: 0.5 }
    }
  };

  const HeaderContent = () => (
    <motion.div 
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col md:flex-row md:items-center">
        {icon && (
          <motion.div 
            whileHover="hover"
            variants={iconVariants}
            className={cn(
              "mb-4 md:mb-0 md:mr-6 p-4 rounded-xl backdrop-blur-sm border shadow-lg",
              isDark
                ? "bg-gradient-to-br border-opacity-30 shadow-[0_0_20px_rgba(217,70,239,0.2)]"
                : "bg-opacity-50 border-opacity-20 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
              getAccentColor()
            )}
          >
            <div className="h-16 w-16 flex items-center justify-center">
              {icon}
            </div>
          </motion.div>
        )}
        
        <motion.div variants={itemVariants} className="flex flex-col">
          <h1 
            className={cn(
              "text-3xl font-bold tracking-tight",
              isDark
                ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                : "text-emerald-800 drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]"
            )}
          >
            {title}
          </h1>
          
          {extendedTitle && (
            <h2 className="text-xl font-medium mt-0.5 text-flow-accent/90 dark:text-flow-accent/90">
              {extendedTitle}
            </h2>
          )}
          
          {description && (
            <p className={cn(
              "max-w-2xl mt-2 text-base",
              isDark 
                ? "text-flow-foreground/70" 
                : "text-emerald-700/80"
            )}>
              {description}
            </p>
          )}
        </motion.div>
      </div>
      
      {actions && (
        <motion.div 
          className="flex flex-wrap items-center gap-2 mt-4 md:mt-0"
          variants={itemVariants}
        >
          {actions}
        </motion.div>
      )}
    </motion.div>
  );

  const headerClasses = cn(
    "mb-6 px-4 sm:px-6 border-b-2",
    isDark ? `border-b-2 ${getAccentColor().split(' ').find(cls => cls.startsWith('border-'))}` : `border-b-2 ${getAccentColor().split(' ').find(cls => cls.startsWith('border-'))}`,
    className
  );

  if (glassEffect) {
    return (
      <GlassMorphism 
        variant={isDark ? "accent" : "nature"}
        className={cn(headerClasses, "py-2")}
        animate={true}
      >
        <HeaderContent />
      </GlassMorphism>
    );
  }

  return (
    <div className={headerClasses}>
      <HeaderContent />
    </div>
  );
};

export default PageHeader;
