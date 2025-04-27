
import React from 'react';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Award, TrendingUp, ChevronRight, Zap, Users, LineChart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/providers/theme-provider';
import { cn } from '@/lib/utils';

const GrowthCenter: React.FC = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const handleAction = (action: string) => {
    toast({
      title: `${action} initiated`,
      description: `Processing your request for ${action.toLowerCase()}...`,
      duration: 3000,
    });
  };
  
  return (
    <TransitionWrapper>
      <div className="space-y-4">
        {/* Achievement Badges */}
        <GlassMorphism className="p-5 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-amber-400" />
            <h3 className="text-lg font-semibold">Achievement Badges</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['100 Tasks Completed', 'Knowledge Master', '30-Day Uptime'].map((badge, i) => (
              <div 
                key={i}
                className={cn(
                  "p-4 rounded-lg border flex flex-col items-center text-center",
                  isDark 
                    ? "bg-gradient-to-b from-amber-900/20 to-amber-800/5 border-amber-500/30" 
                    : "bg-amber-50 border-amber-200/60"
                )}
              >
                <div className="p-3 rounded-full bg-amber-500/20 mb-2">
                  <Award className={cn("h-6 w-6", i === 0 ? "text-amber-400" : i === 1 ? "text-blue-400" : "text-emerald-400")} />
                </div>
                <h4 className="font-medium text-sm">{badge}</h4>
                <p className="text-xs text-flow-foreground/60 mt-1">Achieved Apr 23</p>
              </div>
            ))}
          </div>
        </GlassMorphism>
        
        {/* Weekly Growth Trends */}
        <GlassMorphism className="p-5 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold">Weekly Growth Trends</h3>
          </div>
          
          <div className={cn(
            "h-40 rounded-lg border flex items-center justify-center",
            isDark 
              ? "bg-blue-900/10 border-blue-500/20" 
              : "bg-blue-50 border-blue-200"
          )}>
            <div className="text-center">
              <LineChart className="h-8 w-8 text-blue-400 mx-auto mb-2 opacity-60" />
              <p className="text-flow-foreground/70 text-sm">KPI and growth visualization chart would appear here</p>
            </div>
          </div>
          
          <div className="flex justify-end mt-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-flow-foreground/70"
              onClick={() => handleAction('Forecast Next Week')}
            >
              Forecast Next Week
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </GlassMorphism>
        
        {/* Opportunity Highlights */}
        <GlassMorphism className="p-5 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-semibold">Opportunity Highlights</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { title: 'Re-train Agent Alpha', description: '+15% efficiency potential', color: 'purple' },
              { title: 'Optimize KB Indexing', description: '+25% retrieval speed', color: 'blue' },
              { title: 'Update Auth Flow', description: '-30% login friction', color: 'emerald' },
            ].map((opportunity, i) => (
              <Card 
                key={i} 
                className={cn(
                  "p-4 border",
                  isDark 
                    ? `bg-${opportunity.color}-900/10 border-${opportunity.color}-500/30` 
                    : `bg-${opportunity.color}-50 border-${opportunity.color}-200/60`
                )}
              >
                <h4 className="font-medium text-sm">{opportunity.title}</h4>
                <p className={cn(
                  "text-xs mt-1",
                  opportunity.color === 'purple' ? 'text-purple-400' : 
                  opportunity.color === 'blue' ? 'text-blue-400' : 
                  'text-emerald-400'
                )}>
                  {opportunity.description}
                </p>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "w-full mt-3 text-xs justify-center",
                    opportunity.color === 'purple' ? 'text-purple-400 hover:bg-purple-500/20' : 
                    opportunity.color === 'blue' ? 'text-blue-400 hover:bg-blue-500/20' : 
                    'text-emerald-400 hover:bg-emerald-500/20'
                  )}
                  onClick={() => handleAction(`Apply ${opportunity.title}`)}
                >
                  Apply Now
                </Button>
              </Card>
            ))}
          </div>
        </GlassMorphism>
        
        {/* Leaderboards */}
        <GlassMorphism className="p-5 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-green-400" />
            <h3 className="text-lg font-semibold">Leaderboards</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Top Agents */}
            <div>
              <h4 className="text-sm font-medium mb-3">Top Agents</h4>
              <div className="space-y-2">
                {['Agent Alpha', 'Agent Bravo', 'Agent Charlie'].map((agent, i) => (
                  <div 
                    key={i}
                    className={cn(
                      "p-3 rounded-lg border flex items-center justify-between",
                      isDark 
                        ? "bg-flow-background/40 border-flow-border/30" 
                        : "bg-white border-gray-100"
                    )}
                  >
                    <div className="flex items-center">
                      <div className={cn(
                        "h-5 w-5 rounded-full mr-2 flex items-center justify-center text-[10px] font-bold",
                        i === 0 ? "bg-amber-400 text-amber-900" : 
                        i === 1 ? "bg-gray-300 text-gray-700" : 
                        "bg-amber-700 text-amber-200"
                      )}>
                        {i + 1}
                      </div>
                      <span>{agent}</span>
                    </div>
                    <div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-xs"
                        onClick={() => handleAction(`Clone ${agent}`)}
                      >
                        Clone
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Top Workflows */}
            <div>
              <h4 className="text-sm font-medium mb-3">Top Workflows</h4>
              <div className="space-y-2">
                {['Customer Onboarding', 'Document Processing', 'Data Enrichment'].map((flow, i) => (
                  <div 
                    key={i}
                    className={cn(
                      "p-3 rounded-lg border flex items-center justify-between",
                      isDark 
                        ? "bg-flow-background/40 border-flow-border/30" 
                        : "bg-white border-gray-100"
                    )}
                  >
                    <div className="flex items-center">
                      <div className={cn(
                        "h-5 w-5 rounded-full mr-2 flex items-center justify-center text-[10px] font-bold",
                        i === 0 ? "bg-amber-400 text-amber-900" : 
                        i === 1 ? "bg-gray-300 text-gray-700" : 
                        "bg-amber-700 text-amber-200"
                      )}>
                        {i + 1}
                      </div>
                      <span>{flow}</span>
                    </div>
                    <div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 px-2 text-xs"
                        onClick={() => handleAction(`Scale ${flow}`)}
                      >
                        Scale
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassMorphism>
      </div>
    </TransitionWrapper>
  );
};

export default GrowthCenter;
