
import { WorkstationData } from '../types/officeTypes';

export const workstations: WorkstationData[] = [
  // Knowledge Base workstations
  { x: 30, y: 25, width: 4, height: 4, type: 'knowledge' },
  { x: 28, y: 27, width: 4, height: 4, type: 'knowledge' },
  
  // Analytics workstations
  { x: 60, y: 25, width: 4, height: 4, type: 'analytics' },
  { x: 58, y: 28, width: 4, height: 4, type: 'analytics' },
  
  // Operations workstations
  { x: 35, y: 60, width: 4, height: 4, type: 'operations' },
  { x: 32, y: 57, width: 4, height: 4, type: 'operations' },
  
  // Strategy workstations
  { x: 65, y: 65, width: 4, height: 4, type: 'strategy' },
  { x: 63, y: 62, width: 4, height: 4, type: 'strategy' },
  { x: 67, y: 70, width: 4, height: 4, type: 'strategy' },
  
  // Research workstation
  { x: 45, y: 42, width: 4, height: 4, type: 'research' },
];
