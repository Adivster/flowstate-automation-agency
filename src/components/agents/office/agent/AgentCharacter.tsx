import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AgentStatus } from './AgentStatus';
import { AgentTask } from './AgentTask';
import { AgentIcon } from './AgentIcon';
import { useToast } from '@/hooks/use-toast';
import MiniSparkline from '../MiniSparkline';

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
    workload?: number;
    performanceData?: number[];
    efficiency?: number;
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
  showPerformanceData?: boolean;
}

const AgentCharacter: React.FC<AgentProps> = ({
  agent,
  isSelected = false,
  onAgentClick,
  routePath = [],
  style,
  divisionColor,
  showPerformanceData = false
}) => {
  const { toast } = useToast();
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isTraveling, setIsTraveling] = useState(false);
  const [showTaskTooltip, setShowTaskTooltip] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [isPulsing, setIsPulsing] = useState(agent.status === 'working');
  const [pulseInterval, setPulseInterval] = useState<NodeJS.Timeout | null>(null);

  const statusColor = 
    agent.status === 'working' ? 'bg-green-500' : 
    agent.status === 'idle' ? 'bg-gray-500' : 
    agent.status === 'paused' ? 'bg-amber-500' : 
    'bg-red-500';

  useEffect(() => {
    if (routePath.length <= 1 || agent.status !== 'working') return;
    
    const moveInterval = setInterval(() => {
      if (agent.status === 'working') {
        setIsTraveling(true);
        setCurrentPosition(prev => (prev + 1) % routePath.length);
        
        setTimeout(() => setIsTraveling(false), 800);
      }
    }, Math.random() * 15000 + 20000); // Random interval between 20-35 seconds
    
    return () => clearInterval(moveInterval);
  }, [agent.status, routePath]);

  useEffect(() => {
    if (agent.status === 'working' && !pulseInterval) {
      const interval = setInterval(() => {
        setIsPulsing(prev => !prev);
      }, Math.random() * 5000 + 5000); // Random interval between 5-10 seconds
      setPulseInterval(interval);
    } else if (agent.status !== 'working' && pulseInterval) {
      clearInterval(pulseInterval);
      setPulseInterval(null);
      setIsPulsing(false);
    }
    
    return () => {
      if (pulseInterval) clearInterval(pulseInterval);
    };
  }, [agent.status]);

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

  const handleStatsToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowStats(!showStats);
  };

  return (
    <motion.div
      className="absolute"
      style={{ 
        left: `${agentPos.x}%`, 
        top: `${agentPos.y}%`,
        filter: isSelected ? 'drop-shadow(0 0 12px rgba(0, 0, 0, 0.35))' : 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.25))',
        zIndex: isSelected ? 50 : agent.status === 'working' ? 20 : 10,
        ...style
      }}
      animate={{
        left: `${agentPos.x}%`,
        top: `${agentPos.y}%`,
        scale: agent.status === 'error' ? [1, 1.05, 1] : 1,
        rotate: isTraveling ? [-3, 3] : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
        duration: 2,
        ...(agent.status === 'error' ? {
          scale: {
            repeat: Infinity,
            duration: 2
          }
        } : {}),
        ...(isTraveling ? {
          rotate: {
            duration: 0.3,
            repeat: Infinity,
            repeatType: "reverse"
          }
        } : {})
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
            <AnimatePresence>
              {isPulsing && (
                <motion.div 
                  className="absolute inset-0 rounded-full opacity-75 blur-sm transition-opacity duration-300"
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity
                  }}
                  style={{ 
                    backgroundColor: divisionColor?.glow || getStatusColor(agent.status),
                  }}
                />
              )}
            </AnimatePresence>
            
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
            
            {showPerformanceData && agent.performanceData && agent.performanceData.length > 0 && (
              <motion.div 
                className="absolute -top-1 -right-1 bg-black/90 rounded-full h-5 w-5 flex items-center justify-center cursor-pointer border border-white/20"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleStatsToggle}
              >
                <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="M18 9l-5 5-2.5-2.5L3 19" />
                </svg>
              </motion.div>
            )}
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
        
        <AnimatePresence>
          {(showPerformanceData && showStats && agent.performanceData && agent.performanceData.length > 0) && (
            <motion.div 
              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 p-2 
                bg-gray-950/90 border border-flow-accent/50 rounded-md backdrop-blur-sm
                shadow-lg shadow-flow-accent/20 z-50 w-32"
              initial={{ opacity: 0, scale: 0.9, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -5 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-gray-400">Performance</span>
                <span className="text-[10px] font-medium text-white">
                  {agent.efficiency !== undefined ? `${agent.efficiency}%` : 'N/A'}
                </span>
              </div>
              <div className="h-10">
                <MiniSparkline 
                  data={agent.performanceData} 
                  width={100} 
                  height={30}
                  color={divisionColor?.primary || '#6366f1'}
                  fillOpacity={0.3}
                  animated={true}
                />
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[10px] text-gray-400">Workload</span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-medium text-white">
                    {agent.workload !== undefined ? `${agent.workload}%` : 'N/A'}
                  </span>
                  <div 
                    className="w-10 h-1 bg-white/10 rounded-full overflow-hidden"
                    style={{ 
                      background: agent.workload !== undefined ? 
                        `linear-gradient(to right, 
                        ${agent.workload > 80 ? '#ef4444' : agent.workload > 60 ? '#f59e0b' : '#22c55e'} ${agent.workload}%, 
                        rgba(255,255,255,0.1) ${agent.workload}%)` 
                        : 'rgba(255,255,255,0.1)'
                    }}
                  />
                </div>
              </div>
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
