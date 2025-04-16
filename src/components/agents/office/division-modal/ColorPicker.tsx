
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import type { ColorOption } from './types';

interface ColorPickerProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onSelectColor,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const colorOptions: Record<string, ColorOption> = {
    blue: {
      name: 'Blue',
      bg: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(219, 234, 254, 1)',
      border: isDark ? '#3B82F6' : '#3B82F6',
      text: isDark ? '#93C5FD' : '#1D4ED8',
      primary: isDark ? '#3B82F6' : '#2563EB',
      secondary: isDark ? '#1D4ED8' : '#DBEAFE',
    },
    green: {
      name: 'Green',
      bg: isDark ? 'rgba(34, 197, 94, 0.1)' : 'rgba(220, 252, 231, 1)',
      border: isDark ? '#22C55E' : '#22C55E',
      text: isDark ? '#86EFAC' : '#166534',
      primary: isDark ? '#22C55E' : '#16A34A',
      secondary: isDark ? '#166534' : '#DCFCE7',
    },
    emerald: {
      name: 'Emerald',
      bg: isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(209, 250, 229, 1)',
      border: isDark ? '#10B981' : '#10B981',
      text: isDark ? '#6EE7B7' : '#065F46',
      primary: isDark ? '#10B981' : '#059669',
      secondary: isDark ? '#065F46' : '#D1FAE5',
    },
    purple: {
      name: 'Purple',
      bg: isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(237, 233, 254, 1)',
      border: isDark ? '#8B5CF6' : '#8B5CF6',
      text: isDark ? '#C4B5FD' : '#5B21B6',
      primary: isDark ? '#8B5CF6' : '#7C3AED',
      secondary: isDark ? '#5B21B6' : '#EDE9FE',
    },
    amber: {
      name: 'Amber',
      bg: isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(254, 243, 199, 1)',
      border: isDark ? '#F59E0B' : '#F59E0B',
      text: isDark ? '#FCD34D' : '#92400E',
      primary: isDark ? '#F59E0B' : '#D97706',
      secondary: isDark ? '#92400E' : '#FEF3C7',
    },
    red: {
      name: 'Red',
      bg: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(254, 226, 226, 1)',
      border: isDark ? '#EF4444' : '#EF4444',
      text: isDark ? '#FCA5A5' : '#B91C1C',
      primary: isDark ? '#EF4444' : '#DC2626',
      secondary: isDark ? '#B91C1C' : '#FEE2E2',
    },
  };

  return (
    <div className="space-y-2">
      <label className={cn(
        "text-sm font-medium block",
        isDark ? "text-gray-300" : "text-gray-700"
      )}>
        Choose a Color Theme
      </label>
      <div className="flex flex-wrap gap-2">
        {Object.entries(colorOptions).map(([key, color]) => (
          <div
            key={key}
            className={cn(
              "w-8 h-8 rounded-full cursor-pointer",
              selectedColor === key ? "ring-2 ring-offset-2" : ""
            )}
            style={{ 
              backgroundColor: color.primary,
              borderColor: selectedColor === key ? color.border : 'transparent'
            }}
            onClick={() => onSelectColor(key)}
          >
            {selectedColor === key && (
              <Check className="h-5 w-5 text-white mx-auto mt-1.5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
