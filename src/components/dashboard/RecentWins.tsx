
import React from 'react';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Button } from '@/components/ui/button';
import { History, RotateCcw, CheckCircle, Clock, Users, FileText, Bot } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Win {
  id: string;
  action: string;
  time: string;
  icon: React.ElementType;
  iconColor: string;
}

const RecentWins: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toast } = useToast();
  
  const wins: Win[] = [
    {
      id: '1',
      action: 'Auto-scaled Agent',
      time: '2h ago',
      icon: Bot,
      iconColor: 'text-purple-400'
    },
    {
      id: '2',
      action: 'Optimized Document Indexing',
      time: '3h ago',
      icon: FileText,
      iconColor: 'text-blue-400'
    },
    {
      id: '3',
      action: 'Customer Response Time Improved',
      time: '5h ago',
      icon: Clock,
      iconColor: 'text-green-400'
    },
    {
      id: '4',
      action: 'New Team Member Onboarded',
      time: '1d ago',
      icon: Users,
      iconColor: 'text-orange-400'
    },
    {
      id: '5',
      action: 'Workflow Efficiency Increased',
      time: '1d ago',
      icon: CheckCircle,
      iconColor: 'text-emerald-400'
    }
  ];
  
  const handleRevert = (id: string) => {
    toast({
      title: "Action Reverted",
      description: `The action has been successfully reverted.`,
      duration: 3000,
    });
  };
  
  return (
    <TransitionWrapper delay={300}>
      <GlassMorphism className="p-5 rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <History className="h-5 w-5 text-flow-accent" />
          <h3 className="text-lg font-semibold">Recent Wins</h3>
        </div>
        
        <div className="space-y-3">
          {wins.map(win => (
            <div 
              key={win.id}
              className={cn(
                "p-3 rounded-lg border flex items-center justify-between",
                isDark ? "border-flow-border/30 bg-flow-background/30" : "border-gray-100 bg-white/50"
              )}
            >
              <div className="flex items-center">
                <div className={cn(
                  "p-2 rounded-full mr-3",
                  isDark ? "bg-flow-background/40" : "bg-gray-50"
                )}>
                  <win.icon className={cn("h-4 w-4", win.iconColor)} />
                </div>
                <div>
                  <div className="font-medium">{win.action}</div>
                  <div className="text-xs text-flow-foreground/60">{win.time}</div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-flow-foreground/60 hover:text-flow-foreground"
                onClick={() => handleRevert(win.id)}
              >
                <span className="sr-only">Revert</span>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </GlassMorphism>
    </TransitionWrapper>
  );
};

export default RecentWins;
