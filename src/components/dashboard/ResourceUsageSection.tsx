
import React, { useState } from 'react';
import { BarChart, ChevronDown, Activity, PieChart as PieChartIcon, Laptop, Server, Workflow, Zap } from 'lucide-react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PieChart, BarChart as BarChartComponent } from '@/components/ui/chart';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { motion, AnimatePresence } from 'framer-motion';
import { usePerformanceData } from '@/hooks/usePerformanceData';
import { Badge } from '@/components/ui/badge';

const ResourceUsageSection: React.FC = () => {
  const [isResourcesOpen, setIsResourcesOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'division' | 'performance'>('division');

  // Use performance data hook for consistent data
  const performanceData = usePerformanceData();

  // Additional data for resource allocation
  const resourceTypeData = [
    { name: 'Computing', value: 42, description: 'Processing power for AI operations' },
    { name: 'Storage', value: 28, description: 'Data storage and retrieval systems' },
    { name: 'Memory', value: 18, description: 'Active memory usage for current operations' },
    { name: 'Network', value: 12, description: 'Bandwidth for internal/external communications' },
  ];

  // Data for performance metrics chart
  const perfMetricsData = [
    { name: 'Workflow', value: performanceData.efficiency },
    { name: 'Response', value: Math.round(parseFloat(performanceData.averageResponseTime) * 30) },
    { name: 'Uptime', value: performanceData.uptime },
    { name: 'Capacity', value: 100 - performanceData.resourceUtilization },
    { name: 'Tasks', value: Math.min(Math.round(performanceData.tasksCompleted / 2), 100) },
  ];

  // Helper function to get status color
  const getStatusColor = (value: number) => {
    if (value > 80) return 'text-green-500';
    if (value > 60) return 'text-yellow-500';
    return 'text-red-500';
  };

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
                <GlassMorphism className="p-4 rounded-xl bg-flow-background/20 hover:bg-flow-background/30 transition-all duration-300 border-flow-accent/10">
                  <div className="flex justify-between mb-3">
                    <h4 className="text-lg font-medium flex items-center">
                      <PieChartIcon className="w-4 h-4 mr-2 text-flow-accent" />
                      <span className="bg-gradient-to-r from-flow-accent to-purple-400 bg-clip-text text-transparent">
                        Division Resource Allocation
                      </span>
                    </h4>
                    <div className="flex gap-2">
                      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'division' | 'performance')}>
                        <Button 
                          variant="ghost"
                          size="sm"
                          className={`text-xs ${activeTab === 'division' ? 'bg-flow-accent/20 text-flow-accent' : 'text-flow-foreground/70'}`}
                          onClick={() => setActiveTab('division')}
                        >
                          Divisions
                        </Button>
                        <Button 
                          variant="ghost"
                          size="sm"
                          className={`text-xs ${activeTab === 'performance' ? 'bg-flow-accent/20 text-flow-accent' : 'text-flow-foreground/70'}`}
                          onClick={() => setActiveTab('performance')}
                        >
                          Resources
                        </Button>
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
                    {activeTab === 'division' ? (
                      <PieChart 
                        data={[
                          { name: 'Knowledge Base', value: 32, description: 'Content management and retrieval systems' },
                          { name: 'Marketing', value: 25, description: 'Campaign automation and analytics' },
                          { name: 'Operations', value: 20, description: 'Workflow optimization and task management' },
                          { name: 'Strategy', value: 15, description: 'Planning and market intelligence' },
                          { name: 'Support', value: 8, description: 'Customer ticketing and feedback analysis' },
                        ]} 
                        donut={true} 
                        gradient={true}
                        interactive={true}
                        colors={['#6366f1', '#f97316', '#0ea5e9', '#8b5cf6', '#22c55e']}
                      />
                    ) : (
                      <PieChart 
                        data={resourceTypeData} 
                        donut={true} 
                        gradient={true}
                        interactive={true}
                        colors={['#22c55e', '#f59e0b', '#0ea5e9', '#8b5cf6']}
                      />
                    )}
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
                
                <GlassMorphism className="p-4 rounded-xl bg-flow-background/20 hover:bg-flow-background/30 transition-all duration-300 border-flow-accent/10">
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
                    <div className="bg-flow-background/30 p-2 rounded-md border border-flow-border/20 flex items-center space-x-2 hover:bg-flow-background/40 transition-all duration-300">
                      <Server className="h-4 w-4 text-blue-400" />
                      <div>
                        <div className="text-xs text-flow-foreground/70">Server Load</div>
                        <div className={`text-sm font-medium ${getStatusColor(100 - performanceData.resourceUtilization)}`}>
                          {performanceData.resourceUtilization}%
                        </div>
                      </div>
                    </div>
                    <div className="bg-flow-background/30 p-2 rounded-md border border-flow-border/20 flex items-center space-x-2 hover:bg-flow-background/40 transition-all duration-300">
                      <Laptop className="h-4 w-4 text-green-400" />
                      <div>
                        <div className="text-xs text-flow-foreground/70">Active Users</div>
                        <div className="text-sm font-medium">16</div>
                      </div>
                    </div>
                    <div className="bg-flow-background/30 p-2 rounded-md border border-flow-border/20 flex items-center space-x-2 hover:bg-flow-background/40 transition-all duration-300">
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
    </Collapsible>
  );
};

export default ResourceUsageSection;
