import React, { forwardRef } from 'react';
import { cn } from "@/lib/utils";
import { useTheme } from '@/providers/theme-provider';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from "class-variance-authority";

type ColorType = "default" | "cyan" | "magenta" | "lime" | "amber" | "blue" | "purple";

const cardVariants = cva(
  "rounded-xl backdrop-blur-sm transition-all duration-200",
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
    
    const getColorStyles = () => {
      if (!isDark) return "";
      
      switch (color) {
        case "cyan":
          return "bg-gradient-to-br from-black/90 to-cyan-950/50 border-cyan-500/30 hover:border-cyan-500/50";
        case "magenta":
          return "bg-gradient-to-br from-black/90 to-pink-950/50 border-pink-500/30 hover:border-pink-500/50";
        case "lime":
          return "bg-gradient-to-br from-black/90 to-lime-950/50 border-lime-500/30 hover:border-lime-500/50";
        case "amber":
          return "bg-gradient-to-br from-black/90 to-amber-950/50 border-amber-500/30 hover:border-amber-500/50";
        case "blue":
          return "bg-gradient-to-br from-black/90 to-blue-950/50 border-blue-500/30 hover:border-blue-500/50";
        case "purple":
          return "bg-gradient-to-br from-black/90 to-purple-950/50 border-purple-500/30 hover:border-purple-500/50";
        default:
          return "bg-gradient-to-br from-black/90 to-gray-900/50 border-gray-500/30 hover:border-gray-500/50";
      }
    };
    
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
          case "flat": return "shadow-lg shadow-black/50";
          case "raised": return "shadow-xl shadow-black/60";
          case "floating": return "shadow-2xl shadow-black/70";
          default: return "shadow-lg shadow-black/50";
        }
      }
    };
    
    const cardClasses = cn(
      cardVariants({ variant, color: color as any, size, animation }),
      getColorStyles(),
      getAnimationStyles(),
      getElevationStyles(),
      isDark && "border backdrop-blur-md bg-black/40",
      className
    );
    
    const headerClasses = cn(
      "flex items-center justify-between",
      size === "none" ? "p-4" : "",
      size === "sm" ? "mb-3" : "mb-4",
      title && isDark ? "border-b border-flow-border/10 pb-3" : ""
    );
    
    const titleClasses = cn(
      "font-semibold",
      size === "lg" ? "text-2xl" : "text-xl",
      isDark ? "text-white" : "text-gray-800"
    );
    
    const subtitleClasses = cn(
      "mt-1 text-sm",
      isDark ? "text-gray-400" : "text-gray-600"
    );
    
    const footerClasses = cn(
      "mt-4 pt-3",
      isDark ? "border-t border-flow-border/10" : "border-t border-gray-100"
    );
    
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
