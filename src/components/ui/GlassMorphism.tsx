
import React, { ReactNode, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GlassMorphismProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  onClick?: () => void;
  variant?: 'default' | 'accent' | 'muted';
  hoverEffect?: boolean;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const GlassMorphism: React.FC<GlassMorphismProps> = ({
  children,
  className,
  intensity = 'medium',
  onClick,
  variant = 'default',
  hoverEffect = false,
  style,
  onMouseEnter,
  onMouseLeave,
}) => {
  const intensityClasses = {
    low: 'bg-white/5 backdrop-blur-sm border border-white/10',
    medium: 'bg-white/10 backdrop-blur-md border border-white/20',
    high: 'bg-white/20 backdrop-blur-lg border border-white/30',
  };
  
  const variantClasses = {
    default: 'shadow-sm',
    accent: 'shadow-md border-flow-accent/40',
    muted: 'shadow-none opacity-80',
  };
  
  const hoverClasses = hoverEffect 
    ? 'transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:shadow-lg' 
    : 'transition-all duration-300';

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Add glowing effect on mouse movement
  useEffect(() => {
    if (!hoverEffect || !containerRef.current) return;
    
    const container = containerRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      container.style.background = `
        radial-gradient(
          circle at ${x}px ${y}px, 
          rgba(255, 255, 255, 0.08) 0%, 
          rgba(255, 255, 255, 0.03) 40%, 
          rgba(255, 255, 255, 0) 70%
        ),
        rgba(255, 255, 255, 0.1)
      `;
    };
    
    const handleMouseLeave = () => {
      container.style.background = '';
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hoverEffect]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'glass',
        intensityClasses[intensity],
        variantClasses[variant],
        hoverClasses,
        className
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        boxShadow: variant === 'accent' ? '0 0 15px rgba(147, 51, 234, 0.15)' : '',
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default GlassMorphism;
