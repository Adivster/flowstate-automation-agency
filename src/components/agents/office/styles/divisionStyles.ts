
import { Division } from '../types/officeTypes';

// Enhanced cyberpunk color schemes for divisions
export const divisionStyles = {
  kb: { 
    bg: 'rgba(99, 102, 241, 0.10)', 
    border: '#6366f1',
    shadow: '0 0 25px rgba(99, 102, 241, 0.7)',
    text: '#6366f1',
    pattern: 'repeating-linear-gradient(45deg, rgba(99, 102, 241, 0.05) 0px, transparent 1px, transparent 3px)'
  },
  analytics: { 
    bg: 'rgba(234, 179, 8, 0.10)', 
    border: '#eab308',
    shadow: '0 0 25px rgba(234, 179, 8, 0.7)',
    text: '#eab308',
    pattern: 'repeating-linear-gradient(45deg, rgba(234, 179, 8, 0.05) 0px, transparent 1px, transparent 3px)'
  },
  operations: { 
    bg: 'rgba(168, 85, 247, 0.10)', 
    border: '#a855f7',
    shadow: '0 0 25px rgba(168, 85, 247, 0.7)',
    text: '#a855f7',
    pattern: 'repeating-linear-gradient(45deg, rgba(168, 85, 247, 0.05) 0px, transparent 1px, transparent 3px)'
  },
  strategy: { 
    bg: 'rgba(59, 130, 246, 0.10)', 
    border: '#3b82f6',
    shadow: '0 0 25px rgba(59, 130, 246, 0.7)',
    text: '#3b82f6',
    pattern: 'repeating-linear-gradient(45deg, rgba(59, 130, 246, 0.05) 0px, transparent 1px, transparent 3px)'
  },
  research: { 
    bg: 'rgba(34, 197, 94, 0.10)', 
    border: '#22c55e',
    shadow: '0 0 25px rgba(34, 197, 94, 0.7)',
    text: '#22c55e',
    pattern: 'repeating-linear-gradient(45deg, rgba(34, 197, 94, 0.05) 0px, transparent 1px, transparent 3px)'
  },
  lounge: { 
    bg: 'rgba(245, 158, 11, 0.10)', 
    border: '#f59e0b',
    shadow: '0 0 25px rgba(245, 158, 11, 0.7)',
    text: '#f59e0b',
    pattern: 'repeating-linear-gradient(45deg, rgba(245, 158, 11, 0.05) 0px, transparent 1px, transparent 3px)'
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
        { type: 'computer', x: 70, y: 60 }
      ];
    case 'analytics':
      return [
        { type: 'chart', x: 30, y: 40 },
        { type: 'computer', x: 70, y: 60 }
      ];
    case 'operations':
      return [
        { type: 'server', x: 30, y: 40 },
        { type: 'monitor', x: 70, y: 60 }
      ];
    case 'strategy':
      return [
        { type: 'boards', x: 30, y: 40 },
        { type: 'desk', x: 70, y: 60 }
      ];
    case 'research':
      return [
        { type: 'monitor', x: 30, y: 40 },
        { type: 'plant', x: 70, y: 60 }
      ];
    case 'lounge':
      return [
        { type: 'coffee', x: 30, y: 40 },
        { type: 'sofa', x: 70, y: 60 }
      ];
    default:
      return [];
  }
};
