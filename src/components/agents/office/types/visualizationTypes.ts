
import { SparklineData } from '../MiniSparkline';
import { HeatMapData } from '../HeatMapOverlay';
import { StatusMarker } from '../StatusMarkersOverlay';
import { VisualizationLayer } from '../VisualizationControls';

export interface DivisionMetrics {
  performanceData: SparklineData;
  activityLevel: number;
  efficiency: number;
  utilization: number;
  alerts: number;
}

export interface AgentMetrics {
  performanceData: SparklineData;
  efficiency: number;
  tasks: number;
  status: 'normal' | 'warning' | 'critical';
  currentTask?: {
    type: 'reading' | 'analyzing' | 'experimenting' | 'emailing' | 'writing' | 'searching' | 'coding';
    description: string;
    startTime?: Date;
    expectedDuration?: number;
  };
}

export interface VisualizationLayerData {
  heatmap: {
    active: boolean;
    data: HeatMapData[];
    intensity?: number;
    blendMode?: 'screen' | 'overlay' | 'multiply';
  };
  statusMarkers: {
    active: boolean;
    data: StatusMarker[];
    style?: 'minimal' | 'detailed';
  };
  hotspots: {
    active: boolean;
    divisionHotspots: boolean;
    workstationHotspots: boolean;
    serverHotspots: boolean;
    glowIntensity?: number;
  };
  performance: {
    active: boolean;
    showSparklines: boolean;
    showEfficiency: boolean;
    chartStyle?: 'minimal' | 'detailed';
    position?: 'bottom-right' | 'top-right' | 'bottom-left' | 'top-left';
  };
  quickActions: {
    active: boolean;
    style?: 'icon' | 'text' | 'both';
    position?: 'bottom-right' | 'top-right' | 'bottom-left' | 'top-left';
  };
  grid?: {
    active: boolean;
    size?: number;
    color?: string;
    opacity?: number;
  };
  ambientEffects?: {
    active: boolean;
    scanlines?: boolean;
    noise?: boolean;
    glow?: boolean;
  };
  analytics: {
    active: boolean;
    position: 'bottom-left' | 'top-right' | 'bottom-right';
    showLabels: boolean;
    showTrends: boolean;
  };
}

export interface VisualizationState {
  activeLayerIds: string[];
  layers: VisualizationLayer[];
  layerData: VisualizationLayerData;
}

export interface VisualizationFilter {
  division?: string;
  status?: 'all' | 'normal' | 'warning' | 'critical';
  efficiency?: number;
  agentType?: string;
}
