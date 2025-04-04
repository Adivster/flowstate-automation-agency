
import { DecorativeElement } from '../types/officeTypes';

// Office decoration elements (plants, furniture, etc.)
export const decorations: DecorativeElement[] = [
  // Knowledge Base Division
  {
    type: 'bookshelf',
    x: 18,
    y: 25,
    size: 3
  },
  {
    type: 'terminal',
    x: 22,
    y: 30,
    size: 2
  },
  {
    type: 'server',
    x: 26,
    y: 28,
    size: 2.5
  },
  
  // Analytics Division
  {
    type: 'hologram',
    x: 58,
    y: 25,
    size: 3
  },
  {
    type: 'chart',
    x: 62,
    y: 30,
    size: 2.5
  },
  {
    type: 'dashboard',
    x: 66,
    y: 28,
    size: 2.5
  },
  
  // Operations Division
  {
    type: 'drone',
    x: 18,
    y: 60,
    size: 2
  },
  {
    type: 'robot',
    x: 22,
    y: 65,
    size: 2.5
  },
  {
    type: 'securityPanel',
    x: 26,
    y: 62,
    size: 2
  },
  
  // Strategy Division
  {
    type: 'map',
    x: 58,
    y: 60,
    size: 3
  },
  {
    type: 'holomap',
    x: 62,
    y: 65,
    size: 2.5
  },
  {
    type: 'board',
    x: 66,
    y: 62,
    size: 2.5
  },
  
  // Research Division
  {
    type: 'lab',
    x: 40,
    y: 42,
    size: 3
  },
  {
    type: 'microscope',
    x: 38,
    y: 45,
    size: 2
  },
  {
    type: 'prototype',
    x: 42,
    y: 45,
    size: 2.5
  },
  
  // Lounge Division - moved further right
  {
    type: 'coffeeBar',
    x: 90,
    y: 42,
    size: 3
  },
  {
    type: 'lounge',
    x: 92,
    y: 45,
    size: 2.5
  },
  {
    type: 'arcade',
    x: 91,
    y: 48,
    size: 2
  }
];

// Holographic elements for the office
export const holograms: DecorativeElement[] = [
  {
    type: 'dataFlow',
    x: 45,
    y: 25,
    size: 2.5
  },
  {
    type: 'analytics',
    x: 75,
    y: 45,
    size: 2
  },
  {
    type: 'network',
    x: 35,
    y: 65,
    size: 2.5
  }
];
