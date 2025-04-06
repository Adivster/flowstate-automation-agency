
import React from 'react';
import { cn } from '@/lib/utils';
import { GlassMorphism } from '../GlassMorphism';

interface DataCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  interactive?: boolean;
  glassEffect?: boolean;
  neon?: boolean;
  neonColor?: 'blue' | 'green' | 'orange' | 'purple' | 'default';
  onClick?: () => void;
  variant?: 'default' | 'outlined' | 'filled';
}

const DataCard: React.FC<DataCardProps> = ({
  children,
  className,
  title,
  subtitle,
  icon,
  actions,
  footer,
  interactive = true,
  glassEffect = false,
  neon = false,
  neonColor = 'default',
  onClick,
  variant = 'default',
}) => {
  const neonClasses = {
    default: 'neon-border',
    blue: 'neon-border-blue',
    green: 'neon-border-green',
    orange: 'neon-border-orange',
    purple: 'neon-border-purple',
  };
  
  const variantClasses = {
    default: 'bg-flow-card border border-flow-border',
    outlined: 'bg-transparent border border-flow-border',
    filled: 'bg-flow-card/90 border-none',
  };
  
  const CardComponent = glassEffect ? GlassMorphism : 'div';
  
  const cardProps = glassEffect 
    ? { 
        className: cn(
          'rounded-xl',
          interactive && 'interactive-card cursor-pointer',
          neon && neonClasses[neonColor],
          className
        ),
        onClick
      }
    : {
        className: cn(
          'rounded-xl shadow-neo-subtle',
          variantClasses[variant],
          interactive && 'interactive-card hover:shadow-neo cursor-pointer',
          neon && neonClasses[neonColor],
          className
        ),
        onClick
      };

  return (
    <CardComponent {...cardProps}>
      {(title || subtitle || icon || actions) && (
        <div className="flex items-center justify-between p-4 border-b border-flow-border/30">
          <div className="flex items-center gap-3">
            {icon && <div className="text-flow-accent">{icon}</div>}
            <div>
              {title && <h4 className="font-medium text-flow-foreground">{title}</h4>}
              {subtitle && <p className="text-xs text-flow-muted-foreground">{subtitle}</p>}
            </div>
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      
      <div className="p-4">
        {children}
      </div>
      
      {footer && (
        <div className="border-t border-flow-border/30 p-4 bg-flow-background/30 rounded-b-xl">
          {footer}
        </div>
      )}
    </CardComponent>
  );
};

export default DataCard;
