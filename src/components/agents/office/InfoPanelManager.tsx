
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import DivisionInfoPanel from './DivisionInfoPanel';
import AgentInfoPanel from './AgentInfoPanel';

interface InfoPanelManagerProps {
  selectedDivision: string | null;
  selectedDivisionObject: any | null;
  selectedAgent: number | null;
  selectedAgentObject: any | null;
  showInfoPanel: boolean;
  agents: any[];
  onClose: () => void;
}

const InfoPanelManager: React.FC<InfoPanelManagerProps> = ({
  selectedDivision,
  selectedDivisionObject,
  selectedAgent,
  selectedAgentObject,
  showInfoPanel,
  agents,
  onClose
}) => {
  return (
    <AnimatePresence>
      {selectedDivisionObject && showInfoPanel && (
        <DivisionInfoPanel
          division={selectedDivisionObject}
          agents={agents.filter(a => a.division === selectedDivisionObject.id)}
          onClose={onClose}
        />
      )}
      
      {selectedAgentObject && showInfoPanel && (
        <AgentInfoPanel
          agent={selectedAgentObject}
          onClose={onClose}
        />
      )}
    </AnimatePresence>
  );
};

export default InfoPanelManager;
