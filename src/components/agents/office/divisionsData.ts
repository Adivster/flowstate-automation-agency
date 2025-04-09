
import { Book, Database, BarChart3, Cpu } from 'lucide-react';
import { Division, ZIndexLayers } from '../office/types/officeTypes';
import { divisionColors } from '@/utils/colorSystem';

export const getDivisions = (t): Division[] => [
  {
    id: 'kb',
    name: t('knowledgeBase'),
    icon: Book,
    position: {
      x: 20,
      y: 20,
      width: 25,
      height: 25
    },
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderColor: 'rgba(99, 102, 241, 0.8)',
    zIndex: ZIndexLayers.DIVISION
  },
  {
    id: 'analytics',
    name: t('analyticsDivision'),
    icon: BarChart3,
    position: {
      x: 55,
      y: 20,
      width: 25,
      height: 25
    },
    backgroundColor: 'rgba(234, 179, 8, 0.15)',
    borderColor: 'rgba(234, 179, 8, 0.8)',
    zIndex: ZIndexLayers.DIVISION
  },
  {
    id: 'operations',
    name: t('operationsDivision'),
    icon: Cpu,
    position: {
      x: 20,
      y: 55,
      width: 25,
      height: 25
    },
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
    borderColor: 'rgba(168, 85, 247, 0.8)',
    zIndex: ZIndexLayers.DIVISION
  },
  {
    id: 'strategy',
    name: t('strategyDivision'),
    icon: Database,
    position: {
      x: 55,
      y: 55,
      width: 25,
      height: 25
    },
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderColor: 'rgba(59, 130, 246, 0.8)',
    zIndex: ZIndexLayers.DIVISION
  }
];

// Default/initial positions for divisions to allow reset functionality
export const defaultDivisionPositions = {
  kb: { x: 20, y: 20 },
  analytics: { x: 55, y: 20 },
  operations: { x: 20, y: 55 },
  strategy: { x: 55, y: 55 }
};
