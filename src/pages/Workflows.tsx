import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowRight, CheckCircle, Clock, Code, FileText, Search, 
  Filter, ZoomIn, BarChart2, Link as LinkIcon, Users, RefreshCw,
  Play, Pause, Wrench, Zap, Sparkles, BrainCircuit,
  GitBranch, GitFork, PlusCircle, SlidersHorizontal, 
  AlertTriangle, ChevronDown, ChevronRight, Calendar, 
  LineChart, LayoutDashboard, Settings2, Hourglass
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LineChart as ChartLine } from '@/components/ui/chart';
import GlassMorphism from '@/components/ui/GlassMorphism';
import PageHeader from '@/components/ui/design-system/PageHeader';
import { toast } from 'sonner';
import type { LucideIcon } from 'lucide-react';

// Define workflow interfaces
interface WorkflowStep {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  timeEstimate: string;
  timeActual?: string;
  agentIds: number[];
}

interface Agent {
  id: number;
  name: string;
  status: 'active' | 'idle' | 'busy' | 'error';
  role: string;
  efficiency: number;
  avatar?: string;
}

interface WorkflowSchedule {
  nextRun: string;
  lastRun: string;
  frequency: string;
  timeRemaining?: string;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'scheduled';
  lastRun: string;
  steps: number;
  completion: number;
  division: string;
  color: string;
  icon: LucideIcon;
  connected_agents: number[];
  performance: Array<{ name: string; value: number }>;
  schedule?: WorkflowSchedule;
  stepDetails?: WorkflowStep[];
  agents?: Agent[];
  insights?: string[];
}

const Workflows = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hoveredWorkflow, setHoveredWorkflow] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('lastRun');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Enhanced workflow data with more details for the redesign
  const allWorkflows: Workflow[] = [
    {
      id: 'wf-1',
      name: 'Content Automation',
      description: 'Generate and optimize content across platforms',
      status: 'active',
      lastRun: '2 hours ago',
      steps: 5,
      completion: 78,
      division: 'Content',
      color: '#d946ef',
      icon: Sparkles,
      connected_agents: [1, 4, 5],
      performance: [
        { name: "Mon", value: 65 },
        { name: "Tue", value: 70 },
        { name: "Wed", value: 55 },
        { name: "Thu", value: 68 },
        { name: "Fri", value: 78 },
      ],
      schedule: {
        nextRun: '2023-04-14T14:30:00',
        lastRun: '2023-04-14T08:15:00',
        frequency: 'Every 6 hours',
        timeRemaining: '4h 15m'
      },
      stepDetails: [
        {
          id: 'step-1',
          name: 'Content Research',
          status: 'completed',
          timeEstimate: '30m',
          timeActual: '28m',
          agentIds: [1]
        },
        {
          id: 'step-2',
          name: 'Draft Generation',
          status: 'completed',
          timeEstimate: '1h',
          timeActual: '55m',
          agentIds: [4]
        },
        {
          id: 'step-3',
          name: 'Editorial Review',
          status: 'completed',
          timeEstimate: '45m',
          timeActual: '50m',
          agentIds: [5]
        },
        {
          id: 'step-4',
          name: 'SEO Optimization',
          status: 'in-progress',
          timeEstimate: '40m',
          agentIds: [4, 1]
        },
        {
          id: 'step-5',
          name: 'Publication',
          status: 'pending',
          timeEstimate: '15m',
          agentIds: [5]
        }
      ],
      agents: [
        {
          id: 1,
          name: "Research Specialist",
          status: "active",
          role: "Data Collection",
          efficiency: 92
        },
        {
          id: 4,
          name: "Content Creator",
          status: "busy",
          role: "Generation",
          efficiency: 85
        },
        {
          id: 5,
          name: "Publishing Agent",
          status: "idle",
          role: "Distribution",
          efficiency: 88
        }
      ],
      insights: [
        "Step 4 (SEO Optimization) is taking longer than expected (+15%)",
        "Agent 4 is approaching workload capacity",
        "Overall workflow efficiency has improved by 7% since last week"
      ]
    },
    {
      id: 'wf-2',
      name: 'Market Research',
      description: 'Automated competitive analysis and market insights',
      status: 'active',
      lastRun: '1 day ago',
      steps: 8,
      completion: 100,
      division: 'Research',
      color: '#0ea5e9',
      icon: BrainCircuit,
      connected_agents: [2, 6],
      performance: [
        { name: "Mon", value: 92 },
        { name: "Tue", value: 85 },
        { name: "Wed", value: 90 },
        { name: "Thu", value: 95 },
        { name: "Fri", value: 100 },
      ],
      schedule: {
        nextRun: '2023-04-15T00:00:00',
        lastRun: '2023-04-14T00:00:00',
        frequency: 'Daily',
        timeRemaining: '9h 45m'
      }
    },
    {
      id: 'wf-3',
      name: 'SEO Optimization',
      description: 'Analyze and enhance content for better search performance',
      status: 'scheduled',
      lastRun: '3 days ago',
      steps: 6,
      completion: 0,
      division: 'Marketing',
      color: '#f97316',
      icon: BarChart2,
      connected_agents: [3, 7],
      performance: [
        { name: "Mon", value: 0 },
        { name: "Tue", value: 0 },
        { name: "Wed", value: 0 },
        { name: "Thu", value: 0 },
        { name: "Fri", value: 0 },
      ],
      schedule: {
        nextRun: '2023-04-17T10:00:00',
        lastRun: '2023-04-11T10:00:00',
        frequency: 'Weekly',
        timeRemaining: '3d 17h'
      }
    },
    {
      id: 'wf-4',
      name: 'Social Media Calendar',
      description: 'Auto-generate social content calendar with AI',
      status: 'paused',
      lastRun: '1 week ago',
      steps: 4,
      completion: 25,
      division: 'Social',
      color: '#8b5cf6',
      icon: Users,
      connected_agents: [1, 8],
      performance: [
        { name: "Mon", value: 15 },
        { name: "Tue", value: 20 },
        { name: "Wed", value: 25 },
        { name: "Thu", value: 25 },
        { name: "Fri", value: 25 },
      ],
      schedule: {
        nextRun: 'Paused',
        lastRun: '2023-04-07T14:30:00',
        frequency: 'Every 3 days',
        timeRemaining: 'N/A'
      }
    },
    {
      id: 'wf-5',
      name: 'Customer Support Automation',
      description: 'Handle support tickets with AI assistance',
      status: 'active',
      lastRun: '5 hours ago',
      steps: 7,
      completion: 45,
      division: 'Support',
      color: '#22c55e',
      icon: Wrench,
      connected_agents: [9, 10],
      performance: [
        { name: "Mon", value: 30 },
        { name: "Tue", value: 35 },
        { name: "Wed", value: 40 },
        { name: "Thu", value: 42 },
        { name: "Fri", value: 45 },
      ],
      schedule: {
        nextRun: '2023-04-14T16:00:00',
        lastRun: '2023-04-14T10:00:00',
        frequency: 'Every 6 hours',
        timeRemaining: '0h 45m'
      }
    },
    {
      id: 'wf-6',
      name: 'Email Marketing Campaign',
      description: 'Automate email sequence generation and analytics',
      status: 'scheduled',
      lastRun: 'Never',
      steps: 5,
      completion: 0,
      division: 'Marketing',
      color: '#f97316',
      icon: Zap,
      connected_agents: [3, 11],
      performance: [
        { name: "Mon", value: 0 },
        { name: "Tue", value: 0 },
        { name: "Wed", value: 0 },
        { name: "Thu", value: 0 },
        { name: "Fri", value: 0 },
      ],
      schedule: {
        nextRun: '2023-04-15T09:00:00',
        lastRun: 'N/A',
        frequency: 'One-time',
        timeRemaining: '18h 45m'
      }
    }
  ];

  useEffect(() => {
    let filtered = [...allWorkflows];
    
    if (searchTerm) {
      filtered = filtered.filter(workflow => 
        workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workflow.division.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedStatus) {
      filtered = filtered.filter(workflow => workflow.status === selectedStatus);
    }
    
    filtered = sortWorkflows(filtered, sortOption);
    
    setWorkflows(filtered);
  }, [searchTerm, selectedStatus, sortOption]);

  const sortWorkflows = (workflowList: Workflow[], option: string) => {
    switch(option) {
      case 'name':
        return [...workflowList].sort((a, b) => a.name.localeCompare(b.name));
      case 'lastRun':
        return [...workflowList].sort((a, b) => {
          if (a.lastRun === 'Never') return 1;
          if (b.lastRun === 'Never') return -1;
          
          const timeA = a.lastRun.includes('hour') ? 0 : 
                        a.lastRun.includes('day') ? 1 : 
                        a.lastRun.includes('week') ? 2 : 3;
          const timeB = b.lastRun.includes('hour') ? 0 : 
                        b.lastRun.includes('day') ? 1 : 
                        b.lastRun.includes('week') ? 2 : 3;
          return timeA - timeB;
        });
      case 'completion':
        return [...workflowList].sort((a, b) => b.completion - a.completion);
      case 'steps':
        return [...workflowList].sort((a, b) => b.steps - a.steps);
      default:
        return workflowList;
    }
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-500 bg-green-500/20 border border-green-500/30';
      case 'paused':
        return 'text-amber-500 bg-amber-500/20 border border-amber-500/30';
      case 'scheduled':
        return 'text-blue-500 bg-blue-500/20 border border-blue-500/30';
      default:
        return 'text-gray-500 bg-gray-500/20 border border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="w-3 h-3 mr-1" />;
      case 'paused':
        return <Pause className="w-3 h-3 mr-1" />;
      case 'scheduled':
        return <Clock className="w-3 h-3 mr-1" />;
      default:
        return null;
    }
  };

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'in-progress':
        return <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'pending':
        return <Hourglass className="w-4 h-4 text-gray-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
    }
  };

  const handleViewDetails = (workflow: Workflow) => {
    setSelectedWorkflow(workflow);
    setIsDialogOpen(true);
    setActiveTab('overview');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleWorkflowAction = (action: string, workflowId?: string) => {
    const actionMessages = {
      pause: "Workflow paused successfully",
      resume: "Workflow resumed successfully",
      run: "Workflow started successfully",
      edit: "Opening workflow editor",
    };

    toast.success(actionMessages[action], {
      description: `Action taken on workflow ${workflowId || (selectedWorkflow?.id || '')}`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-flow-background text-flow-foreground flex flex-col circuit-background">
      <Helmet>
        <title>{t('workflows')} | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-28 pb-12">
        <TransitionWrapper>
          <div className="max-w-7xl mx-auto">
            <PageHeader 
              title={t('workflows')}
              description="Automated workflows connect AI agents to accomplish complex tasks. Monitor, adjust, and deploy new workflows from this dashboard."
              icon={<GitBranch className="h-8 w-8 text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />}
              actions={
                <Button 
                  className="bg-flow-accent hover:bg-flow-accent/80 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-5 py-6 h-auto"
                  onClick={() => toast.success("Creating new workflow", { description: "Opening workflow creator" })}
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Create New Workflow
                </Button>
              }
              glassEffect={false}
            />
            
            <Separator className="my-8 opacity-20" />
            
            {/* Search and filters - redesigned for better UX */}
            <GlassMorphism 
              intensity="low" 
              className="mb-10 p-6 rounded-xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
            >
              <div className="relative flex-1 w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-flow-foreground/50" />
                <Input 
                  placeholder="Search workflows by name, description, or division..." 
                  className="pl-10 bg-flow-background/30 border-flow-border focus:border-flow-accent h-12 text-base w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <div className="flex items-center mr-3">
                  <Filter className="w-5 h-5 text-flow-foreground/70 mr-2" />
                  <span className="text-flow-foreground/70 hidden md:block">Status:</span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`border-flow-border px-4 py-2 h-10 ${!selectedStatus ? 'bg-flow-accent/20 text-flow-accent border-flow-accent/50' : ''}`}
                  onClick={() => setSelectedStatus(null)}
                >
                  All
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`border-flow-border px-4 py-2 h-10 ${selectedStatus === 'active' ? 'bg-green-500/20 text-green-400 border-green-400/50' : ''}`}
                  onClick={() => setSelectedStatus(selectedStatus === 'active' ? null : 'active')}
                >
                  <Play className="w-4 h-4 mr-1" />
                  Active
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`border-flow-border px-4 py-2 h-10 ${selectedStatus === 'scheduled' ? 'bg-blue-500/20 text-blue-400 border-blue-400/50' : ''}`}
                  onClick={() => setSelectedStatus(selectedStatus === 'scheduled' ? null : 'scheduled')}
                >
                  <Clock className="w-4 h-4 mr-1" />
                  Scheduled
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`border-flow-border px-4 py-2 h-10 ${selectedStatus === 'paused' ? 'bg-amber-500/20 text-amber-400 border-amber-400/50' : ''}`}
                  onClick={() => setSelectedStatus(selectedStatus === 'paused' ? null : 'paused')}
                >
                  <Pause className="w-4 h-4 mr-1" />
                  Paused
                </Button>
                
                <div className="relative ml-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-flow-border px-4 py-2 h-10 flex items-center"
                    onClick={toggleDropdown}
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Sort</span>
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                  {isDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 z-50 bg-flow-background/95 backdrop-blur-md border border-flow-border rounded-lg shadow-lg p-2 w-48"
                    >
                      <button 
                        className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-flow-accent/20 ${sortOption === 'lastRun' ? 'bg-flow-accent/10 text-flow-accent' : ''}`}
                        onClick={() => {
                          setSortOption('lastRun');
                          setIsDropdownOpen(false);
                        }}
                      >
                        Last Run
                      </button>
                      <button 
                        className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-flow-accent/20 ${sortOption === 'name' ? 'bg-flow-accent/10 text-flow-accent' : ''}`}
                        onClick={() => {
                          setSortOption('name');
                          setIsDropdownOpen(false);
                        }}
                      >
                        Name
                      </button>
                      <button 
                        className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-flow-accent/20 ${sortOption === 'completion' ? 'bg-flow-accent/10 text-flow-accent' : ''}`}
                        onClick={() => {
                          setSortOption('completion');
                          setIsDropdownOpen(false);
                        }}
                      >
                        Completion
                      </button>
                      <button 
                        className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-flow-accent/20 ${sortOption === 'steps' ? 'bg-flow-accent/10 text-flow-accent' : ''}`}
                        onClick={() => {
                          setSortOption('steps');
                          setIsDropdownOpen(false);
                        }}
                      >
                        Number of Steps
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </GlassMorphism>
            
            {/* Workflow cards - redesigned with more detailed info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflows.map((workflow) => (
                <Card 
                  key={workflow.id} 
                  className={`overflow-hidden border border-flow-border transition-all duration-300 group
                  ${hoveredWorkflow === workflow.id ? 'shadow-lg transform -translate-y-1' : ''}`}
                  style={{
                    background: `linear-gradient(135deg, rgba(30,30,35,0.8) 0%, rgba(15,15,20,0.9) 100%)`,
                    boxShadow: hoveredWorkflow === workflow.id ? `0 0 15px ${workflow.color}40` : 'none',
                  }}
                  onMouseEnter={() => setHoveredWorkflow(workflow.id)}
                  onMouseLeave={() => setHoveredWorkflow(null)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="p-3 rounded-full mr-4" style={{ backgroundColor: `${workflow.color}20` }}>
                          {React.createElement(workflow.icon, { 
                            className: 'h-5 w-5', 
                            style: { color: workflow.color } 
                          })}
                        </div>
                        <CardTitle className="text-xl font-semibold">{workflow.name}</CardTitle>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusClasses(workflow.status)}`}>
                        {getStatusIcon(workflow.status)}
                        {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                      </span>
                    </div>
                    <CardDescription className="mt-3 line-clamp-2">{workflow.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Schedule information - new in the redesign */}
                    {workflow.schedule && (
                      <div className="flex items-center justify-between text-sm text-flow-foreground/70 mb-3 bg-flow-background/10 rounded-md p-3 border border-flow-border/30">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="whitespace-nowrap">
                            {workflow.schedule.timeRemaining === 'N/A' 
                              ? 'Paused'
                              : `Next: ${workflow.schedule.timeRemaining}`}
                          </span>
                        </div>
                        
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{workflow.schedule.frequency}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          <span>{workflow.connected_agents.length}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Performance chart */}
                    <div className="h-[80px] mb-3 bg-flow-background/10 p-2 rounded-md border border-flow-border/30 overflow-hidden scan-lines relative group">
                      <div className="absolute inset-0 bg-flow-background/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="w-5 h-5 text-flow-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <ChartLine 
                        data={workflow.performance} 
                        lineColor={workflow.color}
                        showTooltip={true}
                        showGrid={false}
                        showLegend={false}
                      />
                    </div>
                    
                    {/* Progress bar with enhanced styling */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span>Completion</span>
                        <span className="font-mono bg-flow-background/20 px-2 py-1 rounded border border-flow-border/30">
                          {workflow.completion}%
                        </span>
                      </div>
                      <Progress
                        value={workflow.completion}
                        className="h-2 bg-flow-background/20"
                        indicatorColor={workflow.color}
                      />
                    </div>
                    
                    <div className="mt-4">
                      <Badge 
                        variant="outline" 
                        className="bg-flow-muted/20 border border-flow-border/50 hover:bg-flow-muted/30"
                        style={{ color: workflow.color }}
                      >
                        <LinkIcon className="w-3 h-3 mr-1" />
                        {workflow.division}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2 pb-4">
                    {/* Quick action buttons */}
                    <div className="flex gap-2">
                      {workflow.status === 'active' ? (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-1 text-amber-400 hover:text-amber-300 hover:bg-amber-400/10"
                          onClick={() => handleWorkflowAction('pause', workflow.id)}
                        >
                          <Pause className="w-4 h-4" />
                        </Button>
                      ) : workflow.status === 'paused' ? (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-1 text-green-400 hover:text-green-300 hover:bg-green-400/10"
                          onClick={() => handleWorkflowAction('resume', workflow.id)}
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-1 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                          onClick={() => handleWorkflowAction('run', workflow.id)}
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-1 text-flow-foreground/60 hover:text-flow-foreground hover:bg-flow-background/30"
                        onClick={() => handleWorkflowAction('edit', workflow.id)}
                      >
                        <Wrench className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button 
                      size="sm"
                      className="text-flow-accent flex items-center transition-all duration-300 bg-flow-background/20 hover:bg-flow-background/40 border border-flow-accent/30"
                      onClick={() => handleViewDetails(workflow)}
                      style={{
                        boxShadow: hoveredWorkflow === workflow.id ? `0 0 10px ${workflow.color}30` : 'none',
                        color: workflow.color
                      }}
                    >
                      <ZoomIn className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {/* Empty state */}
            {workflows.length === 0 && (
              <GlassMorphism intensity="low" className="text-center py-16 rounded-xl">
                <FileText className="w-16 h-16 mx-auto mb-3 opacity-30" />
                <h3 className="text-xl font-medium mb-2">No workflows found</h3>
                <p className="text-flow-foreground/60 mb-6">Try adjusting your search or filters</p>
                <Button 
                  variant="outline" 
                  className="border-flow-accent/30 text-flow-accent hover:bg-flow-accent/10"
                  onClick={() => toast.success("Creating new workflow", { description: "Opening workflow creator" })}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create Your First Workflow
                </Button>
              </GlassMorphism>
            )}
            
            {/* Detailed workflow dialog - completely redesigned */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              {selectedWorkflow && (
                <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto bg-flow-background border-flow-border">
                  <div className="sticky top-0 z-10 bg-flow-background pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="p-3 rounded-full mr-4" 
                          style={{ 
                            backgroundColor: `${selectedWorkflow.color}20`,
                            boxShadow: `0 0 10px ${selectedWorkflow.color}30`
                          }}
                        >
                          {React.createElement(selectedWorkflow.icon, { 
                            className: 'h-7 w-7', 
                            style: { color: selectedWorkflow.color } 
                          })}
                        </div>
                        <DialogTitle className="text-2xl flex items-center gap-2">
                          {selectedWorkflow.name}
                          <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusClasses(selectedWorkflow.status)}`}>
                            {getStatusIcon(selectedWorkflow.status)}
                            {selectedWorkflow.status.charAt(0).toUpperCase() + selectedWorkflow.status.slice(1)}
                          </span>
                        </DialogTitle>
                      </div>
                      
                      {/* Quick action buttons in the header */}
                      <div className="flex gap-2">
                        {selectedWorkflow.status === 'active' ? (
                          <Button 
                            variant="outline"
                            className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                            onClick={() => handleWorkflowAction('pause')}
                          >
                            <Pause className="w-4 h-4 mr-2" />
                            Pause
                          </Button>
                        ) : selectedWorkflow.status === 'paused' ? (
                          <Button 
                            variant="outline"
                            className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                            onClick={() => handleWorkflowAction('resume')}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Resume
                          </Button>
                        ) : (
                          <Button 
                            variant="outline"
                            className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                            onClick={() => handleWorkflowAction('run')}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Run Now
                          </Button>
                        )}
                        <Button 
                          variant="outline"
                          className="border-flow-border/50 hover:border-flow-accent/50"
                          onClick={() => handleWorkflowAction('edit')}
                        >
                          <Wrench className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                    <DialogDescription className="mt-2">{selectedWorkflow.description}</DialogDescription>
                  </div>
                  
                  {/* Improved tab navigation */}
                  <Tabs 
                    value={activeTab} 
                    onValueChange={setActiveTab} 
                    className="mt-6"
                  >
                    <TabsList className="bg-flow-background/30 border border-flow-border/30 p-1">
                      <TabsTrigger value="overview" className="flex items-center">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Overview
                      </TabsTrigger>
                      <TabsTrigger value="steps" className="flex items-center">
                        <Code className="w-4 h-4 mr-2" />
                        Steps
                      </TabsTrigger>
                      <TabsTrigger value="agents" className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Connected Agents
                      </TabsTrigger>
                      <TabsTrigger value="settings" className="flex items-center">
                        <Settings2 className="w-4 h-4 mr-2" />
                        Settings
                      </TabsTrigger>
                    </TabsList>
                    
                    {/* Overview tab - completely redesigned */}
                    <TabsContent value="overview" className="mt-6 space-y-6">
                      {/* Insights section - new in the redesign */}
                      {selectedWorkflow.insights && (
                        <div className="bg-flow-accent/5 border border-flow-accent/20 rounded-md p-4 mb-6">
                          <h3 className="text-lg font-semibold mb-3 text-flow-accent flex items-center">
                            <Sparkles className="w-5 h-5 mr-2 text-flow-accent" />
                            AI Insights
                          </h3>
                          <ul className="space-y-2">
                            {selectedWorkflow.insights.map((insight, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5" />
                                <span>{insight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Performance chart */}
                        <div>
                          <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <LineChart className="w-5 h-5 mr-2" style={{ color: selectedWorkflow.color }} />
                            Performance Trend
                          </h3>
                          <div className="bg-flow-muted/10 p-5 rounded-lg h-[200px] border border-flow-border scan-lines">
                            <ChartLine 
                              data={selectedWorkflow.performance} 
                              lineColor={selectedWorkflow.color}
                              showTooltip={true}
                            />
                          </div>
                        </div>
                        
                        {/* Connected agents summary */}
                        <div>
                          <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <Users className="w-5 h-5 mr-2" style={{ color: selectedWorkflow.color }} />
                            Connected Agents
                          </h3>
                          <div className="bg-flow-muted/10 p-5 rounded-lg border border-flow-border h-[200px] overflow-auto scrollbar-thin">
                            {selectedWorkflow.agents ? (
                              <div className="space-y-3">
                                {selectedWorkflow.agents.map((agent) => (
                                  <GlassMorphism 
                                    key={agent.id} 
                                    intensity="low" 
                                    className="p-3 flex items-center justify-between group cursor-pointer hover:border-flow-accent/50 transition-all duration-300"
                                  >
                                    <div className="flex items-center">
                                      <div 
                                        className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                                        style={{ 
                                          backgroundColor: `${selectedWorkflow.color}20`,
                                          borderColor: `${selectedWorkflow.color}40`,
                                          borderWidth: '1px'
                                        }}
                                      >
                                        <Users 
                                          className="w-4 h-4" 
                                          style={{ color: selectedWorkflow.color }} 
                                        />
                                      </div>
                                      <div>
                                        <div className="font-medium">{agent.name}</div>
                                        <div className="text-xs text-flow-foreground/60">Role: {agent.role}</div>
                                      </div>
                                    </div>
                                    <div className="flex items-center">
                                      <Badge
                                        className={`mr-2 ${
                                          agent.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                          agent.status === 'busy' ? 'bg-amber-500/20 text-amber-400' :
                                          agent.status === 'idle' ? 'bg-blue-500/20 text-blue-400' :
                                          'bg-red-500/20 text-red-400'
                                        }`}
                                      >
                                        {agent.status}
                                      </Badge>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                      >
                                        <ChevronRight className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </GlassMorphism>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center text-flow-foreground/60 py-8">
                                <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                                <p>No agent details available</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Workflow progress timeline */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                          <Code className="w-5 h-5 mr-2" style={{ color: selectedWorkflow.color }} />
                          Workflow Timeline
                        </h3>
                        <div className="bg-flow-muted/10 p-5 rounded-lg border border-flow-border">
                          <div className="mb-2 flex justify-between items-center">
                            <div className="font-semibold">Overall Completion</div>
                            <div className="font-mono text-sm bg-flow-background/30 px-3 py-1 rounded border border-flow-border/20">
                              {selectedWorkflow.completion}%
                            </div>
                          </div>
                          <Progress
                            value={selectedWorkflow.completion}
                            className="h-3 bg-flow-background/20 mb-6"
                            indicatorColor={selectedWorkflow.color}
                          />
                          
                          {/* Step timeline */}
                          {selectedWorkflow.stepDetails ? (
                            <div className="space-y-3 mt-6">
                              {selectedWorkflow.stepDetails.map((step, index) => {
                                const isCompleted = step.status === 'completed';
                                const isInProgress = step.status === 'in-progress';
                                
                                return (
                                  <div 
                                    key={step.id} 
                                    className="flex items-center p-3 border border-flow-border/30 rounded-md transition-all duration-300 hover:border-flow-accent/30"
                                    style={{
                                      background: isCompleted 
                                        ? `linear-gradient(90deg, ${selectedWorkflow.color}10, rgba(30,30,35,0.2))` 
                                        : isInProgress 
                                          ? `linear-gradient(90deg, ${selectedWorkflow.color}05, rgba(30,30,35,0.2))`
                                          : 'rgba(30,30,35,0.2)'
                                    }}
                                  >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                                      isCompleted
                                        ? 'bg-green-500/20 text-green-400' :
                                      isInProgress
                                        ? 'bg-blue-500/20 text-blue-400' :
                                      'bg-flow-muted/20 text-flow-foreground/40 border border-flow-border/30'
                                    }`}>
                                      {getStepStatusIcon(step.status)}
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-medium">{step.name}</div>
                                      <div className="text-xs text-flow-foreground/60 flex items-center mt-1">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {step.timeActual ? `${step.timeActual} (estimated: ${step.timeEstimate})` : `Estimated: ${step.timeEstimate}`}
                                        {step.agentIds.length > 0 && (
                                          <span className="ml-3 flex items-center">
                                            <Users className="w-3 h-3 mr-1" />
                                            {step.agentIds.length} agent{step.agentIds.length > 1 ? 's' : ''}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    <div className="text-xs font-mono text-flow-foreground/60 px-3 py-1 bg-flow-background/30 rounded border border-flow-border/20">
                                      {isCompleted 
                                        ? '100%' 
                                        : isInProgress 
                                          ? '50%'
                                          : '0%'
                                      }
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="text-center text-flow-foreground/60 py-8">
                              <Code className="w-8 h-8 mx-auto mb-2 opacity-40" />
                              <p>No step details available</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                    
                    {/* Steps tab */}
                    <TabsContent value="steps" className="mt-6">
                      <div className="bg-flow-muted/10 p-5 rounded-lg border border-flow-border">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold">Workflow Steps</h3>
                          <Button variant="outline" size="sm">
                            <PlusCircle className="w-3 h-3 mr-1" />
                            Add Step
                          </Button>
                        </div>
                        
                        {selectedWorkflow.stepDetails ? (
                          <div className="space-y-4">
                            {selectedWorkflow.stepDetails.map((step, index) => (
                              <GlassMorphism 
                                key={step.id}
                                intensity="low" 
                                className="p-4 border border-flow-border/30 rounded-md"
                              >
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex items-center">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                                      step.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                      step.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                                      'bg-flow-muted/20 text-flow-foreground/40'
                                    }`}>
                                      {getStepStatusIcon(step.status)}
                                    </div>
                                    <div>
                                      <div className="font-medium text-lg flex items-center">
                                        Step {index + 1}: {step.name}
                                      </div>
                                    </div>
                                  </div>
                                  <Badge className={`
                                    ${step.status === 'completed' ? 'bg-green-500/20 text-green-400' : 
                                      step.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                                      'bg-flow-muted/20 text-flow-foreground/40'}
                                  `}>
                                    {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm pl-9">
                                  <div className="border border-flow-border/20 rounded p-3 bg-flow-background/20">
                                    <div className="text-flow-foreground/60 mb-2">Time</div>
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <div className="font-medium">Estimated</div>
                                        <div className="text-flow-foreground/70">{step.timeEstimate}</div>
                                      </div>
                                      {step.timeActual && (
                                        <div>
                                          <div className="font-medium">Actual</div>
                                          <div className="text-flow-foreground/70">{step.timeActual}</div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="border border-flow-border/20 rounded p-3 bg-flow-background/20">
                                    <div className="text-flow-foreground/60 mb-2">Assigned Agents</div>
                                    {selectedWorkflow.agents ? (
                                      <div>
                                        {step.agentIds.map(agentId => {
                                          const agent = selectedWorkflow.agents?.find(a => a.id === agentId);
                                          return agent ? (
                                            <div key={agentId} className="flex items-center justify-between mb-2 last:mb-0">
                                              <div className="flex items-center">
                                                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-flow-background/40 mr-2">
                                                  <Users className="w-3 h-3" />
                                                </div>
                                                <span>{agent.name}</span>
                                              </div>
                                              <Badge className={`
                                                ${agent.status === 'active' ? 'bg-green-500/20 text-green-400' : 
                                                  agent.status === 'busy' ? 'bg-amber-500/20 text-amber-400' :
                                                  agent.status === 'idle' ? 'bg-blue-500/20 text-blue-400' :
                                                  'bg-red-500/20 text-red-400'}
                                              `}>
                                                {agent.status}
                                              </Badge>
                                            </div>
                                          ) : (
                                            <div key={agentId}>Agent #{agentId}</div>
                                          );
                                        })}
                                      </div>
                                    ) : (
                                      <div className="text-flow-foreground/60">
                                        {step.agentIds.map(id => `Agent #${id}`).join(', ')}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="mt-4 pl-9 flex gap-2">
                                  <Button variant="ghost" size="sm" className="text-flow-foreground/70 hover:text-flow-foreground">
                                    <Wrench className="w-3 h-3 mr-1" />
                                    Edit
                                  </Button>
                                  {step.status === 'in-progress' && (
                                    <Button variant="ghost" size="sm" className="text-amber-400 hover:text-amber-300">
                                      <Pause className="w-3 h-3 mr-1" />
                                      Pause
                                    </Button>
                                  )}
                                </div>
                              </GlassMorphism>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center text-flow-foreground/60 py-8">
                            <Code className="w-8 h-8 mx-auto mb-2 opacity-40" />
                            <p>Step details will appear here</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    {/* Connected Agents tab */}
                    <TabsContent value="agents" className="mt-6">
                      <div className="bg-flow-muted/10 p-5 rounded-lg border border-flow-border">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold">Connected Agents</h3>
                          <Button variant="outline" size="sm">
                            <PlusCircle className="w-3 h-3 mr-1" />
                            Add Agent
                          </Button>
                        </div>
                        
                        {selectedWorkflow.agents ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedWorkflow.agents.map((agent) => (
                              <GlassMorphism 
                                key={agent.id}
                                intensity="low" 
                                className="p-4 border border-flow-border/40 rounded-md"
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex items-start">
                                    <div 
                                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                                      style={{ 
                                        backgroundColor: `${selectedWorkflow.color}20`,
                                        borderColor: `${selectedWorkflow.color}40`,
                                        borderWidth: '1px'
                                      }}
                                    >
                                      <Users 
                                        className="w-5 h-5" 
                                        style={{ color: selectedWorkflow.color }} 
                                      />
                                    </div>
                                    <div>
                                      <div className="font-medium text-lg">{agent.name}</div>
                                      <div className="text-sm text-flow-foreground/70">{agent.role}</div>
                                    </div>
                                  </div>
                                  <Badge className={`
                                    ${agent.status === 'active' ? 'bg-green-500/20 text-green-400' : 
                                      agent.status === 'busy' ? 'bg-amber-500/20 text-amber-400' :
                                      agent.status === 'idle' ? 'bg-blue-500/20 text-blue-400' :
                                      'bg-red-500/20 text-red-400'}
                                  `}>
                                    {agent.status}
                                  </Badge>
                                </div>
                                <div className="mt-4 flex items-center">
                                  <div className="flex-1">
                                    <div className="text-xs text-flow-foreground/60 mb-1">Efficiency</div>
                                    <div className="flex items-center">
                                      <Progress
                                        value={agent.efficiency}
                                        className="h-2 flex-1 bg-flow-background/20"
                                        indicatorColor={
                                          agent.efficiency > 80 ? '#22c55e' : 
                                          agent.efficiency > 50 ? '#eab308' : 
                                          '#ef4444'
                                        }
                                      />
                                      <span className="ml-2 text-xs font-mono">{agent.efficiency}%</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-4 flex gap-2">
                                  <Button variant="ghost" size="sm" className="text-flow-foreground/70 hover:text-flow-foreground">
                                    <Wrench className="w-3 h-3 mr-1" />
                                    Configure
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                                    <ZoomIn className="w-3 h-3 mr-1" />
                                    View Agent
                                  </Button>
                                </div>
                              </GlassMorphism>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center text-flow-foreground/60 py-8">
                            <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                            <p>Agent details will appear here</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    {/* Settings tab */}
                    <TabsContent value="settings" className="mt-6">
                      <div className="bg-flow-muted/10 p-5 rounded-lg border border-flow-border">
                        <h3 className="text-lg font-semibold mb-4">Workflow Settings</h3>
                        {selectedWorkflow.schedule ? (
                          <div className="space-y-6">
                            <div className="border border-flow-border/30 rounded-md p-4 bg-flow-background/10">
                              <h4 className="text-md font-medium mb-3 flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                Schedule Settings
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <div className="text-sm text-flow-foreground/60 mb-1">Frequency</div>
                                  <div className="bg-flow-background/30 p-2 rounded border border-flow-border/20">
                                    {selectedWorkflow.schedule.frequency}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-flow-foreground/60 mb-1">Next Run</div>
                                  <div className="bg-flow-background/30 p-2 rounded border border-flow-border/20">
                                    {selectedWorkflow.schedule.nextRun === 'Paused' ? 'Paused' : 
                                      new Date(selectedWorkflow.schedule.nextRun).toLocaleString()
                                    }
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-flow-foreground/60 mb-1">Last Run</div>
                                  <div className="bg-flow-background/30 p-2 rounded border border-flow-border/20">
                                    {selectedWorkflow.schedule.lastRun === 'N/A' ? 'Never' : 
                                      new Date(selectedWorkflow.schedule.lastRun).toLocaleString()
                                    }
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-flow-foreground/60 mb-1">Time Remaining</div>
                                  <div className="bg-flow-background/30 p-2 rounded border border-flow-border/20">
                                    {selectedWorkflow.schedule.timeRemaining}
                                  </div>
                                </div>
                              </div>
                              <Button variant="outline" size="sm" className="mt-4">
                                <Settings2 className="w-3 h-3 mr-1" />
                                Change Schedule
                              </Button>
                            </div>
                            
                            <div className="border border-flow-border/30 rounded-md p-4 bg-flow-background/10">
                              <h4 className="text-md font-medium mb-3 flex items-center">
                                <Users className="w-4 h-4 mr-2" />
                                Permissions
                              </h4>
                              <p className="text-sm text-flow-foreground/60 mb-4">Control who can view, edit, or run this workflow</p>
                              <Button variant="outline" size="sm">
                                <Settings2 className="w-3 h-3 mr-1" />
                                Manage Permissions
                              </Button>
                            </div>
                            
                            <div className="border border-flow-border/30 rounded-md p-4 bg-flow-background/10">
                              <h4 className="text-md font-medium mb-3 flex items-center">
                                <Settings2 className="w-4 h-4 mr-2" />
                                Advanced Settings
                              </h4>
                              <p className="text-sm text-flow-foreground/60 mb-4">Configure error handling, notifications, and other advanced options</p>
                              <Button variant="outline" size="sm">
                                <Settings2 className="w-3 h-3 mr-1" />
                                Advanced Configuration
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center text-flow-foreground/60 py-8">
                            <SlidersHorizontal className="w-8 h-8 mx-auto mb-2 opacity-40" />
                            <p>Settings will appear here</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              )}
            </Dialog>
          </div>
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Workflows;
