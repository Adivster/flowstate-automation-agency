
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Lightbulb, Beaker, Mail, Pen, FileSearch, FileCode } from 'lucide-react';

interface AgentTaskProps {
  task?: {
    type: 'reading' | 'analyzing' | 'experimenting' | 'emailing' | 'writing' | 'searching' | 'coding';
    description: string;
  };
  showTooltip: boolean;
  onTaskClick: (e: React.MouseEvent) => void;
}

export const AgentTask: React.FC<AgentTaskProps> = ({ task, showTooltip, onTaskClick }) => {
  const getTaskIcon = () => {
    if (!task) return null;
    
    switch(task.type) {
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

  const getTaskColorClass = () => {
    switch(task?.type) {
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

  if (!task) return null;

  return (
    <motion.div 
      className={`absolute -top-3 -left-3 w-8 h-8 rounded-full ${getTaskColorClass()} 
        flex items-center justify-center cursor-pointer transition-all duration-300
        hover:scale-110 z-20 border-2`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      onClick={onTaskClick}
    >
      <div className="p-1.5">
        {getTaskIcon()}
      </div>
      
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-950/95 
              text-white text-xs px-3 py-1.5 rounded-md shadow-lg border border-gray-800
              min-w-[160px] z-50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="font-medium">{task.description}</div>
            <div className="mt-1 text-[10px] text-white/70 capitalize">
              {task.type}
            </div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 rotate-45 
              w-2 h-2 bg-gray-950/95 border-b border-r border-gray-800"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
