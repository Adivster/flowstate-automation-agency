
import { WorkstationData } from '../types/officeTypes';

export const workstations: WorkstationData[] = [
  // Knowledge Base workstations
  { x: 18, y: 24, width: 4, height: 4, type: 'knowledge' },
  { x: 24, y: 28, width: 4, height: 4, type: 'knowledge' },
  
  // Analytics workstations
  { x: 58, y: 24, width: 4, height: 4, type: 'analytics' },
  { x: 64, y: 28, width: 4, height: 4, type: 'analytics' },
  
  // Operations workstations
  { x: 18, y: 64, width: 4, height: 4, type: 'operations' },
  { x: 24, y: 68, width: 4, height: 4, type: 'operations' },
  
  // Strategy workstations
  { x: 58, y: 64, width: 4, height: 4, type: 'strategy' },
  { x: 64, y: 68, width: 4, height: 4, type: 'strategy' },
  { x: 61, y: 71, width: 4, height: 4, type: 'strategy' },
  
  // Research workstation - positioned within the research division
  { x: 38, y: 42, width: 4, height: 4, type: 'research' },
  { x: 42, y: 46, width: 4, height: 4, type: 'research' },
  
  // Lounge workstations - moved further right
  { x: 90, y: 42, width: 4, height: 4, type: 'lounge' },
  { x: 92, y: 46, width: 4, height: 4, type: 'lounge' },
];
