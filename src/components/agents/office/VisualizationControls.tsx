
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Layers, Activity, AlertTriangle, Gauge, User, Grid3X3, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { VisualizationLayerData } from './types/visualizationTypes';

export type VisualizationLayer = {
  id: string;
  name: string;
  active: boolean;
  icon?: React.ReactNode;
  count?: number;
  color?: string;
};

interface VisualizationControlsProps {
  layers: VisualizationLayer[];
  onToggleLayer: (layerId: string) => void;
  className?: string;
  layerData?: VisualizationLayerData;
  onUpdateLayerOptions?: (layerId: string, options: any) => void;
}

const VisualizationControls: React.FC<VisualizationControlsProps> = ({
  layers,
  onToggleLayer,
  className = '',
  layerData,
  onUpdateLayerOptions
}) => {
  const getDefaultIcon = (layerId: string) => {
    switch (layerId) {
      case 'heatmap':
        return <Activity className="h-4 w-4" />;
      case 'statusMarkers':
        return <AlertTriangle className="h-4 w-4" />;
      case 'performance':
        return <Gauge className="h-4 w-4" />;
      case 'hotspots':
        return <User className="h-4 w-4" />;
      case 'quickActions':
        return <Settings className="h-4 w-4" />;
      case 'grid':
        return <Grid3X3 className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  const handlePositionChange = (layerId: string, position: 'bottom-right' | 'top-right' | 'bottom-left' | 'top-left') => {
    if (onUpdateLayerOptions) {
      if (layerId === 'performance') {
        onUpdateLayerOptions('performance', { position });
      } else if (layerId === 'quickActions') {
        onUpdateLayerOptions('quickActions', { position });
      }
    }
  };
  
  return (
    <div className={`${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            size="sm"
            variant="outline" 
            className="h-8 gap-2 bg-black/70 backdrop-blur-md hover:bg-black/90 text-white border-white/10"
          >
            <Layers className="h-4 w-4" />
            <span className="hidden sm:inline">Visualization Layers</span>
            <span className="inline sm:hidden">Layers</span>
            {layers.filter(l => l.active).length > 0 && (
              <Badge className="h-5 min-w-5 flex items-center justify-center p-0 text-xs bg-white text-black">
                {layers.filter(l => l.active).length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="min-w-[220px] bg-black/90 backdrop-blur-lg border-white/10 text-white">
          <DropdownMenuLabel className="text-xs text-white/70">Toggle Visualization Layers</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/10" />
          
          {layers.map((layer) => (
            <React.Fragment key={layer.id}>
              {(layer.id === 'performance' || layer.id === 'quickActions') ? (
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded ${layer.color || (layer.active ? 'text-white' : 'text-white/50')}`}>
                        {layer.icon || getDefaultIcon(layer.id)}
                      </div>
                      <span className={layer.active ? 'text-white' : 'text-white/50'}>
                        {layer.name}
                      </span>
                      {layer.count !== undefined && (
                        <Badge className="ml-1 h-4 flex items-center justify-center bg-white/10 text-white/70 text-[10px]">
                          {layer.count}
                        </Badge>
                      )}
                    </div>
                    
                    <Switch
                      checked={layer.active}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLayer(layer.id);
                      }}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </DropdownMenuSubTrigger>
                  
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="min-w-[180px] bg-black/90 backdrop-blur-lg border-white/10 text-white">
                      <DropdownMenuLabel className="text-xs text-white/60">Position</DropdownMenuLabel>
                      <DropdownMenuItem 
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => handlePositionChange(layer.id, 'bottom-right')}
                      >
                        <div className="w-4 h-4 border border-white/20 rounded-sm relative">
                          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-blue-500 rounded-sm"></div>
                        </div>
                        <span>Bottom Right</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => handlePositionChange(layer.id, 'top-right')}
                      >
                        <div className="w-4 h-4 border border-white/20 rounded-sm relative">
                          <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-blue-500 rounded-sm"></div>
                        </div>
                        <span>Top Right</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => handlePositionChange(layer.id, 'bottom-left')}
                      >
                        <div className="w-4 h-4 border border-white/20 rounded-sm relative">
                          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-blue-500 rounded-sm"></div>
                        </div>
                        <span>Bottom Left</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => handlePositionChange(layer.id, 'top-left')}
                      >
                        <div className="w-4 h-4 border border-white/20 rounded-sm relative">
                          <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-blue-500 rounded-sm"></div>
                        </div>
                        <span>Top Left</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              ) : (
                <DropdownMenuItem 
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => onToggleLayer(layer.id)}
                >
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded ${layer.color || (layer.active ? 'text-white' : 'text-white/50')}`}>
                      {layer.icon || getDefaultIcon(layer.id)}
                    </div>
                    <span className={layer.active ? 'text-white' : 'text-white/50'}>
                      {layer.name}
                    </span>
                    {layer.count !== undefined && (
                      <Badge className="ml-1 h-4 flex items-center justify-center bg-white/10 text-white/70 text-[10px]">
                        {layer.count}
                      </Badge>
                    )}
                  </div>
                  
                  <Switch
                    checked={layer.active}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </DropdownMenuItem>
              )}
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default VisualizationControls;
