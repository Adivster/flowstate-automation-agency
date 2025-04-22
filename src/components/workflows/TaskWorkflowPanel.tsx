
import React, { useState } from 'react';
import { SolarpunkPanel } from '@/components/ui/design-system/SolarpunkPanel';
import { ArrowRight, CheckCircle2, Clock, Settings, AlertCircle, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TaskWorkflowPanelProps {
  onClose: () => void;
  workflowId: string;
}

const TaskWorkflowPanel: React.FC<TaskWorkflowPanelProps> = ({
  onClose,
  workflowId
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'tasks' | 'steps'>('steps');
  
  // Mock data - in a real app this would be fetched based on the workflowId
  const workflow = {
    id: workflowId,
    name: 'Data Processing Pipeline',
    progress: 65,
    steps: [
      { id: 's1', name: 'Data Collection', status: 'completed', order: 1 },
      { id: 's2', name: 'Data Cleaning', status: 'in-progress', order: 2 },
      { id: 's3', name: 'Analysis', status: 'pending', order: 3 },
      { id: 's4', name: 'Reporting', status: 'pending', order: 4 }
    ],
    tasks: [
      { id: 't1', title: 'Collect API Data', status: 'completed', assignee: 'AI Agent 1', priority: 'high', progress: 100 },
      { id: 't2', title: 'Clean Input Dataset', status: 'in-progress', assignee: 'AI Agent 2', priority: 'medium', progress: 60 },
      { id: 't3', title: 'Run Statistical Analysis', status: 'pending', assignee: 'AI Agent 3', priority: 'medium', progress: 0 },
      { id: 't4', title: 'Generate Reports', status: 'pending', assignee: 'AI Agent 4', priority: 'low', progress: 0 }
    ]
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-3xl"
    >
      <SolarpunkPanel accentColor="orange" className="rounded-t-xl overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className={cn(
                "text-lg font-semibold flex items-center",
                isDark ? "text-orange-400" : "text-orange-600"
              )}>
                <Settings className="h-5 w-5 mr-2" />
                {workflow.name}
              </h2>
              <p className="text-sm text-muted-foreground">Workflow execution details and tasks</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div>
                <span className="text-xs text-muted-foreground mr-2">Progress</span>
                <span className={cn(
                  "text-sm font-medium",
                  isDark ? "text-orange-400" : "text-orange-600"
                )}>{workflow.progress}%</span>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex border-b mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              className={cn(
                "rounded-none border-b-2 mr-2",
                activeTab === 'steps' 
                  ? isDark 
                    ? "border-orange-400 text-orange-400" 
                    : "border-orange-600 text-orange-600" 
                  : "border-transparent"
              )}
              onClick={() => setActiveTab('steps')}
            >
              Execution Steps
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className={cn(
                "rounded-none border-b-2",
                activeTab === 'tasks' 
                  ? isDark 
                    ? "border-orange-400 text-orange-400" 
                    : "border-orange-600 text-orange-600" 
                  : "border-transparent"
              )}
              onClick={() => setActiveTab('tasks')}
            >
              Related Tasks
            </Button>
          </div>
          
          {activeTab === 'steps' && (
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-4">
                {workflow.steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className={cn(
                      "flex items-center justify-center rounded-full p-2",
                      step.status === 'completed'
                        ? isDark ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-600"
                        : step.status === 'in-progress'
                          ? isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"
                          : isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"
                    )}>
                      {step.status === 'completed' ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : step.status === 'in-progress' ? (
                        <Clock className="h-4 w-4" />
                      ) : (
                        <span className="text-xs font-medium w-4 h-4 flex items-center justify-center">{step.order}</span>
                      )}
                    </div>
                    {index < workflow.steps.length - 1 && (
                      <ArrowRight className={cn(
                        "h-4 w-4",
                        isDark ? "text-gray-600" : "text-gray-400"
                      )} />
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              <div className="space-y-3">
                {workflow.steps.map((step) => (
                  <div 
                    key={step.id}
                    className={cn(
                      "p-3 rounded-lg",
                      step.status === 'completed'
                        ? isDark ? "bg-green-900/10 border border-green-500/20" : "bg-green-50"
                        : step.status === 'in-progress'
                          ? isDark ? "bg-blue-900/10 border border-blue-500/20" : "bg-blue-50"
                          : isDark ? "bg-gray-800/50" : "bg-gray-50"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {step.status === 'completed' ? (
                          <CheckCircle2 className={cn(
                            "h-4 w-4 mr-2",
                            isDark ? "text-green-400" : "text-green-500"
                          )} />
                        ) : step.status === 'in-progress' ? (
                          <Clock className={cn(
                            "h-4 w-4 mr-2",
                            isDark ? "text-blue-400" : "text-blue-500"
                          )} />
                        ) : (
                          <AlertCircle className={cn(
                            "h-4 w-4 mr-2",
                            isDark ? "text-gray-400" : "text-gray-500"
                          )} />
                        )}
                        <div>
                          <p className="font-medium text-sm">{step.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{step.status}</p>
                        </div>
                      </div>
                      
                      <Badge 
                        variant={
                          step.status === 'completed' 
                            ? 'success' 
                            : step.status === 'in-progress' 
                              ? 'default' 
                              : 'outline'
                        }
                        className="capitalize"
                      >
                        {step.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'tasks' && (
            <div className="space-y-3 mb-4">
              {workflow.tasks.map((task) => (
                <div 
                  key={task.id}
                  className={cn(
                    "p-3 rounded-lg",
                    isDark 
                      ? "bg-gray-800/50 hover:bg-gray-800/70" 
                      : "bg-white hover:bg-gray-50 border border-gray-100"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h6 className="font-medium text-sm">{task.title}</h6>
                      <div className="flex items-center text-xs gap-2 mt-1">
                        <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'outline'} className="text-[10px]">
                          {task.priority}
                        </Badge>
                        <span className="text-muted-foreground">
                          {task.assignee}
                        </span>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        task.status === 'completed' 
                          ? 'success' 
                          : task.status === 'in-progress' 
                            ? 'default' 
                            : 'outline'
                      }
                      className="capitalize"
                    >
                      {task.status}
                    </Badge>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className={
                        task.status === 'completed'
                          ? isDark ? "text-green-400" : "text-green-600"
                          : task.status === 'in-progress'
                            ? isDark ? "text-blue-400" : "text-blue-600"
                            : "text-muted-foreground"
                      }>
                        {task.progress}%
                      </span>
                    </div>
                    <Progress 
                      value={task.progress} 
                      className={cn(
                        "h-1.5",
                        isDark ? "bg-gray-700" : "bg-gray-100"
                      )}
                      indicatorClassName={
                        task.status === 'completed'
                          ? isDark ? "bg-green-500" : "bg-green-500"
                          : isDark ? "bg-orange-500" : "bg-orange-500"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex justify-end">
            <Button 
              size="sm"
              className={cn(
                isDark 
                  ? "bg-orange-500 hover:bg-orange-600" 
                  : "bg-orange-500 hover:bg-orange-600"
              )}
            >
              {workflow.progress < 100 ? 'Run Next Step' : 'View Results'}
            </Button>
          </div>
        </div>
      </SolarpunkPanel>
    </motion.div>
  );
};

export default TaskWorkflowPanel;
