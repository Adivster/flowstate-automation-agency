
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
  particleCount = 50,
  withPatterns = true
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const backgroundPattern = isDark 
    ? 'bg-black/95 circuit-background' 
    : 'bg-gradient-to-br from-amber-50/70 to-emerald-50/70 leaf-pattern';
    
  return (
    <div className={cn(`min-h-screen flex flex-col ${isDark ? 'bg-black/95' : 'bg-solar-background'} ${withPatterns ? backgroundPattern : ''}`, className)}>
      {/* Enhanced cyberpunk particle and spark effects */}
      {isDark && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {/* Energy particles */}
          {[...Array(particleCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                filter: i % 5 === 0 ? "blur(2px)" : "blur(1px)",
                backgroundColor: i % 6 === 0 
                  ? 'rgba(6, 182, 212, 0.8)'   // Cyan
                  : i % 6 === 1
                    ? 'rgba(236, 72, 153, 0.8)' // Magenta
                    : i % 6 === 2
                      ? 'rgba(192, 132, 252, 0.8)' // Purple
                      : i % 6 === 3
                        ? 'rgba(132, 204, 22, 0.8)'  // Lime
                        : i % 6 === 4
                          ? 'rgba(249, 115, 22, 0.8)' // Orange
                          : 'rgba(59, 130, 246, 0.8)' // Blue
              }}
              animate={{
                x: [0, Math.random() * 150 - 75],
                y: [0, Math.random() * 150 - 75],
                opacity: [0.4, 0.9, 0.4],
                scale: [1, 1.8, 1]
              }}
              transition={{ 
                duration: Math.random() * 10 + 8,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse"
              }}
            />
          ))}

          {/* Add electric sparks for even more cyberpunk feel */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`spark-${i}`}
              className="absolute"
              style={{
                width: Math.random() * 2 + 1 + 'px',
                height: Math.random() * 40 + 20 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                backgroundColor: 
                  i % 3 === 0 ? 'rgba(139, 92, 246, 0.9)' : // Purple 
                  i % 3 === 1 ? 'rgba(6, 182, 212, 0.9)' : // Cyan
                  'rgba(236, 72, 153, 0.9)', // Pink
                boxShadow: 
                  i % 3 === 0 ? '0 0 8px 2px rgba(139, 92, 246, 0.5)' : 
                  i % 3 === 1 ? '0 0 8px 2px rgba(6, 182, 212, 0.5)' :
                  '0 0 8px 2px rgba(236, 72, 153, 0.5)',
                transformOrigin: 'center bottom',
              }}
              animate={{
                scaleY: [0, 1, 0],
                opacity: [0, 0.8, 0],
                rotate: [Math.random() * 10 - 5, Math.random() * 20 - 10],
              }}
              transition={{ 
                duration: 0.8,
                repeat: Infinity,
                repeatDelay: Math.random() * 12 + 8,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Glowing grid lines */}
          <svg className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-20" 
            preserveAspectRatio="none">
            <defs>
              <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.4)" />
                <stop offset="50%" stopColor="rgba(236, 72, 153, 0.4)" />
                <stop offset="100%" stopColor="rgba(192, 132, 252, 0.4)" />
              </linearGradient>
            </defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#grid-gradient)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Digital scan lines */}
          <div className="fixed inset-0 bg-scanlines opacity-5 pointer-events-none"></div>
        </div>
      )}

      {children}
      
      <style>{`
        .circuit-background {
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
        
        .bg-scanlines {
          background-image: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.05),
            rgba(255, 255, 255, 0.05) 1px,
            transparent 1px,
            transparent 2px
          );
          background-size: 100% 4px;
          animation: scanlines 8s linear infinite;
        }
        
        @keyframes scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
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
