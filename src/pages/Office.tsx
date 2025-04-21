import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AgentGrid from '@/components/agents/AgentGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Cpu, Users, Briefcase, Filter, Terminal, Zap, Building2, 
  RefreshCw, Eye, Grid, Layers, Activity, BookOpen, 
  Leaf, Sun, GanttChart, ChevronRight, BarChart, 
  ChevronDown, Settings, Share2, GraduationCap
} from 'lucide-react';
import OfficeFloorPlan from '@/components/agents/OfficeFloorPlan';
import AgencyMetrics from '@/components/agents/AgencyMetrics';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { GlassMorphism } from '@/components/ui/GlassMorphism'; 
import { Badge } from '@/components/ui/badge';
import PageHeader from '@/components/ui/design-system/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import ThemedBackground from '@/components/ui/ThemedBackground';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { SolarpunkPanel } from '@/components/ui/design-system/SolarpunkPanel';
import VisualizationControls from '@/components/agents/office/VisualizationControls';
import AgentInfoPanel from '@/components/agents/office/AgentInfoPanel';
import { VisualizationState } from '@/components/agents/office/types/visualizationTypes';
import { agents } from '@/components/agents/office/data/agentsData';
import AgentChatAnalyticsPanel from '@/components/agents/office/AgentChatAnalyticsPanel';
import { TaskProvider } from '@/contexts/TaskContext';
import { CommandCenter } from '@/components/agents/office/layout/CommandCenter';
import { OfficeControls } from '@/components/agents/office/layout/OfficeControls';

const Office = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('office');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const contentLoaded = useRef(false);
  const [selectedAgentInfo, setSelectedAgentInfo] = useState<any>(null);
  const [selectedAgentForChat, setSelectedAgentForChat] = useState<typeof agents[0] | null>(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
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
  const [isNewDivisionModalOpen, setIsNewDivisionModalOpen] = useState(false);
  
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
          icon: BookOpen,
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

  const [zoomLevel, setZoomLevel] = useState(1);
  
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };
  
  const handleResetZoom = () => {
    setZoomLevel(1);
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
  
  const headerIcon = isDark 
    ? <Building2 className="h-12 w-12 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
    : <Building2 className="h-12 w-12 text-emerald-600 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />;
  
  return (
    <div className={backgroundStyle}>
      <Helmet>
        <title>{t('office')} | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-20 pb-12 relative">
        <CommandCenter 
          onToggleVisualizationControls={handleToggleVisualizationControls}
          visualizationActive={visualizationActive}
          onFilterAgents={handleToggleFilters}
          onShowMetrics={handleToggleMetrics}
          metricsActive={metricsActive}
          onOpenTerminal={() => handleActionClick('terminal')}
          systemStatus="healthy"
          activeAgents={agentStats.active}
          totalAgents={agentStats.total}
          isMainToolbarVisible={!sidebarExpanded}
        />
        
        <div className="max-w-7xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center"
          >
            <PageHeader 
              title="Office"
              extendedTitle={isDark ? "Digital Workspace" : "Collaborative Environment"}
              description={isDark 
                ? "Navigate your AI teams with an interactive, real-time floor plan."
                : "An integrated workspace for your eco-conscious digital agents."
              }
              icon={headerIcon}
              variant="office"
              glassEffect={true}
              actions={
                <div className="flex flex-wrap items-center gap-2">
                  <Button 
                    variant={isDark ? "cyberpunk" : "eco"} 
                    size="sm"
                    onClick={() => handleActionClick('reorganize')}
                  >
                    <Grid className="h-4 w-4" />
                    Reorganize Office
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={cn(
                      isDark 
                        ? "bg-purple-500/10 border-purple-500/50 hover:bg-purple-500/20 text-purple-400" 
                        : "bg-emerald-100 border-emerald-300 hover:bg-emerald-200 text-emerald-700"
                    )}
                    onClick={() => handleActionClick('agent-details')}
                  >
                    <Users className="h-4 w-4" />
                    {selectedAgentInfo ? 'Close Agent Details' : 'View Agent Details'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={cn(
                      isDark 
                        ? "bg-purple-500/10 border-purple-500/50 hover:bg-purple-500/20 text-purple-400" 
                        : "bg-emerald-100 border-emerald-300 hover:bg-emerald-200 text-emerald-700"
                    )}
                    onClick={() => handleActionClick('refresh')}
                  >
                    <RefreshCw className="h-4 w-4" />
                    Refresh Status
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      isDark 
                        ? "bg-blue-500/10 border-blue-500/50 hover:bg-blue-500/20 text-blue-400" 
                        : "bg-blue-100 border-blue-300 hover:bg-blue-200 text-blue-700"
                    )}
                    onClick={handleViewPerformance}
                  >
                    <Activity className="h-4 w-4" />
                    Performance Monitoring
                  </Button>
                </div>
              }
            />
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="hover-scale"
            >
              <GlassMorphism 
                intensity="low" 
                className={cn(
                  "p-4 rounded-xl flex items-center",
                  isDark 
                    ? "border-green-500/30" 
                    : "border-emerald-300 bg-gradient-to-br from-emerald-50/90 to-white/90"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg mr-4",
                  isDark ? "bg-green-500/20" : "bg-emerald-200/50"
                )}>
                  <Zap className={cn(
                    "h-5 w-5", 
                    isDark ? "text-green-500" : "text-emerald-600",
                    "agent-glow-green"
                  )} />
                </div>
                <div>
                  <div className={cn(
                    "text-xl font-bold", 
                    isDark ? "text-white" : "text-gray-800"
                  )}>
                    {agentStats.active}
                  </div>
                  <div className={cn(
                    "text-xs", 
                    isDark ? "text-flow-foreground/70" : "text-gray-600"
                  )}>
                    Active Agents
                  </div>
                </div>
                <Badge className={cn(
                  "ml-auto text-xs",
                  isDark ? "bg-green-500" : "bg-emerald-500"
                )}>
                  Working
                </Badge>
              </GlassMorphism>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="hover-scale"
            >
              <GlassMorphism 
                intensity="low" 
                className={cn(
                  "p-4 rounded-xl flex items-center",
                  isDark 
                    ? "border-blue-500/30" 
                    : "border-blue-300 bg-gradient-to-br from-blue-50/90 to-white/90"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg mr-4",
                  isDark ? "bg-blue-500/20" : "bg-blue-200/50"
                )}>
                  <Cpu className={cn(
                    "h-5 w-5", 
                    isDark ? "text-blue-500" : "text-blue-600",
                    "agent-glow-blue"
                  )} />
                </div>
                <div>
                  <div className={cn(
                    "text-xl font-bold", 
                    isDark ? "text-white" : "text-gray-800"
                  )}>
                    {agentStats.idle}
                  </div>
                  <div className={cn(
                    "text-xs", 
                    isDark ? "text-flow-foreground/70" : "text-gray-600"
                  )}>
                    Idle Agents
                  </div>
                </div>
                <Badge className={cn(
                  "ml-auto text-xs",
                  isDark ? "bg-blue-500/70" : "bg-blue-500"
                )}>
                  Ready
                </Badge>
              </GlassMorphism>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="hover-scale"
            >
              <GlassMorphism 
                intensity="low" 
                className={cn(
                  "p-4 rounded-xl flex items-center",
                  isDark 
                    ? "border-amber-500/30" 
                    : "border-amber-300 bg-gradient-to-br from-amber-50/90 to-white/90"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg mr-4",
                  isDark ? "bg-amber-500/20" : "bg-amber-200/50"
                )}>
                  <Cpu className={cn(
                    "h-5 w-5", 
                    isDark ? "text-amber-500" : "text-amber-600",
                    "agent-glow-amber"
                  )} />
                </div>
                <div>
                  <div className={cn(
                    "text-xl font-bold", 
                    isDark ? "text-white" : "text-gray-800"
                  )}>
                    {agentStats.paused}
                  </div>
                  <div className={cn(
                    "text-xs", 
                    isDark ? "text-flow-foreground/70" : "text-gray-600"
                  )}>
                    Paused Agents
                  </div>
                </div>
                <Badge className={cn(
                  "ml-auto text-xs",
                  isDark ? "bg-amber-500" : "bg-amber-500"
                )}>
                  Paused
                </Badge>
              </GlassMorphism>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="hover-scale"
            >
              <GlassMorphism 
                intensity="low" 
                className={cn(
                  "p-4 rounded-xl flex items-center",
                  isDark 
                    ? "border-red-500/30" 
                    : "border-red-300 bg-gradient-to-br from-red-50/90 to-white/90"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg mr-4",
                  isDark ? "bg-red-500/20" : "bg-red-200/50"
                )}>
                  <Terminal className={cn(
                    "h-5 w-5", 
                    isDark ? "text-red-500" : "text-red-600",
                    "agent-glow-red"
                  )} />
                </div>
                <div>
                  <div className={cn(
                    "text-xl font-bold", 
                    isDark ? "text-white" : "text-gray-800"
                  )}>
                    {agentStats.error}
                  </div>
                  <div className={cn(
                    "text-xs", 
                    isDark ? "text-flow-foreground/70" : "text-gray-600"
                  )}>
                    Error State
                  </div>
                </div>
                <Badge className={cn(
                  "ml-auto text-xs",
                  isDark ? "bg-red-500" : "bg-red-500"
                )}>
                  Action Required
                </Badge>
              </GlassMorphism>
            </motion.div>
          </div>
          
          <div className="relative">
            <SolarpunkPanel 
              accentColor={isDark ? "blue" : "green"} 
              className={cn(
                "overflow-hidden hover-scale",
                isDark 
                  ? "border-[1px] border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]" 
                  : "border-[1px] border-emerald-400/70 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
              )}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 p-6">
                <TabsList className={cn(
                  "grid w-full max-w-md grid-cols-3",
                  isDark 
                    ? "bg-flow-background/30 border border-flow-border/50" 
                    : "bg-white/60 border border-emerald-200"
                )}>
                  <TabsTrigger 
                    value="office" 
                    className={cn(
                      "flex items-center gap-2",
                      isDark
                        ? "data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
                        : "data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=inactive]:text-emerald-700"
                    )}
                  >
                    <Briefcase className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('officeView')}</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="agents" 
                    className={cn(
                      "flex items-center gap-2",
                      isDark
                        ? "data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
                        : "data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=inactive]:text-emerald-700"
                    )}
                  >
                    <Users className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('agentList')}</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="metrics" 
                    className={cn(
                      "flex items-center gap-2",
                      isDark
                        ? "data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
                        : "data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=inactive]:text-emerald-700"
                    )}
                  >
                    <Cpu className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('systemMetrics')}</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="office" className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm mb-4">
                    <div className={cn(
                      "flex items-center", 
                      isDark ? "text-flow-foreground/60" : "text-gray-600"
                    )}>
                      {isDark 
                        ? <Zap className="h-4 w-4 mr-2 text-flow-accent" />
                        : <Leaf className="h-4 w-4 mr-2 text-emerald-600" />
                      }
                      {isDark 
                        ? t('interactiveOffice')
                        : "Navigate your sustainable digital workspace"
                      }
                    </div>
                  </div>
                  
                  <div className={cn(
                    "min-h-[550px] h-[550px] relative",
                    isDark 
                      ? "bg-black/40 rounded-xl backdrop-blur-sm overflow-hidden border border-purple-500/20" 
                      : "bg-white/10 rounded-xl backdrop-blur-sm overflow-hidden border border-emerald-300/30"
                  )}
                    style={{ 
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: 'center',
                      transition: 'transform 0.3s ease-out'
                    }}
                  >
                    <TaskProvider>
                      <OfficeFloorPlan 
                        visualizationState={visualizationState}
                        onHotspotAction={handleHotspotAction}
                        onAgentClick={handleAgentFloorClick}
                        hideTopControls={true}
                      />
                    </TaskProvider>
                  </div>
                  
                  <div className="flex justify-end items-center mt-2">
                    <div className={cn(
                      "text-xs px-3 py-1.5 backdrop-blur-sm rounded-full border animate-pulse-subtle",
                      isDark 
                        ? "bg-flow-background/30 border-flow-accent/30 text-flow-foreground/60" 
                        : "bg-emerald-50/60 border-emerald-300/50 text-emerald-800"
                    )}>
                      <span className={isDark ? "text-flow-accent" : "text-emerald-600"}>
                        {t('proTip')}
                      </span>{" "}
                      Press <kbd className="font-mono px-1 py-0.5 text-[10px] bg-black/20 rounded">Ctrl+Space</kbd> to open the command terminal
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="agents" className="space-y-6">
                  <div className={cn(
                    "h-[60vh] overflow-y-auto pr-1 custom-scrollbar",
                    isDark 
                      ? "scrollbar-dark" 
                      : "scrollbar-light"
                  )}>
                    <AgentGrid />
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Button 
                      variant={isDark ? "cyberpunk" : "eco"}
                      onClick={() => handleActionClick('deploy-agent')}
                    >
                      {isDark 
                        ? <Zap className="h-4 w-4" />
                        : <Leaf className="h-4 w-4" />
                      }
                      Deploy New Agent
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="metrics" className="space-y-6">
                  <GlassMorphism 
                    intensity="low" 
                    className={cn(
                      "p-4 rounded-xl mb-4",
                      isDark 
                        ? "border-flow-border/30" 
                        : "border-emerald-200"
                    )}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm">
                      <div className={cn(
                        "flex items-center",
                        isDark ? "text-flow-foreground/70" : "text-gray-600"
                      )}>
                        <Cpu className={cn(
                          "h-4 w-4 mr-2",
                          isDark ? "text-cyan-400" : "text-cyan-600"
                        )} />
                        {t('performanceMetrics')}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-0">
                        <Select defaultValue="7d">
                          <SelectTrigger className={cn(
                            "w-[140px] h-8 text-xs",
                            isDark 
                              ? "bg-flow-background/30 border-flow-border/50" 
                              : "bg-white/50 border-emerald-200"
                          )}>
                            <SelectValue placeholder="Time Period" />
                          </SelectTrigger>
                          <SelectContent className={cn(
                            isDark 
                              ? "bg-flow-background/90 backdrop-blur-md border-flow-border" 
                              : "bg-white/90 backdrop-blur-md border-emerald-200"
                          )}>
                            <SelectItem value="24h">Last 24 Hours</SelectItem>
                            <SelectItem value="7d">Last 7 Days</SelectItem>
                            <SelectItem value="30d">Last 30 Days</SelectItem>
                            <SelectItem value="90d">Last Quarter</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={cn(
                            "h-8 px-2 text-xs",
                            isDark 
                              ? "bg-flow-background/30 border-flow-border/50" 
                              : "bg-white/50 border-emerald-200"
                          )}
                          onClick={() => handleActionClick('export')}
                        >
                          Export
                        </Button>
                      </div>
                    </div>
                  </GlassMorphism>
                  
                  <div className={cn(
                    "min-h-[550px] h-[550px] relative",
                    isDark 
                      ? "bg-black/40 rounded-xl backdrop-blur-sm overflow-hidden border border-cyan-500/20" 
                      : "bg-white/10 rounded-xl backdrop-blur-sm overflow-hidden border border-cyan-300/30"
                  )}>
                    <AgencyMetrics />
                  </div>
                </TabsContent>
              </Tabs>
            </SolarpunkPanel>
          </div>
        </div>
        
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
          onSave={() => {
            toast({
              title: "Layout Saved",
              description: "The current office layout has been saved.",
              duration: 3000,
            });
          }}
          onOpenTerminal={() => handleActionClick('terminal')}
          isSidebarExpanded={sidebarExpanded}
        />
        
        <AnimatePresence>
          {selectedAgentInfo && (
            <AgentInfoPanel 
              agent={selectedAgentInfo} 
              onClose={handleCloseAgentInfo} 
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedAgentForChat && (
            <AgentChatAnalyticsPanel 
              agent={selectedAgentForChat} 
              onClose={() => setSelectedAgentForChat(null)} 
            />
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
      
      <style>
        {`
        .scrollbar-dark::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-dark::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
        }
        
        .scrollbar-dark::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 8px;
        }
        
        .scrollbar-dark::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
        
        .scrollbar-light::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-light::-webkit-scrollbar-track {
          background: rgba(16, 185, 129, 0.1);
          border-radius: 8px;
        }
        
        .scrollbar-light::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 8px;
        }
        
        .scrollbar-light::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.5);
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 3s infinite;
        }
        
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        `}
      </style>
    </div>
  );
};

export default Office;
