
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import GlassMorphism from '../ui/GlassMorphism';
import InfoChip from '../ui/InfoChip';
import TransitionWrapper from '../ui/TransitionWrapper';
import { usePerformanceData } from '@/hooks/usePerformanceData';

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
  // Enhanced color themes for different division types with cyberpunk styling
  const divisionThemes = {
    strategy: { iconColor: 'text-blue-500', bgColor: 'bg-blue-500/5', glowColor: '#3b82f6', borderColor: 'border-blue-500/30' },
    architecture: { iconColor: 'text-purple-500', bgColor: 'bg-purple-500/5', glowColor: '#8b5cf6', borderColor: 'border-purple-500/30' },
    research: { iconColor: 'text-yellow-500', bgColor: 'bg-yellow-500/5', glowColor: '#eab308', borderColor: 'border-yellow-500/30' },
    compliance: { iconColor: 'text-red-500', bgColor: 'bg-red-500/5', glowColor: '#ef4444', borderColor: 'border-red-500/30' },
    development: { iconColor: 'text-green-500', bgColor: 'bg-green-500/5', glowColor: '#22c55e', borderColor: 'border-green-500/30' },
    testing: { iconColor: 'text-orange-500', bgColor: 'bg-orange-500/5', glowColor: '#f97316', borderColor: 'border-orange-500/30' },
    deployment: { iconColor: 'text-sky-500', bgColor: 'bg-sky-500/5', glowColor: '#0ea5e9', borderColor: 'border-sky-500/30' },
    knowledge: { iconColor: 'text-indigo-500', bgColor: 'bg-indigo-500/5', glowColor: '#6366f1', borderColor: 'border-indigo-500/30' },
    performance: { iconColor: 'text-teal-500', bgColor: 'bg-teal-500/5', glowColor: '#14b8a6', borderColor: 'border-teal-500/30' }
  };

  const { iconColor, bgColor, glowColor, borderColor } = divisionThemes[type];
  
  // Use a stable ID (combination of title and type) to get consistent performance data
  const divisionId = `${title}-${type}`;
  const performanceData = usePerformanceData(divisionId);
  
  // Use the stable taskStatus or calculate it from performanceData
  const progress = taskStatus 
    ? Math.round((taskStatus.completed / taskStatus.total) * 100)
    : performanceData.taskCompletion;

  return (
    <TransitionWrapper delay={delay}>
      <GlassMorphism 
        className={cn(
          'rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg backdrop-blur-sm border', 
          borderColor, 
          className
        )}
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${glowColor}05 0px, transparent 1px, transparent 3px)`,
          boxShadow: `0 0 15px ${glowColor}20`
        }}
      >
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div className={cn('p-3 rounded-lg', bgColor)} style={{
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: `${glowColor}40`,
              boxShadow: `0 0 10px ${glowColor}30`
            }}>
              <Icon className={cn('h-6 w-6', iconColor)} />
            </div>
            <InfoChip 
              label={`${activeAgents} Active Agents`} 
              variant="outline"
              className={cn('bg-flow-background/20 group-hover:bg-flow-background/30', borderColor)}
            />
          </div>
          
          <div className="space-y-1">
            <h3 className="text-lg font-semibold font-cyber">{title}</h3>
            <p className="text-sm text-flow-foreground/70">{description}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span>Task Progress</span>
              <span className="font-mono">{progress}% Complete</span>
            </div>
            <div className="w-full bg-flow-muted/20 rounded-full h-1.5 overflow-hidden" style={{ borderWidth: '1px', borderColor: `${glowColor}20` }}>
              <div 
                className={cn("h-1.5 rounded-full transition-all duration-500", iconColor)}
                style={{ 
                  width: `${progress}%`,
                  boxShadow: `0 0 8px ${glowColor}`
                }}
              />
            </div>
            <div className="text-xs text-flow-foreground/70">
              {taskStatus ? (
                `${taskStatus.completed} of ${taskStatus.total} tasks completed`
              ) : (
                `${performanceData.tasksCompleted} tasks completed`
              )}
            </div>
          </div>
        </div>
        
        {/* Add subtle scan lines effect */}
        <div className="absolute inset-0 scan-lines pointer-events-none opacity-30"></div>
        
        {/* Add subtle hover glow effect to the border */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" style={{ 
          boxShadow: `0 0 15px ${glowColor}40`,
          border: `1px solid ${glowColor}60`
        }}></div>
      </GlassMorphism>
    </TransitionWrapper>
  );
};

export default DivisionCard;
