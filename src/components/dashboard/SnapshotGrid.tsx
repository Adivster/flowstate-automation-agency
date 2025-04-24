import React from 'react';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Button } from '@/components/ui/button';
import { Users, Workflow, BookOpen, TrendingUp, Copy, BarChart, ArrowUpRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const SnapshotGrid: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toast } = useToast();
  
  const handleAction = (action: string, type: string) => {
    toast({
      title: `${action} ${type}`,
      description: `Opening ${action.toLowerCase()} interface for ${type.toLowerCase()}...`,
      duration: 3000,
    });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <TransitionWrapper delay={100}>
        <GlassMorphism className="p-4 rounded-xl overflow-hidden h-full">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-5 w-5 text-emerald-400" />
            <h3 className="font-medium">Agents Snapshot</h3>
            <Link to="/agents" className="text-xs text-flow-foreground/60 ml-auto hover:text-flow-accent">
              View All
              <ArrowUpRight className="h-3 w-3 inline ml-1" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {/* Top Agent */}
            <div className={cn(
              "p-3 rounded-lg border",
              isDark ? "bg-emerald-950/30 border-emerald-800/30" : "bg-emerald-50/50 border-emerald-100"
            )}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">SupportBot</span>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                  +42 hrs saved
                </span>
              </div>
              
              <div className="flex items-center mt-2 mb-1">
                <div className="flex-1">
                  <div className="h-8 bg-emerald-500/20 rounded-md flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                  </div>
                </div>
                <div className="flex-1 text-xs ml-2">
                  <p className="font-medium">Completed +15% more tasks</p>
                </div>
              </div>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAction('Scale', 'Agent')}
                className="w-full mt-2 text-xs border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
              >
                Scale Agent
              </Button>
            </div>
            
            {/* Other Agents (simplified) */}
            <div className="p-3 rounded-lg border-dashed border border-flow-border/40">
              <div className="flex justify-between items-center">
                <span className="font-medium">DataAnalystBot</span>
                <span className="text-xs text-flow-foreground/70">+28 hrs saved</span>
              </div>
            </div>
            
            <div className="p-3 rounded-lg border-dashed border border-flow-border/40">
              <div className="flex justify-between items-center">
                <span className="font-medium">ResearchAgent</span>
                <span className="text-xs text-flow-foreground/70">+22 hrs saved</span>
              </div>
            </div>
          </div>
        </GlassMorphism>
      </TransitionWrapper>
      
      <TransitionWrapper delay={150}>
        <GlassMorphism className="p-4 rounded-xl overflow-hidden h-full">
          <div className="flex items-center gap-2 mb-3">
            <Workflow className="h-5 w-5 text-orange-400" />
            <h3 className="font-medium">Workflows Snapshot</h3>
            <Link to="/tasks-flows" className="text-xs text-flow-foreground/60 ml-auto hover:text-flow-accent">
              View All
              <ArrowUpRight className="h-3 w-3 inline ml-1" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {/* Top Workflow */}
            <div className={cn(
              "p-3 rounded-lg border",
              isDark ? "bg-orange-950/30 border-orange-800/30" : "bg-orange-50/50 border-orange-100"
            )}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">Customer Onboarding</span>
                <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">
                  +20% MoM
                </span>
              </div>
              
              <div className="flex items-center mt-2 mb-1">
                <div className="flex-1">
                  <div className="h-8 bg-orange-500/20 rounded-md flex items-center justify-center">
                    <BarChart className="h-4 w-4 text-orange-400" />
                  </div>
                </div>
                <div className="flex-1 text-xs ml-2">
                  <p className="font-medium">Runs up 20% MoM—double down?</p>
                </div>
              </div>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAction('Clone', 'Workflow')}
                className="w-full mt-2 text-xs border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
              >
                <Copy className="h-3 w-3 mr-1" />
                Clone & Expand
              </Button>
            </div>
            
            {/* Other Workflows (simplified) */}
            <div className="p-3 rounded-lg border-dashed border border-flow-border/40">
              <div className="flex justify-between items-center">
                <span className="font-medium">Data Processing</span>
                <span className="text-xs text-flow-foreground/70">+15% MoM</span>
              </div>
            </div>
            
            <div className="p-3 rounded-lg border-dashed border border-flow-border/40">
              <div className="flex justify-between items-center">
                <span className="font-medium">Email Campaign</span>
                <span className="text-xs text-flow-foreground/70">+12% MoM</span>
              </div>
            </div>
          </div>
        </GlassMorphism>
      </TransitionWrapper>
      
      <TransitionWrapper delay={200}>
        <GlassMorphism className="p-4 rounded-xl overflow-hidden h-full">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-5 w-5 text-purple-400" />
            <h3 className="font-medium">Knowledge Snapshot</h3>
            <Link to="/knowledge" className="text-xs text-flow-foreground/60 ml-auto hover:text-flow-accent">
              View All
              <ArrowUpRight className="h-3 w-3 inline ml-1" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {/* Top Knowledge Item */}
            <div className={cn(
              "p-3 rounded-lg border",
              isDark ? "bg-purple-950/30 border-purple-800/30" : "bg-purple-50/50 border-purple-100"
            )}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">Customer Support Guide</span>
                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">
                  Recently indexed
                </span>
              </div>
              
              <div className="flex items-center mt-2 mb-1">
                <div className="flex-1">
                  <div className="h-8 bg-purple-500/20 rounded-md flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-purple-400" />
                  </div>
                </div>
                <div className="flex-1 text-xs ml-2">
                  <p className="font-medium">Confidence ↑ 18% after ingest</p>
                </div>
              </div>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAction('Train', 'Topics')}
                className="w-full mt-2 text-xs border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
              >
                Train More Topics
              </Button>
            </div>
            
            {/* Other Knowledge Items (simplified) */}
            <div className="p-3 rounded-lg border-dashed border border-flow-border/40">
              <div className="flex justify-between items-center">
                <span className="font-medium">Product Manual</span>
                <span className="text-xs text-flow-foreground/70">Recently indexed</span>
              </div>
            </div>
            
            <div className="p-3 rounded-lg border-dashed border border-flow-border/40">
              <div className="flex justify-between items-center">
                <span className="font-medium">Compliance Guide</span>
                <span className="text-xs text-flow-foreground/70">Recently indexed</span>
              </div>
            </div>
          </div>
        </GlassMorphism>
      </TransitionWrapper>
    </div>
  );
};

export default SnapshotGrid;
