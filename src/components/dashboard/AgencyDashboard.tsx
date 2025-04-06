
import React from 'react';
import { 
  BookOpen, 
  BarChart, 
  LayoutGrid, 
  Shield, 
  DollarSign, 
  Users, 
  Share2, 
  MessagesSquare,
  TestTube,
  Zap,
  ChevronRight,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { TransitionWrapper } from '../ui/TransitionWrapper';
import StatsOverview from './StatsOverview';
import DivisionCard from './DivisionCard';
import AgentGrid from '../agents/AgentGrid';
import TaskManagement from './TaskManagement';
import { useLanguage } from '@/contexts/LanguageContext';
import { GlassMorphism } from '../ui/GlassMorphism';
import { Button } from '../ui/button';
import { PieChart } from '../ui/chart';
import { Link } from 'react-router-dom';

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
    {
      title: 'Research Division',
      description: 'Explores new technologies, market trends, and innovation opportunities.',
      icon: TestTube,
      activeAgents: 4,
      taskStatus: { completed: 22, total: 30 },
      type: 'research' as const,
    },
  ];

  // Combine all divisions for display
  const allDivisions = [...coreDivisions, ...additionalDivisions];
  
  // Resource usage data for pie chart
  const resourceData = [
    { name: 'Knowledge Base', value: 32, description: 'Content management and retrieval systems' },
    { name: 'Marketing', value: 25, description: 'Campaign automation and analytics' },
    { name: 'Operations', value: 20, description: 'Workflow optimization and task management' },
    { name: 'Strategy', value: 15, description: 'Planning and market intelligence' },
    { name: 'Support', value: 8, description: 'Customer ticketing and feedback analysis' },
  ];

  return (
    <div className="space-y-10 py-4 md:py-6">
      <TransitionWrapper>
        <GlassMorphism className="p-6 rounded-xl border-flow-accent/30 animate-glow-pulse mb-6 bg-gradient-to-br from-flow-background/20 to-flow-accent/5">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold mb-1 neon-text">FlowState Business Agency</h2>
            <p className="text-flow-foreground/80">
              AI-powered automation for your growing business
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Button className="bg-flow-accent/80 hover:bg-flow-accent text-flow-accent-foreground rounded-md border border-flow-accent/50 shadow-[0_0_10px_rgba(217,70,239,0.3)] transition-all duration-300 hover:scale-105">
                <Zap className="w-4 h-4 mr-2" />
                Create New Workflow
              </Button>
              <Button variant="outline" className="border-flow-border/50 hover:border-flow-accent/50 hover:text-flow-accent transition-all duration-300">
                <Users className="w-4 h-4 mr-2" />
                Manage Agents
              </Button>
            </div>
          </div>
        </GlassMorphism>
      </TransitionWrapper>
      
      <section className="space-y-5">
        <TransitionWrapper delay={50}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-medium neon-text">Performance Overview</h3>
            <Link to="/performance">
              <Button variant="ghost" className="text-xs text-flow-foreground/70 hover:text-flow-accent group flex items-center">
                View Details <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-flow-foreground/60 mb-4">Key metrics and performance indicators for your agency</p>
        </TransitionWrapper>
        <StatsOverview />
      </section>
      
      <section className="space-y-5">
        <TransitionWrapper delay={100}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-medium neon-text">Task Overview</h3>
            <Link to="/tasks">
              <Button variant="ghost" className="text-xs text-flow-foreground/70 hover:text-flow-accent group flex items-center">
                View All Tasks <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-flow-foreground/60 mb-4">Current tasks and their status across all divisions</p>
        </TransitionWrapper>
        <TaskManagement />
      </section>
      
      {/* Resource Usage Section */}
      <section className="space-y-5">
        <TransitionWrapper delay={130}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-medium neon-text">Resource Usage</h3>
            <Link to="/analytics">
              <Button variant="ghost" className="text-xs text-flow-foreground/70 hover:text-flow-accent group flex items-center">
                View Analytics <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-flow-foreground/60 mb-4">Resource allocation and key performance indicators across divisions</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <GlassMorphism className="p-5 sm:p-6 rounded-xl bg-flow-background/20 hover:bg-flow-background/30 transition-all duration-300">
              <h4 className="text-lg font-medium mb-4 flex items-center">
                <BarChart className="w-4 h-4 mr-2 text-flow-accent" />
                Division Resource Allocation
              </h4>
              <div className="h-[260px]">
                <PieChart 
                  data={resourceData} 
                  donut={true} 
                  gradient={true}
                  interactive={true}
                  colors={['#6366f1', '#f97316', '#0ea5e9', '#8b5cf6', '#22c55e']}
                />
              </div>
            </GlassMorphism>
            <GlassMorphism className="p-5 sm:p-6 rounded-xl bg-flow-background/20 hover:bg-flow-background/30 transition-all duration-300">
              <h4 className="text-lg font-medium mb-4 flex items-center">
                <BarChart className="w-4 h-4 mr-2 text-flow-accent" />
                Key Performance Indicators
              </h4>
              <div className="space-y-4">
                {['Workflow Efficiency', 'Agent Productivity', 'Task Completion Rate', 'System Reliability'].map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{metric}</span>
                      <span className="font-mono">{75 + index * 5}%</span>
                    </div>
                    <div className="w-full bg-flow-muted/20 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-2 rounded-full transition-all duration-500 animate-pulse-subtle"
                        style={{ 
                          width: `${75 + index * 5}%`,
                          background: `linear-gradient(90deg, #8b5cf670, ${['#6366f1', '#f97316', '#0ea5e9', '#8b5cf6'][index % 4]})`,
                          boxShadow: `0 0 8px ${['#6366f1', '#f97316', '#0ea5e9', '#8b5cf6'][index % 4]}`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassMorphism>
          </div>
        </TransitionWrapper>
      </section>
      
      <section className="space-y-5">
        <TransitionWrapper delay={150}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-medium neon-text">Core Divisions</h3>
            <Link to="/divisions">
              <Button variant="ghost" className="text-xs text-flow-foreground/70 hover:text-flow-accent group flex items-center">
                <ExternalLink className="mr-1 h-4 w-4" />
                Manage Divisions
              </Button>
            </Link>
          </div>
          <p className="text-sm text-flow-foreground/60 mb-4">
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

      <section className="space-y-5">
        <TransitionWrapper delay={250}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-medium neon-text">Additional Divisions</h3>
            <Link to="/divisions/premium">
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
            <DivisionCard
              key={division.title}
              {...division}
              delay={300 + (index * 50)}
            />
          ))}
        </div>
      </section>
      
      <section className="space-y-5">
        <TransitionWrapper delay={350}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-medium neon-text">Top Performing Agents</h3>
            <Link to="/agents">
              <Button variant="ghost" className="text-xs text-flow-foreground/70 hover:text-flow-accent group flex items-center">
                View All Agents <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-flow-foreground/60 mb-4">Agents with the highest efficiency and task completion rates</p>
        </TransitionWrapper>
        <AgentGrid maxAgents={3} showAsGrid={false} />
      </section>

      <section className="space-y-6">
        <TransitionWrapper delay={400}>
          <GlassMorphism className="p-6 rounded-xl backdrop-blur-lg bg-flow-background/20">
            <h3 className="text-xl font-medium mb-4 neon-text">Pricing Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlassMorphism intensity="low" className="p-6 rounded-xl transition-all duration-300 hover:shadow-md hover:border-flow-border/50 relative overflow-hidden">
                <div className="relative z-10">
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
                  <Button className="w-full px-4 py-2 bg-flow-accent/80 hover:bg-flow-accent text-flow-accent-foreground rounded-md border border-flow-accent/50 transition-all duration-300 hover:scale-105">
                    Get Started
                  </Button>
                </div>
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent to-flow-background/30 pointer-events-none"></div>
              </GlassMorphism>
              
              <GlassMorphism className="p-6 rounded-xl bg-flow-accent/5 border-flow-accent shadow-[0_0_15px_rgba(217,70,239,0.2)] relative transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,70,239,0.3)]">
                <div className="absolute -top-3 right-4 bg-flow-accent text-xs text-flow-accent-foreground px-3 py-1 rounded-full">Popular</div>
                <div className="relative z-10">
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
                  <Button className="w-full px-4 py-2 bg-flow-accent text-flow-accent-foreground shadow-[0_0_10px_rgba(217,70,239,0.3)] rounded-md border border-flow-accent/80 transition-all duration-300 hover:scale-105">
                    Upgrade Now
                  </Button>
                </div>
                <div className="absolute -top-5 -right-5 w-40 h-40 bg-flow-accent/10 rounded-full blur-3xl pointer-events-none"></div>
              </GlassMorphism>
              
              <GlassMorphism intensity="low" className="p-6 rounded-xl transition-all duration-300 hover:shadow-md hover:border-flow-border/50 relative overflow-hidden">
                <div className="relative z-10">
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
                  <Button variant="outline" className="w-full px-4 py-2 border-flow-border hover:border-flow-accent/50 rounded-md transition-all duration-300 hover:text-flow-accent">
                    Contact Sales
                  </Button>
                </div>
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent to-flow-background/30 pointer-events-none"></div>
              </GlassMorphism>
            </div>
          </GlassMorphism>
        </TransitionWrapper>
      </section>
    </div>
  );
};

export default AgencyDashboard;
