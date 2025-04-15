
import React from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTheme } from 'next-themes';
import { X } from 'lucide-react';

interface SolarpunkWindowProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  accentColor?: 'default' | 'yellow' | 'green' | 'orange' | 'coral' | 'aqua' | 'gold' | 'blue' | 'lavender';
  open: boolean;
  onClose: () => void;
  showCloseButton?: boolean;
  width?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  footer?: React.ReactNode;
}

export const SolarpunkWindow: React.FC<SolarpunkWindowProps> = ({
  children,
  className,
  title,
  description,
  accentColor = 'default',
  open,
  onClose,
  showCloseButton = true,
  width = 'md',
  footer
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Get accent color styles based on the theme and accent color prop
  const getAccentColorStyles = () => {
    if (isDark) {
      // Cyberpunk theme accent styles
      switch (accentColor) {
        case 'yellow': return 'border-t-blue-500';
        case 'green': return 'border-t-purple-500';
        case 'orange': return 'border-t-lime-500';
        case 'coral': return 'border-t-red-500';
        case 'aqua': return 'border-t-teal-500';
        case 'gold': return 'border-t-amber-500';
        case 'blue': return 'border-t-pink-500';
        case 'lavender': return 'border-t-orange-500';
        default: return 'border-t-flow-accent';
      }
    } else {
      // Solarpunk theme accent styles
      switch (accentColor) {
        case 'yellow': return 'border-t-amber-400';
        case 'green': return 'border-t-emerald-400';
        case 'orange': return 'border-t-orange-400';
        case 'coral': return 'border-t-red-400';
        case 'aqua': return 'border-t-cyan-400';
        case 'gold': return 'border-t-yellow-400';
        case 'blue': return 'border-t-blue-400';
        case 'lavender': return 'border-t-purple-400';
        default: return 'border-t-emerald-400';
      }
    }
  };

  // Get width class
  const getWidthClass = () => {
    switch (width) {
      case 'sm': return 'max-w-sm';
      case 'md': return 'max-w-md';
      case 'lg': return 'max-w-lg';
      case 'xl': return 'max-w-xl';
      case 'full': return 'max-w-full mx-4';
      default: return 'max-w-md';
    }
  };

  // Get background class based on theme
  const getBackgroundClass = () => {
    if (isDark) {
      return 'bg-flow-background/90 backdrop-blur-xl';
    } else {
      return 'bg-gradient-to-br from-white/95 to-emerald-50/80 backdrop-blur-sm';
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={cn(
        'rounded-xl border overflow-hidden',
        getWidthClass(),
        getBackgroundClass(),
        'p-0',
        isDark ? 'border-flow-border' : 'border-emerald-200',
        'shadow-xl',
        className
      )}>
        {title && (
          <DialogHeader className={cn(
            'p-4 sm:p-6 border-t-4',
            getAccentColorStyles(),
          )}>
            <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
            {description && <p className="text-muted-foreground mt-1">{description}</p>}
            
            {showCloseButton && (
              <button 
                onClick={onClose} 
                className={cn(
                  "absolute top-4 right-4 rounded-full p-1",
                  isDark ? 'hover:bg-white/10' : 'hover:bg-black/5',
                  "transition-colors"
                )}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </DialogHeader>
        )}
        
        <div className="p-4 sm:p-6">
          {children}
        </div>
        
        {footer && (
          <div className={cn(
            'p-4 sm:p-6 border-t',
            isDark ? 'border-flow-border' : 'border-emerald-100',
          )}>
            {footer}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SolarpunkWindow;
