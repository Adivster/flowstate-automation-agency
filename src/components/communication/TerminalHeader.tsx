
import React from 'react';
import { cn } from '@/lib/utils';
import { Terminal, X, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface TerminalHeaderProps {
  clearTerminal: () => void;
  closeTerminal: () => void;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  clearTerminal,
  closeTerminal
}) => {
  return (
    <div className="flex justify-between items-center p-2 border-b border-purple-500/30 bg-black/50">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Terminal className="h-4 w-4 text-purple-400" />
          <motion.div 
            className="absolute inset-0 text-purple-400 blur-sm"
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Terminal className="h-4 w-4" />
          </motion.div>
        </div>
        
        <span className="text-sm font-medium text-cyan-300 font-mono">
          FlowBot@system:<span className="text-purple-300">~$</span>
        </span>
      </div>

      <div className="flex items-center gap-3">
        <motion.button
          onClick={clearTerminal}
          className="p-1 hover:bg-white/10 rounded-md transition-colors flex items-center gap-1 text-cyan-300 text-xs"
          title="Clear Terminal"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="h-3 w-3 opacity-70" />
          <span>Clear</span>
        </motion.button>
        
        <motion.button
          onClick={closeTerminal}
          className="p-1 hover:bg-white/10 rounded-md transition-colors flex items-center gap-1 text-purple-300 text-xs"
          title="Close Terminal"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="h-3 w-3 opacity-70" />
          <span>Close</span>
        </motion.button>
      </div>
      
      {/* Animated status line */}
      <div className="absolute bottom-0 left-0 right-0 h-px">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-cyan-500/50"
          animate={{
            backgroundPosition: ["0% 0%", "100% 0%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ backgroundSize: "200% 100%" }}
        />
      </div>
    </div>
  );
};

export default TerminalHeader;
