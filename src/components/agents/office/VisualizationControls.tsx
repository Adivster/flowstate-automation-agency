
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Grid, Layers, Activity, Cpu, Zap, AlertCircle, BadgeInfo, ScanLine, MapPin } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VisualizationState } from './types/visualizationTypes';

export interface VisualizationLayer {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface VisualizationControlsProps {
  visualizationState: VisualizationState;
  updateVisualizationState: (state: Partial<VisualizationState>) => void;
  onClose?: () => void;
}

const VisualizationControls: React.FC<VisualizationControlsProps> = ({
  visualizationState,
  updateVisualizationState,
  onClose
}) => {
  const availableLayers: VisualizationLayer[] = [
    {
      id: 'heatmap',
      name: 'Activity Heatmap',
      icon: <Layers className="h-4 w-4" />,
      description: 'Shows areas of high agent activity and system load'
    },
    {
      id: 'statusMarkers',
      name: 'Status Markers',
      icon: <AlertCircle className="h-4 w-4" />,
      description: 'Displays alerts and notifications in the workspace'
    },
    {
      id: 'hotspots',
      name: 'Interactive Hotspots',
      icon: <MapPin className="h-4 w-4" />,
      description: 'Clickable points that provide quick actions and information'
    },
    {
      id: 'performance',
      name: 'Performance Metrics',
      icon: <Activity className="h-4 w-4" />,
      description: 'Visual indicators of agent and division performance'
    },
    {
      id: 'quickActions',
      name: 'Quick Actions',
      icon: <Zap className="h-4 w-4" />,
      description: 'Access to common actions for divisions and agents'
    },
    {
      id: 'grid',
      name: 'Grid Overlay',
      icon: <Grid className="h-4 w-4" />,
      description: 'Display a reference grid over the workspace'
    },
    {
      id: 'ambientEffects',
      name: 'Ambient Effects',
      icon: <ScanLine className="h-4 w-4" />,
      description: 'Visual embellishments like scanlines and glow effects'
    }
  ];
  
  const toggleLayer = (layerId: string) => {
    const isCurrentlyActive = visualizationState.activeLayerIds.includes(layerId);
    
    const newActiveLayerIds = isCurrentlyActive
      ? visualizationState.activeLayerIds.filter(id => id !== layerId)
      : [...visualizationState.activeLayerIds, layerId];
    
    updateVisualizationState({ 
      activeLayerIds: newActiveLayerIds,
      layerData: {
        ...visualizationState.layerData,
        [layerId]: {
          ...visualizationState.layerData[layerId as keyof typeof visualizationState.layerData],
          active: !isCurrentlyActive
        }
      }
    });
  };
  
  const updateLayerOption = (layerId: string, optionKey: string, value: any) => {
    updateVisualizationState({
      layerData: {
        ...visualizationState.layerData,
        [layerId]: {
          ...visualizationState.layerData[layerId as keyof typeof visualizationState.layerData],
          [optionKey]: value
        }
      }
    });
  };

  return (
    <div className="p-4 bg-black/80 backdrop-blur-md text-white rounded-lg border border-white/10 w-80 max-h-[80vh] overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Eye className="h-4 w-4" /> Visualization Controls
        </h3>
        <Button variant="ghost" size="sm" className="text-white/70 hover:text-white" onClick={onClose}>
          <EyeOff className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-6">
        {/* Available Layers */}
        <div>
          <h4 className="text-sm text-white/80 mb-3 border-b border-white/10 pb-1">Visualization Layers</h4>
          <div className="space-y-3">
            {availableLayers.map((layer) => (
              <div key={layer.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-7 w-7 bg-white/10 rounded-full flex items-center justify-center mr-3">
                    {layer.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{layer.name}</div>
                    <div className="text-xs text-white/60">{layer.description}</div>
                  </div>
                </div>
                <Switch 
                  checked={visualizationState.activeLayerIds.includes(layer.id)}
                  onCheckedChange={() => toggleLayer(layer.id)}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Layer Configuration - Heat Map */}
        {visualizationState.layerData.heatmap.active && (
          <LayerConfigSection title="Heat Map Options">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <Label className="text-xs">Heat Intensity</Label>
                  <span className="text-xs text-white/60">
                    {visualizationState.layerData.heatmap.intensity || 50}%
                  </span>
                </div>
                <Slider
                  value={[visualizationState.layerData.heatmap.intensity || 50]}
                  min={10}
                  max={100}
                  step={5}
                  onValueChange={(value) => updateLayerOption('heatmap', 'intensity', value[0])}
                />
              </div>
              
              <div>
                <Label className="text-xs mb-1 block">Blend Mode</Label>
                <Select
                  value={visualizationState.layerData.heatmap.blendMode || 'screen'}
                  onValueChange={(value) => updateLayerOption('heatmap', 'blendMode', value)}
                >
                  <SelectTrigger className="bg-black/50 border-white/20 text-xs h-7">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/20">
                    <SelectItem value="screen">Screen (Lighter)</SelectItem>
                    <SelectItem value="overlay">Overlay (Contrast)</SelectItem>
                    <SelectItem value="multiply">Multiply (Darker)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </LayerConfigSection>
        )}
        
        {/* Layer Configuration - Status Markers */}
        {visualizationState.layerData.statusMarkers.active && (
          <LayerConfigSection title="Status Marker Options">
            <div className="space-y-3">
              <div>
                <Label className="text-xs mb-1 block">Marker Style</Label>
                <Select
                  value={visualizationState.layerData.statusMarkers.style || 'minimal'}
                  onValueChange={(value) => updateLayerOption('statusMarkers', 'style', value)}
                >
                  <SelectTrigger className="bg-black/50 border-white/20 text-xs h-7">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/20">
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </LayerConfigSection>
        )}
        
        {/* Layer Configuration - Hotspots */}
        {visualizationState.layerData.hotspots.active && (
          <LayerConfigSection title="Hotspot Options">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Division Hotspots</Label>
                <Switch 
                  checked={visualizationState.layerData.hotspots.divisionHotspots}
                  onCheckedChange={(checked) => updateLayerOption('hotspots', 'divisionHotspots', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-xs">Workstation Hotspots</Label>
                <Switch 
                  checked={visualizationState.layerData.hotspots.workstationHotspots}
                  onCheckedChange={(checked) => updateLayerOption('hotspots', 'workstationHotspots', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-xs">Server Hotspots</Label>
                <Switch 
                  checked={visualizationState.layerData.hotspots.serverHotspots}
                  onCheckedChange={(checked) => updateLayerOption('hotspots', 'serverHotspots', checked)}
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <Label className="text-xs">Glow Intensity</Label>
                  <span className="text-xs text-white/60">
                    {visualizationState.layerData.hotspots.glowIntensity || 50}%
                  </span>
                </div>
                <Slider
                  value={[visualizationState.layerData.hotspots.glowIntensity || 50]}
                  min={10}
                  max={100}
                  step={5}
                  onValueChange={(value) => updateLayerOption('hotspots', 'glowIntensity', value[0])}
                />
              </div>
            </div>
          </LayerConfigSection>
        )}
        
        {/* Layer Configuration - Performance */}
        {visualizationState.layerData.performance.active && (
          <LayerConfigSection title="Performance Metrics Options">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Show Sparklines</Label>
                <Switch 
                  checked={visualizationState.layerData.performance.showSparklines}
                  onCheckedChange={(checked) => updateLayerOption('performance', 'showSparklines', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-xs">Show Efficiency</Label>
                <Switch 
                  checked={visualizationState.layerData.performance.showEfficiency}
                  onCheckedChange={(checked) => updateLayerOption('performance', 'showEfficiency', checked)}
                />
              </div>
              
              <div>
                <Label className="text-xs mb-1 block">Chart Style</Label>
                <Select
                  value={visualizationState.layerData.performance.chartStyle || 'minimal'}
                  onValueChange={(value) => updateLayerOption('performance', 'chartStyle', value)}
                >
                  <SelectTrigger className="bg-black/50 border-white/20 text-xs h-7">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/20">
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </LayerConfigSection>
        )}
        
        {/* Layer Configuration - Grid */}
        {visualizationState.layerData.grid?.active && (
          <LayerConfigSection title="Grid Options">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <Label className="text-xs">Grid Size</Label>
                  <span className="text-xs text-white/60">
                    {visualizationState.layerData.grid?.size || 20}px
                  </span>
                </div>
                <Slider
                  value={[visualizationState.layerData.grid?.size || 20]}
                  min={10}
                  max={50}
                  step={5}
                  onValueChange={(value) => updateLayerOption('grid', 'size', value[0])}
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <Label className="text-xs">Opacity</Label>
                  <span className="text-xs text-white/60">
                    {visualizationState.layerData.grid?.opacity || 0.2}
                  </span>
                </div>
                <Slider
                  value={[visualizationState.layerData.grid?.opacity || 0.2]}
                  min={0.1}
                  max={1}
                  step={0.1}
                  onValueChange={(value) => updateLayerOption('grid', 'opacity', value[0])}
                />
              </div>
            </div>
          </LayerConfigSection>
        )}
        
        {/* Layer Configuration - Ambient Effects */}
        {visualizationState.layerData.ambientEffects?.active && (
          <LayerConfigSection title="Ambient Effects Options">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Scanlines</Label>
                <Switch 
                  checked={visualizationState.layerData.ambientEffects?.scanlines}
                  onCheckedChange={(checked) => updateLayerOption('ambientEffects', 'scanlines', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-xs">Noise Effect</Label>
                <Switch 
                  checked={visualizationState.layerData.ambientEffects?.noise}
                  onCheckedChange={(checked) => updateLayerOption('ambientEffects', 'noise', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-xs">Glow Effect</Label>
                <Switch 
                  checked={visualizationState.layerData.ambientEffects?.glow}
                  onCheckedChange={(checked) => updateLayerOption('ambientEffects', 'glow', checked)}
                />
              </div>
            </div>
          </LayerConfigSection>
        )}
        
        {/* Reset Button */}
        <div className="pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full bg-white/5 border-white/20 hover:bg-white/10 text-xs"
            onClick={() => updateVisualizationState({
              activeLayerIds: [],
              layerData: {
                heatmap: { active: false, data: [] },
                statusMarkers: { active: false, data: [] },
                hotspots: { 
                  active: false,
                  divisionHotspots: true,
                  workstationHotspots: true,
                  serverHotspots: true
                },
                performance: {
                  active: false,
                  showSparklines: true,
                  showEfficiency: true,
                  position: 'bottom-right'
                },
                quickActions: {
                  active: false,
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
            })}
          >
            Reset All Visualizations
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper component for layer config sections
const LayerConfigSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
      animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
      transition={{ duration: 0.2 }}
      className="border-t border-white/10 pt-3"
    >
      <h5 className="text-xs font-medium text-white/80 mb-3">{title}</h5>
      {children}
    </motion.div>
  );
};

export default VisualizationControls;
