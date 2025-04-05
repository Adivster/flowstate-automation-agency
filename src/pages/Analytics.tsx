
import { Helmet } from 'react-helmet-async';
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
  LineChart as LineChartIcon
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
import { usePerformanceData } from '@/hooks/usePerformanceData';

const Analytics = () => {
  const { t } = useLanguage();
  const systemPerformance = usePerformanceData('system');
  
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
  
  return (
    <div className="min-h-screen bg-flow-background text-flow-foreground flex flex-col">
      <Helmet>
        <title>Analytics | FlowState Agency</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <TransitionWrapper>
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="mr-4 bg-purple-500/20 p-3 rounded-xl backdrop-blur-sm border border-purple-500/30">
                <LineChartIcon className="h-8 w-8 text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
              </div>
              <h1 className="text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                {t('analytics')}
              </h1>
            </div>
            <p className="text-flow-foreground/70 max-w-2xl">
              Comprehensive metrics and insights into your AI agency's operations. Monitor performance, track key indicators, and optimize your workflows.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
            </GlassMorphism>
            
            <GlassMorphism 
              className="p-6 rounded-xl hover:scale-[1.02] transition-all duration-300"
              intensity="medium"
              hoverEffect={true}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-lg font-medium text-flow-foreground/70">Avg. Response Time</div>
                <div className="p-2 rounded-full bg-amber-500/20 text-amber-300">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">1.8s</div>
              <div className="text-xs text-flow-foreground/70 flex items-center">
                <Clock className="h-3 w-3 mr-1 text-amber-500" />
                <span>-0.3s from last week</span>
              </div>
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
              <div className="mt-2 w-full">
                <Progress value={99.98} indicatorColor="#10b981" className="h-1" />
              </div>
            </GlassMorphism>
          </div>
          
          <GlassMorphism className="mb-8 p-1 rounded-xl">
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
                  <GlassMorphism className="rounded-xl" intensity="low">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-xl font-semibold text-flow-accent">Weekly Activity</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <Activity className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Export data</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <CardDescription className="px-6">Number of tasks processed per day</CardDescription>
                    <CardContent>
                      <AreaChart data={weeklyActivity} className="aspect-[4/3]" />
                    </CardContent>
                    <CardFooter className="text-xs text-flow-foreground/60 justify-end">
                      Updated 2 hours ago
                    </CardFooter>
                  </GlassMorphism>
                  
                  <GlassMorphism className="rounded-xl" intensity="low">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-xl font-semibold text-flow-accent">Task Distribution</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <FileText className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Export data</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
                      <div className="flex items-center">
                        <span className="text-sm">Total: {taskDistribution.reduce((sum, item) => sum + item.value, 0)} tasks</span>
                      </div>
                      <span>Updated 2 hours ago</span>
                    </CardFooter>
                  </GlassMorphism>
                </div>
              </TabsContent>
              
              <TabsContent value="performance" className="space-y-6 p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <GlassMorphism className="rounded-xl" intensity="low">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-xl font-semibold text-flow-accent">Division Performance</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <Layers className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Export data</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
                      <div className="flex items-center">
                        <span className="text-sm">Hover segments for details</span>
                      </div>
                      <span>Updated 3 hours ago</span>
                    </CardFooter>
                  </GlassMorphism>
                  
                  <GlassMorphism className="rounded-xl" intensity="low">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-xl font-semibold text-flow-accent">Completion Rate</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <Activity className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Export data</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <CardDescription className="px-6">Task completion percentage over time</CardDescription>
                    <CardContent>
                      <LineChart data={completionRate} lineColor="#D946EF" className="aspect-[4/3]" />
                    </CardContent>
                    <CardFooter className="text-xs text-flow-foreground/60 justify-between">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-green-500">+14% improvement</span>
                        <span className="text-xs text-flow-foreground/60 ml-2">compared to Q1</span>
                      </div>
                      <span>Updated 3 hours ago</span>
                    </CardFooter>
                  </GlassMorphism>
                </div>
              </TabsContent>
              
              <TabsContent value="system" className="space-y-6 p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <GlassMorphism className="rounded-xl" intensity="low">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-xl font-semibold text-flow-accent">Database Operations</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <Database className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Export data</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <CardDescription className="px-6">Count of database transactions per day</CardDescription>
                    <CardContent>
                      <BarChart data={databaseOperations} className="aspect-[4/3]" />
                    </CardContent>
                    <CardFooter className="text-xs text-flow-foreground/60 justify-between">
                      <div className="flex items-center">
                        <span className="text-sm font-medium">Peak: 510 operations</span>
                        <span className="text-xs text-flow-foreground/60 ml-2">on Thursday</span>
                      </div>
                      <span>Updated 1 hour ago</span>
                    </CardFooter>
                  </GlassMorphism>
                  
                  <GlassMorphism className="rounded-xl" intensity="low">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-xl font-semibold text-flow-accent">Resource Allocation</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <Cpu className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Export data</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
                      <div className="flex items-center">
                        <span className="text-sm">Hover segments for details</span>
                      </div>
                      <span>Updated 1 hour ago</span>
                    </CardFooter>
                  </GlassMorphism>
                </div>
                
                <GlassMorphism className="rounded-xl" intensity="low">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-xl font-semibold text-flow-accent">System Performance</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <AlertTriangle className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Export data</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardDescription className="px-6">System resource utilization</CardDescription>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-base font-medium mb-3">Resource Usage</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>CPU Usage</span>
                              <span className="font-medium">{systemPerformance.resourceAllocation.cpu}%</span>
                            </div>
                            <Progress value={systemPerformance.resourceAllocation.cpu} indicatorColor="#8b5cf6" className="h-1.5" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Memory Usage</span>
                              <span className="font-medium">{systemPerformance.resourceAllocation.memory}%</span>
                            </div>
                            <Progress value={systemPerformance.resourceAllocation.memory} indicatorColor="#06b6d4" className="h-1.5" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Network Bandwidth</span>
                              <span className="font-medium">{systemPerformance.resourceAllocation.network}%</span>
                            </div>
                            <Progress value={systemPerformance.resourceAllocation.network} indicatorColor="#10b981" className="h-1.5" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Storage</span>
                              <span className="font-medium">{systemPerformance.resourceAllocation.storage}%</span>
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
                  <CardFooter className="text-xs text-flow-foreground/60 justify-between">
                    <span className="flex items-center">
                      <Zap className="h-3 w-3 mr-1 text-green-500" />
                      System stable
                    </span>
                    <span>Updated just now</span>
                  </CardFooter>
                </GlassMorphism>
              </TabsContent>
            </Tabs>
          </GlassMorphism>
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analytics;
