
import React from 'react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, Grid, List } from 'lucide-react';

interface KnowledgeSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  activeFilters: string[];
  setActiveFilters: (filters: string[]) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  categories: Array<{ id: string; name: string; count: number }>;
  allTags: string[];
  filteredDocumentsCount: number;
  clearFilters: () => void;
}

const KnowledgeSearch: React.FC<KnowledgeSearchProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  activeFilters,
  setActiveFilters,
  viewMode,
  setViewMode,
  categories,
  allTags,
  filteredDocumentsCount,
  clearFilters
}) => {
  const removeFilter = (tag: string) => {
    setActiveFilters(activeFilters.filter(t => t !== tag));
  };
  
  return (
    <div className="mb-6">
      <GlassMorphism className="p-4 rounded-xl border-flow-border/30 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-flow-foreground/50" />
            <Input
              placeholder="Search knowledge base..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-flow-background/30 border-flow-border/40"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedCategory || 'all'} onValueChange={(value) => setSelectedCategory(value === 'all' ? null : value)}>
              <SelectTrigger className="w-[180px] bg-flow-background/30 border-flow-border/40">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'grid' | 'list')} className="hidden md:block">
              <TabsList className="bg-flow-background/30 border border-flow-border/40">
                <TabsTrigger value="grid" className="data-[state=active]:bg-blue-500">
                  <Grid className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list" className="data-[state=active]:bg-blue-500">
                  <List className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-flow-border/30">
            <span className="flex items-center text-sm text-flow-foreground/70">
              <Filter className="h-4 w-4 mr-1" /> Filters:
            </span>
            {activeFilters.map((filter) => (
              <Badge 
                key={filter} 
                variant="secondary" 
                className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
              >
                {filter}
                <button onClick={() => removeFilter(filter)} className="ml-1 hover:text-white">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto text-xs">
              Clear All
            </Button>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-flow-border/30 text-sm text-flow-foreground/70">
          <span>{filteredDocumentsCount} document{filteredDocumentsCount !== 1 ? 's' : ''} found</span>
          <div className="flex gap-2 md:hidden">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              className={`h-8 w-8 ${viewMode === 'grid' ? 'bg-blue-500' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              className={`h-8 w-8 ${viewMode === 'list' ? 'bg-blue-500' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </GlassMorphism>
    </div>
  );
};

export default KnowledgeSearch;
