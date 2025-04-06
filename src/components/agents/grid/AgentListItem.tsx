
import React from 'react';
import { LucideIcon, Play, Pause, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GlassMorphism from '@/components/ui/GlassMorphism';

interface AgentListItemProps {
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
}

const AgentListItem: React.FC<AgentListItemProps> = ({
  agent,
  handleExpandAgent,
  handleAgentAction,
  divisionColors
}) => {
  const colors = divisionColors[agent.division] || divisionColors.kb;
  
  return (
    <GlassMorphism 
      className="border border-flow-border/50 hover:border-flow-accent/50 transition-all duration-200 hover:shadow-[0_0_15px_rgba(85,120,255,0.15)] rounded-lg p-3 cursor-pointer"
      onClick={() => handleExpandAgent(agent.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${colors.bg}`}>
            <agent.icon className={`h-4 w-4 ${colors.text}`} />
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{agent.name}</h3>
              <Badge className={`${
                agent.status === 'working' ? 'bg-green-500 text-white' :
                agent.status === 'paused' ? 'bg-amber-500 text-white' :
                agent.status === 'error' ? 'bg-red-500 text-white' :
                'bg-gray-500 text-white'
              } text-xs`}>
                {agent.status}
              </Badge>
            </div>
            <p className="text-xs text-flow-foreground/70">{agent.role}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="hidden sm:flex items-center space-x-1">
            <span className="text-xs text-flow-foreground/70">Efficiency:</span>
            <span className={`text-xs font-medium ${
              agent.efficiency > 90 ? 'text-green-500' : 
              agent.efficiency > 70 ? 'text-yellow-500' : 
              'text-red-500'
            }`}>
              {agent.efficiency}%
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <span className="text-xs text-flow-foreground/70">Last active:</span>
            <span className="text-xs">{agent.lastActive}</span>
          </div>
          
          <div className="flex space-x-2">
            {agent.status === 'working' ? (
              <Button
                variant="ghost" 
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAgentAction('pause', agent);
                }}
              >
                <Pause className="h-3 w-3 mr-1" />
                Pause
              </Button>
            ) : agent.status === 'paused' ? (
              <Button
                variant="ghost" 
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAgentAction('resume', agent);
                }}
              >
                <Play className="h-3 w-3 mr-1" />
                Resume
              </Button>
            ) : null}
            
            <Button
              variant="outline" 
              size="sm"
              className="h-7 px-2 text-xs border-flow-border"
              onClick={(e) => {
                e.stopPropagation();
                handleAgentAction('message', agent);
              }}
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              Message
            </Button>
          </div>
        </div>
      </div>
    </GlassMorphism>
  );
};

export default AgentListItem;
