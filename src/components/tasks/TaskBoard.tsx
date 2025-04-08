
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskList from './TaskList';
import TaskKanban from './TaskKanban';
import TaskFilters from './TaskFilters';
import TaskCreateButton from './TaskCreateButton';
import { useTaskStore } from '@/contexts/TaskContext';

const TaskBoard: React.FC = () => {
  const [view, setView] = useState<'list' | 'kanban'>('list');
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterDivision, setFilterDivision] = useState<string | null>(null);
  
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
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="list" onClick={() => setView('list')}>List View</TabsTrigger>
          <TabsTrigger value="kanban" onClick={() => setView('kanban')}>Board View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-4">
          <TaskList 
            priorityFilter={filterPriority}
            statusFilter={filterStatus}
            divisionFilter={filterDivision}
          />
        </TabsContent>
        
        <TabsContent value="kanban" className="mt-4">
          <TaskKanban 
            priorityFilter={filterPriority}
            statusFilter={filterStatus}
            divisionFilter={filterDivision}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskBoard;
