
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
      <GlassMorphism className="p-8 max-w-md mx-auto rounded-xl bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-indigo-900/5">
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-indigo-500/20 blur-xl opacity-70"></div>
          <div className="relative flex items-center justify-center">
            <div className="p-5 bg-blue-500/10 rounded-full backdrop-blur-sm">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                <div className="relative">
                  <FileText className="h-10 w-10 text-blue-400" />
                  <Search className="h-6 w-6 text-purple-400 absolute -bottom-1 -right-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          No documents found
        </h3>
        
        <p className="text-flow-foreground/60 max-w-md mx-auto mb-8">
          We couldn't find any documents matching your current search criteria. Try adjusting your filters or search query.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            variant="outline" 
            className="border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400 flex items-center gap-2 transition-all duration-300"
            onClick={clearFilters}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Clear all filters
          </Button>
          
          <Button 
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300"
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
