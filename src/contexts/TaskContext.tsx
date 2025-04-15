
import React, { createContext, useContext, useState } from 'react';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate: string;
  assignedTo?: string;
  tags?: string[];
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, newStatus: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Demo tasks for initial state
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Optimize AI workflow', status: 'todo', priority: 'high', dueDate: '2025-04-30', description: 'Improve the efficiency of our core AI workflow' },
    { id: '2', title: 'Review agent performance', status: 'in-progress', priority: 'medium', dueDate: '2025-04-25' },
    { id: '3', title: 'Expand knowledge base', status: 'review', priority: 'low', dueDate: '2025-04-22', tags: ['content', 'documentation'] },
    { id: '4', title: 'Update reporting dashboard', status: 'completed', priority: 'high', dueDate: '2025-04-18', assignedTo: 'AI Assistant' },
    { id: '5', title: 'Research new ML models', status: 'todo', priority: 'medium', dueDate: '2025-05-05', tags: ['research', 'innovation'] },
  ]);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updatedFields: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedFields } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const moveTask = (id: string, newStatus: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, moveTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export default TaskContext;
