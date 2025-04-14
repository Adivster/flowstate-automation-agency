
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Lightbulb, 
  AlertCircle, 
  TrendingUp, 
  ArrowUpRight, 
  BarChart, 
  LineChart, 
  Gauge, 
  Zap,
  ChevronDown,
  ChevronRight,
  BadgeCheck,
  Sparkles,
  PieChart,
  Activity
} from 'lucide-react';
import { InfoChip } from '@/components/ui/InfoChip';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

type AIInsightsProps = {
  data: any;
  timeRange: string;
};

const AIInsights: React.FC<AIInsightsProps> = ({ data, timeRange }) => {
  const { toast } = useToast();
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null);
  const [showAnomalyDetails, setShowAnomalyDetails] = useState<number | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<Set<number>>(new Set());
  
  // Enhanced mock data for AI insights with anomaly detection and predictions
  const insights = [
    {
      id: 1,
      type: 'anomaly',
      title: 'Conversion rate dropped 15%',
      description: 'Your conversion rate dropped significantly below historical patterns in the last 48 hours.',
      icon: AlertCircle,
      action: '/analytics/conversion-details',
      actionText: 'Investigate',
      severity: 'high',
      confidence: 92,
      additionalInfo: 'This correlates with recent landing page changes deployed on Tuesday.',
      recommendations: [
        'Temporarily revert to previous landing page version',
        'Run an A/B test to identify which elements are causing the drop',
        'Review user session recordings for friction points'
      ],
      metrics: {
        current: 3.2,
        previous: 3.8,
        change: -15.8,
        historicalAvg: 3.7
      }
    },
    {
      id: 2,
      type: 'prediction',
      title: 'Revenue trajectory: +12% expected',
      description: 'Based on current trends and seasonal patterns, revenue is projected to increase by 12% next month.',
      icon: TrendingUp,
      action: '/analytics/revenue-forecast',
      actionText: 'View Forecast',
      severity: 'medium',
      confidence: 87,
      additionalInfo: 'This prediction factors in your historical Q2 performance and current campaign efficiency.',
      predictionData: [
        { name: 'Week 1', actual: 24200, predicted: 24200 },
        { name: 'Week 2', actual: 25400, predicted: 25400 },
        { name: 'Week 3', actual: 27300, predicted: 27300 },
        { name: 'Week 4', actual: null, predicted: 28900 },
        { name: 'Week 5', actual: null, predicted: 30200 },
      ]
    },
    {
      id: 3,
      type: 'opportunity',
      title: 'Social media engagement opportunity',
      description: 'Your Instagram posts are receiving 32% more engagement than other platforms. Consider reallocating resources.',
      icon: Zap,
      action: '/analytics/social-performance',
      actionText: 'View Details',
      severity: 'medium',
      confidence: 89,
      additionalInfo: 'Instagram audience demographics closely match your ideal customer profile with 78% overlap.',
      recommendations: [
        'Increase posting frequency on Instagram from 3x to 5x weekly',
        'Allocate 15% more of your ad budget to Instagram',
        'Test Instagram-first content strategy for 2 weeks'
      ]
    },
    {
      id: 4,
      type: 'insight',
      title: 'Customer retention improving',
      description: 'Your 30-day retention rate has improved by 8% since implementing the new onboarding flow.',
      icon: Gauge,
      action: '/analytics/retention',
      actionText: 'View Retention Data',
      severity: 'low',
      confidence: 94,
      additionalInfo: 'Users who complete the new tutorial are 2.3x more likely to remain active after 30 days.',
      metrics: {
        current: 68,
        previous: 62,
        change: 8.8,
        historicalAvg: 61
      }
    },
    {
      id: 5,
      type: 'anomaly',
      title: 'Unusual traffic pattern detected',
      description: 'Traffic from mobile devices increased by 47% over the weekend - significantly above normal patterns.',
      icon: Activity,
      action: '/analytics/traffic',
      actionText: 'Investigate Traffic',
      severity: 'medium',
      confidence: 86,
      additionalInfo: 'This spike correlates with your recent TikTok campaign launch. Consider optimizing mobile landing pages.',
      recommendations: [
        'Optimize mobile landing page load time',
        'Implement mobile-specific CTAs',
        'Increase mobile ad budget during weekend hours'
      ]
    }
  ];
  
  const handleInsightAction = (insight: typeof insights[0]) => {
    toast({
      title: `Viewing ${insight.title}`,
      description: `Navigating to detailed analysis...`,
    });
  };

  const toggleExpand = (id: number) => {
    if (expandedInsight === id) {
      setExpandedInsight(null);
    } else {
      setExpandedInsight(id);
    }
  };

  const handleAnomalyDetails = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAnomalyDetails(showAnomalyDetails === id ? null : id);
  };

  const handleFeedback = (id: number, helpful: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    setFeedbackSubmitted(prev => new Set(prev).add(id));
    toast({
      title: helpful ? "Feedback submitted: Helpful" : "Feedback submitted: Not helpful",
      description: "Thank you for helping improve our AI recommendations.",
    });
  };

  // Severity badge styling
  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case 'high':
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case 'medium':
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case 'low':
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  const getIconBackground = (type: string) => {
    switch(type) {
      case 'anomaly':
        return 'bg-red-500/20 text-red-400';
      case 'prediction':
        return 'bg-purple-500/20 text-purple-400';
      case 'opportunity':
        return 'bg-green-500/20 text-green-400';
      case 'insight':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-amber-500/20 text-amber-400';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">AI Insights</h3>
          <p className="text-xs text-flow-foreground/60">Auto-detected patterns & recommendations</p>
        </div>
        <InfoChip icon={Brain} label="AI Powered" />
      </div>
      
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1 custom-scrollbar">
        {insights.map((insight, index) => (
          <motion.div 
            key={insight.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 rounded-lg border ${
              insight.type === 'anomaly' ? 'border-red-500/30 bg-red-500/5' : 
              insight.type === 'prediction' ? 'border-purple-500/30 bg-purple-500/5' : 
              'border-flow-border/30 bg-flow-background/40'
            } hover:bg-flow-card/30 transition-all cursor-pointer group ${expandedInsight === insight.id ? 'bg-flow-card/40' : ''}`}
            onClick={() => toggleExpand(insight.id)}
          >
            <div className="flex items-start gap-3">
              <div className={`
                p-2 rounded-full flex items-center justify-center
                ${getIconBackground(insight.type)}
                ${insight.severity === 'high' ? 'animate-pulse' : ''}
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
                    className="mt-2 pt-2 border-t border-flow-border/20"
                  >
                    {/* Confidence indicator */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-flow-foreground/60">AI Confidence</span>
                        <span className="font-medium">{insight.confidence}%</span>
                      </div>
                      <Progress value={insight.confidence} className="h-1.5" 
                        style={{
                          background: 'rgba(255,255,255,0.1)',
                          ['--progress-background' as any]: 
                            insight.confidence > 90 ? 'rgb(34,197,94)' : 
                            insight.confidence > 80 ? 'rgb(250,204,21)' : 
                            'rgb(239,68,68)'
                        }} 
                      />
                    </div>
                    
                    {/* Additional info */}
                    <p className="text-xs text-flow-foreground/80 bg-flow-background/40 p-2 rounded-md">
                      <BadgeCheck className="h-3 w-3 inline-block mr-1 text-flow-accent" />
                      {insight.additionalInfo}
                    </p>
                    
                    {/* Anomaly details */}
                    {insight.type === 'anomaly' && insight.metrics && (
                      <div className="mt-2">
                        <button 
                          onClick={(e) => handleAnomalyDetails(insight.id, e)}
                          className="text-xs flex items-center text-flow-accent bg-flow-accent/10 px-2 py-1 rounded-md w-full justify-between"
                        >
                          <span>Anomaly Details</span>
                          {showAnomalyDetails === insight.id ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                        </button>
                        
                        {showAnomalyDetails === insight.id && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-2 grid grid-cols-2 gap-2"
                          >
                            <div className="bg-flow-background/30 p-2 rounded-md">
                              <p className="text-[10px] text-flow-foreground/60">Current</p>
                              <p className="text-sm">{insight.metrics.current}%</p>
                            </div>
                            <div className="bg-flow-background/30 p-2 rounded-md">
                              <p className="text-[10px] text-flow-foreground/60">Previous</p>
                              <p className="text-sm">{insight.metrics.previous}%</p>
                            </div>
                            <div className="bg-flow-background/30 p-2 rounded-md">
                              <p className="text-[10px] text-flow-foreground/60">Change</p>
                              <p className="text-sm text-red-400">{insight.metrics.change}%</p>
                            </div>
                            <div className="bg-flow-background/30 p-2 rounded-md">
                              <p className="text-[10px] text-flow-foreground/60">Historical Avg</p>
                              <p className="text-sm">{insight.metrics.historicalAvg}%</p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                    
                    {/* Recommendations */}
                    {insight.recommendations && (
                      <div className="mt-3">
                        <div className="text-xs font-medium mb-1 flex items-center">
                          <Lightbulb className="h-3 w-3 mr-1 text-amber-400" />
                          Recommended Actions
                        </div>
                        <ul className="text-xs space-y-1">
                          {insight.recommendations.map((rec, idx) => (
                            <li key={idx} className="flex items-center">
                              <span className="h-1 w-1 bg-flow-accent mr-2 rounded-full"></span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Action buttons */}
                    <div className="mt-3 flex justify-between">
                      <div className="flex gap-1">
                        {!feedbackSubmitted.has(insight.id) ? (
                          <>
                            <Button 
                              variant="ghost" 
                              size="xs"
                              className="h-7 text-[10px]"
                              onClick={(e) => handleFeedback(insight.id, true, e)}
                            >
                              👍 Helpful
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="xs"
                              className="h-7 text-[10px]"
                              onClick={(e) => handleFeedback(insight.id, false, e)}
                            >
                              👎 Not helpful
                            </Button>
                          </>
                        ) : (
                          <span className="text-[10px] text-green-400 flex items-center">
                            <BadgeCheck className="h-3 w-3 mr-1" />
                            Feedback recorded
                          </span>
                        )}
                      </div>
                      
                      <Link to={insight.action}>
                        <Button 
                          variant="outline" 
                          size="xs"
                          className="h-7 text-[10px] border-flow-accent/30 text-flow-accent hover:bg-flow-accent/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInsightAction(insight);
                          }}
                        >
                          {insight.actionText}
                          <ArrowUpRight className="h-3 w-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="pt-2 border-t border-flow-border/10 mt-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-flow-foreground/60 flex items-center">
            <Sparkles className="h-3 w-3 mr-1 text-amber-400" />
            AI-powered insights based on your data
          </span>
          <Link to="/analytics/ai-insights">
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
    </div>
  );
};

export default AIInsights;
