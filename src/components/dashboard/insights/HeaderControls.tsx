
import React from 'react';
import { PanelLeft, PanelRight, Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <Button 
        variant="outline" 
        size="icon" 
        className="h-8 w-8 border-flow-border/30 bg-black/20"
        onClick={onToggleSidebar}
      >
        {sidebarCollapsed ? <PanelRight className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        className="h-8 w-8 border-flow-border/30 bg-black/20"
        onClick={onToggleFullscreen}
      >
        {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default HeaderControls;
