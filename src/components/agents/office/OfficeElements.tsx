
import React from 'react';
import Workstation from './Workstation';
import DecorativeElement from './DecorativeElement';
import HolographicElement from './HolographicElement';
import CentralServer from './CentralServer';
import CommunicationHub from './CommunicationHub';
import Division from './Division';
import AgentCharacter from '../AgentCharacter';
import { Division as DivisionType, DecorativeElement as DecorativeElementType } from './types/officeTypes';

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
  divisionPositions
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Render divisions first (lowest z-index) */}
      {divisions.map((division) => (
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
      ))}
      
      {/* Render server and communication hub */}
      <CentralServer />
      <CommunicationHub />
      
      {/* Render workstations above divisions */}
      {workstations.map((station, index) => (
        <Workstation
          key={`station-${index}`}
          x={station.x}
          y={station.y}
          width={station.width}
          height={station.height}
          rotation={station.rotation || 0}
          type={station.type}
        />
      ))}
      
      {/* Render decorative elements above workstations */}
      {decorations.map((item, index) => (
        <DecorativeElement
          key={`decor-${index}`}
          type={item.type}
          x={item.x}
          y={item.y}
          size={item.size}
        />
      ))}
      
      {/* Render holographic elements */}
      {holograms.map((item, index) => (
        <HolographicElement
          key={`holo-${index}`}
          type={item.type}
          x={item.x}
          y={item.y}
          size={item.size}
        />
      ))}
      
      {/* Render agents on top of everything */}
      {agents.map(agent => (
        <AgentCharacter 
          key={agent.id} 
          agent={{
            ...agent,
            status: agent.status as 'working' | 'idle' | 'paused' | 'error'
          }}
          routePath={agent.route}
          isSelected={selectedAgent === agent.id}
          onAgentClick={onAgentClick}
        />
      ))}
      
      {/* Edit mode indicator */}
      {editMode && (
        <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500/80 text-white text-xs font-medium rounded-full flex items-center gap-1.5 animate-pulse-subtle">
          <span className="h-2 w-2 bg-white rounded-full"></span>
          Edit Mode
        </div>
      )}
    </div>
  );
};

export default OfficeElements;
