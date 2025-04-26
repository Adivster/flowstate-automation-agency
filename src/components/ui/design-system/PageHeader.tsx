
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTheme } from '@/providers/theme-provider';
import { getPageStyles, type PageVariant } from '@/utils/pageStyles';

export type PageHeaderProps = {
  title: string;
  extendedTitle?: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: PageVariant;
  actions?: React.ReactNode;
  glassEffect?: boolean;
  className?: string;
};

const PageHeader = ({
  title,
  extendedTitle,
  description,
  icon,
  variant = 'default',
  actions,
  glassEffect = true,
  className,
}: PageHeaderProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const styles = getPageStyles(variant);
  
  return (
    <div className={cn(
      "relative w-full", 
      variant === 'dashboard' ? 'mb-8' : 'mb-6', 
      "p-4 sm:p-6 rounded-2xl border backdrop-blur-xl",
      `bg-gradient-to-br ${styles.gradient}`,
      styles.border,
      isDark && `${styles.glow} shadow-lg`,
      className
    )}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-7xl mx-auto">
        <div className="space-y-1.5 flex">
          {icon && (
            <div className={cn(
              "mr-4 hidden md:flex items-center justify-center p-2 rounded-lg",
              styles.accent
            )}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                animate={{
                  opacity: [0.8, 1, 0.8],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={styles.icon}
              >
                {icon}
              </motion.div>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2"
            >
              {icon && (
                <motion.span 
                  animate={{
                    opacity: [0.8, 1, 0.8],
                    textShadow: [
                      `0 0 4px rgba(255, 255, 255, 0.3)`,
                      `0 0 8px rgba(255, 255, 255, 0.5)`,
                      `0 0 4px rgba(255, 255, 255, 0.3)`
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={cn("md:hidden mr-2", styles.icon)}>
                  {icon}
                </motion.span>
              )}
              
              <h1 className={cn(
                "text-2xl sm:text-3xl font-bold tracking-tight",
                isDark ? "text-white" : "text-gray-900"
              )}>
                <motion.span
                  animate={{
                    textShadow: [
                      `0 0 4px rgba(255, 255, 255, 0)`,
                      `0 0 8px rgba(255, 255, 255, 0.3)`,
                      `0 0 4px rgba(255, 255, 255, 0)`
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >{title}</motion.span>
                {extendedTitle && (
                  <>
                    <span className={cn(
                      "hidden md:inline opacity-70 font-light mx-2 text-xl",
                      isDark ? "text-gray-300" : "text-gray-500"
                    )}>
                      /
                    </span>
                    <span className={cn(
                      "block md:inline text-lg md:text-2xl font-medium mt-1 md:mt-0",
                      isDark ? "text-gray-300" : "text-gray-600"
                    )}>
                      {extendedTitle}
                    </span>
                  </>
                )}
              </h1>
            </motion.div>

            {description && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={cn(
                  "text-sm md:text-base max-w-3xl mt-1.5",
                  isDark ? "text-gray-300" : "text-gray-500"
                )}
              >
                {description}
              </motion.p>
            )}
          </div>
        </div>

        {actions && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-2 mt-2 md:mt-0"
          >
            {actions}
          </motion.div>
        )}
      </div>
      
      {/* Enhanced animated glow effect with pulsing */}
      <div className="absolute inset-0 -z-10 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30" />
        {isDark && (
          <>
            <motion.div
              className={cn(
                "absolute inset-0 opacity-30",
                `bg-gradient-to-br ${styles.gradient}`
              )}
              animate={{
                opacity: [0.2, 0.35, 0.2],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute inset-0 bg-purple-900/10"
              animate={{
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
