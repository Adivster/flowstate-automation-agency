
import { Database, FileSearch, User, Code, Shield, BrainCog, Monitor, Coffee, ChartBar, BookOpen, Zap, Server, Activity, Cpu, DollarSign, MessagesSquare } from 'lucide-react';
import { WorkstationType } from './Workstation';

export interface RoutePoint {
  division: string;
  x: number;
  y: number;
}

export interface Agent {
  id: number;
  name: string;
  role: string;
  status: 'working' | 'idle' | 'paused' | 'error';
  icon: any;
  division: string;
  position: {
    x: number;
    y: number;
  };
  route: RoutePoint[];
}

export interface Division {
  id: string;
  name: string;
  color: string;
  icon: any;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  description: string;
  agents: number;
  tasks: number;
  decoration: Array<{
    type: string;
    x: number;
    y: number;
  }>;
}

export interface Decoration {
  type: string;
  x: number;
  y: number;
  size: number;
}

export interface Hologram {
  type: string;
  x: number;
  y: number;
  size: number;
}

// Define office divisions with enhanced visual themes
export const getDivisions = (t: (key: string) => string): Division[] => [
  {
    id: 'kb',
    name: t('knowledgeBase'),
    color: 'bg-indigo-500',
    icon: BookOpen,
    position: { x: 15, y: 30, width: 28, height: 30 },
    description: t('knowledgeBaseDesc'),
    agents: 3,
    tasks: 30,
    decoration: [
      { type: 'boards', x: 25, y: 35 },
      { type: 'desk', x: 22, y: 40 },
      { type: 'computer', x: 22, y: 38 },
      { type: 'chart', x: 35, y: 35 },
    ]
  },
  {
    id: 'analytics',
    name: t('analyticsDivision'),
    color: 'bg-cyan-500',
    icon: ChartBar,
    position: { x: 55, y: 30, width: 28, height: 30 },
    description: t('analyticsDesc'),
    agents: 3,
    tasks: 22,
    decoration: [
      { type: 'computer', x: 60, y: 35 },
      { type: 'computer', x: 65, y: 35 },
      { type: 'desk', x: 60, y: 38 },
      { type: 'desk', x: 65, y: 38 },
      { type: 'chart', x: 70, y: 40 },
    ]
  },
  {
    id: 'operations',
    name: t('operationsDivision'),
    color: 'bg-green-500',
    icon: LayoutGrid,
    position: { x: 15, y: 70, width: 28, height: 20 },
    description: t('operationsDesc'),
    agents: 4,
    tasks: 45,
    decoration: [
      { type: 'boards', x: 25, y: 75 },
      { type: 'desk', x: 30, y: 78 },
      { type: 'computer', x: 25, y: 75 },
    ]
  },
  {
    id: 'strategy',
    name: t('strategyDivision'),
    color: 'bg-purple-500',
    icon: Shield,
    position: { x: 55, y: 70, width: 28, height: 20 },
    description: t('strategyDesc'),
    agents: 2,
    tasks: 20,
    decoration: [
      { type: 'server', x: 65, y: 75 },
      { type: 'computer', x: 60, y: 72 },
      { type: 'monitor', x: 70, y: 72 },
    ]
  },
];

// Workstations - more visible desks matching the reference images
export const workstations: WorkstationType[] = [
  // KB division workstations
  { x: 20, y: 35, width: 8, height: 4, type: 'desk' },
  { x: 30, y: 35, width: 8, height: 4, type: 'desk' },
  { x: 20, y: 42, width: 8, height: 4, type: 'desk' },
  { x: 30, y: 42, width: 8, height: 4, type: 'desk' },
  
  // Analytics division workstations
  { x: 60, y: 35, width: 8, height: 4, type: 'desk' },
  { x: 70, y: 35, width: 8, height: 4, type: 'desk' },
  { x: 60, y: 42, width: 8, height: 4, type: 'desk' },
  { x: 70, y: 42, width: 8, height: 4, type: 'desk' },
  
  // Operations division - meeting table
  { x: 22, y: 75, width: 15, height: 8, type: 'meeting' },
  
  // Strategy division - server racks
  { x: 60, y: 75, width: 4, height: 8, type: 'server' },
  { x: 66, y: 75, width: 4, height: 8, type: 'server' },
  { x: 72, y: 75, width: 4, height: 8, type: 'server' },
];

// Decorative elements
export const decorations: Decoration[] = [
  { type: 'plant', x: 5, y: 10, size: 4 },
  { type: 'plant', x: 90, y: 10, size: 4 },
  { type: 'coffee', x: 7, y: 60, size: 3 },
  { type: 'monitor', x: 75, y: 35, size: 3 },
  { type: 'monitor', x: 75, y: 42, size: 3 },
  { type: 'server', x: 80, y: 75, size: 5 },
];

// Holographic projections
export const holograms: Hologram[] = [
  { type: 'chart', x: 25, y: 32, size: 6 },
  { type: 'data', x: 65, y: 32, size: 6 },
  { type: 'code', x: 70, y: 38, size: 5 },
  { type: 'chart', x: 25, y: 72, size: 5 },
  { type: 'data', x: 62, y: 72, size: 5 },
];

// Define agents with more varied positions around workstations
export const agents: Agent[] = [
  {
    id: 1,
    name: 'KB Content Agent',
    role: 'Knowledge Base',
    status: 'working',
    icon: BookOpen,
    division: 'kb',
    position: { x: 22, y: 34 }, // Positioned at workstation
    route: [
      { division: 'kb', x: 22, y: 34 },
      { division: 'kb', x: 32, y: 34 },
      { division: 'kb', x: 22, y: 41 },
    ]
  },
  {
    id: 2,
    name: 'Strategy Agent',
    role: 'Strategy',
    status: 'working',
    icon: Shield,
    division: 'strategy',
    position: { x: 62, y: 74 }, // Positioned at security console
    route: [
      { division: 'strategy', x: 62, y: 74 },
      { division: 'strategy', x: 68, y: 74 },
      { division: 'strategy', x: 74, y: 74 },
    ]
  },
  {
    id: 3,
    name: 'Dashboard Agent',
    role: 'Analytics',
    status: 'working',
    icon: ChartBar,
    division: 'analytics',
    position: { x: 62, y: 34 }, // At dev workstation
    route: [
      { division: 'analytics', x: 62, y: 34 },
      { division: 'analytics', x: 72, y: 34 },
      { division: 'analytics', x: 62, y: 41 },
    ]
  },
  {
    id: 4,
    name: 'KB Search Agent',
    role: 'Knowledge Base',
    status: 'working',
    icon: FileSearch,
    division: 'kb',
    position: { x: 32, y: 41 }, // Near research boards
    route: [
      { division: 'kb', x: 32, y: 41 },
      { division: 'kb', x: 22, y: 41 },
      { division: 'kb', x: 32, y: 34 },
    ]
  },
  {
    id: 5,
    name: 'Workflow Agent',
    role: 'Operations',
    status: 'paused',
    icon: LayoutGrid,
    division: 'operations',
    position: { x: 25, y: 74 }, // At meeting table
    route: [
      { division: 'operations', x: 25, y: 74 },
      { division: 'operations', x: 35, y: 74 },
      { division: 'kb', x: 25, y: 35 },
    ]
  },
  {
    id: 6,
    name: 'Market Research Agent',
    role: 'Strategy',
    status: 'error',
    icon: BrainCog,
    division: 'strategy',
    position: { x: 35, y: 74 }, // At strategy table
    route: [
      { division: 'strategy', x: 35, y: 74 },
      { division: 'strategy', x: 60, y: 74 },
      { division: 'analytics', x: 60, y: 35 },
    ]
  },
  {
    id: 7, 
    name: 'Integration Agent',
    role: 'Operations',
    status: 'working',
    icon: Server,
    division: 'operations',
    position: { x: 72, y: 41 }, // At second dev desk
    route: [
      { division: 'operations', x: 72, y: 41 },
      { division: 'operations', x: 62, y: 41 },
      { division: 'strategy', x: 68, y: 74 },
    ]
  },
  {
    id: 8,
    name: 'Metrics Agent',
    role: 'Analytics',
    status: 'working',
    icon: Activity,
    division: 'analytics',
    position: { x: 74, y: 74 }, // Working on servers
    route: [
      { division: 'analytics', x: 74, y: 74 },
      { division: 'analytics', x: 68, y: 74 },
      { division: 'analytics', x: 62, y: 74 },
    ]
  }
];
