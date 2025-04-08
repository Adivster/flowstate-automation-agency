
import React from 'react';
import { Check, Clock, AlertCircle, Play, Pause, X, RotateCcw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Task, TaskStatus } from '@/contexts/TaskContext';
import { format } from 'date-fns';

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
    const classes = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    };
    
    return (
      <span className={cn("px-2 py-1 text-xs rounded-full", classes[priority as keyof typeof classes])}>
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

  return (
    <div className="border rounded-lg p-4 bg-flow-card/50 space-y-3 hover:shadow-md transition-all">
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
            task.status === 'completed' ? "bg-green-200" : ""
          )}
        />
      </div>
      
      <div className="flex justify-between items-center pt-2">
        <div className="flex flex-col text-xs text-flow-foreground/70">
          <span>Assigned to: <span className="font-medium">{task.assignedTo}</span></span>
          <span>Due date: <span className="font-medium">{dueDateFormatted}</span></span>
          <span>Division: <span className="font-medium capitalize">{task.division}</span></span>
        </div>
        <TaskActionButtons status={task.status} />
      </div>
    </div>
  );
};

export default TaskItem;
