
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { 
  Cpu, Layout, Filter, Terminal, 
  Zap, Eye, Grid, Layers, Activity, 
  Settings, ChevronLeft, ChevronRight,
  Users, PanelRight, PanelLeft, Search, 
  LayoutDashboard, Monitor, ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface VisualizationSettings {
  showHeatmap: boolean;
  showStatusMarkers: boolean;
  showHotspots: boolean;
  showPerformanceMetrics: boolean;
  showSparklines: boolean;
  showQuickActions: boolean;
}

interface UnifiedControlsProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  visualizationSettings?: VisualizationSettings;
  onVisualizationChange?: (settings: Partial<VisualizationSettings>) => void;
  onTogglePerformanceMetrics?: () => void;
  onToggleFilters?: () => void;
  onToggleCommandCenter?: () => void;
  performanceMetricsVisible?: boolean;
  filtersVisible?: boolean;
  commandCenterVisible?: boolean;
  zoomLevel?: number;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetZoom?: () => void;
  onOpenTerminal?: () => void;
}

const UnifiedControls: React.FC<UnifiedControlsProps> = ({
  collapsed = false,
  onToggleCollapse,
  activeTab = 'visualizations',
  onTabChange,
  visualizationSettings = {
    showHeatmap: false,
    showStatusMarkers: true,
    showHotspots: true,
    showPerformanceMetrics: true,
    showSparklines: true,
    showQuickActions: true
  },
  onVisualizationChange,
  onTogglePerformanceMetrics,
  onToggleFilters,
  onToggleCommandCenter,
  performanceMetricsVisible = false,
  filtersVisible = false,
  commandCenterVisible = true,
  zoomLevel = 1,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onOpenTerminal
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleVisualizationToggle = (key: keyof VisualizationSettings) => {
    if (onVisualizationChange) {
      onVisualizationChange({
        [key]: !visualizationSettings[key]
      });
    }
  };
  
  const handleTabChange = (value: string) => {
    if (onTabChange) {
      onTabChange(value);
    }
  };
  
  return (
    <motion.div 
      className={cn(
        "absolute top-4 left-4 bottom-4 z-50 flex flex-col",
        isDark 
          ? "bg-black/80 text-white border-white/10" 
          : "bg-white/80 text-gray-800 border-emerald-200/50",
        "backdrop-blur-md border rounded-lg shadow-lg transition-all duration-300",
        collapsed ? "w-12" : "w-64"
      )}
      initial={false}
      animate={{ width: collapsed ? 48 : 256 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-opacity-20">
        {!collapsed && (
          <h3 className="text-sm font-medium">Office Controls</h3>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 ml-auto"
          onClick={onToggleCollapse}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      {/* Icon Nav for Collapsed State */}
      <AnimatePresence mode="wait">
        {collapsed ? (
          <motion.div 
            key="collapsed"
            className="flex flex-col items-center gap-4 p-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8",
                      activeTab === 'visualizations' && (isDark ? "bg-purple-800/30" : "bg-emerald-100")
                    )}
                    onClick={() => handleTabChange('visualizations')}
                  >
                    <Layers className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Visualizations</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8",
                      activeTab === 'agents' && (isDark ? "bg-purple-800/30" : "bg-emerald-100")
                    )}
                    onClick={() => handleTabChange('agents')}
                  >
                    <Users className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Agents</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8",
                      activeTab === 'performance' && (isDark ? "bg-purple-800/30" : "bg-emerald-100")
                    )}
                    onClick={() => handleTabChange('performance')}
                  >
                    <Activity className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Performance</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8",
                      activeTab === 'view' && (isDark ? "bg-purple-800/30" : "bg-emerald-100")
                    )}
                    onClick={() => handleTabChange('view')}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>View Options</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Separator className="my-2 w-4 bg-white/20" />
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={onTogglePerformanceMetrics}
                  >
                    <Cpu className={cn("h-4 w-4", performanceMetricsVisible && "text-blue-500")} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Performance Metrics</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={onToggleFilters}
                  >
                    <Filter className={cn("h-4 w-4", filtersVisible && "text-amber-500")} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Filters</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={onToggleCommandCenter}
                  >
                    <LayoutDashboard className={cn("h-4 w-4", commandCenterVisible && "text-green-500")} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Command Center</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={onOpenTerminal}
                  >
                    <Terminal className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Terminal</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        ) : (
          <motion.div 
            key="expanded"
            className="flex-1 overflow-hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-3">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
            
            <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col">
              <TabsList className="grid grid-cols-4 h-8 mb-2 mx-2">
                <TabsTrigger value="visualizations" className="text-xs py-1">
                  <Layers className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Viz</span>
                </TabsTrigger>
                <TabsTrigger value="agents" className="text-xs py-1">
                  <Users className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Agents</span>
                </TabsTrigger>
                <TabsTrigger value="performance" className="text-xs py-1">
                  <Activity className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Perf</span>
                </TabsTrigger>
                <TabsTrigger value="view" className="text-xs py-1">
                  <Eye className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">View</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="px-3 overflow-y-auto flex-1">
                <TabsContent value="visualizations" className="space-y-3 mt-0">
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium">Layer Visibility</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="layer-heatmap" className="text-xs">
                          Heatmap Overlay
                        </Label>
                        <Switch
                          id="layer-heatmap"
                          checked={visualizationSettings.showHeatmap}
                          onCheckedChange={() => handleVisualizationToggle('showHeatmap')}
                          className="data-[state=checked]:bg-blue-600"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="layer-status" className="text-xs">
                          Status Markers
                        </Label>
                        <Switch
                          id="layer-status"
                          checked={visualizationSettings.showStatusMarkers}
                          onCheckedChange={() => handleVisualizationToggle('showStatusMarkers')}
                          className="data-[state=checked]:bg-blue-600"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="layer-hotspots" className="text-xs">
                          Interactive Hotspots
                        </Label>
                        <Switch
                          id="layer-hotspots"
                          checked={visualizationSettings.showHotspots}
                          onCheckedChange={() => handleVisualizationToggle('showHotspots')}
                          className="data-[state=checked]:bg-blue-600"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="layer-metrics" className="text-xs">
                          Performance Metrics
                        </Label>
                        <Switch
                          id="layer-metrics"
                          checked={visualizationSettings.showPerformanceMetrics}
                          onCheckedChange={() => handleVisualizationToggle('showPerformanceMetrics')}
                          className="data-[state=checked]:bg-blue-600"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="layer-sparklines" className="text-xs">
                          Sparkline Charts
                        </Label>
                        <Switch
                          id="layer-sparklines"
                          checked={visualizationSettings.showSparklines}
                          onCheckedChange={() => handleVisualizationToggle('showSparklines')}
                          className="data-[state=checked]:bg-blue-600"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="layer-actions" className="text-xs">
                          Quick Actions
                        </Label>
                        <Switch
                          id="layer-actions"
                          checked={visualizationSettings.showQuickActions}
                          onCheckedChange={() => handleVisualizationToggle('showQuickActions')}
                          className="data-[state=checked]:bg-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="agents" className="space-y-3 mt-0">
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium">Agent Filters</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="filter-active" className="text-xs">
                          Active Agents
                        </Label>
                        <Switch
                          id="filter-active"
                          defaultChecked={true}
                          className="data-[state=checked]:bg-green-600"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="filter-idle" className="text-xs">
                          Idle Agents
                        </Label>
                        <Switch
                          id="filter-idle"
                          defaultChecked={true}
                          className="data-[state=checked]:bg-blue-600"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="filter-paused" className="text-xs">
                          Paused Agents
                        </Label>
                        <Switch
                          id="filter-paused"
                          defaultChecked={true}
                          className="data-[state=checked]:bg-amber-600"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="filter-error" className="text-xs">
                          Errored Agents
                        </Label>
                        <Switch
                          id="filter-error"
                          defaultChecked={true}
                          className="data-[state=checked]:bg-red-600"
                        />
                      </div>
                    </div>
                    
                    <h4 className="text-xs font-medium mt-4">Division Filters</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="division-kb" className="text-xs">
                          Knowledge Base
                        </Label>
                        <Switch
                          id="division-kb"
                          defaultChecked={true}
                          className="data-[state=checked]:bg-emerald-600"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="division-analytics" className="text-xs">
                          Analytics
                        </Label>
                        <Switch
                          id="division-analytics"
                          defaultChecked={true}
                          className="data-[state=checked]:bg-blue-600"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="division-operations" className="text-xs">
                          Operations
                        </Label>
                        <Switch
                          id="division-operations"
                          defaultChecked={true}
                          className="data-[state=checked]:bg-orange-600"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="division-strategy" className="text-xs">
                          Strategy
                        </Label>
                        <Switch
                          id="division-strategy"
                          defaultChecked={true}
                          className="data-[state=checked]:bg-purple-600"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="performance" className="space-y-3 mt-0">
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium">Performance Displays</h4>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start text-xs"
                        onClick={onTogglePerformanceMetrics}
                      >
                        <Cpu className="h-3 w-3 mr-2" />
                        {performanceMetricsVisible ? "Hide" : "Show"} Performance Overlay
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start text-xs"
                      >
                        <Activity className="h-3 w-3 mr-2" />
                        Agent Performance Metrics
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start text-xs"
                      >
                        <LayoutDashboard className="h-3 w-3 mr-2" />
                        Division Performance
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-between text-xs h-auto py-2"
                        onClick={() => window.location.href = '/performance'}
                      >
                        <div className="flex items-center">
                          <Monitor className="h-3 w-3 mr-2" />
                          Full Performance Page
                        </div>
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <h4 className="text-xs font-medium">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start text-xs"
                        onClick={onOpenTerminal}
                      >
                        <Terminal className="h-3 w-3 mr-2" />
                        Open Terminal
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start text-xs"
                        onClick={onToggleCommandCenter}
                      >
                        <LayoutDashboard className="h-3 w-3 mr-2" />
                        {commandCenterVisible ? "Hide" : "Show"} Command Center
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="view" className="space-y-3 mt-0">
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium">View Options</h4>
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                          onClick={onZoomIn}
                        >
                          Zoom In
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                          onClick={onResetZoom}
                        >
                          {(zoomLevel * 100).toFixed(0)}%
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                          onClick={onZoomOut}
                        >
                          Zoom Out
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="view-grid" className="text-xs">
                          Show Grid
                        </Label>
                        <Switch
                          id="view-grid"
                          defaultChecked={true}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="view-labels" className="text-xs">
                          Show Labels
                        </Label>
                        <Switch
                          id="view-labels"
                          defaultChecked={true}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="view-ambient" className="text-xs">
                          Ambient Effects
                        </Label>
                        <Switch
                          id="view-ambient"
                          defaultChecked={true}
                        />
                      </div>
                    </div>
                    
                    <h4 className="text-xs font-medium mt-4">Layout Options</h4>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-xs"
                      >
                        <Layout className="h-3 w-3 mr-2" />
                        Default Layout
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-xs"
                      >
                        <PanelLeft className="h-3 w-3 mr-2" />
                        Compact Layout
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-xs"
                      >
                        <PanelRight className="h-3 w-3 mr-2" />
                        Extended Layout
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!collapsed && (
        <div className="p-3 border-t border-opacity-20 space-x-2 flex">
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-7 flex-1"
            onClick={onTogglePerformanceMetrics}
          >
            <Cpu className="h-3 w-3 mr-1" />
            Metrics
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-7 flex-1"
            onClick={onToggleFilters}
          >
            <Filter className="h-3 w-3 mr-1" />
            Filters
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-7 flex-1"
            onClick={onOpenTerminal}
          >
            <Terminal className="h-3 w-3 mr-1" />
            Terminal
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default UnifiedControls;
