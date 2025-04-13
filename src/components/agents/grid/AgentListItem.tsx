
import React from 'react';
import { LucideIcon, Play, Pause, MessageCircle, MoreHorizontal, AlertTriangle, Activity, Zap, Settings, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GlassMorphism from '@/components/ui/GlassMorphism';
import { motion } from 'framer-motion';
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
  
  // Apply division-specific glow effect 
  const getGlowStyle = () => {
    const glowColor = colors.text.replace('text-', '');
    let colorValue = '#8b5cf6'; // Default purple

    if (glowColor.includes('green')) colorValue = '#22c55e';
    else if (glowColor.includes('blue')) colorValue = '#3b82f6';
    else if (glowColor.includes('amber')) colorValue = '#f59e0b';
    else if (glowColor.includes('pink')) colorValue = '#ec4899';

    return { boxShadow: `0 0 8px 0 ${colorValue}40` };
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <GlassMorphism 
        className={`border border-flow-border/50 hover:border-${colors.text.replace('text-', '')}/60 transition-all duration-200 hover:shadow-[0_0_15px_rgba(85,120,255,0.15)] rounded-lg p-3 cursor-pointer`}
        onClick={() => handleExpandAgent(agent.id)}
        style={getGlowStyle()}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${colors.bg} ${agent.status === 'working' ? 'animate-pulse-subtle' : ''}`}>
              <agent.icon className={`h-4 w-4 ${colors.text}`} />
            </div>
            
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className={`font-medium ${colors.text}`}>{agent.name}</h3>
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
                  className={`h-7 px-2 text-xs border border-transparent hover:border-${colors.text.replace('text-', '')}/30 hover:bg-${colors.text.replace('text-', '')}/10`}
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
                  className={`h-7 px-2 text-xs border border-transparent hover:border-${colors.text.replace('text-', '')}/30 hover:bg-${colors.text.replace('text-', '')}/10`}
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
                className={`h-7 px-2 text-xs border-flow-border hover:bg-${colors.text.replace('text-', '')}/10 hover:border-${colors.text.replace('text-', '')}/40`}
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
                    className="flex items-center text-xs py-1.5 cursor-pointer"
                  >
                    <Activity className="h-3.5 w-3.5 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAgentAction('assign', agent);
                    }}
                    className="flex items-center text-xs py-1.5 cursor-pointer"
                  >
                    <Zap className="h-3.5 w-3.5 mr-2" />
                    Assign Task
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAgentAction('configure', agent);
                    }}
                    className="flex items-center text-xs py-1.5 cursor-pointer"
                  >
                    <Settings className="h-3.5 w-3.5 mr-2" />
                    Configure Agent
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        {/* Animated progress bar at the bottom */}
        {agent.status === 'working' && (
          <div className="mt-3 h-1 w-full bg-black/30 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${colors.bg.replace('bg', 'bg-gradient-to-r from')}/70 to-${colors.bg.replace('bg-', '')}/30`}
              initial={{ width: 0 }}
              animate={{ 
                width: ['20%', '60%', '40%', '75%', '55%', '90%'],
                transition: { 
                  repeat: Infinity, 
                  repeatType: 'reverse',
                  duration: 15,
                  ease: 'easeInOut'
                }
              }}
            />
          </div>
        )}
      </GlassMorphism>
    </motion.div>
  );
};

export default AgentListItem;
