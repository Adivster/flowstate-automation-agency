
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
  Terminal as TerminalIcon,
  PanelLeft,
  PanelRight,
  Maximize,
  Minimize,
  Rocket
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { useDashboardActions } from '@/hooks/useDashboardActions';
import SystemStatusModule from './modules/SystemStatusModule';
import AIInsightsPanel from './modules/AIInsightsPanel';
import QuickActionsHub from './modules/QuickActionsHub';
import PerformanceMap from './modules/PerformanceMap';
import DivisionOverview from './modules/DivisionOverview';
import AgentEvolutionMap from './modules/AgentEvolutionMap';
import RecentActivityFeed from './modules/RecentActivityFeed';
import TaskFeed from './modules/TaskFeed';
import CommandTerminalWidget from './modules/CommandTerminalWidget';
import GlobalMeshStatus from './modules/GlobalMeshStatus';
import DivisionsTab from './tabs/DivisionsTab';
import AgentsTab from './tabs/AgentsTab';
import SystemTab from './tabs/SystemTab';

const AgencyDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("mission-control");
  const dashboardActions = useDashboardActions();
  const [systemHealth, setSystemHealth] = useState(95);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <div className="p-4 relative">
      {/* Header Bar with System Status */}
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
        
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 border-flow-border/30 bg-black/20"
            onClick={toggleSidebar}
          >
            {sidebarCollapsed ? <PanelRight className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 border-flow-border/30 bg-black/20"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
          <Tabs 
            defaultValue={activeTab}
            value={activeTab} 
            onValueChange={setActiveTab}
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
      </div>
      
      {/* Pulse Line */}
      <div className="h-0.5 w-full bg-black/30 mb-6 relative overflow-hidden">
        <motion.div 
          className="absolute h-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/80 to-cyan-500/0 top-0"
          style={{ width: '30%' }}
          animate={{
            x: ['-100%', '400%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Main Dashboard Content */}
      <Tabs value={activeTab}>
        <TabsContent value="mission-control" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            {/* System Status Module */}
            <SystemStatusModule systemHealth={systemHealth} />
            
            {/* AI Insights Panel */}
            <AIInsightsPanel />
            
            {/* Quick Actions Hub */}
            <QuickActionsHub />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            {/* Performance Map */}
            <div className="lg:col-span-1">
              <PerformanceMap />
            </div>
            
            {/* Division Overview */}
            <div className="lg:col-span-1">
              <DivisionOverview />
            </div>
            
            {/* Agent Evolution Map */}
            <div className="lg:col-span-1">
              <AgentEvolutionMap />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Recent Activity Feed */}
            <div className="lg:col-span-1">
              <RecentActivityFeed />
            </div>
            
            {/* Task Feed */}
            <div className="lg:col-span-1">
              <TaskFeed />
            </div>
            
            {/* Command Terminal Widget */}
            <div className="lg:col-span-1">
              <CommandTerminalWidget />
            </div>
          </div>
          
          {/* Global Mesh Status (Optional) */}
          <div className="mt-4">
            <GlobalMeshStatus />
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
      
      {/* Dashboard Achievements Panel */}
      <motion.div 
        className="fixed bottom-4 right-4 bg-black/80 border border-indigo-500/30 rounded-lg p-3 backdrop-blur-md z-30 shadow-lg"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="flex items-center gap-2 text-xs text-flow-foreground/80">
          <Rocket className="h-4 w-4 text-amber-400" />
          <span>🔥 1,000 tasks completed this week!</span>
        </div>
      </motion.div>
    </div>
  );
};

export default AgencyDashboard;
