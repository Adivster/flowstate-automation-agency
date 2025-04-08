
import { Division } from '../types/officeTypes';
import { divisionColors, ColorScheme } from '@/utils/colorSystem';

// Get division style based on division ID
export const getDivisionStyle = (divisionId: string): ColorScheme => {
  return divisionColors[divisionId] || divisionColors.kb;
};

// Generate default decorations for divisions based on their ID
export const getDefaultDecorations = (divisionId: string) => {
  switch(divisionId) {
    case 'kb':
      return [
        { type: 'boards', x: 30, y: 40 },
        { type: 'computer', x: 70, y: 60 },
        { type: 'light', x: 50, y: 20 }
      ];
    case 'analytics':
      return [
        { type: 'chart', x: 30, y: 40 },
        { type: 'computer', x: 70, y: 60 },
        { type: 'light', x: 50, y: 20 }
      ];
    case 'operations':
      return [
        { type: 'server', x: 30, y: 40 },
        { type: 'monitor', x: 70, y: 60 },
        { type: 'light', x: 50, y: 20 }
      ];
    case 'strategy':
      return [
        { type: 'boards', x: 30, y: 40 },
        { type: 'desk', x: 70, y: 60 },
        { type: 'light', x: 50, y: 20 }
      ];
    case 'research':
      return [
        { type: 'monitor', x: 30, y: 40 },
        { type: 'plant', x: 70, y: 60 },
        { type: 'light', x: 50, y: 20 }
      ];
    case 'lounge':
      return [
        { type: 'coffee', x: 30, y: 40 },
        { type: 'sofa', x: 70, y: 60 },
        { type: 'light', x: 50, y: 20 }
      ];
    default:
      return [];
  }
};

// Enhanced glow effect for divisions
export const getDivisionGlow = (divisionId: string, isSelected: boolean, isPulsing: boolean) => {
  const style = getDivisionStyle(divisionId);
  
  if (isSelected) {
    return `0 0 30px ${style.glow}, inset 0 0 20px ${style.glow}`;
  } else if (isPulsing) {
    return `0 0 20px ${style.glow}`;
  }
  return 'none';
};

// Default positioning for divisions to create a balanced layout
export const defaultDivisionPositions = {
  kb: { x: 20, y: 20 },
  analytics: { x: 55, y: 20 },
  operations: { x: 20, y: 55 },
  strategy: { x: 55, y: 55 },
  research: { x: 38, y: 38 },
  lounge: { x: 70, y: 38 }
};

// Function to calculate the position of any child elements within a division
export const calculateChildPosition = (parentX: number, parentY: number, childRelativeX: number, childRelativeY: number) => {
  return {
    x: parentX + (childRelativeX / 100),
    y: parentY + (childRelativeY / 100)
  };
};
