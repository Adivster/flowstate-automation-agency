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
  Filter, ZoomIn, BarChart2, Link, Users, RefreshCw,
  Play, Pause, Wrench, Zap, Sparkles, BrainCircuit,
  GitBranch, GitFork, PlusCircle, SlidersHorizontal
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LineChart } from '@/components/ui/chart';
import GlassMorphism from '@/components/ui/GlassMorphism';
import PageHeader from '@/components/ui/design-system/PageHeader';

const Workflows = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hoveredWorkflow, setHoveredWorkflow] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('lastRun');

  const allWorkflows = [
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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

  const sortWorkflows = (workflowList, option) => {
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

  const getStatusClasses = (status) => {
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

  const getStatusIcon = (status) => {
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

  const handleViewDetails = (workflow) => {
    setSelectedWorkflow(workflow);
    setIsDialogOpen(true);
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
                  onClick={() => alert("Create new workflow")}
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Create New Workflow
                </Button>
              }
              glassEffect={false}
            />
            
            <Separator className="my-8 opacity-20" />
            
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
                  <span className="text-flow-foreground/70 hidden md:block">Filter:</span>
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
                    onClick={() => document.getElementById('sortDropdown').classList.toggle('hidden')}
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Sort</span>
                  </Button>
                  <div 
                    id="sortDropdown" 
                    className="absolute right-0 mt-2 hidden z-50 bg-flow-background/95 backdrop-blur-md border border-flow-border rounded-lg shadow-lg p-2 w-48"
                  >
                    <button 
                      className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-flow-accent/20 ${sortOption === 'lastRun' ? 'bg-flow-accent/10 text-flow-accent' : ''}`}
                      onClick={() => setSortOption('lastRun')}
                    >
                      Last Run
                    </button>
                    <button 
                      className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-flow-accent/20 ${sortOption === 'name' ? 'bg-flow-accent/10 text-flow-accent' : ''}`}
                      onClick={() => setSortOption('name')}
                    >
                      Name
                    </button>
                    <button 
                      className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-flow-accent/20 ${sortOption === 'completion' ? 'bg-flow-accent/10 text-flow-accent' : ''}`}
                      onClick={() => setSortOption('completion')}
                    >
                      Completion
                    </button>
                    <button 
                      className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-flow-accent/20 ${sortOption === 'steps' ? 'bg-flow-accent/10 text-flow-accent' : ''}`}
                      onClick={() => setSortOption('steps')}
                    >
                      Number of Steps
                    </button>
                  </div>
                </div>
              </div>
            </GlassMorphism>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflows.map((workflow) => (
                <Card 
                  key={workflow.id} 
                  className={`overflow-hidden border border-flow-border transition-all duration-300 group hover:shadow-lg
                  ${hoveredWorkflow === workflow.id ? 'shadow-[0_0_15px_rgba(0,0,0,0.3)]' : ''}`}
                  style={{
                    background: `linear-gradient(135deg, rgba(30,30,35,0.8) 0%, rgba(15,15,20,0.9) 100%)`,
                    boxShadow: hoveredWorkflow === workflow.id ? `0 0 15px ${workflow.color}40` : 'none',
                    transform: hoveredWorkflow === workflow.id ? 'translateY(-3px)' : 'translateY(0)'
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
                    <div className="flex items-center justify-between text-sm text-flow-foreground/70 mb-3 bg-flow-background/10 rounded-md p-3 border border-flow-border/30">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="whitespace-nowrap">{workflow.lastRun}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Code className="w-4 h-4 mr-2" />
                        <span>{workflow.steps} steps</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{workflow.connected_agents.length}</span>
                      </div>
                    </div>
                    
                    <div className="h-[80px] mb-3 bg-flow-background/10 p-2 rounded-md border border-flow-border/30 overflow-hidden scan-lines relative group">
                      <div className="absolute inset-0 bg-flow-background/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="w-5 h-5 text-flow-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <LineChart 
                        data={workflow.performance} 
                        lineColor={workflow.color}
                        referenceLineY={null}
                        referenceLineLabel=""
                        domain={null}
                        onClick={() => {}}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span>Completion</span>
                        <span className="font-mono bg-flow-background/20 px-2 py-1 rounded border border-flow-border/30">
                          {workflow.completion}%
                        </span>
                      </div>
                      <div className="w-full bg-flow-background/20 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-2 transition-all duration-700 ease-out"
                          style={{ 
                            width: `${workflow.completion}%`, 
                            backgroundColor: workflow.color,
                            boxShadow: `0 0 8px ${workflow.color}`
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Badge 
                        variant="outline" 
                        className="bg-flow-muted/20 border border-flow-border/50 hover:bg-flow-muted/30"
                        style={{ color: workflow.color }}
                      >
                        <Link className="w-3 h-3 mr-1" />
                        {workflow.division}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2 pb-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-flow-foreground/60 hover:text-flow-foreground hover:bg-flow-background/30"
                    >
                      <Wrench className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
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
            
            {workflows.length === 0 && (
              <GlassMorphism intensity="low" className="text-center py-16 rounded-xl">
                <FileText className="w-16 h-16 mx-auto mb-3 opacity-30" />
                <h3 className="text-xl font-medium mb-2">No workflows found</h3>
                <p className="text-flow-foreground/60 mb-6">Try adjusting your search or filters</p>
                <Button 
                  variant="outline" 
                  className="border-flow-accent/30 text-flow-accent hover:bg-flow-accent/10"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create Your First Workflow
                </Button>
              </GlassMorphism>
            )}
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              {selectedWorkflow && (
                <>
                  <DialogHeader>
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
                    <DialogDescription className="mt-2">{selectedWorkflow.description}</DialogDescription>
                  </DialogHeader>
                  
                  <Tabs defaultValue="overview" className="mt-6">
                    <TabsList className="bg-flow-background/30 border border-flow-border/30 p-1">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="steps">Steps</TabsTrigger>
                      <TabsTrigger value="agents">Connected Agents</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="mt-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <BarChart2 className="w-5 h-5 mr-2" style={{ color: selectedWorkflow.color }} />
                            Performance Trend
                          </h3>
                          <div className="bg-flow-muted/10 p-5 rounded-lg h-[200px] border border-flow-border scan-lines">
                            <LineChart 
                              data={selectedWorkflow.performance} 
                              lineColor={selectedWorkflow.color}
                              referenceLineY={null}
                              referenceLineLabel=""
                              domain={null}
                              onClick={() => {}}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <Users className="w-5 h-5 mr-2" style={{ color: selectedWorkflow.color }} />
                            Connected Agents
                          </h3>
                          <div className="bg-flow-muted/10 p-5 rounded-lg border border-flow-border h-[200px] overflow-auto scrollbar-thin">
                            <div className="space-y-3">
                              {selectedWorkflow.connected_agents.map((agentId) => (
                                <GlassMorphism 
                                  key={agentId} 
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
                                      <div className="font-medium">Agent #{agentId}</div>
                                      <div className="text-xs text-flow-foreground/60">Division: {selectedWorkflow.division}</div>
                                    </div>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                  >
                                    <ArrowRight className="w-4 h-4" />
                                  </Button>
                                </GlassMorphism>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                          <Code className="w-5 h-5 mr-2" style={{ color: selectedWorkflow.color }} />
                          Workflow Progress
                        </h3>
                        <div className="bg-flow-muted/10 p-5 rounded-lg border border-flow-border">
                          <div className="mb-2 flex justify-between items-center">
                            <div className="font-semibold">Overall Completion</div>
                            <div className="font-mono text-sm bg-flow-background/30 px-3 py-1 rounded border border-flow-border/20">
                              {selectedWorkflow.completion}%
                            </div>
                          </div>
                          <div className="w-full mb-6 bg-flow-background/20 rounded-full h-3 overflow-hidden">
                            <div 
                              className="h-3 transition-all duration-700 ease-out"
                              style={{ 
                                width: `${selectedWorkflow.completion}%`, 
                                backgroundImage: `linear-gradient(to right, ${selectedWorkflow.color}90, rgba(30,30,35,0.2))`,
                                boxShadow: `0 0 10px ${selectedWorkflow.color}`
                              }}
                            />
                          </div>
                          
                          <div className="space-y-3 mt-6">
                            {Array.from({ length: selectedWorkflow.steps }).map((_, index) => {
                              const isCompleted = index < selectedWorkflow.completion / (100 / selectedWorkflow.steps);
                              const isInProgress = index === Math.floor(selectedWorkflow.completion / (100 / selectedWorkflow.steps));
                              
                              return (
                                <div 
                                  key={index} 
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
                                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                      : isInProgress
                                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 animate-pulse-subtle'
                                        : 'bg-flow-muted/20 text-flow-foreground/40 border border-flow-border/30'
                                  }`}>
                                    {isCompleted
                                      ? <CheckCircle className="w-4 h-4" />
                                      : isInProgress
                                        ? <RefreshCw className="w-4 h-4" />
                                        : <Clock className="w-4 h-4" />
                                    }
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium">Step {index + 1}</div>
                                    <div className="text-xs text-flow-foreground/60">
                                      {isCompleted
                                        ? 'Completed'
                                        : isInProgress
                                          ? 'In Progress'
                                          : 'Pending'
                                      }
                                    </div>
                                  </div>
                                  <div className="text-xs font-mono text-flow-foreground/60 px-3 py-1 bg-flow-background/30 rounded border border-flow-border/20">
                                    {isCompleted 
                                      ? '100%' 
                                      : isInProgress 
                                        ? `${Math.round((selectedWorkflow.completion % (100 / selectedWorkflow.steps)) / (100 / selectedWorkflow.steps) * 100)}%`
                                        : '0%'
                                    }
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="steps" className="mt-6">
                      <div className="bg-flow-muted/10 p-5 rounded-lg border border-flow-border">
                        <h3 className="text-lg font-semibold mb-4">Workflow Steps</h3>
                        <div className="text-center text-flow-foreground/60 py-8">
                          <Code className="w-8 h-8 mx-auto mb-2 opacity-40" />
                          <p>Step details will appear here</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="agents" className="mt-6">
                      <div className="bg-flow-muted/10 p-5 rounded-lg border border-flow-border">
                        <h3 className="text-lg font-semibold mb-4">Connected Agents</h3>
                        <div className="text-center text-flow-foreground/60 py-8">
                          <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                          <p>Agent details will appear here</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="settings" className="mt-6">
                      <div className="bg-flow-muted/10 p-5 rounded-lg border border-flow-border">
                        <h3 className="text-lg font-semibold mb-4">Workflow Settings</h3>
                        <div className="text-center text-flow-foreground/60 py-8">
                          <SlidersHorizontal className="w-8 h-8 mx-auto mb-2 opacity-40" />
                          <p>Settings will appear here</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex justify-end gap-3 mt-6">
                    <Button 
                      variant="outline"
                      className="border-flow-border/50 hover:border-flow-accent/50"
                    >
                      <Wrench className="w-4 h-4 mr-2" />
                      Edit Workflow
                    </Button>
                    {selectedWorkflow.status === 'active' ? (
                      <Button 
                        variant="default" 
                        className="bg-amber-500/80 hover:bg-amber-600/80 border border-amber-400"
                        style={{
                          boxShadow: '0 0 10px rgba(245, 158, 11, 0.3)'
                        }}
                      >
                        <Pause className="w-4 h-4 mr-2" />
                        Pause Workflow
                      </Button>
                    ) : selectedWorkflow.status === 'paused' ? (
                      <Button 
                        variant="default" 
                        className="bg-green-500/80 hover:bg-green-600/80 border border-green-400"
                        style={{
                          boxShadow: '0 0 10px rgba(34, 197, 94, 0.3)'
                        }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Resume Workflow
                      </Button>
                    ) : (
                      <Button 
                        variant="default" 
                        className="bg-flow-accent/80 hover:bg-flow-accent border border-flow-accent/50"
                        style={{
                          boxShadow: '0 0 10px rgba(217, 70, 239, 0.3)'
                        }}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Run Now
                      </Button>
                    )}
                  </div>
                </>
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
