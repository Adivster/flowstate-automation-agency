
import React from 'react';
import { cn } from '@/lib/utils';
import { GlassMorphism } from '../GlassMorphism';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  glassEffect?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  icon,
  actions,
  className,
  glassEffect = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const HeaderContent = () => (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4">
      <div className="flex items-center">
        {icon && (
          <motion.div 
            whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
            transition={{ duration: 0.5 }}
            className={cn(
              "mr-4 p-3 rounded-xl backdrop-blur-sm border shadow-lg",
              isDark
                ? "bg-flow-accent/20 border-flow-accent/30 shadow-[0_0_15px_rgba(217,70,239,0.2)]"
                : "bg-emerald-100/50 border-emerald-200/70 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
            )}
          >
            <div 
              className={cn(
                "h-8 w-8",
                isDark
                  ? "text-flow-accent drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]"
                  : "text-emerald-600 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]"
              )}
            >
              {icon}
            </div>
          </motion.div>
        )}
        <div>
          <h1 
            className={cn(
              "text-3xl font-bold",
              isDark
                ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                : "text-emerald-800 drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]"
            )}
          >
            {title}
          </h1>
          {description && (
            <p className={cn(
              "max-w-2xl mt-1",
              isDark 
                ? "text-flow-foreground/70" 
                : "text-emerald-700/80"
            )}>
              {description}
            </p>
          )}
        </div>
      </div>
      
      {actions && (
        <div className="flex flex-wrap items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );

  if (glassEffect) {
    return (
      <GlassMorphism 
        variant={isDark ? "accent" : "nature"}
        className={cn("mb-6 px-4 sm:px-6", className)}
      >
        <HeaderContent />
      </GlassMorphism>
    );
  }

  return (
    <div className={cn("mb-6 px-4 sm:px-6", className)}>
      <HeaderContent />
    </div>
  );
};

export default PageHeader;
