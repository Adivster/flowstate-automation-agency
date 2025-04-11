
// Color system for standardizing colors across the application
// Each division has a consistent color scheme used for all related elements

export type ColorScheme = {
  primary: string;   // Main color 
  secondary: string; // Lighter variant
  border: string;    // Border color
  text: string;      // Text color
  bg: string;        // Background color
  shadow: string;    // Shadow color
  glow: string;      // Glow effect color
  pattern?: string;  // Optional background pattern
};

// Division color schemes - used across the application for consistency
export const divisionColors: Record<string, ColorScheme> = {
  kb: { 
    primary: '#6366f1',
    secondary: '#818cf8',
    border: 'rgba(99, 102, 241, 0.8)',
    text: '#6366f1',
    bg: 'rgba(99, 102, 241, 0.15)',
    shadow: '0 0 30px rgba(99, 102, 241, 0.8)',
    glow: 'rgba(99, 102, 241, 0.6)',
    pattern: 'radial-gradient(circle at 75% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 45%)'
  },
  analytics: { 
    primary: '#eab308',
    secondary: '#facc15',
    border: 'rgba(234, 179, 8, 0.8)',
    text: '#eab308',
    bg: 'rgba(234, 179, 8, 0.15)',
    shadow: '0 0 30px rgba(234, 179, 8, 0.8)',
    glow: 'rgba(234, 179, 8, 0.6)',
    pattern: 'radial-gradient(circle at 75% 30%, rgba(234, 179, 8, 0.15) 0%, transparent 45%)'
  },
  operations: { 
    primary: '#a855f7',
    secondary: '#c084fc',
    border: 'rgba(168, 85, 247, 0.8)',
    text: '#a855f7',
    bg: 'rgba(168, 85, 247, 0.15)',
    shadow: '0 0 30px rgba(168, 85, 247, 0.8)',
    glow: 'rgba(168, 85, 247, 0.6)',
    pattern: 'radial-gradient(circle at 75% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 45%)'
  },
  strategy: { 
    primary: '#22c55e',
    secondary: '#4ade80',
    border: 'rgba(34, 197, 94, 0.8)',
    text: '#22c55e',
    bg: 'rgba(34, 197, 94, 0.15)',
    shadow: '0 0 30px rgba(34, 197, 94, 0.8)',
    glow: 'rgba(34, 197, 94, 0.6)',
    pattern: 'radial-gradient(circle at 75% 30%, rgba(34, 197, 94, 0.15) 0%, transparent 45%)'
  },
  research: { 
    primary: '#22c55e',
    secondary: '#4ade80',
    border: 'rgba(34, 197, 94, 0.8)',
    text: '#22c55e',
    bg: 'rgba(34, 197, 94, 0.15)',
    shadow: '0 0 30px rgba(34, 197, 94, 0.8)',
    glow: 'rgba(34, 197, 94, 0.6)',
    pattern: 'radial-gradient(circle at 75% 30%, rgba(34, 197, 94, 0.15) 0%, transparent 45%)'
  },
  lounge: { 
    primary: '#f59e0b',
    secondary: '#fbbf24',
    border: 'rgba(245, 158, 11, 0.8)',
    text: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.15)',
    shadow: '0 0 30px rgba(245, 158, 11, 0.8)',
    glow: 'rgba(245, 158, 11, 0.6)',
    pattern: 'radial-gradient(circle at 75% 30%, rgba(245, 158, 11, 0.15) 0%, transparent 45%)'
  }
};

// Additional task color schemes
export const taskColors = {
  high: { bg: 'bg-red-100', text: 'text-red-800', darkBg: 'dark:bg-red-900/30', darkText: 'dark:text-red-400' },
  medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', darkBg: 'dark:bg-yellow-900/30', darkText: 'dark:text-yellow-400' },
  low: { bg: 'bg-green-100', text: 'text-green-800', darkBg: 'dark:bg-green-900/30', darkText: 'dark:text-green-400' }
};

// Status color schemes
export const statusColors = {
  working: { 
    bg: 'bg-green-100', 
    text: 'text-green-800', 
    lightBg: 'bg-green-500/10',
    border: 'border-green-500/30',
    glow: 'shadow-[0_0_10px_rgba(34,197,94,0.4)]',
    icon: 'text-green-500',
    indicator: 'bg-green-500'
  },
  idle: { 
    bg: 'bg-gray-100', 
    text: 'text-gray-800', 
    lightBg: 'bg-gray-500/10',
    border: 'border-gray-500/30',
    glow: 'shadow-[0_0_10px_rgba(160,160,160,0.4)]',
    icon: 'text-gray-500',
    indicator: 'bg-gray-400'
  },
  paused: { 
    bg: 'bg-yellow-100', 
    text: 'text-yellow-800', 
    lightBg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    glow: 'shadow-[0_0_10px_rgba(234,179,8,0.4)]',
    icon: 'text-yellow-500',
    indicator: 'bg-yellow-500'
  },
  error: { 
    bg: 'bg-red-100', 
    text: 'text-red-800', 
    lightBg: 'bg-red-500/10',
    border: 'border-red-500/30',
    glow: 'shadow-[0_0_10px_rgba(239,68,68,0.4)]',
    icon: 'text-red-500',
    indicator: 'bg-red-500'
  }
};

// Return color scheme for a division
export const getDivisionColorScheme = (divisionId: string): ColorScheme => {
  return divisionColors[divisionId] || divisionColors.kb;
};

// Get division style based on division ID - adding the missing function
export const getDivisionStyle = (divisionId: string): ColorScheme => {
  return divisionColors[divisionId] || divisionColors.kb;
};

// Get task color classes based on priority
export const getTaskColorClasses = (priority: string) => {
  const colors = taskColors[priority.toLowerCase() as keyof typeof taskColors] || taskColors.medium;
  return `${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText}`;
};

// Get status color classes based on status
export const getStatusColorClasses = (status: string) => {
  const colors = statusColors[status.toLowerCase() as keyof typeof statusColors] || statusColors.idle;
  return {
    badge: `${colors.bg} ${colors.text}`,
    background: colors.lightBg,
    iconColor: colors.icon,
    indicator: colors.indicator,
    glow: colors.glow,
    border: colors.border
  };
};
