
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  BarChart, 
  LayoutGrid, 
  Shield, 
  DollarSign, 
  Users, 
  Share2, 
  MessagesSquare,
  TestTube,
  Terminal,
  Zap,
  Brain,
  Globe,
  ArrowUpRight,
  Activity,
  ChevronDown,
  ChevronRight,
  PlayCircle,
  UserPlus,
  Building2,
  Settings,
  Terminal as TerminalIcon
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { useDashboardActions } from '@/hooks/useDashboardActions';
import OverviewTab from './tabs/OverviewTab';
import DivisionsTab from './tabs/DivisionsTab';
import AgentsTab from './tabs/AgentsTab';
import SystemTab from './tabs/SystemTab';
import WelcomeHeader from './WelcomeHeader';

const QuickActionButton = ({ icon, label, onClick, className = "" }) => (
  <Button 
    variant="outline" 
    className={`flex flex-col items-center justify-center h-24 bg-black/30 border-indigo-500/20 hover:bg-indigo-500/10 hover:border-indigo-500/40 transition-all duration-300 group ${className}`}
    onClick={onClick}
  >
    <div className="bg-indigo-600/20 p-2 rounded-full mb-2 group-hover:bg-indigo-600/30 transition-colors">
      {icon}
    </div>
    <span className="text-xs text-flow-foreground/80 group-hover:text-flow-foreground">{label}</span>
  </Button>
);

const StatusCard = ({ title, value, icon, trend = null, trendValue = null, trendDirection = null, className = "" }) => (
  <Card className={`p-4 border-flow-border/30 bg-black/30 backdrop-blur-md ${className}`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs text-flow-foreground/60 mb-1">{title}</p>
        <p className="text-2xl font-bold text-flow-foreground">{value}</p>
        {trend && (
          <div className="flex items-center mt-2">
            <span className={`text-xs ${trendDirection === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {trendDirection === 'up' ? '↑' : '↓'} {trendValue}%
            </span>
            <span className="text-xs text-flow-foreground/50 ml-1">{trend}</span>
          </div>
        )}
      </div>
      <div className="p-2 rounded-full bg-indigo-900/20">
        {icon}
      </div>
    </div>
  </Card>
);

const AgencyDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("mission-control");
  const dashboardActions = useDashboardActions();
  const [systemHealth, setSystemHealth] = useState(95);

  useEffect(() => {
    // Simulate system health fluctuations
    const interval = setInterval(() => {
      setSystemHealth(prev => {
        const change = Math.random() * 2 - 1; // Random value between -1 and 1
        const newValue = prev + change;
        return Math.min(Math.max(newValue, 90), 99); // Keep between 90 and 99
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="p-4">
      <div className="mb-6 flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <div className="animate-pulse-subtle mr-4">
            <div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
          </div>
          <div>
            <h2 className="text-xl font-cyber tracking-wider neon-text-green">SYSTEM ONLINE</h2>
            <p className="text-xs text-flow-foreground/70">Health: {systemHealth.toFixed(1)}% • Last Update: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
        
        <Tabs 
          defaultValue="mission-control" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mt-4 md:mt-0"
        >
          <TabsList className="bg-flow-background/30 border border-flow-border/20 p-1">
            <TabsTrigger value="mission-control" className="data-[state=active]:bg-flow-accent/20 text-xs">
              Mission Control
            </TabsTrigger>
            <TabsTrigger value="divisions" className="data-[state=active]:bg-flow-accent/20 text-xs">
              Divisions
            </TabsTrigger>
            <TabsTrigger value="agents" className="data-[state=active]:bg-flow-accent/20 text-xs">
              Agents
            </TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-flow-accent/20 text-xs">
              System
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <TabsContent value="mission-control" className="space-y-4 mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* System Status Module */}
          <Card className="p-4 border-flow-border/30 bg-black/30 backdrop-blur-md overflow-hidden relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium neon-text-blue flex items-center">
                <Shield className="mr-2 h-5 w-5 text-cyan-400" />
                System Status
              </h3>
              <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-black/20 rounded-md p-2 text-center">
                <div className="text-xs text-flow-foreground/60">CPU</div>
                <div className="text-sm font-mono font-bold text-cyan-300">28%</div>
                <div className="w-full bg-flow-border/20 h-1 mt-1 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
              <div className="bg-black/20 rounded-md p-2 text-center">
                <div className="text-xs text-flow-foreground/60">Memory</div>
                <div className="text-sm font-mono font-bold text-cyan-300">42%</div>
                <div className="w-full bg-flow-border/20 h-1 mt-1 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div className="bg-black/20 rounded-md p-2 text-center">
                <div className="text-xs text-flow-foreground/60">Network</div>
                <div className="text-sm font-mono font-bold text-cyan-300">14%</div>
                <div className="w-full bg-flow-border/20 h-1 mt-1 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: '14%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="h-24 relative mb-1">
              <div className="absolute inset-0 grid grid-cols-10 grid-rows-5 gap-0.5">
                {[...Array(50)].map((_, i) => {
                  const activity = Math.random();
                  let bgClass = "bg-flow-background/20";
                  if (activity > 0.8) bgClass = "bg-green-500/40";
                  else if (activity > 0.6) bgClass = "bg-green-500/20";
                  return (
                    <div 
                      key={i} 
                      className={`rounded-sm ${bgClass}`}
                      style={{
                        animation: activity > 0.6 ? `pulse-subtle ${2 + Math.random() * 3}s infinite` : 'none'
                      }}
                    ></div>
                  );
                })}
              </div>
              <div className="absolute top-0 left-0 text-xs text-flow-foreground/50">Agent Runtime</div>
            </div>
            
            <div className="text-xs text-right text-flow-foreground/50">
              Uptime: 18d 7h 42m
            </div>
          </Card>
          
          {/* AI Insights Panel */}
          <Card className="p-4 border-flow-border/30 bg-black/30 backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium neon-text-pink flex items-center">
                <Brain className="mr-2 h-5 w-5 text-pink-400" />
                AI Insights
              </h3>
              <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="bg-black/20 border border-pink-500/20 rounded-md p-3 animate-pulse-subtle shadow-[0_0_10px_rgba(236,72,153,0.1)]">
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <span className="text-xs font-semibold text-pink-400">High Priority</span>
                      <div className="ml-2 h-1.5 w-1.5 rounded-full bg-pink-500"></div>
                    </div>
                    <p className="text-sm my-1">Workflow bottleneck in compliance division</p>
                    <div className="h-8 w-32">
                      {/* Mini sparkline chart would go here */}
                      <div className="h-full w-full flex items-end">
                        {[...Array(10)].map((_, i) => {
                          const height = Math.max(10, Math.random() * 100);
                          return (
                            <div
                              key={i}
                              className="flex-1 bg-pink-500/50 mx-0.5 rounded-t-sm"
                              style={{ height: `${height}%` }}
                            ></div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/20 border border-green-500/20 rounded-md p-3 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <span className="text-xs font-semibold text-green-400">Medium Priority</span>
                      <div className="ml-2 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                    </div>
                    <p className="text-sm my-1">Response time improved 24% since last tuning</p>
                    <div className="h-8 w-32">
                      <div className="h-full w-full flex items-end">
                        {[...Array(10)].map((_, i) => {
                          // Trend showing improvement
                          const height = 30 + i * 7 + (Math.random() * 10 - 5);
                          return (
                            <div
                              key={i}
                              className="flex-1 bg-green-500/50 mx-0.5 rounded-t-sm"
                              style={{ height: `${height}%` }}
                            ></div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="w-full text-xs">
                View All Insights <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </Card>
          
          {/* Quick Actions Hub */}
          <Card className="p-4 border-flow-border/30 bg-black/30 backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium neon-text-green flex items-center">
                <Zap className="mr-2 h-5 w-5 text-green-400" />
                Quick Actions
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <QuickActionButton
                icon={<PlayCircle className="h-6 w-6 text-cyan-400" />}
                label="Start Workflow"
                onClick={dashboardActions.handleStartWorkflow}
              />
              <QuickActionButton
                icon={<UserPlus className="h-6 w-6 text-green-400" />}
                label="Deploy Agent"
                onClick={dashboardActions.handleCreateAgent}
              />
              <QuickActionButton
                icon={<Building2 className="h-6 w-6 text-yellow-400" />}
                label="Create Division"
                onClick={() => {}}
              />
              <QuickActionButton
                icon={<TerminalIcon className="h-6 w-6 text-indigo-400" />}
                label="Open CLI"
                onClick={() => {
                  const event = new CustomEvent('openCommandTerminal');
                  window.dispatchEvent(event);
                }}
              />
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Performance Map */}
          <Card className="p-4 border-flow-border/30 bg-black/30 backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium neon-text flex items-center">
                <Activity className="mr-2 h-5 w-5 text-purple-400" />
                Performance Map
              </h3>
              <Button variant="ghost" size="sm" className="text-xs">
                View Analytics <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <StatusCard
                title="Tasks Completed"
                value="284"
                icon={<Zap className="h-5 w-5 text-yellow-400" />}
                trend="vs last week"
                trendValue="12"
                trendDirection="up"
              />
              <StatusCard
                title="Avg Response"
                value="1.4s"
                icon={<Activity className="h-5 w-5 text-green-400" />}
                trend="vs last week"
                trendValue="8"
                trendDirection="up"
              />
              <StatusCard
                title="System Load"
                value="42%"
                icon={<BarChart className="h-5 w-5 text-cyan-400" />}
                trend="vs last week" 
                trendValue="3"
                trendDirection="down"
              />
              <StatusCard
                title="Active Agents"
                value="12"
                icon={<Users className="h-5 w-5 text-indigo-400" />}
              />
            </div>
          </Card>
          
          {/* Division Overview */}
          <Card className="p-4 border-flow-border/30 bg-black/30 backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium neon-text-orange flex items-center">
                <LayoutGrid className="mr-2 h-5 w-5 text-orange-400" />
                Division Overview
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs"
                onClick={() => setActiveTab("divisions")}
              >
                View All <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            
            <div className="relative h-[180px] bg-black/40 rounded-lg border border-flow-border/20 overflow-hidden">
              {/* Interactive map placeholder - would be replaced with actual interactive map component */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1 p-1">
                <div className="rounded bg-green-500/20 border border-green-500/30 flex items-center justify-center text-xs p-2 cursor-pointer hover:bg-green-500/30 transition-colors">
                  Knowledge Team
                </div>
                <div className="rounded bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-xs p-2 cursor-pointer hover:bg-yellow-500/30 transition-colors">
                  Operations
                </div>
                <div className="rounded bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-xs p-2 cursor-pointer hover:bg-pink-500/30 transition-colors">
                  Research
                </div>
                <div className="rounded bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-xs p-2 cursor-pointer hover:bg-cyan-500/30 transition-colors">
                  Analytics
                </div>
                <div className="rounded bg-red-500/20 border border-red-500/30 flex items-center justify-center text-xs p-2 cursor-pointer hover:bg-red-500/30 transition-colors">
                  Security
                </div>
                <div className="rounded bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xs p-2 cursor-pointer hover:bg-violet-500/30 transition-colors">
                  Delivery
                </div>
              </div>
              
              {/* Connection lines would go here in a real implementation */}
              <div className="absolute inset-0 pointer-events-none">
                {/* This would be SVG lines connecting divisions */}
              </div>
            </div>
          </Card>
          
          {/* Agent Evolution Map */}
          <Card className="p-4 border-flow-border/30 bg-black/30 backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium neon-text-blue flex items-center">
                <Share2 className="mr-2 h-5 w-5 text-blue-400" />
                Agent Evolution
              </h3>
              <Button variant="ghost" size="sm" className="text-xs">
                View Details <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            
            <div className="relative h-[180px] bg-black/40 rounded-lg border border-flow-border/20 p-3">
              {/* Simple tree visualization placeholder */}
              <svg width="100%" height="100%" className="overflow-visible">
                {/* Main trunk */}
                <line x1="50%" y1="100%" x2="50%" y2="30%" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="2" />
                
                {/* Branches */}
                <line x1="50%" y1="70%" x2="30%" y2="40%" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="2" />
                <line x1="50%" y1="70%" x2="70%" y2="40%" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="2" />
                <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1" />
                <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1" />
                
                {/* Nodes - would be interactive in real implementation */}
                <circle cx="50%" cy="70%" r="4" fill="#8b5cf6" />
                <circle cx="30%" cy="40%" r="4" fill="#34d399" />
                <circle cx="70%" cy="40%" r="4" fill="#3b82f6" />
                <circle cx="20%" cy="20%" r="3" fill="#ec4899" />
                <circle cx="80%" cy="20%" r="3" fill="#f59e0b" />
                <circle cx="50%" cy="30%" r="5" fill="#10b981" className="animate-pulse" />
              </svg>
              
              <div className="absolute bottom-2 right-2 text-xs text-flow-foreground/60">
                Last evolution: 12 minutes ago
              </div>
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Activity Feed */}
          <Card className="border-flow-border/30 bg-black/30 backdrop-blur-md h-[300px] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-flow-border/20">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium neon-text flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-indigo-400" />
                  Recent Activity
                </h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {[
                { icon: <Zap size={14} />, color: 'text-yellow-500', text: 'Task "Analyze user feedback" completed', time: '2m ago' },
                { icon: <Brain size={14} />, color: 'text-pink-500', text: 'Agent "Knowledge Engineer" learned new pattern', time: '14m ago' },
                { icon: <Settings size={14} />, color: 'text-cyan-500', text: 'System update deployed successfully', time: '1h ago' },
                { icon: <UserPlus size={14} />, color: 'text-green-500', text: 'New agent "Content Specialist" deployed', time: '3h ago' },
                { icon: <Shield size={14} />, color: 'text-red-500', text: 'Security scan completed', time: '5h ago' },
                { icon: <MessageSquare size={14} />, color: 'text-indigo-500', text: 'Agent mesh communication updated', time: '6h ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start p-2 hover:bg-flow-background/10 rounded-md">
                  <div className={`${activity.color} mr-2 mt-0.5`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-flow-foreground/90">{activity.text}</p>
                    <p className="text-xs text-flow-foreground/50">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Task Feed */}
          <Card className="border-flow-border/30 bg-black/30 backdrop-blur-md h-[300px] overflow-hidden flex flex-col col-span-1 lg:col-span-2">
            <div className="p-4 border-b border-flow-border/20">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium neon-text-green flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-green-400" />
                  Active Tasks
                </h3>
                <div className="flex items-center">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View All <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {[
                { title: 'Update knowledge base with new research', agent: 'Knowledge Engineer', progress: 75, priority: 'High', color: 'bg-red-500' },
                { title: 'Analyze customer support interactions', agent: 'Data Architect', progress: 45, priority: 'Medium', color: 'bg-yellow-500' },
                { title: 'Generate content strategy report', agent: 'Strategic Planner', progress: 90, priority: 'Low', color: 'bg-green-500' },
                { title: 'Optimize recommendation engine', agent: 'Operations Manager', progress: 30, priority: 'Medium', color: 'bg-yellow-500' },
              ].map((task, index) => (
                <div key={index} className="bg-black/20 rounded-md p-3 hover:bg-black/30 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full ${task.color} mr-2`}></div>
                      <h4 className="text-sm font-medium">{task.title}</h4>
                    </div>
                    <div className="text-xs text-flow-foreground/60">
                      {task.priority} Priority
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-flow-foreground/70">
                      Agent: {task.agent}
                    </div>
                    <div className="text-xs text-flow-foreground/70">
                      {task.progress}% Complete
                    </div>
                  </div>
                  <div className="w-full bg-flow-border/20 h-1.5 rounded-full overflow-hidden">
                    <div className={`${task.color} h-full rounded-full`} style={{ width: `${task.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="divisions" className="mt-0">
        <DivisionsTab />
      </TabsContent>
      
      <TabsContent value="agents" className="mt-0">
        <AgentsTab />
      </TabsContent>
      
      <TabsContent value="system" className="mt-0">
        <SystemTab />
      </TabsContent>
    </div>
  );
};

export default AgencyDashboard;
