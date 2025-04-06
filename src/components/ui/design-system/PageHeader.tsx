
import React from 'react';
import { cn } from '@/lib/utils';
import { GlassMorphism } from '../GlassMorphism';

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
  const HeaderContent = () => (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4">
      <div className="flex items-center">
        {icon && (
          <div className="mr-4 bg-flow-accent/20 p-3 rounded-xl backdrop-blur-sm border border-flow-accent/30 shadow-[0_0_15px_rgba(217,70,239,0.2)]">
            <div className="h-8 w-8 text-flow-accent drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]">
              {icon}
            </div>
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            {title}
          </h1>
          {description && (
            <p className="text-flow-foreground/70 max-w-2xl mt-1">
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
      <GlassMorphism className={cn("mb-6 px-4 sm:px-6", className)}>
        <HeaderContent />
      </GlassMorphism>
    );
  }

  return (
    <div className={cn("mb-6 container-lg", className)}>
      <HeaderContent />
    </div>
  );
};

export default PageHeader;
