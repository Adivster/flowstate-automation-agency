import { BookOpen, BarChart, LayoutGrid, Shield, Coffee, FlaskConical, Activity } from 'lucide-react';

interface DivisionData {
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

interface WorkstationData {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  type: string;
}

interface DecorationData {
  type: string;
  x: number;
  y: number;
  size: string;
}

interface HologramData {
  type: string;
  x: number;
  y: number;
  size: string;
}

interface AgentData {
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
  route: Array<{
    division: string;
    x: number;
    y: number;
  }>;
}

// Function that returns divisions with translated names
export const getDivisions = (t: (key: string) => string) => [
  {
    id: 'kb',
    name: t('knowledgeBase'),
    color: 'bg-indigo-500',
    icon: BookOpen,
    position: {
      x: 25, 
      y: 20, 
      width: 20, 
      height: 25
    },
    description: t('kbDescription'),
    agents: 3,
    tasks: 12,
    decoration: [
      { type: 'boards', x: 30, y: 30 },
      { type: 'computer', x: 35, y: 25 },
      { type: 'desk', x: 35, y: 35 },
      { type: 'computer', x: 30, y: 35 },
    ]
  },
  {
    id: 'analytics',
    name: t('analyticsDivision'),
    color: 'bg-yellow-500',
    icon: BarChart,
    position: {
      x: 55, 
      y: 20, 
      width: 20, 
      height: 25
    },
    description: t('analyticsDescription'),
    agents: 2,
    tasks: 8,
    decoration: [
      { type: 'chart', x: 60, y: 25 },
      { type: 'computer', x: 65, y: 30 },
      { type: 'desk', x: 60, y: 35 },
      { type: 'computer', x: 60, y: 30 },
    ]
  },
  {
    id: 'operations',
    name: t('operationsDivision'),
    color: 'bg-purple-500',
    icon: LayoutGrid,
    position: {
      x: 25, 
      y: 55, 
      width: 20, 
      height: 25
    },
    description: t('operationsDescription'),
    agents: 4,
    tasks: 15,
    decoration: [
      { type: 'server', x: 30, y: 60 },
      { type: 'desk', x: 35, y: 65 },
      { type: 'monitor', x: 35, y: 60 },
      { type: 'computer', x: 30, y: 65 },
    ]
  },
  {
    id: 'strategy',
    name: t('strategyDivision'),
    color: 'bg-blue-500',
    icon: Shield,
    position: {
      x: 55, 
      y: 55, 
      width: 20, 
      height: 25
    },
    description: t('strategyDescription'),
    agents: 2,
    tasks: 6,
    decoration: [
      { type: 'boards', x: 60, y: 65 },
      { type: 'desk', x: 65, y: 65 },
      { type: 'computer', x: 60, y: 60 },
      { type: 'meeting', x: 65, y: 60 },
    ]
  },
  // Add the Research division to the floor plan
  {
    id: 'research',
    name: t('researchDivision'),
    color: 'bg-green-500',
    icon: FlaskConical,
    position: {
      x: 40, 
      y: 37, 
      width: 20, 
      height: 15
    },
    description: t('researchDescription'),
    agents: 4,
    tasks: 10,
    decoration: [
      { type: 'chart', x: 45, y: 42 },
      { type: 'computer', x: 50, y: 44 },
      { type: 'desk', x: 45, y: 46 },
      { type: 'server', x: 47, y: 40 },
    ]
  },
  {
    id: 'lounge',
    name: t('lounge'),
    color: 'bg-amber-500',
    icon: Coffee,
    position: {
      x: 80, 
      y: 40, 
      width: 15, 
      height: 20
    },
    description: t('loungeDescription'),
    agents: 0,
    tasks: 0,
    decoration: [
      { type: 'sofa', x: 85, y: 45 },
      { type: 'coffee', x: 85, y: 50 },
      { type: 'plant', x: 87, y: 45 },
      { type: 'plant', x: 83, y: 45 },
    ]
  }
];

export const workstations: WorkstationData[] = [
  { x: 30, y: 25, width: 5, height: 5, type: 'developer' },
  { x: 60, y: 30, width: 5, height: 5, type: 'analyst' },
  { x: 35, y: 60, width: 5, height: 5, type: 'architect' },
  { x: 65, y: 65, width: 5, height: 5, type: 'strategist' },
  { x: 45, y: 42, width: 5, height: 5, type: 'scientist' },
];

export const decorations: DecorationData[] = [
  { type: 'plant', x: 15, y: 30, size: 'small' },
  { type: 'sculpture', x: 85, y: 70, size: 'medium' },
  { type: 'painting', x: 50, y: 10, size: 'large' },
];

export const holograms: HologramData[] = [
  { type: 'earth', x: 75, y: 25, size: 'medium' },
  { type: 'circuit', x: 15, y: 70, size: 'small' },
];

// Add new agent to the Research division
export const agents = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Knowledge Engineer',
    status: 'working',
    icon: BookOpen,
    division: 'kb',
    position: {
      x: 30,
      y: 25
    },
    route: [
      { division: 'kb', x: 30, y: 25 },
      { division: 'analytics', x: 60, y: 25 },
      { division: 'operations', x: 35, y: 60 },
      { division: 'kb', x: 30, y: 25 }
    ]
  },
  {
    id: 2,
    name: 'Bob Williams',
    role: 'Security Analyst',
    status: 'idle',
    icon: Shield,
    division: 'strategy',
    position: {
      x: 65,
      y: 65
    },
    route: [
      { division: 'strategy', x: 65, y: 65 },
      { division: 'operations', x: 35, y: 60 },
      { division: 'strategy', x: 65, y: 65 }
    ]
  },
  {
    id: 3,
    name: 'Charlie Brown',
    role: 'Data Analyst',
    status: 'working',
    icon: BarChart,
    division: 'analytics',
    position: {
      x: 60,
      y: 25
    },
    route: [
      { division: 'analytics', x: 60, y: 25 },
      { division: 'kb', x: 30, y: 25 },
      { division: 'analytics', x: 60, y: 25 }
    ]
  },
  {
    id: 4,
    name: 'Diana Miller',
    role: 'Integration Specialist',
    status: 'paused',
    icon: LayoutGrid,
    division: 'operations',
    position: {
      x: 35,
      y: 60
    },
    route: [
      { division: 'operations', x: 35, y: 60 },
      { division: 'strategy', x: 65, y: 65 },
    ]
  },
  {
    id: 5,
    name: 'Eva Garcia',
    role: 'Financial Analyst',
    status: 'working',
    icon: Shield,
    division: 'strategy',
    position: {
      x: 70,
      y: 70
    },
    route: [
      { division: 'strategy', x: 70, y: 70 },
      { division: 'analytics', x: 60, y: 25 },
    ]
  },
  {
    id: 6,
    name: 'Data Scientist',
    role: 'Research Division',
    status: 'working',
    icon: Activity,
    division: 'research',
    position: {
      x: 45,
      y: 42
    },
    route: [
      { division: 'research', x: 45, y: 42 },
      { division: 'analytics', x: 60, y: 25 },
      { division: 'kb', x: 30, y: 25 },
      { division: 'research', x: 45, y: 42 }
    ]
  },
  {
    id: 7,
    name: 'Linda Carter',
    role: 'Data Architect',
    status: 'working',
    icon: BarChart,
    division: 'analytics',
    position: {
      x: 58,
      y: 28
    },
    route: [
      { division: 'analytics', x: 58, y: 28 },
      { division: 'kb', x: 32, y: 22 },
      { division: 'analytics', x: 58, y: 28 }
    ]
  },
  {
    id: 8,
    name: 'Kevin ONeil',
    role: 'Operations Manager',
    status: 'idle',
    icon: LayoutGrid,
    division: 'operations',
    position: {
      x: 32,
      y: 57
    },
    route: [
      { division: 'operations', x: 32, y: 57 },
      { division: 'strategy', x: 67, y: 68 },
    ]
  },
  {
    id: 9,
    name: 'Brian Smith',
    role: 'Knowledge Analyst',
    status: 'working',
    icon: BookOpen,
    division: 'kb',
    position: {
      x: 28,
      y: 27
    },
    route: [
      { division: 'kb', x: 28, y: 27 },
      { division: 'analytics', x: 62, y: 22 },
      { division: 'operations', x: 37, y: 58 },
      { division: 'kb', x: 28, y: 27 }
    ]
  },
  {
    id: 10,
    name: 'Laura Diaz',
    role: 'Strategy Consultant',
    status: 'paused',
    icon: Shield,
    division: 'strategy',
    position: {
      x: 67,
      y: 62
    },
    route: [
      { division: 'strategy', x: 67, y: 62 },
      { division: 'operations', x: 32, y: 58 },
      { division: 'strategy', x: 67, y: 62 }
    ]
  },
];
