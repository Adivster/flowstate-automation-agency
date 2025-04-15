
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
}

export interface VisualizationLayerData {
  heatmap: {
    active: boolean;
    data: HeatMapData[];
  };
  statusMarkers: {
    active: boolean;
    data: StatusMarker[];
  };
  hotspots: {
    active: boolean;
    divisionHotspots: boolean;
    workstationHotspots: boolean;
    serverHotspots: boolean;
  };
  performance: {
    active: boolean;
    showSparklines: boolean;
    showEfficiency: boolean;
  };
  quickActions: {
    active: boolean;
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
