
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
      x: 20, 
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
      x: 60, 
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
      x: 20, 
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
      x: 60, 
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
  // Repositioned Research division to avoid overlaps
  {
    id: 'research',
    name: t('researchDivision'),
    color: 'bg-green-500',
    icon: FlaskConical,
    position: {
      x: 40, 
      y: 35, 
      width: 20, 
      height: 20
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
