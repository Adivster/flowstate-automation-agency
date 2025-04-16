
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import * as LucideIcons from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface NewDivisionModalProps {
  onClose: () => void;
  onCreateDivision: (data: {
    id: string;
    name: string;
    icon: keyof typeof LucideIcons;
    color: string;
    position: { x: number; y: number; width: number; height: number };
  }) => void;
}

type ColorOption = {
  name: string;
  bg: string;
  border: string;
  text: string;
  primary: string;
  secondary: string;
};

const NewDivisionModal: React.FC<NewDivisionModalProps> = ({ 
  onClose,
  onCreateDivision
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toast } = useToast();
  const modalRef = useRef<HTMLDivElement>(null);
  
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    iconKey: 'Building2' as keyof typeof LucideIcons,
    color: isDark ? 'purple' : 'emerald'
  });
  
  const [error, setError] = useState<string | null>(null);
  
  // Generate a unique ID by slugifying the name and adding timestamp
  const generateId = (name: string) => {
    return name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '') + '-' + Date.now().toString().slice(-4);
  };
  
  // Common Lucide icons that would be appropriate for divisions
  const commonIcons = [
    'Building2', 'BarChart', 'BookOpen', 'Database', 'Server',
    'ShieldCheck', 'Users', 'Briefcase', 'Brain', 'Lightbulb',
    'Settings', 'LineChart', 'HeartPulse', 'Gauge', 'Bot',
    'Cpu', 'Search', 'Code', 'Network', 'Laptop'
  ] as (keyof typeof LucideIcons)[];
  
  // Color options for divisions
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
    setError(null);
  };
  
  const handleIconSelect = (iconKey: keyof typeof LucideIcons) => {
    setFormState({
      ...formState,
      iconKey
    });
  };
  
  const handleColorSelect = (color: string) => {
    setFormState({
      ...formState,
      color
    });
  };
  
  const handleCreateDivision = () => {
    // Validation
    if (!formState.name.trim()) {
      setError('Division name is required');
      return;
    }
    
    // Generate a position on the right side of the office
    const position = {
      x: 55 + Math.random() * 5, // Right side of the office
      y: 40 + Math.random() * 10, // Somewhere in the middle vertically
      width: 25 + Math.random() * 5, // Reasonable width
      height: 20 + Math.random() * 5 // Reasonable height
    };
    
    // Create division
    const newDivision = {
      id: generateId(formState.name),
      name: formState.name,
      icon: formState.iconKey,
      color: formState.color,
      position
    };
    
    onCreateDivision(newDivision);
    
    toast({
      title: "Division Created",
      description: `${formState.name} division has been created successfully.`,
      duration: 3000,
    });
    
    onClose();
  };
  
  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <motion.div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        ref={modalRef}
        className={cn(
          "w-full max-w-md rounded-xl overflow-hidden",
          isDark 
            ? "bg-gray-900/95 border border-purple-500/30" 
            : "bg-white/95 border border-emerald-300/30"
        )}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        {/* Header */}
        <div className={cn(
          "px-6 py-4 border-b flex items-center justify-between",
          isDark ? "border-gray-700" : "border-gray-200"
        )}>
          <div className="flex items-center">
            <Building2 className={cn(
              "h-5 w-5 mr-2",
              isDark ? "text-purple-400" : "text-emerald-600"
            )} />
            <h2 className={cn(
              "text-lg font-medium",
              isDark ? "text-white" : "text-gray-800"
            )}>
              Create New Division
            </h2>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Form Content */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Error message */}
            {error && (
              <div className={cn(
                "p-3 rounded-lg flex items-start text-sm",
                isDark 
                  ? "bg-red-500/20 text-red-300" 
                  : "bg-red-50 text-red-700"
              )}>
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <div>{error}</div>
              </div>
            )}
            
            {/* Division Name */}
            <div className="space-y-1">
              <label className={cn(
                "text-sm font-medium block",
                isDark ? "text-gray-300" : "text-gray-700"
              )}>
                Division Name*
              </label>
              <Input 
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                placeholder="e.g. Research & Development"
                className={cn(
                  isDark 
                    ? "bg-gray-800 border-gray-700 text-white" 
                    : "bg-white border-gray-300"
                )}
              />
              <p className={cn(
                "text-xs",
                isDark ? "text-gray-400" : "text-gray-500"
              )}>
                Give your division a descriptive name
              </p>
            </div>
            
            {/* Division Description */}
            <div className="space-y-1">
              <label className={cn(
                "text-sm font-medium block",
                isDark ? "text-gray-300" : "text-gray-700"
              )}>
                Description (Optional)
              </label>
              <Textarea 
                name="description"
                value={formState.description}
                onChange={handleInputChange}
                placeholder="What is this division responsible for?"
                className={cn(
                  isDark 
                    ? "bg-gray-800 border-gray-700 text-white" 
                    : "bg-white border-gray-300"
                )}
                rows={2}
              />
            </div>
            
            {/* Icon Selection */}
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
                {commonIcons.map(iconKey => {
                  // Fix: Correctly access and use the icon component
                  const IconComp = LucideIcons[iconKey];
                  return (
                    <div
                      key={iconKey}
                      className={cn(
                        "aspect-square rounded-lg flex items-center justify-center cursor-pointer transition-colors",
                        formState.iconKey === iconKey
                          ? isDark 
                            ? `bg-${formState.color}-500/30 ring-2 ring-${formState.color}-500` 
                            : `bg-${formState.color}-100 ring-2 ring-${formState.color}-500`
                          : isDark 
                            ? "bg-gray-700 hover:bg-gray-600" 
                            : "bg-white hover:bg-gray-100"
                      )}
                      onClick={() => handleIconSelect(iconKey)}
                    >
                      <IconComp className={cn(
                        "h-5 w-5",
                        formState.iconKey === iconKey
                          ? isDark ? `text-${formState.color}-400` : `text-${formState.color}-600`
                          : isDark ? "text-gray-400" : "text-gray-600"
                      )} />
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Color Selection */}
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
                      formState.color === key ? "ring-2 ring-offset-2" : ""
                    )}
                    style={{ 
                      backgroundColor: color.primary,
                      borderColor: formState.color === key ? color.border : 'transparent'
                    }}
                    onClick={() => handleColorSelect(key)}
                  >
                    {formState.color === key && (
                      <Check className="h-5 w-5 text-white mx-auto mt-1.5" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Preview */}
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
                  <div
                    className={cn(
                      "h-10 w-10 rounded-lg flex items-center justify-center mr-3",
                      `bg-${formState.color}-500/20`
                    )}
                  >
                    {/* Fix: Render the selected icon component correctly */}
                    {(() => {
                      const PreviewIcon = LucideIcons[formState.iconKey];
                      return <PreviewIcon className={cn(
                        "h-6 w-6",
                        isDark ? `text-${formState.color}-400` : `text-${formState.color}-600`
                      )} />;
                    })()}
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
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    `bg-${formState.color}-500`
                  )}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <Button 
              variant="outline" 
              onClick={onClose}
              className={cn(
                isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200"
              )}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateDivision}
              className={cn(
                isDark 
                  ? `bg-${formState.color}-600 hover:bg-${formState.color}-700` 
                  : `bg-${formState.color}-600 hover:bg-${formState.color}-700`
              )}
            >
              Create Division
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NewDivisionModal;
