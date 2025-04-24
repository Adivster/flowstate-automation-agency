import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SolarpunkPanel } from '@/components/ui/design-system/SolarpunkPanel';
import { 
  Users, UserPlus, Activity, Filter, Search, BarChart3, 
  Settings, CheckCircle, AlertTriangle, XCircle, 
  ArrowUpDown, Tag, PlusCircle
} from 'lucide-react';
import PageHeader from '@/components/ui/design-system/PageHeader';
import ThemedBackground from '@/components/ui/ThemedBackground';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const mockAgents = [
  {
    id: '1',
    name: 'Support Bot',
    description: 'Customer support automation agent',
    status: 'active',
    healthScore: 92,
    healthStatus: 'healthy',
    lastActivity: '5m ago',
    capabilities: ['Chat', 'Knowledge Retrieval', 'Ticket Creation'],
    responseTime: '1.2s',
    accuracy: '94%',
    usage: '85%',
    type: 'Customer Support',
    insights: {
      trend: 'up',
      message: 'Response time improved by 15% this week',
      recommendation: 'Consider expanding to product support topics'
    }
  },
  {
    id: '2',
    name: 'Data Retriever',
    description: 'Database and API integration agent',
    status: 'active',
    healthScore: 88,
    healthStatus: 'healthy',
    lastActivity: '12m ago',
    capabilities: ['SQL Query', 'API Connection', 'Data Formatting'],
    responseTime: '0.8s',
    accuracy: '97%',
    usage: '72%',
    type: 'Data Operations',
    insights: {
      trend: 'stable',
      message: 'Consistent performance across all metrics',
      recommendation: 'Add more data source connectors to increase utility'
    }
  },
  {
    id: '3',
    name: 'Content Writer',
    description: 'Automated content generation agent',
    status: 'warning',
    healthScore: 75,
    healthStatus: 'warning',
    lastActivity: '1h ago',
    capabilities: ['Blog Writing', 'Email Copy', 'Social Media Posts'],
    responseTime: '3.5s',
    accuracy: '82%',
    usage: '45%',
    type: 'Marketing',
    insights: {
      trend: 'down',
      message: 'Quality ratings declined by 8% this week',
      recommendation: 'Retrain on recent customer feedback to improve quality'
    }
  },
  {
    id: '4',
    name: 'Meeting Assistant',
    description: 'Meeting notes and action items agent',
    status: 'active',
    healthScore: 95,
    healthStatus: 'healthy',
    lastActivity: '30m ago',
    capabilities: ['Transcription', 'Summarization', 'Action Item Tracking'],
    responseTime: '2.1s',
    accuracy: '91%',
    usage: '93%',
    type: 'Productivity',
    insights: {
      trend: 'up',
      message: 'Usage increased by 23% this month',
      recommendation: 'Scale this agent to handle increased demand'
    }
  },
  {
    id: '5',
    name: 'Analytics Reporter',
    description: 'Data analysis and visualization agent',
    status: 'error',
    healthScore: 60,
    healthStatus: 'error',
    lastActivity: '3h ago',
    capabilities: ['Data Analysis', 'Chart Generation', 'Insights Extraction'],
    responseTime: '4.2s',
    accuracy: '76%',
    usage: '38%',
    type: 'Analytics',
    insights: {
      trend: 'down',
      message: 'Integration errors increased by 15% this week',
      recommendation: 'Check API connections and update authentication tokens'
    }
  },
  {
    id: '6',
    name: 'Document Processor',
    description: 'Document analysis and extraction agent',
    status: 'active',
    healthScore: 86,
    healthStatus: 'healthy',
    lastActivity: '45m ago',
    capabilities: ['OCR', 'Form Extraction', 'Document Classification'],
    responseTime: '2.8s',
    accuracy: '89%',
    usage: '65%',
    type: 'Document Management',
    insights: {
      trend: 'up',
      message: 'Processing accuracy improved by 5% after last update',
      recommendation: 'Add more document templates to increase versatility'
    }
  },
];

const Agents: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const filteredAgents = mockAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    const matchesType = typeFilter === 'all' || agent.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'health') return b.healthScore - a.healthScore;
    if (sortBy === 'activity') return a.lastActivity.localeCompare(b.lastActivity);
    return 0;
  });
  
  const agentTypes = Array.from(new Set(mockAgents.map(agent => agent.type)));
  
  const handleAgentAction = (agent: any, action: string) => {
    toast({
      title: `${action} - ${agent.name}`,
      description: `The ${action.toLowerCase()} action has been applied to ${agent.name}.`,
      duration: 3000,
    });
  };
  
  return (
    <ThemedBackground>
      <Helmet>
        <title>Agents | FlowState</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 mt-20 px-4 sm:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <PageHeader 
            title="Agents"
            extendedTitle="AI Workforce"
            description="Manage and optimize your AI agents and their capabilities."
            icon={<Users className="h-12 w-12 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" />}
            variant="default" 
            glassEffect={true}
            actions={
              <div className="flex flex-wrap items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-purple-500/10 border-purple-500/50 hover:bg-purple-500/20 text-purple-500 dark:text-purple-400"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  New Agent
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-purple-500/10 border-purple-500/50 hover:bg-purple-500/20 text-purple-500 dark:text-purple-400"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Performance
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-purple-500/10 border-purple-500/50 hover:bg-purple-500/20 text-purple-500 dark:text-purple-400"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </div>
            }
          />
          
          <div className="mb-6">
            <Tabs 
              defaultValue="all" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <TabsList className={cn(
                  "bg-background/10 backdrop-blur-sm border",
                  isDark ? "border-purple-900/30" : "border-purple-200/50"
                )}>
                  <TabsTrigger value="all">All Agents</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                </TabsList>
                
                <div className="flex items-center gap-2">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Agent
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-6 items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search agents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full rounded-lg border bg-background/20 backdrop-blur-sm"
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
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[170px]">
                    <Tag className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Agent Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {agentTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[130px]">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="health">Health Score</SelectItem>
                    <SelectItem value="activity">Last Activity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <SolarpunkPanel 
                  accentColor="lavender" 
                  className="p-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAgents.length === 0 ? (
                      <div className="col-span-3 text-center p-10">
                        <p className="text-muted-foreground">No agents found matching your criteria.</p>
                      </div>
                    ) : (
                      filteredAgents.map((agent) => (
                        <div key={agent.id}>
                          <div className={cn(
                            "h-full rounded-xl overflow-hidden border p-5",
                            isDark
                              ? "bg-purple-900/10 border-purple-500/20 hover:border-purple-500/40"
                              : "bg-white/80 border-purple-200 hover:border-purple-300",
                            "transition-all duration-200 hover:shadow-md"
                          )}>
                            <div className="flex items-start justify-between mb-3">
                              <h3 className={cn(
                                "text-lg font-semibold",
                                isDark ? "text-purple-300" : "text-purple-700"
                              )}>
                                {agent.name}
                              </h3>
                              
                              <Badge 
                                variant={
                                  agent.healthStatus === 'healthy' ? 'success' : 
                                  agent.healthStatus === 'warning' ? 'warning' : 'destructive'
                                }
                                className="capitalize flex items-center gap-1"
                              >
                                {agent.healthStatus === 'healthy' ? 
                                  <CheckCircle className="h-3 w-3" /> : 
                                 agent.healthStatus === 'warning' ? 
                                  <AlertTriangle className="h-3 w-3" /> : 
                                  <XCircle className="h-3 w-3" />
                                }
                                {agent.healthScore}%
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>
                            
                            <div className="space-y-3 mb-4">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Response Time:</span>
                                <span className={cn(
                                  parseFloat(agent.responseTime) < 2 ? "text-green-500" : 
                                  parseFloat(agent.responseTime) < 3 ? "text-amber-500" : "text-red-500"
                                )}>{agent.responseTime}</span>
                              </div>
                              
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Accuracy:</span>
                                <span className={cn(
                                  parseInt(agent.accuracy) > 90 ? "text-green-500" : 
                                  parseInt(agent.accuracy) > 80 ? "text-amber-500" : "text-red-500"
                                )}>{agent.accuracy}</span>
                              </div>
                              
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Last Activity:</span>
                                <span>{agent.lastActivity}</span>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <div className="text-xs uppercase text-muted-foreground font-medium mb-2">Capabilities</div>
                              <div className="flex flex-wrap gap-1">
                                {agent.capabilities.map((capability, i) => (
                                  <Badge key={i} variant="outline" className="bg-purple-500/10 text-purple-700 dark:text-purple-300">
                                    {capability}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className={cn(
                              "p-3 rounded-lg mb-4 text-sm",
                              agent.insights.trend === 'up' 
                                ? "bg-green-500/10 text-green-700 dark:text-green-300" 
                                : agent.insights.trend === 'down'
                                ? "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                                : "bg-blue-500/10 text-blue-700 dark:text-blue-300"
                            )}>
                              <div className="font-medium">{agent.insights.message}</div>
                              <div className="text-xs mt-1">{agent.insights.recommendation}</div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300"
                                onClick={() => handleAgentAction(agent, "Configure")}
                              >
                                <Settings className="h-3 w-3 mr-1" />
                                Configure
                              </Button>
                              
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300"
                                onClick={() => handleAgentAction(agent, "Analytics")}
                              >
                                <BarChart3 className="h-3 w-3 mr-1" />
                                Analytics
                              </Button>
                              
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300"
                                onClick={() => handleAgentAction(agent, "Test")}
                              >
                                <Activity className="h-3 w-3 mr-1" />
                                Test
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </SolarpunkPanel>
              </TabsContent>
              
              <TabsContent value="active" className="mt-0">
                <SolarpunkPanel accentColor="purple" className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredAgents
                      .filter(agent => agent.status === 'active')
                      .map((agent) => (
                        <div key={agent.id} className="rounded-xl border p-4 bg-background/30 backdrop-blur-sm">
                          <h3 className="font-medium">{agent.name}</h3>
                        </div>
                      ))}
                  </div>
                </SolarpunkPanel>
              </TabsContent>
              
              <TabsContent value="inactive" className="mt-0">
                <SolarpunkPanel accentColor="purple" className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredAgents
                      .filter(agent => agent.status !== 'active')
                      .map((agent) => (
                        <div key={agent.id} className="rounded-xl border p-4 bg-background/30 backdrop-blur-sm">
                          <h3 className="font-medium">{agent.name}</h3>
                        </div>
                      ))}
                  </div>
                </SolarpunkPanel>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </ThemedBackground>
  );
};

export default Agents;
