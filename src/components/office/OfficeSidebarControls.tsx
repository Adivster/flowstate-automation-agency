
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Layers,
  Filter,
  Activity,
  Info,
  Plus,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Cpu,
  CircleInfo
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect } from "react";

interface OfficeSidebarControlsProps {
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

export const OfficeSidebarControls: React.FC<OfficeSidebarControlsProps> = ({
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
  const { state, openMobile, setOpenMobile } = useSidebar();

  // Auto-hide sidebar on mobile after action
  const handleMenuAction = (fn: () => void) => {
    return () => {
      fn();
      if (openMobile) setOpenMobile(false);
    };
  };

  // Collapsible desktop sidebar: none (shown), mobile: hides
  // For accessibility, show sidebar always above office grid (not overlapping).

  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="offcanvas"
      className={cn(
        "z-30 border-r border-gray-200/40 bg-white/90 dark:bg-black/80 backdrop-blur-lg",
        "h-full sticky top-0",
        "max-w-[4.5rem] min-w-[3.5rem] md:min-w-[4.5rem]",
        "flex flex-col"
      )}
    >
      <SidebarHeader className="px-1 pt-3 pb-0 flex items-center justify-center">
        <CircleInfo className={cn("h-6 w-6", isDark ? "text-white" : "text-emerald-900")} aria-label="Office Controls" />
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-visible p-0">
        <SidebarGroup>
          <SidebarGroupLabel className="sr-only">Controls</SidebarGroupLabel>
          <SidebarGroupContent>
            <TooltipProvider>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        aria-label="Toggle Visualizations"
                        isActive={visualizationActive}
                        onClick={handleMenuAction(onToggleVisualization)}
                      >
                        <Layers className="w-5 h-5" />
                        <span className="hidden md:inline">Layers</span>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">Toggle Visualizations</TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        aria-label="Toggle Filters"
                        isActive={filtersActive}
                        onClick={handleMenuAction(onToggleFilters)}
                      >
                        <Filter className="w-5 h-5" />
                        <span className="hidden md:inline">Filters</span>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">Toggle Filters</TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        aria-label="Toggle Metrics"
                        isActive={metricsActive}
                        onClick={handleMenuAction(onToggleMetrics)}
                      >
                        <Activity className="w-5 h-5" />
                        <span className="hidden md:inline">Metrics</span>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">Toggle Metrics</TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        aria-label="Performance Monitor"
                        isActive={performanceVisible}
                        onClick={handleMenuAction(onTogglePerformance)}
                      >
                        <Cpu className="w-5 h-5" />
                        <span className="hidden md:inline">Performance</span>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">Toggle Performance Monitor</TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        aria-label="Open Terminal"
                        onClick={handleMenuAction(onOpenTerminal)}
                      >
                        <Terminal className="w-5 h-5" />
                        <span className="hidden md:inline">Terminal</span>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">Open Terminal (Ctrl+Space)</TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        aria-label="Add Division"
                        onClick={handleMenuAction(onAddDivision)}
                      >
                        <Plus className="w-5 h-5" />
                        <span className="hidden md:inline">Division</span>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">Add New Division</TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              </SidebarMenu>
            </TooltipProvider>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="sr-only">Zoom</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex flex-col items-center gap-0.5 my-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={handleMenuAction(onZoomIn)}
                      aria-label="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Zoom In</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full font-mono text-xs"
                      onClick={handleMenuAction(onResetZoom)}
                      aria-label="Reset Zoom"
                    >
                      {Math.round(zoomLevel * 100)}%
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Reset Zoom</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={handleMenuAction(onZoomOut)}
                      aria-label="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Zoom Out</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-2 flex justify-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full"
                aria-label="Help">
                <Info className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className={cn(isDark ? "bg-black/90 text-white border-white/10" : "bg-white/90 text-emerald-800 border-emerald-200/50") + " w-64"}>
                <h4 className="font-medium mb-1">Office Controls</h4>
                <ul className="space-y-1 text-sm mt-1">
                  <li className="flex items-center gap-2"><Layers className="h-4 w-4" /> Visualization Layers</li>
                  <li className="flex items-center gap-2"><Filter className="h-4 w-4" /> Filters</li>
                  <li className="flex items-center gap-2"><Activity className="h-4 w-4" /> Metrics</li>
                  <li className="flex items-center gap-2"><Cpu className="h-4 w-4" /> Performance</li>
                  <li className="flex items-center gap-2"><Terminal className="h-4 w-4" /> Terminal <span className="text-xs ml-1">(Ctrl+Space)</span></li>
                  <li className="flex items-center gap-2"><Plus className="h-4 w-4" /> Add Division</li>
                  <li className="flex items-center gap-2"><ZoomIn className="h-4 w-4" /> Zoom Controls</li>
                </ul>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SidebarFooter>
    </Sidebar>
  );
};

export default OfficeSidebarControls;
