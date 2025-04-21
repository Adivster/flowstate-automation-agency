
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, Filter, Activity, Eye, Terminal, 
  Plus, ZoomIn, ZoomOut, RotateCcw, Info,
  Cpu, ChevronLeft, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface UnifiedControlPanelProps {
  onToggleVisualization: () => void;
  onToggleFilters: () => void;
  onToggleMetrics: () => void;
  onTogglePerformance: () => void;
  onAddDivision: () => void;
  onOpenTerminal: () => void;
  visualizationActive: boolean;
  filtersActive: boolean;
  metricsActive: boolean;
  performanceVisible: boolean;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  isDark: boolean;
}

const UnifiedControlPanel: React.FC<UnifiedControlPanelProps> = ({
  onToggleVisualization,
  onToggleFilters,
  onToggleMetrics,
  onTogglePerformance,
  onAddDivision,
  onOpenTerminal,
  visualizationActive,
  filtersActive,
  metricsActive,
  performanceVisible,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  isDark
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  
  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
    if (!collapsed) {
      setActivePanel(null);
    }
  };

  const handlePanelToggle = (panel: string) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <motion.div 
      className={cn(
        "absolute left-0 top-1 bottom-1 z-10 flex flex-col",
        "rounded-lg backdrop-blur-lg shadow-lg border transition-all duration-300",
        isDark 
          ? "bg-black/70 text-white border-white/10 shadow-black/20" 
          : "bg-white/70 text-gray-800 border-emerald-200/50 shadow-emerald-100/10",
        collapsed ? "w-12" : "w-16"
      )}
      initial={false}
      animate={{ width: collapsed ? 48 : 64 }}
    >
      {/* Collapse/Expand button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 self-end mt-1 mr-1"
        onClick={handleToggleCollapse}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
      
      {/* Main icon controls */}
      <div className="flex-1 flex flex-col items-center gap-5 px-1 py-3">
        <TooltipProvider>
          {/* Visualizations toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-full",
                  visualizationActive && (isDark ? "bg-purple-900/50 text-purple-300" : "bg-emerald-100 text-emerald-700")
                )}
                onClick={onToggleVisualization}
              >
                <Layers className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Toggle Visualizations</p>
            </TooltipContent>
          </Tooltip>
          
          {/* Filters toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-full",
                  filtersActive && (isDark ? "bg-blue-900/50 text-blue-300" : "bg-blue-100 text-blue-700")
                )}
                onClick={onToggleFilters}
              >
                <Filter className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Toggle Filters</p>
            </TooltipContent>
          </Tooltip>
          
          {/* System Metrics toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-full",
                  metricsActive && (isDark ? "bg-amber-900/50 text-amber-300" : "bg-amber-100 text-amber-700")
                )}
                onClick={onToggleMetrics}
              >
                <Activity className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Toggle System Metrics</p>
            </TooltipContent>
          </Tooltip>

          {/* Performance Monitoring toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-full",
                  performanceVisible && (isDark ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700")
                )}
                onClick={onTogglePerformance}
              >
                <Cpu className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Toggle Performance Monitoring</p>
            </TooltipContent>
          </Tooltip>
          
          <Separator className="w-8" />
          
          {/* Terminal button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={onOpenTerminal}
              >
                <Terminal className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Open Command Terminal (Ctrl+Space)</p>
            </TooltipContent>
          </Tooltip>
          
          {/* Add Division button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={onAddDivision}
              >
                <Plus className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Add New Division</p>
            </TooltipContent>
          </Tooltip>
          
          <Separator className="w-8" />
          
          {/* Zoom controls */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={onZoomIn}
              >
                <ZoomIn className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Zoom In</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full text-xs font-mono"
                onClick={onResetZoom}
              >
                {Math.round(zoomLevel * 100)}%
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Reset Zoom</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={onZoomOut}
              >
                <ZoomOut className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Zoom Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {/* Help/Info button */}
      <div className="p-2 flex justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className={cn(
                "h-8 w-8 rounded-full",
                isDark 
                  ? "bg-black/60 text-white border-white/10 hover:bg-black/80 hover:border-white/20" 
                  : "bg-white/60 text-emerald-800 border-emerald-200/50 hover:bg-white/80 hover:border-emerald-300"
              )}
            >
              <Info className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className={cn(
            "w-80 p-3 border backdrop-blur-lg", 
            isDark
              ? "bg-black/80 border-white/10 text-white" 
              : "bg-white/80 border-emerald-200 text-gray-800"
          )} side="right">
            <h4 className="font-medium mb-2">Office View Controls</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Layers className={cn("h-4 w-4 mt-0.5", isDark ? "text-purple-400" : "text-emerald-600")} />
                <span>Use <strong>Visualization Layers</strong> to toggle different data overlays</span>
              </li>
              <li className="flex items-start gap-2">
                <Filter className={cn("h-4 w-4 mt-0.5", isDark ? "text-blue-400" : "text-blue-600")} />
                <span>Use <strong>Filters</strong> to focus on specific divisions or agent states</span>
              </li>
              <li className="flex items-start gap-2">
                <Activity className={cn("h-4 w-4 mt-0.5", isDark ? "text-amber-400" : "text-amber-600")} />
                <span>Toggle <strong>System Metrics</strong> to view system status</span>
              </li>
              <li className="flex items-start gap-2">
                <Terminal className={cn("h-4 w-4 mt-0.5", isDark ? "text-green-400" : "text-green-600")} />
                <span>Press <strong>Ctrl+Space</strong> to open the command terminal</span>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </motion.div>
  );
};

export default UnifiedControlPanel;
