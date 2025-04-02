
import { WorkstationData } from '../types/officeTypes';

export const workstations: WorkstationData[] = [
  // Knowledge Base workstations
  { x: 20, y: 20, width: 4, height: 4, type: 'knowledge' },
  { x: 25, y: 25, width: 4, height: 4, type: 'knowledge' },
  
  // Analytics workstations
  { x: 70, y: 20, width: 4, height: 4, type: 'analytics' },
  { x: 75, y: 25, width: 4, height: 4, type: 'analytics' },
  
  // Operations workstations
  { x: 20, y: 70, width: 4, height: 4, type: 'operations' },
  { x: 25, y: 75, width: 4, height: 4, type: 'operations' },
  
  // Strategy workstations
  { x: 70, y: 70, width: 4, height: 4, type: 'strategy' },
  { x: 75, y: 75, width: 4, height: 4, type: 'strategy' },
  { x: 70, y: 80, width: 4, height: 4, type: 'strategy' },
  
  // Research workstation - positioned within the research division
  { x: 45, y: 45, width: 4, height: 4, type: 'research' },
  { x: 50, y: 50, width: 4, height: 4, type: 'research' },
];
