
import React from 'react';
import { motion } from 'framer-motion';
import { ChartBar, Activity, Code } from 'lucide-react';

interface HolographicElementProps {
  type: string;
  x: number;
  y: number;
  size?: number;
}

const HolographicElement: React.FC<HolographicElementProps> = ({ type, x, y, size = 4 }) => {
  const getHologram = () => {
    switch(type) {
      case 'chart':
        return (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-flow-accent/10 rounded-md backdrop-blur-sm border border-flow-accent/20"></div>
            <ChartBar className="absolute inset-0 m-auto w-2/3 h-2/3 text-flow-accent/80" />
            <motion.div 
              className="absolute inset-0 bg-flow-accent/5 rounded-md"
              animate={{ opacity: [0.2, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            />
          </div>
        );
      case 'data':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-cyan-500/10 rounded-md backdrop-blur-sm border border-cyan-500/20"></div>
            <Activity className="absolute w-2/3 h-2/3 text-cyan-400/80" />
            <motion.div 
              className="absolute inset-0 bg-cyan-500/5 rounded-md"
              animate={{ opacity: [0.2, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
          </div>
        );
      case 'code':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-green-500/10 rounded-md backdrop-blur-sm border border-green-500/20"></div>
            <Code className="absolute w-2/3 h-2/3 text-green-400/80" />
            <motion.div 
              className="absolute inset-0 bg-green-500/5 rounded-md"
              animate={{ opacity: [0.2, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
            />
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <motion.div 
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}%`,
        height: `${size}%`,
        zIndex: 15
      }}
      initial={{ opacity: 0.5, scale: 0.9 }}
      animate={{ 
        opacity: [0.7, 0.9], 
        scale: [1, 1.05],
        y: [-2, 2]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      {getHologram()}
    </motion.div>
  );
};

export default HolographicElement;
