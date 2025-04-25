
import React, { forwardRef } from 'react';
import { cn } from "@/lib/utils";
import { useTheme } from '@/providers/theme-provider';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from "class-variance-authority";

type ColorType = "default" | "cyan" | "magenta" | "lime" | "amber" | "blue" | "purple";

const cardVariants = cva(
  "rounded-xl border shadow transition-all duration-200",
  {
    variants: {
      variant: {
        default: "",
        outline: "",
        command: "",
        insight: "",
      },
      color: {
        default: "",  
        cyan: "",     // Primary actions
        magenta: "",  // Warnings/mid-priority
        lime: "",     // Success/positive
        amber: "",    // Caution
        blue: "",     // Information
        purple: "",   // Special
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        none: "p-0",
      },
      animation: {
        none: "",
        glow: "",
        pulse: "",
        hover: "",
      }
    },
    defaultVariants: {
      variant: "default",
      color: "default",
      size: "default",
      animation: "none",
    },
  }
);

export interface CyberCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof cardVariants>, 'color'> {
  title?: string;
  subtitle?: string;
  badge?: React.ReactNode;
  interactive?: boolean;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  elevation?: "flat" | "raised" | "floating";
  color?: ColorType;
}

const CyberCard = forwardRef<HTMLDivElement, CyberCardProps>(
  ({ 
    className, 
    children, 
    variant,
    color = "default", 
    size,
    animation,
    title,
    subtitle,
    badge,
    interactive = false,
    headerAction,
    footer,
    elevation = "flat",
    ...props 
  }, ref) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    
    // Color styling based on theme and color prop
    const getColorStyles = () => {
      if (!isDark) return "";
      
      switch (color) {
        case "cyan":
          return "border-cyan-500/50 dark:bg-gradient-to-br dark:from-cyan-950/30 dark:to-black/50";
        case "magenta":
          return "border-pink-500/50 dark:bg-gradient-to-br dark:from-pink-950/30 dark:to-black/50";
        case "lime":
          return "border-lime-500/50 dark:bg-gradient-to-br dark:from-lime-950/30 dark:to-black/50";
        case "amber":
          return "border-amber-500/50 dark:bg-gradient-to-br dark:from-amber-950/30 dark:to-black/50";
        case "blue":
          return "border-blue-500/50 dark:bg-gradient-to-br dark:from-blue-950/30 dark:to-black/50";
        case "purple":
          return "border-purple-500/50 dark:bg-gradient-to-br dark:from-purple-950/30 dark:to-black/50";
        default:
          return "border-flow-border/30 dark:bg-gradient-to-br dark:from-gray-900/50 dark:to-black/50";
      }
    };
    
    // Animation styling
    const getAnimationStyles = () => {
      if (!isDark) return "";
      
      switch (animation) {
        case "glow":
          return "animate-glow-pulse";
        case "pulse":
          return "animate-pulse-subtle";
        case "hover":
          return "hover:scale-[1.02] transition-transform duration-300";
        default:
          return "";
      }
    };
    
    // Elevation styling
    const getElevationStyles = () => {
      if (!isDark) {
        switch (elevation) {
          case "flat": return "shadow-sm";
          case "raised": return "shadow-md";
          case "floating": return "shadow-lg";
          default: return "shadow-sm";
        }
      } else {
        switch (elevation) {
          case "flat": return "shadow-md shadow-black/30";
          case "raised": return "shadow-lg shadow-black/40";
          case "floating": return "shadow-xl shadow-black/50";
          default: return "shadow-md shadow-black/30";
        }
      }
    };
    
    // Combine all style classes
    const cardClasses = cn(
      cardVariants({ variant, color: color as any, size, animation }),
      getColorStyles(),
      getAnimationStyles(),
      getElevationStyles(),
      isDark && "bg-card backdrop-blur-sm",
      className
    );
    
    const headerClasses = cn(
      "flex items-center justify-between",
      size === "none" ? "p-4" : "",
      size === "sm" ? "mb-3" : "mb-4",
      title && isDark ? "border-b border-flow-border/20 pb-3" : ""
    );
    
    const titleClasses = cn(
      "font-semibold",
      size === "lg" ? "text-xl" : "text-lg",
      isDark ? "text-white" : "text-gray-800"
    );
    
    const subtitleClasses = cn(
      "mt-0.5 text-sm",
      isDark ? "text-gray-300" : "text-gray-600"
    );
    
    const footerClasses = cn(
      "mt-4 pt-3",
      isDark ? "border-t border-flow-border/20" : "border-t border-gray-100"
    );
    
    // Create a card content element that will be used in both interactive and non-interactive versions
    const cardContent = (
      <>
        {(title || badge || headerAction) && (
          <div className={headerClasses}>
            <div className="flex-1">
              {title && <h3 className={titleClasses}>{title}</h3>}
              {subtitle && <p className={subtitleClasses}>{subtitle}</p>}
            </div>
            <div className="flex items-center gap-2">
              {badge}
              {headerAction}
            </div>
          </div>
        )}
        
        {children}
        
        {footer && (
          <div className={footerClasses}>
            {footer}
          </div>
        )}
      </>
    );
    
    if (interactive) {
      return (
        <motion.div
          ref={ref}
          className={cardClasses}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          {...props as any}
        >
          {cardContent}
        </motion.div>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cardClasses}
        {...props}
      >
        {cardContent}
      </div>
    );
  }
);
CyberCard.displayName = "CyberCard";

export { CyberCard, cardVariants };
