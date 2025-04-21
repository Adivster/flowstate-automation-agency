
import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { agents } from '@/components/agents/office/data/agentsData';
import { VisualizationState } from '@/components/agents/office/types/visualizationTypes';
import AgentInfoPanel from '@/components/agents/office/AgentInfoPanel';
import AgentChatAnalyticsPanel from '@/components/agents/office/AgentChatAnalyticsPanel';
import OfficeHeader from '@/components/office/OfficeHeader';
import OfficeStatCards from '@/components/office/OfficeStatCards';
import OfficeTabs from '@/components/office/OfficeTabs';
import OfficeZoomControls from '@/components/office/OfficeZoomControls';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Building2, Filter, Eye, Settings, Terminal, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PerformanceMetricsOverlay } from '@/components/agents/office/metrics/PerformanceMetricsOverlay';

const Office = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('office');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const contentLoaded = useRef(false);
  const [selectedAgentInfo, setSelectedAgentInfo] = useState<any>(null);
  const [selectedAgentForChat, setSelectedAgentForChat] = useState<typeof agents[0] | null>(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [isNewDivisionModalOpen, setIsNewDivisionModalOpen] = useState(false);
  const [visualizationState, setVisualizationState] = useState<VisualizationState>({
    activeLayerIds: ['hotspots', 'performance', 'quickActions'],
    layers: [],
    layerData: {
      heatmap: { active: false, data: [] },
      statusMarkers: { active: true, data: [] },
      hotspots: { 
        active: true,
        divisionHotspots: true,
        workstationHotspots: true,
        serverHotspots: true
      },
      performance: {
        active: true,
        showSparklines: true,
        showEfficiency: true,
        position: 'bottom-right'
      },
      quickActions: {
        active: true,
        style: 'icon',
        position: 'bottom-right'
      },
      analytics: {
        active: false,
        position: 'bottom-right',
        showLabels: true,
        showTrends: true
      }
    }
  });
  
  const [visualizationActive, setVisualizationActive] = useState(true);
  const [filtersActive, setFiltersActive] = useState(false);
  const [metricsActive, setMetricsActive] = useState(true);
  const [showPerformance, setShowPerformance] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const agentStats = {
    total: 24,
    active: 14,
    idle: 7,
    paused: 2,
    error: 1
  };
  
  const performanceData = {
    cpu: Math.floor(Math.random() * 60) + 20,
    memory: Math.floor(Math.random() * 60) + 30,
    network: Math.floor(Math.random() * 80) + 10,
    agentsActive: agentStats.active,
    totalAgents: agentStats.total,
    systemLoad: Array.from({ length: 20 }, () => Math.floor(Math.random() * 60) + 20),
    alerts: Math.floor(Math.random() * 3),
    status: 'healthy' as 'healthy' | 'warning' | 'critical',
    uptime: 99.8,
    efficiency: 87,
    responseTime: 324,
    throughput: [220, 230, 210, 250, 270, 240, 256],
    errorRate: 0.8
  };
  
  useEffect(() => {
    if (contentLoaded.current) return;
    
    setTimeout(() => {
      contentLoaded.current = true;
      setLoaded(true);
    }, 10);
    
    return () => {
      contentLoaded.current = true;
    };
  }, []);
  
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.code === 'Space') {
        handleActionClick('terminal');
        event.preventDefault();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  
  const handleAgentClick = (agent: any) => {
    setSelectedAgentInfo(agent);
  };
  
  const handleCloseAgentInfo = () => {
    setSelectedAgentInfo(null);
  };
  
  const handleToggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };
  
  const handleToggleVisualizationControls = () => {
    setVisualizationActive(!visualizationActive);
    
    setVisualizationState(prevState => {
      const newState = {...prevState};
      if (newState.layerData.hotspots) {
        newState.layerData.hotspots.active = !visualizationActive;
      }
      return newState;
    });
    
    if (!visualizationActive) {
      toast({
        title: "Visualizations Activated",
        description: "Showing enhanced visualization layers.",
      });
    }
  };
  
  const handleToggleFilters = () => {
    setFiltersActive(!filtersActive);
    
    if (!filtersActive) {
      toast({
        title: "Filters Activated",
        description: "You can now filter agents by various criteria.",
      });
    }
  };
  
  const handleToggleMetrics = () => {
    setMetricsActive(!metricsActive);
    
    setVisualizationState(prevState => {
      const newState = {...prevState};
      if (newState.layerData.performance) {
        newState.layerData.performance.active = !metricsActive;
      }
      return newState;
    });
    
    if (!metricsActive) {
      toast({
        title: "Metrics Activated",
        description: "Showing performance metrics overlay.",
      });
    }
  };
  
  const handleHotspotAction = (action: string, entityId: string, entityType: string) => {
    toast({
      title: `${action} - ${entityType}`,
      description: `Performing ${action} on ${entityType} ${entityId}`,
      duration: 3000,
    });
    
    if (action === 'details' && entityType === 'agent') {
      const agentId = parseInt(entityId);
      const foundAgent = agents.find(a => a.id === agentId);
      
      if (foundAgent) {
        setSelectedAgentForChat(foundAgent);
      } else {
        const mockAgent = {
          id: parseInt(entityId),
          name: `Agent ${entityId}`,
          role: 'Knowledge Assistant',
          status: 'working',
          icon: () => null,
          division: 'knowledge',
          position: { x: 0, y: 0 },
          route: [],
          efficiency: 87,
          workload: 75,
          performanceData: [65, 70, 75, 72, 80, 85, 87]
        };
        
        setSelectedAgentForChat(mockAgent as any);
      }
    }
  };
  
  const handleTogglePerformance = () => {
    setShowPerformance(prev => !prev);
  };

  const handleAgentFloorClick = (agentId: number) => {
    const foundAgent = agents.find(a => a.id === agentId);
    if (foundAgent) {
      setSelectedAgentForChat(foundAgent);
    }
  };
  
  const handleActionClick = (action: string) => {
    switch(action) {
      case 'reorganize':
        toast({
          title: "Reorganize Office",
          description: "Office reorganization tool opened",
          duration: 3000,
        });
        break;
      case 'terminal':
        toast({
          title: "Terminal",
          description: "Command terminal activated",
          duration: 3000,
        });
        break;  
      case 'refresh':
        toast({
          title: "Refreshing Status",
          description: "Updating latest agent and system status",
          duration: 3000,
        });
        break;
      case 'agent-details':
        if (selectedAgentInfo) {
          handleCloseAgentInfo();
        } else {
          toast({
            title: "Agent Details",
            description: "Click on an agent to view details",
            duration: 3000,
          });
        }
        break;
      case 'add-division':
        setIsNewDivisionModalOpen(true);
        toast({
          title: "Add Division",
          description: "New division dialog opened",
          duration: 3000,
        });
        break;
      default:
        toast({
          title: action,
          description: `Action: ${action}`,
          duration: 3000,
        });
    }
  };
  
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };
  
  const handleResetZoom = () => {
    setZoomLevel(1);
  };
  
  const handleOpenTerminal = () => {
    handleActionClick('terminal');
  };
  
  if (!loaded) {
    return (
      <div className={cn(
        "fixed inset-0 flex flex-col items-center justify-center z-50",
        isDark 
          ? "bg-gray-900 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900"
          : "bg-emerald-50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-100/60 via-emerald-50 to-emerald-50"
      )}>
        <div className={cn(
          "w-12 h-12 rounded-full",
          isDark 
            ? "border-4 border-purple-500 border-t-transparent animate-spin" 
            : "border-4 border-emerald-500 border-t-transparent animate-spin"
        )}></div>
        <div className={cn(
          "mt-4 text-sm font-medium",
          isDark ? "text-purple-300" : "text-emerald-600"
        )}>
          {isDark ? "Initializing Cyberpunk Interface..." : "Growing Solarpunk Environment..."}
        </div>
      </div>
    );
  }
  
  const backgroundStyle = isDark 
    ? "bg-gray-900 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-gray-900 to-gray-900"
    : "bg-emerald-50 bg-[url('/patterns/woven-light.png')] bg-repeat bg-opacity-30";
  
  return (
    <div className={backgroundStyle}>
      <Helmet>
        <title>{t('office')} | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-20 pb-12 relative">
        <div className="max-w-7xl mx-auto space-y-6">
          <OfficeHeader 
            handleActionClick={handleActionClick}
            selectedAgentInfo={selectedAgentInfo}
            handleViewPerformance={handleTogglePerformance}
            isDark={isDark}
          />
          
          <OfficeStatCards 
            agentStats={agentStats}
            isDark={isDark}
          />
          
          <div className="relative flex">
            {/* Floor plan sidebar */}
            <div className="w-64 mr-4">
              <SidebarProvider>
                <Sidebar collapsible="icon">
                  <SidebarContent>
                    <SidebarGroup>
                      <SidebarGroupLabel>Floor Plan Controls</SidebarGroupLabel>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            onClick={handleToggleFilters}
                            tooltip="Toggle Filters"
                          >
                            <Filter className="mr-2" />
                            <span>Filters</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            onClick={handleToggleVisualizationControls}
                            tooltip="Toggle Visualization"
                          >
                            <Eye className="mr-2" />
                            <span>View Options</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            onClick={handleToggleMetrics}
                            tooltip="Toggle Metrics"
                          >
                            <Settings className="mr-2" />
                            <span>System Metrics</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            onClick={handleOpenTerminal}
                            tooltip="Open Terminal"
                          >
                            <Terminal className="mr-2" />
                            <span>Command Line</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            onClick={() => handleActionClick('add-division')}
                            tooltip="Add New Division"
                          >
                            <PlusCircle className="mr-2" />
                            <span>Add Division</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        
                        <SidebarMenuItem>
                          <Button 
                            onClick={handleZoomIn} 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start"
                          >
                            <span>Zoom In</span>
                          </Button>
                        </SidebarMenuItem>
                        
                        <SidebarMenuItem>
                          <Button 
                            onClick={handleZoomOut} 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start"
                          >
                            <span>Zoom Out</span>
                          </Button>
                        </SidebarMenuItem>
                        
                        <SidebarMenuItem>
                          <Button 
                            onClick={handleResetZoom} 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start"
                          >
                            <span>Reset Zoom</span>
                          </Button>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroup>
                  </SidebarContent>
                </Sidebar>
              </SidebarProvider>
            </div>
            
            {/* Main content area */}
            <div className="flex-1">
              <OfficeTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleActionClick={handleActionClick}
                handleHotspotAction={handleHotspotAction}
                handleAgentFloorClick={handleAgentFloorClick}
                visualizationState={visualizationState}
                zoomLevel={zoomLevel}
                isDark={isDark}
              />
            </div>
          </div>
        </div>
        
        {/* Performance metrics overlay */}
        {showPerformance && (
          <PerformanceMetricsOverlay
            data={performanceData}
            visible={showPerformance}
            position="bottom-right"
            onClose={handleTogglePerformance}
            onViewDetails={handleTogglePerformance}
          />
        )}
        
        {/* Agent info panels */}
        {selectedAgentInfo && (
          <AgentInfoPanel
            agent={selectedAgentInfo}
            onClose={handleCloseAgentInfo}
          />
        )}
        
        {selectedAgentForChat && (
          <AgentChatAnalyticsPanel
            agent={selectedAgentForChat}
            onClose={() => setSelectedAgentForChat(null)}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Office;
