
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { IconSelector } from './IconSelector';
import { ColorPicker } from './ColorPicker';
import { DivisionPreview } from './DivisionPreview';
import type { DivisionFormState, NewDivisionData } from './types';

interface NewDivisionModalProps {
  onClose: () => void;
  onCreateDivision: (data: NewDivisionData) => void;
}

const NewDivisionModal: React.FC<NewDivisionModalProps> = ({ 
  onClose,
  onCreateDivision
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toast } = useToast();
  const modalRef = useRef<HTMLDivElement>(null);
  
  const [formState, setFormState] = useState<DivisionFormState>({
    name: '',
    description: '',
    iconKey: 'Building2',
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
    setError(null);
  };
  
  const handleIconSelect = (iconKey: keyof typeof import('lucide-react')) => {
    setFormState(prev => ({
      ...prev,
      iconKey
    }));
  };
  
  const handleColorSelect = (color: string) => {
    setFormState(prev => ({
      ...prev,
      color
    }));
  };
  
  const handleCreateDivision = () => {
    if (!formState.name.trim()) {
      setError('Division name is required');
      return;
    }
    
    const position = {
      x: 55 + Math.random() * 5,
      y: 40 + Math.random() * 10,
      width: 25 + Math.random() * 5,
      height: 20 + Math.random() * 5
    };
    
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

        <div className="p-6">
          <div className="space-y-4">
            {error && (
              <div className={cn(
                "p-3 rounded-lg flex items-start text-sm",
                isDark 
                  ? "bg-red-500/20 text-red-300" 
                  : "bg-red-50 text-red-700"
              )}>
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
            <IconSelector
              selectedIcon={formState.iconKey}
              selectedColor={formState.color}
              onSelectIcon={handleIconSelect}
            />
            
            {/* Color Selection */}
            <ColorPicker
              selectedColor={formState.color}
              onSelectColor={handleColorSelect}
            />
            
            {/* Preview */}
            <DivisionPreview formState={formState} />
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
