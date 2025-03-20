
import { Database, FileSearch, User, Code, Shield, BrainCog, Monitor, Coffee, ChartBar, BookOpen, Zap, Server, Activity, Cpu } from 'lucide-react';
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
    id: 'research',
    name: t('researchDivision'),
    color: 'bg-cyan-500',
    icon: FileSearch,
    position: { x: 15, y: 30, width: 28, height: 30 },
    description: t('researchDesc'),
    agents: 6,
    tasks: 12,
    decoration: [
      { type: 'boards', x: 25, y: 35 },
      { type: 'desk', x: 22, y: 40 },
      { type: 'computer', x: 22, y: 38 },
      { type: 'chart', x: 35, y: 35 },
    ]
  },
  {
    id: 'development',
    name: t('developmentDivision'),
    color: 'bg-green-500',
    icon: Code,
    position: { x: 55, y: 30, width: 28, height: 30 },
    description: t('developmentDesc'),
    agents: 8,
    tasks: 15,
    decoration: [
      { type: 'computer', x: 60, y: 35 },
      { type: 'computer', x: 65, y: 35 },
      { type: 'server', x: 70, y: 40 },
      { type: 'desk', x: 60, y: 38 },
      { type: 'desk', x: 65, y: 38 },
    ]
  },
  {
    id: 'strategy',
    name: t('strategyDivision'),
    color: 'bg-purple-500',
    icon: BrainCog,
    position: { x: 15, y: 70, width: 28, height: 20 },
    description: t('strategyDesc'),
    agents: 4,
    tasks: 8,
    decoration: [
      { type: 'boards', x: 25, y: 75 },
      { type: 'desk', x: 30, y: 78 },
      { type: 'chart', x: 35, y: 75 },
    ]
  },
  {
    id: 'security',
    name: t('securityDivision'),
    color: 'bg-red-500',
    icon: Shield,
    position: { x: 55, y: 70, width: 28, height: 20 },
    description: t('securityDesc'),
    agents: 5,
    tasks: 10,
    decoration: [
      { type: 'server', x: 65, y: 75 },
      { type: 'computer', x: 60, y: 72 },
      { type: 'monitor', x: 70, y: 72 },
    ]
  },
];

// Workstations - more visible desks matching the reference images
export const workstations: WorkstationType[] = [
  // Research division workstations
  { x: 20, y: 35, width: 8, height: 4, type: 'desk' },
  { x: 30, y: 35, width: 8, height: 4, type: 'desk' },
  { x: 20, y: 42, width: 8, height: 4, type: 'desk' },
  { x: 30, y: 42, width: 8, height: 4, type: 'desk' },
  
  // Development division workstations
  { x: 60, y: 35, width: 8, height: 4, type: 'desk' },
  { x: 70, y: 35, width: 8, height: 4, type: 'desk' },
  { x: 60, y: 42, width: 8, height: 4, type: 'desk' },
  { x: 70, y: 42, width: 8, height: 4, type: 'desk' },
  
  // Strategy division - meeting table
  { x: 22, y: 75, width: 15, height: 8, type: 'meeting' },
  
  // Security division - server racks
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
    name: 'Data Analyst',
    role: 'Data Analysis',
    status: 'working',
    icon: Database,
    division: 'research',
    position: { x: 22, y: 34 }, // Positioned at workstation
    route: [
      { division: 'research', x: 22, y: 34 },
      { division: 'research', x: 32, y: 34 },
      { division: 'research', x: 22, y: 41 },
    ]
  },
  {
    id: 2,
    name: 'Security Lead',
    role: 'Security',
    status: 'working',
    icon: Shield,
    division: 'security',
    position: { x: 62, y: 74 }, // Positioned at security console
    route: [
      { division: 'security', x: 62, y: 74 },
      { division: 'security', x: 68, y: 74 },
      { division: 'security', x: 74, y: 74 },
    ]
  },
  {
    id: 3,
    name: 'Senior Dev',
    role: 'Coding',
    status: 'working',
    icon: Code,
    division: 'development',
    position: { x: 62, y: 34 }, // At dev workstation
    route: [
      { division: 'development', x: 62, y: 34 },
      { division: 'development', x: 72, y: 34 },
      { division: 'development', x: 62, y: 41 },
    ]
  },
  {
    id: 4,
    name: 'Research Lead',
    role: 'Data Mining',
    status: 'working',
    icon: FileSearch,
    division: 'research',
    position: { x: 32, y: 41 }, // Near research boards
    route: [
      { division: 'research', x: 32, y: 41 },
      { division: 'research', x: 22, y: 41 },
      { division: 'research', x: 32, y: 34 },
    ]
  },
  {
    id: 5,
    name: 'Project Manager',
    role: 'Management',
    status: 'paused',
    icon: User,
    division: 'strategy',
    position: { x: 25, y: 74 }, // At meeting table
    route: [
      { division: 'strategy', x: 25, y: 74 },
      { division: 'strategy', x: 35, y: 74 },
      { division: 'research', x: 25, y: 35 },
    ]
  },
  {
    id: 6,
    name: 'AI Engineer',
    role: 'Strategy',
    status: 'error',
    icon: BrainCog,
    division: 'strategy',
    position: { x: 35, y: 74 }, // At strategy table
    route: [
      { division: 'strategy', x: 35, y: 74 },
      { division: 'security', x: 60, y: 74 },
      { division: 'development', x: 60, y: 35 },
    ]
  },
  {
    id: 7, 
    name: 'Backend Dev',
    role: 'Systems',
    status: 'working',
    icon: Server,
    division: 'development',
    position: { x: 72, y: 41 }, // At second dev desk
    route: [
      { division: 'development', x: 72, y: 41 },
      { division: 'development', x: 62, y: 41 },
      { division: 'security', x: 68, y: 74 },
    ]
  },
  {
    id: 8,
    name: 'Hardware Specialist',
    role: 'Infrastructure',
    status: 'working',
    icon: Cpu,
    division: 'security',
    position: { x: 74, y: 74 }, // Working on servers
    route: [
      { division: 'security', x: 74, y: 74 },
      { division: 'security', x: 68, y: 74 },
      { division: 'security', x: 62, y: 74 },
    ]
  }
];
