
import React from 'react';
import { ExternalLink, BookOpen, BarChart, LayoutGrid, Shield, Share2, DollarSign, Users, MessagesSquare, TestTube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DivisionCard from '../DivisionCard';
import PricingPlans from '../PricingPlans';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { LucideIcon } from 'lucide-react';

interface DivisionData {
  title: string;
  description: string;
  icon: LucideIcon;
  activeAgents: number;
  taskStatus: { completed: number; total: number };
  type: 'strategy' | 'architecture' | 'research' | 'compliance' | 'development' | 'testing' | 'deployment' | 'knowledge' | 'performance';
  path: string;
}

const DivisionsTab: React.FC = () => {
  // These data structures were moved from AgencyDashboard to here
  const coreDivisions: DivisionData[] = [
    {
      title: 'Knowledge Base (KB)',
      description: 'Builds and structures knowledge from scratch with automated content ingestion.',
      icon: BookOpen,
      activeAgents: 3,
      taskStatus: { completed: 24, total: 30 },
      type: 'knowledge',
      path: '/knowledge'
    },
    {
      title: 'Analytics Division',
      description: 'Establishes metrics and dashboards for early-stage growth tracking.',
      icon: BarChart,
      activeAgents: 3,
      taskStatus: { completed: 15, total: 22 },
      type: 'research',
      path: '/analytics'
    },
    {
      title: 'Operations Division',
      description: 'Streamlines workflows and integrations for maximum efficiency.',
      icon: LayoutGrid,
      activeAgents: 4,
      taskStatus: { completed: 32, total: 45 },
      type: 'architecture',
      path: '/workflows'
    },
  ];

  const additionalDivisions: DivisionData[] = [
    {
      title: 'Strategy Division',
      description: 'Defines business strategy, goals, and conducts market research.',
      icon: Shield,
      activeAgents: 2,
      taskStatus: { completed: 18, total: 20 },
      type: 'compliance',
      path: '/workflows'
    },
    {
      title: 'Marketing Division',
      description: 'Builds brand awareness, acquires customers, and executes campaigns.',
      icon: Share2,
      activeAgents: 3,
      taskStatus: { completed: 12, total: 15 },
      type: 'strategy',
      path: '/workflows'
    },
    {
      title: 'Finance Division',
      description: 'Manages budgets, tracks expenses, and secures funding opportunities.',
      icon: DollarSign,
      activeAgents: 2,
      taskStatus: { completed: 8, total: 10 },
      type: 'development',
      path: '/workflows'
    },
    {
      title: 'HR & Recruitment',
      description: 'Handles recruitment, employee onboarding, and team management.',
      icon: Users,
      activeAgents: 2,
      taskStatus: { completed: 5, total: 8 },
      type: 'strategy',
      path: '/workflows'
    },
    {
      title: 'Customer Support',
      description: 'Manages support tickets, FAQs, and analyzes customer feedback.',
      icon: MessagesSquare,
      activeAgents: 3,
      taskStatus: { completed: 45, total: 60 },
      type: 'knowledge',
      path: '/knowledge'
    },
    {
      title: 'Research Division',
      description: 'Explores new technologies, market trends, and innovation opportunities.',
      icon: TestTube,
      activeAgents: 4,
      taskStatus: { completed: 22, total: 30 },
      type: 'research',
      path: '/analytics'
    },
  ];

  return (
    <div className="space-y-6">
      <section className="space-y-5">
        <TransitionWrapper delay={150}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-medium neon-text">Core Divisions</h3>
            <Link to="/workflows">
              <Button variant="ghost" className="text-xs text-flow-foreground/70 hover:text-flow-accent group flex items-center">
                <ExternalLink className="mr-1 h-4 w-4" />
                Manage All Divisions
              </Button>
            </Link>
          </div>
          <p className="text-sm text-flow-foreground/60 mb-4">
            Essential divisions included in our Basic Plan ($49/month)
          </p>
        </TransitionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreDivisions.map((division, index) => (
            <Link key={division.title} to={division.path}>
              <DivisionCard
                {...division}
                delay={200 + (index * 50)}
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <TransitionWrapper delay={250}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-medium neon-text">Additional Divisions</h3>
            <Link to="/workflows">
              <Button variant="ghost" className="text-xs text-flow-foreground/70 hover:text-flow-accent group flex items-center">
                <ExternalLink className="mr-1 h-4 w-4" />
                Explore Premium Divisions
              </Button>
            </Link>
          </div>
          <p className="text-sm text-flow-foreground/60 mb-4">
            Unlock more capabilities with our Pro Plan ($199/month) or Premium Plan (Contact Sales)
          </p>
        </TransitionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalDivisions.map((division, index) => (
            <Link key={division.title} to={division.path}>
              <DivisionCard
                {...division}
                delay={300 + (index * 50)}
              />
            </Link>
          ))}
        </div>
      </section>
      
      <PricingPlans />
    </div>
  );
};

export default DivisionsTab;
