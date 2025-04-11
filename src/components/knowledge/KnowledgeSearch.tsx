
import React, { useState } from 'react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, X, Filter, Tag, SortAsc, Plus,
  ChevronDown 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface KnowledgeSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  activeFilters: string[];
  setActiveFilters: (filters: string[]) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  categories: Array<{id: string; name: string; count: number}>;
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
  const toggleFilter = (tag: string) => {
    setActiveFilters(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const hasActiveFilters = activeFilters.length > 0 || selectedCategory || searchQuery;

  return (
    <GlassMorphism className="rounded-2xl p-6 md:p-8 mb-6 shadow-[0_5px_15px_rgba(0,0,0,0.15)] border-flow-border/30 bg-gradient-to-br from-blue-900/10 to-purple-900/10 backdrop-blur-xl">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-2/3 group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-flow-foreground/50 group-hover:text-blue-500 transition-colors duration-200" />
            <Input
              placeholder="Search knowledge base..."
              className="pl-10 bg-flow-background/30 border-flow-border/50 h-12 text-base group-hover:border-blue-500/50 focus:border-blue-500 transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2" 
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4 text-flow-foreground/50 hover:text-flow-foreground" />
              </button>
            )}
          </div>
          
          <div className="flex gap-2 w-full md:w-auto justify-end">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                  {activeFilters.length > 0 && (
                    <Badge variant="secondary" className="ml-1 bg-blue-500/20 text-blue-500">
                      {activeFilters.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64" align="end">
                <div className="space-y-2">
                  <div className="font-medium">Filter by Tags</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {allTags.map(tag => (
                      <Badge 
                        key={tag} 
                        variant={activeFilters.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer ${activeFilters.includes(tag) ? 'bg-blue-500' : ''}`}
                        onClick={() => toggleFilter(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                {hasActiveFilters && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-3 text-flow-foreground/70 hover:text-flow-foreground w-full"
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </Button>
                )}
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  <span>Category</span>
                  {selectedCategory && selectedCategory !== 'all' && (
                    <Badge variant="secondary" className="ml-1 bg-blue-500/20 text-blue-500">1</Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64" align="end">
                <div className="space-y-2">
                  <div className="font-medium">Filter by Category</div>
                  <div className="grid gap-1 mt-2">
                    {categories.map(category => (
                      <Button 
                        key={category.id} 
                        variant={selectedCategory === category.id ? "default" : "ghost"}
                        className={`justify-between h-8 px-2 ${selectedCategory === category.id ? 'bg-blue-500' : ''}`}
                        onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                      >
                        <span>{category.name}</span>
                        {category.count && <Badge variant="secondary" className="ml-auto">{category.count}</Badge>}
                      </Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button 
              className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            >
              <Plus className="h-4 w-4" />
              <span>New Document</span>
            </Button>
          </div>
        </div>
        
        {/* Active filters display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-sm text-flow-foreground/70">Active filters:</span>
            
            {selectedCategory && selectedCategory !== 'all' && (
              <Badge 
                variant="secondary" 
                className="bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center gap-1"
              >
                <span>Category: {categories.find(c => c.id === selectedCategory)?.name}</span>
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => setSelectedCategory(null)} 
                />
              </Badge>
            )}
            
            {activeFilters.map(filter => (
              <Badge 
                key={filter} 
                variant="secondary" 
                className="bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center gap-1"
              >
                <span>Tag: {filter}</span>
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => toggleFilter(filter)} 
                />
              </Badge>
            ))}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-flow-foreground/70 hover:text-flow-foreground h-6 px-2"
              onClick={clearFilters}
            >
              Clear all
            </Button>
          </div>
        )}
        
        {/* View Toggle and Sort Options */}
        <div className="flex items-center justify-between border-t border-flow-border/30 pt-3 mt-2">
          <div className="text-sm text-flow-foreground/70">
            {filteredDocumentsCount} {filteredDocumentsCount === 1 ? 'document' : 'documents'} available
          </div>
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 px-3 flex items-center gap-1">
                  <SortAsc className="h-4 w-4" />
                  <span>Sort</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48" align="end">
                <div className="space-y-1">
                  <Button variant="ghost" size="sm" className="w-full justify-start">Most recent</Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">Most viewed</Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">Alphabetical (A-Z)</Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">Most popular</Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setViewMode('grid')}
              className="h-8 px-3"
            >
              Grid
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setViewMode('list')}
              className="h-8 px-3"
            >
              List
            </Button>
          </div>
        </div>
      </div>
    </GlassMorphism>
  );
};

export default KnowledgeSearch;
