
import React from 'react';
import { motion } from 'framer-motion';
import AgentCard from '../AgentCard';
import ExpandedAgentCard from './ExpandedAgentCard';

interface GridViewProps {
  filteredAgents: Array<any>;
  expandedAgent: number | null;
  handleExpandAgent: (id: number) => void;
  handleAgentAction: (action: string, agent: any) => void;
  divisionColors: any;
  getDivisionName: (division: string) => string;
}

const GridView: React.FC<GridViewProps> = ({
  filteredAgents,
  expandedAgent,
  handleExpandAgent,
  handleAgentAction,
  divisionColors,
  getDivisionName
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {filteredAgents.map((agent) => {
        const isExpanded = expandedAgent === agent.id;
        
        return (
          <motion.div
            key={agent.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-full"
            layoutId={`agent-card-${agent.id}`}
          >
            {isExpanded ? (
              <ExpandedAgentCard
                agent={agent}
                handleExpandAgent={handleExpandAgent}
                handleAgentAction={handleAgentAction}
                divisionColors={divisionColors}
                getDivisionName={getDivisionName}
              />
            ) : (
              <AgentCard 
                name={agent.name}
                role={agent.role}
                icon={agent.icon}
                status={agent.status as 'idle' | 'working' | 'paused' | 'error'}
                efficiency={agent.efficiency}
                lastActivity={agent.lastActive}
                className={`border-${agent.division}-500/30 hover:border-${agent.division}-500/50`}
                onClick={() => handleExpandAgent(agent.id)}
                tags={['v3.2', agent.division, agent.status]}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default GridView;
