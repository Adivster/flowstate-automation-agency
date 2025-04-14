
import React from 'react';
import { Search, Filter, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface AgentFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  advancedSearch: boolean;
  setAdvancedSearch: (show: boolean) => void;
  searchFilters: {
    status: string;
    division: string;
    efficiency: string;
  };
  setSearchFilters: (filters: {
    status: string;
    division: string;
    efficiency: string;
  }) => void;
  lastUpdated: Date;
  formatLastUpdateTime: (date: Date) => string;
}

const AgentFilters: React.FC<AgentFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  advancedSearch,
  setAdvancedSearch,
  searchFilters,
  setSearchFilters,
  lastUpdated,
  formatLastUpdateTime
}) => {
  const { t } = useLanguage();
  
  return (
    <GlassMorphism className="p-4 rounded-xl border-flow-border/40">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-flow-muted-foreground" />
          <Input
            placeholder={t('searchAgents')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-flow-background/30 border-flow-border/50"
          />
        </div>
        
        <div className="flex flex-wrap gap-3 items-center">
          <Button
            variant="outline"
            size="sm"
            className="border-flow-border/50"
            onClick={() => setAdvancedSearch(!advancedSearch)}
          >
            <Filter className="h-4 w-4 mr-1" />
            Filters
          </Button>
        </div>
      </div>
      
      {advancedSearch && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }} 
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mt-4 pt-4 border-t border-flow-border/30"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-flow-foreground/70">Status</label>
              <Select 
                value={searchFilters.status} 
                onValueChange={(value) => setSearchFilters({...searchFilters, status: value})}
              >
                <SelectTrigger className="bg-flow-background/30 border-flow-border/50">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent className="bg-flow-background/80 backdrop-blur-md border-flow-border">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="working">Working</SelectItem>
                  <SelectItem value="idle">Idle</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs text-flow-foreground/70">Division</label>
              <Select 
                value={searchFilters.division} 
                onValueChange={(value) => setSearchFilters({...searchFilters, division: value})}
              >
                <SelectTrigger className="bg-flow-background/30 border-flow-border/50">
                  <SelectValue placeholder="Filter by Division" />
                </SelectTrigger>
                <SelectContent className="bg-flow-background/80 backdrop-blur-md border-flow-border">
                  <SelectItem value="all">All Divisions</SelectItem>
                  <SelectItem value="kb">Knowledge Base</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="strategy">Strategy</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs text-flow-foreground/70">Efficiency</label>
              <Select 
                value={searchFilters.efficiency} 
                onValueChange={(value) => setSearchFilters({...searchFilters, efficiency: value})}
              >
                <SelectTrigger className="bg-flow-background/30 border-flow-border/50">
                  <SelectValue placeholder="Filter by Efficiency" />
                </SelectTrigger>
                <SelectContent className="bg-flow-background/80 backdrop-blur-md border-flow-border">
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="high">High (90%+)</SelectItem>
                  <SelectItem value="medium">Medium (70-89%)</SelectItem>
                  <SelectItem value="low">Low (Below 70%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            <div className="text-xs text-flow-foreground/70 flex items-center">
              <Clock className="w-3 h-3 mr-1" /> 
              Last updated: {formatLastUpdateTime(lastUpdated)}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setSearchFilters({
                  status: 'all',
                  division: 'all',
                  efficiency: 'all'
                });
                setSearchTerm('');
              }}
            >
              Reset Filters
            </Button>
          </div>
        </motion.div>
      )}
    </GlassMorphism>
  );
};

export default AgentFilters;
