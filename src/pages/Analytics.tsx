import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, BarChart, LineChart, PieChart } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, Clock, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Analytics = () => {
  const { t } = useLanguage();
  
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
  
  // Agent performance
  const agentPerformance = [
    { name: 'KB Division', value: 35 },
    { name: 'Operations', value: 40 },
    { name: 'Analytics', value: 15 },
    { name: 'Marketing', value: 10 },
  ];
  
  // Task distribution data
  const taskDistribution = [
    { name: 'Content Creation', value: 120 },
    { name: 'Research Tasks', value: 87 },
    { name: 'Development', value: 142 },
  ];
  
  // Database operations
  const databaseOperations = [
    { name: 'Mon', value: 350 },
    { name: 'Tue', value: 420 },
    { name: 'Wed', value: 380 },
    { name: 'Thu', value: 510 },
    { name: 'Fri', value: 470 },
    { name: 'Sat', value: 180 },
    { name: 'Sun', value: 90 },
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
            <h1 className="text-3xl font-bold mb-1 neon-text">{t('analytics')}</h1>
            <p className="text-flow-foreground/70">
              Comprehensive metrics and insights into your AI agency's operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Tasks</CardDescription>
                <CardTitle className="text-2xl">1,856</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-flow-foreground/70 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  <span>+12.5% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Active Agents</CardDescription>
                <CardTitle className="text-2xl">24</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-flow-foreground/70 flex items-center">
                  <Users className="h-3 w-3 mr-1 text-blue-500" />
                  <span>+3 new agents this week</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Avg. Response Time</CardDescription>
                <CardTitle className="text-2xl">1.8s</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-flow-foreground/70 flex items-center">
                  <Clock className="h-3 w-3 mr-1 text-amber-500" />
                  <span>-0.3s from last week</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Uptime</CardDescription>
                <CardTitle className="text-2xl">99.98%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-flow-foreground/70 flex items-center">
                  <CalendarDays className="h-3 w-3 mr-1 text-green-500" />
                  <span>Last 30 days</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="activity" className="space-y-8">
            <TabsList>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Activity</CardTitle>
                    <CardDescription>Number of tasks processed per day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AreaChart data={weeklyActivity} />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Task Distribution</CardTitle>
                    <CardDescription>Breakdown of current task types</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PieChart data={taskDistribution} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Division Performance</CardTitle>
                    <CardDescription>Contribution by division</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PieChart data={agentPerformance} />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Completion Rate</CardTitle>
                    <CardDescription>Task completion percentage over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LineChart data={completionRate} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="system" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Database Operations</CardTitle>
                    <CardDescription>Count of database transactions per day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BarChart data={databaseOperations} />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>API Response Times</CardTitle>
                    <CardDescription>Average response time in milliseconds</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LineChart data={[
                      { name: 'Content API', value: 82 },
                      { name: 'Data API', value: 143 },
                      { name: 'User API', value: 97 },
                      { name: 'Auth API', value: 45 },
                      { name: 'Storage API', value: 110 }
                    ]} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analytics;
