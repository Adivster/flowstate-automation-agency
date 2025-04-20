
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, PauseCircle, AlertTriangle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AgentStatusIndicatorProps {
  status: 'working' | 'idle' | 'paused' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  glowEffect?: boolean;
}

export const AgentStatusIndicator: React.FC<AgentStatusIndicatorProps> = ({
  status,
  size = 'md',
  showIcon = true,
  glowEffect = true
}) => {
  const getSizeClasses = () => {
    switch(size) {
      case 'sm': return 'h-2 w-2';
      case 'lg': return 'h-4 w-4';
      case 'md':
      default: return 'h-3 w-3';
    }
  };
  
  const getStatusColor = () => {
    switch(status) {
      case 'working': return 'bg-green-500';
      case 'idle': return 'bg-gray-500';
      case 'paused': return 'bg-amber-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getIconColor = () => {
    switch(status) {
      case 'working': return 'text-green-500';
      case 'idle': return 'text-gray-500';
      case 'paused': return 'text-amber-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };
  
  const getStatusIcon = () => {
    switch(status) {
      case 'working': return <CheckCircle className={cn("h-full w-full")} />;
      case 'idle': return <Clock className={cn("h-full w-full")} />;
      case 'paused': return <PauseCircle className={cn("h-full w-full")} />;
      case 'error': return <AlertTriangle className={cn("h-full w-full")} />;
      default: return null;
    }
  };
  
  const getAnimationProps = () => {
    switch(status) {
      case 'working':
        return {
          animate: { 
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          },
          transition: { 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        };
      case 'error':
        return {
          animate: { 
            scale: [1, 1.1, 1],
            opacity: [0.9, 1, 0.9]
          },
          transition: { 
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        };
      default:
        return {};
    }
  };
  
  return showIcon ? (
    <motion.div
      className={cn(
        `${getIconColor()} absolute -top-0.5 -right-0.5`,
        getSizeClasses()
      )}
      {...getAnimationProps()}
    >
      {getStatusIcon()}
      
      {glowEffect && (status === 'working' || status === 'error') && (
        <div 
          className={cn(
            "absolute inset-0 rounded-full blur-sm -z-10",
            status === 'working' ? "bg-green-500/50" : "bg-red-500/50"
          )}
        ></div>
      )}
    </motion.div>
  ) : (
    <motion.span 
      className={cn(
        "absolute -top-0.5 -right-0.5 rounded-full border-2 border-gray-950", 
        getSizeClasses(),
        getStatusColor(),
        status === 'working' && "animate-pulse"
      )}
      {...getAnimationProps()}
    />
  );
};
