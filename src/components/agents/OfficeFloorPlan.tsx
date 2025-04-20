import React, { useState, useRef, useEffect } from 'react';
import OfficeElements from './office/OfficeElements';
import { useToast } from '@/hooks/use-toast';
import { 
  Terminal, X, Building2, PlusCircle, Clock, Settings, Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VisualizationState } from './office/types/visualizationTypes';
import { Division, DecorativeElement, ZIndexLayers } from './office/types/officeTypes';
import { Book, Database, BarChart3, Cpu } from 'lucide-react';
import TaskWorkflowPanel from './office/TaskWorkflowPanel';
import NewDivisionModal from './office/division-modal/NewDivisionModal';
import { AnimatePresence } from 'framer-motion';
import { useTaskContext } from '@/contexts/TaskContext';
import { OfficeControls } from './office/layout/OfficeControls';
import { CommandCenter } from './office/layout/CommandCenter';
import { EnhancedBackground } from './office/layout/EnhancedBackground';
import { PerformanceMetricsOverlay } from './office/metrics/PerformanceMetricsOverlay';
import { FloorPlanFilters, FilterOptions } from './office/filters/FloorPlanFilters';
import { ContextualActionPanel } from './office/actions/ContextualActionPanel';
import UnifiedControls from './office/controls/UnifiedControls';
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
  const { tasks } = useTaskContext();
  const [divisions, setDivisions] = useState<Division[]>(officeData.divisions);
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<{id: string | number | null, type: 'division' | 'agent' | 'workstation' | 'server' | 'none', name: string, status?: 'working' | 'idle' | 'paused' | 'error'}>({
    id: null,
    type: 'none',
    name: '',
  });
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
  const [showTaskPanel, setShowTaskPanel] = useState(false);
  const [showNewDivisionModal, setShowNewDivisionModal] = useState(false);
  const [showVisualizationControls, setShowVisualizationControls] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [showContextActions, setShowContextActions] = useState(false);
  const [commandCenterVisible, setCommandCenterVisible] = useState(true);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    divisions: [],
    statuses: ['working', 'idle', 'paused', 'error'],
    efficiency: [0, 100],
    workload: [0, 100],
    tasks: []
  });
  const [controlsCollapsed, setControlsCollapsed] = useState(true);
  const [activeControlTab, setActiveControlTab] = useState('visualizations');
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const [performanceData, setPerformanceData] = useState({
    cpu: Math.floor(Math.random() * 60) + 20,
    memory: Math.floor(Math.random() * 60) + 30,
    network: Math.floor(Math.random() * 80) + 10,
    agentsActive: officeData.agents.filter(a => a.status === 'working').length,
    totalAgents: officeData.agents.length,
    systemLoad: Array.from({ length: 20 }, () => Math.floor(Math.random() * 60) + 20),
    alerts: Math.floor(Math.random() * 3),
    status: (Math.random() > 0.8 ? 'warning' : 'healthy') as 'healthy' | 'warning' | 'critical',
    uptime: 99.8,
    efficiency: 87,
    responseTime: 324,
    throughput: [220, 230, 210, 250, 270, 240, 256],
    errorRate: 0.8
  });

  const [visualizationSettings, setVisualizationSettings] = useState({
    showHeatmap: false,
    showStatusMarkers: true,
    showHotspots: true,
    showPerformanceMetrics: true,
    showSparklines: true,
    showQuickActions: true
  });
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        setShowTerminal(prev => !prev);
      }
      
      if (e.key === 'Escape') {
        if (showTerminal) {
          setShowTerminal(false);
        } else if (showTaskPanel) {
          setShowTaskPanel(false);
        } else if (selectedDivision) {
          setSelectedDivision(null);
          setSelectedEntity({ id: null, type: 'none', name: '' });
          setShowContextActions(false);
        } else if (selectedAgent) {
          setSelectedAgent(null);
          setSelectedEntity({ id: null, type: 'none', name: '' });
          setShowContextActions(false);
        } else if (showVisualizationControls) {
          setShowVisualizationControls(false);
        } else if (showFilters) {
          setShowFilters(false);
        } else if (showMetrics) {
          setShowMetrics(false);
        }
      }
      
      if (e.key === 'c' && e.altKey) {
        setCommandCenterVisible(prev => !prev);
      }
      
      if (e.key === 'v' && e.altKey) {
        setShowVisualizationControls(prev => !prev);
      }
      
      if (e.key === 'f' && e.altKey) {
        setShowFilters(prev => !prev);
      }
      
      if (e.key === 'm' && e.altKey) {
        setShowMetrics(prev => !prev);
      }

      if (e.key === 'l' && e.altKey) {
        setControlsCollapsed(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('openCommandTerminal', () => setShowTerminal(true));
    
    const pulseInterval = setInterval(() => {
      const randomDivision = divisions[Math.floor(Math.random() * divisions.length)];
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
    
    const perfDataInterval = setInterval(() => {
      setPerformanceData(prev => {
        const newSystemLoad = [...prev.systemLoad.slice(1), Math.floor(Math.random() * 60) + 20];
        const newThroughput = [...(prev.throughput || []).slice(1), 
          Math.max(200, Math.min(300, (prev.throughput ? prev.throughput[prev.throughput.length-1] : 256) + 
            (Math.random() * 20) - 10))];
            
        return {
          ...prev,
          cpu: Math.min(100, Math.max(10, prev.cpu + (Math.random() * 10) - 5)),
          memory: Math.min(100, Math.max(20, prev.memory + (Math.random() * 6) - 3)),
          systemLoad: newSystemLoad,
          throughput: newThroughput,
          alerts: Math.random() > 0.9 ? prev.alerts + 1 : Math.max(0, prev.alerts - (Math.random() > 0.7 ? 1 : 0)),
          status: prev.alerts > 3 ? 'critical' : prev.alerts > 0 ? 'warning' : 'healthy'
        };
      });
    }, 5000);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('openCommandTerminal', () => setShowTerminal(true));
      clearInterval(pulseInterval);
      clearInterval(perfDataInterval);
    };
  }, [showTerminal, showTaskPanel, selectedDivision, selectedAgent, divisions, showVisualizationControls, showFilters, showMetrics]);
  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);
  
  const handleDivisionClick = (divisionId: string) => {
    const division = divisions.find(d => d.id === divisionId);
    if (!division) return;
    
    const previouslySelectedDivision = selectedDivision;
    setSelectedDivision(prevId => prevId === divisionId ? null : divisionId);
    setSelectedAgent(null);
    
    if (previouslySelectedDivision !== divisionId) {
      setSelectedEntity({
        id: divisionId,
        type: 'division',
        name: division.name
      });
      setShowContextActions(true);
    } else {
      setSelectedEntity({ id: null, type: 'none', name: '' });
      setShowContextActions(false);
    }
  };
  
  const handleAgentClick = (agentId: number) => {
    const agent = officeData.agents.find(a => a.id === agentId);
    if (!agent) return;
    
    const previouslySelectedAgent = selectedAgent;
    setSelectedAgent(prevId => prevId === agentId ? null : agentId);
    
    if (agent) {
      setSelectedDivision(agent.division || null);
      
      if (previouslySelectedAgent !== agentId) {
        setSelectedEntity({
          id: agentId,
          type: 'agent',
          name: agent.name,
          status: agent.status
        });
        setShowContextActions(true);
      } else {
        setSelectedEntity({ id: null, type: 'none', name: '' });
        setShowContextActions(false);
      }
    }
    
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
          '  tasks - Show tasks for the current division',
          '  workflows - Show workflows for the current division',
          '  create division - Create a new division',
          '  edit <on|off> - Toggle edit mode',
          '  metrics <show|hide> - Toggle performance metrics',
          '  filters <show|hide> - Toggle filters panel',
          '  clear - Clear the terminal',
          '  exit - Close the terminal'
        ];
      
      case 'select':
        if (args.length < 3) return ['Error: Usage: select <division|agent> <id>'];
        
        if (args[1] === 'division') {
          const divisionId = args[2];
          const division = divisions.find(d => d.id === divisionId);
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
          const division = divisions.find(d => d.id === divisionId);
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
          ...divisions.map(d => `- ID: ${d.id}, Name: ${d.name}`)
        ];
      
      case 'create':
        if (args.length < 2 || args[1] !== 'division') 
          return ['Error: Usage: create division'];
        
        setShowNewDivisionModal(true);
        return ['Opening new division creation interface...'];

      case 'tasks':
        setShowTaskPanel(true);
        return ['Opening tasks panel...'];

      case 'workflows':
        setShowTaskPanel(true);
        return ['Opening workflows panel...'];
      
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

      case 'metrics':
        if (args.length < 2) return ['Error: Usage: metrics <show|hide>'];
        
        if (args[1] === 'show') {
          setShowMetrics(true);
          return ['Performance metrics displayed.'];
        }
        
        if (args[1] === 'hide') {
          setShowMetrics(false);
          return ['Performance metrics hidden.'];
        }
        
        return ['Error: Invalid option. Use "show" or "hide"'];
        
      case 'filters':
        if (args.length < 2) return ['Error: Usage: filters <show|hide>'];
        
        if (args[1] === 'show') {
          setShowFilters(true);
          return ['Filters panel displayed.'];
        }
        
        if (args[1] === 'hide') {
          setShowFilters(false);
          return ['Filters panel hidden.'];
        }
        
        return ['Error: Invalid option. Use "show" or "hide"'];
      
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

  const handleCreateDivision = (newDivision: any) => {
    let borderColor = '#8B5CF6';
    let backgroundColor = 'rgba(139, 92, 246, 0.1)';
    let textColor = '#8B5CF6';
    
    switch (newDivision.color) {
      case 'blue':
        borderColor = '#3B82F6';
        backgroundColor = 'rgba(59, 130, 246, 0.1)';
        textColor = '#3B82F6';
        break;
      case 'green':
        borderColor = '#22C55E';
        backgroundColor = 'rgba(34, 197, 94, 0.1)';
        textColor = '#22C55E';
        break;
      case 'emerald':
        borderColor = '#10B981';
        backgroundColor = 'rgba(16, 185, 129, 0.1)';
        textColor = '#10B981';
        break;
      case 'amber':
        borderColor = '#F59E0B';
        backgroundColor = 'rgba(245, 158, 11, 0.1)';
        textColor = '#F59E0B';
        break;
      case 'red':
        borderColor = '#EF4444';
        backgroundColor = 'rgba(239, 68, 68, 0.1)';
        textColor = '#EF4444';
        break;
    }
    
    const divisionToAdd: Division = {
      id: newDivision.id,
      name: newDivision.name,
      icon: require('lucide-react')[newDivision.icon],
      position: newDivision.position,
      backgroundColor,
      borderColor,
      textColor,
      zIndex: ZIndexLayers.DIVISION
    };
    
    setDivisions([...divisions, divisionToAdd]);
  };

  const handleCloseTaskPanel = () => {
    setShowTaskPanel(false);
  };

  const handleToggleVisualizationControls = () => {
    setShowVisualizationControls(prev => !prev);
    
    if (!showVisualizationControls) {
      setShowFilters(false);
      setShowMetrics(false);
    }
  };
  
  const handleToggleFilters = () => {
    setShowFilters(prev => !prev);
    
    if (!showFilters) {
      setShowVisualizationControls(false);
      setShowMetrics(false);
    }
  };
  
  const handleToggleMetrics = () => {
    setShowMetrics(prev => !prev);
    
    if (!showMetrics) {
      setShowVisualizationControls(false);
      setShowFilters(false);
    }
  };
  
  const handleContextualAction = (action: string, entityId: string | number, entityType: string) => {
    toast({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)}`,
      description: `Performed "${action}" on ${entityType} ${entityId}`,
      duration: 3000,
    });
    
    if (action === 'chat' && entityType === 'agent') {
      toast({
        title: `Chat with Agent`,
        description: `Opening chat with agent ${entityId}`,
        duration: 3000,
      });
    }
    
    setShowContextActions(false);
  };
  
  const handleFilterChange = (filters: FilterOptions) => {
    setActiveFilters(filters);
  };

  const handleVisualizationChange = (settings: Partial<typeof visualizationSettings>) => {
    setVisualizationSettings(prev => ({
      ...prev,
      ...settings
    }));
    
    if (visualizationState) {
      console.log('Visualization settings updated:', settings);
    }
  };
  
  const handleToggleControlsCollapse = () => {
    setControlsCollapsed(prev => !prev);
  };
  
  const handleControlTabChange = (tab: string) => {
    setActiveControlTab(tab);
  };
  
  const handleViewDetails = () => {
    window.location.href = '/performance';
  };
  
  return (
    <div className="relative h-full w-full bg-black rounded-xl overflow-hidden office-container" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}>
      <EnhancedBackground animated={true} intensityLevel="medium" />
      
      <OfficeElements
        divisions={divisions}
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
      
      <UnifiedControls
        collapsed={controlsCollapsed}
        onToggleCollapse={handleToggleControlsCollapse}
        activeTab={activeControlTab}
        onTabChange={handleControlTabChange}
        visualizationSettings={visualizationSettings}
        onVisualizationChange={handleVisualizationChange}
        onTogglePerformanceMetrics={handleToggleMetrics}
        onToggleFilters={handleToggleFilters}
        onToggleCommandCenter={() => setCommandCenterVisible(prev => !prev)}
        performanceMetricsVisible={showMetrics}
        filtersVisible={showFilters}
        commandCenterVisible={commandCenterVisible}
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetZoom={() => setZoomLevel(1)}
        onOpenTerminal={() => setShowTerminal(true)}
      />
      
      <OfficeControls
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetZoom={() => setZoomLevel(1)}
        onToggleVisualizationControls={handleToggleVisualizationControls}
        visualizationActive={!!visualizationState?.activeLayerIds?.length}
        onToggleFilters={handleToggleFilters}
        filtersActive={showFilters}
        onToggleMetrics={handleToggleMetrics}
        metricsActive={showMetrics}
        onAddDivision={() => setShowNewDivisionModal(true)}
        onSave={() => {
          toast({
            title: "Layout Saved",
            description: "The current office layout has been saved.",
            duration: 3000,
          });
        }}
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
      
      {commandCenterVisible && (
        <CommandCenter 
          onToggleVisualizationControls={handleToggleVisualizationControls}
          visualizationActive={!!visualizationState?.activeLayerIds?.length}
          onShowMetrics={handleToggleMetrics}
          metricsActive={showMetrics}
          systemStatus={performanceData.status}
          activeAgents={performanceData.agentsActive}
          totalAgents={performanceData.totalAgents}
        />
      )}
      
      <PerformanceMetricsOverlay
        data={performanceData}
        visible={showMetrics}
        position="bottom-right"
        onClose={() => setShowMetrics(false)}
        onViewDetails={handleViewDetails}
      />
      
      <FloorPlanFilters
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        divisions={divisions.map(d => ({ id: d.id, name: d.name }))}
        onFilterChange={handleFilterChange}
        initialFilters={activeFilters}
      />
      
      <ContextualActionPanel
        visible={showContextActions}
        entityType={selectedEntity.type}
        entityId={selectedEntity.id}
        entityName={selectedEntity.name}
        entityStatus={selectedEntity.status}
        position="right"
        onAction={handleContextualAction}
        onClose={() => setShowContextActions(false)}
      />
      
      <AnimatePresence>
        {showTaskPanel && (
          <TaskWorkflowPanel 
            selectedDivision={selectedDivision} 
            onClose={handleCloseTaskPanel} 
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showNewDivisionModal && (
          <NewDivisionModal 
            onClose={() => setShowNewDivisionModal(false)}
            onCreateDivision={handleCreateDivision}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OfficeFloorPlan;
