
import React, { useState } from 'react';
import { BarChart, ChevronDown, Activity, PieChart as PieChartIcon, Laptop, Server, Workflow, Zap, Download, Share2, Maximize2 } from 'lucide-react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PieChart, BarChart as BarChartComponent, LineChart } from '@/components/ui/chart';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { motion, AnimatePresence } from 'framer-motion';
import { usePerformanceData } from '@/hooks/usePerformanceData';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const ResourceUsageSection: React.FC = () => {
  const [isResourcesOpen, setIsResourcesOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'division' | 'performance'>('division');
  const { toast } = useToast();

  const [expandedChart, setExpandedChart] = useState<{
    title: string;
    data: any[];
    type: 'pie' | 'bar' | 'line';
    colors?: string[];
  } | null>(null);

  const performanceData = usePerformanceData();

  const resourceTypeData = [
    { name: 'Computing', value: 42, description: 'Processing power for AI operations' },
    { name: 'Storage', value: 28, description: 'Data storage and retrieval systems' },
    { name: 'Memory', value: 18, description: 'Active memory usage for current operations' },
    { name: 'Network', value: 12, description: 'Bandwidth for internal/external communications' },
  ];

  const perfMetricsData = [
    { name: 'Workflow', value: performanceData.efficiency },
    { name: 'Response', value: Math.round(parseFloat(performanceData.averageResponseTime) * 30) + (Math.random() * 5 - 2.5) },
    { name: 'Uptime', value: performanceData.uptime },
    { name: 'Capacity', value: 100 - performanceData.resourceUtilization - (Math.random() * 6 - 3) },
    { name: 'Tasks', value: Math.min(Math.round(performanceData.tasksCompleted / 2), 100) + (Math.random() * 8 - 4) },
  ];

  const divisionResourceData = [
    { name: 'Knowledge Base', value: 32, description: 'Content management and retrieval systems' },
    { name: 'Marketing', value: 25, description: 'Campaign automation and analytics' },
    { name: 'Operations', value: 20, description: 'Workflow optimization and task management' },
    { name: 'Strategy', value: 15, description: 'Planning and market intelligence' },
    { name: 'Support', value: 8, description: 'Customer ticketing and feedback analysis' },
  ];

  const handleDataPointClick = (data: any, index: number, chartTitle: string) => {
    toast({
      title: `${chartTitle} - ${data.name}`,
      description: `Value: ${data.value}`,
      duration: 3000
    });
  };

  const handleExpandChart = (title: string, data: any[], type: 'pie' | 'bar' | 'line', colors?: string[]) => {
    setExpandedChart({
      title,
      data,
      type,
      colors
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

  const getStatusColor = (value: number) => {
    if (value > 80) return 'text-green-500';
    if (value > 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const renderChartActions = (title: string, data: any[], type: 'pie' | 'bar' | 'line', colors?: string[]) => (
    <div className="absolute top-2 right-2 flex space-x-1 opacity-50 hover:opacity-100 transition-opacity z-10">
      <Button 
        size="icon" 
        variant="ghost" 
        className="h-6 w-6"
        onClick={() => handleExpandChart(title, data, type, colors)}
      >
        <Maximize2 className="h-3.5 w-3.5" />
      </Button>
      <Button 
        size="icon" 
        variant="ghost" 
        className="h-6 w-6"
        onClick={() => handleExportData(title, data)}
      >
        <Download className="h-3.5 w-3.5" />
      </Button>
      <Button 
        size="icon" 
        variant="ghost" 
        className="h-6 w-6"
        onClick={() => handleShareData(title)}
      >
        <Share2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );

  return (
    <Collapsible
      open={isResourcesOpen}
      onOpenChange={setIsResourcesOpen}
      className="w-full"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost" 
          className="flex items-center justify-between w-full text-left p-2 rounded-lg border border-flow-border/20 bg-flow-background/30 mt-2 group hover:bg-flow-background/40 transition-all duration-300"
        >
          <div className="flex items-center">
            <div className="p-1.5 rounded-full bg-flow-accent/20 mr-2">
              <BarChart className="h-4 w-4 text-flow-accent" />
            </div>
            <span className="text-md font-medium group-hover:text-flow-accent">Resource Usage & Analytics</span>
          </div>
          <motion.div
            animate={{ rotate: isResourcesOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-4 w-4 transition-transform duration-200" />
          </motion.div>
        </Button>
      </CollapsibleTrigger>
      <AnimatePresence>
        {isResourcesOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CollapsibleContent className="mt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GlassMorphism className="p-4 rounded-xl bg-flow-background/20 hover:bg-flow-background/30 transition-all duration-300 border-flow-accent/10 relative">
                  {renderChartActions(
                    activeTab === 'division' ? "Division Resource Allocation" : "Resource Type Allocation",
                    activeTab === 'division' ? divisionResourceData : resourceTypeData,
                    "pie",
                    activeTab === 'division' 
                      ? ['#6366f1', '#f97316', '#0ea5e9', '#8b5cf6', '#22c55e'] 
                      : ['#22c55e', '#f59e0b', '#0ea5e9', '#8b5cf6']
                  )}
                  <div className="flex justify-between mb-3">
                    <h4 className="text-lg font-medium flex items-center">
                      <PieChartIcon className="w-4 h-4 mr-2 text-flow-accent" />
                      <span className="bg-gradient-to-r from-flow-accent to-purple-400 bg-clip-text text-transparent">
                        Division Resource Allocation
                      </span>
                    </h4>
                    <div className="flex gap-2">
                      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'division' | 'performance')}>
                        <TabsList className="bg-flow-background/40">
                          <TabsTrigger 
                            value="division" 
                            className={`text-xs ${activeTab === 'division' ? 'bg-flow-accent/20 text-flow-accent' : 'text-flow-foreground/70'}`}
                          >
                            Divisions
                          </TabsTrigger>
                          <TabsTrigger 
                            value="performance" 
                            className={`text-xs ${activeTab === 'performance' ? 'bg-flow-accent/20 text-flow-accent' : 'text-flow-foreground/70'}`}
                          >
                            Resources
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>

                  <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="h-[260px]"
                  >
                    <Tabs value={activeTab}>
                      <TabsContent value="division" className="h-full mt-0">
                        <PieChart 
                          data={divisionResourceData} 
                          donut={true} 
                          gradient={true}
                          interactive={true}
                          colors={['#6366f1', '#f97316', '#0ea5e9', '#8b5cf6', '#22c55e']}
                          onClick={(data, index) => handleDataPointClick(data, index, "Division Resource Allocation")}
                        />
                      </TabsContent>
                      <TabsContent value="performance" className="h-full mt-0">
                        <PieChart 
                          data={resourceTypeData} 
                          donut={true} 
                          gradient={true}
                          interactive={true}
                          colors={['#22c55e', '#f59e0b', '#0ea5e9', '#8b5cf6']}
                          onClick={(data, index) => handleDataPointClick(data, index, "Resource Type Allocation")}
                        />
                      </TabsContent>
                    </Tabs>
                  </motion.div>

                  <div className="mt-2">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-xs border-flow-accent/30 bg-flow-accent/10 text-flow-accent">
                        <Zap className="h-3 w-3 mr-1" />
                        System load: {performanceData.resourceUtilization}%
                      </Badge>
                      <Link to="/analytics">
                        <Button variant="link" size="sm" className="text-flow-accent hover:text-flow-accent/80 text-xs p-0 h-auto">
                          View detailed analytics <ChevronDown className="ml-1 h-3 w-3 rotate-[270deg]" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </GlassMorphism>
                
                <GlassMorphism className="p-4 rounded-xl bg-flow-background/20 hover:bg-flow-background/30 transition-all duration-300 border-flow-accent/10 relative">
                  {renderChartActions("Performance Metrics", perfMetricsData, "bar")}
                  <h4 className="text-lg font-medium mb-3 flex items-center">
                    <Activity className="w-4 h-4 mr-2 text-flow-accent" />
                    <span className="bg-gradient-to-r from-flow-accent to-purple-400 bg-clip-text text-transparent">
                      Performance Metrics
                    </span>
                  </h4>

                  <div className="h-[260px]">
                    <BarChartComponent 
                      data={perfMetricsData}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="bg-flow-background/30 p-2 rounded-md border border-flow-border/20 flex items-center space-x-2 hover:bg-flow-background/40 transition-all duration-300 cursor-pointer"
                      onClick={() => toast({
                        title: "Server Load",
                        description: `Current utilization: ${performanceData.resourceUtilization}%`,
                        duration: 3000
                      })}
                    >
                      <Server className="h-4 w-4 text-blue-400" />
                      <div>
                        <div className="text-xs text-flow-foreground/70">Server Load</div>
                        <div className={`text-sm font-medium ${getStatusColor(100 - performanceData.resourceUtilization)}`}>
                          {performanceData.resourceUtilization}%
                        </div>
                      </div>
                    </div>
                    <div className="bg-flow-background/30 p-2 rounded-md border border-flow-border/20 flex items-center space-x-2 hover:bg-flow-background/40 transition-all duration-300 cursor-pointer"
                      onClick={() => toast({
                        title: "Active Users",
                        description: "16 users currently active on the system",
                        duration: 3000
                      })}
                    >
                      <Laptop className="h-4 w-4 text-green-400" />
                      <div>
                        <div className="text-xs text-flow-foreground/70">Active Users</div>
                        <div className="text-sm font-medium">16</div>
                      </div>
                    </div>
                    <div className="bg-flow-background/30 p-2 rounded-md border border-flow-border/20 flex items-center space-x-2 hover:bg-flow-background/40 transition-all duration-300 cursor-pointer"
                      onClick={() => toast({
                        title: "Workflows",
                        description: "7 workflows are currently active",
                        duration: 3000
                      })}
                    >
                      <Workflow className="h-4 w-4 text-purple-400" />
                      <div>
                        <div className="text-xs text-flow-foreground/70">Workflows</div>
                        <div className="text-sm font-medium">7 Active</div>
                      </div>
                    </div>
                  </div>
                </GlassMorphism>
              </div>
            </CollapsibleContent>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={!!expandedChart} onOpenChange={() => setExpandedChart(null)}>
        <DialogContent className="max-w-3xl h-[70vh] overflow-hidden p-0">
          <DialogHeader className="px-6 pt-4">
            <DialogTitle>{expandedChart?.title}</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-0 h-full flex flex-col">
            <div className="flex-grow min-h-0">
              {expandedChart?.type === 'pie' && (
                <PieChart 
                  data={expandedChart.data} 
                  colors={expandedChart.colors}
                  donut
                  showLegend
                  interactive
                  height={500}
                  onClick={(data, index) => handleDataPointClick(data, index, expandedChart.title)}
                />
              )}
              {expandedChart?.type === 'bar' && (
                <BarChartComponent 
                  data={expandedChart.data} 
                  height={500}
                />
              )}
              {expandedChart?.type === 'line' && (
                <LineChart 
                  data={expandedChart.data}
                  height={500}
                  showArea={true}
                  areaOpacity={0.2}
                  referenceLineY={null}
                  referenceLineLabel=""
                  domain={null}
                  onClick={(data, index) => handleDataPointClick(data, index, expandedChart.title)}
                />
              )}
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleExportData(expandedChart.title, expandedChart.data)}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleShareData(expandedChart.title)}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Collapsible>
  );
};

export default ResourceUsageSection;
