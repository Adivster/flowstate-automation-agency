
import React, { useState, useEffect, useRef } from 'react';
import { LineChart } from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, ArrowRight, Info, Clock, Zap, Database, Activity, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SolarpunkPanel } from '@/components/ui/design-system/SolarpunkPanel';

// Types for workflow performance data
export interface WorkflowPerformancePoint {
  name: string;
  value: number;
  timestamp: string;
  annotation?: string;
  event?: string;
}

export interface WorkflowPerformanceData {
  id: string;
  name: string;
  data: WorkflowPerformancePoint[];
  currentEfficiency: number;
  changePercentage: number;
  trend: 'up' | 'down' | 'neutral';
  color?: string;
  averageCompletionTime?: number;
  successRate?: number;
}

interface WorkflowPerformanceChartProps {
  workflowData: WorkflowPerformanceData;
  height?: number;
  showControls?: boolean;
  interactive?: boolean;
  minimal?: boolean;
  onViewDetails?: (workflow: WorkflowPerformanceData) => void;
}

const WorkflowPerformanceChart: React.FC<WorkflowPerformanceChartProps> = ({
  workflowData,
  height = 200,
  showControls = true,
  interactive = true,
  minimal = false,
  onViewDetails
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toast } = useToast();
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [smoothing, setSmoothing] = useState('ema'); // 'none', 'ema', 'sma'
  const chartRef = useRef<HTMLDivElement>(null);
  
  // Generate chart data based on the workflow data and selected smoothing
  const chartData = workflowData.data.map(point => ({
    name: minimal ? '' : point.name,
    value: point.value,
    color: getTrendColor(workflowData.trend),
    description: point.annotation || `${point.name}: ${point.value}`
  }));
  
  // Determine color based on trend
  function getTrendColor(trend: 'up' | 'down' | 'neutral') {
    if (trend === 'up') return isDark ? '#4ade80' : '#22c55e';
    if (trend === 'down') return isDark ? '#f87171' : '#ef4444';
    return isDark ? '#f59e0b' : '#d97706';
  }
  
  // Get trend icon based on trend direction
  const getTrendIcon = () => {
    if (workflowData.trend === 'up') {
      return <ArrowUp className="h-4 w-4 mr-1 text-green-500" />;
    } else if (workflowData.trend === 'down') {
      return <ArrowDown className="h-4 w-4 mr-1 text-red-500" />;
    } else {
      return <ArrowRight className="h-4 w-4 mr-1 text-amber-500" />;
    }
  };
  
  // Get trend color class based on trend direction
  const getTrendTextClass = () => {
    if (workflowData.trend === 'up') {
      return 'text-green-500';
    } else if (workflowData.trend === 'down') {
      return 'text-red-500';
    } else {
      return 'text-amber-500';
    }
  };
  
  // Handle clicking on a data point
  const handleDataPointClick = (data: any, index: number) => {
    if (!interactive) return;
    
    const pointData = workflowData.data[index];
    toast({
      title: `${workflowData.name} - ${pointData.name}`,
      description: pointData.annotation || `Value: ${pointData.value.toFixed(2)}`,
      duration: 3000
    });
    
    if (pointData.event) {
      toast({
        title: "Event Detected",
        description: pointData.event,
        duration: 4000
      });
    }
  };
  
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(workflowData);
    } else {
      toast({
        title: "View Details",
        description: `Viewing details for ${workflowData.name}`,
        duration: 2000
      });
    }
  };

  // Effects for any real-time updates or animations
  useEffect(() => {
    if (chartRef.current) {
      // Any DOM manipulation or animation setup could go here
    }
  }, [workflowData]);

  if (minimal) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-24 h-8">
          <LineChart 
            data={chartData}
            lineColor={getTrendColor(workflowData.trend)}
            height={32}
            width={96}
            showGrid={false}
            showXAxis={false}
            showYAxis={false}
            showLegend={false}
            showTooltip={false}
            showArea={true}
            areaOpacity={0.2}
          />
        </div>
        <div className={cn("text-xs font-medium flex items-center", getTrendTextClass())}>
          {getTrendIcon()}
          {workflowData.changePercentage}%
        </div>
      </div>
    );
  }

  return (
    <SolarpunkPanel accentColor="teal" className="h-full">
      <div className="h-full flex flex-col" ref={chartRef}>
        <div className="flex items-center justify-between p-4 pb-2">
          <div>
            <h3 className="text-md font-medium">{workflowData.name}</h3>
            <div className="flex items-center mt-1">
              <Badge 
                className={cn(
                  "flex items-center mr-2",
                  workflowData.trend === 'up' 
                    ? "bg-green-500/20 text-green-500 hover:bg-green-500/30" 
                    : workflowData.trend === 'down'
                      ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
                      : "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30"
                )}
              >
                {getTrendIcon()}
                {workflowData.changePercentage}% 
              </Badge>
              
              <div className="text-xs text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1 opacity-70" />
                {workflowData.averageCompletionTime?.toFixed(1)}s
              </div>
              
              {workflowData.successRate !== undefined && (
                <div className="text-xs text-muted-foreground flex items-center ml-2">
                  <Activity className="h-3 w-3 mr-1 opacity-70" />
                  {workflowData.successRate}%
                </div>
              )}
            </div>
          </div>
          
          {showControls && (
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-7 w-7 rounded-full"
                      onClick={() => setShowAnnotations(!showAnnotations)}
                    >
                      <Info className="h-4 w-4 opacity-70" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle annotations</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs flex items-center gap-1 opacity-80 hover:opacity-100"
                onClick={handleViewDetails}
              >
                Details
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex-grow px-4 pb-4">
          <div className="h-full">
            <LineChart 
              data={chartData}
              lineColor={getTrendColor(workflowData.trend)}
              height={height}
              dotColor={isDark ? '#f0f9ff' : '#0c4a6e'}
              showArea={true}
              areaOpacity={0.15}
              onClick={interactive ? handleDataPointClick : undefined}
            />
          </div>
        </div>
      </div>
    </SolarpunkPanel>
  );
};

export default WorkflowPerformanceChart;
