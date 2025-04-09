
import { DivisionStyle } from '../types/officeTypes';

// Color mapping for different divisions
export const getDivisionColors = (divisionId: string): DivisionStyle => {
  const divisionStyles: Record<string, DivisionStyle> = {
    kb: {
      bg: 'bg-blue-500/20',
      border: 'border-blue-500/50',
      shadow: 'shadow-blue-500/20',
      text: 'text-blue-500',
      glow: 'rgba(59, 130, 246, 0.4)',
      pattern: 'bg-gradient-to-br from-blue-500/10 to-blue-700/10'
    },
    analytics: {
      bg: 'bg-purple-500/20',
      border: 'border-purple-500/50',
      shadow: 'shadow-purple-500/20',
      text: 'text-purple-500',
      glow: 'rgba(168, 85, 247, 0.4)',
      pattern: 'bg-gradient-to-br from-purple-500/10 to-purple-700/10'
    },
    strategy: {
      bg: 'bg-green-500/20',
      border: 'border-green-500/50',
      shadow: 'shadow-green-500/20',
      text: 'text-green-500',
      glow: 'rgba(34, 197, 94, 0.4)',
      pattern: 'bg-gradient-to-br from-green-500/10 to-green-700/10'
    },
    operations: {
      bg: 'bg-amber-500/20',
      border: 'border-amber-500/50',
      shadow: 'shadow-amber-500/20',
      text: 'text-amber-500',
      glow: 'rgba(245, 158, 11, 0.4)',
      pattern: 'bg-gradient-to-br from-amber-500/10 to-amber-700/10'
    },
    research: {
      bg: 'bg-cyan-500/20',
      border: 'border-cyan-500/50',
      shadow: 'shadow-cyan-500/20',
      text: 'text-cyan-500',
      glow: 'rgba(6, 182, 212, 0.4)',
      pattern: 'bg-gradient-to-br from-cyan-500/10 to-cyan-700/10'
    },
    lounge: {
      bg: 'bg-pink-500/20',      // Changed from security/red to pink for lounge
      border: 'border-pink-500/50',
      shadow: 'shadow-pink-500/20',
      text: 'text-pink-500',
      glow: 'rgba(236, 72, 153, 0.4)',
      pattern: 'bg-gradient-to-br from-pink-500/10 to-pink-700/10'
    }
  };
  
  // Return the style for the specified division or default to flow accent color
  return divisionStyles[divisionId] || {
    bg: 'bg-flow-accent/20',
    border: 'border-flow-accent/50',
    shadow: 'shadow-flow-accent/20',
    text: 'text-flow-accent',
    glow: 'rgba(99, 102, 241, 0.4)',
    pattern: 'bg-gradient-to-br from-flow-accent/10 to-indigo-700/10'
  };
};

export const getDivisionStyle = (id: string) => {
  return getDivisionColors(id);
};

// Get hover style for a division
export const getHoverStyle = (divisionId: string) => {
  const colors = getDivisionColors(divisionId);
  return {
    bg: colors.bg.replace('/20', '/30'),
    border: colors.border.replace('/50', '/70'),
    shadow: `0 0 15px ${colors.glow}`
  };
};

// Get selected style for a division
export const getSelectedStyle = (divisionId: string) => {
  const colors = getDivisionColors(divisionId);
  return {
    bg: colors.bg.replace('/20', '/40'),
    border: colors.border.replace('/50', '/90'),
    shadow: `0 0 25px ${colors.glow}`,
    pattern: colors.pattern
  };
};
