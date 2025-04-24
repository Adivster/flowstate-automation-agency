
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkle, ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AgentInsightNotificationProps {
  trend: 'up' | 'down' | 'stable';
  message: string;
  className?: string;
}

const AgentInsightNotification: React.FC<AgentInsightNotificationProps> = ({
  trend,
  message,
  className
}) => {
  return (
    <motion.div
      className={cn(
        "absolute top-2 right-2 flex items-center justify-center px-2 py-1 rounded-md text-xs",
        trend === 'up' ? "bg-green-500/20 text-green-200" : 
        trend === 'down' ? "bg-red-500/20 text-red-200" :
        "bg-blue-500/20 text-blue-200",
        className
      )}
      initial={{ opacity: 0, scale: 0.8, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.3,
        type: "spring",
        stiffness: 500,
        damping: 15
      }}
    >
      <div className="flex items-center">
        {trend === 'up' ? (
          <ArrowUp className="h-3 w-3 mr-1" />
        ) : trend === 'down' ? (
          <ArrowDown className="h-3 w-3 mr-1" />
        ) : (
          <ArrowRight className="h-3 w-3 mr-1" />
        )}
        {message}
        <Sparkle className="h-3 w-3 ml-1 animate-pulse" />
      </div>
    </motion.div>
  );
};

export default AgentInsightNotification;
