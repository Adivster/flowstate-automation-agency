
import { DecorationData, HologramData } from '../types/officeTypes';

export const decorations: DecorationData[] = [
  // Plants for decoration
  { type: 'plant', x: 15, y: 30, size: 'small' },
  { type: 'plant', x: 85, y: 70, size: 'medium' },
  { type: 'plant', x: 20, y: 80, size: 'large' },
  { type: 'plant', x: 80, y: 20, size: 'small' },
  
  // Sculptures and art
  { type: 'sculpture', x: 85, y: 50, size: 'medium' },
  { type: 'painting', x: 50, y: 10, size: 'large' },
  { type: 'painting', x: 15, y: 45, size: 'medium' },
  
  // Lounge furniture
  { type: 'sofa', x: 83, y: 45, size: 'large' },
  { type: 'coffee-table', x: 83, y: 48, size: 'medium' },
  
  // Meeting areas
  { type: 'meeting-pod', x: 75, y: 80, size: 'large' },
  { type: 'meeting-pod', x: 25, y: 10, size: 'large' },
];

export const holograms: HologramData[] = [
  { type: 'earth', x: 75, y: 25, size: 'medium' },
  { type: 'circuit', x: 15, y: 70, size: 'small' },
  { type: 'data-stream', x: 50, y: 75, size: 'large' },
  { type: 'code', x: 25, y: 45, size: 'small' },
  { type: 'network', x: 60, y: 15, size: 'medium' },
  { type: 'brain', x: 40, y: 30, size: 'medium' },
];
