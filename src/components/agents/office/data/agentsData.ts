
import { BookOpen, Shield, BarChart, LayoutGrid, Activity, Database, Laptop, Zap, Search, FileText } from 'lucide-react';
import { AgentData } from '../types/officeTypes';

export const agents: AgentData[] = [
  {
    id: 1,
    name: 'Knowledge Engineer',
    role: 'Information Architect',
    status: 'working',
    icon: BookOpen,
    division: 'kb',
    position: {
      x: 22,
      y: 25
    },
    mood: 'optimal',
    workload: 65,
    route: [
      { division: 'kb', x: 22, y: 25 },
      { division: 'analytics', x: 58, y: 25 },
      { division: 'research', x: 40, y: 42 },
      { division: 'kb', x: 22, y: 25 }
    ]
  },
  {
    id: 2,
    name: 'Security Analyst',
    role: 'Threat Detector',
    status: 'working',
    icon: Shield,
    division: 'strategy',
    position: {
      x: 62,
      y: 65
    },
    mood: 'overwhelmed',
    workload: 92,
    route: [
      { division: 'strategy', x: 62, y: 65 },
      { division: 'operations', x: 22, y: 60 },
      { division: 'strategy', x: 62, y: 65 }
    ]
  },
  {
    id: 3,
    name: 'Data Analyst',
    role: 'Pattern Recognition',
    status: 'working',
    icon: BarChart,
    division: 'analytics',
    position: {
      x: 62,
      y: 25
    },
    mood: 'focused',
    workload: 78,
    route: [
      { division: 'analytics', x: 62, y: 25 },
      { division: 'kb', x: 22, y: 25 },
      { division: 'research', x: 40, y: 42 },
      { division: 'analytics', x: 62, y: 25 }
    ]
  },
  {
    id: 4,
    name: 'Operations Manager',
    role: 'Process Coordinator',
    status: 'working',
    icon: LayoutGrid,
    division: 'operations',
    position: {
      x: 22,
      y: 60
    },
    mood: 'focused',
    workload: 70,
    route: [
      { division: 'operations', x: 22, y: 60 },
      { division: 'strategy', x: 62, y: 65 },
      { division: 'operations', x: 22, y: 60 }
    ]
  },
  {
    id: 5,
    name: 'Strategy Consultant',
    role: 'Decision Support',
    status: 'working',
    icon: Shield,
    division: 'strategy',
    position: {
      x: 64,
      y: 70
    },
    mood: 'learning',
    workload: 55,
    route: [
      { division: 'strategy', x: 64, y: 70 },
      { division: 'analytics', x: 62, y: 25 },
      { division: 'strategy', x: 64, y: 70 }
    ]
  },
  {
    id: 6,
    name: 'Research Scientist',
    role: 'Innovation Leader',
    status: 'working',
    icon: Activity,
    division: 'research',
    position: {
      x: 40,
      y: 42
    },
    mood: 'optimal',
    workload: 75,
    route: [
      { division: 'research', x: 40, y: 42 },
      { division: 'analytics', x: 62, y: 25 },
      { division: 'kb', x: 22, y: 25 },
      { division: 'research', x: 40, y: 42 }
    ]
  },
  {
    id: 7,
    name: 'Data Architect',
    role: 'System Designer',
    status: 'working',
    icon: Database,
    division: 'analytics',
    position: {
      x: 60,
      y: 28
    },
    mood: 'underutilized',
    workload: 30,
    route: [
      { division: 'analytics', x: 60, y: 28 },
      { division: 'kb', x: 20, y: 27 },
      { division: 'research', x: 40, y: 42 },
      { division: 'analytics', x: 60, y: 28 }
    ]
  },
  {
    id: 8,
    name: 'Infrastructure Specialist',
    role: 'System Maintainer',
    status: 'working',
    icon: Laptop,
    division: 'operations',
    position: {
      x: 20,
      y: 57
    },
    mood: 'frustrated',
    workload: 82,
    route: [
      { division: 'operations', x: 20, y: 57 },
      { division: 'strategy', x: 62, y: 68 },
      { division: 'operations', x: 20, y: 57 }
    ]
  },
  {
    id: 9,
    name: 'Information Specialist',
    role: 'Knowledge Curator',
    status: 'working',
    icon: Search,
    division: 'kb',
    position: {
      x: 20,
      y: 27
    },
    mood: 'confused',
    workload: 45,
    route: [
      { division: 'kb', x: 20, y: 27 },
      { division: 'analytics', x: 60, y: 28 },
      { division: 'kb', x: 20, y: 27 }
    ]
  },
  {
    id: 10,
    name: 'Strategic Planner',
    role: 'Future Forecaster',
    status: 'working',
    icon: FileText,
    division: 'strategy',
    position: {
      x: 60,
      y: 62
    },
    mood: 'optimal',
    workload: 68,
    route: [
      { division: 'strategy', x: 60, y: 62 },
      { division: 'operations', x: 20, y: 58 },
      { division: 'strategy', x: 60, y: 62 }
    ]
  },
];
