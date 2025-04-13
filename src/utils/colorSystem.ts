
// Color utility for managing division and status colors consistently

export interface ColorScheme {
  primary: string;
  secondary: string;
  border: string;
  text: string;
  bg: string;
  accentLight: string;
  accentDark: string;
  glow: string; // Added for shadow effects
  pattern: string; // Added for background patterns
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
    glow: 'rgba(59, 130, 246, 0.3)',
    pattern: 'bg-gradient-to-br from-blue-500/10 to-blue-700/10'
  },
  analytics: { // Analytics Division
    primary: 'bg-purple-500',
    secondary: 'bg-purple-400',
    border: 'border-purple-500',
    text: 'text-purple-500',
    bg: 'bg-purple-500/70',
    accentLight: 'bg-purple-300',
    accentDark: 'bg-purple-700',
    glow: 'rgba(168, 85, 247, 0.3)',
    pattern: 'bg-gradient-to-br from-purple-500/10 to-purple-700/10'
  },
  operations: { // Operations Division
    primary: 'bg-green-500',
    secondary: 'bg-green-400',
    border: 'border-green-500',
    text: 'text-green-500',
    bg: 'bg-green-500/70',
    accentLight: 'bg-green-300',
    accentDark: 'bg-green-700',
    glow: 'rgba(34, 197, 94, 0.3)',
    pattern: 'bg-gradient-to-br from-green-500/10 to-green-700/10'
  },
  strategy: { // Strategy Division
    primary: 'bg-amber-500',
    secondary: 'bg-amber-400',
    border: 'border-amber-500',
    text: 'text-amber-500',
    bg: 'bg-amber-500/70',
    accentLight: 'bg-amber-300',
    accentDark: 'bg-amber-700',
    glow: 'rgba(245, 158, 11, 0.3)',
    pattern: 'bg-gradient-to-br from-amber-500/10 to-amber-700/10'
  },
  development: { // Development Division
    primary: 'bg-pink-500',
    secondary: 'bg-pink-400',
    border: 'border-pink-500',
    text: 'text-pink-500',
    bg: 'bg-pink-500/70',
    accentLight: 'bg-pink-300',
    accentDark: 'bg-pink-700',
    glow: 'rgba(236, 72, 153, 0.3)',
    pattern: 'bg-gradient-to-br from-pink-500/10 to-pink-700/10'
  },
  security: { // Security Division
    primary: 'bg-red-500',
    secondary: 'bg-red-400',
    border: 'border-red-500',
    text: 'text-red-500',
    bg: 'bg-red-500/70',
    accentLight: 'bg-red-300',
    accentDark: 'bg-red-700',
    glow: 'rgba(239, 68, 68, 0.3)',
    pattern: 'bg-gradient-to-br from-red-500/10 to-red-700/10'
  },
  research: { // Research Division
    primary: 'bg-cyan-500',
    secondary: 'bg-cyan-400',
    border: 'border-cyan-500',
    text: 'text-cyan-500',
    bg: 'bg-cyan-500/70',
    accentLight: 'bg-cyan-300',
    accentDark: 'bg-cyan-700',
    glow: 'rgba(6, 182, 212, 0.3)',
    pattern: 'bg-gradient-to-br from-cyan-500/10 to-cyan-700/10'
  },
  lounge: { // Lounge Division
    primary: 'bg-orange-500',
    secondary: 'bg-orange-400',
    border: 'border-orange-500',
    text: 'text-orange-500',
    bg: 'bg-orange-500/70',
    accentLight: 'bg-orange-300',
    accentDark: 'bg-orange-700',
    glow: 'rgba(249, 115, 22, 0.3)',
    pattern: 'bg-gradient-to-br from-orange-500/10 to-orange-700/10'
  }
};

// Export divisionColors for use in other files
export const divisionColors = {
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
  operations: {
    bg: 'bg-green-500/20',
    border: 'border-green-500/50',
    shadow: 'shadow-green-500/20',
    text: 'text-green-500',
    glow: 'rgba(34, 197, 94, 0.4)',
    pattern: 'bg-gradient-to-br from-green-500/10 to-green-700/10'
  },
  strategy: {
    bg: 'bg-amber-500/20',
    border: 'border-amber-500/50',
    shadow: 'shadow-amber-500/20',
    text: 'text-amber-500',
    glow: 'rgba(245, 158, 11, 0.4)',
    pattern: 'bg-gradient-to-br from-amber-500/10 to-amber-700/10'
  }
};

// Status color utility functions
export const getStatusColorClasses = (status: string) => {
  const colors = statusColors[status] || statusColors.default;
  return {
    badge: colors.bg.replace('bg-', 'bg-opacity-20 text-'),
    background: colors.bg.replace('bg-', 'bg-opacity-10 '),
    indicator: colors.bg
  };
};

// Task color utility functions - for priority levels
export const getTaskColorClasses = (priority: string) => {
  switch(priority.toLowerCase()) {
    case 'high':
      return 'bg-red-500/20 text-red-500';
    case 'medium':
      return 'bg-amber-500/20 text-amber-500';
    case 'low':
      return 'bg-blue-500/20 text-blue-500';
    default:
      return 'bg-gray-500/20 text-gray-500';
  }
};

// Get color scheme for a specific division
export const getDivisionColorScheme = (divisionId: string): ColorScheme => {
  return divisionColorSchemes[divisionId] || divisionColorSchemes.kb;
};

// Map for division style utility function
export const getDivisionStyle = (id: string) => {
  return getDivisionColors(id);
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
    research: '#06b6d4',
    lounge: '#f97316'
  };
  
  return {
    primary: colorMap[divisionId] || colorMap.kb,
    shadow: `${colorMap[divisionId] || colorMap.kb}40`
  };
};

// Division color mapping utility (used by office components)
export const getDivisionColors = (divisionId: string) => {
  return divisionColors[divisionId] || {
    bg: 'bg-flow-accent/20',
    border: 'border-flow-accent/50',
    shadow: 'shadow-flow-accent/20',
    text: 'text-flow-accent',
    glow: 'rgba(99, 102, 241, 0.4)',
    pattern: 'bg-gradient-to-br from-flow-accent/10 to-indigo-700/10'
  };
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
