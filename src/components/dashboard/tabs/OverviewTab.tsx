
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import AISystemStatus from '../AISystemStatus';
import PersonalizedSection from '../PersonalizedSection';
import StatsOverview from '../StatsOverview';
import AIInsights from '../AIInsights';
import TaskManagement from '../TaskManagement';
import InteractiveSystemDiagram from '../InteractiveSystemDiagram';
import ResourceUsageSection from '../ResourceUsageSection';

const OverviewTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <AISystemStatus />
        </div>
        <div className="md:col-span-1">
          <PersonalizedSection />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <section>
            <TransitionWrapper delay={50}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-medium neon-text">Performance Overview</h3>
                <Link to="/analytics">
                  <Button variant="ghost" className="text-xs text-flow-foreground/70 hover:text-flow-accent group flex items-center">
                    View Analytics <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-flow-foreground/60 mb-3">Key metrics and performance indicators for your agency</p>
            </TransitionWrapper>
            <StatsOverview />
          </section>
        </div>
        <div className="md:col-span-1">
          <AIInsights />
        </div>
      </div>
      
      <section>
        <TransitionWrapper delay={100}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-medium neon-text">Task Management</h3>
            <Link to="/tasks">
              <Button variant="ghost" className="text-xs text-flow-foreground/70 hover:text-flow-accent group flex items-center">
                View All Tasks <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-flow-foreground/60 mb-3">Current tasks and their status across all divisions</p>
        </TransitionWrapper>
        <TaskManagement />
      </section>
      
      <section className="mt-4">
        <InteractiveSystemDiagram />
      </section>
      
      <ResourceUsageSection />
    </div>
  );
};

export default OverviewTab;
