import React, { useState, useRef, useEffect } from 'react';
import { SolarpunkPanel } from '@/components/ui/design-system/SolarpunkPanel';
import { 
  Play, Pause, Settings, Users, ActivitySquare, 
  ArrowRight, Filter, Clock, Search, History,
  Plus, ChevronDown, Tag, ArrowDownUp, CheckSquare, BarChart3
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { useWorkflowAIInsights } from '@/hooks/useWorkflowAIInsights';

interface WorkflowGridProps {
  onSelectWorkflow?: (workflowId: string) => void;
  onViewVersionHistory?: (workflowId: string) => void;
}

// Mock data for workflows with added health score and tags
const mockWorkflows = [
  {
    id: '1',
    name: 'Data Processing Pipeline',
    description: 'Automated data processing and analysis workflow',
    status: 'active',
    healthScore: 92,
    healthStatus: 'healthy',
    lastRun: '2h ago',
    nextRun: 'in 4h',
    steps: 8,
    agents: 3,
    versions: 7,
    tags: ['processing', 'high-priority'],
    lastModified: 'Apr 22, 2025',
    flowPreview: [
      { id: 'step1', name: 'Data Ingestion', type: 'input' },
      { id: 'step2', name: 'Validation', type: 'process' },
      { id: 'step3', name: 'Transformation', type: 'process' }
    ]
  },
  {
    id: '2',
    name: 'Content Generation',
    description: 'AI-powered content creation and optimization',
    status: 'paused',
    healthScore: 75,
    healthStatus: 'warning',
    lastRun: '1d ago',
    nextRun: 'manual',
    steps: 5,
    agents: 2,
    versions: 3,
    tags: ['content', 'ai'],
    lastModified: 'Apr 20, 2025',
    flowPreview: [
      { id: 'step1', name: 'Content Request', type: 'input' },
      { id: 'step2', name: 'AI Generation', type: 'process' },
      { id: 'step3', name: 'Quality Check', type: 'process' }
    ]
  },
  {
    id: '3',
    name: 'Market Analysis',
    description: 'Real-time market data analysis and reporting',
    status: 'active',
    healthScore: 88,
    healthStatus: 'healthy',
    lastRun: '30m ago',
    nextRun: 'in 1h',
    steps: 6,
    agents: 4,
    versions: 5,
    tags: ['analysis', 'reporting'],
    lastModified: 'Apr 21, 2025',
    flowPreview: [
      { id: 'step1', name: 'Data Collection', type: 'input' },
      { id: 'step2', name: 'Market Analysis', type: 'process' },
      { id: 'step3', name: 'Report Generation', type: 'output' }
    ]
  },
  {
    id: '4',
    name: 'Customer Onboarding',
    description: 'Streamlined customer onboarding process',
    status: 'active',
    healthScore: 95,
    healthStatus: 'healthy',
    lastRun: '1h ago',
    nextRun: 'in 2h',
    steps: 7,
    agents: 2,
    versions: 4,
    tags: ['customer', 'onboarding'],
    lastModified: 'Apr 22, 2025',
    flowPreview: [
      { id: 'step1', name: 'User Registration', type: 'input' },
      { id: 'step2', name: 'Profile Setup', type: 'process' },
      { id: 'step3', name: 'Welcome Email', type: 'output' }
    ]
  },
  {
    id: '5',
    name: 'Email Campaign Manager',
    description: 'Automated email marketing campaign workflow',
    status: 'paused',
    healthScore: 62,
    healthStatus: 'warning',
    lastRun: '3d ago',
    nextRun: 'manual',
    steps: 4,
    agents: 1,
    versions: 2,
    tags: ['marketing', 'email'],
    lastModified: 'Apr 19, 2025',
    flowPreview: [
      { id: 'step1', name: 'Audience Selection', type: 'input' },
      { id: 'step2', name: 'Content Preparation', type: 'process' },
      { id: 'step3', name: 'Delivery Scheduling', type: 'process' }
    ]
  },
  {
    id: '6',
    name: 'Document Processing',
    description: 'Automated document analysis and extraction',
    status: 'active',
    healthScore: 45,
    healthStatus: 'error',
    lastRun: '45m ago',
    nextRun: 'in 3h',
    steps: 5,
    agents: 3,
    versions: 6,
    tags: ['document', 'extraction'],
    lastModified: 'Apr 23, 2025',
    flowPreview: [
      { id: 'step1', name: 'Document Upload', type: 'input' },
      { id: 'step2', name: 'OCR Processing', type: 'process' },
      { id: 'step3', name: 'Data Extraction', type: 'output' }
    ],
    aiInsight: 'Critical error in OCR step - needs adjustment'
  },
];

const WorkflowGrid: React.FC<WorkflowGridProps> = ({ onSelectWorkflow, onViewVersionHistory }) => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const isDark = theme === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [healthFilter, setHealthFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [selectedWorkflow, setSelectedWorkflow] = useState<typeof mockWorkflows[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedWorkflows, setSelectedWorkflows] = useState<string[]>([]);
  const [hoveredWorkflow, setHoveredWorkflow] = useState<string | null>(null);
  const { insights, loading: insightsLoading } = useWorkflowAIInsights(selectedWorkflow?.id || '');
  
  // Function to check if a workflow is selected
  const isSelected = (id: string) => selectedWorkflows.includes(id);
  
  // Function to toggle workflow selection
  const toggleWorkflowSelection = (id: string) => {
    if (isSelected(id)) {
      setSelectedWorkflows(selectedWorkflows.filter(wfId => wfId !== id));
    } else {
      setSelectedWorkflows([...selectedWorkflows, id]);
    }
  };
  
  // Handle bulk actions
  const handleBulkAction = (action: 'start' | 'pause' | 'archive' | 'tag') => {
    if (selectedWorkflows.length === 0) {
      toast({
        title: "No workflows selected",
        description: "Please select at least one workflow to perform this action.",
        duration: 3000,
      });
      return;
    }
    
    toast({
      title: `Bulk Action: ${action}`,
      description: `Applied ${action} to ${selectedWorkflows.length} workflows`,
      duration: 3000,
    });
    
    // Reset selections after action
    setSelectedWorkflows([]);
  };

  const filteredWorkflows = mockWorkflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter;
    const matchesHealth = healthFilter === 'all' || workflow.healthStatus === healthFilter;
    const matchesTag = tagFilter === 'all' || workflow.tags.includes(tagFilter);
    return matchesSearch && matchesStatus && matchesHealth && matchesTag;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'health') return b.healthScore - a.healthScore;
    if (sortBy === 'lastRun') return a.lastRun.localeCompare(b.lastRun);
    return 0;
  });

  const handleWorkflowAction = (workflow: typeof mockWorkflows[0], action: 'start' | 'pause' | 'configure') => {
    if (action === 'start' || action === 'pause') {
      toast({
        title: action === 'start' ? 'Starting Workflow' : 'Pausing Workflow',
        description: `${workflow.name} has been ${action === 'start' ? 'started' : 'paused'}.`,
      });
      
      if (onSelectWorkflow) {
        onSelectWorkflow(workflow.id);
      }
    } else if (action === 'configure') {
      setSelectedWorkflow(workflow);
      setIsDialogOpen(true);
    }
  };
  
  // Get all unique tags from workflows for filtering
  const allTags = Array.from(new Set(mockWorkflows.flatMap(wf => wf.tags)));

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
        <div className="flex flex-1 gap-2 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search workflows or type a command..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={healthFilter} onValueChange={setHealthFilter}>
            <SelectTrigger className="w-[130px]">
              <ActivitySquare className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Health" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Health</SelectItem>
              <SelectItem value="healthy">Healthy</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={tagFilter} onValueChange={setTagFilter}>
            <SelectTrigger className="w-[130px]">
              <Tag className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {allTags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px]">
              <ArrowDownUp className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="health">Health Score</SelectItem>
              <SelectItem value="lastRun">Last Run</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          {selectedWorkflows.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  <CheckSquare className="h-4 w-4 mr-1" />
                  {selectedWorkflows.length} Selected
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleBulkAction('start')}>
                  <Play className="h-4 w-4 mr-2" /> Start All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction('pause')}>
                  <Pause className="h-4 w-4 mr-2" /> Pause All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction('tag')}>
                  <Tag className="h-4 w-4 mr-2" /> Add Tag
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction('archive')}>
                  <History className="h-4 w-4 mr-2" /> Archive All
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          <Button className={cn(
            isDark 
              ? "bg-orange-500 hover:bg-orange-600" 
              : "bg-orange-500 hover:bg-orange-600"
          )}>
            <Plus className="h-4 w-4 mr-2" />
            Create Workflow
          </Button>
        </div>
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
              onMouseEnter={() => setHoveredWorkflow(workflow.id)}
              onMouseLeave={() => setHoveredWorkflow(null)}
              className="relative"
            >
              <SolarpunkPanel
                interactive
                accentColor="orange"
                className={cn(
                  "relative overflow-hidden hover:scale-102 transition-transform duration-300",
                  isSelected(workflow.id) && "ring-2 ring-orange-500"
                )}
              >
                <div className="absolute top-3 left-3 z-10">
                  <Checkbox 
                    checked={isSelected(workflow.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWorkflowSelection(workflow.id);
                    }}
                    className="h-5 w-5 border-2 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className={cn(
                      "text-lg font-semibold pl-7",
                      isDark ? "text-orange-400" : "text-orange-600"
                    )}>
                      {workflow.name}
                    </h3>
                    
                    {/* Health Score Badge */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge 
                            variant={
                              workflow.healthStatus === 'healthy' ? 'success' : 
                              workflow.healthStatus === 'warning' ? 'warning' : 'destructive'
                            }
                            className="capitalize flex items-center gap-1"
                          >
                            {workflow.healthStatus === 'healthy' ? '🟢' : 
                             workflow.healthStatus === 'warning' ? '🟠' : '🔴'}
                            {workflow.healthScore} - {workflow.healthStatus}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{
                            workflow.healthStatus === 'healthy' ? 'Workflow is performing well' : 
                            workflow.healthStatus === 'warning' ? 'Performance issues detected' : 
                            'Critical errors detected'
                          }</p>
                          {workflow.aiInsight && <p className="text-xs mt-1">{workflow.aiInsight}</p>}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <p className={cn(
                    "text-sm mb-3 line-clamp-2",
                    isDark ? "text-gray-300" : "text-gray-600"
                  )}>
                    {workflow.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {workflow.tags.map(tag => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className={cn(
                          "text-xs bg-orange-500/10 hover:bg-orange-500/20",
                          isDark ? "text-orange-300" : "text-orange-700"
                        )}
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
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

                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/20 text-orange-500 dark:text-orange-400"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Insights
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">AI Insights</h4>
                      {insightsLoading ? (
                        <p className="text-sm text-muted-foreground">Analyzing workflow...</p>
                      ) : insights.map((insight, index) => (
                        <div
                          key={index}
                          className={cn(
                            "p-3 rounded-lg text-sm",
                            insight.type === 'optimization' && "bg-blue-500/10 text-blue-500",
                            insight.type === 'warning' && "bg-yellow-500/10 text-yellow-500",
                            insight.type === 'success' && "bg-green-500/10 text-green-500"
                          )}
                        >
                          <p>{insight.message}</p>
                          <p className="mt-1 text-xs opacity-80">
                            Potential impact: {insight.impact}% improvement
                          </p>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1 bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/20 text-orange-500 dark:text-orange-400"
                  onClick={() => handleWorkflowAction(workflow, 'configure')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </div>
            </div>
          </SolarpunkPanel>
        </motion.div>
          ))
        )}
      </motion.div>

      {/* Configuration Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <Settings className="h-5 w-5" />
              {selectedWorkflow?.name} Configuration
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Add configuration options here */}
            <div className="grid gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Workflow Details</h3>
                <p className="text-sm text-muted-foreground">
                  Current Status: {selectedWorkflow?.status}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">AI Insights</h3>
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-3 rounded-lg",
                      insight.type === 'optimization' && "bg-blue-500/10 text-blue-500",
                      insight.type === 'warning' && "bg-yellow-500/10 text-yellow-500",
                      insight.type === 'success' && "bg-green-500/10 text-green-500"
                    )}
                  >
                    <p className="font-medium">{insight.message}</p>
                    <p className="text-sm mt-1">Suggested action: {insight.improvement}</p>
                    <p className="text-sm opacity-80">Impact: {insight.impact}% improvement</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkflowGrid;
