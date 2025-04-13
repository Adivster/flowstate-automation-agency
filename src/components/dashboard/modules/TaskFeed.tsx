
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ClipboardList, ChevronRight, Check, Clock, AlertTriangle, XCircle, LayoutList, LayoutGrid as GridIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { getDivisionColorScheme } from '@/utils/colorSystem';

const TaskFeed: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
  const [activeTab, setActiveTab] = useState('in-progress');
  
  // Mock data for tasks
  const tasks = [
    { 
      id: 1, 
      title: 'Update knowledge base', 
      progress: 85, 
      status: 'in-progress',
      priority: 'high',
      agent: 'KB Manager',
      division: 'kb',
      eta: '1h 23m'
    },
    { 
      id: 2, 
      title: 'Generate analytics report', 
      progress: 60, 
      status: 'in-progress',
      priority: 'medium',
      agent: 'Data Analyst',
      division: 'analytics',
      eta: '3h 15m'
    },
    { 
      id: 3, 
      title: 'Monitor security alerts', 
      progress: 100, 
      status: 'completed',
      priority: 'high',
      agent: 'Security Officer',
      division: 'operations',
      eta: '0h 0m'
    },
    { 
      id: 4, 
      title: 'Resource optimization', 
      progress: 35, 
      status: 'in-progress',
      priority: 'low',
      agent: 'Resource Manager',
      division: 'operations',
      eta: '5h 30m'
    },
    { 
      id: 5, 
      title: 'API integration', 
      progress: 0, 
      status: 'failed',
      priority: 'medium',
      agent: 'Integration Agent',
      division: 'strategy',
      eta: 'Failed'
    },
    { 
      id: 6, 
      title: 'User engagement analysis', 
      progress: 0, 
      status: 'paused',
      priority: 'low',
      agent: 'User Agent',
      division: 'analytics',
      eta: 'Paused'
    }
  ];

  // Filter tasks based on active tab
  const filteredTasks = tasks.filter(task => task.status === activeTab);
  
  // Status icon mapping
  const statusIcon = {
    'in-progress': <Clock className="h-3.5 w-3.5 text-cyan-400" />,
    'completed': <Check className="h-3.5 w-3.5 text-green-400" />,
    'paused': <AlertTriangle className="h-3.5 w-3.5 text-yellow-400" />,
    'failed': <XCircle className="h-3.5 w-3.5 text-red-400" />
  };

  // Priority styles
  const priorityStyles = {
    high: 'bg-red-500/20 text-red-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    low: 'bg-green-500/20 text-green-400'
  };

  return (
    <Card className="p-4 border-flow-border/30 bg-black/30 backdrop-blur-md h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium neon-text-green flex items-center">
          <ClipboardList className="mr-2 h-5 w-5 text-green-400" />
          Task Feed
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex bg-black/40 rounded-md overflow-hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-7 w-7 ${viewMode === 'list' ? 'bg-flow-accent/20' : 'hover:bg-flow-background/10'}`}
              onClick={() => setViewMode('list')}
            >
              <LayoutList className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-7 w-7 ${viewMode === 'board' ? 'bg-flow-accent/20' : 'hover:bg-flow-background/10'}`}
              onClick={() => setViewMode('board')}
            >
              <GridIcon className="h-3.5 w-3.5" />
            </Button>
          </div>
          <motion.div whileHover={{ x: 3 }} transition={{ type: 'spring', stiffness: 400 }}>
            <a href="#" className="text-xs text-flow-foreground/70 hover:text-flow-accent flex items-center">
              View All <ChevronRight className="ml-1 h-3 w-3" />
            </a>
          </motion.div>
        </div>
      </div>
      
      <Tabs 
        defaultValue="in-progress"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-3"
      >
        <TabsList className="bg-black/40 p-0.5">
          <TabsTrigger 
            value="in-progress" 
            className="text-[10px] data-[state=active]:bg-flow-accent/20 py-1 px-2.5"
          >
            In Progress
          </TabsTrigger>
          <TabsTrigger 
            value="paused"
            className="text-[10px] data-[state=active]:bg-flow-accent/20 py-1 px-2.5"
          >
            Paused
          </TabsTrigger>
          <TabsTrigger 
            value="failed"
            className="text-[10px] data-[state=active]:bg-flow-accent/20 py-1 px-2.5"
          >
            Failed
          </TabsTrigger>
          <TabsTrigger 
            value="completed"
            className="text-[10px] data-[state=active]:bg-flow-accent/20 py-1 px-2.5"
          >
            Completed
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <ScrollArea className="h-[230px] pr-2">
        {filteredTasks.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-xs text-flow-foreground/50">No tasks in this category</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredTasks.map((task) => {
              const divisionColor = getDivisionColorScheme(task.division);
              const statusIconComponent = statusIcon[task.status];
              
              return (
                <motion.div
                  key={task.id}
                  className="bg-black/20 rounded-md p-3 cursor-pointer hover:bg-black/30 border border-flow-border/10 transition-colors"
                  whileHover={{ 
                    y: -2,
                    boxShadow: `0 4px 12px rgba(0,0,0,0.2), 0 0 0 1px ${divisionColor.border}50` 
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring' }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-grow">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${priorityStyles[task.priority]}`}>
                          {task.priority}
                        </span>
                        <span className="text-xs font-medium text-flow-foreground">{task.title}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-flow-foreground/70">
                        <div className="flex items-center gap-1">
                          <div style={{ color: divisionColor.text }}>{task.agent}</div>
                          <span className="text-flow-foreground/40">•</span>
                          <span>{task.eta}</span>
                        </div>
                        <div>{statusIconComponent}</div>
                      </div>
                      
                      {task.status === 'in-progress' && (
                        <div className="mt-2">
                          <div className="w-full bg-flow-border/10 h-1 rounded-full">
                            <motion.div 
                              className="h-1 rounded-full"
                              style={{ backgroundColor: divisionColor.primary }}
                              initial={{ width: 0 }}
                              animate={{ width: `${task.progress}%` }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                          <div className="text-right text-[9px] text-flow-foreground/50 mt-0.5">{task.progress}%</div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};

export default TaskFeed;
