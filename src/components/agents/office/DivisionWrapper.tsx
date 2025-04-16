
import React from 'react';
import Division, { DivisionTask } from './Division';
import { useTaskContext } from '@/contexts/TaskContext';

// This component inherits all props from Division but wraps it with TaskContext usage
type DivisionWrapperProps = React.ComponentProps<typeof Division>;

const DivisionWrapper: React.FC<DivisionWrapperProps> = (props) => {
  const { tasks } = useTaskContext();
  
  // Filter tasks for this division
  const divisionTasks = tasks
    .filter(task => task.division === props.division.id)
    .map(task => ({
      id: task.id,
      title: task.title,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      division: task.division,
      progress: task.progress
    } as DivisionTask));
  
  // Pass all original props plus the filtered tasks to Division
  return <Division {...props} divisionTasks={divisionTasks} />;
};

export default DivisionWrapper;
