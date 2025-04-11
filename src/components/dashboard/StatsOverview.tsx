
import React from 'react';
import { Activity, Zap, Clock, Server, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import TransitionWrapper from '../ui/TransitionWrapper';
import GlassMorphism from '../ui/GlassMorphism';
import { cn } from '@/lib/utils';
import { LineChart } from '../ui/chart';
import { Badge } from '../ui/badge';
import { motion } from 'framer-motion';

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  chartData?: { name: string; value: number }[];
  color?: string;
  className?: string;
}

const StatItem: React.FC<StatItemProps> = ({
  icon,
  label,
  value,
  trend,
  trendValue,
  chartData,
  color = '#8884d8',
  className,
}) => {
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500';
  
  return (
    <motion.div
      whileHover={{ translateY: -4 }}
      transition={{ duration: 0.2 }}
    >
      <GlassMorphism 
        className={cn(
          'p-6 rounded-xl flex flex-col transition-all duration-300 hover:shadow-md hover:border-opacity-50',
          className
        )}
        style={{ borderColor: `${color}40` }}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="rounded-full p-2" style={{ backgroundColor: `${color}20` }}>
            {icon}
          </div>
          <Badge 
            variant="outline" 
            className={`text-xs flex items-center bg-opacity-20 ${trendColor}`}
            style={{ 
              backgroundColor: trend === 'up' ? 'rgba(34, 197, 94, 0.1)' : 
                              trend === 'down' ? 'rgba(239, 68, 68, 0.1)' : 
                              'rgba(100, 116, 139, 0.1)',
              borderColor: trend === 'up' ? 'rgba(34, 197, 94, 0.3)' : 
                          trend === 'down' ? 'rgba(239, 68, 68, 0.3)' : 
                          'rgba(100, 116, 139, 0.3)'
            }}
          >
            {trend === 'up' ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : trend === 'down' ? (
              <TrendingDown className="h-3 w-3 mr-1" />
            ) : (
              <ArrowRight className="h-3 w-3 mr-1" />
            )}
            {trendValue}
          </Badge>
        </div>
        
        <div className="mt-2 mb-4">
          <p className="text-sm font-medium text-flow-foreground/60">{label}</p>
          <p className="text-2xl font-semibold" style={{ color }}>{value}</p>
        </div>
        
        {chartData && (
          <div className="mt-auto h-[50px] -mx-2 -mb-2">
            <LineChart 
              data={chartData} 
              lineColor={color}
              height={50}
              dotColor="#fef3c7"
            />
          </div>
        )}
      </GlassMorphism>
    </motion.div>
  );
};

const StatsOverview: React.FC = () => {
  // Enhanced chart data with more points for better visualization
  const agentData = [
    { name: "Mon", value: 18 },
    { name: "Tue", value: 20 },
    { name: "Wed", value: 22 },
    { name: "Thu", value: 21 },
    { name: "Fri", value: 24 },
    { name: "Sat", value: 26 },
    { name: "Sun", value: 28 },
  ];
  
  const tasksData = [
    { name: "Mon", value: 980 },
    { name: "Tue", value: 1100 },
    { name: "Wed", value: 1180 },
    { name: "Thu", value: 1220 },
    { name: "Fri", value: 1248 },
    { name: "Sat", value: 1290 },
    { name: "Sun", value: 1310 },
  ];
  
  const responseData = [
    { name: "Mon", value: 1.8 },
    { name: "Tue", value: 1.5 },
    { name: "Wed", value: 1.3 },
    { name: "Thu", value: 1.4 },
    { name: "Fri", value: 1.2 },
    { name: "Sat", value: 1.1 },
    { name: "Sun", value: 1.0 },
  ];
  
  const loadData = [
    { name: "Mon", value: 40 },
    { name: "Tue", value: 38 },
    { name: "Wed", value: 45 },
    { name: "Thu", value: 40 },
    { name: "Fri", value: 42 },
    { name: "Sat", value: 38 },
    { name: "Sun", value: 36 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <TransitionWrapper delay={100}>
        <StatItem
          icon={<Activity className="h-5 w-5" style={{ color: '#0ea5e9' }} />}
          label="Active Agents"
          value="28"
          trend="up"
          trendValue="16%"
          chartData={agentData}
          color="#0ea5e9"
        />
      </TransitionWrapper>
      
      <TransitionWrapper delay={200}>
        <StatItem
          icon={<Zap className="h-5 w-5" style={{ color: '#f97316' }} />}
          label="Tasks Completed"
          value="1,310"
          trend="up"
          trendValue="12%"
          chartData={tasksData}
          color="#f97316"
        />
      </TransitionWrapper>
      
      <TransitionWrapper delay={300}>
        <StatItem
          icon={<Clock className="h-5 w-5" style={{ color: '#8b5cf6' }} />}
          label="Avg. Response Time"
          value="1.0s"
          trend="down"
          trendValue="20%"
          chartData={responseData}
          color="#8b5cf6"
        />
      </TransitionWrapper>
      
      <TransitionWrapper delay={400}>
        <StatItem
          icon={<Server className="h-5 w-5" style={{ color: '#22c55e' }} />}
          label="System Load"
          value="36%"
          trend="neutral"
          trendValue="Optimal"
          chartData={loadData}
          color="#22c55e"
        />
      </TransitionWrapper>
    </div>
  );
};

export default StatsOverview;
