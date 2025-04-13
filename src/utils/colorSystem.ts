
// Color utility for managing division and status colors consistently

export interface ColorScheme {
  primary: string;
  secondary: string;
  border: string;
  text: string;
  bg: string;
  accentLight: string;
  accentDark: string;
}

// Status colors (used for agent status indicators)
export const statusColors = {
  working: {
    bg: 'bg-green-500',
    text: 'text-green-500',
    border: 'border-green-500',
  },
  paused: {
    bg: 'bg-amber-500',
    text: 'text-amber-500',
    border: 'border-amber-500',
  },
  error: {
    bg: 'bg-red-500',
    text: 'text-red-500',
    border: 'border-red-500',
  },
  idle: {
    bg: 'bg-blue-500',
    text: 'text-blue-500',
    border: 'border-blue-500',
  },
  default: {
    bg: 'bg-gray-500',
    text: 'text-gray-500',
    border: 'border-gray-500',
  }
};

// Division color schemes
const divisionColorSchemes: Record<string, ColorScheme> = {
  kb: { // Knowledge Base Division
    primary: 'bg-blue-500',
    secondary: 'bg-blue-400',
    border: 'border-blue-500',
    text: 'text-blue-500',
    bg: 'bg-blue-500/70',
    accentLight: 'bg-blue-300',
    accentDark: 'bg-blue-700',
  },
  analytics: { // Analytics Division
    primary: 'bg-purple-500',
    secondary: 'bg-purple-400',
    border: 'border-purple-500',
    text: 'text-purple-500',
    bg: 'bg-purple-500/70',
    accentLight: 'bg-purple-300',
    accentDark: 'bg-purple-700',
  },
  operations: { // Operations Division
    primary: 'bg-green-500',
    secondary: 'bg-green-400',
    border: 'border-green-500',
    text: 'text-green-500',
    bg: 'bg-green-500/70',
    accentLight: 'bg-green-300',
    accentDark: 'bg-green-700',
  },
  strategy: { // Strategy Division
    primary: 'bg-amber-500',
    secondary: 'bg-amber-400',
    border: 'border-amber-500',
    text: 'text-amber-500',
    bg: 'bg-amber-500/70',
    accentLight: 'bg-amber-300',
    accentDark: 'bg-amber-700',
  },
  development: { // Development Division
    primary: 'bg-pink-500',
    secondary: 'bg-pink-400',
    border: 'border-pink-500',
    text: 'text-pink-500',
    bg: 'bg-pink-500/70',
    accentLight: 'bg-pink-300',
    accentDark: 'bg-pink-700',
  },
  security: { // Security Division
    primary: 'bg-red-500',
    secondary: 'bg-red-400',
    border: 'border-red-500',
    text: 'text-red-500',
    bg: 'bg-red-500/70',
    accentLight: 'bg-red-300',
    accentDark: 'bg-red-700',
  }
};

// Get color scheme for a specific division
export const getDivisionColorScheme = (divisionId: string): ColorScheme => {
  return divisionColorSchemes[divisionId] || divisionColorSchemes.kb;
};

// Get hex color values for division
export const getDivisionHexColors = (divisionId: string): Record<string, string> => {
  const colorMap: Record<string, string> = {
    kb: '#3b82f6',
    analytics: '#8b5cf6',
    operations: '#22c55e',
    strategy: '#f59e0b', 
    development: '#ec4899',
    security: '#ef4444',
  };
  
  return {
    primary: colorMap[divisionId] || colorMap.kb,
    shadow: `${colorMap[divisionId] || colorMap.kb}40`
  };
};
