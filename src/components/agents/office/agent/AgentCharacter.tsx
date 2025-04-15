
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AgentStatus } from './AgentStatus';
import { AgentTask } from './AgentTask';
import { AgentIcon } from './AgentIcon';
import { useToast } from '@/hooks/use-toast';
import { Position } from '../types/officeTypes';

interface AgentProps {
  agent: {
    id: number;
    name: string;
    icon: any;
    position: Position;
    status: 'working' | 'idle' | 'paused' | 'error';
    division?: string;
    workload?: number;
    currentTask?: {
      type: 'reading' | 'analyzing' | 'experimenting' | 'emailing' | 'writing' | 'searching' | 'coding';
      description: string;
    };
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
  const { toast } = useToast();
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isTraveling, setIsTraveling] = useState(false);
  const [showTaskTooltip, setShowTaskTooltip] = useState(false);

  const statusColor = 
    agent.status === 'working' ? 'bg-green-500' : 
    agent.status === 'idle' ? 'bg-gray-500' : 
    agent.status === 'paused' ? 'bg-amber-500' : 
    'bg-red-500';

  const nextPosition = routePath[currentPosition];
  const agentPos = nextPosition ? { x: nextPosition.x, y: nextPosition.y } : agent.position;

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: `Chat with ${agent.name}`,
      description: `Opening communication channel with ${agent.name}`,
      duration: 3000,
    });
  };

  const handleTaskIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTaskTooltip(!showTaskTooltip);
  };

  return (
    <motion.div
      className="absolute"
      style={{ 
        left: `${agentPos.x}%`, 
        top: `${agentPos.y}%`,
        filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.25))',
        zIndex: isSelected ? 50 : agent.status === 'working' ? 20 : 10,
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
        className={`cursor-pointer ${isSelected ? 'relative z-30' : ''}`}
        whileHover={{ scale: 1.1 }}
        onClick={() => onAgentClick && onAgentClick(agent.id)}
        title={`${agent.name} - ${agent.status}${agent.currentTask ? ` - ${agent.currentTask.description}` : ''}`}
      >
        <div className={`relative rounded-full p-1.5 backdrop-blur-sm border-2 ${
          isSelected ? `border-${divisionColor?.primary || 'flow-accent'} shadow-lg` : 'border-transparent'
        }`}>
          <div className={`relative rounded-full p-2.5 bg-gray-950/90 group transition-all duration-300 ease-out
            ${isSelected ? `ring-2 ring-offset-1 ring-offset-black ring-${divisionColor?.primary || 'flow-accent'}` : ''}
          `}>
            <div 
              className="absolute inset-0 rounded-full opacity-75 blur-sm transition-opacity duration-300"
              style={{ 
                backgroundColor: divisionColor?.glow || getStatusColor(agent.status),
                opacity: agent.status === 'working' ? 0.5 : 0.3
              }}
            />

            <AgentIcon
              icon={agent.icon}
              isSelected={isSelected}
              divisionColor={divisionColor}
              status={agent.status}
              onChatClick={handleChatClick}
            />

            {agent.currentTask && (
              <AgentTask
                task={agent.currentTask}
                showTooltip={showTaskTooltip}
                onTaskClick={handleTaskIconClick}
              />
            )}

            <AgentStatus status={agent.status} statusColor={statusColor} />
          </div>
        </div>

        <AnimatePresence>
          {isSelected && (
            <motion.div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-2 py-1 
                bg-gray-950/90 border border-flow-accent/50 rounded-md backdrop-blur-sm
                shadow-lg shadow-flow-accent/20 z-40"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              <span className="text-xs font-medium text-flow-accent">
                {agent.name}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AgentCharacter;

const getStatusColor = (status: 'working' | 'idle' | 'paused' | 'error') => {
  switch(status) {
    case 'working': return 'rgba(34, 197, 94, 0.9)';
    case 'idle': return 'rgba(148, 163, 184, 0.9)';
    case 'paused': return 'rgba(245, 158, 11, 0.9)';
    case 'error': return 'rgba(239, 68, 68, 0.9)';
    default: return 'rgba(148, 163, 184, 0.9)';
  }
};
