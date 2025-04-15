import React, { useState, useEffect } from 'react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { 
  Lightbulb, Sparkles, ArrowUpRight, BarChart3, Users, 
  Bell, ChevronRight, BadgeCheck, Gauge, BrainCircuit,
  Zap, Target, TrendingUp, Award
} from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

const AIInsights: React.FC = () => {
  const { toast } = useToast();
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null);
  
  const insights = [
    {
      id: 1,
      type: 'performance',
      title: 'Traffic spike detected',
      description: 'Your website traffic increased by 27% over the last 24 hours. Automatic resource allocation has been optimized to handle the increased load.',
      icon: BarChart3,
      action: '/analytics',
      actionText: 'View Analytics',
      severity: 'medium',
      additionalInfo: 'Most traffic is coming from mobile devices in the North American region between 2-5PM.'
    },
    {
      id: 2,
      type: 'opportunity',
      title: 'Agent collaboration potential',
      description: 'Analysis suggests pairing writing and research agents would improve content quality by approximately 32% based on recent task outputs.',
      icon: Users,
      action: '/agents',
      actionText: 'View Agent Pairings',
      severity: 'high',
      additionalInfo: 'This pairing has shown superior results in 7 out of 8 test scenarios, particularly for long-form content generation.'
    },
    {
      id: 3,
      type: 'notification',
      title: 'System update scheduled',
      description: 'AI model updates planned for tonight at 2:00 AM. No downtime is expected, but response times may be slightly higher during the update process.',
      icon: Bell,
      action: '#',
      actionText: 'View Details',
      severity: 'low',
      additionalInfo: 'Update includes new language processing capabilities and improved sentiment analysis algorithms.',
      onClick: () => toast({
        title: "System Update Details",
        description: "New AI models will be deployed tonight. No downtime expected.",
      })
    },
    {
      id: 4,
      type: 'opportunity',
      title: 'Efficiency improvement',
      description: 'Workflow analysis detected bottlenecks in approval processes. Implementing suggested changes could reduce processing time by 42%.',
      icon: Gauge,
      action: '/workflows',
      actionText: 'Optimize Workflow',
      severity: 'high',
      additionalInfo: 'Current average processing time is 3.4 hours. Estimated time after optimization: 1.9 hours.'
    },
    {
      id: 5,
      type: 'performance',
      title: 'AI training opportunity',
      description: 'Your domain-specific data has reached sufficient volume for custom model tuning. This could improve accuracy by 18-24%.',
      icon: BrainCircuit,
      action: '/knowledge',
      actionText: 'Start Training',
      severity: 'medium',
      additionalInfo: 'Training would take approximately 3 hours with your current data volume and would further specialize responses to your industry terminology.'
    }
  ];
  
  const handleInsightAction = (insight: typeof insights[0]) => {
    if (insight.onClick) {
      insight.onClick();
    }
  };

  const toggleExpand = (id: number) => {
    if (expandedInsight === id) {
      setExpandedInsight(null);
    } else {
      setExpandedInsight(id);
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case 'high':
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case 'medium':
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case 'low':
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <GlassMorphism className="p-6 rounded-xl bg-gradient-to-br from-indigo-500/5 to-purple-500/10 backdrop-blur-lg border-flow-accent/20 h-full overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="flex items-center justify-between mb-6 relative">
        <div className="flex items-center">
          <div className="relative">
            <Lightbulb className="h-6 w-6 text-yellow-400" />
            <motion.div
              className="absolute inset-0 text-yellow-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Lightbulb className="h-6 w-6" />
            </motion.div>
          </div>
          <div className="ml-3">
            <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              AI Insights
            </h3>
            <p className="text-xs text-flow-foreground/60 mt-0.5">
              Real-time intelligence & recommendations
            </p>
          </div>
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="ghost" 
            size="sm"
            className="text-xs text-flow-foreground/70 hover:text-flow-accent"
            onClick={() => toast({
              title: "AI Insights",
              description: "These are personalized insights generated by our AI system based on your activity and system events."
            })}
          >
            <Sparkles className="h-3.5 w-3.5 mr-1.5 text-yellow-400" />
            How this works
          </Button>
        </motion.div>
      </div>

      <ScrollArea className="h-[calc(100%-100px)]">
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`
                relative overflow-hidden rounded-lg border
                ${expandedInsight === insight.id 
                  ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/30'
                  : 'bg-black/20 border-flow-border/10'
                }
                hover:bg-gradient-to-br hover:from-indigo-500/15 hover:to-purple-500/15
                transition-all duration-300 cursor-pointer group
              `}
              onClick={() => toggleExpand(insight.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`
                  p-2 rounded-full 
                  ${insight.type === 'performance' ? 'bg-blue-500/20 text-blue-400' : 
                   insight.type === 'opportunity' ? 'bg-green-500/20 text-green-400' : 
                   'bg-yellow-500/20 text-yellow-400'}
                `}>
                  <insight.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium group-hover:text-flow-accent truncate">{insight.title}</h4>
                    <span className={`text-[10px] ml-2 px-1.5 py-0.5 rounded-full border ${getSeverityBadge(insight.severity)}`}>
                      {insight.severity === 'high' ? 'High Priority' : insight.severity === 'medium' ? 'Medium' : 'Low'}
                    </span>
                  </div>
                  <p className="text-xs text-flow-foreground/70 mt-0.5">{insight.description}</p>
                  
                  {expandedInsight === insight.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 pt-2 border-t border-flow-border/10"
                    >
                      <p className="text-xs text-flow-foreground/80 bg-flow-background/40 p-2 rounded-md">
                        <BadgeCheck className="h-3 w-3 inline-block mr-1 text-flow-accent" />
                        {insight.additionalInfo}
                      </p>
                      
                      <div className="mt-2 flex justify-end">
                        {insight.action && (
                          insight.action.startsWith('/') ? (
                            <Link to={insight.action}>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-[10px] h-7 px-2 text-flow-foreground/70 hover:text-flow-accent"
                              >
                                {insight.actionText}
                                <ArrowUpRight className="h-3 w-3 ml-1" />
                              </Button>
                            </Link>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-[10px] h-7 px-2 text-flow-foreground/70 hover:text-flow-accent"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleInsightAction(insight);
                              }}
                            >
                              {insight.actionText}
                              <ArrowUpRight className="h-3 w-3 ml-1" />
                            </Button>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
              
              {insight.severity === 'high' && (
                <motion.div
                  className="absolute inset-0 bg-orange-500/20"
                  animate={{
                    opacity: [0, 0.2, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="pt-2 border-t border-flow-border/10">
        <div className="flex items-center justify-between">
          <span className="text-xs text-flow-foreground/60">Insights based on system activity and user behavior</span>
          <Link to="/analytics">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs p-0 h-7 text-flow-foreground/70 hover:text-flow-accent flex items-center"
            >
              View all insights
              <ChevronRight className="h-3 w-3 ml-0.5" />
            </Button>
          </Link>
        </div>
      </div>

      <style>
        {`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        `}
      </style>
    </GlassMorphism>
  );
};

export default AIInsights;
