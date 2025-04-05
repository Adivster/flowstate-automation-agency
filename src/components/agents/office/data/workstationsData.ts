
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
  
  // Research workstation
  { x: 38, y: 42, width: 4, height: 4, type: 'research' },
  { x: 42, y: 46, width: 4, height: 4, type: 'research' },
  
  // Lounge workstations 
  { x: 90, y: 42, width: 4, height: 4, type: 'lounge' },
  { x: 92, y: 46, width: 4, height: 4, type: 'lounge' },
];

// Map division IDs to their respective workstation coordinates
// This helps adjust workstation positions when divisions are moved
export const divisionWorkstationOffsets = {
  knowledge: [
    { relX: 3, relY: 4 }, // Relative position from division top-left
    { relX: 9, relY: 8 }
  ],
  analytics: [
    { relX: 3, relY: 4 },
    { relX: 9, relY: 8 }
  ],
  operations: [
    { relX: 3, relY: 9 },
    { relX: 9, relY: 13 }
  ],
  strategy: [
    { relX: 3, relY: 9 },
    { relX: 9, relY: 13 },
    { relX: 6, relY: 16 }
  ],
  research: [
    { relX: 3, relY: 4.5 },
    { relX: 7, relY: 8.5 }
  ],
  lounge: [
    { relX: 3, relY: 4.5 },
    { relX: 5, relY: 8.5 }
  ]
};
