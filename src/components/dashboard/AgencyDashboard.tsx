
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, PanelLeft, PanelRight, Maximize, Minimize, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WelcomeHeader from './WelcomeHeader';
import GlobalOpportunityPlaybook from './GlobalOpportunityPlaybook';
import SnapshotGrid from './SnapshotGrid';
import SystemVitality from './SystemVitality';
import RecentWins from './RecentWins';
import WeeklyGrowth from './WeeklyGrowth';
import DivisionsTab from './tabs/DivisionsTab';
import AgentsTab from './tabs/AgentsTab';
import SystemTab from './tabs/SystemTab';
import GrowthCenter from './GrowthCenter';
import { OverviewContent } from './OverviewContent';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/theme-provider';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const AgencyDashboard = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { toast } = useToast();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState("mission-control");
  const [dashboardView, setDashboardView] = useState<'overview' | 'growth-center'>('overview');
  const [systemHealth, setSystemHealth] = useState(95);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [isGlowing, setIsGlowing] = useState(false);

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
  
  const switchToDashboardView = (view: 'overview' | 'growth-center') => {
    if (view === dashboardView) return;
    
    setDashboardView(view);
    setIsGlowing(true);
    
    // Show toast notification
    toast({
      title: view === 'overview' ? "Overview Mode Activated" : "Growth Center Mode Activated",
      description: view === 'overview' 
        ? "Showing comprehensive dashboard overview." 
        : "Showing growth opportunities and optimization tools.",
      duration: 3000
    });
    
    // Reset the glow effect after animation
    setTimeout(() => setIsGlowing(false), 1000);
  };
  
  return (
    <div className="p-4 relative">
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <div className="relative flex-grow max-w-md">
          <Input 
            placeholder="Search dashboard..." 
            className="h-8 w-full text-xs pl-8 bg-black/30 border-flow-border/30"
            onKeyDown={handleCommandK}
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
          {/* Dashboard Hero */}
          <WelcomeHeader />
          
          {/* Dashboard Toggle Bar - Enhanced with pulsing animation and improved interaction */}
          <motion.div 
            className={cn(
              "flex mb-4 p-1 rounded-md border transition-all",
              isDark 
                ? "bg-gray-900/50 border-gray-800" 
                : "bg-white/50 border-gray-100",
              isGlowing && "animate-pulse"
            )}
            animate={isGlowing ? {
              boxShadow: ["0 0 5px rgba(6, 182, 212, 0.3)", "0 0 15px rgba(6, 182, 212, 0.7)", "0 0 5px rgba(6, 182, 212, 0.3)"],
            } : {}}
            transition={{ duration: 1.5, repeat: isGlowing ? 2 : 0 }}
          >
            <Button 
              variant="ghost"
              size="sm"
              className={cn(
                "flex-1 text-xs font-medium transition-all duration-300 relative overflow-hidden", 
                dashboardView === 'overview' 
                  ? isDark 
                    ? "bg-flow-accent/30 text-blue-300 border border-blue-500/30" 
                    : "bg-blue-50 text-blue-600 border border-blue-200"
                  : ""
              )}
              onClick={() => switchToDashboardView('overview')}
            >
              {dashboardView === 'overview' && isDark && (
                <motion.div 
                  className="absolute inset-0 bg-blue-500/10"
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <span className="relative z-10">Overview Mode</span>
            </Button>
            
            <Button 
              variant="ghost"
              size="sm"
              className={cn(
                "flex-1 text-xs font-medium transition-all duration-300 relative overflow-hidden", 
                dashboardView === 'growth-center'
                  ? isDark 
                    ? "bg-emerald-500/30 text-emerald-300 border border-emerald-500/30" 
                    : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                  : ""
              )}
              onClick={() => switchToDashboardView('growth-center')}
            >
              {dashboardView === 'growth-center' && isDark && (
                <motion.div 
                  className="absolute inset-0 bg-emerald-500/10"
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <span className="relative z-10">Growth Center Mode</span>
            </Button>
          </motion.div>
          
          {/* Main Content Area - Dynamic based on selected view with animation */}
          <motion.div 
            className="transition-all duration-500"
            animate={{ 
              opacity: isGlowing ? 0.8 : 1,
              scale: isGlowing ? 0.99 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            {dashboardView === 'overview' ? (
              <OverviewContent />
            ) : (
              <GrowthCenter />
            )}
          </motion.div>
          
          {/* Recent Wins Section */}
          <div className="mt-4">
            <RecentWins />
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
