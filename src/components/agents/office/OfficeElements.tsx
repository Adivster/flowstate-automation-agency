
import React, { useEffect, useState } from 'react';
import Workstation from './Workstation';
import DecorativeElement from './DecorativeElement';
import HolographicElement from './HolographicElement';
import CentralServer from './CentralServer';
import CommunicationHub from './CommunicationHub';
import Division from './Division';
import AgentCharacter from '../AgentCharacter';
import { Division as DivisionType, DecorativeElement as DecorativeElementType, ZIndexLayers } from './types/officeTypes';
import { motion, AnimatePresence } from 'framer-motion';
import { getDivisionColors } from './styles/divisionStyles';
import InteractiveHotspot from './InteractiveHotspot';
import HeatMapOverlay from './HeatMapOverlay';
import StatusMarkersOverlay from './StatusMarkersOverlay';
import { StatusMarker } from './StatusMarkersOverlay';
import { HeatMapData } from './HeatMapOverlay';
import { VisualizationState } from './types/visualizationTypes';
import { useToast } from '@/hooks/use-toast';

interface OfficeElementsProps {
  divisions: DivisionType[];
  workstations: any[];
  decorations: DecorativeElementType[];
  holograms: DecorativeElementType[];
  agents: any[];
  selectedDivision: string | null;
  selectedAgent: number | null;
  pulsing: Record<string, boolean>;
  onDivisionClick: (divisionId: string) => void;
  onAgentClick: (agentId: number) => void;
  editMode: boolean;
  onDivisionDragEnd?: (divisionId: string, x: number, y: number) => void;
  divisionPositions?: Record<string, {x: number, y: number}>;
  zoomLevel?: number;
  visualizationState?: VisualizationState;
  onHotspotAction?: (action: string, entityId: string, entityType: string) => void;
}

const OfficeElements: React.FC<OfficeElementsProps> = ({
  divisions,
  workstations,
  decorations,
  holograms,
  agents,
  selectedDivision,
  selectedAgent,
  pulsing,
  onDivisionClick,
  onAgentClick,
  editMode = false,
  onDivisionDragEnd,
  divisionPositions,
  zoomLevel = 1,
  visualizationState,
  onHotspotAction
}) => {
  const [adjustedAgentPositions, setAdjustedAgentPositions] = useState<Record<number, { x: number, y: number }>>({});
  const [divisionColorMap, setDivisionColorMap] = useState<Record<string, any>>({});
  const [divisionMetrics, setDivisionMetrics] = useState<Record<string, { performance: number[], activity: number }>>({});
  const [heatmapData, setHeatmapData] = useState<HeatMapData[]>([]);
  const [statusMarkers, setStatusMarkers] = useState<StatusMarker[]>([]);
  const { toast } = useToast();
  
  // Generate division color map
  useEffect(() => {
    const colorMap: Record<string, any> = {};
    divisions.forEach(division => {
      colorMap[division.id] = getDivisionColors(division.id);
    });
    setDivisionColorMap(colorMap);
  }, [divisions]);
  
  // Generate mock metrics for divisions
  useEffect(() => {
    const metrics: Record<string, { performance: number[], activity: number }> = {};
    divisions.forEach(division => {
      // Generate random performance data (7 data points)
      const performance = Array.from({ length: 7 }, () => Math.floor(Math.random() * 40) + 60); // 60-100 range
      
      // Random activity level (0-100)
      const activity = Math.floor(Math.random() * 100);
      
      metrics[division.id] = { performance, activity };
    });
    setDivisionMetrics(metrics);
  }, [divisions]);
  
  // Generate heatmap and status markers based on visualization state
  useEffect(() => {
    if (!visualizationState) return;
    
    // Generate heatmap data
    if (visualizationState.layerData.heatmap.active) {
      const heatmap: HeatMapData[] = [];
      
      // Add a point for each division based on activity
      divisions.forEach(division => {
        const divPos = divisionPositions?.[division.id] || division.position;
        const divMetrics = divisionMetrics[division.id];
        
        if (divMetrics) {
          // Center position of division
          const x = divPos.x + (division.position.width / 2);
          const y = divPos.y + (division.position.height / 2);
          
          heatmap.push({
            x,
            y,
            intensity: divMetrics.activity,
            radius: 8 + (divMetrics.activity / 25) // Size based on activity level
          });
        }
      });
      
      // Add random hotspots for agents
      agents.forEach(agent => {
        if (Math.random() > 0.7) {
          const pos = adjustedAgentPositions[agent.id] || agent.position;
          
          heatmap.push({
            x: pos.x,
            y: pos.y,
            intensity: Math.random() * 50 + 50, // 50-100 range
            radius: 3 + Math.random() * 2
          });
        }
      });
      
      setHeatmapData(heatmap);
    } else {
      setHeatmapData([]);
    }
    
    // Generate status markers
    if (visualizationState.layerData.statusMarkers.active) {
      const markers: StatusMarker[] = [];
      
      // Add status markers for divisions with issues
      divisions.forEach(division => {
        const divPos = divisionPositions?.[division.id] || division.position;
        const divMetrics = divisionMetrics[division.id];
        
        if (divMetrics && divMetrics.activity > 70) {
          const x = divPos.x + (division.position.width * 0.75);
          const y = divPos.y + (division.position.height * 0.25);
          
          markers.push({
            id: `division-${division.id}`,
            type: divMetrics.activity > 90 ? 'error' : 'warning',
            x,
            y,
            message: divMetrics.activity > 90 
              ? 'Critical load detected' 
              : 'High activity level',
            value: `${divMetrics.activity}%`,
            entityId: division.id,
            entityType: 'division'
          });
        }
      });
      
      // Add status markers for agents
      agents.forEach(agent => {
        if (agent.status === 'error' || agent.status === 'paused') {
          const pos = adjustedAgentPositions[agent.id] || agent.position;
          
          markers.push({
            id: `agent-${agent.id}`,
            type: agent.status === 'error' ? 'error' : 'warning',
            x: pos.x,
            y: pos.y - 1.5, // Slightly above the agent
            message: agent.status === 'error' 
              ? 'Agent error detected' 
              : 'Agent paused',
            entityId: agent.id.toString(),
            entityType: 'agent'
          });
        }
      });
      
      // Add a few informational status markers
      if (markers.length < 3) {
        markers.push({
          id: 'system-info',
          type: 'info',
          x: 50,
          y: 35,
          message: 'System operating normally',
          entityType: 'system'
        });
      }
      
      setStatusMarkers(markers);
    } else {
      setStatusMarkers([]);
    }
  }, [divisions, agents, divisionMetrics, adjustedAgentPositions, visualizationState, divisionPositions]);
  
  useEffect(() => {
    const newPositions: Record<number, { x: number, y: number }> = {};
    
    agents.forEach(agent => {
      if (agent.division) {
        const division = divisions.find(d => d.id === agent.division);
        if (division) {
          const divPos = divisionPositions?.[division.id] || { 
            x: division.position.x, 
            y: division.position.y 
          };
          
          const relativeX = agent.position.x - division.position.x;
          const relativeY = agent.position.y - division.position.y;
          
          newPositions[agent.id] = {
            x: divPos.x + relativeX,
            y: divPos.y + relativeY
          };
        } else {
          newPositions[agent.id] = agent.position;
        }
      } else {
        newPositions[agent.id] = agent.position;
      }
    });
    
    setAdjustedAgentPositions(newPositions);
  }, [agents, divisions, divisionPositions]);
  
  const handleHotspotAction = (action: string, entityId: string) => {
    // Find if it's a division, agent, or other entity
    const division = divisions.find(d => d.id === entityId);
    const agent = agents.find(a => a.id.toString() === entityId);
    
    let entityType = 'unknown';
    
    if (division) {
      entityType = 'division';
    } else if (agent) {
      entityType = 'agent';
    } else if (entityId.startsWith('ws-')) {
      entityType = 'workstation';
    } else if (entityId === 'server') {
      entityType = 'server';
    }
    
    if (onHotspotAction) {
      onHotspotAction(action, entityId, entityType);
    } else {
      toast({
        title: `Action: ${action}`,
        description: `${action} action on ${entityType} ${entityId}`,
        duration: 3000,
      });
    }
  };
  
  const handleStatusMarkerClick = (marker: StatusMarker) => {
    if (marker.entityType === 'agent' && marker.entityId) {
      const agentId = parseInt(marker.entityId);
      onAgentClick(agentId);
    } else if (marker.entityType === 'division' && marker.entityId) {
      onDivisionClick(marker.entityId);
    } else {
      toast({
        title: marker.type.charAt(0).toUpperCase() + marker.type.slice(1),
        description: marker.message,
        duration: 3000,
      });
    }
  };
  
  const handleDivisionQuickAction = (divisionId: string, action: string) => {
    if (action === 'add-agent') {
      toast({
        title: "Add Agent",
        description: `Adding new agent to ${divisionId} division`,
        duration: 3000,
      });
    } else if (action === 'optimize') {
      toast({
        title: "Optimize Division",
        description: `Optimizing ${divisionId} division for maximum efficiency`,
        duration: 3000,
      });
    } else if (action === 'analyze') {
      toast({
        title: "Analyze Division",
        description: `Generating performance report for ${divisionId} division`,
        duration: 3000,
      });
    }
  };
  
  const renderDivisions = () => (
    divisions.map((division) => {
      const metrics = divisionMetrics[division.id];
      const showQuickActions = visualizationState?.layerData.quickActions.active;
      const showPerformance = visualizationState?.layerData.performance.active;
      
      return (
        <Division
          key={division.id}
          division={division}
          isSelected={selectedDivision === division.id}
          isPulsing={pulsing[division.id]}
          onDivisionClick={onDivisionClick}
          agents={agents}
          isDraggable={editMode}
          onDragEnd={onDivisionDragEnd}
          customPosition={divisionPositions?.[division.id]}
          performanceData={showPerformance ? metrics?.performance : undefined}
          activityLevel={metrics?.activity}
          showQuickActions={showQuickActions}
          onQuickAction={handleDivisionQuickAction}
        />
      )
    })
  );
  
  const renderHotspots = () => {
    if (!visualizationState?.layerData.hotspots.active) return null;
    
    const hotspots = [];
    
    // Add division hotspots
    if (visualizationState.layerData.hotspots.divisionHotspots) {
      divisions.forEach((division) => {
        const divPos = divisionPositions?.[division.id] || division.position;
        const metrics = divisionMetrics[division.id];
        
        hotspots.push(
          <InteractiveHotspot
            key={`hotspot-div-${division.id}`}
            x={divPos.x + division.position.width * 0.5}
            y={divPos.y + division.position.height * 0.5}
            type="division"
            id={division.id}
            name={division.name}
            metrics={{
              efficiency: metrics?.performance?.[6], // Last data point
              load: metrics?.activity,
              status: metrics?.activity > 80 ? 'critical' : metrics?.activity > 50 ? 'warning' : 'normal'
            }}
            onAction={handleHotspotAction}
          />
        );
      });
    }
    
    // Add server hotspot
    if (visualizationState.layerData.hotspots.serverHotspots) {
      hotspots.push(
        <InteractiveHotspot
          key="hotspot-server"
          x={48}
          y={48}
          type="server"
          id="server"
          name="Central Server"
          metrics={{
            efficiency: 95,
            load: 42,
            status: 'normal',
            trend: 'stable'
          }}
          onAction={handleHotspotAction}
        />
      );
    }
    
    // Add workstation hotspots
    if (visualizationState.layerData.hotspots.workstationHotspots) {
      workstations.forEach((station, index) => {
        // Only add hotspots to some workstations
        if (index % 3 === 0) {
          hotspots.push(
            <InteractiveHotspot
              key={`hotspot-ws-${index}`}
              x={station.x}
              y={station.y}
              type="workstation"
              id={`ws-${index}`}
              name={`Workstation ${index + 1}`}
              metrics={{
                efficiency: Math.floor(Math.random() * 30) + 70,
                status: Math.random() > 0.8 ? 'warning' : 'normal'
              }}
              onAction={handleHotspotAction}
            />
          );
        }
      });
    }
    
    return hotspots;
  };
  
  const renderInfrastructure = () => (
    <>
      <CentralServer />
      <CommunicationHub />
    </>
  );
  
  const renderWorkstations = () => (
    workstations.map((station, index) => (
      <Workstation
        key={`station-${index}`}
        x={station.x}
        y={station.y}
        width={station.width}
        height={station.height}
        rotation={station.rotation || 0}
        type={station.type}
      />
    ))
  );
  
  const renderDecorations = () => (
    decorations.map((item, index) => (
      <DecorativeElement
        key={`decor-${index}`}
        type={item.type}
        x={item.x}
        y={item.y}
        size={item.size}
      />
    ))
  );
  
  const renderHolograms = () => (
    holograms.map((item, index) => (
      <HolographicElement
        key={`holo-${index}`}
        type={item.type}
        x={item.x}
        y={item.y}
        size={item.size}
      />
    ))
  );
  
  const renderAgents = () => (
    agents.map(agent => {
      const position = adjustedAgentPositions[agent.id] || agent.position;
      const divisionColor = agent.division ? divisionColorMap[agent.division] : undefined;
      
      return (
        <AgentCharacter 
          key={`agent-${agent.id}`}
          agent={{
            ...agent,
            position,
            status: agent.status as 'working' | 'idle' | 'paused' | 'error'
          }}
          routePath={agent.route}
          isSelected={selectedAgent === agent.id}
          onAgentClick={onAgentClick}
          style={{ zIndex: selectedAgent === agent.id ? ZIndexLayers.AGENT_SELECTED : ZIndexLayers.AGENT }}
          divisionColor={divisionColor}
        />
      );
    })
  );
  
  const renderGrid = () => (
    <div 
      className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${editMode ? 'opacity-20' : 'opacity-0'}`}
      style={{
        backgroundSize: `${20 * zoomLevel}px ${20 * zoomLevel}px`,
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.1) 1px, transparent 1px)',
        zIndex: ZIndexLayers.GRID
      }}
    ></div>
  );
  
  const renderEditModeIndicator = () => (
    <AnimatePresence>
      {editMode && (
        <motion.div 
          className="absolute top-4 left-4 px-3 py-1 bg-amber-500/80 text-white text-xs font-medium rounded-full flex items-center gap-1.5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{ zIndex: ZIndexLayers.UI_CONTROLS }}
        >
          <span className="h-2 w-2 bg-white rounded-full animate-pulse"></span>
          Edit Mode
        </motion.div>
      )}
    </AnimatePresence>
  );
  
  const renderPulseEffects = () => (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: ZIndexLayers.DIVISION - 1 }}>
      {divisions.map((division) => (
        pulsing[division.id] && !selectedDivision && (
          <motion.div 
            key={`pulse-${division.id}`}
            className="absolute rounded-xl opacity-0"
            style={{
              left: `${(divisionPositions?.[division.id]?.x || division.position.x) - 1}%`,
              top: `${(divisionPositions?.[division.id]?.y || division.position.y) - 1}%`,
              width: `${division.position.width + 2}%`,
              height: `${division.position.height + 2}%`,
              boxShadow: `0 0 30px ${division.borderColor || '#ffffff'}50`,
            }}
            animate={{
              opacity: [0, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        )
      ))}
    </div>
  );
  
  const renderAmbientLighting = () => (
    <div className="absolute inset-0 pointer-events-none" style={{ 
      background: 'radial-gradient(circle at 50% 50%, rgba(20, 30, 50, 0) 0%, rgba(5, 10, 20, 0.4) 100%)',
      zIndex: ZIndexLayers.BACKGROUND 
    }}></div>
  );
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {renderGrid()}
      {renderInfrastructure()}
      {renderWorkstations()}
      {renderDecorations()}
      {visualizationState?.layerData.heatmap.active && (
        <HeatMapOverlay 
          data={heatmapData}
          colorStart="rgba(0, 255, 128, 0.3)"
          colorEnd="rgba(255, 50, 50, 0.5)"
          visible={true}
        />
      )}
      {renderDivisions()}
      {renderHolograms()}
      {renderAgents()}
      {renderHotspots()}
      {visualizationState?.layerData.statusMarkers.active && (
        <StatusMarkersOverlay 
          markers={statusMarkers}
          onClick={handleStatusMarkerClick}
        />
      )}
      {renderEditModeIndicator()}
      {renderPulseEffects()}
      {renderAmbientLighting()}
      
      <style>
        {`
        .scan-lines {
          background-image: linear-gradient(
            transparent 0%,
            rgba(32, 128, 255, 0.02) 2%,
            rgba(32, 128, 255, 0.02) 3%,
            transparent 3%,
            transparent 100%
          );
          background-size: 100% 4px;
          width: 100%;
          height: 100%;
          animation: scan-moving 4s linear infinite;
        }
        
        @keyframes scan-moving {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
      `}
      </style>
    </div>
  );
};

export default OfficeElements;
