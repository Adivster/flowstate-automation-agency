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
  Settings,
  PanelLeft,
  PanelRight,
  Maximize,
  Minimize,
  Rocket,
  Search
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
import PerformanceMap from './modules/PerformanceMap';
import DivisionOverview from './modules/DivisionOverview';
import AgentEvolutionMap from './modules/AgentEvolutionMap';
import RecentActivityFeed from './modules/RecentActivityFeed';
import TaskFeed from './modules/TaskFeed';
import GlobalMeshStatus from './modules/GlobalMeshStatus';
import DivisionsTab from './tabs/DivisionsTab';
import AgentsTab from './tabs/AgentsTab';
import SystemTab from './tabs/SystemTab';
import { Input } from '@/components/ui/input';

const AgencyDashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("mission-control");
  const dashboardActions = useDashboardActions();
  const [systemHealth, setSystemHealth] = useState(95);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState<'day' | 'week' | 'month' | 'year'>('week');

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth(prev => {
        const change = Math.random() * 2 - 1;
        const newValue = prev + change;
        return Math.min(Math.max(newValue, 90), 99);
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

  const handleCommandK = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const event = new CustomEvent('openCommandTerminal');
      window.dispatchEvent(event);
    }
  };
  
  return (
    <div className="p-4 relative">
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <div className="relative flex-grow max-w-md">
          <Input 
            placeholder="Search dashboard..." 
            className="h-8 w-full text-xs pl-8 bg-black/30 border-flow-border/30"
          />
          <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-flow-foreground/50" />
          <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 bg-flow-background/30 px-1 rounded text-[10px] text-flow-foreground/60">
            Ctrl+K
          </div>
        </div>

        <div className="flex items-center gap-2">
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
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
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
        
        <TabsContent value="mission-control">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <SystemStatusModule systemHealth={systemHealth} />
            <AIInsightsPanel />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="lg:col-span-1">
              <PerformanceMap />
            </div>
            
            <div className="lg:col-span-1">
              <DivisionOverview />
            </div>
            
            <div className="lg:col-span-1">
              <AgentEvolutionMap />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="lg:col-span-1">
              <RecentActivityFeed />
            </div>
            
            <div className="lg:col-span-1">
              <TaskFeed />
            </div>
          </div>
          
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
    </div>
  );
};

export default AgencyDashboard;
