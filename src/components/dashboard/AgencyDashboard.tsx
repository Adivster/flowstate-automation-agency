
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { PanelLeft, PanelRight, Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WelcomeHeader from './WelcomeHeader';
import DivisionsTab from './tabs/DivisionsTab';
import AgentsTab from './tabs/AgentsTab';
import SystemTab from './tabs/SystemTab';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/theme-provider';
import { useToast } from '@/hooks/use-toast';

const AgencyDashboard = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { toast } = useToast();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState("divisions");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
      <div className="mb-6 flex justify-end items-center gap-2">
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

      {/* Dashboard Hero */}
      <WelcomeHeader />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="bg-flow-background/30 border border-flow-border/20 p-1">
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
