
import React from 'react';
import { BookOpen, BarChart, LayoutGrid, Shield, DollarSign, MessagesSquare } from 'lucide-react';
import AgentCard from './AgentCard';
import TransitionWrapper from '../ui/TransitionWrapper';

const AgentGrid: React.FC = () => {
  const agents = [
    {
      name: 'KB Content Agent',
      role: 'Knowledge Base Division',
      icon: BookOpen,
      status: 'working' as const,
      efficiency: 92,
      lastActivity: '2 minutes ago',
    },
    {
      name: 'Security Agent',
      role: 'Strategy Division',
      icon: Shield,
      status: 'idle' as const,
      efficiency: 87,
      lastActivity: '15 minutes ago',
    },
    {
      name: 'Dashboard Agent',
      role: 'Analytics Division',
      icon: BarChart,
      status: 'working' as const,
      efficiency: 78,
      lastActivity: 'Just now',
    },
    {
      name: 'Integration Agent',
      role: 'Operations Division',
      icon: LayoutGrid,
      status: 'paused' as const,
      efficiency: 65,
      lastActivity: '1 hour ago',
    },
    {
      name: 'Budget Agent',
      role: 'Finance Division',
      icon: DollarSign,
      status: 'working' as const,
      efficiency: 94,
      lastActivity: '5 minutes ago',
    },
    {
      name: 'Support Agent',
      role: 'Customer Support Division',
      icon: MessagesSquare,
      status: 'working' as const,
      efficiency: 89,
      lastActivity: 'Just now',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent, index) => (
        <TransitionWrapper key={agent.name} delay={100 * (index + 1)}>
          <AgentCard {...agent} />
        </TransitionWrapper>
      ))}
    </div>
  );
};

export default AgentGrid;
