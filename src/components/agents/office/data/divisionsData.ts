
import { Book, Database, BarChart3, Coffee, TestTube, Cpu } from 'lucide-react';
import { Division } from '../types/officeTypes';

export const getDivisions = (t): Division[] => [
  {
    id: 'kb',
    name: t('knowledgeBase'),
    icon: Book,
    position: {
      x: 15,
      y: 20,
      width: 28,
      height: 25
    },
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderColor: 'rgba(99, 102, 241, 0.5)'
  },
  {
    id: 'analytics',
    name: t('analyticsDivision'),
    icon: BarChart3,
    position: {
      x: 55,
      y: 20,
      width: 28,
      height: 25
    },
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
    borderColor: 'rgba(234, 179, 8, 0.5)'
  },
  {
    id: 'operations',
    name: t('operationsDivision'),
    icon: Cpu,
    position: {
      x: 15,
      y: 55,
      width: 28,
      height: 25
    },
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    borderColor: 'rgba(168, 85, 247, 0.5)'
  },
  {
    id: 'strategy',
    name: t('strategyDivision'),
    icon: Database,
    position: {
      x: 55,
      y: 55,
      width: 28,
      height: 25
    },
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.5)'
  },
  {
    id: 'research',
    name: t('researchDivision'),
    icon: TestTube,
    position: {
      x: 35,
      y: 37.5,
      width: 20,
      height: 25
    },
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: 'rgba(34, 197, 94, 0.5)'
  },
  {
    id: 'lounge',
    name: t('agentLounge'),
    icon: Coffee,
    position: {
      x: 87,
      y: 37.5,
      width: 13,
      height: 25
    },
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.5)'
  }
];
