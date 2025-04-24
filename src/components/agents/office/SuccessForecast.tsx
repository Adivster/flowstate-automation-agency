
import React from 'react';
import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ForecastData {
  metric: string;
  value: number;
  unit: string;
  confidence: number;
}

interface SuccessForecastProps {
  data: ForecastData;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SuccessForecast: React.FC<SuccessForecastProps> = ({ 
  data, 
  className,
  size = 'md' 
}) => {
  const getTextSizeClass = () => {
    switch(size) {
      case 'sm': return 'text-xs';
      case 'lg': return 'text-base';
      default: return 'text-sm';
    }
  };

  const getIconSizeClass = () => {
    switch(size) {
      case 'sm': return 'h-3 w-3';
      case 'lg': return 'h-5 w-5';
      default: return 'h-4 w-4';
    }
  };

  return (
    <motion.div 
      className={cn(
        "flex items-center text-emerald-400",
        getTextSizeClass(),
        className
      )}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Zap className={cn("mr-1", getIconSizeClass())} />
      <span className="font-medium">Success Forecast:</span>
      <span className="ml-1">
        +{data.value} {data.unit}
        <span className="text-emerald-400/70"> (±{data.confidence})</span>
      </span>
      
      <motion.div 
        className="ml-2 h-1 w-16 bg-emerald-400/20 rounded-full overflow-hidden"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div 
          className="h-full bg-emerald-400"
          style={{ width: `${Math.min(data.value * 10, 100)}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(data.value * 10, 100)}%` }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default SuccessForecast;
