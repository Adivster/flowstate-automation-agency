
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface IconSelectorProps {
  selectedIcon: keyof typeof LucideIcons;
  selectedColor: string;
  onSelectIcon: (icon: keyof typeof LucideIcons) => void;
}

const commonIcons = [
  'Building2', 'BarChart', 'BookOpen', 'Database', 'Server',
  'ShieldCheck', 'Users', 'Briefcase', 'Brain', 'Lightbulb',
  'Settings', 'LineChart', 'HeartPulse', 'Gauge', 'Bot',
  'Cpu', 'Search', 'Code', 'Network', 'Laptop'
] as const;

export const IconSelector: React.FC<IconSelectorProps> = ({
  selectedIcon,
  selectedColor,
  onSelectIcon,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const renderIcon = (iconKey: keyof typeof LucideIcons, className: string) => {
    const IconComponent = LucideIcons[iconKey] as React.ElementType;
    return <IconComponent className={className} />;
  };

  return (
    <div className="space-y-2">
      <label className={cn(
        "text-sm font-medium block",
        isDark ? "text-gray-300" : "text-gray-700"
      )}>
        Choose an Icon
      </label>
      <div className={cn(
        "grid grid-cols-6 gap-2 p-2 rounded-lg",
        isDark ? "bg-gray-800/50" : "bg-gray-50"
      )}>
        {commonIcons.map(iconKey => (
          <div
            key={iconKey}
            className={cn(
              "aspect-square rounded-lg flex items-center justify-center cursor-pointer transition-colors",
              selectedIcon === iconKey
                ? isDark 
                  ? `bg-${selectedColor}-500/30 ring-2 ring-${selectedColor}-500` 
                  : `bg-${selectedColor}-100 ring-2 ring-${selectedColor}-500`
                : isDark 
                  ? "bg-gray-700 hover:bg-gray-600" 
                  : "bg-white hover:bg-gray-100"
            )}
            onClick={() => onSelectIcon(iconKey)}
          >
            {renderIcon(iconKey, cn(
              "h-5 w-5",
              selectedIcon === iconKey
                ? isDark ? `text-${selectedColor}-400` : `text-${selectedColor}-600`
                : isDark ? "text-gray-400" : "text-gray-600"
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
