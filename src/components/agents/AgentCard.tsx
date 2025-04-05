
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, MoreHorizontal, ArrowUpRight, Zap } from 'lucide-react';
import GlassMorphism from '../ui/GlassMorphism';
import InfoChip from '../ui/InfoChip';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';

interface AgentCardProps {
  name: string;
  role: string;
  icon: LucideIcon;
  status: 'idle' | 'working' | 'paused' | 'error';
  efficiency: number;
  lastActivity: string;
  className?: string;
  tags?: string[];
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
  onClick,
}) => {
  const { toast } = useToast();
  
  const statusConfig = {
    idle: { label: 'Idle', color: 'bg-gray-200 text-gray-800' },
    working: { label: 'Working', color: 'bg-green-100 text-green-800 animate-pulse-subtle' },
    paused: { label: 'Paused', color: 'bg-yellow-100 text-yellow-800' },
    error: { label: 'Error', color: 'bg-red-100 text-red-800' },
  };

  const { label, color } = statusConfig[status];
  
  const handleAction = (action: string) => {
    toast({
      title: `${action} Agent`,
      description: `${action} action initiated for ${name}`,
      duration: 3000,
    });
  };

  return (
    <GlassMorphism 
      className={cn(
        'rounded-xl overflow-hidden transition-all duration-300 border border-flow-border/50 hover:border-flow-border w-full',
        className
      )}
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${status === 'working' ? 'bg-flow-accent/20' : 'bg-flow-muted/50'}`}>
              <Icon className={`h-5 w-5 ${status === 'working' ? 'text-flow-accent animate-pulse-subtle' : 'text-flow-foreground'}`} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-flow-foreground">{name}</h3>
                <InfoChip 
                  label={label} 
                  className={color}
                />
              </div>
              <p className="text-xs text-flow-foreground/70">{role}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-flow-muted/50">
                  <MoreHorizontal className="h-4 w-4 text-flow-foreground/70" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleAction('Assign Task')}>
                  Assign Task
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction('Pause')}>
                  {status === 'paused' ? 'Resume' : 'Pause'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction('Configure')}>
                  Configure
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction('View Logs')}>
                  View Logs
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6 mt-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-flow-foreground/70">Efficiency</span>
              <span className={`font-medium ${
                efficiency > 90 ? 'text-green-500' : 
                efficiency > 70 ? 'text-yellow-500' : 
                'text-flow-foreground/70'
              }`}>{efficiency}%</span>
            </div>
            <div className="w-full bg-flow-muted rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-1.5 rounded-full ${
                  efficiency > 90 ? 'bg-green-500' : 
                  efficiency > 70 ? 'bg-yellow-500' : 
                  'bg-flow-accent'
                }`}
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
              className="text-xs flex items-center text-flow-accent hover:underline"
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
