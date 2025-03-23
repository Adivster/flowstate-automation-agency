
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
  isSelected?: boolean;
  onAgentClick?: (id: number) => void;
}

const AgentCharacter: React.FC<AgentProps> = ({ 
  agent, 
  routePath = [], 
  isSelected = false, 
  onAgentClick 
}) => {
  const [position, setPosition] = useState(agent.position);
  const [currentRouteIndex, setCurrentRouteIndex] = useState(0);
  const [taskProgress, setTaskProgress] = useState(Math.floor(Math.random() * 30) + 70); // 70-100% initial progress
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
  
  // Simulate task progress changes
  useEffect(() => {
    if (agent.status === 'working') {
      const interval = setInterval(() => {
        // Randomly update task progress for working agents
        setTaskProgress(prev => {
          const change = Math.random() > 0.5 ? Math.random() * 5 : -Math.random() * 3;
          return Math.max(20, Math.min(100, prev + change));
        });
      }, 3000);
      
      return () => clearInterval(interval);
    } else if (agent.status === 'idle') {
      // Idle agents have no active tasks
      setTaskProgress(0);
    } else if (agent.status === 'paused') {
      // Paused tasks maintain their current progress
    }
  }, [agent.status]);
  
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
  
  // Determine colors based on status and progress values
  const statusColors = {
    working: 'bg-green-500',
    idle: 'bg-gray-500',
    paused: 'bg-amber-500',
    error: 'bg-red-500'
  };
  
  const getTaskProgressColor = () => {
    if (agent.status === 'idle') return 'bg-gray-500/50';
    if (agent.status === 'paused') return 'bg-amber-500';
    if (agent.status === 'error') return 'bg-red-500';
    if (taskProgress > 80) return 'bg-green-500';
    if (taskProgress > 50) return 'bg-amber-500';
    return 'bg-indigo-500';
  };
  
  const Icon = agent.icon;
  
  return (
    <motion.div
      className={`absolute cursor-pointer ${isSelected ? 'z-50' : 'z-40'}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: isSelected ? 1.1 : 1, 
        opacity: 1,
        translateY: agent.status === 'working' ? [0, -3, 0] : 0
      }}
      transition={{
        translateY: { 
          repeat: agent.status === 'working' ? Infinity : 0,
          duration: 1.5
        },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }}
      onClick={() => onAgentClick && onAgentClick(agent.id)}
    >
      {/* Agent avatar */}
      <div className="flex flex-col items-center">
        <div className="relative mb-1">
          <div 
            className={`rounded-full p-2 ${
              agent.status === 'working' 
                ? 'bg-flow-accent/20 border border-flow-accent/30' 
                : 'bg-flow-muted/50'
            } ${isSelected ? 'ring-2 ring-white' : ''}`}
          >
            <Icon className={`h-4 w-4 ${agent.status === 'working' ? 'text-flow-accent animate-pulse-subtle' : 'text-flow-foreground'}`} />
          </div>
          
          {/* Status indicator */}
          <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${statusColors[agent.status]} ${agent.status === 'working' ? 'animate-pulse-subtle' : ''}`}></div>
        </div>
        
        {/* Single task progress bar */}
        <div className="w-12 h-1.5 mb-1 rounded-full overflow-hidden bg-gray-800/60">
          {agent.status === 'idle' ? (
            <div className="h-full bg-gray-500/30 w-full"></div>
          ) : (
            <div 
              className={`h-full ${getTaskProgressColor()} transition-all duration-500`}
              style={{ 
                width: `${taskProgress}%`, 
                opacity: agent.status === 'working' ? '1' : '0.7' 
              }}
            ></div>
          )}
        </div>
        
        {/* Name tooltip with clearer styling */}
        <div className={`px-1.5 py-0.5 bg-black/80 border border-flow-border/30 rounded text-[0.6rem] whitespace-nowrap shadow-lg ${isSelected ? 'bg-flow-accent/30 text-white' : ''}`}>
          {agent.name}
        </div>
      </div>
    </motion.div>
  );
};

export default AgentCharacter;
