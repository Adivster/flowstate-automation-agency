
import React, { useState } from 'react';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Award, TrendingUp, ChevronRight, Zap, Users, LineChart, Check, ArrowRight, BarChart3, Target, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/providers/theme-provider';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const GrowthCenter: React.FC = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [badges, setBadges] = useState([
    { name: '100 Tasks Completed', achieved: true, date: 'Apr 23', icon: Check, color: 'amber' },
    { name: 'Knowledge Master', achieved: true, date: 'Apr 25', icon: BarChart3, color: 'blue' },
    { name: '30-Day Uptime', achieved: true, date: 'Apr 20', icon: Target, color: 'emerald' }
  ]);
  
  const [opportunities, setOpportunities] = useState([
    { title: 'Re-train Agent Alpha', description: '+15% efficiency potential', color: 'purple', applied: false },
    { title: 'Optimize KB Indexing', description: '+25% retrieval speed', color: 'blue', applied: false },
    { title: 'Update Auth Flow', description: '-30% login friction', color: 'emerald', applied: false }
  ]);
  
  const [topAgents, setTopAgents] = useState([
    { name: 'Agent Alpha', rank: 1, cloned: false },
    { name: 'Agent Bravo', rank: 2, cloned: false },
    { name: 'Agent Charlie', rank: 3, cloned: false }
  ]);
  
  const [topWorkflows, setTopWorkflows] = useState([
    { name: 'Customer Onboarding', rank: 1, scaled: false },
    { name: 'Document Processing', rank: 2, scaled: false },
    { name: 'Data Enrichment', rank: 3, scaled: false }
  ]);
  
  const [chartLoading, setChartLoading] = useState(false);
  
  const handleAction = (action: string, type: string = '', index: number = -1) => {
    toast({
      title: `${action} initiated`,
      description: `Processing your request for ${action.toLowerCase()}...`,
      duration: 3000,
    });
    
    // Update state based on the action
    if (type === 'opportunity' && index >= 0) {
      const updatedOpportunities = [...opportunities];
      updatedOpportunities[index] = { ...updatedOpportunities[index], applied: true };
      setOpportunities(updatedOpportunities);
      
      setTimeout(() => {
        toast({
          title: "Success",
          description: `${action} has been successfully applied!`,
          duration: 3000,
        });
      }, 2000);
    }
    
    if (type === 'agent' && index >= 0) {
      const updatedAgents = [...topAgents];
      updatedAgents[index] = { ...updatedAgents[index], cloned: true };
      setTopAgents(updatedAgents);
    }
    
    if (type === 'workflow' && index >= 0) {
      const updatedWorkflows = [...topWorkflows];
      updatedWorkflows[index] = { ...updatedWorkflows[index], scaled: true };
      setTopWorkflows(updatedWorkflows);
    }
    
    if (action === 'Forecast Next Week') {
      setChartLoading(true);
      setTimeout(() => {
        setChartLoading(false);
        toast({
          title: "Forecast Complete",
          description: "Next week projections show 12% improvement potential.",
          duration: 3000,
        });
      }, 2500);
    }
  };
  
  // Add a gradient-generating function for opportunity cards
  const getGradientForColor = (color: string, isDark: boolean) => {
    if (isDark) {
      switch (color) {
        case 'purple': return 'bg-gradient-to-br from-purple-900/30 to-purple-800/10';
        case 'blue': return 'bg-gradient-to-br from-blue-900/30 to-blue-800/10';
        case 'emerald': return 'bg-gradient-to-br from-emerald-900/30 to-emerald-800/10';
        default: return 'bg-gradient-to-br from-purple-900/30 to-purple-800/10';
      }
    } else {
      switch (color) {
        case 'purple': return 'bg-purple-50';
        case 'blue': return 'bg-blue-50';
        case 'emerald': return 'bg-emerald-50';
        default: return 'bg-purple-50';
      }
    }
  };
  
  const getBorderForColor = (color: string) => {
    switch (color) {
      case 'purple': return 'border-purple-500/30';
      case 'blue': return 'border-blue-500/30';
      case 'emerald': return 'border-emerald-500/30';
      default: return 'border-purple-500/30';
    }
  };
  
  const getTextForColor = (color: string) => {
    switch (color) {
      case 'purple': return 'text-purple-400';
      case 'blue': return 'text-blue-400';
      case 'emerald': return 'text-emerald-400';
      default: return 'text-purple-400';
    }
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
            {badges.map((badge, i) => (
              <motion.div 
                key={i}
                className={cn(
                  "p-4 rounded-lg border flex flex-col items-center text-center",
                  isDark 
                    ? `bg-gradient-to-b from-${badge.color}-900/20 to-${badge.color}-800/5 border-${badge.color}-500/30` 
                    : `bg-${badge.color}-50 border-${badge.color}-200/60`
                )}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`p-3 rounded-full bg-${badge.color}-500/20 mb-2`}>
                  <badge.icon className={`h-6 w-6 text-${badge.color}-400`} />
                </div>
                <h4 className="font-medium text-sm">{badge.name}</h4>
                <p className="text-xs text-flow-foreground/60 mt-1">Achieved {badge.date}</p>
              </motion.div>
            ))}
          </div>
        </GlassMorphism>
        
        {/* Weekly Growth Trends */}
        <GlassMorphism className="p-5 rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            {isDark && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/10 to-transparent bg-[length:200%_100%] animate-[shimmer_8s_infinite]"></div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-4 relative z-10">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold">Weekly Growth Trends</h3>
          </div>
          
          <div className={cn(
            "h-40 rounded-lg border flex items-center justify-center relative",
            isDark 
              ? "bg-blue-900/10 border-blue-500/20" 
              : "bg-blue-50 border-blue-200"
          )}>
            {chartLoading ? (
              <div className="text-center">
                <RefreshCw className="h-8 w-8 text-blue-400 mx-auto mb-2 opacity-60 animate-spin" />
                <p className="text-flow-foreground/70 text-sm">Generating forecast data...</p>
              </div>
            ) : (
              <div className="text-center">
                <LineChart className="h-8 w-8 text-blue-400 mx-auto mb-2 opacity-60" />
                <p className="text-flow-foreground/70 text-sm">KPI and growth visualization chart</p>
              </div>
            )}
            
            {/* "Fake" chart grid lines for visual effect */}
            {isDark && !chartLoading && (
              <>
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-full h-px bg-blue-500/10"></div>
                  ))}
                </div>
                <div className="absolute inset-0 flex justify-between items-stretch pointer-events-none">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="h-full w-px bg-blue-500/10"></div>
                  ))}
                </div>
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-1/2 border-t-2 border-blue-400/50 opacity-60"
                  style={{
                    clipPath: "polygon(0% 100%, 5% 80%, 10% 85%, 15% 65%, 20% 70%, 30% 40%, 40% 50%, 50% 20%, 60% 40%, 75% 10%, 85% 30%, 95% 15%, 100% 30%, 100% 100%)"
                  }}
                  animate={chartLoading ? { opacity: 0 } : { opacity: 0.6 }}
                />
              </>
            )}
          </div>
          
          <div className="flex justify-end mt-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn(
                "text-xs flex items-center gap-1",
                isDark ? "text-blue-300 hover:text-blue-200 hover:bg-blue-900/30" : "text-blue-600 hover:bg-blue-50"
              )}
              onClick={() => handleAction('Forecast Next Week')}
              disabled={chartLoading}
            >
              {chartLoading ? (
                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
              ) : (
                <ArrowRight className="h-3 w-3 mr-1" />
              )}
              Forecast Next Week
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
            {opportunities.map((opportunity, i) => (
              <Card 
                key={i} 
                className={cn(
                  "p-4 border",
                  getGradientForColor(opportunity.color, isDark),
                  getBorderForColor(opportunity.color)
                )}
              >
                <h4 className="font-medium text-sm">{opportunity.title}</h4>
                <p className={cn(
                  "text-xs mt-1",
                  getTextForColor(opportunity.color)
                )}>
                  {opportunity.description}
                </p>
                
                <Button 
                  variant={opportunity.applied ? "default" : "ghost"} 
                  size="sm" 
                  className={cn(
                    "w-full mt-3 text-xs justify-center",
                    opportunity.applied 
                      ? `bg-${opportunity.color === 'purple' ? 'purple' : opportunity.color === 'blue' ? 'blue' : 'emerald'}-600 hover:bg-${opportunity.color === 'purple' ? 'purple' : opportunity.color === 'blue' ? 'blue' : 'emerald'}-700` 
                      : `text-${opportunity.color === 'purple' ? 'purple' : opportunity.color === 'blue' ? 'blue' : 'emerald'}-400 hover:bg-${opportunity.color === 'purple' ? 'purple' : opportunity.color === 'blue' ? 'blue' : 'emerald'}-500/20`
                  )}
                  disabled={opportunity.applied}
                  onClick={() => handleAction(`Apply ${opportunity.title}`, 'opportunity', i)}
                >
                  {opportunity.applied ? "Applied ✓" : "Apply Now"}
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
                {topAgents.map((agent, i) => (
                  <motion.div 
                    key={i}
                    className={cn(
                      "p-3 rounded-lg border flex items-center justify-between",
                      isDark 
                        ? "bg-flow-background/40 border-flow-border/30" 
                        : "bg-white border-gray-100"
                    )}
                    whileHover={{ x: 3 }}
                  >
                    <div className="flex items-center">
                      <div className={cn(
                        "h-5 w-5 rounded-full mr-2 flex items-center justify-center text-[10px] font-bold",
                        i === 0 ? "bg-amber-400 text-amber-900" : 
                        i === 1 ? "bg-gray-300 text-gray-700" : 
                        "bg-amber-700 text-amber-200"
                      )}>
                        {agent.rank}
                      </div>
                      <span>{agent.name}</span>
                    </div>
                    <div>
                      <Button 
                        variant={agent.cloned ? "default" : "ghost"} 
                        size="sm" 
                        className={cn(
                          "h-7 px-2 text-xs",
                          agent.cloned ? "bg-green-600 hover:bg-green-700" : ""
                        )}
                        disabled={agent.cloned}
                        onClick={() => handleAction(`Clone ${agent.name}`, 'agent', i)}
                      >
                        {agent.cloned ? "Cloned ✓" : "Clone"}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Top Workflows */}
            <div>
              <h4 className="text-sm font-medium mb-3">Top Workflows</h4>
              <div className="space-y-2">
                {topWorkflows.map((flow, i) => (
                  <motion.div 
                    key={i}
                    className={cn(
                      "p-3 rounded-lg border flex items-center justify-between",
                      isDark 
                        ? "bg-flow-background/40 border-flow-border/30" 
                        : "bg-white border-gray-100"
                    )}
                    whileHover={{ x: 3 }}
                  >
                    <div className="flex items-center">
                      <div className={cn(
                        "h-5 w-5 rounded-full mr-2 flex items-center justify-center text-[10px] font-bold",
                        i === 0 ? "bg-amber-400 text-amber-900" : 
                        i === 1 ? "bg-gray-300 text-gray-700" : 
                        "bg-amber-700 text-amber-200"
                      )}>
                        {flow.rank}
                      </div>
                      <span>{flow.name}</span>
                    </div>
                    <div>
                      <Button 
                        variant={flow.scaled ? "default" : "ghost"} 
                        size="sm" 
                        className={cn(
                          "h-7 px-2 text-xs",
                          flow.scaled ? "bg-blue-600 hover:bg-blue-700" : "" 
                        )}
                        disabled={flow.scaled}
                        onClick={() => handleAction(`Scale ${flow.name}`, 'workflow', i)}
                      >
                        {flow.scaled ? "Scaled ✓" : "Scale"}
                      </Button>
                    </div>
                  </motion.div>
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
