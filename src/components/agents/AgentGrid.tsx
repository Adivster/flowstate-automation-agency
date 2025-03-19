
import React from 'react';
import { User, Database, FileSearch, Shield } from 'lucide-react';
import AgentCard from './AgentCard';
import TransitionWrapper from '../ui/TransitionWrapper';

const AgentGrid: React.FC = () => {
  const agents = [
    {
      name: 'Data Analyst',
      role: 'Research Division',
      icon: Database,
      status: 'working' as const,
      efficiency: 92,
      lastActivity: '2 minutes ago',
    },
    {
      name: 'Security Agent',
      role: 'Compliance Division',
      icon: Shield,
      status: 'idle' as const,
      efficiency: 87,
      lastActivity: '15 minutes ago',
    },
    {
      name: 'Research Agent',
      role: 'Research Division',
      icon: FileSearch,
      status: 'working' as const,
      efficiency: 78,
      lastActivity: 'Just now',
    },
    {
      name: 'Client Agent',
      role: 'Strategy Division',
      icon: User,
      status: 'paused' as const,
      efficiency: 65,
      lastActivity: '1 hour ago',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {agents.map((agent, index) => (
        <TransitionWrapper key={agent.name} delay={100 * (index + 1)}>
          <AgentCard {...agent} />
        </TransitionWrapper>
      ))}
    </div>
  );
};

export default AgentGrid;
