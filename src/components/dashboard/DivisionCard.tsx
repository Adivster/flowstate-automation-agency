
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import GlassMorphism from '../ui/GlassMorphism';
import InfoChip from '../ui/InfoChip';
import TransitionWrapper from '../ui/TransitionWrapper';

interface DivisionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  activeAgents: number;
  taskStatus: { completed: number; total: number };
  type: 'strategy' | 'architecture' | 'research' | 'compliance' | 'development' | 'testing' | 'deployment' | 'knowledge' | 'performance';
  className?: string;
  delay?: number;
}

const DivisionCard: React.FC<DivisionCardProps> = ({
  title,
  description,
  icon: Icon,
  activeAgents,
  taskStatus,
  type,
  className,
  delay = 0,
}) => {
  // Color themes for different division types
  const divisionThemes = {
    strategy: { iconColor: 'text-blue-500', bgColor: 'bg-blue-500/5' },
    architecture: { iconColor: 'text-purple-500', bgColor: 'bg-purple-500/5' },
    research: { iconColor: 'text-yellow-500', bgColor: 'bg-yellow-500/5' },
    compliance: { iconColor: 'text-red-500', bgColor: 'bg-red-500/5' },
    development: { iconColor: 'text-green-500', bgColor: 'bg-green-500/5' },
    testing: { iconColor: 'text-orange-500', bgColor: 'bg-orange-500/5' },
    deployment: { iconColor: 'text-sky-500', bgColor: 'bg-sky-500/5' },
    knowledge: { iconColor: 'text-indigo-500', bgColor: 'bg-indigo-500/5' },
    performance: { iconColor: 'text-teal-500', bgColor: 'bg-teal-500/5' }
  };

  const { iconColor, bgColor } = divisionThemes[type];
  const progress = Math.round((taskStatus.completed / taskStatus.total) * 100);

  return (
    <TransitionWrapper delay={delay}>
      <GlassMorphism className={cn('rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg', className)}>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div className={cn('p-3 rounded-lg', bgColor)}>
              <Icon className={cn('h-6 w-6', iconColor)} />
            </div>
            <InfoChip 
              label={`${activeAgents} Active Agents`} 
              variant="outline"
            />
          </div>
          
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-flow-foreground/70">{description}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span>Task Progress</span>
              <span>{progress}% Complete</span>
            </div>
            <div className="w-full bg-flow-muted rounded-full h-1.5">
              <div 
                className={cn("h-1.5 rounded-full transition-all duration-500", iconColor)}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-flow-foreground/70">
              {taskStatus.completed} of {taskStatus.total} tasks completed
            </div>
          </div>
        </div>
      </GlassMorphism>
    </TransitionWrapper>
  );
};

export default DivisionCard;
