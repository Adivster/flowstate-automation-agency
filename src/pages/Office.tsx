
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
import { CommandCenter } from '@/components/agents/office/layout/CommandCenter';
import { OfficeControls } from '@/components/agents/office/layout/OfficeControls';
import OfficeHeader from '@/components/office/OfficeHeader';
import OfficeStatCards from '@/components/office/OfficeStatCards';
import OfficeTabs from '@/components/office/OfficeTabs';
import OfficeZoomControls from '@/components/office/OfficeZoomControls';
import AgentInfoPanel from '@/components/agents/office/AgentInfoPanel';
import AgentChatAnalyticsPanel from '@/components/agents/office/AgentChatAnalyticsPanel';

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
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const agentStats = {
    total: 24,
    active: 14,
    idle: 7,
    paused: 2,
    error: 1
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
  
  const handleViewPerformance = () => {
    window.location.href = '/performance';
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
        {/* Single row of contextual actions */}
        <div className="flex flex-wrap gap-2 justify-end items-center mb-4">
          <OfficeControls
            zoomLevel={zoomLevel}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetZoom={handleResetZoom}
            onToggleVisualizationControls={handleToggleVisualizationControls}
            visualizationActive={visualizationActive}
            onToggleFilters={handleToggleFilters}
            filtersActive={filtersActive}
            onToggleMetrics={handleToggleMetrics}
            metricsActive={metricsActive}
            onAddDivision={() => setIsNewDivisionModalOpen(true)}
            onSave={() => handleActionClick('save')}
            onOpenTerminal={handleOpenTerminal}
          />
        </div>

        <div className="max-w-7xl mx-auto space-y-6">
          <OfficeHeader 
            handleActionClick={handleActionClick}
            selectedAgentInfo={selectedAgentInfo}
            handleViewPerformance={handleViewPerformance}
            isDark={isDark}
          />
          
          <OfficeStatCards 
            agentStats={agentStats}
            isDark={isDark}
          />
          
          <div className="relative">
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
            
            {activeTab === 'office' && (
              <OfficeZoomControls
                handleZoomIn={handleZoomIn}
                handleZoomOut={handleZoomOut}
                handleResetZoom={handleResetZoom}
                isDark={isDark}
              />
            )}
          </div>
        </div>
        
        {/* Command center and agent info panel */}
        <CommandCenter
          onToggleVisualizationControls={handleToggleVisualizationControls}
          visualizationActive={visualizationActive}
          onFilterAgents={() => {}}
          onChangeViewMode={() => {}}
          onShowMetrics={handleToggleMetrics}
          metricsActive={metricsActive}
          onOpenTerminal={handleOpenTerminal}
          systemStatus="healthy"
          activeAgents={agentStats.active}
          totalAgents={agentStats.total}
          isMainToolbarVisible={true}
        />
        
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
