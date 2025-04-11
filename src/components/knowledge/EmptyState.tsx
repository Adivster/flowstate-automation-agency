
import React from 'react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  clearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ clearFilters }) => {
  return (
    <div className="text-center py-12">
      <GlassMorphism className="p-8 max-w-md mx-auto rounded-xl bg-gradient-to-br from-blue-900/10 to-blue-900/5">
        <FileText className="h-12 w-12 mx-auto text-flow-foreground/30 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No documents found</h3>
        <p className="text-flow-foreground/60 max-w-md mx-auto">
          Try adjusting your search query or filters
        </p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={clearFilters}
        >
          Clear all filters
        </Button>
      </GlassMorphism>
    </div>
  );
};

export default EmptyState;
