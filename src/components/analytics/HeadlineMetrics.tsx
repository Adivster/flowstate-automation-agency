
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card } from '@/components/ui/card';
import { GlassMorphism } from '@/components/ui/GlassMorphism';

type HeadlineMetricsProps = {
  data: any;
};

const HeadlineMetrics: React.FC<HeadlineMetricsProps> = ({ data }) => {
  const metrics = [
    {
      title: 'Total Revenue',
      value: data.totalRevenue,
      change: '+5.2%',
      positive: true,
      tooltip: 'Total revenue generated over the selected period'
    },
    {
      title: 'Conversion Rate',
      value: `${data.conversionRate}%`,
      change: '-0.8%',
      positive: false,
      tooltip: 'Percentage of visitors who completed a desired action'
    },
    {
      title: 'Customer Satisfaction',
      value: `${data.customerSatisfaction}%`,
      change: '+2.1%',
      positive: true,
      tooltip: 'Average customer satisfaction score from feedback'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <GlassMorphism className="p-4 relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm text-flow-foreground/70">{metric.title}</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 text-flow-foreground/50 hover:text-flow-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p className="text-xs">{metric.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-flow-foreground">{metric.value}</span>
                  <span className={`text-xs flex items-center ${metric.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {metric.positive ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {metric.change}
                  </span>
                </div>
              </div>
              
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                metric.positive ? 'bg-green-500/10' : 'bg-red-500/10'
              }`}>
                {metric.positive ? (
                  <TrendingUp className={`h-6 w-6 text-green-500`} />
                ) : (
                  <TrendingDown className={`h-6 w-6 text-red-500`} />
                )}
              </div>
            </div>
            
            <div className="mt-4 h-1 w-full bg-flow-background/30 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${metric.positive ? 'bg-green-500' : 'bg-red-500'}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(Math.abs(parseFloat(metric.change)), 100)}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </GlassMorphism>
        </motion.div>
      ))}
    </div>
  );
};

export default HeadlineMetrics;
