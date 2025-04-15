
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AgentIconProps {
  icon: React.ComponentType<any>;
  isSelected: boolean;
  divisionColor?: {
    text: string;
  };
  status: 'working' | 'idle' | 'paused' | 'error';
  onChatClick: (e: React.MouseEvent) => void;
}

export const AgentIcon: React.FC<AgentIconProps> = ({ 
  icon: Icon, 
  isSelected, 
  divisionColor, 
  status, 
  onChatClick 
}) => {
  return (
    <div className="relative z-10">
      <Icon className={`w-6 h-6 transition-transform duration-300 ${
        divisionColor?.text || (
          status === 'working' ? 'text-green-400' : 
          status === 'idle' ? 'text-gray-400' : 
          status === 'paused' ? 'text-amber-400' : 
          'text-red-400'
        )
      }`} />

      <AnimatePresence>
        {isSelected && (
          <motion.button
            className="absolute -bottom-1 -right-1 bg-flow-accent text-white rounded-full p-1.5 
              hover:bg-flow-accent/80 transition-colors shadow-lg shadow-flow-accent/20"
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
