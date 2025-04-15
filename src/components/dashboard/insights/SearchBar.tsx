
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface SearchBarProps {
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onSearch?: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onKeyDown, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };
  
  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };
  
  return (
    <div className="relative flex-grow max-w-md group">
      <Input 
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search insights, alerts, metrics..." 
        className="h-8 w-full text-xs pl-8 bg-black/30 border-flow-border/30 focus:bg-black/40 transition-all"
        onKeyDown={onKeyDown}
      />
      <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-flow-foreground/50" />
      
      {searchTerm ? (
        <button 
          onClick={handleClear}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 text-flow-foreground/50 hover:text-flow-foreground/80 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      ) : null}
      
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 bg-flow-background/30 px-1 rounded text-[10px] text-flow-foreground/60">
              Ctrl+K
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" withArrow={true} className="bg-black/80 border-flow-border/50 text-xs">
            Search through insights and alerts
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SearchBar;
