
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
          defaultValue={activeTab}
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
          </TabsContent>
          
          <TabsContent value="divisions">
            <DivisionsTab />
          </TabsContent>
          
          <TabsContent value="agents">
            <AgentsTab />
          </TabsContent>
          
          <TabsContent value="system">
            <SystemTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgencyDashboard;
