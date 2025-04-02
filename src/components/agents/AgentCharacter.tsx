
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

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
  const [isMoving, setIsMoving] = useState(false);
  const { t } = useLanguage();
  
  // Division-based color schemes
  const divisionColors = {
    kb: { bg: 'bg-indigo-500', text: 'text-indigo-500', border: 'border-indigo-500', avatarBg: 'bg-indigo-100', shadow: '#6366f1' },
    analytics: { bg: 'bg-yellow-500', text: 'text-yellow-500', border: 'border-yellow-500', avatarBg: 'bg-yellow-100', shadow: '#eab308' },
    operations: { bg: 'bg-purple-500', text: 'text-purple-500', border: 'border-purple-500', avatarBg: 'bg-purple-100', shadow: '#a855f7' },
    strategy: { bg: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-500', avatarBg: 'bg-blue-100', shadow: '#3b82f6' },
    research: { bg: 'bg-green-500', text: 'text-green-500', border: 'border-green-500', avatarBg: 'bg-green-100', shadow: '#22c55e' },
    lounge: { bg: 'bg-amber-500', text: 'text-amber-500', border: 'border-amber-500', avatarBg: 'bg-amber-100', shadow: '#f59e0b' }
  };
  
  const colors = divisionColors[agent.division] || divisionColors.kb;
  
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
    }
    // For other statuses (paused, error), keep current progress
  }, [agent.status]);
  
  // Movement between route points with smooth transitions
  useEffect(() => {
    let interval;
    
    if (agent.status === 'working' && routePath.length > 0) {
      // Route-based movement for working agents
      interval = setInterval(() => {
        const nextIndex = (currentRouteIndex + 1) % routePath.length;
        const nextPoint = routePath[nextIndex];
        
        setIsMoving(true);
        
        // Move to next point
        setPosition({
          x: nextPoint.x,
          y: nextPoint.y
        });
        
        setCurrentRouteIndex(nextIndex);
        
        // Set isMoving to false after the transition completes
        setTimeout(() => {
          setIsMoving(false);
        }, 1000);
        
      }, 10000 + (agent.id * 3000)); // Varied movement timing to avoid synchronization
    } else if (agent.status === 'working') {
      // Random small movements within division area for more natural appearance
      interval = setInterval(() => {
        // Create small random movements around the original position
        const newX = agent.position.x + (Math.random() * 3 - 1.5);
        const newY = agent.position.y + (Math.random() * 3 - 1.5);
        
        setPosition({
          x: Math.max(5, Math.min(95, newX)),
          y: Math.max(5, Math.min(85, newY))
        });
      }, 3000 + (agent.id * 500)); // Stagger movements
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [agent, currentRouteIndex, routePath]);
  
  // Determine colors based on status and division
  const statusColors = {
    working: 'bg-green-500',
    idle: 'bg-gray-500',
    paused: 'bg-amber-500',
    error: 'bg-red-500'
  };
  
  // Get task progress color based on status and progress
  const getTaskProgressColor = () => {
    if (agent.status === 'idle') return 'bg-gray-500/50';
    if (agent.status === 'paused') return 'bg-amber-500';
    if (agent.status === 'error') return 'bg-red-500';
    if (taskProgress > 80) return 'bg-green-500';
    if (taskProgress > 50) return 'bg-amber-500';
    return colors.bg;
  };
  
  const Icon = agent.icon;
  
  // Get initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <motion.div
      className={`absolute cursor-pointer ${isSelected ? 'z-50' : 'z-40'}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transition: isMoving ? 'all 1s cubic-bezier(0.4, 0.0, 0.2, 1)' : 'all 0.3s ease'
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
      {/* Agent avatar with color coding by division */}
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <div className="relative mb-1">
          <div 
            className={`rounded-full p-1.5 ${
              agent.status === 'working' 
                ? `${colors.avatarBg} border ${colors.border} shadow-md` 
                : 'bg-gray-200 dark:bg-gray-800'
            } ${isSelected ? 'ring-2 ring-white shadow-lg' : ''}`}
            style={{
              boxShadow: isSelected || isMoving ? `0 0 8px ${colors.shadow}` : 'none'
            }}
          >
            <Avatar className="h-6 w-6">
              <AvatarFallback className={`text-[0.6rem] font-semibold ${colors.bg} text-white`}>
                {getInitials(agent.name)}
              </AvatarFallback>
            </Avatar>
          </div>
          
          {/* Status indicator */}
          <div 
            className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${statusColors[agent.status]} 
            ${agent.status === 'working' ? 'animate-pulse' : ''}`}
          ></div>
          
          {/* Division icon indicator */}
          <div className={`absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center`}>
            <Icon className={`h-2.5 w-2.5 ${colors.text}`} />
          </div>
        </div>
        
        {/* Task progress bar */}
        <div className="w-12 h-1.5 mb-1 rounded-full overflow-hidden bg-black/60 backdrop-blur-sm">
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
        
        {/* Name tooltip */}
        <div 
          className={`
            px-1.5 py-0.5 
            ${isSelected ? `${colors.avatarBg} ${colors.text} border-${colors.border}/50` : 'bg-black/80 text-white border-gray-700/30'}
            backdrop-blur-sm border rounded text-[0.6rem] whitespace-nowrap shadow-lg
          `}
        >
          {agent.name}
        </div>
        
        {/* Only show role when selected */}
        {isSelected && (
          <div className="px-1.5 py-0.5 mt-0.5 bg-black/60 backdrop-blur-sm border border-gray-700/30 rounded text-[0.6rem] whitespace-nowrap text-white shadow-lg">
            {agent.role}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AgentCharacter;
