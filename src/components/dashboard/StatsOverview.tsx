import React, { useState } from 'react';
import { Activity, Zap, Clock, Server, TrendingUp, TrendingDown, ArrowRight, Maximize2, Download, Share2 } from 'lucide-react';
import TransitionWrapper from '../ui/TransitionWrapper';
import GlassMorphism from '../ui/GlassMorphism';
import { cn } from '@/lib/utils';
import { LineChart } from '../ui/chart';
import { Badge } from '../ui/badge';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  chartData?: { name: string; value: number }[];
  color?: string;
  className?: string;
  onClick?: (data: any, index: number) => void;
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
  onClick
}) => {
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500';
  const { toast } = useToast();
  
  const handleDataPointClick = (data: any, index: number) => {
    if (onClick) {
      onClick(data, index);
    } else {
      toast({
        title: `${label} - ${data.name}`,
        description: `Value: ${data.value}`,
        duration: 3000
      });
    }
  };
  
  return (
    <motion.div
      whileHover={{ translateY: -4 }}
      transition={{ duration: 0.2 }}
    >
      <GlassMorphism 
        className={cn(
          'p-6 rounded-xl flex flex-col transition-all duration-300 hover:shadow-md hover:border-opacity-50 relative',
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
              showArea={true}
              areaOpacity={0.15}
              showGrid={false}
              referenceLineY={null}
              referenceLineLabel=""
              domain={null}
              onClick={handleDataPointClick}
            />
          </div>
        )}
      </GlassMorphism>
    </motion.div>
  );
};

const StatsOverview: React.FC = () => {
  const { toast } = useToast();
  const [expandedChart, setExpandedChart] = useState<{
    title: string;
    data: any[];
    color: string;
  } | null>(null);
  
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
  
  const handleDataPointClick = (data: any, index: number, chartTitle: string) => {
    toast({
      title: `${chartTitle} - ${data.name}`,
      description: `Value: ${data.value}`,
      duration: 3000
    });
  };
  
  const handleExpandChart = (title: string, data: any[], color: string) => {
    setExpandedChart({
      title,
      data,
      color
    });
  };
  
  const handleExportData = (title: string, data: any[]) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-data.json`;
    link.click();
    
    toast({
      title: "Data Exported",
      description: `${title} data has been exported successfully`,
      duration: 3000
    });
  };
  
  const handleShareData = (title: string) => {
    toast({
      title: "Share Feature",
      description: `Sharing ${title} data (would open sharing dialog in production)`,
      duration: 3000
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TransitionWrapper delay={100}>
          <div className="relative group">
            <StatItem
              icon={<Activity className="h-5 w-5" style={{ color: '#0ea5e9' }} />}
              label="Active Agents"
              value="28"
              trend="up"
              trendValue="16%"
              chartData={agentData}
              color="#0ea5e9"
              onClick={(data, index) => handleDataPointClick(data, index, "Active Agents")}
            />
            <div className="absolute top-2 right-2 hidden group-hover:flex space-x-1 opacity-70 hover:opacity-100 transition-opacity z-10">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6"
                onClick={() => handleExpandChart("Active Agents", agentData, "#0ea5e9")}
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6"
                onClick={() => handleExportData("Active Agents", agentData)}
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6"
                onClick={() => handleShareData("Active Agents")}
              >
                <Share2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </TransitionWrapper>
        
        <TransitionWrapper delay={200}>
          <div className="relative group">
            <StatItem
              icon={<Zap className="h-5 w-5" style={{ color: '#f97316' }} />}
              label="Tasks Completed"
              value="1,310"
              trend="up"
              trendValue="12%"
              chartData={tasksData}
              color="#f97316"
              onClick={(data, index) => handleDataPointClick(data, index, "Tasks Completed")}
            />
            <div className="absolute top-2 right-2 hidden group-hover:flex space-x-1 opacity-70 hover:opacity-100 transition-opacity z-10">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6"
                onClick={() => handleExpandChart("Tasks Completed", tasksData, "#f97316")}
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6"
                onClick={() => handleExportData("Tasks Completed", tasksData)}
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6"
                onClick={() => handleShareData("Tasks Completed")}
              >
                <Share2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </TransitionWrapper>
        
        <TransitionWrapper delay={300}>
          <div className="relative group">
            <StatItem
              icon={<Clock className="h-5 w-5" style={{ color: '#8b5cf6' }} />}
              label="Avg. Response Time"
              value="1.0s"
              trend="down"
              trendValue="20%"
              chartData={responseData}
              color="#8b5cf6"
              onClick={(data, index) => handleDataPointClick(data, index, "Response Time")}
            />
            <div className="absolute top-2 right-2 hidden group-hover:flex space-x-1 opacity-70 hover:opacity-100 transition-opacity z-10">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6"
                onClick={() => handleExpandChart("Response Time", responseData, "#8b5cf6")}
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6"
                onClick={() => handleExportData("Response Time", responseData)}
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6"
                onClick={() => handleShareData("Response Time")}
              >
                <Share2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </TransitionWrapper>
        
        <TransitionWrapper delay={400}>
          <div className="relative group">
            <StatItem
              icon={<Server className="h-5 w-5" style={{ color: '#22c55e' }} />}
              label="System Load"
              value="36%"
              trend="neutral"
              trendValue="Optimal"
              chartData={loadData}
              color="#22c55e"
              onClick={(data, index) => handleDataPointClick(data, index, "System Load")}
            />
            <div className="absolute top-2 right-2 hidden group-hover:flex space-x-1 opacity-70 hover:opacity-100 transition-opacity z-10">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6"
                onClick={() => handleExpandChart("System Load", loadData, "#22c55e")}
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6"
                onClick={() => handleExportData("System Load", loadData)}
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6"
                onClick={() => handleShareData("System Load")}
              >
                <Share2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </TransitionWrapper>
      </div>

      <Dialog open={!!expandedChart} onOpenChange={() => setExpandedChart(null)}>
        <DialogContent className="max-w-3xl h-[70vh] overflow-hidden p-0">
          <DialogHeader className="px-6 pt-4">
            <DialogTitle>{expandedChart?.title}</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-0 h-full flex flex-col">
            <div className="flex-grow min-h-0">
              <LineChart 
                data={expandedChart?.data || []} 
                lineColor={expandedChart?.color || '#8884d8'} 
                height={500}
                showArea={true}
                areaOpacity={0.2}
                referenceLineY={null}
                referenceLineLabel=""
                domain={null}
                onClick={(data, index) => handleDataPointClick(data, index, expandedChart?.title || "")}
              />
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <Button 
                variant="outline" 
                onClick={() => expandedChart && handleExportData(expandedChart.title, expandedChart.data)}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button 
                variant="outline"
                onClick={() => expandedChart && handleShareData(expandedChart.title)}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StatsOverview;
