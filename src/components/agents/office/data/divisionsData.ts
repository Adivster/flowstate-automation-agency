
import { Book, Database, BarChart3, Coffee, TestTube, Cpu } from 'lucide-react';
import { Division } from '../types/officeTypes';

export const getDivisions = (t): Division[] => [
  {
    id: 'kb',
    name: t('knowledgeBase'),
    icon: Book,
    position: {
      x: 20,
      y: 20,
      width: 28,
      height: 25
    },
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderColor: 'rgba(99, 102, 241, 0.8)'
  },
  {
    id: 'analytics',
    name: t('analyticsDivision'),
    icon: BarChart3,
    position: {
      x: 60,
      y: 20,
      width: 28,
      height: 25
    },
    backgroundColor: 'rgba(234, 179, 8, 0.15)',
    borderColor: 'rgba(234, 179, 8, 0.8)'
  },
  {
    id: 'operations',
    name: t('operationsDivision'),
    icon: Cpu,
    position: {
      x: 20,
      y: 55,
      width: 28,
      height: 25
    },
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
    borderColor: 'rgba(168, 85, 247, 0.8)'
  },
  {
    id: 'strategy',
    name: t('strategyDivision'),
    icon: Database,
    position: {
      x: 60,
      y: 55,
      width: 28,
      height: 25
    },
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderColor: 'rgba(59, 130, 246, 0.8)'
  },
  {
    id: 'research',
    name: t('researchDivision'),
    icon: TestTube,
    position: {
      x: 40,
      y: 37,
      width: 20,
      height: 25
    },
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderColor: 'rgba(34, 197, 94, 0.8)'
  },
  {
    id: 'lounge',
    name: t('agentLounge'),
    icon: Coffee,
    position: {
      x: 80,
      y: 37,
      width: 13,
      height: 25
    },
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderColor: 'rgba(245, 158, 11, 0.8)'
  }
];

// Default/initial positions for divisions to allow reset functionality
export const defaultDivisionPositions = {
  kb: { x: 20, y: 20 },
  analytics: { x: 60, y: 20 },
  operations: { x: 20, y: 55 },
  strategy: { x: 60, y: 55 },
  research: { x: 40, y: 37 },
  lounge: { x: 80, y: 37 }
};
