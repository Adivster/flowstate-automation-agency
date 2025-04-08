
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TaskFiltersProps {
  onFilterChange: (type: 'priority' | 'status' | 'division', value: string | null) => void;
  clearFilters: () => void;
  selectedPriority: string | null;
  selectedStatus: string | null;
  selectedDivision: string | null;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  onFilterChange,
  clearFilters,
  selectedPriority,
  selectedStatus,
  selectedDivision
}) => {
  const hasActiveFilters = selectedPriority || selectedStatus || selectedDivision;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={hasActiveFilters ? "default" : "outline"} 
          size="sm" 
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          {hasActiveFilters ? 'Filters Active' : 'Filter'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <div className="px-2 py-1.5 text-xs font-semibold">Priority</div>
          <DropdownMenuItem 
            className={selectedPriority === 'high' ? 'bg-accent' : ''} 
            onClick={() => onFilterChange('priority', 'high')}
          >
            High
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={selectedPriority === 'medium' ? 'bg-accent' : ''} 
            onClick={() => onFilterChange('priority', 'medium')}
          >
            Medium
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={selectedPriority === 'low' ? 'bg-accent' : ''} 
            onClick={() => onFilterChange('priority', 'low')}
          >
            Low
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <div className="px-2 py-1.5 text-xs font-semibold">Status</div>
          <DropdownMenuItem 
            className={selectedStatus === 'in-progress' ? 'bg-accent' : ''} 
            onClick={() => onFilterChange('status', 'in-progress')}
          >
            In Progress
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={selectedStatus === 'paused' ? 'bg-accent' : ''} 
            onClick={() => onFilterChange('status', 'paused')}
          >
            Paused
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={selectedStatus === 'completed' ? 'bg-accent' : ''} 
            onClick={() => onFilterChange('status', 'completed')}
          >
            Completed
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={selectedStatus === 'failed' ? 'bg-accent' : ''} 
            onClick={() => onFilterChange('status', 'failed')}
          >
            Failed
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <div className="px-2 py-1.5 text-xs font-semibold">Division</div>
          <DropdownMenuItem 
            className={selectedDivision === 'research' ? 'bg-accent' : ''} 
            onClick={() => onFilterChange('division', 'research')}
          >
            Research
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={selectedDivision === 'development' ? 'bg-accent' : ''} 
            onClick={() => onFilterChange('division', 'development')}
          >
            Development
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={selectedDivision === 'compliance' ? 'bg-accent' : ''} 
            onClick={() => onFilterChange('division', 'compliance')}
          >
            Compliance
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={selectedDivision === 'knowledge' ? 'bg-accent' : ''} 
            onClick={() => onFilterChange('division', 'knowledge')}
          >
            Knowledge
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        {hasActiveFilters && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={clearFilters} className="text-red-500 flex items-center">
              <X className="mr-2 h-4 w-4" /> Clear All Filters
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskFilters;
