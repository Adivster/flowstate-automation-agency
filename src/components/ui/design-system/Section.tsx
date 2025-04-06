
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
  description?: string;
  actions?: React.ReactNode;
  fullWidth?: boolean;
  noPadding?: boolean;
}

const Section: React.FC<SectionProps> = ({
  children,
  className,
  title,
  icon,
  description,
  actions,
  fullWidth = false,
  noPadding = false,
}) => {
  return (
    <section className={cn('mb-8', className)}>
      {(title || description || actions) && (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          <div className="mb-2 sm:mb-0">
            {title && (
              <h3 className="text-xl font-medium flex items-center gap-2">
                {icon && <span className="text-flow-accent">{icon}</span>}
                <span className={cn(
                  "transition-all duration-300",
                  icon ? "neon-text" : ""
                )}>{title}</span>
              </h3>
            )}
            {description && (
              <p className="text-sm text-flow-foreground/60 mt-1">{description}</p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      )}
      
      <div className={cn(
        !noPadding && 'p-5 sm:p-6 rounded-xl',
        !fullWidth && 'container-md',
      )}>
        {children}
      </div>
    </section>
  );
};

export default Section;
