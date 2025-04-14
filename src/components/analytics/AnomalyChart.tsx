
import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Info } from 'lucide-react';
import { LineChart } from '@/components/ui/chart';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AnomalyChartProps {
  data: Array<{ name: string; actual: number; predicted?: number; anomaly?: boolean }>;
  title: string;
  subtitle?: string;
  height?: number;
  showTooltip?: boolean;
  anomalyIndex?: number[];
  className?: string;
}

const AnomalyChart: React.FC<AnomalyChartProps> = ({
  data,
  title,
  subtitle,
  height = 150,
  showTooltip = true,
  anomalyIndex = [],
  className
}) => {
  // Transform data for the chart
  const chartData = data.map(point => ({
    name: point.name,
    value: point.actual,
    predicted: point.predicted || null
  }));

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h4 className="text-sm font-medium">{title}</h4>
          {subtitle && <p className="text-xs text-flow-foreground/60">{subtitle}</p>}
        </div>
        
        {showTooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <Info className="h-3.5 w-3.5 text-flow-foreground/50" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p className="text-xs">Points highlighted in red indicate detected anomalies</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      <div className="relative">
        <LineChart 
          data={chartData}
          height={height}
          lineColor="#82ca9d"
          showXAxis
          showYAxis
          showTooltip
          showGrid={false}
        />
        
        {/* Anomaly highlights */}
        {anomalyIndex.map(index => {
          const point = data[index];
          if (!point) return null;
          
          // Calculate position based on index (approximate)
          const xPosition = `${(index / (data.length - 1)) * 100}%`;
          
          return (
            <motion.div
              key={`anomaly-${index}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + (index * 0.1) }}
              className="absolute"
              style={{ 
                left: xPosition,
                top: '40%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="relative">
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertCircle className="h-3 w-3 text-red-400" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AnomalyChart;
