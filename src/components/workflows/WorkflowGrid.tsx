import React, { useState } from 'react';
import { SolarpunkPanel } from '@/components/ui/design-system/SolarpunkPanel';
import { Play, Pause, Settings, Users, ActivitySquare, ArrowRight, Filter, Clock, Search, History } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface WorkflowGridProps {
  onSelectWorkflow?: (workflowId: string) => void;
  onViewVersionHistory?: (workflowId: string) => void;
}

// Mock data for workflows
const mockWorkflows = [
  {
    id: '1',
    name: 'Data Processing Pipeline',
    description: 'Automated data processing and analysis workflow',
    status: 'active',
    lastRun: '2h ago',
    nextRun: 'in 4h',
    steps: 8,
    agents: 3,
    versions: 7,
    lastModified: 'Apr 22, 2025'
  },
  {
    id: '2',
    name: 'Content Generation',
    description: 'AI-powered content creation and optimization',
    status: 'paused',
    lastRun: '1d ago',
    nextRun: 'manual',
    steps: 5,
    agents: 2,
    versions: 3,
    lastModified: 'Apr 20, 2025'
  },
  {
    id: '3',
    name: 'Market Analysis',
    description: 'Real-time market data analysis and reporting',
    status: 'active',
    lastRun: '30m ago',
    nextRun: 'in 1h',
    steps: 6,
    agents: 4,
    versions: 5,
    lastModified: 'Apr 21, 2025'
  },
  {
    id: '4',
    name: 'Customer Onboarding',
    description: 'Streamlined customer onboarding process',
    status: 'active',
    lastRun: '1h ago',
    nextRun: 'in 2h',
    steps: 7,
    agents: 2,
    versions: 4,
    lastModified: 'Apr 22, 2025'
  },
  {
    id: '5',
    name: 'Email Campaign Manager',
    description: 'Automated email marketing campaign workflow',
    status: 'paused',
    lastRun: '3d ago',
    nextRun: 'manual',
    steps: 4,
    agents: 1,
    versions: 2,
    lastModified: 'Apr 19, 2025'
  },
  {
    id: '6',
    name: 'Document Processing',
    description: 'Automated document analysis and extraction',
    status: 'active',
    lastRun: '45m ago',
    nextRun: 'in 3h',
    steps: 5,
    agents: 3,
    versions: 6,
    lastModified: 'Apr 23, 2025'
  },
];

const WorkflowGrid: React.FC<WorkflowGridProps> = ({ onSelectWorkflow, onViewVersionHistory }) => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const isDark = theme === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedWorkflow, setSelectedWorkflow] = useState<typeof mockWorkflows[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredWorkflows = mockWorkflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleWorkflowAction = (workflow: typeof mockWorkflows[0], action: 'start' | 'pause' | 'configure' | 'history') => {
    const actionMessages = {
      start: `Started "${workflow.name}" workflow`,
      pause: `Paused "${workflow.name}" workflow`,
      configure: `Opening configuration for "${workflow.name}" workflow`,
      history: `Viewing version history for "${workflow.name}" workflow`
    };
    
    toast({
      title: `Workflow Action`,
      description: actionMessages[action],
      duration: 3000,
    });
    
    if (action === 'configure') {
      setSelectedWorkflow(workflow);
      setIsDialogOpen(true);
    } else if (action === 'history' && onViewVersionHistory) {
      onViewVersionHistory(workflow.id);
    } else if (action === 'start' || action === 'pause') {
      if (onSelectWorkflow) {
        onSelectWorkflow(workflow.id);
      }
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
        <div className="flex flex-1 gap-2 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search workflows..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button className={cn(
          isDark 
            ? "bg-orange-500 hover:bg-orange-600" 
            : "bg-orange-500 hover:bg-orange-600"
        )}>
          Create Workflow
        </Button>
      </div>
      
      <div className="text-sm text-muted-foreground mb-2">Showing {filteredWorkflows.length} workflow{filteredWorkflows.length !== 1 ? 's' : ''}</div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {filteredWorkflows.length === 0 ? (
          <div className="col-span-3 text-center p-10">
            <p className="text-muted-foreground">No workflows found matching your criteria.</p>
          </div>
        ) : (
          filteredWorkflows.map((workflow) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SolarpunkPanel
                interactive
                accentColor="orange"
                className="relative overflow-hidden hover:scale-102 transition-transform duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className={cn(
                      "text-lg font-semibold",
                      isDark ? "text-orange-400" : "text-orange-600"
                    )}>
                      {workflow.name}
                    </h3>
                    <Badge 
                      variant={workflow.status === 'active' ? 'success' : 'warning'}
                      className="capitalize"
                    >
                      {workflow.status}
                    </Badge>
                  </div>
                  
                  <p className={cn(
                    "text-sm mb-4 line-clamp-2",
                    isDark ? "text-gray-300" : "text-gray-600"
                  )}>
                    {workflow.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="space-y-2">
                      <div className={cn(
                        "flex items-center gap-2",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )}>
                        <Clock className="h-4 w-4" />
                        <span>Last run: {workflow.lastRun}</span>
                      </div>
                      <div className={cn(
                        "flex items-center gap-2",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )}>
                        <Users className="h-4 w-4" />
                        <span>{workflow.agents} Agents</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className={cn(
                        "flex items-center gap-2",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )}>
                        <ArrowRight className="h-4 w-4" />
                        <span>Next: {workflow.nextRun}</span>
                      </div>
                      <div className={cn(
                        "flex items-center gap-2",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )}>
                        <History className="h-4 w-4" />
                        <span>{workflow.versions} versions</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {workflow.status === 'active' ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/20 text-orange-500 dark:text-orange-400"
                        onClick={() => handleWorkflowAction(workflow, 'pause')}
                      >
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/20 text-orange-500 dark:text-orange-400"
                        onClick={() => handleWorkflowAction(workflow, 'start')}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/20 text-orange-500 dark:text-orange-400"
                      onClick={() => handleWorkflowAction(workflow, 'configure')}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/20 text-orange-500 dark:text-orange-400"
                      onClick={() => handleWorkflowAction(workflow, 'history')}
                    >
                      <History className="h-4 w-4 mr-2" />
                      History
                    </Button>
                  </div>
                </div>
              </SolarpunkPanel>
            </motion.div>
          ))
        )}
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className={cn(
              "text-xl flex items-center gap-2",
              isDark ? "text-orange-400" : "text-orange-600"
            )}>
              <Settings className="h-5 w-5" />
              {selectedWorkflow?.name} Configuration
            </DialogTitle>
            <DialogDescription>
              Manage settings and steps for this workflow
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {selectedWorkflow && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Workflow Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium">{selectedWorkflow.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Run</p>
                      <p className="font-medium">{selectedWorkflow.lastRun}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Next Run</p>
                      <p className="font-medium">{selectedWorkflow.nextRun}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Steps</p>
                      <p className="font-medium">{selectedWorkflow.steps}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Configuration Options</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Schedule Type</label>
                        <Select defaultValue="interval">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="interval">Interval</SelectItem>
                            <SelectItem value="cron">Cron</SelectItem>
                            <SelectItem value="manual">Manual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Interval</label>
                        <Select defaultValue="4h">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15m">15 minutes</SelectItem>
                            <SelectItem value="30m">30 minutes</SelectItem>
                            <SelectItem value="1h">1 hour</SelectItem>
                            <SelectItem value="4h">4 hours</SelectItem>
                            <SelectItem value="12h">12 hours</SelectItem>
                            <SelectItem value="24h">24 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm text-muted-foreground">Timeout (seconds)</label>
                      <Input type="number" defaultValue="300" />
                    </div>
                    
                    <div>
                      <label className="text-sm text-muted-foreground">Retry Count</label>
                      <Input type="number" defaultValue="3" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                toast({
                  title: "Configuration Saved",
                  description: `Changes to "${selectedWorkflow?.name}" have been saved`,
                  duration: 3000
                });
                setIsDialogOpen(false);
              }}
              className={isDark ? "bg-orange-500 hover:bg-orange-600" : "bg-orange-500 hover:bg-orange-600"}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkflowGrid;
