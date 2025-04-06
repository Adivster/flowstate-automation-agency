
import React from 'react';
import { LayoutGrid, LayoutList, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ViewToggleProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  isRefreshing: boolean;
  handleRefresh: () => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({
  viewMode,
  setViewMode,
  isRefreshing,
  handleRefresh
}) => {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Button
        variant="outline"
        size="icon"
        className={`h-9 w-9 ${viewMode === 'grid' ? 'bg-flow-accent/20 border-flow-accent' : ''}`}
        onClick={() => setViewMode('grid')}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className={`h-9 w-9 ${viewMode === 'list' ? 'bg-flow-accent/20 border-flow-accent' : ''}`}
        onClick={() => setViewMode('list')}
      >
        <LayoutList className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="border-flow-accent/50 hover:bg-flow-accent/20 text-flow-accent"
        onClick={handleRefresh}
        disabled={isRefreshing}
      >
        <RefreshCcw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
        {isRefreshing ? 'Refreshing...' : 'Refresh'}
      </Button>
    </div>
  );
};

export default ViewToggle;
