
import React from 'react';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Button } from '@/components/ui/button';
import { TrendingUp, Zap, Lightbulb, ArrowRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const GlobalOpportunityPlaybook: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toast } = useToast();
  
  const handleApplyTweak = () => {
    toast({
      title: "Applying optimization",
      description: "Fine-tuning Support Bot responses for improved user satisfaction.",
      duration: 3000,
    });
  };
  
  const handleExploreTrend = () => {
    toast({
      title: "Exploring trend details",
      description: "Opening detailed analysis of user satisfaction metrics.",
      duration: 3000,
    });
  };
  
  return (
    <TransitionWrapper delay={50}>
      <GlassMorphism className="p-5 border-flow-accent/20 rounded-xl overflow-hidden">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={cn(
                "p-2 rounded-lg mr-3",
                isDark ? "bg-blue-500/20" : "bg-blue-500/10"
              )}>
                <Lightbulb className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold">Global Opportunity Playbook</h3>
            </div>
            <span className={cn(
              "text-xs px-2 py-1 rounded-full",
              isDark ? "bg-green-500/20 text-green-400" : "bg-green-500/10 text-green-600"
            )}>
              🔆 +8 hrs saved/week
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className={cn(
              "flex-1 h-20 rounded-lg flex items-center justify-center",
              isDark ? "bg-blue-900/20" : "bg-blue-50"
            )}>
              <TrendingUp className="h-10 w-10 text-blue-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">User satisfaction climbed 12%</h4>
              <p className="text-sm text-flow-foreground/70">Why it matters: Happy users drive retention.</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">3-step plan:</h4>
            <div className="space-y-1">
              <div className="flex items-center text-sm">
                <span className="bg-blue-500/20 text-blue-400 rounded-full h-5 w-5 inline-flex items-center justify-center text-xs mr-2">1</span>
                Fine-tune "Support Bot" responses
              </div>
              <div className="flex items-center text-sm">
                <span className="bg-blue-500/20 text-blue-400 rounded-full h-5 w-5 inline-flex items-center justify-center text-xs mr-2">2</span>
                Offer proactive tips in-chat
              </div>
              <div className="flex items-center text-sm">
                <span className="bg-blue-500/20 text-blue-400 rounded-full h-5 w-5 inline-flex items-center justify-center text-xs mr-2">3</span>
                Measure NPS after update
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-2">
            <Button 
              size="sm" 
              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30"
              onClick={handleApplyTweak}
            >
              <Zap className="h-4 w-4 mr-2" />
              Apply Tweak
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="text-flow-foreground/70 border-flow-border"
              onClick={handleExploreTrend}
            >
              <ArrowRight className="h-4 w-4 mr-1" />
              Explore Trend
            </Button>
          </div>
        </div>
      </GlassMorphism>
    </TransitionWrapper>
  );
};

export default GlobalOpportunityPlaybook;
