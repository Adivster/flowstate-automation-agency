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
  zoomLevel = 1
}) => {
  const [adjustedAgentPositions, setAdjustedAgentPositions] = useState<Record<number, { x: number, y: number }>>({});
  
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
  
  const renderDivisions = () => (
    divisions.map((division) => (
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
      />
    ))
  );
  
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
      {renderDivisions()}
      {renderHolograms()}
      {renderAgents()}
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
