
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AgentStatusIndicator } from './AgentStatusIndicator';

interface AgentIconProps {
  icon: React.ComponentType<any>;
  isSelected: boolean;
  divisionColor?: {
    text: string;
    primary?: string;
  };
  status: 'working' | 'idle' | 'paused' | 'error';
  onChatClick: (e: React.MouseEvent) => void;
  enhanced?: boolean;
}

export const AgentIcon: React.FC<AgentIconProps> = ({ 
  icon: Icon, 
  isSelected, 
  divisionColor, 
  status, 
  onChatClick,
  enhanced = true
}) => {
  const getIconColor = () => {
    if (divisionColor?.text) return divisionColor.text;
    
    switch(status) {
      case 'working': return 'text-green-400';
      case 'idle': return 'text-gray-400';
      case 'paused': return 'text-amber-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };
  
  const backgroundPulse = enhanced && status === 'working';
  
  return (
    <div className="relative z-10">
      {/* Icon with background pulse effect when working */}
      <div className="relative">
        {backgroundPulse && (
          <motion.div
            className="absolute inset-0 rounded-full opacity-30"
            style={{ 
              backgroundColor: divisionColor?.primary || '#22C55E',
            }}
            animate={{ 
              opacity: [0.2, 0.4, 0.2],
              scale: [0.8, 1.1, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        
        <Icon className={`w-6 h-6 transition-all duration-300 relative z-10 ${getIconColor()}`} />
      </div>

      {/* Status indicator */}
      <AgentStatusIndicator 
        status={status} 
        size="sm"
        showIcon={enhanced}
        glowEffect={enhanced}
      />

      {/* Chat button appears when selected */}
      <AnimatePresence>
        {isSelected && (
          <motion.button
            className={`absolute -bottom-1 -right-1 text-white rounded-full p-1.5 
              transition-colors shadow-lg
              ${divisionColor?.primary 
                ? `bg-${divisionColor.primary} hover:bg-${divisionColor.primary}/80 shadow-${divisionColor.primary}/20`
                : "bg-flow-accent hover:bg-flow-accent/80 shadow-flow-accent/20"
              }`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={onChatClick}
            title="Chat with agent"
          >
            <MessageCircle className="h-3.5 w-3.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
