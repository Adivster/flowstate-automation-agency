
import React, { useState, useRef, useEffect } from 'react';
import OfficeElements from './office/OfficeElements';
import { useToast } from '@/hooks/use-toast';
import { Terminal, X, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VisualizationState } from './office/types/visualizationTypes';
import { Division, DecorativeElement, ZIndexLayers } from './office/types/officeTypes';
import { Book, Database, BarChart3, Cpu, User, Users, Bot, Laptop, BarChart, Shield, Activity } from 'lucide-react';
import { agents } from './office/data/agentsData';

const officeData = {
  divisions: [
    { id: 'kb', name: 'Knowledge Base', icon: Book, position: { x: 10, y: 20, width: 35, height: 30 }, borderColor: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.1)', textColor: '#10B981', zIndex: ZIndexLayers.DIVISION },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, position: { x: 55, y: 20, width: 35, height: 30 }, borderColor: '#3B82F6', backgroundColor: 'rgba(59, 130, 246, 0.1)', textColor: '#3B82F6', zIndex: ZIndexLayers.DIVISION },
    { id: 'operations', name: 'Operations', icon: Cpu, position: { x: 10, y: 60, width: 35, height: 30 }, borderColor: '#F97316', backgroundColor: 'rgba(249, 115, 22, 0.1)', textColor: '#F97316', zIndex: ZIndexLayers.DIVISION },
    { id: 'strategy', name: 'Strategy', icon: Database, position: { x: 55, y: 60, width: 35, height: 30 }, borderColor: '#8B5CF6', backgroundColor: 'rgba(139, 92, 246, 0.1)', textColor: '#8B5CF6', zIndex: ZIndexLayers.DIVISION },
  ] as Division[],
  agents: agents,
  decorations: [
    { type: 'plant', x: 5, y: 5, size: 2 },
    { type: 'plant', x: 90, y: 5, size: 1 },
    { type: 'plant', x: 5, y: 95, size: 3 },
    { type: 'plant', x: 90, y: 95, size: 2 },
  ] as DecorativeElement[],
  holograms: [
    { type: 'stats', x: 45, y: 10, size: 2 },
    { type: 'globe', x: 45, y: 90, size: 3 },
  ] as DecorativeElement[],
  workstations: [
    { x: 20, y: 30, width: 5, height: 3, rotation: 0, type: 'desk' },
    { x: 30, y: 30, width: 5, height: 3, rotation: 0, type: 'desk' },
    { x: 20, y: 35, width: 5, height: 3, rotation: 0, type: 'desk' },
    { x: 30, y: 35, width: 5, height: 3, rotation: 0, type: 'desk' },
    
    { x: 65, y: 30, width: 5, height: 3, rotation: 0, type: 'desk' },
    { x: 75, y: 30, width: 5, height: 3, rotation: 0, type: 'desk' },
    { x: 65, y: 35, width: 5, height: 3, rotation: 0, type: 'desk' },
    { x: 75, y: 35, width: 5, height: 3, rotation: 0, type: 'desk' },
    
    { x: 20, y: 70, width: 5, height: 3, rotation: 0, type: 'desk' },
    { x: 30, y: 70, width: 5, height: 3, rotation: 0, type: 'desk' },
    { x: 20, y: 75, width: 5, height: 3, rotation: 0, type: 'desk' },
    { x: 30, y: 75, width: 5, height: 3, rotation: 0, type: 'desk' },
    
    { x: 65, y: 70, width: 5, height: 3, rotation: 0, type: 'desk' },
    { x: 75, y: 70, width: 5, height: 3, rotation: 0, type: 'desk' },
    { x: 65, y: 75, width: 5, height: 3, rotation: 0, type: 'desk' },
    { x: 75, y: 75, width: 5, height: 3, rotation: 0, type: 'desk' },
  ]
};

interface OfficeFloorPlanProps {
  visualizationState?: VisualizationState;
  onHotspotAction?: (action: string, entityId: string, entityType: string) => void;
  onAgentClick?: (agentId: number) => void;
}

const OfficeFloorPlan: React.FC<OfficeFloorPlanProps> = ({ 
  visualizationState,
  onHotspotAction,
  onAgentClick
}) => {
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [showTerminal, setShowTerminal] = useState(false);
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'Office Control Terminal v1.0',
    'Type "help" for available commands.',
    '> '
  ]);
  const [divisionPulses, setDivisionPulses] = useState<Record<string, boolean>>({});
  const [editMode, setEditMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [divisionPositions, setDivisionPositions] = useState<Record<string, { x: number, y: number }>>({});
  const terminalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        setShowTerminal(prev => !prev);
      }
      
      if (e.key === 'Escape' && showTerminal) {
        setShowTerminal(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('openCommandTerminal', () => setShowTerminal(true));
    
    const pulseInterval = setInterval(() => {
      const randomDivision = officeData.divisions[Math.floor(Math.random() * officeData.divisions.length)];
      setDivisionPulses(prev => ({
        ...prev,
        [randomDivision.id]: true
      }));
      
      setTimeout(() => {
        setDivisionPulses(prev => ({
          ...prev,
          [randomDivision.id]: false
        }));
      }, 5000);
    }, 10000);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('openCommandTerminal', () => setShowTerminal(true));
      clearInterval(pulseInterval);
    };
  }, [showTerminal]);
  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);
  
  const handleDivisionClick = (divisionId: string) => {
    setSelectedDivision(prevId => prevId === divisionId ? null : divisionId);
    setSelectedAgent(null);
  };
  
  const handleAgentClick = (agentId: number) => {
    setSelectedAgent(prevId => prevId === agentId ? null : agentId);
    
    const agent = officeData.agents.find(a => a.id === agentId);
    if (agent) {
      setSelectedDivision(agent.division || null);
    }
    
    // Pass the click to the parent component
    if (onAgentClick) {
      onAgentClick(agentId);
    }
  };
  
  const handleCommandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  };
  
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!command.trim()) return;
    
    setCommandHistory(prev => [...prev, command]);
    const output = processCommand(command);
    setTerminalOutput(prev => [...prev, `${command}`, ...output, '> ']);
    setCommand('');
  };
  
  const processCommand = (cmd: string): string[] => {
    const args = cmd.trim().split(' ');
    const command = args[0].toLowerCase();
    
    switch(command) {
      case 'help':
        return [
          'Available commands:',
          '  help - Show this help message',
          '  select <division|agent> <id> - Select a division or agent',
          '  info <division|agent> <id> - Show information about a division or agent',
          '  agents - List all agents',
          '  divisions - List all divisions',
          '  edit <on|off> - Toggle edit mode',
          '  clear - Clear the terminal',
          '  exit - Close the terminal'
        ];
      
      case 'select':
        if (args.length < 3) return ['Error: Usage: select <division|agent> <id>'];
        
        if (args[1] === 'division') {
          const divisionId = args[2];
          const division = officeData.divisions.find(d => d.id === divisionId);
          if (!division) return [`Error: Division ${divisionId} not found`];
          
          setSelectedDivision(divisionId);
          return [`Selected division: ${division.name}`];
        }
        
        if (args[1] === 'agent') {
          const agentId = parseInt(args[2]);
          const agent = officeData.agents.find(a => a.id === agentId);
          if (!agent) return [`Error: Agent ${agentId} not found`];
          
          setSelectedAgent(agentId);
          return [`Selected agent: ${agent.name}`];
        }
        
        return ['Error: Invalid selection type. Use "division" or "agent"'];
      
      case 'info':
        if (args.length < 3) return ['Error: Usage: info <division|agent> <id>'];
        
        if (args[1] === 'division') {
          const divisionId = args[2];
          const division = officeData.divisions.find(d => d.id === divisionId);
          if (!division) return [`Error: Division ${divisionId} not found`];
          
          const agentsInDivision = officeData.agents.filter(a => a.division === divisionId);
          return [
            `Division information:`,
            `- ID: ${division.id}`,
            `- Name: ${division.name}`,
            `- Position: x=${division.position.x}, y=${division.position.y}`,
            `- Size: width=${division.position.width}, height=${division.position.height}`,
            `- Agents: ${agentsInDivision.length}`
          ];
        }
        
        if (args[1] === 'agent') {
          const agentId = parseInt(args[2]);
          const agent = officeData.agents.find(a => a.id === agentId);
          if (!agent) return [`Error: Agent ${agentId} not found`];
          
          return [
            `Agent information:`,
            `- ID: ${agent.id}`,
            `- Name: ${agent.name}`,
            `- Status: ${agent.status}`,
            `- Position: x=${agent.position.x}, y=${agent.position.y}`,
            `- Division: ${agent.division || 'None'}`
          ];
        }
        
        return ['Error: Invalid info type. Use "division" or "agent"'];
      
      case 'agents':
        return [
          'List of agents:',
          ...officeData.agents.map(a => `- ID: ${a.id}, Name: ${a.name}, Status: ${a.status}, Division: ${a.division || 'None'}`)
        ];
      
      case 'divisions':
        return [
          'List of divisions:',
          ...officeData.divisions.map(d => `- ID: ${d.id}, Name: ${d.name}`)
        ];
      
      case 'edit':
        if (args.length < 2) return ['Error: Usage: edit <on|off>'];
        
        if (args[1] === 'on') {
          setEditMode(true);
          return ['Edit mode enabled. You can now drag divisions.'];
        }
        
        if (args[1] === 'off') {
          setEditMode(false);
          return ['Edit mode disabled.'];
        }
        
        return ['Error: Invalid edit mode. Use "on" or "off"'];
      
      case 'clear':
        setTimeout(() => {
          setTerminalOutput([
            'Office Control Terminal v1.0',
            'Type "help" for available commands.',
            '> '
          ]);
        }, 0);
        return [];
      
      case 'exit':
        setShowTerminal(false);
        return [];
      
      default:
        return [`Error: Unknown command "${command}". Type "help" for available commands.`];
    }
  };
  
  const handleDivisionDragEnd = (divisionId: string, x: number, y: number) => {
    setDivisionPositions(prev => ({
      ...prev,
      [divisionId]: { x, y }
    }));
    
    toast({
      title: "Division Moved",
      description: `Division ${divisionId} has been moved to x=${x.toFixed(1)}%, y=${y.toFixed(1)}%`,
      duration: 3000,
    });
  };
  
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };
  
  return (
    <div className="relative h-full w-full bg-black bg-opacity-50 rounded-xl overflow-hidden office-container" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}>
      <OfficeElements
        divisions={officeData.divisions}
        agents={officeData.agents}
        decorations={officeData.decorations}
        holograms={officeData.holograms}
        workstations={officeData.workstations}
        selectedDivision={selectedDivision}
        selectedAgent={selectedAgent}
        pulsing={divisionPulses}
        onDivisionClick={handleDivisionClick}
        onAgentClick={handleAgentClick}
        editMode={editMode}
        onDivisionDragEnd={handleDivisionDragEnd}
        divisionPositions={divisionPositions}
        zoomLevel={zoomLevel}
        visualizationState={visualizationState}
        onHotspotAction={onHotspotAction}
      />
      
      {showTerminal && (
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setShowTerminal(false)}>
          <div className="bg-black bg-opacity-90 border border-gray-700 rounded-lg w-full max-w-2xl max-h-[80vh] shadow-lg" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
              <div className="flex items-center">
                <Terminal className="w-4 h-4 mr-2 text-green-500" />
                <span className="text-sm text-green-500 font-mono">Office Control Terminal</span>
              </div>
              <button className="text-gray-500 hover:text-white" onClick={() => setShowTerminal(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <div 
              ref={terminalRef}
              className="p-4 h-80 overflow-y-auto font-mono text-sm text-green-500 bg-black custom-scrollbar"
            >
              {terminalOutput.map((line, index) => (
                <div key={index} className={line.startsWith('>') ? 'text-blue-500' : ''}>
                  {line}
                </div>
              ))}
            </div>
            <form onSubmit={handleCommandSubmit} className="px-4 py-2 border-t border-gray-700 flex">
              <span className="text-blue-500 mr-2 font-mono">{'>'}</span>
              <input 
                type="text" 
                value={command}
                onChange={handleCommandChange}
                className="bg-transparent flex-1 outline-none text-green-500 font-mono text-sm"
                autoFocus
              />
            </form>
          </div>
        </div>
      )}
      
      <div className="absolute bottom-2 right-2 flex gap-2 z-30">
        <Button variant="outline" size="sm" className="h-7 w-7 p-0 bg-black/50 border-white/20 text-white hover:bg-black/70" onClick={handleZoomIn}>
          <ZoomIn className="h-3 w-3" />
        </Button>
        <Button variant="outline" size="sm" className="h-7 w-7 p-0 bg-black/50 border-white/20 text-white hover:bg-black/70" onClick={handleZoomOut}>
          <ZoomOut className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default OfficeFloorPlan;
