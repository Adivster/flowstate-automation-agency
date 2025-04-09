
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, PauseCircle, GhostIcon, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AgentMood } from './office/types/officeTypes';
import { useToast } from '@/hooks/use-toast';

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
  divisionColor?: {
    bg: string;
    text: string;
    border: string;
    primary: string;
    glow: string;
  };
}

const AgentCharacter: React.FC<AgentProps> = ({
  agent,
  isSelected = false,
  onAgentClick,
  routePath = [],
  style,
  divisionColor
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isTraveling, setIsTraveling] = useState(false);
  
  // Use division colors or fallback to default colors
  const bgColor = divisionColor ? divisionColor.bg : 'bg-flow-accent/20';
  const textColor = divisionColor ? divisionColor.text : 'text-flow-accent';
  const borderColor = divisionColor ? `border-${divisionColor.primary}` : 'border-flow-accent/50';
  const glowColor = divisionColor ? divisionColor.glow : 'rgba(85,120,255,0.3)';
  
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
      rotate: isTraveling ? [-5, 5] : 0,
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
            ['0 0 10px rgba(34, 197, 94, 0.4)', '0 0 20px rgba(34, 197, 94, 0.6)'] :
            `0 0 5px ${glowColor}`,
        };
      case 'error':
        return {
          ...baseAnimation,
          boxShadow: isSelected ? 
            ['0 0 10px rgba(239, 68, 68, 0.4)', '0 0 20px rgba(239, 68, 68, 0.6)'] :
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
  
  const workloadColor = 
    agent.workload && agent.workload > 90 ? 'bg-red-500' :
    agent.workload && agent.workload > 75 ? 'bg-orange-500' :
    agent.workload && agent.workload > 50 ? 'bg-yellow-500' :
    agent.workload && agent.workload > 25 ? 'bg-green-500' :
    'bg-blue-500';
  
  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: `Chat with ${agent.name}`,
      description: `Opening communication channel with ${agent.name}`,
      duration: 3000,
    });
  };
  
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
        <div className={`relative rounded-full p-1 bg-flow-background/90 border ${borderColor} ${
          isSelected ? 'ring-2 ring-flow-accent' : ''
        }`}>
          <div className="relative">
            <div className={`rounded-full p-1.5 ${
              agent.status === 'working' ? bgColor : 
              agent.status === 'idle' ? 'bg-gray-500/10' : 
              agent.status === 'paused' ? 'bg-amber-500/10' : 
              'bg-red-500/10'
            }`}>
              <AgentIcon className={`w-5 h-5 ${
                agent.status === 'working' ? textColor : 
                agent.status === 'idle' ? 'text-gray-500' : 
                agent.status === 'paused' ? 'text-amber-500' : 
                'text-red-500'
              }`} />
              
              {/* Task completion indicator - clearer ring around agent */}
              {agent.workload !== undefined && agent.status === 'working' && (
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle 
                    cx="50%" 
                    cy="50%" 
                    r="47%" 
                    fill="none" 
                    strokeWidth="2"
                    stroke={agent.workload > 90 ? '#ef4444' : 
                           agent.workload > 75 ? '#f97316' : 
                           agent.workload > 50 ? '#eab308' : 
                           agent.workload > 25 ? '#22c55e' : 
                           '#3b82f6'}
                    strokeDasharray={`${agent.workload} 100`}
                    className="opacity-90"
                  />
                </svg>
              )}
            </div>
            <span className={`absolute -top-1 -right-1 w-2 h-2 ${statusColor} rounded-full border border-gray-700 ${agent.status === 'working' ? 'animate-pulse' : ''}`}></span>
            
            {/* Chat button */}
            <AnimatePresence>
              {isSelected && (
                <motion.button
                  className="absolute -bottom-1 -right-1 bg-flow-accent text-white rounded-full p-0.5 hover:bg-flow-accent/80 transition-colors"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  onClick={handleChatClick}
                  title="Chat with agent"
                >
                  <MessageCircle className="h-3 w-3" />
                </motion.button>
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
