
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import AgentFilters from './grid/AgentFilters';
import ViewToggle from './grid/ViewToggle';
import GridView from './grid/GridView';
import ListView from './grid/ListView';
import EmptyAgentState from './grid/EmptyAgentState';
import { useAgentData } from './grid/useAgentData';

interface AgentGridProps {
  maxAgents?: number;
}

const AgentGrid: React.FC<AgentGridProps> = ({ maxAgents }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const {
    searchTerm,
    setSearchTerm,
    expandedAgent,
    setExpandedAgent,
    viewMode,
    setViewMode,
    lastUpdated,
    isRefreshing,
    advancedSearch,
    setAdvancedSearch,
    searchFilters,
    setSearchFilters,
    handleRefresh,
    divisionColors,
    formatLastUpdateTime,
    filteredAgents
  } = useAgentData(maxAgents);
  
  const getDivisionName = (division: string) => {
    const divisions = {
      kb: t('knowledgeBase'),
      analytics: t('analyticsDivision'),
      operations: t('operationsDivision'),
      strategy: t('strategyDivision'),
      research: t('researchDivision')
    };
    return divisions[division] || division;
  };
  
  const handleExpandAgent = (id: number) => {
    setExpandedAgent(expandedAgent === id ? null : id);
  };
  
  const handleAgentAction = (action: string, agent: any) => {
    const actions = {
      pause: `Paused ${agent.name}`,
      resume: `Resumed ${agent.name}`,
      stop: `Stopped ${agent.name}`,
      message: `Opened chat with ${agent.name}`,
      details: `Viewing details for ${agent.name}`,
      restart: `Restarting ${agent.name}`
    };
    
    toast({
      title: actions[action] || `Action on ${agent.name}`,
      description: `Agent ${action} request sent`,
      duration: 3000,
    });
    
    if (action === 'message') {
      const event = new CustomEvent('openCommunicationTerminal');
      window.dispatchEvent(event);
    }
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSearchFilters({
      status: 'all',
      division: 'all',
      efficiency: 'all'
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <AgentFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            advancedSearch={advancedSearch}
            setAdvancedSearch={setAdvancedSearch}
            searchFilters={searchFilters}
            setSearchFilters={setSearchFilters}
            lastUpdated={lastUpdated}
            formatLastUpdateTime={formatLastUpdateTime}
          />
        </div>
        
        <div className="flex-shrink-0">
          <ViewToggle
            viewMode={viewMode}
            setViewMode={setViewMode}
            isRefreshing={isRefreshing}
            handleRefresh={handleRefresh}
          />
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <GridView
          filteredAgents={filteredAgents}
          expandedAgent={expandedAgent}
          handleExpandAgent={handleExpandAgent}
          handleAgentAction={handleAgentAction}
          divisionColors={divisionColors}
          getDivisionName={getDivisionName}
        />
      ) : (
        <ListView
          filteredAgents={filteredAgents}
          handleExpandAgent={handleExpandAgent}
          handleAgentAction={handleAgentAction}
          divisionColors={divisionColors}
        />
      )}
      
      {filteredAgents.length === 0 && (
        <EmptyAgentState clearFilters={clearFilters} />
      )}
    </div>
  );
};

export default AgentGrid;
