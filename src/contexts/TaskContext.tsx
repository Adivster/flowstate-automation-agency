
import React, { createContext, useContext, useState, useEffect } from 'react';

// Task Types
export type TaskStatus = 'completed' | 'in-progress' | 'paused' | 'failed';
export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  progress: number;
  createdAt: string;
  updatedAt: string;
  priority: TaskPriority;
  assignedTo: string;
  division: string;
  dueDate?: string;
  tags?: string[];
  attachments?: { name: string; url: string }[];
  subtasks?: { id: string; title: string; completed: boolean }[];
  comments?: { id: string; author: string; text: string; timestamp: string }[];
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    // Sample task data - same as what was in TaskManagement component but with expanded properties
    {
      id: 'task-1',
      title: 'Data Analysis for Client XYZ',
      description: 'Analyze customer behavior patterns and generate insights',
      status: 'in-progress',
      progress: 65,
      createdAt: '2023-06-15T10:30:00Z',
      updatedAt: '2023-06-16T08:45:00Z',
      priority: 'high',
      assignedTo: 'Data Analyst',
      division: 'research',
      dueDate: '2023-06-20T00:00:00Z',
      tags: ['analysis', 'client-xyz', 'priority'],
      subtasks: [
        { id: 'st-1-1', title: 'Data collection', completed: true },
        { id: 'st-1-2', title: 'Initial analysis', completed: true },
        { id: 'st-1-3', title: 'Generate report', completed: false },
      ],
      comments: [
        { id: 'c-1-1', author: 'Project Manager', text: 'Please prioritize the demographic insights', timestamp: '2023-06-16T08:30:00Z' }
      ]
    },
    {
      id: 'task-2',
      title: 'Security Protocol Update',
      description: 'Implement new security protocols across all client systems',
      status: 'paused',
      progress: 30,
      createdAt: '2023-06-14T14:20:00Z',
      updatedAt: '2023-06-15T16:10:00Z',
      priority: 'high',
      assignedTo: 'Security Lead',
      division: 'compliance',
      dueDate: '2023-06-25T00:00:00Z',
      tags: ['security', 'protocol', 'update'],
      subtasks: [
        { id: 'st-2-1', title: 'Review current protocols', completed: true },
        { id: 'st-2-2', title: 'Develop updates', completed: false },
        { id: 'st-2-3', title: 'Test implementation', completed: false },
      ]
    },
    {
      id: 'task-3',
      title: 'API Integration for Client ABC',
      description: 'Connect client systems with third-party services via API',
      status: 'completed',
      progress: 100,
      createdAt: '2023-06-13T09:15:00Z',
      updatedAt: '2023-06-14T11:30:00Z',
      priority: 'medium',
      assignedTo: 'Senior Dev',
      division: 'development',
      dueDate: '2023-06-18T00:00:00Z',
      tags: ['api', 'integration', 'client-abc'],
    },
    {
      id: 'task-4',
      title: 'Workflow Automation Setup',
      description: 'Develop automated workflows for routine client tasks',
      status: 'failed',
      progress: 45,
      createdAt: '2023-06-12T13:40:00Z',
      updatedAt: '2023-06-13T15:20:00Z',
      priority: 'medium',
      assignedTo: 'AI Engineer',
      division: 'development',
      dueDate: '2023-06-19T00:00:00Z',
    },
    {
      id: 'task-5',
      title: 'Knowledge Base Update',
      description: 'Update client knowledge base with latest procedures',
      status: 'in-progress',
      progress: 80,
      createdAt: '2023-06-11T10:10:00Z',
      updatedAt: '2023-06-12T14:30:00Z',
      priority: 'low',
      assignedTo: 'Research Lead',
      division: 'knowledge',
      dueDate: '2023-06-22T00:00:00Z',
    },
    {
      id: 'task-6',
      title: 'Quarterly Performance Review',
      description: 'Complete performance evaluations for all team members',
      status: 'in-progress',
      progress: 20,
      createdAt: '2023-06-10T09:00:00Z',
      updatedAt: '2023-06-10T15:45:00Z',
      priority: 'medium',
      assignedTo: 'Team Lead',
      division: 'management',
      dueDate: '2023-06-23T00:00:00Z',
    }
  ]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() } 
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getTaskById = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, getTaskById }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskStore = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskStore must be used within a TaskProvider');
  }
  return context;
};
