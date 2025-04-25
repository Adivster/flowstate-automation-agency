
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/providers/theme-provider';

interface EnhancedBackgroundProps {
  animated?: boolean;
  intensityLevel?: 'low' | 'medium' | 'high';
}

export const EnhancedBackground: React.FC<EnhancedBackgroundProps> = ({
  animated = true,
  intensityLevel = 'medium'
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string }>>([]);
  
  useEffect(() => {
    if (animated) {
      const particleCount = intensityLevel === 'low' ? 20 : intensityLevel === 'medium' ? 40 : 60;
      
      // Generate particles with colors appropriate to the theme
      const newParticles = Array.from({ length: particleCount }, (_, i) => {
        let color;
        if (isDark) {
          // Cyberpunk theme colors
          const colors = [
            'rgba(6, 182, 212, 0.6)',  // Electric cyan
            'rgba(236, 72, 153, 0.6)', // Hot pink
            'rgba(192, 132, 252, 0.6)', // Vibrant purple
            'rgba(132, 204, 22, 0.5)'  // Electric lime (less common)
          ];
          color = colors[i % colors.length];
        } else {
          // Solarpunk theme colors
          const colors = [
            'rgba(16, 185, 129, 0.3)', // Mint green
            'rgba(250, 204, 21, 0.3)',  // Warm yellow
            'rgba(249, 115, 22, 0.3)',  // Peach/orange
            'rgba(14, 165, 233, 0.3)'   // Sky blue
          ];
          color = colors[i % colors.length];
        }
        
        return {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          color
        };
      });
      
      setParticles(newParticles);
    }
  }, [animated, intensityLevel, isDark]);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 30% 30%, rgba(192, 132, 252, 0.15) 0%, rgba(17, 24, 39, 0) 70%), radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.15) 0%, rgba(17, 24, 39, 0) 70%)'
            : 'radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.1) 0%, rgba(255, 255, 255, 0) 70%), radial-gradient(circle at 70% 70%, rgba(4, 120, 87, 0.08) 0%, rgba(255, 255, 255, 0) 70%)'
        }}
      />
      
      {/* Ambient grid pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundSize: '40px 40px',
          backgroundImage: isDark 
            ? 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)'
            : 'linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)',
          opacity: 0.5
        }}
      />
      
      {/* Ambient glow effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/4 rounded-full blur-3xl"
          style={{
            width: '30%',
            height: '30%',
            background: isDark 
              ? 'radial-gradient(rgba(192, 132, 252, 0.15), transparent 70%)' 
              : 'radial-gradient(rgba(16, 185, 129, 0.1), transparent 70%)',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 rounded-full blur-3xl"
          style={{
            width: '25%',
            height: '25%',
            background: isDark 
              ? 'radial-gradient(rgba(6, 182, 212, 0.15), transparent 70%)' 
              : 'radial-gradient(rgba(4, 120, 87, 0.08), transparent 70%)',
          }}
        />
      </div>
      
      {/* Animated particles */}
      {animated && particles.map(particle => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
          }}
          animate={{
            x: [
              0,
              Math.random() * 20 - 10,
              Math.random() * 20 - 10,
              0
            ],
            y: [
              0,
              Math.random() * 20 - 10,
              Math.random() * 20 - 10,
              0
            ],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
      
      {/* Scan lines effect for cyberpunk theme */}
      {isDark && (
        <div className="absolute inset-0 scan-lines opacity-20" />
      )}
    </div>
  );
};
