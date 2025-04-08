
import React from 'react';
import { ChevronRight, UserPlus, PanelRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AgentGrid from '../../agents/AgentGrid';
import { useDashboardActions } from '@/hooks/useDashboardActions';

const AgentsTab: React.FC = () => {
  const { handleCreateAgent } = useDashboardActions();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-medium neon-text">Agent Management</h3>
        <Link to="/agents">
          <Button variant="ghost" className="text-xs text-flow-foreground/70 hover:text-flow-accent group flex items-center">
            View All Agents <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          size="sm"
          className="bg-flow-accent/80 hover:bg-flow-accent text-flow-accent-foreground"
          onClick={handleCreateAgent}
        >
          <UserPlus className="w-3.5 h-3.5 mr-1.5" />
          Create New Agent
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="border-flow-border/50 hover:border-flow-accent/50 hover:text-flow-accent"
        >
          <PanelRight className="w-3.5 h-3.5 mr-1.5" />
          Agent Settings
        </Button>
      </div>
      
      <p className="text-sm text-flow-foreground/60 mb-4">Top performing and recently active agents</p>
      
      <AgentGrid maxAgents={6} showAsGrid={true} />
    </section>
  );
};

export default AgentsTab;
