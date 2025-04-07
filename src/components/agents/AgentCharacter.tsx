
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, PauseCircle, GhostIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AgentMood } from './office/types/officeTypes';

interface Position {
  x: number;
  y: number;
}

interface AgentProps {
  agent: {
    id: number;
    name: string;
    icon: any;
    position: Position;
    status: 'working' | 'idle' | 'paused' | 'error';
    division?: string;
    mood?: AgentMood;
    workload?: number;
  };
  isSelected?: boolean;
  onAgentClick?: (id: number) => void;
  routePath?: Array<{division: string; x: number; y: number;}>;
  style?: React.CSSProperties;
}

const AgentCharacter: React.FC<AgentProps> = ({
  agent,
  isSelected = false,
  onAgentClick,
  routePath = [],
  style
}) => {
  const { t } = useLanguage();
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isTraveling, setIsTraveling] = useState(false);
  
  // Get mood emoji based on agent mood
  const getMoodEmoji = (mood?: AgentMood): string => {
    switch(mood) {
      case 'optimal': return '😎';
      case 'focused': return '🧠';
      case 'learning': return '🤓';
      case 'overwhelmed': return '😓';
      case 'underutilized': return '😴';
      case 'frustrated': return '😤'; 
      case 'confused': return '🤔';
      default: return '';
    }
  };
  
  useEffect(() => {
    if (routePath.length <= 1 || agent.status !== 'working') return;
    
    const travelInterval = setInterval(() => {
      if (agent.status === 'working') {
        setIsTraveling(true);
        setCurrentPosition(prev => (prev + 1) % routePath.length);
        
        // Set traveling to false briefly after position change for animation
        setTimeout(() => setIsTraveling(false), 800);
      }
    }, 25000); // Move every 25 seconds
    
    return () => clearInterval(travelInterval);
  }, [agent.status, routePath]);

  const nextPosition = routePath[currentPosition];
  const agentPos = nextPosition ? { x: nextPosition.x, y: nextPosition.y } : agent.position;
  
  const getStatusIcon = () => {
    switch(agent.status) {
      case 'working': return <CheckCircle className="w-3 h-3 text-green-400" />;
      case 'idle': return <GhostIcon className="w-3 h-3 text-gray-400" />;
      case 'paused': return <PauseCircle className="w-3 h-3 text-amber-400" />;
      case 'error': return <AlertCircle className="w-3 h-3 text-red-400" />;
    }
  };
  
  // Set animation state based on agent status
  const getAnimationState = () => {
    const baseAnimation = { 
      scale: isSelected ? 1.1 : 1, 
      rotate: isTraveling ? [-5, 5] : 0, // Fixed: Using only two keyframes for spring animation
      transition: { 
        duration: isTraveling ? 0.8 : 0.3,
        type: isTraveling ? "spring" : "tween"
      }
    };
    
    switch(agent.status) {
      case 'working': 
        return {
          ...baseAnimation,
          boxShadow: isSelected ? 
            ['0 0 10px rgba(34, 197, 94, 0.4)', '0 0 20px rgba(34, 197, 94, 0.6)'] : // Fixed: Using only two keyframes
            '0 0 5px rgba(34, 197, 94, 0.3)',
        };
      case 'error':
        return {
          ...baseAnimation,
          boxShadow: isSelected ? 
            ['0 0 10px rgba(239, 68, 68, 0.4)', '0 0 20px rgba(239, 68, 68, 0.6)'] : // Fixed: Using only two keyframes
            '0 0 5px rgba(239, 68, 68, 0.3)',
        };
      case 'idle':
      case 'paused':
      default:
        return baseAnimation;
    }
  };
  
  const AgentIcon = agent.icon;
  const statusColor = 
    agent.status === 'working' ? 'bg-green-500' : 
    agent.status === 'idle' ? 'bg-gray-500' : 
    agent.status === 'paused' ? 'bg-amber-500' : 
    'bg-red-500';
  
  const moodEmoji = getMoodEmoji(agent.mood);
  const workloadColor = 
    agent.workload && agent.workload > 90 ? 'bg-red-500' :
    agent.workload && agent.workload > 75 ? 'bg-orange-500' :
    agent.workload && agent.workload > 50 ? 'bg-yellow-500' :
    agent.workload && agent.workload > 25 ? 'bg-green-500' :
    'bg-blue-500';
  
  return (
    <motion.div
      className="absolute" 
      style={{ 
        left: `${agentPos.x}%`, 
        top: `${agentPos.y}%`,
        ...style
      }}
      animate={{
        left: `${agentPos.x}%`,
        top: `${agentPos.y}%`,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
        duration: 2,
      }}
    >
      <motion.div 
        className={`cursor-pointer ${isSelected ? 'relative z-10' : ''}`}
        animate={getAnimationState()}
        transition={{
          boxShadow: {
            repeat: Infinity,
            duration: 2
          }
        }}
        onClick={() => onAgentClick && onAgentClick(agent.id)}
        whileHover={{ scale: 1.1 }}
        title={`${agent.name} - ${t(agent.status)}`}
      >
        <div className={`relative rounded-lg p-1 bg-flow-background/90 border border-flow-border/60
          ${isSelected ? 'ring-2 ring-flow-accent' : ''}
        `}>
          <div className="relative">
            <div className={`rounded p-1.5 ${
              agent.status === 'working' ? 'bg-green-500/10' : 
              agent.status === 'idle' ? 'bg-gray-500/10' : 
              agent.status === 'paused' ? 'bg-amber-500/10' : 
              'bg-red-500/10'
            }`}>
              <AgentIcon className={`w-5 h-5 ${
                agent.status === 'working' ? 'text-green-500' : 
                agent.status === 'idle' ? 'text-gray-500' : 
                agent.status === 'paused' ? 'text-amber-500' : 
                'text-red-500'
              }`} />
            </div>
            <span className={`absolute -top-1 -right-1 w-2 h-2 ${statusColor} rounded-full border border-gray-700`}></span>
            
            {/* Mood and workload indicators */}
            <AnimatePresence>
              {moodEmoji && (
                <motion.div 
                  className="absolute -top-3 -left-1 text-xs"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                >
                  {moodEmoji}
                </motion.div>
              )}
              
              {agent.workload !== undefined && (
                <motion.div 
                  className="absolute -bottom-1 -right-1 w-4 h-1 rounded-full overflow-hidden bg-gray-700/50"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <div 
                    className={`h-full ${workloadColor}`} 
                    style={{ width: `${agent.workload}%` }}
                  ></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {isSelected && (
          <motion.div 
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-medium text-white bg-flow-accent/90 px-1.5 py-0.5 rounded whitespace-nowrap"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            {agent.name}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AgentCharacter;
