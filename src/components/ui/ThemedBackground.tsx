import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/theme-provider';

interface ThemedBackgroundProps {
  children: React.ReactNode;
  className?: string;
  particleCount?: number;
  withPatterns?: boolean;
}

export const ThemedBackground: React.FC<ThemedBackgroundProps> = ({ 
  children, 
  className,
  particleCount = 30,
  withPatterns = true
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const backgroundPattern = isDark 
    ? 'bg-black circuit-background' 
    : 'bg-gradient-to-br from-amber-50/70 to-emerald-50/70 leaf-pattern';
    
  return (
    <div className={cn(`min-h-screen flex flex-col ${isDark ? 'bg-black' : 'bg-solar-background'} ${withPatterns ? backgroundPattern : ''}`, className)}>
      {/* Cyberpunk particle and spark effects */}
      {isDark && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Energy particles */}
          {[...Array(particleCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                filter: "blur(1px)",
                backgroundColor: i % 4 === 0 
                  ? 'rgba(6, 182, 212, 0.7)'   // Cyan
                  : i % 4 === 1
                    ? 'rgba(236, 72, 153, 0.7)' // Magenta
                    : i % 4 === 2
                      ? 'rgba(192, 132, 252, 0.7)' // Purple
                      : 'rgba(132, 204, 22, 0.7)'  // Lime
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{ 
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse"
              }}
            />
          ))}
          
          {/* Glowing grid lines */}
          <svg className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-10" 
            preserveAspectRatio="none">
            <defs>
              <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.3)" />
                <stop offset="50%" stopColor="rgba(236, 72, 153, 0.3)" />
                <stop offset="100%" stopColor="rgba(192, 132, 252, 0.3)" />
              </linearGradient>
            </defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#grid-gradient)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      )}

      {children}
      
      <style jsx>{`
        .circuit-background {
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
        
        @keyframes flow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 100; }
        }
      `}</style>
    </div>
  );
};

export default ThemedBackground;
