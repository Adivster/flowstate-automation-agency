import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  ThumbsUp, 
  ThumbsDown, 
  ChevronRight, 
  BadgeCheck,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
  let confidenceColor = 'text-green-400';
  let confidenceLabel = 'High';
  
  if (confidence < 70) {
    confidenceColor = 'text-red-400';
    confidenceLabel = 'Low';
  } else if (confidence < 85) {
    confidenceColor = 'text-amber-400';
    confidenceLabel = 'Medium';
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border border-flow-accent/30 bg-flow-background/30 rounded-lg p-3 ${className}`}
    >
      <div className="flex gap-3 items-start">
        <div className="p-1.5 bg-amber-500/20 rounded-full">
          <Lightbulb className="h-4 w-4 text-amber-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">{title}</h3>
            <span className={`text-xs ${confidenceColor} flex items-center`}>
              <Sparkles className="h-3 w-3 mr-1" />
              {confidenceLabel} confidence ({confidence}%)
            </span>
          </div>
          
          <p className="text-xs text-flow-foreground/70 mt-1">{description}</p>
          
          {impact && expanded && (
            <div className="mt-2 bg-flow-background/40 p-2 rounded text-xs text-flow-foreground/80">
              <strong className="font-medium">Potential impact:</strong> {impact}
            </div>
          )}
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-1">
              {!feedbackGiven ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-6 text-[10px] hover:bg-green-500/20 hover:text-green-400"
                    onClick={() => handleFeedback('helpful')}
                  >
                    <ThumbsUp className="h-3 w-3 mr-1" /> Helpful
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-6 text-[10px] hover:bg-red-500/20 hover:text-red-400"
                    onClick={() => handleFeedback('not-helpful')}
                  >
                    <ThumbsDown className="h-3 w-3 mr-1" /> Not helpful
                  </Button>
                </>
              ) : (
                <span className="text-[10px] text-green-400 flex items-center">
                  <BadgeCheck className="h-3 w-3 mr-1" />
                  Feedback recorded
                </span>
              )}
            </div>
            
            {(impact || actions.length > 0) && (
              <Button 
                variant="ghost" 
                size="sm"
                className="h-6 text-[10px] text-flow-accent"
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
                  className="h-7 text-xs border-flow-accent/30 text-flow-accent hover:bg-flow-accent/10"
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
