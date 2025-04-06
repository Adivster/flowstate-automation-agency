
import React from 'react';
import { motion } from 'framer-motion';
import AgentListItem from './AgentListItem';

interface ListViewProps {
  filteredAgents: Array<any>;
  handleExpandAgent: (id: number) => void;
  handleAgentAction: (action: string, agent: any) => void;
  divisionColors: any;
}

const ListView: React.FC<ListViewProps> = ({
  filteredAgents,
  handleExpandAgent,
  handleAgentAction,
  divisionColors
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {filteredAgents.map((agent) => (
        <motion.div
          key={agent.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full"
          layoutId={`agent-${agent.id}`}
        >
          <AgentListItem
            agent={agent}
            handleExpandAgent={handleExpandAgent}
            handleAgentAction={handleAgentAction}
            divisionColors={divisionColors}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ListView;
