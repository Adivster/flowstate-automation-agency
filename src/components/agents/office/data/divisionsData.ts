
import { Book, Database, BarChart3, Coffee, TestTube, Cpu } from 'lucide-react';
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
    zIndex: ZIndexLayers.DIVISION
  },
  {
    id: 'research',
    name: t('researchDivision'),
    icon: TestTube,
    position: {
      x: 35,
      y: 75,  // Moved research division down
      width: 30,
      height: 30
    },
    backgroundColor: divisionColors.research.bg,
    borderColor: divisionColors.research.border,
    zIndex: ZIndexLayers.DIVISION
  },
  {
    id: 'lounge',
    name: t('agentLounge'),
    icon: Coffee,
    position: {
      x: 70,
      y: 75,  // Moved agent lounge to bottom right
      width: 20,
      height: 30
    },
    backgroundColor: divisionColors.lounge.bg,
    borderColor: divisionColors.lounge.border,
    zIndex: ZIndexLayers.DIVISION
  }
];

// Default/initial positions for divisions to allow reset functionality
export const defaultDivisionPositions = {
  kb: { x: 10, y: 15 },
  analytics: { x: 60, y: 15 },
  operations: { x: 10, y: 55 },
  strategy: { x: 60, y: 55 },
  research: { x: 35, y: 75 }, // Updated position
  lounge: { x: 70, y: 75 }    // Updated position
};
