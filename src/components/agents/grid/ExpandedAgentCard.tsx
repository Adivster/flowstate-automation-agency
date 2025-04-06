
import React from 'react';
import { LucideIcon, X, Play, Pause, AlertTriangle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import GlassMorphism from '@/components/ui/GlassMorphism';

interface ExpandedAgentCardProps {
  agent: {
    id: number;
    name: string;
    role: string;
    status: string;
    division: string;
    efficiency: number;
    lastActive: string;
    icon: LucideIcon;
  };
  handleExpandAgent: (id: number) => void;
  handleAgentAction: (action: string, agent: any) => void;
  divisionColors: any;
  getDivisionName: (division: string) => string;
}

const ExpandedAgentCard: React.FC<ExpandedAgentCardProps> = ({
  agent,
  handleExpandAgent,
  handleAgentAction,
  divisionColors,
  getDivisionName
}) => {
  const { t } = useLanguage();
  
  return (
    <GlassMorphism 
      intensity="low" 
      className={`h-full border ${divisionColors[agent.division].border} rounded-xl overflow-hidden ${agent.status === 'error' ? 'border-red-500/50 animate-pulse-subtle' : ''}`}
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${divisionColors[agent.division].bg}`}>
              <agent.icon className={`h-5 w-5 ${divisionColors[agent.division].text}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-flow-foreground">{agent.name}</h3>
                <Badge className={`${agent.status === 'working' ? 'bg-green-500 text-green-50' : agent.status === 'paused' ? 'bg-amber-500 text-amber-50' : agent.status === 'error' ? 'bg-red-500 text-red-50' : 'bg-gray-500 text-gray-50'} text-xs px-2 py-0.5`}>
                  {t(agent.status)}
                </Badge>
              </div>
              <div className="text-xs text-flow-foreground/60">{agent.role}</div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 rounded-full"
            onClick={() => handleExpandAgent(agent.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-flow-foreground/70">{t('division')}</span>
              <span className={divisionColors[agent.division].text}>{getDivisionName(agent.division)}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-flow-foreground/70">{t('efficiency')}</span>
                <span className={agent.efficiency > 90 ? 'text-green-500' : agent.efficiency > 70 ? 'text-yellow-500' : 'text-flow-foreground/70'}>
                  {agent.efficiency}%
                </span>
              </div>
              <Progress value={agent.efficiency} className="h-2" />
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-flow-foreground/70">{t('lastActive')}</span>
              <span className="text-flow-foreground">{agent.lastActive}</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3">{t('currentTasks')}</h4>
            <div className="space-y-3">
              <div className="p-3 rounded-md bg-flow-background/30">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-flow-foreground">Data Processing Task #4872</span>
                  <span className="text-sm text-green-500">82%</span>
                </div>
                <Progress value={82} className="h-1.5" />
              </div>
              <div className="p-3 rounded-md bg-flow-background/30">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-flow-foreground">System Optimization #3391</span>
                  <span className="text-sm text-amber-500">45%</span>
                </div>
                <Progress value={45} className="h-1.5" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-flow-border/30">
          <h4 className="text-sm font-medium mb-3">{t('agentActivity')}</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 rounded-md bg-flow-background/30">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm">Task processing completed at 14:32</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-md bg-flow-background/30">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span className="text-sm">Data synchronization with KB at 14:15</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-md bg-flow-background/30">
              <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
              <span className="text-sm">Resource allocation optimized at 13:45</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-flow-border/30">
          <h4 className="text-sm font-medium mb-3">{t('agentDetails')}</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="flex flex-col p-2 rounded-md bg-flow-background/30">
              <span className="text-xs text-flow-foreground/70">{t('version')}</span>
              <span className="text-sm text-flow-foreground">v3.2.1</span>
            </div>
            <div className="flex flex-col p-2 rounded-md bg-flow-background/30">
              <span className="text-xs text-flow-foreground/70">{t('memory')}</span>
              <span className="text-sm text-flow-foreground">1.8 GB / 2.0 GB</span>
            </div>
            <div className="flex flex-col p-2 rounded-md bg-flow-background/30">
              <span className="text-xs text-flow-foreground/70">{t('uptime')}</span>
              <span className="text-sm text-flow-foreground">31 days, 4 hours</span>
            </div>
            <div className="flex flex-col p-2 rounded-md bg-flow-background/30">
              <span className="text-xs text-flow-foreground/70">{t('tasksCompleted')}</span>
              <span className="text-sm text-flow-foreground">1,452</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex flex-wrap gap-3">
          {agent.status === 'working' ? (
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs h-8 bg-flow-background/30 border-flow-border/50"
              onClick={() => handleAgentAction('pause', agent)}
            >
              <Pause className="h-3 w-3 mr-1" />
              {t('pause')}
            </Button>
          ) : agent.status === 'paused' ? (
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs h-8 bg-flow-background/30 border-flow-border/50"
              onClick={() => handleAgentAction('resume', agent)}
            >
              <Play className="h-3 w-3 mr-1" />
              {t('resume')}
            </Button>
          ) : agent.status === 'error' ? (
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs h-8 border-red-500/50 text-red-500 hover:bg-red-500/10"
              onClick={() => handleAgentAction('restart', agent)}
            >
              <AlertTriangle className="h-3 w-3 mr-1" />
              {t('restart')}
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs h-8 bg-flow-background/30 border-flow-border/50"
              onClick={() => handleAgentAction('activate', agent)}
            >
              <Play className="h-3 w-3 mr-1" />
              {t('activate')}
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs h-8 bg-flow-background/30 border-flow-border/50"
            onClick={() => handleAgentAction('message', agent)}
          >
            <MessageCircle className="h-3 w-3 mr-1" />
            {t('message')}
          </Button>
        </div>
      </div>
    </GlassMorphism>
  );
};

export default ExpandedAgentCard;
