
import React from 'react';
import { CyberCard } from '@/components/ui/cyber-card';
import { useTheme } from '@/providers/theme-provider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings, ChevronRight, Zap, Sparkles, UserPlus, Scale, RotateCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { cn } from '@/lib/utils';

const SnapshotGrid = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toast } = useToast();
  
  const handleAction = (action: string) => {
    toast({
      title: action,
      description: `Initiating ${action.toLowerCase()}...`,
      duration: 3000,
    });
  };
  
  const snapshotData = [
    {
      title: 'Agent Snapshot',
      count: '12',
      label: 'Active Agents',
      insight: '3 Agents efficiency ↑12% last week',
      status: { label: 'Healthy', type: 'success' },
      color: 'cyan',
      action: 'Train Similar Agent',
      icon: UserPlus
    },
    {
      title: 'Knowledge Base',
      count: '176',
      label: 'Documents',
      insight: '5 new docs added, confidence up 10%',
      status: { label: 'Updated', type: 'success' },
      color: 'blue',
      action: 'Retrain KB',
      icon: RotateCw
    },
    {
      title: 'Workflow Status',
      count: '8',
      label: 'Running Workflows',
      insight: 'Workflow latency down 30%',
      status: { label: 'Optimized', type: 'info' },
      color: 'magenta',
      action: 'Scale Flow',
      icon: Scale
    },
    {
      title: 'System Resources',
      count: '43%',
      label: 'CPU Utilization',
      insight: 'Optimization available for 15% reduction',
      status: { label: 'Nominal', type: 'info' },
      color: 'lime',
      action: 'Apply Optimization',
      icon: Zap
    }
  ];
  
  const getStatusBadge = (status: { label: string; type: string }) => {
    switch (status.type) {
      case 'success':
        return (
          <Badge variant="outline" className={isDark ? 
            "bg-lime-500/20 text-lime-400 border-lime-400/50" : 
            "bg-green-50 text-green-600 border-green-200"
          }>
            {status.label}
          </Badge>
        );
      case 'warning':
        return (
          <Badge variant="outline" className={isDark ? 
            "bg-amber-500/20 text-amber-400 border-amber-400/50" : 
            "bg-amber-50 text-amber-600 border-amber-200"
          }>
            {status.label}
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="outline" className={isDark ? 
            "bg-pink-500/20 text-pink-400 border-pink-400/50" : 
            "bg-red-50 text-red-600 border-red-200"
          }>
            {status.label}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className={isDark ? 
            "bg-cyan-500/20 text-cyan-400 border-cyan-400/50" : 
            "bg-blue-50 text-blue-600 border-blue-200"
          }>
            {status.label}
          </Badge>
        );
    }
  };
  
  return (
    <TransitionWrapper delay={150}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {snapshotData.map((snapshot, index) => {
          const Icon = snapshot.icon;
          return (
            <CyberCard 
              key={index}
              title={snapshot.title}
              badge={getStatusBadge(snapshot.status)}
              headerAction={
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 rounded-full opacity-70 hover:opacity-100"
                >
                  <Settings className="h-3.5 w-3.5" />
                </Button>
              }
              color={snapshot.color as any}
              animation={index % 2 === 0 ? "glow" : "pulse"}
              elevation="raised"
            >
              <div className="mt-3">
                <div className="flex items-end">
                  <span className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                    {snapshot.count}
                  </span>
                  <span className={`text-sm ml-2 mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {snapshot.label}
                  </span>
                </div>
                
                <div className="mt-3 py-2 px-3 rounded-md bg-flow-accent/10 border border-flow-accent/20 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-flow-accent/80" />
                  <span className="text-xs text-flow-foreground/90">{snapshot.insight}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <Button 
                  variant="default" 
                  size="sm" 
                  className={cn(
                    "w-full justify-start text-xs bg-gradient-to-r",
                    snapshot.color === 'magenta' ? 'from-pink-500/20 to-purple-500/20 text-pink-400 hover:text-pink-300' : 
                    snapshot.color === 'lime' ? 'from-lime-500/20 to-green-500/20 text-lime-400 hover:text-lime-300' :
                    snapshot.color === 'blue' ? 'from-blue-500/20 to-indigo-500/20 text-blue-400 hover:text-blue-300' :
                    'from-cyan-500/20 to-blue-500/20 text-cyan-400 hover:text-cyan-300',
                    "border border-flow-accent/20"
                  )}
                  onClick={() => handleAction(snapshot.action)}
                >
                  <Icon className="h-3.5 w-3.5 mr-2" />
                  {snapshot.action}
                </Button>
              </div>
            </CyberCard>
          );
        })}
      </div>
    </TransitionWrapper>
  );
};

export default SnapshotGrid;
