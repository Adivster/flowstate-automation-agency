
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Lightbulb, AlertCircle, TrendingUp } from 'lucide-react';
import { InfoChip } from '@/components/ui/InfoChip';

type AIInsightsProps = {
  data: any;
  timeRange: string;
};

const AIInsights: React.FC<AIInsightsProps> = ({ data, timeRange }) => {
  const insights = [
    {
      type: 'alert',
      icon: AlertCircle,
      title: 'Conversion Rate Drop',
      description: 'Your conversion rate dropped by 12% in the last week.',
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20'
    },
    {
      type: 'suggestion',
      icon: Lightbulb,
      title: 'Social Media Opportunity',
      description: 'Increasing Instagram posts could boost engagement by ~8%.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20'
    },
    {
      type: 'trend',
      icon: TrendingUp,
      title: 'Email Campaign Success',
      description: 'Your latest email had 24% higher open rates than average.',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">AI Insights</h3>
          <p className="text-xs text-flow-foreground/60">Auto-detected patterns & recommendations</p>
        </div>
        <InfoChip icon={Brain} label="AI Powered" />
      </div>
      
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
        {insights.map((insight, index) => (
          <motion.div 
            key={insight.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 rounded-lg ${insight.bg} ${insight.border} border`}
          >
            <div className="flex gap-3">
              <div className={`p-1.5 rounded-full ${insight.bg} ${insight.color} self-start`}>
                <insight.icon className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-medium">{insight.title}</h4>
                <p className="text-xs text-flow-foreground/70 mt-1">{insight.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="mt-4 w-full flex items-center justify-center text-xs p-2 rounded-md bg-flow-accent/20 text-flow-accent hover:bg-flow-accent/30 transition-colors">
        View All Insights
      </button>
    </div>
  );
};

export default AIInsights;
