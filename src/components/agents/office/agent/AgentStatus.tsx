
import React from 'react';
import { CheckCircle, AlertCircle, PauseCircle, GhostIcon } from 'lucide-react';

interface AgentStatusProps {
  status: 'working' | 'idle' | 'paused' | 'error';
  statusColor: string;
}

export const AgentStatus: React.FC<AgentStatusProps> = ({ status, statusColor }) => {
  const getStatusIcon = () => {
    switch(status) {
      case 'working': return <CheckCircle className="w-3 h-3 text-green-400" />;
      case 'idle': return <GhostIcon className="w-3 h-3 text-gray-400" />;
      case 'paused': return <PauseCircle className="w-3 h-3 text-amber-400" />;
      case 'error': return <AlertCircle className="w-3 h-3 text-red-400" />;
    }
  };

  return (
    <span 
      className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-gray-950 
        ${statusColor}
        ${status === 'working' ? 'animate-pulse' : ''}
      `}
    />
  );
};
