
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface ThemedBackgroundProps {
  children: React.ReactNode;
  className?: string;
  particleCount?: number;
  withPatterns?: boolean;
}

export const ThemedBackground: React.FC<ThemedBackgroundProps> = ({ 
  children, 
  className,
  particleCount = 15,
  withPatterns = true
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Background patterns based on theme
  const backgroundPattern = isDark 
    ? 'circuit-background' 
    : 'bg-gradient-to-br from-amber-50/70 to-emerald-50/70 leaf-pattern';
    
  return (
    <div className={cn(`min-h-screen flex flex-col bg-flow-background ${withPatterns ? backgroundPattern : ''}`, className)}>
      {/* Decorative floating elements for solarpunk theme */}
      {!isDark && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(particleCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-b from-amber-200/20 to-emerald-200/20"
              style={{
                width: Math.random() * 120 + 40 + 'px',
                height: Math.random() * 120 + 40 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, Math.random() * -30 - 10, 0],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ 
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          ))}
        </div>
      )}

      {/* Cyberpunk particle effects */}
      {isDark && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(particleCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-flow-accent/30"
              style={{
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                filter: "blur(1px)"
              }}
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{ 
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse"
              }}
            />
          ))}
          
          {/* Digital grid lines */}
          <svg className="fixed bottom-0 left-0 w-full h-full pointer-events-none z-0 opacity-10" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none">
            <path 
              d="M0,50 Q25,40 50,50 T100,50" 
              fill="none" 
              stroke="url(#gradient1)" 
              strokeWidth="0.2"
              className="animated-path"
            />
            <path 
              d="M0,30 Q25,50 50,30 T100,30" 
              fill="none" 
              stroke="url(#gradient2)" 
              strokeWidth="0.2"
              className="animated-path"
            />
            <path 
              d="M0,70 Q25,50 50,70 T100,70" 
              fill="none" 
              stroke="url(#gradient3)" 
              strokeWidth="0.2"
              className="animated-path"
            />
            
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      {/* Decorative organic patterns for light theme */}
      {!isDark && (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0 organic-pattern opacity-30"></div>
      )}
      
      {children}
      
      {/* Replace the <style jsx> tag with a global style element */}
      <style>
        {`
        .animated-path {
          animation: flow 15s linear infinite;
        }
        @keyframes flow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 100;
          }
        }
        .circuit-background {
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
        .leaf-pattern {
          background-image: radial-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .organic-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(16, 185, 129, 0.05)' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
        `}
      </style>
    </div>
  );
};

export default ThemedBackground;
