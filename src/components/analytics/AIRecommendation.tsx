
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  ThumbsUp, 
  ThumbsDown, 
  ChevronRight, 
  BadgeCheck,
  Sparkles,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from 'next-themes';

interface AIRecommendationProps {
  title: string;
  description: string;
  impact?: string;
  confidence: number;
  actions?: Array<{
    label: string;
    onClick?: () => void;
    link?: string;
  }>;
  className?: string;
}

const AIRecommendation: React.FC<AIRecommendationProps> = ({
  title,
  description,
  impact,
  confidence,
  actions = [],
  className
}) => {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'helpful' | 'not-helpful' | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const handleFeedback = (type: 'helpful' | 'not-helpful') => {
    setFeedbackGiven(type);
    toast({
      title: type === 'helpful' ? "Thank you for your feedback" : "We'll improve our recommendations",
      description: type === 'helpful' 
        ? "We'll prioritize similar insights in the future" 
        : "We'll use your feedback to train the AI model",
    });
  };
  
  // Determine confidence level styling
  let confidenceColor = isDark ? 'text-green-400' : 'text-green-600';
  let confidenceLabel = 'High';
  
  if (confidence < 70) {
    confidenceColor = isDark ? 'text-red-400' : 'text-red-600';
    confidenceLabel = 'Low';
  } else if (confidence < 85) {
    confidenceColor = isDark ? 'text-amber-400' : 'text-amber-600';
    confidenceLabel = 'Medium';
  }
  
  const getBorderStyle = () => {
    if (isDark) {
      return 'border-flow-accent/30 bg-flow-background/30 neon-border-purple scan-lines';
    } else {
      return 'border-emerald-200 bg-amber-50/30 shadow-sm';
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border rounded-lg p-3 backdrop-blur-sm ${getBorderStyle()} ${className}`}
    >
      <div className="flex gap-3 items-start">
        <div className={`p-1.5 ${isDark ? 'bg-amber-500/20' : 'bg-amber-100'} rounded-full ${isDark ? 'animate-pulse-subtle' : ''}`}>
          <Zap className={`h-4 w-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-medium ${isDark ? 'font-cyber animate-text-glow text-flow-accent' : 'font-heebo text-emerald-800'}`}>{title}</h3>
            <span className={`text-xs ${confidenceColor} flex items-center`}>
              <Sparkles className="h-3 w-3 mr-1" />
              {confidenceLabel} confidence ({confidence}%)
            </span>
          </div>
          
          <p className={`text-xs ${isDark ? 'text-flow-foreground/70' : 'text-emerald-900/80'} mt-1 font-ibm-mono`}>{description}</p>
          
          {impact && expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className={`mt-2 ${isDark ? 'bg-flow-background/40 border-flow-accent/10 text-flow-foreground/80' : 'bg-white/70 border-emerald-200 text-emerald-900/80'} p-2 rounded text-xs border`}
            >
              <strong className="font-medium">Potential impact:</strong> {impact}
            </motion.div>
          )}
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-1">
              {!feedbackGiven ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`h-6 text-[10px] ${
                      isDark 
                        ? 'hover:bg-green-500/20 hover:text-green-400' 
                        : 'hover:bg-green-100 hover:text-green-700'
                    }`}
                    onClick={() => handleFeedback('helpful')}
                  >
                    <ThumbsUp className="h-3 w-3 mr-1" /> Helpful
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`h-6 text-[10px] ${
                      isDark 
                        ? 'hover:bg-red-500/20 hover:text-red-400' 
                        : 'hover:bg-red-100 hover:text-red-700'
                    }`}
                    onClick={() => handleFeedback('not-helpful')}
                  >
                    <ThumbsDown className="h-3 w-3 mr-1" /> Not helpful
                  </Button>
                </>
              ) : (
                <span className={`text-[10px] ${isDark ? 'text-green-400' : 'text-green-600'} flex items-center`}>
                  <BadgeCheck className="h-3 w-3 mr-1" />
                  Feedback recorded
                </span>
              )}
            </div>
            
            {(impact || actions.length > 0) && (
              <Button 
                variant="ghost" 
                size="sm"
                className={`h-6 text-[10px] ${
                  isDark 
                    ? 'text-flow-accent hover:bg-flow-accent/10' 
                    : 'text-emerald-700 hover:bg-emerald-100/50'
                }`}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? 'Less details' : 'More details'} <ChevronRight className={`h-3 w-3 ml-0.5 transition-transform ${expanded ? 'rotate-90' : ''}`} />
              </Button>
            )}
          </div>
          
          {expanded && actions.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-2 flex flex-wrap gap-2"
            >
              {actions.map((action, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  size="sm"
                  className={`h-7 text-xs ${
                    isDark 
                      ? 'border-flow-accent/30 text-flow-accent hover:bg-flow-accent/10 hover:neon-border' 
                      : 'border-emerald-300 text-emerald-800 hover:bg-emerald-50 hover:border-emerald-500'
                  }`}
                  onClick={action.onClick}
                  asChild={!!action.link}
                >
                  {action.link ? (
                    <a href={action.link}>{action.label}</a>
                  ) : (
                    action.label
                  )}
                </Button>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AIRecommendation;
