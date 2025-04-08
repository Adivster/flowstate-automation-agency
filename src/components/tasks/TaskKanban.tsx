
import React from 'react';
import { useTaskStore, TaskStatus } from '@/contexts/TaskContext';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import TaskItem from './TaskItem';

interface TaskKanbanProps {
  priorityFilter: string | null;
  statusFilter: string | null;
  divisionFilter: string | null;
}

const TaskKanban: React.FC<TaskKanbanProps> = ({ priorityFilter, statusFilter, divisionFilter }) => {
  const { tasks } = useTaskStore();
  
  // Apply filters
  const filteredTasks = tasks.filter(task => {
    if (priorityFilter && task.priority !== priorityFilter) return false;
    // Don't apply status filter in kanban view as we're organizing by status
    if (divisionFilter && task.division !== divisionFilter) return false;
    return true;
  });

  // Define all possible statuses and their display names
  const statuses: { key: TaskStatus; name: string }[] = [
    { key: 'in-progress', name: 'In Progress' },
    { key: 'paused', name: 'Paused' },
    { key: 'completed', name: 'Completed' },
    { key: 'failed', name: 'Failed' }
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
            <div className="bg-flow-card/30 p-3 rounded-t-lg border-b">
              <h3 className="font-medium text-sm">{status.name}</h3>
            </div>
            
            <div className="flex-1 bg-flow-card/10 rounded-b-lg p-3 min-h-[400px] border-t-0 border space-y-4 overflow-y-auto">
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
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskKanban;
