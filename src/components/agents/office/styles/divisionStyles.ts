
import { Division } from '../types/officeTypes';

// Vibrant cyberpunk color schemes for divisions
export const divisionStyles = {
  kb: { 
    bg: 'rgba(99, 102, 241, 0.15)', 
    border: '#6366f1',
    shadow: '0 0 30px rgba(99, 102, 241, 0.8)',
    text: '#6366f1',
    glow: 'rgba(99, 102, 241, 0.6)',
    pattern: 'radial-gradient(circle at 75% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 45%)'
  },
  analytics: { 
    bg: 'rgba(234, 179, 8, 0.15)', 
    border: '#eab308',
    shadow: '0 0 30px rgba(234, 179, 8, 0.8)',
    text: '#eab308',
    glow: 'rgba(234, 179, 8, 0.6)',
    pattern: 'radial-gradient(circle at 75% 30%, rgba(234, 179, 8, 0.15) 0%, transparent 45%)'
  },
  operations: { 
    bg: 'rgba(168, 85, 247, 0.15)', 
    border: '#a855f7',
    shadow: '0 0 30px rgba(168, 85, 247, 0.8)',
    text: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.6)',
    pattern: 'radial-gradient(circle at 75% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 45%)'
  },
  strategy: { 
    bg: 'rgba(59, 130, 246, 0.15)', 
    border: '#3b82f6',
    shadow: '0 0 30px rgba(59, 130, 246, 0.8)',
    text: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.6)',
    pattern: 'radial-gradient(circle at 75% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 45%)'
  },
  research: { 
    bg: 'rgba(34, 197, 94, 0.15)', 
    border: '#22c55e',
    shadow: '0 0 30px rgba(34, 197, 94, 0.8)',
    text: '#22c55e',
    glow: 'rgba(34, 197, 94, 0.6)',
    pattern: 'radial-gradient(circle at 75% 30%, rgba(34, 197, 94, 0.15) 0%, transparent 45%)'
  },
  lounge: { 
    bg: 'rgba(245, 158, 11, 0.15)', 
    border: '#f59e0b',
    shadow: '0 0 30px rgba(245, 158, 11, 0.8)',
    text: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.6)',
    pattern: 'radial-gradient(circle at 75% 30%, rgba(245, 158, 11, 0.15) 0%, transparent 45%)'
  }
};

// Get division style based on division ID
export const getDivisionStyle = (divisionId: string) => {
  return divisionStyles[divisionId] || divisionStyles.kb;
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
  analytics: { x: 60, y: 20 },
  operations: { x: 20, y: 55 },
  strategy: { x: 60, y: 55 },
  research: { x: 40, y: 37 },
  lounge: { x: 85, y: 37 }
};

// Function to calculate the position of any child elements within a division
export const calculateChildPosition = (parentX: number, parentY: number, childRelativeX: number, childRelativeY: number) => {
  return {
    x: parentX + (childRelativeX / 100),
    y: parentY + (childRelativeY / 100)
  };
};
