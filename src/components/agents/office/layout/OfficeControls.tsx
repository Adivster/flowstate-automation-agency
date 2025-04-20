
import React, { useState } from 'react';
import { 
  Info, ZoomIn, ZoomOut, Layers, Maximize, Minimize, Save, Plus,
  Filter, Activity, Settings, ChevronDown, ChevronUp, Eye, Terminal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { SolarpunkWindow } from '@/components/ui/design-system/SolarpunkWindow';
import NewDivisionModal from '../division-modal/NewDivisionModal';
import { Badge } from '@/components/ui/badge';
import { QuickActionButton } from '@/components/ui/quick-action-button';

interface OfficeControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onToggleVisualizationControls?: () => void;
  visualizationActive?: boolean;
  onToggleFilters?: () => void;
  filtersActive?: boolean;
  onToggleMetrics?: () => void;
  metricsActive?: boolean;
  onAddDivision?: () => void;
  onSave?: () => void;
  onOpenTerminal?: () => void;
  isSidebarExpanded?: boolean;
}

export const OfficeControls: React.FC<OfficeControlsProps> = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onToggleVisualizationControls,
  visualizationActive = false,
  onToggleFilters,
  filtersActive = false,
  onToggleMetrics,
  metricsActive = false,
  onAddDivision,
  onSave,
  onOpenTerminal,
  isSidebarExpanded = false
}) => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const isDark = theme === 'dark';
  const [expanded, setExpanded] = useState(false);
  const [controlsExpanded, setControlsExpanded] = useState(false);
  const [isNewDivisionModalOpen, setIsNewDivisionModalOpen] = useState(false);
  
  const handleCreateDivision = (data: any) => {
    if (onAddDivision) {
      onAddDivision();
    }
    toast({
      title: "Division Created",
      description: `${data.name} division has been created successfully.`,
    });
    setIsNewDivisionModalOpen(false);
  };

  return (
    <>
      {/* Help icon in top right */}
      <div className="absolute top-3 right-4 z-40">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              size="sm" 
              variant="outline" 
              className={cn(
                "h-8 w-8 p-0 backdrop-blur-md border transition-all duration-300", 
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
          )}>
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
                <span>Toggle <strong>Performance Metrics</strong> to view system status</span>
              </li>
              <li className="flex items-start gap-2">
                <Terminal className={cn("h-4 w-4 mt-0.5", isDark ? "text-green-400" : "text-green-600")} />
                <span>Press <strong>Ctrl+Space</strong> to open the command terminal</span>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      {/* Main control toolbar - only show if sidebar is collapsed */}
      {!isSidebarExpanded && (
        <motion.div 
          className={cn(
            "absolute top-3 left-1/2 transform -translate-x-1/2 z-40",
            "rounded-lg backdrop-blur-md shadow-lg border flex items-center",
            isDark 
              ? "bg-black/60 border-white/10 shadow-black/20" 
              : "bg-white/60 border-emerald-200/30 shadow-emerald-100/10"
          )}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
        >
          <div className="px-2 py-1.5 flex items-center gap-1">
            <QuickActionButton
              size="sm"
              variant="office"
              className="h-8 rounded-md text-xs"
              onClick={onToggleVisualizationControls}
              icon={<Layers className="h-3.5 w-3.5" />}
              label="Visualizations"
              active={visualizationActive}
              tooltip="Toggle visualization layers"
            />
            
            <QuickActionButton
              size="sm"
              variant="office"
              className="h-8 rounded-md text-xs"
              onClick={onToggleFilters}
              icon={<Filter className="h-3.5 w-3.5" />}
              label="Filters"
              active={filtersActive}
              tooltip="Apply filters to agents view"
            />
            
            <QuickActionButton
              size="sm"
              variant="office"
              className="h-8 rounded-md text-xs"
              onClick={onToggleMetrics}
              icon={<Activity className="h-3.5 w-3.5" />}
              label="Metrics"
              active={metricsActive}
              tooltip="Show performance metrics"
            />
            
            <Separator orientation="vertical" className="h-6 mx-0.5" />
            
            <QuickActionButton
              size="sm"
              variant="default"
              className="h-8 rounded-md text-xs"
              onClick={() => setIsNewDivisionModalOpen(true)}
              icon={<Plus className="h-3.5 w-3.5" />}
              label="Division"
              tooltip="Create new division"
            />
            
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => setControlsExpanded(!controlsExpanded)}
              aria-label={controlsExpanded ? "Collapse controls" : "Expand controls"}
            >
              {controlsExpanded ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </motion.div>
      )}
      
      {/* Expanded controls panel */}
      <AnimatePresence>
        {controlsExpanded && !isSidebarExpanded && (
          <motion.div
            className={cn(
              "absolute top-14 left-1/2 transform -translate-x-1/2 z-40",
              "rounded-lg backdrop-blur-md shadow-lg border p-3",
              isDark 
                ? "bg-black/60 border-white/10 shadow-black/20" 
                : "bg-white/60 border-emerald-200/30 shadow-emerald-100/10"
            )}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] opacity-70">View Mode</span>
                <QuickActionButton
                  size="sm"
                  variant="default"
                  className="w-full h-8 text-xs"
                  onClick={onToggleVisualizationControls}
                  icon={<Eye className="h-3.5 w-3.5" />}
                  label="Standard"
                  tooltip="Switch to standard view"
                />
              </div>
              
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] opacity-70">Terminal</span>
                <QuickActionButton
                  size="sm"
                  variant="default"
                  className="w-full h-8 text-xs"
                  onClick={onOpenTerminal}
                  icon={<Terminal className="h-3.5 w-3.5" />}
                  label="Open"
                  tooltip="Open command terminal (Ctrl+Space)"
                />
              </div>
              
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] opacity-70">Save</span>
                <QuickActionButton
                  size="sm"
                  variant="default"
                  className="w-full h-8 text-xs"
                  onClick={onSave}
                  icon={<Save className="h-3.5 w-3.5" />}
                  label="Save Layout"
                  tooltip="Save current office layout"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoom controls - always visible */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2 z-40">
        <Button
          size="sm"
          variant="outline"
          className={cn(
            "h-8 w-8 p-0 backdrop-blur-md border transition-all duration-300", 
            isDark 
              ? "bg-black/80 text-white border-gray-600/50 hover:bg-black/90 hover:border-gray-500/50" 
              : "bg-white/80 text-gray-700 border-gray-200/50 hover:bg-white/90 hover:border-gray-300"
          )}
          onClick={onZoomOut}
        >
          <ZoomOut className="h-3.5 w-3.5" />
        </Button>
        
        <Button 
          size="sm"
          variant="outline"
          className={cn(
            "h-8 backdrop-blur-md border transition-all duration-300 px-2 font-mono",
            isDark 
              ? "bg-black/80 text-white border-gray-600/50 hover:bg-black/90 hover:border-gray-500/50" 
              : "bg-white/80 text-gray-700 border-gray-200/50 hover:bg-white/90 hover:border-gray-300"
          )}
          onClick={onResetZoom}
        >
          {Math.round(zoomLevel * 100)}%
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          className={cn(
            "h-8 w-8 p-0 backdrop-blur-md border transition-all duration-300",
            isDark 
              ? "bg-black/80 text-white border-gray-600/50 hover:bg-black/90 hover:border-gray-500/50" 
              : "bg-white/80 text-gray-700 border-gray-200/50 hover:bg-white/90 hover:border-gray-300"
          )}
          onClick={onZoomIn}
        >
          <ZoomIn className="h-3.5 w-3.5" />
        </Button>
        
        <Button
          size="sm"
          variant="outline" 
          className={cn(
            "h-8 w-8 p-0 backdrop-blur-md border transition-all duration-300 ml-2",
            expanded 
              ? isDark ? "bg-blue-500/30 border-blue-500/50 text-white" : "bg-blue-500/30 border-blue-500/50 text-white"
              : isDark ? "bg-black/80 text-white border-gray-600/50" : "bg-white/80 text-gray-700 border-gray-200/50"
          )}
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? "Collapse additional controls" : "Expand additional controls"}
        >
          {expanded ? <Minimize className="h-3.5 w-3.5" /> : <Maximize className="h-3.5 w-3.5" />}
        </Button>
      </div>

      {/* Additional controls that appear when expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div 
            className="absolute bottom-14 right-3 z-40"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className={cn(
              "flex flex-col gap-2 p-2 rounded-lg backdrop-blur-md",
              isDark ? "bg-black/70 border border-gray-700/50" : "bg-white/70 border border-gray-200/50"
            )}>
              <Button
                size="sm"
                variant="outline"
                className={cn(
                  "h-8 w-8 p-0", 
                  isDark 
                    ? "bg-black/50 text-white border-gray-700/50" 
                    : "bg-white/50 text-gray-700 border-gray-200/50"
                )}
                onClick={() => setIsNewDivisionModalOpen(true)}
                title="Add new division"
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                className={cn(
                  "h-8 w-8 p-0", 
                  isDark 
                    ? "bg-black/50 text-white border-gray-700/50" 
                    : "bg-white/50 text-gray-700 border-gray-200/50"
                )}
                onClick={onSave}
                title="Save layout"
              >
                <Save className="h-3.5 w-3.5" />
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                className={cn(
                  "h-8 w-8 p-0", 
                  isDark 
                    ? "bg-black/50 text-white border-gray-700/50" 
                    : "bg-white/50 text-gray-700 border-gray-200/50"
                )}
                onClick={onOpenTerminal}
                title="Open terminal"
              >
                <Terminal className="h-3.5 w-3.5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Division Modal */}
      <SolarpunkWindow
        open={isNewDivisionModalOpen}
        onClose={() => setIsNewDivisionModalOpen(false)}
        title="Create New Division"
        description="Define a new division within the office."
      >
        <NewDivisionModal
          onClose={() => setIsNewDivisionModalOpen(false)}
          onCreateDivision={handleCreateDivision}
        />
      </SolarpunkWindow>
    </>
  );
};
