
import React from 'react';
import { LucideIcon, Play, Pause, MessageCircle, MoreHorizontal, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GlassMorphism from '@/components/ui/GlassMorphism';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

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
  
  const getEfficiencyColor = (value: number) => {
    if (value > 90) return 'text-green-500';
    if (value > 70) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const getStatusBg = (status: string) => {
    if (status === 'working') return 'bg-green-500 text-white';
    if (status === 'paused') return 'bg-amber-500 text-white';
    if (status === 'error') return 'bg-red-500 text-white';
    return 'bg-gray-500 text-white';
  };
  
  return (
    <GlassMorphism 
      className="border border-flow-border/50 hover:border-flow-accent/50 transition-all duration-200 hover:shadow-[0_0_15px_rgba(85,120,255,0.15)] rounded-lg p-3 cursor-pointer"
      onClick={() => handleExpandAgent(agent.id)}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${colors.bg} ${agent.status === 'working' ? 'animate-pulse-subtle' : ''}`}>
            <agent.icon className={`h-4 w-4 ${colors.text}`} />
          </div>
          
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-medium">{agent.name}</h3>
              <Badge className={`${getStatusBg(agent.status)} text-xs`}>
                {agent.status}
              </Badge>
            </div>
            <p className="text-xs text-flow-foreground/70">{agent.role}</p>
          </div>
        </div>
        
        <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-xs text-flow-foreground/70">Efficiency:</span>
            <span className={`text-xs font-medium ${getEfficiencyColor(agent.efficiency)}`}>
              {agent.efficiency}%
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <span className="text-xs text-flow-foreground/70">Last active:</span>
            <span className="text-xs">{agent.lastActive}</span>
          </div>
          
          <div className="flex items-center space-x-2 ml-auto">
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
            ) : agent.status === 'error' ? (
              <Button
                variant="outline" 
                size="sm"
                className="h-7 px-2 text-xs border-red-500/50 text-red-500 hover:bg-red-500/10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAgentAction('restart', agent);
                }}
              >
                <AlertTriangle className="h-3 w-3 mr-1" />
                Restart
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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-7 w-7 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-flow-background/80 backdrop-blur-md border-flow-border">
                <DropdownMenuItem 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAgentAction('details', agent);
                  }}
                >
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAgentAction('assign', agent);
                  }}
                >
                  Assign Task
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAgentAction('configure', agent);
                  }}
                >
                  Configure Agent
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </GlassMorphism>
  );
};

export default AgentListItem;
