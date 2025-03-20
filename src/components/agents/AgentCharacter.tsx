
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface RoutePoint {
  division: string;
  x: number;
  y: number;
}

interface AgentProps {
  agent: {
    id: number;
    name: string;
    role: string;
    status: 'working' | 'idle' | 'paused' | 'error';
    icon: LucideIcon;
    division: string;
    position: {
      x: number;
      y: number;
    };
  };
  routePath?: RoutePoint[];
}

const AgentCharacter: React.FC<AgentProps> = ({ agent, routePath = [] }) => {
  const [position, setPosition] = useState(agent.position);
  const [currentRouteIndex, setCurrentRouteIndex] = useState(0);
  const animationRef = useRef<number | null>(null);
  const { t } = useLanguage();
  
  // Status translations
  const getStatusText = (status: string) => {
    switch (status) {
      case 'working': return t('working');
      case 'idle': return t('idle');
      case 'paused': return t('paused');
      case 'error': return t('error');
      default: return status;
    }
  };
  
  // Movement between route points or random movement within division area
  useEffect(() => {
    if (agent.status === 'working' && routePath.length > 0) {
      // Route-based movement for working agents
      const moveToNextPoint = () => {
        const nextIndex = (currentRouteIndex + 1) % routePath.length;
        const nextPoint = routePath[nextIndex];
        
        setPosition({
          x: nextPoint.x,
          y: nextPoint.y
        });
        
        setCurrentRouteIndex(nextIndex);
      };
      
      const interval = setInterval(moveToNextPoint, 10000 + (agent.id * 5000)); // Move every 10-35 seconds
      
      return () => clearInterval(interval);
    } else if (agent.status === 'working') {
      // Random movement within division area
      const interval = setInterval(() => {
        // Create small random movements around the original position
        const newX = agent.position.x + (Math.random() * 6 - 3);
        const newY = agent.position.y + (Math.random() * 6 - 3);
        
        setPosition({
          x: Math.max(5, Math.min(95, newX)),
          y: Math.max(5, Math.min(85, newY))
        });
      }, 3000 + (agent.id * 500)); // Stagger movements
      
      return () => clearInterval(interval);
    }
  }, [agent, currentRouteIndex, routePath]);
  
  const statusColors = {
    working: 'bg-green-500',
    idle: 'bg-gray-500',
    paused: 'bg-amber-500',
    error: 'bg-red-500'
  };
  
  const statusGlows = {
    working: 'shadow-[0_0_10px_#10b981] neon-glow',
    idle: 'shadow-[0_0_6px_#6b7280]',
    paused: 'shadow-[0_0_8px_#f59e0b]',
    error: 'shadow-[0_0_12px_#ef4444] animate-pulse'
  };
  
  const Icon = agent.icon;
  
  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        zIndex: 20
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: agent.status === 'working' ? [0, -3, 0] : 0
      }}
      transition={{
        y: { 
          repeat: agent.status === 'working' ? Infinity : 0,
          duration: 1.5
        },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }}
    >
      {/* Agent avatar */}
      <div className="relative">
        <div 
          className={`rounded-full p-2 ${
            agent.status === 'working' 
              ? 'bg-flow-accent/20 backdrop-blur-sm border border-flow-accent/30' 
              : 'bg-flow-muted/50'
          } ${statusGlows[agent.status]}`}
        >
          <Icon className={`h-4 w-4 ${agent.status === 'working' ? 'text-flow-accent animate-pulse-subtle' : 'text-flow-foreground'}`} />
        </div>
        
        {/* Holographic data visualization for working agents */}
        {agent.status === 'working' && (
          <motion.div 
            className="absolute -top-3 -right-3 w-10 h-2 rounded-md overflow-hidden bg-black/20 backdrop-blur-sm border border-flow-accent/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <motion.div 
              className="h-full bg-flow-accent/70"
              animate={{ 
                width: ["0%", "100%", "0%"],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3, 
                ease: "linear"
              }}
            />
          </motion.div>
        )}
        
        {/* Status indicator */}
        <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${statusColors[agent.status]} ${agent.status === 'working' ? 'animate-pulse-subtle' : ''}`}></div>
      </div>
      
      {/* Name tooltip with cyberpunk styling */}
      <div className="mt-1 px-1.5 py-0.5 bg-flow-background/80 backdrop-blur-sm border border-flow-border/30 rounded text-[0.6rem] whitespace-nowrap shadow-lg">
        {agent.name}
      </div>
      
      {/* Task progress for working agents */}
      {agent.status === 'working' && (
        <div className="mt-1 w-10 h-1 bg-flow-muted/50 rounded-full overflow-hidden backdrop-blur-sm border border-flow-border/20">
          <motion.div 
            className="h-full bg-flow-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              repeat: Infinity, 
              duration: 3 + Math.random() * 2,
              repeatType: "reverse"
            }}
          />
        </div>
      )}
      
      {/* Animated holographic glow effect for active agents */}
      {agent.status === 'working' && (
        <motion.div 
          className="absolute inset-0 rounded-full bg-flow-accent/5 backdrop-blur-sm"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ 
            repeat: Infinity, 
            duration: 4,
            ease: "easeInOut" 
          }}
        />
      )}
    </motion.div>
  );
};

export default AgentCharacter;
