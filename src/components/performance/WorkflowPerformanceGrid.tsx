
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import WorkflowPerformanceChart, { WorkflowPerformanceData } from './WorkflowPerformanceChart';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ClockIcon, BarChart3, Filter, Activity, Zap, Download } from 'lucide-react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface WorkflowPerformanceGridProps {
  workflows: WorkflowPerformanceData[];
  timeRange?: '1h' | '24h' | '7d' | '30d';
  onTimeRangeChange?: (range: '1h' | '24h' | '7d' | '30d') => void;
}

const WorkflowPerformanceGrid: React.FC<WorkflowPerformanceGridProps> = ({
  workflows,
  timeRange = '24h',
  onTimeRangeChange
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toast } = useToast();
  
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowPerformanceData | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'improving' | 'declining' | 'neutral'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'efficiency' | 'change'>('change');
  
  const handleViewDetails = (workflow: WorkflowPerformanceData) => {
    setSelectedWorkflow(workflow);
    setDetailsOpen(true);
  };
  
  const handleTimeRangeChange = (value: string) => {
    if (onTimeRangeChange && (value === '1h' || value === '24h' || value === '7d' || value === '30d')) {
      onTimeRangeChange(value);
    }
  };
  
  const handleExportData = () => {
    toast({
      title: "Exporting Data",
      description: "Performance data export initiated",
      duration: 2000
    });
  };
  
  // Filter workflows based on the selected filter
  const filteredWorkflows = workflows.filter(workflow => {
    if (filter === 'all') return true;
    if (filter === 'improving') return workflow.trend === 'up';
    if (filter === 'declining') return workflow.trend === 'down';
    if (filter === 'neutral') return workflow.trend === 'neutral';
    return true;
  });
  
  // Sort workflows based on the selected sort option
  const sortedWorkflows = [...filteredWorkflows].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'efficiency') {
      return b.currentEfficiency - a.currentEfficiency;
    } else { // change
      return Math.abs(b.changePercentage) - Math.abs(a.changePercentage);
    }
  });
  
  // Count workflows by trend
  const improvingCount = workflows.filter(w => w.trend === 'up').length;
  const decliningCount = workflows.filter(w => w.trend === 'down').length;
  const neutralCount = workflows.filter(w => w.trend === 'neutral').length;
  
  return (
    <>
      <GlassMorphism intensity="medium" className="rounded-xl p-4 mb-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-6">
          <div>
            <h2 className={cn("text-lg font-semibold flex items-center gap-2", 
              isDark ? 'text-white' : 'text-gray-800'
            )}>
              <Activity className="h-5 w-5 text-teal-500" />
              Workflow Performance
            </h2>
            <p className="text-sm text-muted-foreground">Real-time performance metrics and efficiency trends</p>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-sm">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-muted-foreground">{improvingCount} Improving</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-muted-foreground">{decliningCount} Declining</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-muted-foreground">{neutralCount} Neutral</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-[110px] h-8 text-xs">
              <ClockIcon className="h-3.5 w-3.5 mr-2" />
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all" onValueChange={(value) => setFilter(value as any)}>
            <SelectTrigger className="w-[110px] h-8 text-xs">
              <Filter className="h-3.5 w-3.5 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Trends</SelectItem>
              <SelectItem value="improving">Improving</SelectItem>
              <SelectItem value="declining">Declining</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="change" onValueChange={(value) => setSortBy(value as any)}>
            <SelectTrigger className="w-[110px] h-8 text-xs">
              <BarChart3 className="h-3.5 w-3.5 mr-2" />
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="efficiency">Efficiency</SelectItem>
              <SelectItem value="change">% Change</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" className="h-8 text-xs" onClick={handleExportData}>
            <Download className="h-3.5 w-3.5 mr-1" />
            Export
          </Button>
        </div>
      </GlassMorphism>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedWorkflows.map((workflow) => (
          <motion.div 
            key={workflow.id} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-[250px]"
          >
            <WorkflowPerformanceChart 
              workflowData={workflow}
              onViewDetails={handleViewDetails}
            />
          </motion.div>
        ))}
      </div>
      
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        {selectedWorkflow && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" style={{ color: selectedWorkflow.trend === 'up' ? '#4ade80' : selectedWorkflow.trend === 'down' ? '#f87171' : '#fbbf24' }} />
                {selectedWorkflow.name} Performance Details
              </DialogTitle>
            </DialogHeader>
            
            <div className="h-[400px] mt-4">
              <WorkflowPerformanceChart 
                workflowData={selectedWorkflow}
                height={400}
                showControls={false}
              />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="text-sm text-muted-foreground mb-1">Current Efficiency</div>
                  <div className="text-2xl font-semibold">{selectedWorkflow.currentEfficiency.toFixed(1)}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="text-sm text-muted-foreground mb-1">Change</div>
                  <div className={cn(
                    "text-2xl font-semibold flex items-center",
                    selectedWorkflow.trend === 'up' ? 'text-green-500' : 
                    selectedWorkflow.trend === 'down' ? 'text-red-500' : 'text-amber-500'
                  )}>
                    {selectedWorkflow.trend === 'up' ? '+' : selectedWorkflow.trend === 'down' ? '-' : ''}
                    {Math.abs(selectedWorkflow.changePercentage)}%
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="text-sm text-muted-foreground mb-1">Avg Completion</div>
                  <div className="text-2xl font-semibold">{selectedWorkflow.averageCompletionTime?.toFixed(1)}s</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="text-sm text-muted-foreground mb-1">Success Rate</div>
                  <div className="text-2xl font-semibold">{selectedWorkflow.successRate}%</div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default WorkflowPerformanceGrid;
