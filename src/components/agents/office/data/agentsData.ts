
import { BookOpen, Shield, BarChart, LayoutGrid, Activity, Database, Laptop, Zap, Search, FileText, Bot, Code, Server, Eye, MessageSquare, HeartPulse, Lightbulb, Brain, CloudLightning, LineChart } from 'lucide-react';
import { AgentData } from '../types/officeTypes';

export const agents: AgentData[] = [
  {
    id: 1,
    name: 'Data Librarian',
    role: 'Knowledge Management',
    status: 'working',
    icon: BookOpen,
    division: 'kb',
    position: {
      x: 22,
      y: 25
    },
    mood: 'optimal',
    workload: 65,
    performanceData: [45, 65, 52, 59, 48, 65, 70],
    efficiency: 82,
    route: [
      { division: 'kb', x: 22, y: 25 },
      { division: 'analytics', x: 58, y: 25 },
      { division: 'research', x: 40, y: 42 },
      { division: 'kb', x: 22, y: 25 }
    ],
    currentTask: {
      type: 'reading',
      description: 'Indexing new knowledge resources'
    }
  },
  {
    id: 2,
    name: 'Security Guardian',
    role: 'Threat Detection',
    status: 'working',
    icon: Shield,
    division: 'strategy',
    position: {
      x: 62,
      y: 65
    },
    mood: 'overwhelmed',
    workload: 92,
    performanceData: [85, 92, 88, 95, 90, 89, 92],
    efficiency: 91,
    route: [
      { division: 'strategy', x: 62, y: 65 },
      { division: 'operations', x: 22, y: 60 },
      { division: 'strategy', x: 62, y: 65 }
    ],
    currentTask: {
      type: 'analyzing',
      description: 'Monitoring security protocols'
    }
  },
  {
    id: 3,
    name: 'Trend Analyzer',
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
    performanceData: [65, 72, 78, 75, 80, 72, 78],
    efficiency: 76,
    route: [
      { division: 'analytics', x: 62, y: 25 },
      { division: 'kb', x: 22, y: 25 },
      { division: 'research', x: 40, y: 42 },
      { division: 'analytics', x: 62, y: 25 }
    ],
    currentTask: {
      type: 'analyzing',
      description: 'Processing market trend data'
    }
  },
  {
    id: 4,
    name: 'Workflow Coordinator',
    role: 'Process Optimization',
    status: 'working',
    icon: LayoutGrid,
    division: 'operations',
    position: {
      x: 22,
      y: 60
    },
    mood: 'focused',
    workload: 70,
    performanceData: [60, 65, 70, 68, 72, 69, 70],
    efficiency: 74,
    route: [
      { division: 'operations', x: 22, y: 60 },
      { division: 'strategy', x: 62, y: 65 },
      { division: 'operations', x: 22, y: 60 }
    ],
    currentTask: {
      type: 'writing',
      description: 'Updating workflow documentation'
    }
  },
  {
    id: 5,
    name: 'Strategic Planner',
    role: 'Decision Support',
    status: 'working',
    icon: LineChart,
    division: 'strategy',
    position: {
      x: 64,
      y: 70
    },
    mood: 'learning',
    workload: 55,
    performanceData: [45, 50, 55, 52, 58, 55, 60],
    efficiency: 68,
    route: [
      { division: 'strategy', x: 64, y: 70 },
      { division: 'analytics', x: 62, y: 25 },
      { division: 'strategy', x: 64, y: 70 }
    ],
    currentTask: {
      type: 'analyzing',
      description: 'Forecasting quarterly outcomes'
    }
  },
  {
    id: 6,
    name: 'Research Pioneer',
    role: 'Innovation Leader',
    status: 'working',
    icon: Lightbulb,
    division: 'research',
    position: {
      x: 40,
      y: 42
    },
    mood: 'optimal',
    workload: 75,
    performanceData: [70, 75, 72, 78, 80, 75, 82],
    efficiency: 84,
    route: [
      { division: 'research', x: 40, y: 42 },
      { division: 'analytics', x: 62, y: 25 },
      { division: 'kb', x: 22, y: 25 },
      { division: 'research', x: 40, y: 42 }
    ],
    currentTask: {
      type: 'experimenting',
      description: 'Testing new algorithm variants'
    }
  },
  {
    id: 7,
    name: 'System Architect',
    role: 'Data Structure Design',
    status: 'working',
    icon: Database,
    division: 'analytics',
    position: {
      x: 60,
      y: 28
    },
    mood: 'underutilized',
    workload: 30,
    performanceData: [25, 30, 28, 35, 30, 32, 30],
    efficiency: 65,
    route: [
      { division: 'analytics', x: 60, y: 28 },
      { division: 'kb', x: 20, y: 27 },
      { division: 'research', x: 40, y: 42 },
      { division: 'analytics', x: 60, y: 28 }
    ],
    currentTask: {
      type: 'coding',
      description: 'Optimizing database schema'
    }
  },
  {
    id: 8,
    name: 'Network Engineer',
    role: 'System Maintenance',
    status: 'working',
    icon: Server,
    division: 'operations',
    position: {
      x: 20,
      y: 57
    },
    mood: 'frustrated',
    workload: 82,
    performanceData: [75, 80, 82, 85, 80, 79, 82],
    efficiency: 77,
    route: [
      { division: 'operations', x: 20, y: 57 },
      { division: 'strategy', x: 62, y: 68 },
      { division: 'operations', x: 20, y: 57 }
    ],
    currentTask: {
      type: 'coding',
      description: 'Deploying network updates'
    }
  },
  {
    id: 9,
    name: 'Knowledge Scout',
    role: 'Information Discovery',
    status: 'working',
    icon: Search,
    division: 'kb',
    position: {
      x: 20,
      y: 27
    },
    mood: 'confused',
    workload: 45,
    performanceData: [40, 45, 42, 48, 45, 47, 45],
    efficiency: 62,
    route: [
      { division: 'kb', x: 20, y: 27 },
      { division: 'analytics', x: 60, y: 28 },
      { division: 'kb', x: 20, y: 27 }
    ],
    currentTask: {
      type: 'searching',
      description: 'Locating rare information assets'
    }
  },
  {
    id: 10,
    name: 'Future Forecaster',
    role: 'Predictive Analysis',
    status: 'working',
    icon: Brain,
    division: 'strategy',
    position: {
      x: 60,
      y: 62
    },
    mood: 'optimal',
    workload: 68,
    performanceData: [60, 65, 68, 70, 68, 72, 68],
    efficiency: 79,
    route: [
      { division: 'strategy', x: 60, y: 62 },
      { division: 'operations', x: 20, y: 58 },
      { division: 'strategy', x: 60, y: 62 }
    ],
    currentTask: {
      type: 'analyzing',
      description: 'Developing scenario models'
    }
  },
];
