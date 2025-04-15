
import React from 'react';
import { useTaskContext } from '@/contexts/TaskContext';
import TaskItem from './TaskItem';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { cn } from '@/lib/utils';

interface TaskListProps {
  priorityFilter: string | null;
  statusFilter: string | null;
  divisionFilter: string | null;
  isGridView?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ 
  priorityFilter, 
  statusFilter, 
  divisionFilter,
  isGridView = false
}) => {
  const { tasks } = useTaskContext();
  
  const filteredTasks = tasks.filter(task => {
    // Apply filters if they exist
    if (priorityFilter && task.priority !== priorityFilter) return false;
    if (statusFilter && task.status !== statusFilter) return false;
    if (divisionFilter && task.division !== divisionFilter) return false;
    return true;
  });

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-flow-foreground/60">No tasks match the current filters.</p>
      </div>
    );
  }

  // If grid view, render in a grid layout with isGridView prop
  if (isGridView) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`}>
        {filteredTasks.map((task, index) => (
          <TransitionWrapper key={task.id} delay={50 * index}>
            <TaskItem task={task} isGridView={true} />
          </TransitionWrapper>
        ))}
      </div>
    );
  }

  // Default list view
  return (
    <div className="space-y-4">
      {filteredTasks.map((task, index) => (
        <TransitionWrapper key={task.id} delay={50 * index}>
          <TaskItem task={task} />
        </TransitionWrapper>
      ))}
    </div>
  );
};

export default TaskList;
