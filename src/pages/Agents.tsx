import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SolarpunkPanel } from '@/components/ui/design-system/SolarpunkPanel';
import { 
  Users, UserPlus, Activity, Filter, Search, BarChart3, 
  Settings, CheckCircle, AlertTriangle, XCircle, 
  ArrowUpDown, Tag, PlusCircle, Zap, TrendingUp, Gauge
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
import MiniSparkline from '@/components/agents/office/MiniSparkline';
import { motion } from 'framer-motion';

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
      recommendation: 'Consider expanding to product support topics',
      forecast: {
        metric: 'Time Saved',
        value: 4.5,
        unit: 'hrs/week',
        confidence: 0.8
      }
    },
    performanceTrend: [85, 87, 88, 90, 91, 92, 92],
    usageTrend: [75, 78, 80, 83, 83, 85, 85],
    errorTrend: [5, 4, 4, 3, 3, 3, 2]
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
      recommendation: 'Add more data source connectors to increase utility',
      forecast: {
        metric: 'API Calls',
        value: 120,
        unit: 'calls/day',
        confidence: 0.9
      }
    },
    performanceTrend: [88, 87, 88, 88, 89, 88, 88],
    usageTrend: [65, 68, 70, 70, 72, 72, 72],
    errorTrend: [3, 3, 2, 3, 2, 2, 2]
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
      recommendation: 'Retrain on recent customer feedback to improve quality',
      forecast: {
        metric: 'Quality Score',
        value: 12,
        unit: '% increase',
        confidence: 0.7
      }
    },
    performanceTrend: [84, 82, 80, 78, 77, 76, 75],
    usageTrend: [55, 53, 50, 48, 46, 45, 45],
    errorTrend: [8, 9, 10, 12, 12, 14, 15]
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
      recommendation: 'Scale this agent to handle increased demand',
      forecast: {
        metric: 'Productivity',
        value: 3.2,
        unit: 'hrs/user/week',
        confidence: 0.85
      }
    },
    performanceTrend: [90, 91, 92, 93, 94, 95, 95],
    usageTrend: [80, 83, 85, 88, 90, 92, 93],
    errorTrend: [5, 4, 4, 3, 3, 2, 2]
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
      recommendation: 'Check API connections and update authentication tokens',
      forecast: {
        metric: 'API Errors',
        value: 10,
        unit: 'errors/day',
        confidence: 0.75
      }
    },
    performanceTrend: [60, 58, 56, 54, 52, 50, 48],
    usageTrend: [30, 32, 34, 36, 38, 40, 42],
    errorTrend: [15, 17, 19, 21, 23, 25, 27]
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
      recommendation: 'Add more document templates to increase versatility',
      forecast: {
        metric: 'Document Quality',
        value: 10,
        unit: '% improvement',
        confidence: 0.8
      }
    },
    performanceTrend: [88, 87, 89, 90, 91, 92, 93],
    usageTrend: [70, 72, 74, 76, 78, 80, 82],
    errorTrend: [4, 3, 2, 2, 1, 0, 0]
  },
];

const getHealthGradientClass = (score: number) => {
  if (score >= 90) return 'bg-gradient-to-r from-cyan-500/20 to-green-500/20';
  if (score >= 75) return 'bg-gradient-to-r from-cyan-500/20 to-amber-500/20';
  return 'bg-gradient-to-r from-amber-500/20 to-red-500/20';
};

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
                        <motion.div 
                          className={cn(
                            "h-full rounded-xl overflow-hidden border p-5",
                            isDark
                              ? "bg-purple-900/10 border-purple-500/20 hover:border-purple-500/40"
                              : "bg-white/80 border-purple-200 hover:border-purple-300",
                            "transition-all duration-200 hover:shadow-md",
                            getHealthGradientClass(agent.healthScore)
                          )}
                          whileHover={{ 
                            y: -4, 
                            boxShadow: isDark 
                              ? '0 10px 25px -5px rgba(139, 92, 246, 0.3)'
                              : '0 10px 25px -5px rgba(168, 85, 247, 0.2)' 
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className={cn(
                              "text-lg font-semibold flex items-center",
                              isDark ? "text-purple-300" : "text-purple-700"
                            )}>
                              {agent.type === 'Customer Support' && <Users className="h-4 w-4 mr-2 text-blue-500" />}
                              {agent.type === 'Data Operations' && <BarChart3 className="h-4 w-4 mr-2 text-cyan-500" />}
                              {agent.type === 'Marketing' && <TrendingUp className="h-4 w-4 mr-2 text-amber-500" />}
                              {agent.type === 'Productivity' && <Activity className="h-4 w-4 mr-2 text-green-500" />}
                              {agent.name}
                            </div>
                            
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
                          
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Performance</span>
                                <span className={cn(
                                  agent.insights.trend === 'up' ? "text-green-500" : 
                                  agent.insights.trend === 'down' ? "text-red-500" : "text-blue-500"
                                )}>
                                  {agent.insights.trend === 'up' ? '↗' : 
                                   agent.insights.trend === 'down' ? '↘' : '→'}
                                </span>
                              </div>
                              <div className="h-6">
                                <MiniSparkline 
                                  data={agent.performanceTrend} 
                                  height={20}
                                  width={100}
                                  color={agent.insights.trend === 'up' ? '#22c55e' : 
                                         agent.insights.trend === 'down' ? '#ef4444' : '#3b82f6'}
                                  showDots={true}
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Usage</span>
                                <span className="text-amber-500">{agent.usage}</span>
                              </div>
                              <div className="h-6">
                                <MiniSparkline 
                                  data={agent.usageTrend} 
                                  height={20}
                                  width={100}
                                  color="#f59e0b"
                                  showDots={true}
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 mb-4">
                            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background/40">
                              <Gauge className="h-4 w-4 text-blue-500 mb-1" />
                              <span className="text-xs text-muted-foreground">Response</span>
                              <span className="text-xs font-medium">{agent.responseTime}</span>
                            </div>
                            
                            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background/40">
                              <CheckCircle className="h-4 w-4 text-green-500 mb-1" />
                              <span className="text-xs text-muted-foreground">Accuracy</span>
                              <span className="text-xs font-medium">{agent.accuracy}</span>
                            </div>
                            
                            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-background/40">
                              <Activity className="h-4 w-4 text-amber-500 mb-1" />
                              <span className="text-xs text-muted-foreground">Last</span>
                              <span className="text-xs font-medium">{agent.lastActivity}</span>
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
                            <div className="text-xs mt-2 flex items-center text-emerald-400">
                              <Zap className="h-3 w-3 mr-1" />
                              <span className="font-medium">Success Forecast:</span>
                              <span className="ml-1">
                                +{agent.insights.forecast.value} {agent.insights.forecast.unit}
                                <span className="text-emerald-400/70"> (±{agent.insights.forecast.confidence})</span>
                              </span>
                            </div>
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
                        </motion.div>
                      ))
                    )}
                  </div>
                </SolarpunkPanel>
              </TabsContent>
              
              <TabsContent value="active" className="mt-0">
                <SolarpunkPanel accentColor="lavender" className="p-6">
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
                <SolarpunkPanel accentColor="lavender" className="p-6">
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
