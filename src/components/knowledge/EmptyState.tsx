
import React from 'react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { FileText, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  clearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ clearFilters }) => {
  return (
    <div className="text-center py-12">
      <GlassMorphism className="p-8 max-w-md mx-auto rounded-xl bg-gradient-to-br from-blue-900/10 to-purple-900/5">
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl opacity-70"></div>
          <div className="relative flex items-center justify-center gap-2">
            <FileText className="h-10 w-10 text-blue-400" />
            <Search className="h-8 w-8 text-purple-400 -mt-4 ml-1" />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          No documents found
        </h3>
        
        <p className="text-flow-foreground/60 max-w-md mx-auto mb-6">
          We couldn't find any documents matching your current search criteria. Try adjusting your filters or search query.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            variant="outline" 
            className="border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400 flex items-center gap-2"
            onClick={clearFilters}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Clear all filters
          </Button>
          
          <Button 
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <FileText className="h-4 w-4 mr-2" />
            Create new document
          </Button>
        </div>
      </GlassMorphism>
    </div>
  );
};

export default EmptyState;
