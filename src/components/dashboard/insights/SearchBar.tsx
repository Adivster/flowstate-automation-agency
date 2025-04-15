
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onKeyDown }) => {
  return (
    <div className="relative flex-grow max-w-md">
      <Input 
        placeholder="Search dashboard..." 
        className="h-8 w-full text-xs pl-8 bg-black/30 border-flow-border/30"
        onKeyDown={onKeyDown}
      />
      <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-flow-foreground/50" />
      <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 bg-flow-background/30 px-1 rounded text-[10px] text-flow-foreground/60">
        Ctrl+K
      </div>
    </div>
  );
};

export default SearchBar;
