
import React, { useState } from 'react';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Clock, 
  ArrowRight, 
  Star, 
  MessageSquare,
  Database
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const WeeklyGrowth: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toast } = useToast();
  const [rating, setRating] = useState<number | null>(null);
  
  const data = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 72 },
    { day: 'Wed', value: 68 },
    { day: 'Thu', value: 78 },
    { day: 'Fri', value: 82 },
    { day: 'Sat', value: 74 },
    { day: 'Sun', value: 85 }
  ];
  
  const handleRating = (stars: number) => {
    setRating(stars);
    toast({
      title: `Thank you for your feedback!`,
      description: `You rated this summary ${stars} stars.`,
      duration: 2000,
    });
  };
  
  const handleOpportunity = (action: string) => {
    toast({
      title: `Action: ${action}`,
      description: "Opening detailed recommendations...",
      duration: 3000,
    });
  };
  
  return (
    <TransitionWrapper delay={350}>
      <GlassMorphism className="p-5 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={cn(
              "p-2 rounded-lg mr-3",
              isDark ? "bg-blue-500/20" : "bg-blue-500/10"
            )}>
              <TrendingUp className="h-5 w-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold">Weekly Growth & Horizon</h3>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="mb-2 text-sm font-medium">7-day Value Delivered</div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 
                />
                <XAxis 
                  dataKey="day" 
                  stroke={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"} 
                />
                <YAxis 
                  stroke={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                    borderColor: isDark ? '#374151' : '#e5e7eb',
                    color: isDark ? '#f9fafb' : '#111827'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ fill: '#2563eb', strokeWidth: 0, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <h4 className="font-medium">Opportunity Highlights</h4>
          
          <div className={cn(
            "p-3 rounded-lg",
            isDark ? "bg-amber-950/30 border border-amber-900/30" : "bg-amber-50 border border-amber-100"
          )}>
            <div className="flex items-start">
              <Clock className="h-4 w-4 text-amber-400 mt-0.5 mr-2" />
              <div>
                <p className="font-medium text-amber-400">20% slower docs? Try async ingest</p>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-xs p-0 h-auto text-flow-foreground/70 hover:text-flow-accent"
                  onClick={() => handleOpportunity('Optimize Docs')}
                >
                  Learn more <ArrowRight className="h-3 w-3 ml-1 inline" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "p-3 rounded-lg",
            isDark ? "bg-purple-950/30 border border-purple-900/30" : "bg-purple-50 border border-purple-100"
          )}>
            <div className="flex items-start">
              <Database className="h-4 w-4 text-purple-400 mt-0.5 mr-2" />
              <div>
                <p className="font-medium text-purple-400">Emerging topic: 'blockchain'—add to KB</p>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-xs p-0 h-auto text-flow-foreground/70 hover:text-flow-accent"
                  onClick={() => handleOpportunity('Blockchain KB')}
                >
                  Learn more <ArrowRight className="h-3 w-3 ml-1 inline" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "p-3 rounded-lg",
            isDark ? "bg-blue-950/30 border border-blue-900/30" : "bg-blue-50 border border-blue-100"
          )}>
            <div className="flex items-start">
              <MessageSquare className="h-4 w-4 text-blue-400 mt-0.5 mr-2" />
              <div>
                <p className="font-medium text-blue-400">Low chat volume on weekends—schedule a campaign</p>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-xs p-0 h-auto text-flow-foreground/70 hover:text-flow-accent"
                  onClick={() => handleOpportunity('Weekend Campaign')}
                >
                  Learn more <ArrowRight className="h-3 w-3 ml-1 inline" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-between items-center pt-3 border-t border-flow-border/30">
          <div className="text-sm">
            <div className="font-medium flex items-center text-green-400">
              <Clock className="h-4 w-4 mr-1" />
              24 hrs saved
              <span className="mx-2 text-flow-foreground/30">|</span>
              <span className="text-amber-400 flex items-center">
                💰 $1.2K value
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 mt-2 sm:mt-0">
            <span className="text-xs text-flow-foreground/60 mr-2">Rate this summary</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                variant="ghost"
                size="sm"
                className={cn(
                  "p-0 w-6 h-6",
                  rating && star <= rating ? "text-amber-400" : "text-flow-foreground/30"
                )}
                onClick={() => handleRating(star)}
              >
                <Star className="h-4 w-4" fill={rating && star <= rating ? "currentColor" : "none"} />
              </Button>
            ))}
          </div>
        </div>
      </GlassMorphism>
    </TransitionWrapper>
  );
};

export default WeeklyGrowth;
