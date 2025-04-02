
import { BookOpen, Shield, BarChart, LayoutGrid, Activity, Database, Laptop, Zap, Search, FileText } from 'lucide-react';
import { AgentData } from '../types/officeTypes';

export const agents: AgentData[] = [
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
      { division: 'research', x: 45, y: 42 },
      { division: 'kb', x: 30, y: 25 }
    ]
  },
  {
    id: 2,
    name: 'Bob Williams',
    role: 'Security Analyst',
    status: 'working',
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
      { division: 'research', x: 45, y: 42 },
      { division: 'analytics', x: 60, y: 25 }
    ]
  },
  {
    id: 4,
    name: 'Diana Miller',
    role: 'Integration Specialist',
    status: 'working',
    icon: LayoutGrid,
    division: 'operations',
    position: {
      x: 35,
      y: 60
    },
    route: [
      { division: 'operations', x: 35, y: 60 },
      { division: 'strategy', x: 65, y: 65 },
      { division: 'operations', x: 35, y: 60 }
    ]
  },
  {
    id: 5,
    name: 'Eva Garcia',
    role: 'Strategy Consultant',
    status: 'working',
    icon: Shield,
    division: 'strategy',
    position: {
      x: 67,
      y: 70
    },
    route: [
      { division: 'strategy', x: 67, y: 70 },
      { division: 'analytics', x: 60, y: 25 },
      { division: 'strategy', x: 67, y: 70 }
    ]
  },
  {
    id: 6,
    name: 'Frank Morris',
    role: 'Data Scientist',
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
    icon: Database,
    division: 'analytics',
    position: {
      x: 58,
      y: 28
    },
    route: [
      { division: 'analytics', x: 58, y: 28 },
      { division: 'kb', x: 32, y: 22 },
      { division: 'research', x: 45, y: 42 },
      { division: 'analytics', x: 58, y: 28 }
    ]
  },
  {
    id: 8,
    name: 'Kevin ONeil',
    role: 'Operations Manager',
    status: 'working',
    icon: Laptop,
    division: 'operations',
    position: {
      x: 32,
      y: 57
    },
    route: [
      { division: 'operations', x: 32, y: 57 },
      { division: 'strategy', x: 67, y: 68 },
      { division: 'operations', x: 32, y: 57 }
    ]
  },
  {
    id: 9,
    name: 'Brian Smith',
    role: 'Knowledge Analyst',
    status: 'working',
    icon: Search,
    division: 'kb',
    position: {
      x: 28,
      y: 27
    },
    route: [
      { division: 'kb', x: 28, y: 27 },
      { division: 'analytics', x: 62, y: 22 },
      { division: 'kb', x: 28, y: 27 }
    ]
  },
  {
    id: 10,
    name: 'Laura Diaz',
    role: 'Strategy Consultant',
    status: 'working',
    icon: FileText,
    division: 'strategy',
    position: {
      x: 63,
      y: 62
    },
    route: [
      { division: 'strategy', x: 63, y: 62 },
      { division: 'operations', x: 32, y: 58 },
      { division: 'strategy', x: 63, y: 62 }
    ]
  },
];
