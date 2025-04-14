
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskList from './TaskList';
import TaskKanban from './TaskKanban';
import TaskFilters from './TaskFilters';
import TaskCreateButton from './TaskCreateButton';
import { useTaskStore } from '@/contexts/TaskContext';
import { Calendar, List, Kanban, LayoutGrid } from 'lucide-react';
import { Card } from '@/components/ui/card';
import TaskCalendarView from './TaskCalendarView';
import TaskSummary from './TaskSummary';

const TaskBoard: React.FC = () => {
  const [view, setView] = useState<'list' | 'kanban' | 'calendar' | 'grid'>('list');
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterDivision, setFilterDivision] = useState<string | null>(null);
  const { tasks } = useTaskStore();
  
  const handleFilterChange = (type: 'priority' | 'status' | 'division', value: string | null) => {
    if (type === 'priority') setFilterPriority(value);
    if (type === 'status') setFilterStatus(value);
    if (type === 'division') setFilterDivision(value);
  };

  const clearFilters = () => {
    setFilterPriority(null);
    setFilterStatus(null);
    setFilterDivision(null);
  };

  // Count tasks by status for summary
  const taskCounts = {
    total: tasks.length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    paused: tasks.filter(t => t.status === 'paused').length,
    failed: tasks.filter(t => t.status === 'failed').length,
    dueToday: tasks.filter(t => {
      if (!t.dueDate) return false;
      const today = new Date();
      const dueDate = new Date(t.dueDate);
      return (
        dueDate.getDate() === today.getDate() &&
        dueDate.getMonth() === today.getMonth() &&
        dueDate.getFullYear() === today.getFullYear()
      );
    }).length
  };
  
  return (
    <div className="space-y-6">
      {/* Task Summary Cards */}
      <TaskSummary taskCounts={taskCounts} />
      
      <Card className="p-5 border-flow-border/30 bg-flow-card/50 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-xl font-medium">Task Management</h3>
          <div className="flex gap-2">
            <TaskFilters 
              onFilterChange={handleFilterChange}
              clearFilters={clearFilters}
              selectedPriority={filterPriority}
              selectedStatus={filterStatus}
              selectedDivision={filterDivision}
            />
            <TaskCreateButton />
          </div>
        </div>
        
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4 mb-6">
            <TabsTrigger 
              value="list" 
              onClick={() => setView('list')}
              className="flex items-center gap-2"
            >
              <List className="h-4 w-4" /> List
            </TabsTrigger>
            <TabsTrigger 
              value="kanban" 
              onClick={() => setView('kanban')}
              className="flex items-center gap-2"
            >
              <Kanban className="h-4 w-4" /> Board
            </TabsTrigger>
            <TabsTrigger 
              value="calendar" 
              onClick={() => setView('calendar')}
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" /> Calendar
            </TabsTrigger>
            <TabsTrigger 
              value="grid" 
              onClick={() => setView('grid')}
              className="flex items-center gap-2"
            >
              <LayoutGrid className="h-4 w-4" /> Grid
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-4 animate-fade-in">
            <TaskList 
              priorityFilter={filterPriority}
              statusFilter={filterStatus}
              divisionFilter={filterDivision}
            />
          </TabsContent>
          
          <TabsContent value="kanban" className="mt-4 animate-fade-in">
            <TaskKanban 
              priorityFilter={filterPriority}
              statusFilter={filterStatus}
              divisionFilter={filterDivision}
            />
          </TabsContent>
          
          <TabsContent value="calendar" className="mt-4 animate-fade-in">
            <TaskCalendarView
              priorityFilter={filterPriority}
              statusFilter={filterStatus}
              divisionFilter={filterDivision}
            />
          </TabsContent>
          
          <TabsContent value="grid" className="mt-4 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <TaskList 
                priorityFilter={filterPriority}
                statusFilter={filterStatus}
                divisionFilter={filterDivision}
                isGridView={true}
              />
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default TaskBoard;
