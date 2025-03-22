import React from 'react';
import { 
  BookOpen, 
  BarChart, 
  LayoutGrid, 
  Shield, 
  DollarSign, 
  Users, 
  Share2, 
  MessagesSquare
} from 'lucide-react';
import { TransitionWrapper } from '../ui/TransitionWrapper';
import StatsOverview from './StatsOverview';
import DivisionCard from './DivisionCard';
import AgentGrid from '../agents/AgentGrid';
import TaskManagement from './TaskManagement';
import { useLanguage } from '@/contexts/LanguageContext';

const AgencyDashboard: React.FC = () => {
  const { t } = useLanguage();

  // Core divisions for a new business
  const coreDivisions = [
    {
      title: 'Knowledge Base (KB)',
      description: 'Builds and structures knowledge from scratch with automated content ingestion.',
      icon: BookOpen,
      activeAgents: 3,
      taskStatus: { completed: 24, total: 30 },
      type: 'knowledge' as const,
    },
    {
      title: 'Analytics Division',
      description: 'Establishes metrics and dashboards for early-stage growth tracking.',
      icon: BarChart,
      activeAgents: 3,
      taskStatus: { completed: 15, total: 22 },
      type: 'research' as const,
    },
    {
      title: 'Operations Division',
      description: 'Streamlines workflows and integrations for maximum efficiency.',
      icon: LayoutGrid,
      activeAgents: 4,
      taskStatus: { completed: 32, total: 45 },
      type: 'architecture' as const,
    },
  ];

  // Additional divisions for a new business
  const additionalDivisions = [
    {
      title: 'Strategy Division',
      description: 'Defines business strategy, goals, and conducts market research.',
      icon: Shield,
      activeAgents: 2,
      taskStatus: { completed: 18, total: 20 },
      type: 'compliance' as const,
    },
    {
      title: 'Marketing Division',
      description: 'Builds brand awareness, acquires customers, and executes campaigns.',
      icon: Share2,
      activeAgents: 3,
      taskStatus: { completed: 12, total: 15 },
      type: 'strategy' as const,
    },
    {
      title: 'Finance Division',
      description: 'Manages budgets, tracks expenses, and secures funding opportunities.',
      icon: DollarSign,
      activeAgents: 2,
      taskStatus: { completed: 8, total: 10 },
      type: 'development' as const,
    },
    {
      title: 'HR & Recruitment',
      description: 'Handles recruitment, employee onboarding, and team management.',
      icon: Users,
      activeAgents: 2,
      taskStatus: { completed: 5, total: 8 },
      type: 'strategy' as const,
    },
    {
      title: 'Customer Support',
      description: 'Manages support tickets, FAQs, and analyzes customer feedback.',
      icon: MessagesSquare,
      activeAgents: 3,
      taskStatus: { completed: 45, total: 60 },
      type: 'knowledge' as const,
    },
  ];

  // Combine all divisions for display
  const allDivisions = [...coreDivisions, ...additionalDivisions];

  return (
    <div className="space-y-10 py-6">
      <TransitionWrapper>
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight neon-text">{t('flowStateBusinessAgency')}</h2>
          <p className="text-flow-foreground/70">
            AI-powered automation for your growing business
          </p>
        </div>
      </TransitionWrapper>
      
      <section className="space-y-6">
        <TransitionWrapper delay={50}>
          <h3 className="text-xl font-medium neon-text">{t('performanceOverview')}</h3>
        </TransitionWrapper>
        <StatsOverview />
      </section>
      
      <section className="space-y-6">
        <TransitionWrapper delay={100}>
          <h3 className="text-xl font-medium neon-text">{t('taskOverview')}</h3>
        </TransitionWrapper>
        <TaskManagement />
      </section>
      
      <section className="space-y-6">
        <TransitionWrapper delay={150}>
          <h3 className="text-xl font-medium neon-text">{t('coreDivisions')}</h3>
          <p className="text-sm text-flow-foreground/70">
            Essential divisions included in our Basic Plan ($49/month)
          </p>
        </TransitionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreDivisions.map((division, index) => (
            <DivisionCard
              key={division.title}
              {...division}
              delay={200 + (index * 50)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <TransitionWrapper delay={250}>
          <h3 className="text-xl font-medium neon-text">{t('additionalDivisions')}</h3>
          <p className="text-sm text-flow-foreground/70">
            Unlock more capabilities with our Pro Plan ($199/month) or Premium Plan (Contact Sales)
          </p>
        </TransitionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalDivisions.map((division, index) => (
            <DivisionCard
              key={division.title}
              {...division}
              delay={300 + (index * 50)}
            />
          ))}
        </div>
      </section>
      
      <section className="space-y-6">
        <TransitionWrapper delay={350}>
          <h3 className="text-xl font-medium neon-text">{t('topPerformingAgents')}</h3>
        </TransitionWrapper>
        <AgentGrid />
      </section>

      <section className="space-y-6">
        <TransitionWrapper delay={400}>
          <div className="bg-flow-muted/30 p-6 rounded-xl border border-flow-border">
            <h3 className="text-xl font-medium mb-4 neon-text">{t('pricingPlans')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-flow-background border border-flow-border rounded-xl">
                <h4 className="text-lg font-medium">Basic Plan</h4>
                <div className="text-2xl font-bold my-3">$49<span className="text-sm font-normal text-flow-foreground/70">/month</span></div>
                <div className="text-sm text-flow-foreground/70 mb-4">Core divisions and basic workflows</div>
                <ul className="space-y-2 text-sm mb-6">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Knowledge Base Division
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Analytics Division
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Operations Division
                  </li>
                </ul>
                <button className="w-full px-4 py-2 bg-flow-accent text-flow-accent-foreground rounded-md">Get Started</button>
              </div>
              
              <div className="p-6 bg-flow-accent/10 border border-flow-accent rounded-xl relative">
                <div className="absolute -top-3 right-4 bg-flow-accent text-xs text-flow-accent-foreground px-3 py-1 rounded-full">Popular</div>
                <h4 className="text-lg font-medium">Pro Plan</h4>
                <div className="text-2xl font-bold my-3">$199<span className="text-sm font-normal text-flow-foreground/70">/month</span></div>
                <div className="text-sm text-flow-foreground/70 mb-4">Core divisions plus Strategy & Marketing</div>
                <ul className="space-y-2 text-sm mb-6">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    All Basic Plan features
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Strategy Division
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Marketing Division
                  </li>
                </ul>
                <button className="w-full px-4 py-2 bg-flow-accent text-flow-accent-foreground rounded-md">Upgrade Now</button>
              </div>
              
              <div className="p-6 bg-flow-background border border-flow-border rounded-xl">
                <h4 className="text-lg font-medium">Premium Plan</h4>
                <div className="text-2xl font-bold my-3">Custom<span className="text-sm font-normal text-flow-foreground/70">/month</span></div>
                <div className="text-sm text-flow-foreground/70 mb-4">All divisions with custom workflows</div>
                <ul className="space-y-2 text-sm mb-6">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    All Pro Plan features
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Finance Division
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Custom workflows & agents
                  </li>
                </ul>
                <button className="w-full px-4 py-2 bg-flow-background border border-flow-border text-flow-foreground rounded-md">Contact Sales</button>
              </div>
            </div>
          </div>
        </TransitionWrapper>
      </section>
    </div>
  );
};

export default AgencyDashboard;
