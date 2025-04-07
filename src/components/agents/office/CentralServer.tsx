
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

const CentralServer: React.FC = () => {
  return (
    <motion.div 
      className="absolute left-1/2 top-[15%] -translate-x-1/2 w-10 h-18 bg-blue-900 dark:bg-blue-800 rounded-sm border border-flow-accent/70 flex flex-col items-center justify-center gap-1 overflow-hidden z-20"
      animate={{ 
        boxShadow: ['0 0 5px rgba(99, 102, 241, 0.3)', '0 0 15px rgba(99, 102, 241, 0.5)']  // Using only two keyframes
      }}
      transition={{ 
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      <div className="w-6 h-1 bg-flow-accent/80 rounded-sm">
        <div className="h-full bg-white/80 animate-pulse" style={{ width: '30%' }}></div>
      </div>
      <div className="w-6 h-1 bg-green-500/80 rounded-sm">
        <div className="h-full bg-white/80 animate-pulse" style={{ width: '60%', animationDelay: '0.3s' }}></div>
      </div>
      <div className="w-6 h-1 bg-purple-500/80 rounded-sm">
        <div className="h-full bg-white/80 animate-pulse" style={{ width: '45%', animationDelay: '0.6s' }}></div>
      </div>
      <Cpu className="w-5 h-5 text-flow-accent/90" />
    </motion.div>
  );
};

export default CentralServer;
