
import { BookOpen, BarChart, LayoutGrid, Shield, Coffee, FlaskConical } from 'lucide-react';
import { DivisionData } from '../types/officeTypes';

// Function that returns divisions with translated names
export const getDivisions = (t: (key: string) => string): DivisionData[] => [
  {
    id: 'kb',
    name: t('knowledgeBase'),
    color: 'bg-indigo-500',
    icon: BookOpen,
    position: {
      x: 15, 
      y: 15, 
      width: 20, 
      height: 25
    },
    description: t('kbDescription'),
    agents: 3,
    tasks: 12,
    decoration: [
      { type: 'boards', x: 25, y: 20 },
      { type: 'computer', x: 30, y: 20 },
      { type: 'desk', x: 25, y: 25 },
      { type: 'computer', x: 20, y: 25 },
      { type: 'bookshelf', x: 20, y: 30 },
      { type: 'terminal', x: 30, y: 30 },
    ]
  },
  {
    id: 'analytics',
    name: t('analyticsDivision'),
    color: 'bg-yellow-500',
    icon: BarChart,
    position: {
      x: 65, 
      y: 15, 
      width: 20, 
      height: 25
    },
    description: t('analyticsDescription'),
    agents: 2,
    tasks: 8,
    decoration: [
      { type: 'chart', x: 70, y: 20 },
      { type: 'computer', x: 75, y: 25 },
      { type: 'desk', x: 70, y: 30 },
      { type: 'computer', x: 75, y: 20 },
      { type: 'dashboard', x: 65, y: 25 },
      { type: 'datawall', x: 75, y: 30 },
    ]
  },
  {
    id: 'operations',
    name: t('operationsDivision'),
    color: 'bg-purple-500',
    icon: LayoutGrid,
    position: {
      x: 15, 
      y: 65, 
      width: 20, 
      height: 25
    },
    description: t('operationsDescription'),
    agents: 4,
    tasks: 15,
    decoration: [
      { type: 'server', x: 25, y: 70 },
      { type: 'desk', x: 30, y: 75 },
      { type: 'monitor', x: 25, y: 75 },
      { type: 'computer', x: 20, y: 70 },
      { type: 'hardware', x: 20, y: 80 },
      { type: 'controlpanel', x: 25, y: 80 },
    ]
  },
  {
    id: 'strategy',
    name: t('strategyDivision'),
    color: 'bg-blue-500',
    icon: Shield,
    position: {
      x: 65, 
      y: 65, 
      width: 20, 
      height: 25
    },
    description: t('strategyDescription'),
    agents: 2,
    tasks: 6,
    decoration: [
      { type: 'boards', x: 70, y: 70 },
      { type: 'desk', x: 75, y: 75 },
      { type: 'computer', x: 70, y: 75 },
      { type: 'meeting', x: 75, y: 70 },
      { type: 'projection', x: 70, y: 80 },
      { type: 'holotable', x: 75, y: 80 },
    ]
  },
  // Moved Research division to the center with more space
  {
    id: 'research',
    name: t('researchDivision'),
    color: 'bg-green-500',
    icon: FlaskConical,
    position: {
      x: 40, 
      y: 40, 
      width: 20, 
      height: 20
    },
    description: t('researchDescription'),
    agents: 4,
    tasks: 10,
    decoration: [
      { type: 'chart', x: 45, y: 45 },
      { type: 'computer', x: 50, y: 50 },
      { type: 'desk', x: 45, y: 50 },
      { type: 'server', x: 50, y: 45 },
      { type: 'library', x: 40, y: 45 },
      { type: 'laboratory', x: 45, y: 40 },
    ]
  },
  {
    id: 'lounge',
    name: t('lounge'),
    color: 'bg-amber-500',
    icon: Coffee,
    position: {
      x: 65, 
      y: 40, 
      width: 20, 
      height: 15
    },
    description: t('loungeDescription'),
    agents: 0,
    tasks: 0,
    decoration: [
      { type: 'sofa', x: 70, y: 45 },
      { type: 'coffee', x: 75, y: 45 },
      { type: 'plant', x: 70, y: 40 },
      { type: 'plant', x: 75, y: 40 },
      { type: 'coffeebar', x: 80, y: 43 },
      { type: 'relaxarea', x: 65, y: 47 },
    ]
  }
];
