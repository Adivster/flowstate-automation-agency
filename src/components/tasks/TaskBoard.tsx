import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { SolarpunkPanel } from '@/components/ui/design-system/SolarpunkPanel';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, CheckSquare, AlertCircle, CalendarDays, CheckCircle2, CircleDashed, CircleDot } from 'lucide-react';
import { useTaskContext } from '@/contexts/TaskContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const TaskBoard = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { tasks, moveTask } = useTaskContext();
  const [viewType, setViewType] = useState<'kanban' | 'list'>('kanban');

  // Task status types
  const statuses = [
    { id: 'todo', label: 'To Do', icon: <CircleDashed className="h-4 w-4" /> },
    { id: 'in-progress', label: 'In Progress', icon: <CircleDot className="h-4 w-4" /> },
    { id: 'review', label: 'Review', icon: <AlertCircle className="h-4 w-4" /> },
    { id: 'completed', label: 'Completed', icon: <CheckCircle2 className="h-4 w-4" /> }
  ];

  // Get priority style
  const getPriorityStyle = (priority: string) => {
    switch(priority) {
      case 'high':
        return isDark ? 'bg-red-500/20 text-red-500' : 'bg-red-100 text-red-700';
      case 'medium':
        return isDark ? 'bg-amber-500/20 text-amber-500' : 'bg-amber-100 text-amber-700';
      case 'low':
        return isDark ? 'bg-blue-500/20 text-blue-500' : 'bg-blue-100 text-blue-700';
      default:
        return isDark ? 'bg-gray-500/20 text-gray-500' : 'bg-gray-100 text-gray-700';
    }
  };
  
  // Handle drag end
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    // Return if dropped outside a droppable area
    if (!destination) return;
    
    // Return if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    // Move the task to the new status
    moveTask(draggableId, destination.droppableId as TaskStatus);
  };
  
  // Render the Kanban board view
  const renderKanbanView = () => (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {statuses.map((status) => (
          <div key={status.id} className="flex flex-col h-full">
            <div className={cn(
              "flex items-center gap-2 mb-3 px-2 font-medium",
              isDark ? 'text-flow-foreground/80' : 'text-emerald-700'
            )}>
              {status.icon}
              <span>{status.label}</span>
              <span className="ml-auto bg-white/10 px-2 py-0.5 rounded text-xs">
                {tasks.filter(t => t.status === status.id).length}
              </span>
            </div>
            
            <Droppable droppableId={status.id}>
              {(provided, snapshot) => (
                <SolarpunkPanel 
                  accentColor="coral"
                  className={cn(
                    "h-full min-h-[300px] p-2",
                    snapshot.isDraggingOver ? (isDark ? "bg-flow-accent/5" : "bg-red-50") : ""
                  )}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="flex flex-col gap-2">
                    {tasks
                      .filter(task => task.status === status.id)
                      .map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="touch-none"
                            >
                              <motion.div
                                initial={false}
                                animate={snapshot.isDragging ? { scale: 1.02, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" } : { scale: 1 }}
                              >
                                <SolarpunkPanel 
                                  interactive 
                                  accentColor="default"
                                  className="p-3 border-solid border"
                                  elevated={snapshot.isDragging}
                                >
                                  <h3 className="font-medium">{task.title}</h3>
                                  {task.description && (
                                    <p className="text-sm mt-1 text-muted-foreground line-clamp-2">{task.description}</p>
                                  )}
                                  <div className="flex items-center justify-between text-xs mt-2 text-muted-foreground">
                                    <span className={cn("px-2 py-0.5 rounded", getPriorityStyle(task.priority))}>
                                      {task.priority}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <CalendarDays className="h-3 w-3" />
                                      {task.dueDate}
                                    </span>
                                  </div>
                                </SolarpunkPanel>
                              </motion.div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                </SolarpunkPanel>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );

  // Render the list view
  const renderListView = () => (
    <SolarpunkPanel className="mt-4 overflow-hidden" accentColor="coral">
      <div className="divide-y divide-border">
        <div className={cn(
          "grid grid-cols-12 gap-2 p-3 font-medium text-sm",
          isDark ? 'bg-flow-background/20' : 'bg-emerald-50/50'
        )}>
          <div className="col-span-6">Task</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Priority</div>
          <div className="col-span-2">Due Date</div>
        </div>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="task-list" direction="vertical">
            {(provided) => (
              <div 
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={cn(
                          "grid grid-cols-12 gap-2 p-3 transition-colors touch-none",
                          snapshot.isDragging 
                            ? (isDark ? "bg-flow-background/50" : "bg-red-50/80") 
                            : "hover:bg-black/5"
                        )}
                      >
                        <div className="col-span-6">{task.title}</div>
                        <div className="col-span-2 flex items-center gap-1">
                          {statuses.find(s => s.id === task.status)?.icon}
                          <span className="text-sm">{statuses.find(s => s.id === task.status)?.label}</span>
                        </div>
                        <div className="col-span-2">
                          <span className={cn("px-2 py-0.5 text-xs rounded", getPriorityStyle(task.priority))}>
                            {task.priority}
                          </span>
                        </div>
                        <div className="col-span-2 flex items-center gap-1 text-sm">
                          <CalendarDays className="h-3 w-3" />
                          {task.dueDate}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </SolarpunkPanel>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className={cn(
          "text-xl font-medium",
          isDark ? 'text-flow-foreground' : 'text-emerald-800'
        )}>
          Task Dashboard
        </h2>
        
        <Tabs 
          defaultValue="kanban"
          value={viewType} 
          onValueChange={(value) => setViewType(value as 'kanban' | 'list')}
          className="w-auto"
        >
          <TabsList className={cn(
            "border",
            isDark ? 'bg-flow-background/30 border-flow-border/50' : 'bg-white/80 border-red-200/50'
          )}>
            <TabsTrigger value="kanban">
              <CheckSquare className="h-4 w-4 mr-2" />
              Kanban
            </TabsTrigger>
            <TabsTrigger value="list">
              <Clock className="h-4 w-4 mr-2" />
              List
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {viewType === 'kanban' ? renderKanbanView() : renderListView()}
    </div>
  );
};

export default TaskBoard;
