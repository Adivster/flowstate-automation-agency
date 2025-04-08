
import React from 'react';
import { Zap, MousePointerClick, UserPlus } from 'lucide-react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { Button } from '@/components/ui/button';
import { useDashboardActions } from '@/hooks/useDashboardActions';

const WelcomeHeader: React.FC = () => {
  const { handleCreateAgent, handleStartWorkflow, handleQuickTask } = useDashboardActions();

  return (
    <TransitionWrapper>
      <GlassMorphism className="p-5 rounded-xl border-flow-accent/30 animate-glow-pulse mb-4 bg-gradient-to-br from-flow-background/20 to-flow-accent/5">
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold neon-text">FlowState Business Agency</h2>
          <p className="text-flow-foreground/80">
            AI-powered automation for your growing business
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <Button 
              className="bg-flow-accent/80 hover:bg-flow-accent text-flow-accent-foreground rounded-md border border-flow-accent/50 shadow-[0_0_10px_rgba(217,70,239,0.3)] transition-all duration-300 hover:scale-105"
              onClick={handleStartWorkflow}
            >
              <Zap className="w-4 h-4 mr-2" />
              Start New Workflow
            </Button>
            <Button 
              variant="outline" 
              className="border-flow-border/50 hover:border-flow-accent/50 hover:text-flow-accent transition-all duration-300"
              onClick={handleQuickTask}
            >
              <MousePointerClick className="w-4 h-4 mr-2" />
              Quick Task Creation
            </Button>
            <Button 
              variant="outline" 
              className="border-flow-border/50 hover:border-flow-accent/50 hover:text-flow-accent transition-all duration-300"
              onClick={handleCreateAgent}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              New Agent
            </Button>
          </div>
        </div>
      </GlassMorphism>
    </TransitionWrapper>
  );
};

export default WelcomeHeader;
