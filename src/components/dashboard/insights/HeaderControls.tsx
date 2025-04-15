
import React from 'react';
import { PanelLeft, PanelRight, Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface HeaderControlsProps {
  isFullscreen: boolean;
  sidebarCollapsed: boolean;
  onToggleFullscreen: () => void;
  onToggleSidebar: () => void;
}

const HeaderControls: React.FC<HeaderControlsProps> = ({
  isFullscreen,
  sidebarCollapsed,
  onToggleFullscreen,
  onToggleSidebar,
}) => {
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 border-flow-border/30 bg-black/20 hover:bg-black/30"
              onClick={onToggleSidebar}
            >
              {sidebarCollapsed ? <PanelRight className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" withArrow={true} className="bg-black/80 border-flow-border/50 text-xs">
            {sidebarCollapsed ? 'Show sidebar' : 'Hide sidebar'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 border-flow-border/30 bg-black/20 hover:bg-black/30"
              onClick={onToggleFullscreen}
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" withArrow={true} className="bg-black/80 border-flow-border/50 text-xs">
            {isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default HeaderControls;
