
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import GlassMorphism from '../ui/GlassMorphism';
import InfoChip from '../ui/InfoChip';

interface AgentCardProps {
  name: string;
  role: string;
  icon: LucideIcon;
  status: 'idle' | 'working' | 'paused' | 'error';
  efficiency: number;
  lastActivity: string;
  className?: string;
}

const AgentCard: React.FC<AgentCardProps> = ({
  name,
  role,
  icon: Icon,
  status,
  efficiency,
  lastActivity,
  className,
}) => {
  const statusConfig = {
    idle: { label: 'Idle', color: 'bg-gray-200 text-gray-800' },
    working: { label: 'Working', color: 'bg-green-100 text-green-800 animate-pulse-subtle' },
    paused: { label: 'Paused', color: 'bg-yellow-100 text-yellow-800' },
    error: { label: 'Error', color: 'bg-red-100 text-red-800' },
  };

  const { label, color } = statusConfig[status];

  return (
    <GlassMorphism 
      className={cn(
        'rounded-xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-md',
        className
      )}
    >
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-flow-muted/50 rounded-lg">
              <Icon className="h-5 w-5 text-flow-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-flow-foreground">{name}</h3>
              <p className="text-xs text-flow-foreground/70">{role}</p>
            </div>
          </div>
          <InfoChip 
            label={label} 
            className={color}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span>Efficiency</span>
            <span>{efficiency}%</span>
          </div>
          <div className="w-full bg-flow-muted rounded-full h-1">
            <div 
              className="h-1 rounded-full bg-flow-accent"
              style={{ width: `${efficiency}%` }}
            />
          </div>
        </div>
        
        <div className="text-xs text-flow-foreground/70">
          Last activity: {lastActivity}
        </div>
      </div>
    </GlassMorphism>
  );
};

export default AgentCard;
