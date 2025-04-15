
import React, { createContext, useContext, useState } from 'react';

export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'completed' | 'paused' | 'failed';
export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignedTo?: string;
  division?: string;
  tags?: string[];
  progress?: number;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, newStatus: TaskStatus) => void;
  reorderTasks: (sourceIndex: number, destinationIndex: number, status: TaskStatus) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Demo tasks for initial state
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: '1', 
      title: 'Optimize AI workflow', 
      status: 'todo', 
      priority: 'high', 
      dueDate: '2025-04-30', 
      description: 'Improve the efficiency of our core AI workflow',
      progress: 0
    },
    { 
      id: '2', 
      title: 'Review agent performance', 
      status: 'in-progress', 
      priority: 'medium', 
      dueDate: '2025-04-25',
      progress: 45
    },
    { 
      id: '3', 
      title: 'Expand knowledge base', 
      status: 'review', 
      priority: 'low', 
      dueDate: '2025-04-22', 
      tags: ['content', 'documentation'],
      progress: 80
    },
    { 
      id: '4', 
      title: 'Update reporting dashboard', 
      status: 'completed', 
      priority: 'high', 
      dueDate: '2025-04-18', 
      assignedTo: 'AI Assistant',
      progress: 100
    },
    { 
      id: '5', 
      title: 'Research new ML models', 
      status: 'todo', 
      priority: 'medium', 
      dueDate: '2025-05-05', 
      tags: ['research', 'innovation'],
      progress: 0
    },
  ]);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      progress: task.progress ?? 0
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

  const moveTask = (id: string, newStatus: TaskStatus) => {
    setTasks(tasks.map(task => 
      task.id === id ? { 
        ...task, 
        status: newStatus,
        progress: newStatus === 'completed' ? 100 : 
                 newStatus === 'todo' ? 0 :
                 newStatus === 'in-progress' ? 50 :
                 newStatus === 'review' ? 80 : task.progress
      } : task
    ));
  };
  
  // New function to reorder tasks within a status column
  const reorderTasks = (sourceIndex: number, destinationIndex: number, status: TaskStatus) => {
    const filteredTasks = tasks.filter(task => task.status === status);
    const taskToMove = filteredTasks[sourceIndex];
    
    // Remove task from old position and insert into new position
    const newFilteredTasks = [...filteredTasks];
    newFilteredTasks.splice(sourceIndex, 1);
    newFilteredTasks.splice(destinationIndex, 0, taskToMove);
    
    // Replace tasks with same status with the reordered ones
    const newTasks = tasks.filter(task => task.status !== status).concat(newFilteredTasks);
    setTasks(newTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, moveTask, reorderTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

// This hook is what we'll use as 'useTaskStore' replacement
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

// For backward compatibility with any 'useTaskStore' references
export const useTaskStore = useTaskContext;

export default TaskContext;
