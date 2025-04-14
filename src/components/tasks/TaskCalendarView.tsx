
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { useTaskStore } from '@/contexts/TaskContext';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { getDivisionColorScheme, getTaskColorClasses } from '@/utils/colorSystem';
import TaskItem from './TaskItem';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';

interface TaskCalendarViewProps {
  priorityFilter: string | null;
  statusFilter: string | null;
  divisionFilter: string | null;
}

const TaskCalendarView: React.FC<TaskCalendarViewProps> = ({
  priorityFilter,
  statusFilter,
  divisionFilter,
}) => {
  const { tasks } = useTaskStore();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Filter tasks based on criteria
  const filteredTasks = tasks.filter(task => {
    // Apply filters if they exist
    if (priorityFilter && task.priority !== priorityFilter) return false;
    if (statusFilter && task.status !== statusFilter) return false;
    if (divisionFilter && task.division !== divisionFilter) return false;
    
    // Always include tasks that match
    return true;
  });
  
  // Group tasks by date for calendar highlighting
  const tasksByDate: Record<string, typeof filteredTasks> = {};
  
  filteredTasks.forEach(task => {
    if (task.dueDate) {
      const dateStr = format(new Date(task.dueDate), 'yyyy-MM-dd');
      if (!tasksByDate[dateStr]) {
        tasksByDate[dateStr] = [];
      }
      tasksByDate[dateStr].push(task);
    }
  });

  // Get tasks for selected date
  const selectedDateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const tasksForSelectedDate = selectedDateStr ? (tasksByDate[selectedDateStr] || []) : [];
  
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2">
        <Card className="border-flow-border/30 bg-flow-card/30 p-4">
          <TooltipProvider>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border-0"
              modifiers={{
                booked: (date) => {
                  const dateStr = format(date, 'yyyy-MM-dd');
                  return !!tasksByDate[dateStr];
                },
              }}
              modifiersStyles={{
                booked: {
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                },
              }}
              components={{
                DayContent: ({ date, ...props }) => {
                  const dateStr = format(date, 'yyyy-MM-dd');
                  const dayTasks = tasksByDate[dateStr] || [];
                  
                  if (dayTasks.length === 0) {
                    return <div {...props}>{date.getDate()}</div>;
                  }
                  
                  // Get the priority colors
                  const hasHighPriority = dayTasks.some(t => t.priority === 'high');
                  const hasMediumPriority = !hasHighPriority && dayTasks.some(t => t.priority === 'medium');
                  
                  let priorityClass = '';
                  if (hasHighPriority) {
                    priorityClass = 'bg-red-500/20 text-red-500';
                  } else if (hasMediumPriority) {
                    priorityClass = 'bg-yellow-500/20 text-yellow-500';
                  } else {
                    priorityClass = 'bg-green-500/20 text-green-500';
                  }
                  
                  return (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div 
                          {...props} 
                          className={cn(
                            "w-8 h-8 flex items-center justify-center rounded-full", 
                            priorityClass
                          )}
                        >
                          {date.getDate()}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <div className="text-sm font-medium">
                          {dayTasks.length} task{dayTasks.length !== 1 ? 's' : ''}:
                        </div>
                        <ul className="text-xs mt-1">
                          {dayTasks.slice(0, 3).map(task => (
                            <li key={task.id} className="truncate">
                              • {task.title}
                            </li>
                          ))}
                          {dayTasks.length > 3 && (
                            <li className="text-flow-foreground/70">+ {dayTasks.length - 3} more</li>
                          )}
                        </ul>
                      </TooltipContent>
                    </Tooltip>
                  );
                },
              }}
            />
          </TooltipProvider>
        </Card>
      </div>
      
      <div className="lg:w-1/2">
        <h3 className="text-lg font-medium mb-4">
          Tasks for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Selected Day'}
        </h3>
        
        {tasksForSelectedDate.length > 0 ? (
          <div className="space-y-4">
            {tasksForSelectedDate.map((task, index) => (
              <TransitionWrapper key={task.id} delay={50 * index}>
                <TaskItem task={task} />
              </TransitionWrapper>
            ))}
          </div>
        ) : (
          <Card className="border-flow-border/30 bg-flow-card/10 p-8 flex items-center justify-center">
            <p className="text-flow-foreground/60">No tasks scheduled for this day</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TaskCalendarView;
