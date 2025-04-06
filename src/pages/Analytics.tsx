
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { AreaChart, BarChart, LineChart, PieChart } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CalendarDays, 
  Clock, 
  TrendingUp, 
  Users, 
  Zap, 
  Database, 
  Activity,
  BarChart2,
  AlertTriangle,
  FileText,
  Cpu,
  Layers,
  LineChart as LineChartIcon,
  RefreshCw,
  Calendar,
  HelpCircle,
  Info
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Progress } from '@/components/ui/progress';
import GlassMorphism from '@/components/ui/GlassMorphism';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { usePerformanceData } from '@/hooks/usePerformanceData';
import { useToast } from '@/hooks/use-toast';

const Analytics = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const systemPerformance = usePerformanceData('system');
  const [timeRange, setTimeRange] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  // Weekly activity data
  const weeklyActivity = [
    { name: 'Mon', value: 145 },
    { name: 'Tue', value: 231 },
    { name: 'Wed', value: 328 },
    { name: 'Thu', value: 410 },
    { name: 'Fri', value: 287 },
    { name: 'Sat', value: 126 },
    { name: 'Sun', value: 89 },
  ];
  
  // Monthly completion rate
  const completionRate = [
    { name: 'Jan', value: 78 },
    { name: 'Feb', value: 82 },
    { name: 'Mar', value: 75 },
    { name: 'Apr', value: 89 },
    { name: 'May', value: 92 },
    { name: 'Jun', value: 87 },
  ];
  
  // Enhanced agent performance data with descriptions
  const agentPerformance = [
    { 
      name: 'KB Division', 
      value: 35, 
      description: 'Knowledge Base Division handles documentation and content organization.',
      color: '#9b87f5'
    },
    { 
      name: 'Operations', 
      value: 40, 
      description: 'Operations Division manages day-to-day workflows and processes.',
      color: '#22c55e'
    },
    { 
      name: 'Analytics', 
      value: 15, 
      description: 'Analytics Division focuses on metrics, reporting, and insights.',
      color: '#0ea5e9'
    },
    { 
      name: 'Marketing', 
      value: 10, 
      description: 'Marketing Division handles brand awareness and promotion.',
      color: '#f97316'
    },
  ];
  
  // Enhanced task distribution data
  const taskDistribution = [
    { 
      name: 'Content Creation', 
      value: 120, 
      description: 'Tasks related to creating and publishing content across platforms.',
      color: '#0088FE'
    },
    { 
      name: 'Research Tasks', 
      value: 87, 
      description: 'Information gathering, market research, and competitor analysis.',
      color: '#00C49F'
    },
    { 
      name: 'Development', 
      value: 142, 
      description: 'Coding, implementation, and technical development work.',
      color: '#FFBB28'
    },
  ];
  
  // Enhanced resource allocation data
  const resourceAllocation = [
    {
      name: 'Server Resources',
      value: 45,
      description: 'CPU, memory, and storage resources allocated to servers.',
      color: '#8884d8'
    },
    {
      name: 'API Credits',
      value: 30,
      description: 'External API usage and quotas for third-party services.',
      color: '#d946ef'
    },
    {
      name: 'Data Storage',
      value: 25,
      description: 'Database and file storage resources.',
      color: '#0ea5e9'
    }
  ];
  
  // Enhanced database operations data
  const databaseOperations = [
    { name: 'Mon', value: 350 },
    { name: 'Tue', value: 420 },
    { name: 'Wed', value: 380 },
    { name: 'Thu', value: 510 },
    { name: 'Fri', value: 470 },
    { name: 'Sat', value: 180 },
    { name: 'Sun', value: 90 },
  ];
  
  // New data for system metrics by component
  const systemComponentUsage = [
    {
      name: 'Database',
      value: 42,
      description: 'Relational database infrastructure and document stores.',
      color: '#6E59A5'
    },
    {
      name: 'API Services',
      value: 28,
      description: 'REST and GraphQL API endpoints and services.',
      color: '#F97316'
    },
    {
      name: 'ML Models',
      value: 18,
      description: 'Machine learning and AI model processing.',
      color: '#22C55E'
    },
    {
      name: 'CDN',
      value: 12,
      description: 'Content delivery network and asset caching.',
      color: '#0EA5E9'
    }
  ];

  const handleRefresh = () => {
    // Update last refreshed time
    setLastUpdated(new Date());
    
    // Show refresh confirmation toast
    toast({
      title: "Analytics Refreshed",
      description: "Dashboard data has been updated to the latest metrics",
      duration: 3000,
    });
  };
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-flow-background text-flow-foreground flex flex-col">
      <Helmet>
        <title>Analytics | FlowState Agency</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-16 pb-12">
        <TransitionWrapper>
          <div className="mb-8 animate-fade-in">
            <GlassMorphism intensity="low" className="mb-8 p-6 rounded-xl relative overflow-hidden border border-flow-accent/20">
              <div className="absolute top-0 right-0 w-72 h-72 bg-flow-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-30"></div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
                <div>
                  <div className="flex items-center">
                    <div className="mr-4 bg-purple-500/20 p-3 rounded-xl backdrop-blur-sm border border-purple-500/30">
                      <LineChartIcon className="h-8 w-8 text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                    </div>
                    <h1 className="text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                      {t('analytics')}
                    </h1>
                  </div>
                  <p className="text-flow-foreground/70 max-w-2xl mt-2">
                    Comprehensive metrics and insights into your AI agency's operations. Monitor performance, track key indicators, and optimize workflows.
                  </p>
                </div>
                
                <div className="flex items-center gap-3 self-end md:self-auto">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" onClick={handleRefresh} className="border-flow-border/50 hover:border-flow-accent/60 transition-all duration-300">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Refresh
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Refresh analytics data</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>This dashboard displays key performance metrics for your AI agency. Hover over charts for detailed information.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-flow-foreground/70 mr-2" />
                  <span className="text-sm text-flow-foreground/70">Last updated: {formatTime(lastUpdated)}</span>
                </div>
                
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[160px] h-8 text-xs bg-flow-background/30 border-flow-border/50">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent className="bg-flow-background/90 border-flow-border/50 backdrop-blur-md">
                    <SelectItem value="day">Last 24 Hours</SelectItem>
                    <SelectItem value="week">Last 7 Days</SelectItem>
                    <SelectItem value="month">Last 30 Days</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="w-[160px] h-8 text-xs bg-flow-background/30 border-flow-border/50">
                    <SelectValue placeholder="Filter metrics" />
                  </SelectTrigger>
                  <SelectContent className="bg-flow-background/90 border-flow-border/50 backdrop-blur-md">
                    <SelectItem value="all">All Metrics</SelectItem>
                    <SelectItem value="tasks">Task Metrics</SelectItem>
                    <SelectItem value="agents">Agent Metrics</SelectItem>
                    <SelectItem value="system">System Metrics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </GlassMorphism>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in" style={{animationDelay: '100ms'}}>
              <GlassMorphism 
                className="p-6 rounded-xl hover:scale-[1.02] transition-all duration-300"
                intensity="medium"
                hoverEffect={true}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-lg font-medium text-flow-foreground/70">Total Tasks</div>
                  <div className="p-2 rounded-full bg-indigo-500/20 text-indigo-300">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">1,856</div>
                <div className="text-xs text-flow-foreground/70 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  <span>+12.5% from last month</span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="mt-3 block w-full">
                      <div className="w-full">
                        <Progress value={78} indicatorColor="#6366f1" className="h-1" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>78% of monthly task goal</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </GlassMorphism>
              
              <GlassMorphism 
                className="p-6 rounded-xl hover:scale-[1.02] transition-all duration-300"
                intensity="medium"
                hoverEffect={true}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-lg font-medium text-flow-foreground/70">Active Agents</div>
                  <div className="p-2 rounded-full bg-blue-500/20 text-blue-300">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">24</div>
                <div className="text-xs text-flow-foreground/70 flex items-center">
                  <Users className="h-3 w-3 mr-1 text-blue-500" />
                  <span>+3 new agents this week</span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="mt-3 block w-full">
                      <div className="w-full">
                        <Progress value={85} indicatorColor="#3b82f6" className="h-1" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>85% of planned capacity</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </GlassMorphism>
              
              <GlassMorphism 
                className="p-6 rounded-xl hover:scale-[1.02] transition-all duration-300"
                intensity="medium"
                hoverEffect={true}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-lg font-medium text-flow-foreground/70">Response Time</div>
                  <div className="p-2 rounded-full bg-amber-500/20 text-amber-300">
                    <Clock className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">1.8s</div>
                <div className="text-xs text-flow-foreground/70 flex items-center">
                  <Clock className="h-3 w-3 mr-1 text-amber-500" />
                  <span>-0.3s from last week</span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="mt-3 block w-full">
                      <div className="w-full">
                        <Progress value={92} indicatorColor="#f59e0b" className="h-1" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>92% performance target achieved</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </GlassMorphism>
              
              <GlassMorphism 
                className="p-6 rounded-xl hover:scale-[1.02] transition-all duration-300"
                intensity="medium"
                hoverEffect={true}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-lg font-medium text-flow-foreground/70">Uptime</div>
                  <div className="p-2 rounded-full bg-green-500/20 text-green-300">
                    <Zap className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">99.98%</div>
                <div className="text-xs text-flow-foreground/70 flex items-center">
                  <CalendarDays className="h-3 w-3 mr-1 text-green-500" />
                  <span>Last 30 days</span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="mt-3 block w-full">
                      <div className="w-full">
                        <Progress value={99.98} indicatorColor="#10b981" className="h-1" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>99.98% of SLA target (99.95%)</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </GlassMorphism>
            </div>
          
            <GlassMorphism className="mb-8 p-1 rounded-xl animate-fade-in" style={{animationDelay: '200ms'}}>
              <Tabs defaultValue="activity" className="space-y-8">
                <TabsList className="w-full flex justify-start p-1 bg-transparent">
                  <TabsTrigger value="activity" className="flex-1 data-[state=active]:bg-white/10">
                    <Activity className="mr-2 h-4 w-4" />
                    Activity
                  </TabsTrigger>
                  <TabsTrigger value="performance" className="flex-1 data-[state=active]:bg-white/10">
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Performance
                  </TabsTrigger>
                  <TabsTrigger value="system" className="flex-1 data-[state=active]:bg-white/10">
                    <Database className="mr-2 h-4 w-4" />
                    System
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="activity" className="space-y-6 p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TooltipProvider>
                      <GlassMorphism className="rounded-xl" intensity="low">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                          <CardTitle className="text-xl font-semibold text-flow-accent">Weekly Activity</CardTitle>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <Activity className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => toast({ title: "View Details", description: "Opening detailed view of weekly activity" })}>
                                    View details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => toast({ title: "Export Successful", description: "Weekly activity data exported to CSV" })}>
                                    Export data
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TooltipTrigger>
                            <TooltipContent>View options</TooltipContent>
                          </Tooltip>
                        </CardHeader>
                        <CardDescription className="px-6">Number of tasks processed per day</CardDescription>
                        <CardContent>
                          <div className="h-[300px]">
                            <AreaChart data={weeklyActivity} className="aspect-[4/3]" />
                          </div>
                        </CardContent>
                        <CardFooter className="text-xs text-flow-foreground/60 justify-between">
                          <div className="flex items-center">
                            <AlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
                            <span>Peak day: Thursday (410 tasks)</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-flow-foreground/60" />
                            <span>Updated 2 hours ago</span>
                          </div>
                        </CardFooter>
                      </GlassMorphism>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <GlassMorphism className="rounded-xl" intensity="low">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                          <CardTitle className="text-xl font-semibold text-flow-accent">Task Distribution</CardTitle>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <FileText className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => toast({ title: "View Details", description: "Opening detailed task distribution view" })}>
                                    View details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => toast({ title: "Export Successful", description: "Task distribution data exported to CSV" })}>
                                    Export data
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TooltipTrigger>
                            <TooltipContent>View options</TooltipContent>
                          </Tooltip>
                        </CardHeader>
                        <CardDescription className="px-6">Breakdown of current task types</CardDescription>
                        <CardContent className="px-2">
                          <PieChart 
                            data={taskDistribution} 
                            colors={taskDistribution.map(item => item.color)}
                            height={280}
                            donut={true}
                            interactive={true}
                            gradient={true}
                          />
                        </CardContent>
                        <CardFooter className="text-xs text-flow-foreground/60 justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-sm mr-1" style={{ backgroundColor: taskDistribution[0].color }}></div>
                              <span className="text-xs">Content</span>
                            </div>
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-sm mr-1" style={{ backgroundColor: taskDistribution[1].color }}></div>
                              <span className="text-xs">Research</span>
                            </div>
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-sm mr-1" style={{ backgroundColor: taskDistribution[2].color }}></div>
                              <span className="text-xs">Dev</span>
                            </div>
                          </div>
                          <span>Total: {taskDistribution.reduce((sum, item) => sum + item.value, 0)} tasks</span>
                        </CardFooter>
                      </GlassMorphism>
                    </TooltipProvider>
                  </div>
                </TabsContent>
                
                <TabsContent value="performance" className="space-y-6 p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TooltipProvider>
                      <GlassMorphism className="rounded-xl" intensity="low">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                          <CardTitle className="text-xl font-semibold text-flow-accent">Division Performance</CardTitle>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <Layers className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => toast({ title: "View Details", description: "Opening detailed division performance view" })}>
                                    View details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => toast({ title: "Export Successful", description: "Division performance data exported to CSV" })}>
                                    Export data
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TooltipTrigger>
                            <TooltipContent>View options</TooltipContent>
                          </Tooltip>
                        </CardHeader>
                        <CardDescription className="px-6">Contribution by division</CardDescription>
                        <CardContent className="px-2">
                          <PieChart 
                            data={agentPerformance} 
                            colors={agentPerformance.map(item => item.color)}
                            height={280}
                            donut={true}
                            interactive={true}
                            gradient={true}
                          />
                        </CardContent>
                        <CardFooter className="text-xs text-flow-foreground/60 justify-between">
                          <div className="flex flex-col">
                            <span className="text-sm">Hover segments for details</span>
                            <div className="flex items-center gap-2 mt-1">
                              {agentPerformance.map((div, i) => (
                                <div key={`div-${i}`} className="flex items-center">
                                  <div className="h-3 w-3 rounded-sm mr-1" style={{ backgroundColor: div.color }}></div>
                                  <span className="text-xs">{div.name.split(' ')[0]}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <span>Updated 3 hours ago</span>
                        </CardFooter>
                      </GlassMorphism>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <GlassMorphism className="rounded-xl" intensity="low">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                          <CardTitle className="text-xl font-semibold text-flow-accent">Completion Rate</CardTitle>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <Activity className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => toast({ title: "View Details", description: "Opening detailed completion rate view" })}>
                                    View details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => toast({ title: "Export Successful", description: "Completion rate data exported to CSV" })}>
                                    Export data
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TooltipTrigger>
                            <TooltipContent>View options</TooltipContent>
                          </Tooltip>
                        </CardHeader>
                        <CardDescription className="px-6">Task completion percentage over time</CardDescription>
                        <CardContent>
                          <div className="h-[280px]">
                            <LineChart 
                              data={completionRate} 
                              lineColor="#D946EF" 
                              dotColor="#ffffff"
                              height={280} 
                            />
                          </div>
                        </CardContent>
                        <CardFooter className="text-xs text-flow-foreground/60 justify-between">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-green-500">+14% improvement</span>
                            <span className="text-xs text-flow-foreground/60 ml-2">compared to Q1</span>
                          </div>
                          <span>Updated 3 hours ago</span>
                        </CardFooter>
                      </GlassMorphism>
                    </TooltipProvider>
                  </div>
                </TabsContent>
                
                <TabsContent value="system" className="space-y-6 p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TooltipProvider>
                      <GlassMorphism className="rounded-xl" intensity="low">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                          <CardTitle className="text-xl font-semibold text-flow-accent">Database Operations</CardTitle>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <Database className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => toast({ title: "View Details", description: "Opening detailed database operations view" })}>
                                    View details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => toast({ title: "Export Successful", description: "Database operations data exported to CSV" })}>
                                    Export data
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TooltipTrigger>
                            <TooltipContent>View options</TooltipContent>
                          </Tooltip>
                        </CardHeader>
                        <CardDescription className="px-6">Count of database transactions per day</CardDescription>
                        <CardContent>
                          <div className="h-[300px]">
                            <BarChart data={databaseOperations} className="aspect-[4/3]" />
                          </div>
                        </CardContent>
                        <CardFooter className="text-xs text-flow-foreground/60 justify-between">
                          <div className="flex items-center">
                            <span className="text-sm font-medium">Peak: 510 operations</span>
                            <span className="text-xs text-flow-foreground/60 ml-2">on Thursday</span>
                          </div>
                          <span>Updated 1 hour ago</span>
                        </CardFooter>
                      </GlassMorphism>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <GlassMorphism className="rounded-xl" intensity="low">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                          <CardTitle className="text-xl font-semibold text-flow-accent">Resource Allocation</CardTitle>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <Cpu className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => toast({ title: "View Details", description: "Opening detailed resource allocation view" })}>
                                    View details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => toast({ title: "Export Successful", description: "Resource allocation data exported to CSV" })}>
                                    Export data
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TooltipTrigger>
                            <TooltipContent>View options</TooltipContent>
                          </Tooltip>
                        </CardHeader>
                        <CardDescription className="px-6">How resources are currently allocated</CardDescription>
                        <CardContent className="px-2">
                          <PieChart 
                            data={resourceAllocation} 
                            colors={resourceAllocation.map(item => item.color)}
                            height={280}
                            donut={true}
                            interactive={true}
                            gradient={true}
                          />
                        </CardContent>
                        <CardFooter className="text-xs text-flow-foreground/60 justify-between">
                          <div className="flex flex-col">
                            <span>Hover segments for details</span>
                            <div className="flex items-center gap-2 mt-1">
                              {resourceAllocation.map((res, i) => (
                                <div key={`res-${i}`} className="flex items-center">
                                  <div className="h-3 w-3 rounded-sm mr-1" style={{ backgroundColor: res.color }}></div>
                                  <span className="text-xs">{res.name.split(' ')[0]}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <span>Updated 1 hour ago</span>
                        </CardFooter>
                      </GlassMorphism>
                    </TooltipProvider>
                  </div>
                  
                  <TooltipProvider>
                    <GlassMorphism className="rounded-xl" intensity="low">
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-xl font-semibold text-flow-accent">System Performance</CardTitle>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Info className="h-4 w-4 text-flow-foreground/50" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>System performance metrics show real-time resource utilization across all infrastructure components.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <AlertTriangle className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => toast({ title: "View Details", description: "Opening detailed system performance view" })}>
                                  View details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toast({ title: "Export Successful", description: "System performance data exported to CSV" })}>
                                  Export data
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TooltipTrigger>
                          <TooltipContent>View options</TooltipContent>
                        </Tooltip>
                      </CardHeader>
                      <CardDescription className="px-6">System resource utilization</CardDescription>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-base font-medium mb-3">Resource Usage</h3>
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <div className="flex items-center">
                                    <Cpu className="h-3 w-3 mr-2 text-purple-400" />
                                    <span>CPU Usage</span>
                                  </div>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="font-medium cursor-help">{systemPerformance.resourceAllocation.cpu}%</span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <div className="text-xs space-y-1">
                                        <p>Average across all servers</p>
                                        <p>Peak today: 78%</p>
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                                <Progress value={systemPerformance.resourceAllocation.cpu} indicatorColor="#8b5cf6" className="h-1.5" />
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <div className="flex items-center">
                                    <Database className="h-3 w-3 mr-2 text-cyan-400" />
                                    <span>Memory Usage</span>
                                  </div>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="font-medium cursor-help">{systemPerformance.resourceAllocation.memory}%</span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <div className="text-xs space-y-1">
                                        <p>Total allocated: 64GB</p>
                                        <p>Current usage: {systemPerformance.resourceAllocation.memory * 0.64}GB</p>
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                                <Progress value={systemPerformance.resourceAllocation.memory} indicatorColor="#06b6d4" className="h-1.5" />
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <div className="flex items-center">
                                    <Activity className="h-3 w-3 mr-2 text-green-400" />
                                    <span>Network Bandwidth</span>
                                  </div>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="font-medium cursor-help">{systemPerformance.resourceAllocation.network}%</span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <div className="text-xs space-y-1">
                                        <p>Current traffic: {(systemPerformance.resourceAllocation.network * 0.5).toFixed(1)} Gbps</p>
                                        <p>Capacity: 50 Gbps</p>
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                                <Progress value={systemPerformance.resourceAllocation.network} indicatorColor="#10b981" className="h-1.5" />
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <div className="flex items-center">
                                    <Database className="h-3 w-3 mr-2 text-orange-400" />
                                    <span>Storage</span>
                                  </div>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="font-medium cursor-help">{systemPerformance.resourceAllocation.storage}%</span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <div className="text-xs space-y-1">
                                        <p>Used: {Math.round(systemPerformance.resourceAllocation.storage * 0.2)}TB</p>
                                        <p>Total: 20TB</p>
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                                <Progress value={systemPerformance.resourceAllocation.storage} indicatorColor="#f97316" className="h-1.5" />
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-base font-medium mb-3">Usage by Component</h3>
                            <PieChart 
                              data={systemComponentUsage} 
                              colors={systemComponentUsage.map(item => item.color)}
                              height={220}
                              donut={true}
                              interactive={true}
                              gradient={true}
                              paddingAngle={4}
                              outerRadius={70}
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="text-xs text-flow-foreground/60 justify-between border-t border-flow-border/20 mt-2 pt-4">
                        <span className="flex items-center">
                          <Zap className="h-3 w-3 mr-1 text-green-500" />
                          System stable
                        </span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 border-flow-border/40 hover:border-flow-accent/60"
                          onClick={() => toast({ title: "Health Check", description: "System health check initiated" })}
                        >
                          Run Health Check
                        </Button>
                        <span>Updated just now</span>
                      </CardFooter>
                    </GlassMorphism>
                  </TooltipProvider>
                </TabsContent>
              </Tabs>
            </GlassMorphism>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in" style={{animationDelay: '300ms'}}>
              <GlassMorphism className="p-6 rounded-xl" intensity="low">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                    Recent Updates
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-3">
                    <div className="flex items-center p-3 hover:bg-white/5 rounded-md transition-colors">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                        <Activity className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">System Upgrade Completed</p>
                        <p className="text-xs text-flow-foreground/60">Performance increased by 15%</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 hover:bg-white/5 rounded-md transition-colors">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">3 New Agents Added</p>
                        <p className="text-xs text-flow-foreground/60">New capacity available</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 hover:bg-white/5 rounded-md transition-colors">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                        <Cpu className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Resource Optimization</p>
                        <p className="text-xs text-flow-foreground/60">CPU usage reduced by 12%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </GlassMorphism>
              
              <GlassMorphism className="p-6 rounded-xl col-span-1 lg:col-span-2" intensity="low">
                <CardHeader className="p-0 pb-4 flex flex-row justify-between items-center">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-amber-400" />
                    Performance Insights
                  </CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Auto-generated insights based on recent performance data</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-4">
                    <div className="p-3 bg-white/5 border border-flow-border/30 rounded-md">
                      <h4 className="font-medium text-sm flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-green-400" />
                        Task Completion Trending Upward
                      </h4>
                      <p className="mt-1 text-xs text-flow-foreground/70">
                        Task completion rate has improved by 14% over the past month, with the KB Division showing the most improvement at 22%.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-white/5 border border-flow-border/30 rounded-md">
                      <h4 className="font-medium text-sm flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-amber-400" />
                        Response Time Optimization
                      </h4>
                      <p className="mt-1 text-xs text-flow-foreground/70">
                        Average response time decreased from 2.1s to 1.8s after the recent system upgrade. Consider enabling edge caching to further improve performance.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-white/5 border border-flow-border/30 rounded-md">
                      <h4 className="font-medium text-sm flex items-center">
                        <Database className="h-4 w-4 mr-2 text-purple-400" />
                        Database Optimization Recommended
                      </h4>
                      <p className="mt-1 text-xs text-flow-foreground/70">
                        Thursday's peak in database operations (510) is approaching capacity limits. Consider implementing query optimization or scaling database resources.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </GlassMorphism>
            </div>
          </div>
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analytics;
