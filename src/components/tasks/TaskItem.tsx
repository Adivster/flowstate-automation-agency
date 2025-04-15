
import React from 'react';
import { Check, Clock, AlertCircle, Play, Pause, X, RotateCcw, Edit, MoreVertical, Calendar, Leaf } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Task, TaskStatus, useTaskStore } from '@/contexts/TaskContext';
import { format } from 'date-fns';
import { getDivisionColorScheme, getTaskColorClasses, getStatusColorClasses } from '@/utils/colorSystem';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';

interface TaskItemProps {
  task: Task;
  isGridView?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, isGridView = false }) => {
  const { updateTask, deleteTask } = useTaskStore();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Handle status change
  const handleStatusChange = (newStatus: TaskStatus) => {
    updateTask(task.id, { 
      status: newStatus,
      // If completing a task, set progress to 100%
      ...(newStatus === 'completed' ? { progress: 100 } : {}),
      // If resuming a task from paused, no progress change
      // If failing a task, no progress change
    });
    toast.success(`Task status updated to ${newStatus}`);
  };
  
  // Handle task deletion
  const handleDelete = () => {
    deleteTask(task.id);
    toast.success('Task deleted');
  };
  
  // Get status icon
  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return <Check className={`h-4 w-4 ${isDark ? 'text-green-500' : 'text-emerald-600'}`} />;
      case 'in-progress':
        return <Clock className={`h-4 w-4 ${isDark ? 'text-blue-500' : 'text-sky-600'} animate-pulse`} />;
      case 'paused':
        return <Pause className={`h-4 w-4 ${isDark ? 'text-yellow-500' : 'text-amber-600'}`} />;
      case 'failed':
        return <AlertCircle className={`h-4 w-4 ${isDark ? 'text-red-500' : 'text-rose-600'}`} />;
      default:
        return null;
    }
  };
  
  // Format due date
  const dueDateFormatted = task.dueDate 
    ? format(new Date(task.dueDate), 'MMM dd, yyyy')
    : 'No due date';
    
  // Check if task is overdue
  const isOverdue = task.dueDate 
    ? new Date(task.dueDate) < new Date() && task.status !== 'completed'
    : false;
  
  // Get division color scheme
  const divisionColorScheme = task.division ? getDivisionColorScheme(task.division) : null;
  const divisionBorderStyle = divisionColorScheme ? 
    { borderLeft: `3px solid ${divisionColorScheme.primary}` } : {};
  
  // Get progress color based on status
  const getProgressColor = () => {
    if (task.status === 'completed') return isDark ? '#22c55e' : '#059669';
    if (task.status === 'failed') return isDark ? '#ef4444' : '#dc2626';
    if (isOverdue) return isDark ? '#f97316' : '#ea580c';
    return divisionColorScheme?.primary || (isDark ? '#3b82f6' : '#0ea5e9');
  };
  
  // Actions menu
  const taskActions = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={`w-48 ${!isDark && 'border-emerald-100 bg-white/90 backdrop-blur-sm'}`}>
        <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => toast.info('Edit task')}>
          <Edit className="mr-2 h-4 w-4" />
          <span>Edit Task</span>
        </DropdownMenuItem>
        
        {task.status !== 'completed' && task.status !== 'failed' && (
          <>
            {task.status === 'paused' ? (
              <DropdownMenuItem onClick={() => handleStatusChange('in-progress')}>
                <Play className="mr-2 h-4 w-4" />
                <span>Resume Task</span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => handleStatusChange('paused')}>
                <Pause className="mr-2 h-4 w-4" />
                <span>Pause Task</span>
              </DropdownMenuItem>
            )}
          </>
        )}
        
        {task.status !== 'completed' && (
          <DropdownMenuItem onClick={() => handleStatusChange('completed')}>
            <Check className="mr-2 h-4 w-4" />
            <span>Mark Completed</span>
          </DropdownMenuItem>
        )}
        
        {task.status === 'failed' && (
          <DropdownMenuItem onClick={() => handleStatusChange('in-progress')}>
            <RotateCcw className="mr-2 h-4 w-4" />
            <span>Retry Task</span>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
          <X className="mr-2 h-4 w-4" />
          <span>Delete Task</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  
  // Task priority badge
  const priorityBadge = (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-medium",
        getTaskColorClasses(task.priority)
      )}
    >
      {task.priority}
    </Badge>
  );
  
  // Grid view layout
  if (isGridView) {
    return (
      <div 
        className={cn(
          "border rounded-lg p-4 space-y-3 hover:shadow-md transition-all h-full flex flex-col",
          isDark 
            ? `bg-flow-card/50 ${task.division && `hover:shadow-[0_0_15px_${divisionColorScheme?.glow || 'rgba(85,120,255,0.2)'}]`}`
            : `bg-white/70 backdrop-blur-md shadow-sm hover:shadow ${task.division && 'hover:shadow-emerald-100'}`
        )}
        style={divisionBorderStyle}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {getStatusIcon(task.status)}
            <h4 className="font-medium line-clamp-1">{task.title}</h4>
          </div>
          {priorityBadge}
        </div>
        
        <p className="text-sm text-flow-foreground/70 flex-grow line-clamp-2">{task.description}</p>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <Progress 
            value={task.progress} 
            className={cn(
              "h-2", 
              isDark ? 
                (task.status === 'failed' ? "bg-red-200" : "bg-flow-muted") : 
                (task.status === 'completed' ? "bg-emerald-100" : "bg-emerald-100")
            )}
          >
            <div 
              className={cn("h-full transition-all duration-500")}
              style={{ 
                width: `${task.progress}%`, 
                backgroundColor: getProgressColor(),
                boxShadow: divisionColorScheme ? `0 0 8px ${divisionColorScheme.glow}` : 'none'
              }}
            />
          </Progress>
        </div>
        
        <div className="flex flex-col gap-1 pt-2 text-xs text-flow-foreground/70">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span className={cn(isOverdue && (isDark ? "text-orange-400" : "text-orange-600"))}>
              {dueDateFormatted}
            </span>
          </div>
          <span>Assigned to: <span className="font-medium">{task.assignedTo}</span></span>
        </div>
        
        <div className="flex justify-end">
          {taskActions}
        </div>
      </div>
    );
  }
  
  // List view layout (default)
  return (
    <div 
      className={cn(
        "border rounded-lg p-4 space-y-3 hover:shadow-md transition-all",
        isDark 
          ? `bg-flow-card/50 ${task.division && `hover:shadow-[0_0_15px_${divisionColorScheme?.glow || 'rgba(85,120,255,0.2)'}]`}`
          : `bg-white/70 backdrop-blur-md shadow-sm hover:shadow ${task.division && 'hover:shadow-emerald-100'}`
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
        {priorityBadge}
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between items-center text-xs">
          <span>Progress</span>
          <span>{task.progress}%</span>
        </div>
        <Progress 
          value={task.progress} 
          className={cn(
            "h-2", 
            isDark ? 
              (task.status === 'failed' ? "bg-red-200" : "bg-flow-muted") : 
              (task.status === 'completed' ? "bg-emerald-100" : "bg-emerald-100")
          )}
        >
          <div 
            className={cn("h-full transition-all duration-500")}
            style={{ 
              width: `${task.progress}%`, 
              backgroundColor: getProgressColor(),
              boxShadow: divisionColorScheme ? `0 0 8px ${divisionColorScheme.glow}` : 'none'
            }}
          />
        </Progress>
      </div>
      
      <div className="flex justify-between items-center pt-2">
        <div className="flex flex-col text-xs text-flow-foreground/70">
          <span>Assigned to: <span className="font-medium">{task.assignedTo}</span></span>
          <span className={cn("flex items-center", isOverdue && (isDark ? "text-orange-400" : "text-orange-600"))}>
            <Calendar className="h-3 w-3 mr-1" />
            {dueDateFormatted}
          </span>
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
              {task.division || "General"}
            </span>
          </span>
        </div>
        
        {taskActions}
      </div>
    </div>
  );
};

export default TaskItem;
