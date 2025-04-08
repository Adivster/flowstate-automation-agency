
import React from 'react';
import { Check, Clock, AlertCircle, Play, Pause, X, RotateCcw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Task, TaskStatus } from '@/contexts/TaskContext';
import { format } from 'date-fns';
import { getDivisionColorScheme, getTaskColorClasses, getStatusColorClasses } from '@/utils/colorSystem';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'paused':
        return <Pause className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colorClasses = getTaskColorClasses(priority);
    
    return (
      <span className={cn("px-2 py-1 text-xs rounded-full", colorClasses)}>
        {priority}
      </span>
    );
  };

  const TaskActionButtons = ({ status }: { status: TaskStatus }) => {
    return (
      <div className="flex gap-2">
        {status !== 'completed' && status !== 'failed' && (
          <>
            {status === 'paused' ? (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Play className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Pause className="h-4 w-4" />
              </Button>
            )}
          </>
        )}
        
        {status === 'failed' && (
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}
        
        {status !== 'completed' && (
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  };

  const dueDateFormatted = task.dueDate 
    ? format(new Date(task.dueDate), 'MMM dd, yyyy')
    : 'No due date';

  // Get division color scheme if available
  const divisionColorScheme = task.division ? getDivisionColorScheme(task.division) : null;
  const divisionBorderStyle = divisionColorScheme ? 
    { borderLeft: `3px solid ${divisionColorScheme.primary}` } : {};

  return (
    <div 
      className={cn(
        "border rounded-lg p-4 bg-flow-card/50 space-y-3 hover:shadow-md transition-all",
        task.division && `hover:shadow-[0_0_15px_${divisionColorScheme?.glow || 'rgba(85,120,255,0.2)'}]`
      )}
      style={divisionBorderStyle}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {getStatusIcon(task.status)}
            <h4 className="font-medium">{task.title}</h4>
          </div>
          <p className="text-sm text-flow-foreground/70">{task.description}</p>
        </div>
        {getPriorityBadge(task.priority)}
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between items-center text-xs">
          <span>Progress</span>
          <span>{task.progress}%</span>
        </div>
        <Progress value={task.progress} 
          className={cn(
            "h-2", 
            task.status === 'failed' ? "bg-red-200" : "bg-flow-muted",
            task.status === 'completed' ? "bg-green-200" : "",
            divisionColorScheme && `overflow-hidden rounded-full`
          )}
        >
          <div 
            className={cn("h-full transition-all duration-500")}
            style={{ 
              width: `${task.progress}%`, 
              backgroundColor: task.status === 'completed' 
                ? '#22c55e' 
                : task.status === 'failed' 
                  ? '#ef4444' 
                  : divisionColorScheme?.primary || '#3b82f6',
              boxShadow: divisionColorScheme ? `0 0 8px ${divisionColorScheme.glow}` : 'none'
            }}
          />
        </Progress>
      </div>
      
      <div className="flex justify-between items-center pt-2">
        <div className="flex flex-col text-xs text-flow-foreground/70">
          <span>Assigned to: <span className="font-medium">{task.assignedTo}</span></span>
          <span>Due date: <span className="font-medium">{dueDateFormatted}</span></span>
          <span>Division: 
            <span 
              className={cn("ml-1 px-1.5 py-0.5 rounded text-[0.65rem]", 
                divisionColorScheme ? "bg-opacity-20 font-medium" : "font-medium capitalize"
              )}
              style={divisionColorScheme ? { 
                backgroundColor: `${divisionColorScheme.bg}`, 
                color: divisionColorScheme.text
              } : {}}
            >
              {task.division}
            </span>
          </span>
        </div>
        <TaskActionButtons status={task.status} />
      </div>
    </div>
  );
};

export default TaskItem;
