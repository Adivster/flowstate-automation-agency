
import React from 'react';
import { Briefcase, Code, FileSearch, Shield, BarChart, LayoutGrid, Zap, BookOpen, Lightbulb } from 'lucide-react';
import { TransitionWrapper } from '../ui/TransitionWrapper';
import StatsOverview from './StatsOverview';
import DivisionCard from './DivisionCard';
import AgentGrid from '../agents/AgentGrid';

const AgencyDashboard: React.FC = () => {
  const divisions = [
    {
      title: 'Strategy Division',
      description: 'Defines project scope, goals, and execution strategies.',
      icon: Briefcase,
      activeAgents: 5,
      taskStatus: { completed: 12, total: 15 },
      type: 'strategy' as const,
    },
    {
      title: 'Architecture & Design',
      description: 'Designs workflow automation, API integrations, and AI decision logic.',
      icon: LayoutGrid,
      activeAgents: 3,
      taskStatus: { completed: 8, total: 10 },
      type: 'architecture' as const,
    },
    {
      title: 'Research & Innovation',
      description: 'Conducts AI research, evaluates automation tools, and tests new workflows.',
      icon: FileSearch,
      activeAgents: 4,
      taskStatus: { completed: 15, total: 22 },
      type: 'research' as const,
    },
    {
      title: 'Compliance & Security',
      description: 'Ensures governance, privacy, and risk mitigation.',
      icon: Shield,
      activeAgents: 2,
      taskStatus: { completed: 18, total: 20 },
      type: 'compliance' as const,
    },
    {
      title: 'Development Division',
      description: 'Implements automation scripts, AI models, and API connections.',
      icon: Code,
      activeAgents: 7,
      taskStatus: { completed: 32, total: 45 },
      type: 'development' as const,
    },
    {
      title: 'Knowledge & Documentation',
      description: 'Maintains RAG-powered knowledge bases for each client agency.',
      icon: BookOpen,
      activeAgents: 3,
      taskStatus: { completed: 24, total: 30 },
      type: 'knowledge' as const,
    },
  ];

  return (
    <div className="space-y-10 py-6">
      <TransitionWrapper>
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight">Agency Dashboard</h2>
          <p className="text-flow-foreground/70">
            Monitor your AI-driven automation platform's overall performance and division activities.
          </p>
        </div>
      </TransitionWrapper>
      
      <section className="space-y-6">
        <TransitionWrapper delay={50}>
          <h3 className="text-xl font-medium">Performance Overview</h3>
        </TransitionWrapper>
        <StatsOverview />
      </section>
      
      <section className="space-y-6">
        <TransitionWrapper delay={100}>
          <h3 className="text-xl font-medium">Active Divisions</h3>
        </TransitionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((division, index) => (
            <DivisionCard
              key={division.title}
              {...division}
              delay={150 + (index * 50)}
            />
          ))}
        </div>
      </section>
      
      <section className="space-y-6">
        <TransitionWrapper delay={150}>
          <h3 className="text-xl font-medium">Top Performing Agents</h3>
        </TransitionWrapper>
        <AgentGrid />
      </section>
    </div>
  );
};

export default AgencyDashboard;
