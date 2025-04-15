
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, Zap, BarChart, ArrowUpRight, ThumbsUp, ThumbsDown, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { ActionPrompt } from './useConversationalFlow';

interface ActionPromptCardProps {
  prompt: ActionPrompt;
  onAction: (action: 'confirm' | 'decline' | 'moreInfo') => void;
  timestamp?: string;
}

export const ActionPromptCard: React.FC<ActionPromptCardProps> = ({ prompt, onAction, timestamp }) => {
  // Icon mapping based on action type
  const getActionIcon = () => {
    switch (prompt.actionType) {
      case 'reassign':
        return <ArrowUpRight className="h-4 w-4" />;
      case 'optimize':
        return <Zap className="h-4 w-4" />;
      case 'diagnose':
        return <BarChart className="h-4 w-4" />;
      case 'report':
        return <Info className="h-4 w-4" />;
      case 'tune':
        return <Zap className="h-4 w-4" />;
      case 'simulate':
        return <BarChart className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };
  
  // Severity color mapping
  const getSeverityColor = () => {
    switch (prompt.severity) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'low':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`p-3 mb-3 border ${getSeverityColor()}`}>
        <div className="flex items-start gap-3">
          <div className={`p-1.5 rounded-full mt-0.5 ${
            prompt.severity === 'high' ? 'bg-red-500/30' : 
            prompt.severity === 'medium' ? 'bg-amber-500/30' : 
            'bg-blue-500/30'
          }`}>
            {getActionIcon()}
          </div>
          
          <div className="flex-1">
            <h4 className="text-sm font-medium mb-1">{prompt.title}</h4>
            <p className="text-xs text-foreground/70 mb-2">{prompt.description}</p>
            
            {prompt.metrics && (
              <div className="mb-3 bg-black/30 rounded p-2 text-xs flex items-center justify-between">
                <div>
                  <span className="opacity-70">Current:</span> {prompt.metrics.before}{prompt.metrics.unit}
                </div>
                <div>→</div>
                <div>
                  <span className="opacity-70">Projected:</span> <span className="text-green-400">{prompt.metrics.after}{prompt.metrics.unit}</span>
                </div>
              </div>
            )}
            
            {timestamp && (
              <div className="text-xs text-gray-400/70 mb-2">{timestamp}</div>
            )}
            
            <div className="flex gap-2 justify-end">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => onAction('decline')}
              >
                <ThumbsDown className="h-3 w-3 mr-1" />
                {prompt.actions.decline}
              </Button>
              
              {prompt.actions.moreInfo && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 text-xs"
                  onClick={() => onAction('moreInfo')}
                >
                  <PlusCircle className="h-3 w-3 mr-1" />
                  {prompt.actions.moreInfo}
                </Button>
              )}
              
              <Button 
                size="sm" 
                className={`h-7 text-xs ${
                  prompt.severity === 'high' ? 'bg-red-600 hover:bg-red-700' : 
                  prompt.severity === 'medium' ? 'bg-amber-600 hover:bg-amber-700' : 
                  'bg-blue-600 hover:bg-blue-700'
                }`}
                onClick={() => onAction('confirm')}
              >
                <ThumbsUp className="h-3 w-3 mr-1" />
                {prompt.actions.confirm}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ActionPromptCard;
