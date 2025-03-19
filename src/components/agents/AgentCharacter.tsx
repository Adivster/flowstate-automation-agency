
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

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
}

const AgentCharacter: React.FC<AgentProps> = ({ agent }) => {
  const [position, setPosition] = useState(agent.position);
  
  // Random movement within division area
  useEffect(() => {
    const interval = setInterval(() => {
      if (agent.status === 'working') {
        // Create small random movements around the original position
        const newX = agent.position.x + (Math.random() * 6 - 3);
        const newY = agent.position.y + (Math.random() * 6 - 3);
        
        setPosition({
          x: Math.max(5, Math.min(95, newX)),
          y: Math.max(5, Math.min(85, newY))
        });
      }
    }, 3000 + (agent.id * 500)); // Stagger movements
    
    return () => clearInterval(interval);
  }, [agent]);
  
  const statusColors = {
    working: 'bg-green-500',
    idle: 'bg-gray-500',
    paused: 'bg-amber-500',
    error: 'bg-red-500'
  };
  
  const Icon = agent.icon;
  
  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        zIndex: 10
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
        opacity: { duration: 0.3 }
      }}
    >
      {/* Agent avatar */}
      <div className="relative">
        <div className={`rounded-full p-2 ${agent.status === 'working' ? 'bg-flow-accent/20' : 'bg-flow-muted/50'}`}>
          <Icon className="h-4 w-4 text-flow-foreground" />
        </div>
        
        {/* Status indicator */}
        <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${statusColors[agent.status]} ${agent.status === 'working' ? 'animate-pulse-subtle' : ''}`}></div>
      </div>
      
      {/* Name tooltip */}
      <div className="mt-1 px-1.5 py-0.5 bg-flow-background/80 rounded text-[0.6rem] whitespace-nowrap">
        {agent.name}
      </div>
      
      {/* Task progress for working agents */}
      {agent.status === 'working' && (
        <div className="mt-1 w-10 h-1 bg-flow-muted rounded-full overflow-hidden">
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
    </motion.div>
  );
};

export default AgentCharacter;
