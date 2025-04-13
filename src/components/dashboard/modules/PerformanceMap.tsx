
import React from 'react';
import { Card } from '@/components/ui/card';
import { ChevronRight, BarChart, Activity, Clock, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart } from '@/components/ui/chart';
import { usePerformanceData } from '@/hooks/usePerformanceData';

const PerformanceMap: React.FC = () => {
  const performanceData = usePerformanceData();

  const StatCard = ({ icon: Icon, title, value, trend, trendValue, upward = false }) => (
    <div className="bg-black/20 border border-flow-border/10 rounded-md p-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-xs text-flow-foreground/60">{title}</div>
          <div className="text-lg font-medium mt-1 font-mono">{value}</div>
          {trend && (
            <div className="flex items-center mt-1 text-xs">
              {upward ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={upward ? "text-green-500" : "text-red-500"}>
                {trendValue}
              </span>
              <span className="text-flow-foreground/50 ml-1">{trend}</span>
            </div>
          )}
        </div>
        <div className={`p-2 rounded-full ${upward ? 'bg-green-500/10' : trend ? 'bg-red-500/10' : 'bg-flow-border/10'}`}>
          <Icon className={`h-4 w-4 ${upward ? 'text-green-400' : trend ? 'text-red-400' : 'text-flow-foreground/50'}`} />
        </div>
      </div>
    </div>
  );

  return (
    <Card className="p-4 border-flow-border/30 bg-black/30 backdrop-blur-md h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium neon-text-orange flex items-center">
          <BarChart className="mr-2 h-5 w-5 text-orange-400" />
          Performance Map
        </h3>
        <motion.div whileHover={{ x: 3 }} transition={{ type: 'spring', stiffness: 400 }}>
          <a href="#" className="text-xs text-flow-foreground/70 hover:text-flow-accent flex items-center">
            View Analytics <ChevronRight className="ml-1 h-3 w-3" />
          </a>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <StatCard 
          icon={Activity} 
          title="Tasks Completed" 
          value="583" 
          trend="this week" 
          trendValue="+12%" 
          upward={true} 
        />
        <StatCard 
          icon={Clock} 
          title="Avg Response" 
          value="278ms" 
          trend="from last week" 
          trendValue="-5%" 
          upward={true} 
        />
        <StatCard 
          icon={BarChart} 
          title="System Load" 
          value="32%" 
          trend="from average" 
          trendValue="+8%" 
          upward={false} 
        />
        <StatCard 
          icon={Users} 
          title="Active Agents" 
          value="14" 
          trend="daily" 
          trendValue="+2" 
          upward={true}
        />
      </div>
      
      <div className="h-24 mt-3 mb-2">
        <AreaChart 
          data={performanceData.historicalData.taskCompletion}
          showGrid={false}
          showLegend={false}
          showXAxis={true}
          showYAxis={false}
          referenceLineY={50}
          referenceLineLabel="Target"
          lineColor="#f97316"
        />
      </div>
      
      <div className="text-xs text-center text-flow-foreground/50">
        Weekly Task Completion Trend
      </div>
    </Card>
  );
};

export default PerformanceMap;
