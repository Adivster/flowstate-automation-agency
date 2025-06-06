
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, AlertCircle, PauseCircle, GhostIcon, MessageCircle,
  Book, BookOpen, Lightbulb, Beaker, Mail, Pen, FileSearch, FileCode
} from 'lucide-react';
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
  const { t } = useLanguage();
  const { toast } = useToast();
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isTraveling, setIsTraveling] = useState(false);
  const [showTaskTooltip, setShowTaskTooltip] = useState(false);
  
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
        
        setTimeout(() => setIsTraveling(false), 800);
      }
    }, 25000);
    
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
  
  const getTaskIcon = () => {
    if (!agent.currentTask) return null;
    
    switch(agent.currentTask.type) {
      case 'reading': return <Book className="w-4 h-4 text-blue-400" />;
      case 'analyzing': return <Lightbulb className="w-4 h-4 text-yellow-400" />;
      case 'experimenting': return <Beaker className="w-4 h-4 text-purple-400" />;
      case 'emailing': return <Mail className="w-4 h-4 text-green-400" />;
      case 'writing': return <Pen className="w-4 h-4 text-cyan-400" />;
      case 'searching': return <FileSearch className="w-4 h-4 text-orange-400" />;
      case 'coding': return <FileCode className="w-4 h-4 text-pink-400" />;
      default: return null;
    }
  };

  const getStatusColor = () => {
    switch(agent.status) {
      case 'working': return 'rgba(34, 197, 94, 0.9)';
      case 'idle': return 'rgba(148, 163, 184, 0.9)';
      case 'paused': return 'rgba(245, 158, 11, 0.9)';
      case 'error': return 'rgba(239, 68, 68, 0.9)';
      default: return 'rgba(148, 163, 184, 0.9)';
    }
  };

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

  const getTaskColorClass = () => {
    switch(agent.currentTask?.type) {
      case 'reading': return 'bg-blue-600/30 border-blue-400/50';
      case 'analyzing': return 'bg-yellow-600/30 border-yellow-400/50';
      case 'experimenting': return 'bg-purple-600/30 border-purple-400/50';
      case 'emailing': return 'bg-green-600/30 border-green-400/50';
      case 'writing': return 'bg-cyan-600/30 border-cyan-400/50';
      case 'searching': return 'bg-orange-600/30 border-orange-400/50';
      case 'coding': return 'bg-pink-600/30 border-pink-400/50';
      default: return 'bg-gray-600/30 border-gray-400/50';
    }
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
        title={`${agent.name} - ${t(agent.status)}${agent.currentTask ? ` - ${agent.currentTask.description}` : ''}`}
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
                backgroundColor: divisionColor?.glow || getStatusColor(),
                opacity: agent.status === 'working' ? 0.5 : 0.3
              }}
            />
            
            <div className="relative z-10">
              <AgentIcon className={`w-6 h-6 transition-transform duration-300 ${
                divisionColor?.text || (
                  agent.status === 'working' ? 'text-green-400' : 
                  agent.status === 'idle' ? 'text-gray-400' : 
                  agent.status === 'paused' ? 'text-amber-400' : 
                  'text-red-400'
                )
              }`} />
            </div>

            {agent.currentTask && (
              <motion.div 
                className={`absolute -top-3 -left-3 w-8 h-8 rounded-full ${getTaskColorClass()} 
                  flex items-center justify-center cursor-pointer transition-all duration-300
                  hover:scale-110 z-20 border-2`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={handleTaskIconClick}
              >
                <div className="p-1.5">
                  {getTaskIcon()}
                </div>
                
                <AnimatePresence>
                  {showTaskTooltip && (
                    <motion.div
                      className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-950/95 
                        text-white text-xs px-3 py-1.5 rounded-md shadow-lg border border-gray-800
                        min-w-[160px] z-50 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="font-medium">{agent.currentTask.description}</div>
                      <div className="mt-1 text-[10px] text-white/70 capitalize">
                        {agent.currentTask.type}
                      </div>
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 rotate-45 
                        w-2 h-2 bg-gray-950/95 border-b border-r border-gray-800"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            <span 
              className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-gray-950 
                ${statusColor}
                ${agent.status === 'working' ? 'animate-pulse' : ''}
              `}
            />

            <AnimatePresence>
              {isSelected && (
                <motion.button
                  className="absolute -bottom-1 -right-1 bg-flow-accent text-white rounded-full p-1.5 
                    hover:bg-flow-accent/80 transition-colors shadow-lg shadow-flow-accent/20"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  onClick={handleChatClick}
                  title="Chat with agent"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                </motion.button>
              )}
            </AnimatePresence>
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
