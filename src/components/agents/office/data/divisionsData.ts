
import { Book, Database, BarChart3, Cpu } from 'lucide-react';
import { Division, ZIndexLayers } from '../types/officeTypes';
import { divisionColors } from '@/utils/colorSystem';

export const getDivisions = (t): Division[] => [
  {
    id: 'kb',
    name: t('knowledgeBase'),
    icon: Book,
    position: {
      x: 10,
      y: 15,
      width: 30,
      height: 30
    },
    backgroundColor: divisionColors.kb.bg,
    borderColor: divisionColors.kb.border,
    textColor: divisionColors.kb.text || '#FFFFFF', // Adding the missing textColor property
    zIndex: ZIndexLayers.DIVISION
  },
  {
    id: 'analytics',
    name: t('analyticsDivision'),
    icon: BarChart3,
    position: {
      x: 60,
      y: 15,
      width: 30,
      height: 30
    },
    backgroundColor: divisionColors.analytics.bg,
    borderColor: divisionColors.analytics.border,
    textColor: divisionColors.analytics.text || '#FFFFFF', // Adding the missing textColor property
    zIndex: ZIndexLayers.DIVISION
  },
  {
    id: 'operations',
    name: t('operationsDivision'),
    icon: Cpu,
    position: {
      x: 10,
      y: 55,
      width: 30,
      height: 30
    },
    backgroundColor: divisionColors.operations.bg,
    borderColor: divisionColors.operations.border,
    textColor: divisionColors.operations.text || '#FFFFFF', // Adding the missing textColor property
    zIndex: ZIndexLayers.DIVISION
  },
  {
    id: 'strategy',
    name: t('strategyDivision'),
    icon: Database,
    position: {
      x: 60,
      y: 55,
      width: 30,
      height: 30
    },
    backgroundColor: divisionColors.strategy.bg,
    borderColor: divisionColors.strategy.border,
    textColor: divisionColors.strategy.text || '#FFFFFF', // Adding the missing textColor property
    zIndex: ZIndexLayers.DIVISION
  }
];

// Default/initial positions for divisions to allow reset functionality
export const defaultDivisionPositions = {
  kb: { x: 10, y: 15 },
  analytics: { x: 60, y: 15 },
  operations: { x: 10, y: 55 },
  strategy: { x: 60, y: 55 }
};
