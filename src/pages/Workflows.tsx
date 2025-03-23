
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
  Filter, ZoomIn, BarChart2, Link, Users, RefreshCw 
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { LineChart } from '@/components/ui/chart';
import GlassMorphism from '@/components/ui/GlassMorphism';

const Workflows = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sample workflow data
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

  // Filter workflows based on search term and selected status
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
    
    setWorkflows(filtered);
  }, [searchTerm, selectedStatus]);

  const getStatusClasses = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-500 bg-green-500/10';
      case 'paused':
        return 'text-amber-500 bg-amber-500/10';
      case 'scheduled':
        return 'text-blue-500 bg-blue-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  const handleViewDetails = (workflow) => {
    setSelectedWorkflow(workflow);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-flow-background text-flow-foreground flex flex-col">
      <Helmet>
        <title>{t('workflows')} | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <TransitionWrapper>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-1 neon-text">{t('workflows')}</h1>
            <p className="text-flow-foreground/70">
              Automated workflows connect AI agents to accomplish complex tasks. 
              Monitor, adjust, and deploy new workflows from this dashboard.
            </p>
          </div>
          
          {/* Search and Filter Section */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-flow-foreground/50" />
              <Input 
                placeholder="Search workflows..." 
                className="pl-10 bg-flow-background border-flow-border focus:border-flow-accent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className={`border-flow-border ${!selectedStatus ? 'bg-flow-accent/20' : ''}`}
                onClick={() => setSelectedStatus(null)}
              >
                All
              </Button>
              <Button 
                variant="outline" 
                className={`border-flow-border ${selectedStatus === 'active' ? 'bg-green-500/20 text-green-400' : ''}`}
                onClick={() => setSelectedStatus(selectedStatus === 'active' ? null : 'active')}
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Active
              </Button>
              <Button 
                variant="outline" 
                className={`border-flow-border ${selectedStatus === 'scheduled' ? 'bg-blue-500/20 text-blue-400' : ''}`}
                onClick={() => setSelectedStatus(selectedStatus === 'scheduled' ? null : 'scheduled')}
              >
                <Clock className="w-4 h-4 mr-1" />
                Scheduled
              </Button>
              <Button 
                variant="outline" 
                className={`border-flow-border ${selectedStatus === 'paused' ? 'bg-amber-500/20 text-amber-400' : ''}`}
                onClick={() => setSelectedStatus(selectedStatus === 'paused' ? null : 'paused')}
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Paused
              </Button>
            </div>
          </div>
          
          {/* Workflow Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workflows.map((workflow) => (
              <Card key={workflow.id} className="overflow-hidden border border-flow-border transition-all hover:shadow-md hover:border-flow-accent/50">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-semibold">{workflow.name}</CardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses(workflow.status)}`}>
                      {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                    </span>
                  </div>
                  <CardDescription>{workflow.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-flow-foreground/70 mb-3">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Last run: {workflow.lastRun}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Code className="w-4 h-4 mr-2" />
                      <span>{workflow.steps} steps</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{workflow.connected_agents.length} agents</span>
                    </div>
                  </div>
                  
                  {/* Mini Performance Chart */}
                  <div className="h-[80px] mb-3 bg-flow-background/40 p-2 rounded-md">
                    <LineChart data={workflow.performance} />
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Completion</span>
                      <span>{workflow.completion}%</span>
                    </div>
                    <Progress value={workflow.completion} className="h-2" />
                  </div>
                  
                  {/* Tag for division */}
                  <div className="mt-3 mb-2">
                    <Badge variant="outline" className="bg-flow-muted/30">
                      <Link className="w-3 h-3 mr-1" />
                      {workflow.division}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-flow-foreground/60 hover:text-flow-foreground"
                  >
                    Edit Workflow
                  </Button>
                  <Button 
                    size="sm"
                    className="text-flow-accent hover:text-flow-accent/80 flex items-center"
                    onClick={() => handleViewDetails(workflow)}
                  >
                    <ZoomIn className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* Workflow Details Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-4xl bg-flow-background border-flow-border">
              {selectedWorkflow && (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-2">
                      {selectedWorkflow.name}
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses(selectedWorkflow.status)}`}>
                        {selectedWorkflow.status.charAt(0).toUpperCase() + selectedWorkflow.status.slice(1)}
                      </span>
                    </DialogTitle>
                    <DialogDescription>{selectedWorkflow.description}</DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {/* Performance Chart */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Performance Trend</h3>
                      <div className="bg-flow-muted/10 p-4 rounded-lg h-[200px] border border-flow-border">
                        <LineChart data={selectedWorkflow.performance} />
                      </div>
                    </div>
                    
                    {/* Connected Agents */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Connected Agents</h3>
                      <div className="bg-flow-muted/10 p-4 rounded-lg border border-flow-border">
                        <div className="space-y-3">
                          {selectedWorkflow.connected_agents.map((agentId) => (
                            <GlassMorphism 
                              key={agentId} 
                              intensity="low" 
                              className="p-3 flex items-center justify-between"
                            >
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-flow-accent/20 flex items-center justify-center mr-3">
                                  <Users className="w-4 h-4 text-flow-accent" />
                                </div>
                                <div>
                                  <div className="font-medium">Agent #{agentId}</div>
                                  <div className="text-xs text-flow-foreground/60">Division: {selectedWorkflow.division}</div>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                <ArrowRight className="w-4 h-4" />
                              </Button>
                            </GlassMorphism>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Workflow Steps */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Workflow Steps</h3>
                    <div className="bg-flow-muted/10 p-4 rounded-lg border border-flow-border">
                      <div className="space-y-3">
                        {Array.from({ length: selectedWorkflow.steps }).map((_, index) => (
                          <div 
                            key={index} 
                            className="flex items-center p-2 border border-flow-border/30 rounded-md"
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                              index < selectedWorkflow.completion / (100 / selectedWorkflow.steps)
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-flow-muted/20 text-flow-foreground/40'
                            }`}>
                              {index < selectedWorkflow.completion / (100 / selectedWorkflow.steps)
                                ? <CheckCircle className="w-4 h-4" />
                                : <Clock className="w-4 h-4" />
                              }
                            </div>
                            <div>
                              <div className="font-medium">Step {index + 1}</div>
                              <div className="text-xs text-flow-foreground/60">
                                {index < selectedWorkflow.completion / (100 / selectedWorkflow.steps)
                                  ? 'Completed'
                                  : index === Math.floor(selectedWorkflow.completion / (100 / selectedWorkflow.steps))
                                    ? 'In Progress'
                                    : 'Pending'
                                }
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline">
                      Edit Workflow
                    </Button>
                    {selectedWorkflow.status === 'active' ? (
                      <Button variant="default" className="bg-amber-500 hover:bg-amber-600">
                        Pause Workflow
                      </Button>
                    ) : selectedWorkflow.status === 'paused' ? (
                      <Button variant="default" className="bg-green-500 hover:bg-green-600">
                        Resume Workflow
                      </Button>
                    ) : (
                      <Button variant="default" className="bg-flow-accent hover:bg-flow-accent/80">
                        Run Now
                      </Button>
                    )}
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
          
          {workflows.length === 0 && (
            <div className="text-center py-12 text-flow-foreground/50">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <h3 className="text-lg font-medium">No workflows found</h3>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Workflows;
