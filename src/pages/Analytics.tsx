
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, BarChart, LineChart, PieChart } from '@/components/ui/chart';
import { BarChartIcon, LineChartIcon, PieChartIcon, TrendingUpIcon } from 'lucide-react';

const Analytics = () => {
  // Sample data for charts
  const workflowData = [
    { name: 'Mon', value: 45 },
    { name: 'Tue', value: 52 },
    { name: 'Wed', value: 49 },
    { name: 'Thu', value: 63 },
    { name: 'Fri', value: 59 },
    { name: 'Sat', value: 38 },
    { name: 'Sun', value: 30 },
  ];

  const agentData = [
    { name: 'Research', value: 28 },
    { name: 'Content', value: 35 },
    { name: 'Dev', value: 15 },
    { name: 'QA', value: 12 },
    { name: 'Strategy', value: 10 },
  ];

  const performanceData = [
    { name: 'Jan', content: 40, research: 24, dev: 35 },
    { name: 'Feb', content: 30, research: 28, dev: 29 },
    { name: 'Mar', content: 45, research: 32, dev: 42 },
    { name: 'Apr', content: 50, research: 35, dev: 38 },
    { name: 'May', content: 65, research: 40, dev: 43 },
    { name: 'Jun', content: 75, research: 45, dev: 50 },
  ];

  const knowledgeData = [
    { name: 'Jan', queries: 200, updates: 15 },
    { name: 'Feb', queries: 250, updates: 20 },
    { name: 'Mar', queries: 300, updates: 25 },
    { name: 'Apr', queries: 280, updates: 30 },
    { name: 'May', queries: 350, updates: 35 },
    { name: 'Jun', queries: 400, updates: 40 },
  ];

  return (
    <div className="min-h-screen bg-flow-background text-flow-foreground flex flex-col">
      <Helmet>
        <title>Analytics | FlowState Agency</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <TransitionWrapper>
          <h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>
          
          <div className="mb-8">
            <p className="text-flow-foreground/80 max-w-3xl">
              Track performance metrics across all divisions, agents, and workflows. 
              Use these insights to optimize and scale your AI operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">45</div>
                  <div className="p-2 bg-green-500/10 text-green-500 rounded-full">
                    <TrendingUpIcon className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-xs text-flow-foreground/70 mt-2">+12% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">24</div>
                  <div className="p-2 bg-blue-500/10 text-blue-500 rounded-full">
                    <BarChartIcon className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-xs text-flow-foreground/70 mt-2">+5 new agents this week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">KB Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">128</div>
                  <div className="p-2 bg-purple-500/10 text-purple-500 rounded-full">
                    <LineChartIcon className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-xs text-flow-foreground/70 mt-2">Last updated 2 hours ago</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Task Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">92%</div>
                  <div className="p-2 bg-amber-500/10 text-amber-500 rounded-full">
                    <PieChartIcon className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-xs text-flow-foreground/70 mt-2">+4% improvement</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="overview">
            <TabsList className="w-full max-w-md mb-8">
              <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
              <TabsTrigger value="agents" className="flex-1">Agents</TabsTrigger>
              <TabsTrigger value="workflows" className="flex-1">Workflows</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Trends</CardTitle>
                    <CardDescription>Performance metrics over the last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <LineChart 
                        data={performanceData}
                        index="name"
                        categories={["content", "research", "dev"]}
                        colors={["#2563eb", "#10b981", "#f59e0b"]}
                        valueFormatter={(value) => `${value}`}
                        className="h-full"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Knowledge Base Activity</CardTitle>
                    <CardDescription>KB queries and updates over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <AreaChart 
                        data={knowledgeData}
                        index="name"
                        categories={["queries", "updates"]}
                        colors={["#8b5cf6", "#ec4899"]}
                        valueFormatter={(value) => `${value}`}
                        className="h-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="agents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Agent Utilization</CardTitle>
                  <CardDescription>Distribution of active agents by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <PieChart 
                      data={agentData}
                      index="name"
                      category="value"
                      valueFormatter={(value) => `${value}%`}
                      className="h-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="workflows" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Workflow Execution</CardTitle>
                  <CardDescription>Daily workflow executions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <BarChart 
                      data={workflowData}
                      index="name"
                      categories={["value"]}
                      colors={["#3b82f6"]}
                      valueFormatter={(value) => `${value}`}
                      className="h-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analytics;
