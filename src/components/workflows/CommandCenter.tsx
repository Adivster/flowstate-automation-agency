
import React from 'react';
import { 
  BarChart3, 
  Server, 
  Workflow,
  Activity, 
  Calendar,
  Clock
} from 'lucide-react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface CommandCenterProps {
  workflowCount: number;
  activeWorkflowCount: number;
  systemStatus: 'healthy' | 'warning' | 'critical';
  timeRange: '1h' | '24h' | '7d' | '30d';
  onTimeRangeChange: (timeRange: '1h' | '24h' | '7d' | '30d') => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  workflowCount,
  activeWorkflowCount,
  systemStatus,
  timeRange,
  onTimeRangeChange
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const getStatusColor = () => {
    switch (systemStatus) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <GlassMorphism intensity="medium" className="rounded-xl p-4 shadow-lg">
        <div className="flex items-center space-x-4 text-foreground">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <Workflow className={cn(
                "w-5 h-5",
                isDark ? "text-orange-400" : "text-orange-500"
              )} />
              <span className="text-sm font-medium">Workflow Status</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
              <span className="text-xs">
                {systemStatus.charAt(0).toUpperCase() + systemStatus.slice(1)} 
              </span>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <Activity className={cn(
                "w-5 h-5",
                isDark ? "text-orange-400" : "text-orange-500"
              )} />
              <span className="text-sm font-medium">Statistics</span>
            </div>
            <span className="text-xs mt-2">
              {activeWorkflowCount}/{workflowCount} Active
            </span>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <Clock className={cn(
                "w-5 h-5",
                isDark ? "text-orange-400" : "text-orange-500"
              )} />
              <span className="text-sm font-medium">Time Range</span>
            </div>
            <Select 
              value={timeRange} 
              onValueChange={(value: string) => {
                if (value === '1h' || value === '24h' || value === '7d' || value === '30d') {
                  onTimeRangeChange(value as '1h' | '24h' | '7d' | '30d');
                }
              }}
            >
              <SelectTrigger className="w-[100px] h-7 text-xs mt-1">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7d</SelectItem>
                <SelectItem value="30d">Last 30d</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </GlassMorphism>
    </div>
  );
};
