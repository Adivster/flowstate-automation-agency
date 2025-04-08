import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, MoreHorizontal, ArrowUpRight, Zap, Activity } from 'lucide-react';
import GlassMorphism from '../ui/GlassMorphism';
import InfoChip from '../ui/InfoChip';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { ColorScheme, getStatusColorClasses } from '@/utils/colorSystem';

interface AgentCardProps {
  name: string;
  role: string;
  icon: LucideIcon;
  status: 'idle' | 'working' | 'paused' | 'error';
  efficiency: number;
  lastActivity: string;
  className?: string;
  tags?: string[];
  divisionColor?: ColorScheme;
  division?: string;
  onClick?: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({
  name,
  role,
  icon: Icon,
  status,
  efficiency,
  lastActivity,
  className,
  tags = [],
  divisionColor,
  division,
  onClick,
}) => {
  const { toast } = useToast();
  
  const statusConfig = {
    idle: { 
      label: 'Idle', 
      ...getStatusColorClasses('idle')
    },
    working: { 
      label: 'Working', 
      ...getStatusColorClasses('working')
    },
    paused: { 
      label: 'Paused', 
      ...getStatusColorClasses('paused')
    },
    error: { 
      label: 'Error', 
      ...getStatusColorClasses('error')
    },
  };

  const { label, badge, background, indicator } = statusConfig[status];
  
  const getEfficiencyColor = (value: number) => {
    if (value > 90) return 'text-green-500';
    if (value > 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getEfficiencyBarColor = (value: number) => {
    if (value > 90) return 'bg-green-500';
    if (value > 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const handleAction = (action: string) => {
    toast({
      title: `${action} Agent`,
      description: `${action} action initiated for ${name}`,
      duration: 3000,
    });
  };

  // Division-based styling
  const divBgColor = divisionColor ? divisionColor.bg : 'bg-flow-accent/20';
  const divIconColor = divisionColor ? divisionColor.text : 'text-flow-accent';
  const divBorderColor = divisionColor ? `border-${divisionColor.primary}` : 'border-flow-accent';
  
  return (
    <GlassMorphism 
      className={cn(
        'rounded-xl overflow-hidden transition-all duration-300 border border-flow-border/50 hover:border-flow-accent hover:shadow-[0_0_20px_rgba(85,120,255,0.2)] hover:-translate-y-1',
        divisionColor && `hover:shadow-[0_0_20px_${divisionColor.glow}]`,
        className
      )}
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${status === 'working' ? divBgColor : background}`}>
              <Icon className={`h-5 w-5 ${status === 'working' ? divIconColor : 'text-flow-foreground'} ${status === 'working' ? 'animate-pulse-subtle' : ''}`} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-flow-foreground">{name}</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="inline-flex">
                      <InfoChip 
                        label={label} 
                        className={badge}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${indicator}`}></div>
                        <span>{label} status</span>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-xs text-flow-foreground/70">{role}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-flow-muted/50 transition-colors">
                  <MoreHorizontal className="h-4 w-4 text-flow-foreground/70" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-flow-background/80 backdrop-blur-md border-flow-border">
                <DropdownMenuItem 
                  onClick={() => handleAction('View Details')}
                  className="flex items-center cursor-pointer"
                >
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleAction('Assign Task')}
                  className="flex items-center cursor-pointer"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Assign Task
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {status === 'paused' ? (
                  <DropdownMenuItem 
                    onClick={() => handleAction('Resume')}
                    className="flex items-center cursor-pointer"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Resume Agent
                  </DropdownMenuItem>
                ) : status === 'working' ? (
                  <DropdownMenuItem 
                    onClick={() => handleAction('Pause')}
                    className="flex items-center cursor-pointer"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Pause Agent
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuItem 
                  onClick={() => handleAction('Configure')}
                  className="flex items-center cursor-pointer"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Configure
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6 mt-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-flow-foreground/70">Efficiency</span>
              <span className={`font-medium ${getEfficiencyColor(efficiency)}`}>
                {efficiency}%
              </span>
            </div>
            <div className="w-full bg-flow-muted rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-1.5 rounded-full ${getEfficiencyBarColor(efficiency)}`}
                style={{ width: `${efficiency}%` }}
              />
            </div>
          </div>
          
          <div className="text-xs text-flow-foreground/70 flex items-center">
            <Zap className="h-3 w-3 mr-1" />
            Last activity: {lastActivity}
          </div>
          
          <div className="flex justify-end">
            <button 
              className="text-xs flex items-center text-flow-accent hover:text-flow-accent/80 transition-colors hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                handleAction('View Details');
              }}
            >
              Details
              <ArrowUpRight className="h-3 w-3 ml-0.5" />
            </button>
          </div>
        </div>
        
        {division && (
          <div className="mt-3 flex items-center">
            <span className="text-xs text-flow-foreground/70 mr-2">Division:</span>
            <Badge 
              variant="outline" 
              style={{ 
                backgroundColor: divisionColor?.bg || 'transparent',
                color: divisionColor?.text || 'currentColor',
                borderColor: divisionColor?.border || 'currentColor'
              }}
              className="text-xs"
            >
              {division}
            </Badge>
          </div>
        )}
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-3">
            {tags.map(tag => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-[0.65rem] px-1.5 py-0 bg-flow-muted/30 text-flow-foreground/70"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </GlassMorphism>
  );
};

export default AgentCard;
