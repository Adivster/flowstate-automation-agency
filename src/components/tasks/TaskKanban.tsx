
import React from 'react';
import { useTaskContext, TaskStatus } from '@/contexts/TaskContext';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import TaskItem from './TaskItem';
import { Card } from '@/components/ui/card';
import { Check, Clock, Pause, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskKanbanProps {
  priorityFilter: string | null;
  statusFilter: string | null;
  divisionFilter: string | null;
}

const TaskKanban: React.FC<TaskKanbanProps> = ({ priorityFilter, statusFilter, divisionFilter }) => {
  const { tasks } = useTaskContext();
  
  // Apply filters
  const filteredTasks = tasks.filter(task => {
    if (priorityFilter && task.priority !== priorityFilter) return false;
    // Don't apply status filter in kanban view as we're organizing by status
    if (divisionFilter && task.division !== divisionFilter) return false;
    return true;
  });

  // Define all possible statuses and their display names
  const statuses: { key: TaskStatus; name: string; icon: React.ReactNode; color: string }[] = [
    { 
      key: 'in-progress', 
      name: 'In Progress', 
      icon: <Clock className="h-4 w-4 text-blue-500" />,
      color: 'bg-blue-500/20 border-blue-500/30'
    },
    { 
      key: 'paused', 
      name: 'Paused', 
      icon: <Pause className="h-4 w-4 text-yellow-500" />,
      color: 'bg-yellow-500/20 border-yellow-500/30'
    },
    { 
      key: 'completed', 
      name: 'Completed', 
      icon: <Check className="h-4 w-4 text-green-500" />,
      color: 'bg-green-500/20 border-green-500/30'
    },
    { 
      key: 'failed', 
      name: 'Failed', 
      icon: <AlertCircle className="h-4 w-4 text-red-500" />,
      color: 'bg-red-500/20 border-red-500/30'
    }
  ];

  // If statusFilter is applied, only show that column
  const displayStatuses = statusFilter 
    ? statuses.filter(s => s.key === statusFilter)
    : statuses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayStatuses.map((status, columnIndex) => {
        const columnTasks = filteredTasks.filter(task => task.status === status.key);
        
        return (
          <div key={status.key} className="flex flex-col h-full">
            <div className={cn(`rounded-t-lg border-b p-3 flex items-center justify-between ${status.color}`)}>
              <div className="flex items-center gap-2">
                {status.icon}
                <h3 className="font-medium text-sm">{status.name}</h3>
              </div>
              <span className="text-xs font-medium bg-flow-background/30 px-2 py-0.5 rounded-full">
                {columnTasks.length}
              </span>
            </div>
            
            <Card className="flex-1 bg-flow-card/10 rounded-b-lg p-3 border-t-0 space-y-4 overflow-y-auto min-h-[500px]">
              {columnTasks.length === 0 ? (
                <div className="h-full flex items-center justify-center text-xs text-flow-foreground/50">
                  No tasks
                </div>
              ) : (
                columnTasks.map((task, index) => (
                  <TransitionWrapper key={task.id} delay={50 * index}>
                    <TaskItem task={task} />
                  </TransitionWrapper>
                ))
              )}
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default TaskKanban;
