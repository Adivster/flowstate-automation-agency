
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import ThemeSelector from '@/components/ui/ThemeSelector';
import { 
  ChevronLeft, ChevronRight, Layers, Settings, Activity, Users, Database,
  LayoutDashboard, Sliders, Eye, Filter, LineChart, Terminal
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { QuickActionButton } from '@/components/ui/quick-action-button';
import { useToast } from '@/hooks/use-toast';

interface CommandCenterProps {
  onToggleVisualizationControls?: () => void;
  visualizationActive?: boolean;
  onFilterAgents?: (filter: string) => void;
  onChangeViewMode?: (mode: string) => void;
  onShowMetrics?: (show: boolean) => void;
  metricsActive?: boolean;
  onOpenTerminal?: () => void;
  systemStatus?: 'healthy' | 'warning' | 'critical';
  activeAgents?: number;
  totalAgents?: number;
  isMainToolbarVisible?: boolean;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  onToggleVisualizationControls,
  visualizationActive = false,
  onFilterAgents,
  onChangeViewMode,
  onShowMetrics,
  metricsActive = false,
  onOpenTerminal,
  systemStatus = 'healthy',
  activeAgents = 0,
  totalAgents = 0,
  isMainToolbarVisible = true,
}) => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const isDark = theme === 'dark';
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('visualizations');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const getSystemStatusColor = () => {
    switch (systemStatus) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-amber-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };
  
  // Show a warning if any controls are used when the toolbar is active
  useEffect(() => {
    if (!isMainToolbarVisible) return;
    
    const handleKeyPress = (event: KeyboardEvent) => {
      // Detect Ctrl+Space
      if (event.ctrlKey && event.code === 'Space') {
        onOpenTerminal && onOpenTerminal();
        event.preventDefault();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onOpenTerminal, isMainToolbarVisible]);

  return (
    <div className="absolute top-0 left-0 h-full z-40 flex">
      <motion.div
        className={cn(
          "h-full bg-opacity-90 border-r backdrop-blur-sm flex flex-col transition-all duration-300",
          isDark 
            ? "bg-black/80 border-white/10 text-white" 
            : "bg-white/80 border-emerald-200/30 text-gray-800"
        )}
        initial={{ width: '48px' }}
        animate={{ width: isExpanded ? '300px' : '48px' }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col items-center p-2 h-full">
          {/* Header area */}
          <div className="flex w-full items-center justify-between mb-4">
            <AnimatePresence>
              {isExpanded && (
                <motion.div 
                  className="flex-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-sm font-medium ml-2">Command Center</h3>
                </motion.div>
              )}
            </AnimatePresence>
            
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full",
                isDark ? "hover:bg-white/10" : "hover:bg-black/10"
              )}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
          
          {/* Status indicators */}
          <div className="flex flex-col items-center w-full mb-4">
            <div className={cn(
              "w-full p-2 rounded-md flex items-center justify-center",
              !isExpanded && "flex-col"
            )}>
              <div className={cn(
                "flex items-center",
                isExpanded ? "justify-between w-full" : "flex-col"
              )}>
                {isExpanded ? (
                  <>
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full ${getSystemStatusColor()} mr-2`}></div>
                      <span className="text-xs">System Status</span>
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">
                      {systemStatus}
                    </Badge>
                  </>
                ) : (
                  <>
                    <div className={`h-2 w-2 rounded-full ${getSystemStatusColor()} mb-1`}></div>
                    <Activity className="h-4 w-4" />
                  </>
                )}
              </div>
            </div>
            
            {/* Agent activity */}
            <div className={cn(
              "w-full p-2 rounded-md flex items-center",
              !isExpanded && "justify-center"
            )}>
              {isExpanded ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-2 opacity-70" />
                    <span className="text-xs">Active Agents</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activeAgents}/{totalAgents}
                  </Badge>
                </div>
              ) : (
                <Users className="h-4 w-4" />
              )}
            </div>
          </div>
          
          {/* Menu tabs */}
          {isExpanded ? (
            <Tabs 
              defaultValue="visualizations" 
              className="w-full"
              value={activeTab}
              onValueChange={handleTabChange}
            >
              <TabsList className="grid grid-cols-3 w-full mb-2">
                <TabsTrigger value="visualizations" className="text-xs py-1">
                  <Layers className="h-3 w-3 mr-1" />
                  Viz
                </TabsTrigger>
                <TabsTrigger value="analytics" className="text-xs py-1">
                  <LineChart className="h-3 w-3 mr-1" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-xs py-1">
                  <Settings className="h-3 w-3 mr-1" />
                  Settings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="visualizations" className="mt-0">
                <div className="space-y-2">
                  <QuickActionButton
                    size="sm"
                    variant={visualizationActive ? "office" : "default"}
                    className="w-full justify-start text-xs h-8"
                    onClick={onToggleVisualizationControls}
                    icon={<Layers className="h-3.5 w-3.5" />}
                    label="Visualization Layers"
                    active={visualizationActive}
                    position="sidebar"
                    tooltip="Toggle visualization layers"
                  />
                  
                  <QuickActionButton
                    size="sm"
                    variant={metricsActive ? "office" : "default"}
                    className="w-full justify-start text-xs h-8"
                    onClick={() => onShowMetrics && onShowMetrics(!metricsActive)}
                    icon={<Activity className="h-3.5 w-3.5" />}
                    label="Performance Metrics"
                    active={metricsActive}
                    position="sidebar"
                    tooltip="Toggle performance metrics"
                  />
                  
                  <QuickActionButton
                    size="sm"
                    variant="default"
                    className="w-full justify-start text-xs h-8"
                    onClick={() => onFilterAgents && onFilterAgents('all')}
                    icon={<Filter className="h-3.5 w-3.5" />}
                    label="Filter Agents" 
                    position="sidebar"
                    tooltip="Filter agents by criteria"
                  />
                  
                  <QuickActionButton
                    size="sm"
                    variant="default" 
                    className="w-full justify-start text-xs h-8"
                    onClick={() => onChangeViewMode && onChangeViewMode('standard')}
                    icon={<Eye className="h-3.5 w-3.5" />}
                    label="View Mode"
                    position="sidebar"
                    tooltip="Change view mode"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-0">
                <div className="space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-start text-xs h-8"
                  >
                    <Database className="h-3.5 w-3.5 mr-2" />
                    Division Analytics
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-start text-xs h-8"
                  >
                    <Users className="h-3.5 w-3.5 mr-2" />
                    Agent Performance
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-start text-xs h-8"
                  >
                    <LineChart className="h-3.5 w-3.5 mr-2" />
                    System Metrics
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="mt-0">
                <div className="space-y-2">
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs opacity-70 ml-1">Theme</span>
                    <div className="flex w-full justify-center">
                      <ThemeSelector />
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-1 mt-3">
                    <span className="text-xs opacity-70 ml-1">Layout</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full justify-start text-xs h-8"
                    >
                      <LayoutDashboard className="h-3.5 w-3.5 mr-2" />
                      Layout Options
                    </Button>
                  </div>
                  
                  <div className="flex flex-col space-y-1 mt-3">
                    <span className="text-xs opacity-70 ml-1">Effects</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full justify-start text-xs h-8"
                    >
                      <Sliders className="h-3.5 w-3.5 mr-2" />
                      Visual Effects
                    </Button>
                  </div>

                  <div className="flex flex-col space-y-1 mt-3">
                    <span className="text-xs opacity-70 ml-1">Commands</span>
                    <QuickActionButton
                      size="sm"
                      variant="default"
                      className="w-full justify-start text-xs h-8"
                      onClick={onOpenTerminal}
                      icon={<Terminal className="h-3.5 w-3.5" />}
                      label="Open Terminal"
                      position="sidebar"
                      tooltip="Open command terminal (Ctrl+Space)"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <QuickActionButton
                size="sm" 
                variant="office"
                active={visualizationActive}
                className="h-8 w-8"
                onClick={onToggleVisualizationControls}
                icon={<Layers className="h-4 w-4" />}
                label="" 
                position="sidebar"
                tooltip="Toggle visualization layers"
              />
              
              <QuickActionButton
                size="sm"
                variant="office" 
                active={metricsActive}
                className="h-8 w-8"
                onClick={() => onShowMetrics && onShowMetrics(!metricsActive)}
                icon={<Activity className="h-4 w-4" />}
                label=""
                position="sidebar"
                tooltip="Toggle performance metrics" 
              />
              
              <QuickActionButton
                size="sm"
                variant="default"
                className="h-8 w-8" 
                onClick={() => onFilterAgents && onFilterAgents('all')}
                icon={<Filter className="h-4 w-4" />}
                label=""
                position="sidebar"
                tooltip="Filter agents by criteria"
              />
              
              <QuickActionButton 
                size="sm"
                variant="default"
                className="h-8 w-8"
                onClick={() => onChangeViewMode && onChangeViewMode('standard')} 
                icon={<Eye className="h-4 w-4" />}
                label=""
                position="sidebar" 
                tooltip="Change view mode"
              />
              
              <QuickActionButton
                size="sm" 
                variant="default"
                className="h-8 w-8"
                onClick={() => setActiveTab('settings')}
                icon={<Settings className="h-4 w-4" />}
                label=""
                position="sidebar"
                tooltip="Settings" 
              />
            </div>
          )}
          
          {/* Terminal access at bottom */}
          <div className="mt-auto pt-4">
            {!isExpanded ? (
              <QuickActionButton
                size="sm"
                variant="default" 
                className="h-8 w-8"
                onClick={onOpenTerminal}
                icon={<Terminal className="h-4 w-4" />}
                label="" 
                position="sidebar"
                tooltip="Open command terminal (Ctrl+Space)"
              />
            ) : null}
          </div>

          {/* Theme selector at bottom */}
          <div className="mt-2">
            {!isExpanded && (
              <ThemeSelector />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
