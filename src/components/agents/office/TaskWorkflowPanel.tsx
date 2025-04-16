
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, MoreHorizontal, PlusCircle, X, ChevronRight, CheckCircle, AlertCircle, BarChart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTaskContext } from '@/contexts/TaskContext';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import MiniSparkline from './MiniSparkline';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from "@/components/ui/progress";

interface TaskWorkflowPanelProps {
  selectedDivision: string | null;
  onClose: () => void;
}

const TaskWorkflowPanel: React.FC<TaskWorkflowPanelProps> = ({ 
  selectedDivision,
  onClose
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { tasks } = useTaskContext();
  const [activeTab, setActiveTab] = useState('tasks');
  const panelRef = useRef<HTMLDivElement>(null);
  
  // Filter tasks by selected division if applicable
  const filteredTasks = selectedDivision 
    ? tasks.filter(task => task.division === selectedDivision) 
    : tasks;

  // Group tasks by status
  const todoTasks = filteredTasks.filter(task => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'in-progress');
  const reviewTasks = filteredTasks.filter(task => task.status === 'review');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');

  // Mock workflows for demo
  const workflows = [
    {
      id: 'wf1',
      name: 'Data Processing Pipeline',
      description: 'Optimize the data processing workflow for better efficiency',
      status: 'active',
      progress: 65,
      divisionId: 'analytics',
      steps: [
        { id: 's1', name: 'Data Collection', status: 'completed', order: 1 },
        { id: 's2', name: 'Data Cleaning', status: 'in-progress', order: 2 },
        { id: 's3', name: 'Analysis', status: 'pending', order: 3 },
        { id: 's4', name: 'Reporting', status: 'pending', order: 4 }
      ]
    },
    {
      id: 'wf2',
      name: 'Knowledge Base Update',
      description: 'Update internal knowledge repository with new articles',
      status: 'active',
      progress: 30,
      divisionId: 'kb',
      steps: [
        { id: 's5', name: 'Content Collection', status: 'completed', order: 1 },
        { id: 's6', name: 'Review', status: 'in-progress', order: 2 },
        { id: 's7', name: 'Publishing', status: 'pending', order: 3 }
      ]
    },
    {
      id: 'wf3',
      name: 'Strategic Planning',
      description: 'Q3 planning for department objectives',
      status: 'active',
      progress: 40,
      divisionId: 'strategy',
      steps: [
        { id: 's8', name: 'Data Gathering', status: 'completed', order: 1 },
        { id: 's9', name: 'Analysis', status: 'in-progress', order: 2 },
        { id: 's10', name: 'Review', status: 'pending', order: 3 },
        { id: 's11', name: 'Finalization', status: 'pending', order: 4 }
      ]
    }
  ];

  // Filter workflows by selected division if applicable
  const filteredWorkflows = selectedDivision 
    ? workflows.filter(workflow => workflow.divisionId === selectedDivision) 
    : workflows;

  // Handle click outside to close panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={panelRef}
      className={cn(
        "absolute right-4 top-4 w-96 rounded-xl shadow-lg z-50 overflow-hidden",
        isDark 
          ? "bg-gray-900/95 border border-purple-500/30 backdrop-blur-md"
          : "bg-white/95 border border-emerald-300/50 backdrop-blur-md"
      )}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      {/* Header */}
      <div className={cn(
        "px-4 py-3 flex items-center justify-between border-b",
        isDark ? "border-gray-700" : "border-gray-200"
      )}>
        <div className="flex items-center">
          <Clock className={cn(
            "h-5 w-5 mr-2", 
            isDark ? "text-purple-400" : "text-emerald-600"
          )} />
          <h3 className={cn(
            "font-medium",
            isDark ? "text-white" : "text-gray-800"
          )}>
            {selectedDivision ? `${selectedDivision.toUpperCase()} Tasks & Workflows` : 'All Tasks & Workflows'}
          </h3>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className={cn(
            "h-7 w-7",
            isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
          )}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="tasks" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-4 pt-4">
          <TabsList className={cn(
            "w-full grid grid-cols-2",
            isDark 
              ? "bg-gray-800/50" 
              : "bg-gray-100"
          )}>
            <TabsTrigger value="tasks" className={cn(
              isDark
                ? "data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
                : "data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700"
            )}>
              Tasks
            </TabsTrigger>
            <TabsTrigger value="workflows" className={cn(
              isDark
                ? "data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300"
                : "data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700"
            )}>
              Workflows
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="tasks" className="p-4 pt-5">
          {/* Task Content */}
          <div className="space-y-6 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {/* Add Task Button */}
            <div className="flex justify-between mb-4">
              <h4 className={cn(
                "text-sm font-medium",
                isDark ? "text-gray-300" : "text-gray-700"
              )}>
                {filteredTasks.length} Tasks {selectedDivision ? `in ${selectedDivision}` : 'Total'}
              </h4>
              <Button 
                size="sm" 
                className={cn(
                  "h-7 text-xs flex items-center gap-1",
                  isDark 
                    ? "bg-purple-600 hover:bg-purple-700" 
                    : "bg-emerald-600 hover:bg-emerald-700"
                )}
              >
                <PlusCircle className="h-3.5 w-3.5" />
                Add Task
              </Button>
            </div>
            
            {/* In Progress Tasks */}
            <div className="space-y-2">
              <h5 className={cn(
                "text-xs font-medium flex items-center",
                isDark ? "text-purple-300" : "text-emerald-700"
              )}>
                <Clock className="h-3.5 w-3.5 mr-1" /> 
                IN PROGRESS ({inProgressTasks.length})
              </h5>
              {inProgressTasks.map(task => (
                <div 
                  key={task.id}
                  className={cn(
                    "p-3 rounded-lg",
                    isDark 
                      ? "bg-gray-800/70 hover:bg-gray-800/90" 
                      : "bg-white hover:bg-gray-50 shadow-sm"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h6 className={cn(
                        "font-medium mb-1",
                        isDark ? "text-gray-200" : "text-gray-800"
                      )}>
                        {task.title}
                      </h6>
                      <div className="flex items-center text-xs gap-2">
                        <Badge variant={isDark ? "outline" : "secondary"} className="text-[10px] h-4">
                          {task.priority}
                        </Badge>
                        <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <MoreHorizontal className={cn(
                      "h-5 w-5 cursor-pointer",
                      isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600" 
                    )} />
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className={isDark ? "text-gray-400" : "text-gray-500"}>Progress</span>
                      <span className={isDark ? "text-purple-300" : "text-emerald-600"}>
                        {task.progress || 0}%
                      </span>
                    </div>
                    <Progress 
                      value={task.progress || 0} 
                      className={cn(
                        "h-1.5", 
                        isDark ? "bg-gray-700" : "bg-gray-100"
                      )}
                      indicatorClassName={
                        isDark ? "bg-purple-500" : "bg-emerald-500"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Todo Tasks */}
            <div className="space-y-2">
              <h5 className={cn(
                "text-xs font-medium flex items-center",
                isDark ? "text-gray-300" : "text-gray-600"
              )}>
                <ChevronRight className="h-3.5 w-3.5 mr-1" /> 
                TO DO ({todoTasks.length})
              </h5>
              {todoTasks.map(task => (
                <div 
                  key={task.id}
                  className={cn(
                    "p-3 rounded-lg",
                    isDark 
                      ? "bg-gray-800/50 hover:bg-gray-800/70" 
                      : "bg-white/80 hover:bg-gray-50 shadow-sm"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h6 className={cn(
                        "font-medium mb-1",
                        isDark ? "text-gray-300" : "text-gray-700"
                      )}>
                        {task.title}
                      </h6>
                      <div className="flex items-center text-xs gap-2">
                        <Badge variant={isDark ? "outline" : "secondary"} className="text-[10px] h-4">
                          {task.priority}
                        </Badge>
                        <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <MoreHorizontal className={cn(
                      "h-5 w-5 cursor-pointer",
                      isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600" 
                    )} />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Review Tasks */}
            <div className="space-y-2">
              <h5 className={cn(
                "text-xs font-medium flex items-center",
                isDark ? "text-amber-300" : "text-amber-700"
              )}>
                <AlertCircle className="h-3.5 w-3.5 mr-1" /> 
                IN REVIEW ({reviewTasks.length})
              </h5>
              {reviewTasks.map(task => (
                <div 
                  key={task.id}
                  className={cn(
                    "p-3 rounded-lg",
                    isDark 
                      ? "bg-gray-800/70 hover:bg-gray-800/90 border border-amber-500/20" 
                      : "bg-amber-50/30 hover:bg-amber-50/50 shadow-sm"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h6 className={cn(
                        "font-medium mb-1",
                        isDark ? "text-gray-200" : "text-gray-800"
                      )}>
                        {task.title}
                      </h6>
                      <div className="flex items-center text-xs gap-2">
                        <Badge variant={isDark ? "outline" : "secondary"} className="text-[10px] h-4">
                          {task.priority}
                        </Badge>
                        <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <MoreHorizontal className={cn(
                      "h-5 w-5 cursor-pointer",
                      isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600" 
                    )} />
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className={isDark ? "text-gray-400" : "text-gray-500"}>Progress</span>
                      <span className={isDark ? "text-amber-300" : "text-amber-600"}>
                        {task.progress || 0}%
                      </span>
                    </div>
                    <Progress 
                      value={task.progress || 0} 
                      className={cn(
                        "h-1.5", 
                        isDark ? "bg-gray-700" : "bg-gray-100"
                      )}
                      indicatorClassName={
                        isDark ? "bg-amber-500" : "bg-amber-500"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Completed Tasks */}
            <div className="space-y-2">
              <h5 className={cn(
                "text-xs font-medium flex items-center",
                isDark ? "text-green-300" : "text-green-700"
              )}>
                <CheckCircle className="h-3.5 w-3.5 mr-1" /> 
                COMPLETED ({completedTasks.length})
              </h5>
              {completedTasks.map(task => (
                <div 
                  key={task.id}
                  className={cn(
                    "p-3 rounded-lg",
                    isDark 
                      ? "bg-gray-800/50 hover:bg-gray-800/70 border border-green-500/20" 
                      : "bg-green-50/30 hover:bg-green-50/50 shadow-sm"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h6 className={cn(
                        "font-medium mb-1",
                        isDark ? "text-gray-300" : "text-gray-700"
                      )}>
                        {task.title}
                      </h6>
                      <div className="flex items-center text-xs gap-2">
                        <Badge variant={isDark ? "outline" : "secondary"} className="text-[10px] h-4">
                          {task.priority}
                        </Badge>
                        <CheckCircle2 className={cn(
                          "h-3.5 w-3.5 ml-1",
                          isDark ? "text-green-400" : "text-green-600"
                        )} />
                      </div>
                    </div>
                    <MoreHorizontal className={cn(
                      "h-5 w-5 cursor-pointer",
                      isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600" 
                    )} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="workflows" className="p-4 pt-5">
          {/* Workflow Content */}
          <div className="space-y-6 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex justify-between mb-4">
              <h4 className={cn(
                "text-sm font-medium",
                isDark ? "text-gray-300" : "text-gray-700"
              )}>
                {filteredWorkflows.length} Active Workflows
              </h4>
              <Button 
                size="sm" 
                className={cn(
                  "h-7 text-xs flex items-center gap-1",
                  isDark 
                    ? "bg-purple-600 hover:bg-purple-700" 
                    : "bg-emerald-600 hover:bg-emerald-700"
                )}
              >
                <PlusCircle className="h-3.5 w-3.5" />
                Create Workflow
              </Button>
            </div>
            
            {/* Active Workflows */}
            <div className="space-y-4">
              {filteredWorkflows.map(workflow => (
                <div 
                  key={workflow.id}
                  className={cn(
                    "p-4 rounded-lg",
                    isDark 
                      ? "bg-gray-800/70 hover:bg-gray-800/90 border border-purple-500/20"
                      : "bg-white hover:bg-gray-50 shadow-sm border border-emerald-100"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h5 className={cn(
                        "font-medium",
                        isDark ? "text-gray-200" : "text-gray-800"
                      )}>
                        {workflow.name}
                      </h5>
                      <p className={cn(
                        "text-xs",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )}>
                        {workflow.description}
                      </p>
                    </div>
                    <Badge 
                      className={cn(
                        "text-[10px]",
                        workflow.status === 'active' 
                          ? isDark ? "bg-purple-500/30 text-purple-300" : "bg-emerald-100 text-emerald-700"
                          : isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                      )}
                    >
                      {workflow.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="mt-3 mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className={isDark ? "text-gray-400" : "text-gray-500"}>Progress</span>
                      <span className={isDark ? "text-purple-300" : "text-emerald-600"}>
                        {workflow.progress}%
                      </span>
                    </div>
                    <Progress 
                      value={workflow.progress} 
                      className={cn(
                        "h-1.5", 
                        isDark ? "bg-gray-700" : "bg-gray-100"
                      )}
                      indicatorClassName={
                        isDark ? "bg-purple-500" : "bg-emerald-500"
                      }
                    />
                  </div>
                  
                  {/* Workflow Steps */}
                  <div className="mt-4">
                    <div className={cn(
                      "text-xs font-medium mb-2",
                      isDark ? "text-gray-300" : "text-gray-700"
                    )}>
                      Steps:
                    </div>
                    <div className="space-y-1.5">
                      {workflow.steps.map((step, index) => (
                        <div 
                          key={step.id} 
                          className={cn(
                            "flex items-center text-xs p-1.5 rounded-md",
                            step.status === 'completed' 
                              ? isDark ? "bg-green-500/10" : "bg-green-50" 
                              : step.status === 'in-progress'
                                ? isDark ? "bg-purple-500/10" : "bg-blue-50"
                                : isDark ? "bg-gray-700/50" : "bg-gray-50"
                          )}
                        >
                          {step.status === 'completed' ? (
                            <CheckCircle2 className={cn(
                              "h-3.5 w-3.5 mr-1.5", 
                              isDark ? "text-green-400" : "text-green-500"
                            )} />
                          ) : step.status === 'in-progress' ? (
                            <Clock className={cn(
                              "h-3.5 w-3.5 mr-1.5",
                              isDark ? "text-purple-400" : "text-blue-500"
                            )} />
                          ) : (
                            <div className={cn(
                              "h-3.5 w-3.5 mr-1.5 rounded-full border flex items-center justify-center",
                              isDark ? "border-gray-500" : "border-gray-400"
                            )}>
                              <span className="text-[8px]">{index + 1}</span>
                            </div>
                          )}
                          <span className={cn(
                            step.status === 'completed'
                              ? isDark ? "text-green-300" : "text-green-700"
                              : step.status === 'in-progress'
                                ? isDark ? "text-purple-300" : "text-blue-700"
                                : isDark ? "text-gray-400" : "text-gray-500"
                          )}>
                            {step.name}
                          </span>
                          
                          {index < workflow.steps.length - 1 && (
                            <ArrowRight className="h-3 w-3 mx-1 text-gray-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={cn(
                        "h-7 text-xs",
                        isDark 
                          ? "border-gray-700 hover:bg-gray-800" 
                          : "border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      <BarChart className="h-3.5 w-3.5 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default TaskWorkflowPanel;
