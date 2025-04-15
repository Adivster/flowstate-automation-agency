
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronRight, 
  BadgeCheck, 
  ArrowUpRight,
  Lightbulb,
  AlertCircle,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

export interface InsightRecommendation {
  id: string;
  text: string;
  impact: 'high' | 'medium' | 'low';
}

export interface InsightMetrics {
  current: number;
  previous: number;
  change: number;
  historicalAvg: number;
}

export interface PredictionData {
  name: string;
  actual: number | null;
  predicted: number;
}

export interface Insight {
  id: number;
  type: 'anomaly' | 'prediction' | 'opportunity' | 'insight';
  title: string;
  description: string;
  icon: React.ElementType;
  action: string;
  actionText: string;
  severity: 'high' | 'medium' | 'low';
  confidence?: number;
  additionalInfo?: string;
  recommendations?: string[];
  metrics?: InsightMetrics;
  predictionData?: PredictionData[];
  onClick?: () => void;
}

interface InsightCardProps {
  insight: Insight;
  isExpanded: boolean;
  onToggleExpand: (id: number) => void;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight, isExpanded, onToggleExpand }) => {
  const { toast } = useToast();
  const [showAnomalyDetails, setShowAnomalyDetails] = useState<boolean>(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);
  
  const handleInsightAction = () => {
    if (insight.onClick) {
      insight.onClick();
    } else {
      toast({
        title: `${insight.actionText}`,
        description: `Taking action on: ${insight.title}`,
      });
    }
  };

  const handleAnomalyDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAnomalyDetails(!showAnomalyDetails);
  };

  const handleFeedback = (helpful: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    setFeedbackSubmitted(true);
    toast({
      title: helpful ? "Feedback submitted: Helpful" : "Feedback submitted: Not helpful",
      description: "Thank you for helping improve our AI recommendations.",
    });
  };

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
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-3 rounded-lg border backdrop-blur-sm ${
        insight.type === 'anomaly' ? 'border-red-500/30 bg-red-500/5 hover:neon-border-orange' : 
        insight.type === 'prediction' ? 'border-purple-500/30 bg-purple-500/5 hover:neon-border-purple' : 
        'border-flow-border/30 bg-flow-background/40 hover:neon-border-blue'
      } hover:bg-flow-card/30 transition-all cursor-pointer group ${isExpanded ? 'bg-flow-card/40' : ''}`}
      onClick={() => onToggleExpand(insight.id)}
    >
      <div className="flex items-start gap-3">
        <div className={`
          p-2 rounded-full flex items-center justify-center
          ${getIconBackground(insight.type)}
          ${insight.severity === 'high' ? 'animate-pulse-slow' : ''}
        `}>
          <insight.icon className="h-4 w-4" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium group-hover:text-flow-accent truncate font-cyber">{insight.title}</h4>
            <span className={`text-[10px] ml-2 px-1.5 py-0.5 rounded-full border ${getSeverityBadge(insight.severity)}`}>
              {insight.severity === 'high' ? 'High Priority' : insight.severity === 'medium' ? 'Medium' : 'Low'}
            </span>
          </div>
          
          <p className="text-xs text-flow-foreground/70 mt-0.5 font-ibm-mono">{insight.description}</p>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 pt-2 border-t border-flow-border/20"
              >
                {insight.confidence && (
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
                )}
                
                {insight.additionalInfo && (
                  <p className="text-xs text-flow-foreground/80 bg-flow-background/40 p-2 rounded-md font-ibm-mono">
                    <BadgeCheck className="h-3 w-3 inline-block mr-1 text-flow-accent" />
                    {insight.additionalInfo}
                  </p>
                )}
                
                {insight.type === 'anomaly' && insight.metrics && (
                  <div className="mt-2">
                    <button 
                      onClick={handleAnomalyDetails}
                      className="text-xs flex items-center text-flow-accent bg-flow-accent/10 px-2 py-1 rounded-md w-full justify-between font-ibm-mono hover:neon-border"
                    >
                      <span>Anomaly Details</span>
                      {showAnomalyDetails ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                    </button>
                    
                    <AnimatePresence>
                      {showAnomalyDetails && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="mt-2 grid grid-cols-2 gap-2"
                        >
                          <div className="bg-flow-background/30 p-2 rounded-md border border-flow-border/10">
                            <p className="text-[10px] text-flow-foreground/60">Current</p>
                            <p className="text-sm">{insight.metrics.current}%</p>
                          </div>
                          <div className="bg-flow-background/30 p-2 rounded-md border border-flow-border/10">
                            <p className="text-[10px] text-flow-foreground/60">Previous</p>
                            <p className="text-sm">{insight.metrics.previous}%</p>
                          </div>
                          <div className="bg-flow-background/30 p-2 rounded-md border border-flow-border/10">
                            <p className="text-[10px] text-flow-foreground/60">Change</p>
                            <p className="text-sm text-red-400">{insight.metrics.change}%</p>
                          </div>
                          <div className="bg-flow-background/30 p-2 rounded-md border border-flow-border/10">
                            <p className="text-[10px] text-flow-foreground/60">Historical Avg</p>
                            <p className="text-sm">{insight.metrics.historicalAvg}%</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
                
                {insight.type === 'prediction' && insight.predictionData && (
                  <div className="mt-3 h-24 bg-flow-background/20 p-2 rounded-md">
                    <div className="h-full w-full flex items-end">
                      {insight.predictionData.map((data, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                          <div className="relative w-full flex justify-center mb-1">
                            {data.actual !== null ? (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${(data.actual / Math.max(...insight.predictionData!.map(d => d.predicted)))*100}%` }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="w-3/5 bg-blue-500/70 rounded-sm"
                              />
                            ) : null}
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${(data.predicted / Math.max(...insight.predictionData!.map(d => d.predicted)))*100}%` }}
                              transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                              className={`w-3/5 ${data.actual === null ? 'bg-purple-500/50 border border-purple-400/50' : 'bg-purple-500/30 absolute'} rounded-sm`}
                            />
                          </div>
                          <span className="text-[8px] text-flow-foreground/60 mt-1">{data.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {insight.recommendations && (
                  <div className="mt-3">
                    <div className="text-xs font-medium mb-1 flex items-center font-cyber">
                      <Lightbulb className="h-3 w-3 mr-1 text-amber-400" />
                      Recommended Actions
                    </div>
                    <ul className="text-xs space-y-1 font-ibm-mono">
                      {insight.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="h-1 w-1 bg-flow-accent mr-2 rounded-full"></span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="mt-3 flex justify-between">
                  <div className="flex gap-1">
                    {!feedbackSubmitted ? (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-7 text-[10px] hover:bg-green-500/20 hover:text-green-400"
                          onClick={(e) => handleFeedback(true, e)}
                        >
                          👍 Helpful
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-7 text-[10px] hover:bg-red-500/20 hover:text-red-400"
                          onClick={(e) => handleFeedback(false, e)}
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
                  
                  {insight.action.startsWith('/') ? (
                    <Link to={insight.action}>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-7 text-[10px] border-flow-accent/30 text-flow-accent hover:bg-flow-accent/10 hover:neon-border"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInsightAction();
                        }}
                      >
                        {insight.actionText}
                        <ArrowUpRight className="h-3 w-3 ml-1" />
                      </Button>
                    </Link>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-7 text-[10px] border-flow-accent/30 text-flow-accent hover:bg-flow-accent/10 hover:neon-border"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInsightAction();
                      }}
                    >
                      {insight.actionText}
                      <ArrowUpRight className="h-3 w-3 ml-1" />
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {insight.severity === 'high' && (
        <motion.div
          className="absolute inset-0 bg-red-500/20"
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
  );
};

export default InsightCard;
