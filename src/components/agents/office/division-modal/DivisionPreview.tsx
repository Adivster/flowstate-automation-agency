
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import type { DivisionFormState } from './types';

interface DivisionPreviewProps {
  formState: DivisionFormState;
}

export const DivisionPreview: React.FC<DivisionPreviewProps> = ({
  formState
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const renderIcon = (iconKey: keyof typeof LucideIcons, className: string) => {
    const IconComponent = LucideIcons[iconKey] as React.ElementType;
    return <IconComponent className={className} />;
  };

  return (
    <div className="mt-6">
      <label className={cn(
        "text-sm font-medium block mb-2",
        isDark ? "text-gray-300" : "text-gray-700"
      )}>
        Preview
      </label>
      <div className={cn(
        "p-4 rounded-lg border flex items-center justify-between",
        isDark ? "border-gray-700" : "border-gray-200"
      )}>
        <div className="flex items-center">
          <div className={cn(
            "h-10 w-10 rounded-lg flex items-center justify-center mr-3",
            `bg-${formState.color}-500/20`
          )}>
            {renderIcon(formState.iconKey, cn(
              "h-6 w-6",
              isDark ? `text-${formState.color}-400` : `text-${formState.color}-600`
            ))}
          </div>
          <div>
            <h4 className={cn(
              "font-medium",
              isDark ? "text-white" : "text-gray-800"
            )}>
              {formState.name || "New Division"}
            </h4>
            <p className={cn(
              "text-xs",
              isDark ? "text-gray-400" : "text-gray-500"
            )}>
              {formState.description || "No description provided"}
            </p>
          </div>
        </div>
        <div className={cn(
          "h-2 w-2 rounded-full",
          `bg-${formState.color}-500`
        )}></div>
      </div>
    </div>
  );
};
