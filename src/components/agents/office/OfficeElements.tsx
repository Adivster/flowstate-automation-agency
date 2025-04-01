
import React from 'react';
import Workstation from './Workstation';
import DecorativeElement from './DecorativeElement';
import HolographicElement from './HolographicElement';
import CentralServer from './CentralServer';
import CommunicationHub from './CommunicationHub';
import Division from './Division';
import AgentCharacter from '../AgentCharacter';

interface OfficeElementsProps {
  divisions: any[];
  workstations: any[];
  decorations: any[];
  holograms: any[];
  agents: any[];
  selectedDivision: string | null;
  selectedAgent: number | null;
  pulsing: Record<string, boolean>;
  onDivisionClick: (divisionId: string) => void;
  onAgentClick: (agentId: number) => void;
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
  onAgentClick
}) => {
  return (
    <>
      <CentralServer />
      <CommunicationHub />
      
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
      
      {decorations.map((item, index) => (
        <DecorativeElement
          key={`decor-${index}`}
          type={item.type}
          x={item.x}
          y={item.y}
          size={item.size}
        />
      ))}
      
      {holograms.map((item, index) => (
        <HolographicElement
          key={`holo-${index}`}
          type={item.type}
          x={item.x}
          y={item.y}
          size={item.size}
        />
      ))}
      
      {divisions.map((division) => (
        <Division
          key={division.id}
          division={division}
          isSelected={selectedDivision === division.id}
          isPulsing={pulsing[division.id]}
          onDivisionClick={onDivisionClick}
          agents={agents}
        />
      ))}
      
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
    </>
  );
};

export default OfficeElements;
