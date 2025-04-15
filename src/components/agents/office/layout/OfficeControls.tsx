
import React from 'react';
import { Info, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface OfficeControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export const OfficeControls: React.FC<OfficeControlsProps> = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}) => {
  return (
    <>
      <div className="absolute top-3 right-28 z-40">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 w-8 p-0 bg-black/60 backdrop-blur-md text-white border-white/10"
            >
              <Info className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-3 bg-black/80 backdrop-blur-lg border-white/10 text-white">
            <h4 className="font-medium mb-2">Office View Controls</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 text-purple-400" />
                <span>Use <strong>Visualization Layers</strong> to toggle different data overlays</span>
              </li>
              <li className="flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 text-blue-400" />
                <span>Click on divisions or agents to view detailed information</span>
              </li>
              <li className="flex items-start gap-2">
                <ZoomIn className="h-4 w-4 mt-0.5 text-green-400" />
                <span>Use zoom controls or hold Option/Alt + drag to pan around</span>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      <div className="absolute bottom-3 right-3 flex items-center gap-2 z-40">
        <Button
          size="sm"
          variant="outline"
          className="h-8 w-8 p-0 bg-gray-800/80 backdrop-blur-md text-white border-gray-600 hover:bg-gray-700/80"
          onClick={onZoomOut}
        >
          <ZoomOut className="h-3.5 w-3.5" />
        </Button>
        
        <Button 
          size="sm"
          variant="outline"
          className="h-8 bg-gray-800/80 backdrop-blur-md text-white border-gray-600 hover:bg-gray-700/80 px-2 font-mono"
          onClick={onResetZoom}
        >
          {Math.round(zoomLevel * 100)}%
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          className="h-8 w-8 p-0 bg-gray-800/80 backdrop-blur-md text-white border-gray-600 hover:bg-gray-700/80"
          onClick={onZoomIn}
        >
          <ZoomIn className="h-3.5 w-3.5" />
        </Button>
      </div>
    </>
  );
};
