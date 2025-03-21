
import React from 'react';
import { Check, Clock, AlertCircle, Play, Pause, X, RotateCcw, Filter } from 'lucide-react';
import { TransitionWrapper } from '../ui/TransitionWrapper';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { cn } from '@/lib/utils';

// Task Types
type TaskStatus = 'completed' | 'in-progress' | 'paused' | 'failed';
type TaskPriority = 'high' | 'medium' | 'low';

interface Task {
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
}

const TaskManagement: React.FC = () => {
  // Sample task data
  const tasks: Task[] = [
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
    }
  ];

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'paused':
        return <Pause className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: TaskPriority) => {
    const classes = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    };
    
    return (
      <span className={cn("px-2 py-1 text-xs rounded-full", classes[priority])}>
        {priority}
      </span>
    );
  };

  const TaskActionButtons = ({ status }: { status: TaskStatus }) => {
    return (
      <div className="flex gap-2">
        {status !== 'completed' && status !== 'failed' && (
          <>
            {status === 'paused' ? (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Play className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Pause className="h-4 w-4" />
              </Button>
            )}
          </>
        )}
        
        {status === 'failed' && (
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}
        
        {status !== 'completed' && (
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium">Task Management</h3>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <TransitionWrapper key={task.id} delay={50 * index}>
                <div className="border rounded-lg p-4 bg-flow-card/50 space-y-3 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <h4 className="font-medium">{task.title}</h4>
                      </div>
                      <p className="text-sm text-flow-foreground/70">{task.description}</p>
                    </div>
                    {getPriorityBadge(task.priority)}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span>Progress</span>
                      <span>{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} 
                      className={cn(
                        "h-2", 
                        task.status === 'failed' ? "bg-red-200" : "bg-flow-muted",
                        task.status === 'completed' ? "bg-green-200" : ""
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <div className="text-xs text-flow-foreground/70">
                      Assigned to: <span className="font-medium">{task.assignedTo}</span>
                    </div>
                    <TaskActionButtons status={task.status} />
                  </div>
                </div>
              </TransitionWrapper>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="in-progress" className="mt-4">
          <div className="space-y-4">
            {tasks
              .filter(task => task.status === 'in-progress')
              .map((task, index) => (
                <TransitionWrapper key={task.id} delay={50 * index}>
                  <div className="border rounded-lg p-4 bg-flow-card/50 space-y-3 hover:shadow-md transition-all">
                    {/* Same task card structure as in "all" tab */}
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(task.status)}
                          <h4 className="font-medium">{task.title}</h4>
                        </div>
                        <p className="text-sm text-flow-foreground/70">{task.description}</p>
                      </div>
                      {getPriorityBadge(task.priority)}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2 bg-flow-muted" />
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <div className="text-xs text-flow-foreground/70">
                        Assigned to: <span className="font-medium">{task.assignedTo}</span>
                      </div>
                      <TaskActionButtons status={task.status} />
                    </div>
                  </div>
                </TransitionWrapper>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <div className="space-y-4">
            {tasks
              .filter(task => task.status === 'completed')
              .map((task, index) => (
                <TransitionWrapper key={task.id} delay={50 * index}>
                  <div className="border rounded-lg p-4 bg-flow-card/50 space-y-3 hover:shadow-md transition-all">
                    {/* Same task card structure as in "all" tab */}
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(task.status)}
                          <h4 className="font-medium">{task.title}</h4>
                        </div>
                        <p className="text-sm text-flow-foreground/70">{task.description}</p>
                      </div>
                      {getPriorityBadge(task.priority)}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2 bg-green-200" />
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <div className="text-xs text-flow-foreground/70">
                        Assigned to: <span className="font-medium">{task.assignedTo}</span>
                      </div>
                      <div className="text-xs text-green-500 font-medium">
                        Completed
                      </div>
                    </div>
                  </div>
                </TransitionWrapper>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="issues" className="mt-4">
          <div className="space-y-4">
            {tasks
              .filter(task => task.status === 'failed' || task.status === 'paused')
              .map((task, index) => (
                <TransitionWrapper key={task.id} delay={50 * index}>
                  <div className="border rounded-lg p-4 bg-flow-card/50 space-y-3 hover:shadow-md transition-all">
                    {/* Same task card structure as in "all" tab */}
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(task.status)}
                          <h4 className="font-medium">{task.title}</h4>
                        </div>
                        <p className="text-sm text-flow-foreground/70">{task.description}</p>
                      </div>
                      {getPriorityBadge(task.priority)}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <Progress 
                        value={task.progress} 
                        className={`h-2 ${task.status === 'failed' ? 'bg-red-200' : 'bg-yellow-200'}`} 
                      />
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <div className="text-xs text-flow-foreground/70">
                        Assigned to: <span className="font-medium">{task.assignedTo}</span>
                      </div>
                      <TaskActionButtons status={task.status} />
                    </div>
                  </div>
                </TransitionWrapper>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskManagement;
