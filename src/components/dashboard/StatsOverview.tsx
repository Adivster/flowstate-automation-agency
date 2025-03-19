
import React from 'react';
import { Activity, Zap, Clock, Server } from 'lucide-react';
import TransitionWrapper from '../ui/TransitionWrapper';
import GlassMorphism from '../ui/GlassMorphism';
import { cn } from '@/lib/utils';

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const StatItem: React.FC<StatItemProps> = ({
  icon,
  label,
  value,
  trend,
  trendValue,
  className,
}) => {
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500';

  return (
    <GlassMorphism 
      className={cn(
        'p-6 rounded-xl flex items-start justify-between transition-all duration-300 hover:shadow-md', 
        className
      )}
    >
      <div className="space-y-2">
        <p className="text-sm font-medium text-flow-foreground/60">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
        {trend && trendValue && (
          <p className={`text-xs font-medium ${trendColor} flex items-center`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
            {' '}
            {trendValue}
          </p>
        )}
      </div>
      <div className="rounded-full p-2 bg-flow-muted/50">
        {icon}
      </div>
    </GlassMorphism>
  );
};

const StatsOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <TransitionWrapper delay={100}>
        <StatItem
          icon={<Activity className="h-5 w-5 text-blue-500" />}
          label="Active Agents"
          value="24"
          trend="up"
          trendValue="12% from last week"
        />
      </TransitionWrapper>
      
      <TransitionWrapper delay={200}>
        <StatItem
          icon={<Zap className="h-5 w-5 text-yellow-500" />}
          label="Tasks Completed"
          value="1,248"
          trend="up"
          trendValue="8% from yesterday"
        />
      </TransitionWrapper>
      
      <TransitionWrapper delay={300}>
        <StatItem
          icon={<Clock className="h-5 w-5 text-purple-500" />}
          label="Avg. Response Time"
          value="1.2s"
          trend="down"
          trendValue="5% improvement"
        />
      </TransitionWrapper>
      
      <TransitionWrapper delay={400}>
        <StatItem
          icon={<Server className="h-5 w-5 text-green-500" />}
          label="System Load"
          value="42%"
          trend="neutral"
          trendValue="Stable"
        />
      </TransitionWrapper>
    </div>
  );
};

export default StatsOverview;
