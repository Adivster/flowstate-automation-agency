
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Filter, X, Users, Database, CheckCircle, AlertTriangle, Clock, PauseCircle, Ban
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

export interface FilterOptions {
  divisions: string[];
  statuses: ('working' | 'idle' | 'paused' | 'error')[];
  efficiency: [number, number]; // min, max
  workload: [number, number]; // min, max
  tasks: string[];
}

interface FloorPlanFiltersProps {
  visible: boolean;
  onClose: () => void;
  divisions: Array<{ id: string; name: string; }>;
  onFilterChange: (filters: FilterOptions) => void;
  initialFilters?: Partial<FilterOptions>;
}

export const FloorPlanFilters: React.FC<FloorPlanFiltersProps> = ({
  visible,
  onClose,
  divisions,
  onFilterChange,
  initialFilters
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    divisions: initialFilters?.divisions || [],
    statuses: initialFilters?.statuses || ['working', 'idle', 'paused', 'error'],
    efficiency: initialFilters?.efficiency || [0, 100],
    workload: initialFilters?.workload || [0, 100],
    tasks: initialFilters?.tasks || []
  });
  
  const handleDivisionToggle = (divisionId: string) => {
    setActiveFilters(prev => {
      const newDivisions = prev.divisions.includes(divisionId) 
        ? prev.divisions.filter(id => id !== divisionId)
        : [...prev.divisions, divisionId];
      
      const newFilters = { ...prev, divisions: newDivisions };
      onFilterChange(newFilters);
      return newFilters;
    });
  };
  
  const handleStatusToggle = (status: 'working' | 'idle' | 'paused' | 'error') => {
    setActiveFilters(prev => {
      const newStatuses = prev.statuses.includes(status)
        ? prev.statuses.filter(s => s !== status)
        : [...prev.statuses, status];
      
      const newFilters = { ...prev, statuses: newStatuses };
      onFilterChange(newFilters);
      return newFilters;
    });
  };
  
  const handleEfficiencyChange = (values: number[]) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev, efficiency: [values[0], values[1]] as [number, number] };
      onFilterChange(newFilters);
      return newFilters;
    });
  };
  
  const handleWorkloadChange = (values: number[]) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev, workload: [values[0], values[1]] as [number, number] };
      onFilterChange(newFilters);
      return newFilters;
    });
  };
  
  const handleReset = () => {
    const resetFilters: FilterOptions = {
      divisions: [],
      statuses: ['working', 'idle', 'paused', 'error'],
      efficiency: [0, 100],
      workload: [0, 100],
      tasks: []
    };
    
    setActiveFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute top-16 right-4 z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className={cn(
            "w-72 rounded-lg overflow-hidden backdrop-blur-md shadow-lg border",
            isDark 
              ? "bg-black/80 border-white/10 text-white shadow-black/30" 
              : "bg-white/80 border-emerald-200/50 text-gray-800 shadow-emerald-100/30"
          )}>
            <div className="p-3 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 opacity-70" />
                <h3 className="text-sm font-medium">Filter View</h3>
              </div>
              
              <div className="flex gap-1">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-6 px-2 text-xs"
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-6 w-6 p-0"
                  onClick={onClose}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="divisions">
              <div className="px-3 pt-2">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="divisions" className="text-xs">
                    <Database className="h-3 w-3 mr-1" />
                    Divisions
                  </TabsTrigger>
                  <TabsTrigger value="status" className="text-xs">
                    <Users className="h-3 w-3 mr-1" />
                    Status
                  </TabsTrigger>
                  <TabsTrigger value="metrics" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    Metrics
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="p-3">
                <TabsContent value="divisions" className="mt-0 max-h-60 overflow-y-auto">
                  <div className="space-y-2">
                    <div className="text-xs font-medium mb-2">Select Divisions</div>
                    
                    {divisions.map(division => (
                      <div key={division.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`division-${division.id}`} 
                          checked={activeFilters.divisions.includes(division.id)}
                          onCheckedChange={() => handleDivisionToggle(division.id)}
                        />
                        <Label 
                          htmlFor={`division-${division.id}`}
                          className="text-xs"
                        >
                          {division.name}
                        </Label>
                      </div>
                    ))}
                    
                    {divisions.length === 0 && (
                      <div className="text-xs opacity-70 text-center py-2">
                        No divisions available
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="status" className="mt-0">
                  <div className="space-y-3">
                    <div className="text-xs font-medium mb-2">Agent Status</div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div 
                        className={cn(
                          "flex items-center gap-2 rounded-md border p-2 cursor-pointer",
                          activeFilters.statuses.includes('working')
                            ? isDark ? "bg-green-900/30 border-green-700" : "bg-green-100 border-green-200"
                            : isDark ? "bg-transparent border-white/10" : "bg-transparent border-gray-200"
                        )}
                        onClick={() => handleStatusToggle('working')}
                      >
                        <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                        <span className="text-xs">Working</span>
                      </div>
                      
                      <div 
                        className={cn(
                          "flex items-center gap-2 rounded-md border p-2 cursor-pointer",
                          activeFilters.statuses.includes('idle')
                            ? isDark ? "bg-gray-900/30 border-gray-700" : "bg-gray-100 border-gray-200"
                            : isDark ? "bg-transparent border-white/10" : "bg-transparent border-gray-200"
                        )}
                        onClick={() => handleStatusToggle('idle')}
                      >
                        <Clock className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-xs">Idle</span>
                      </div>
                      
                      <div 
                        className={cn(
                          "flex items-center gap-2 rounded-md border p-2 cursor-pointer",
                          activeFilters.statuses.includes('paused')
                            ? isDark ? "bg-amber-900/30 border-amber-700" : "bg-amber-100 border-amber-200"
                            : isDark ? "bg-transparent border-white/10" : "bg-transparent border-gray-200"
                        )}
                        onClick={() => handleStatusToggle('paused')}
                      >
                        <PauseCircle className="h-3.5 w-3.5 text-amber-500" />
                        <span className="text-xs">Paused</span>
                      </div>
                      
                      <div 
                        className={cn(
                          "flex items-center gap-2 rounded-md border p-2 cursor-pointer",
                          activeFilters.statuses.includes('error')
                            ? isDark ? "bg-red-900/30 border-red-700" : "bg-red-100 border-red-200"
                            : isDark ? "bg-transparent border-white/10" : "bg-transparent border-gray-200"
                        )}
                        onClick={() => handleStatusToggle('error')}
                      >
                        <Ban className="h-3.5 w-3.5 text-red-500" />
                        <span className="text-xs">Error</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="metrics" className="mt-0">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label className="text-xs">Efficiency Range</Label>
                        <span className="text-xs">
                          {activeFilters.efficiency[0]}% - {activeFilters.efficiency[1]}%
                        </span>
                      </div>
                      <Slider
                        defaultValue={[activeFilters.efficiency[0], activeFilters.efficiency[1]]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={handleEfficiencyChange}
                        className={isDark ? "bg-white/10" : "bg-black/5"}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label className="text-xs">Workload Range</Label>
                        <span className="text-xs">
                          {activeFilters.workload[0]}% - {activeFilters.workload[1]}%
                        </span>
                      </div>
                      <Slider
                        defaultValue={[activeFilters.workload[0], activeFilters.workload[1]]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={handleWorkloadChange}
                        className={isDark ? "bg-white/10" : "bg-black/5"}
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs block mb-2">Task Type</Label>
                      <Select>
                        <SelectTrigger className="w-full h-8 text-xs">
                          <SelectValue placeholder="Select task type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Task</SelectItem>
                          <SelectItem value="reading">Reading</SelectItem>
                          <SelectItem value="analyzing">Analyzing</SelectItem>
                          <SelectItem value="coding">Coding</SelectItem>
                          <SelectItem value="writing">Writing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
            
            <div className="p-3 border-t flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {Object.values(activeFilters).flat().filter(Boolean).length} active filters
              </Badge>
              
              <Button size="sm" className="text-xs h-7">
                Apply Filters
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
