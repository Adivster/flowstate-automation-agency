
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SolarpunkPanel } from '@/components/ui/design-system/SolarpunkPanel';
import { 
  ClipboardList, Workflow, Plus, Edit2, UserPlus, CheckSquare, Filter,
  CalendarDays, Search, Calendar, Play, Settings, ActivitySquare,
  PlusCircle, BarChart3, History, Zap, ArrowDownUp, Tag
} from 'lucide-react';
import PageHeader from '@/components/ui/design-system/PageHeader';
import TaskBoard from '@/components/tasks/TaskBoard';
import { useTheme } from 'next-themes';
import ThemedBackground from '@/components/ui/ThemedBackground';
import { TaskProvider } from '@/contexts/TaskContext';
import { Button } from '@/components/ui/button';
import { Helmet as HelmetAsync } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskCalendarView from '@/components/tasks/TaskCalendarView';
import WorkflowGrid from '@/components/workflows/WorkflowGrid';
import WorkflowPerformanceGrid from '@/components/performance/WorkflowPerformanceGrid';
import { useWorkflowPerformance } from '@/hooks/useWorkflowPerformance';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { CommandCenter } from '@/components/workflows/CommandCenter';
import TaskWorkflowPanel from '@/components/workflows/TaskWorkflowPanel';
import WorkflowVersionHistory from '@/components/workflows/WorkflowVersionHistory';
import { QuickActionButton } from '@/components/ui/quick-action-button';

const TasksAndFlows: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { t } = useLanguage();
  
  // Tasks state
  const [taskViewMode, setTaskViewMode] = useState<'board' | 'calendar'>('board');
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [divisionFilter, setDivisionFilter] = useState<string | null>(null);
  
  // Workflows state
  const [workflowTab, setWorkflowTab] = useState('workflows');
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const { workflows, loading } = useWorkflowPerformance(timeRange);
  const [showCommandCenter, setShowCommandCenter] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [showWorkflowPanel, setShowWorkflowPanel] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [selectedVersionWorkflow, setSelectedVersionWorkflow] = useState<string | null>(null);
  
  // Main tabs state
  const [activeMainTab, setActiveMainTab] = useState<'tasks' | 'workflows'>('tasks');
  
  const handleWorkflowSelect = (workflowId: string) => {
    setSelectedWorkflow(workflowId);
    setShowWorkflowPanel(true);
  };
  
  const handleVersionHistoryOpen = (workflowId: string) => {
    setSelectedVersionWorkflow(workflowId);
    setShowVersionHistory(true);
  };
  
  return (
    <ThemedBackground>
      <Helmet>
        <title>Tasks & Flows | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 mt-20 px-4 sm:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <PageHeader 
            title="Tasks & Flows"
            extendedTitle="Process Management"
            description="Manage, automate, and optimize your tasks and workflow processes."
            icon={<ClipboardList className="h-12 w-12 text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.8)]" />}
            variant="tasks"
            glassEffect={true}
            actions={
              <div className="flex flex-wrap items-center gap-2">
                {activeMainTab === 'tasks' && (
                  <>
                    <QuickActionButton
                      icon={<Plus className="h-4 w-4" />}
                      label="Add Task"
                      variant="tasks"
                    />
                    
                    <QuickActionButton
                      icon={<Edit2 className="h-4 w-4" />}
                      label="Bulk Edit"
                      variant="tasks"
                    />
                    
                    <QuickActionButton
                      icon={<UserPlus className="h-4 w-4" />}
                      label="Reassign"
                      variant="tasks"
                    />
                  </>
                )}

                {activeMainTab === 'workflows' && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-indigo-500/10 border-indigo-500/50 hover:bg-indigo-500/20 text-indigo-500 dark:text-indigo-400"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      New Workflow
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-indigo-500/10 border-indigo-500/50 hover:bg-indigo-500/20 text-indigo-500 dark:text-indigo-400"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Run All
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-indigo-500/10 border-indigo-500/50 hover:bg-indigo-500/20 text-indigo-500 dark:text-indigo-400"
                      onClick={() => setShowCommandCenter(!showCommandCenter)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {showCommandCenter ? 'Hide' : 'Show'} Controls
                    </Button>
                  </>
                )}
              </div>
            }
          />
          
          <Tabs 
            defaultValue="tasks" 
            value={activeMainTab} 
            onValueChange={(value) => setActiveMainTab(value as 'tasks' | 'workflows')}
            className="mb-6"
          >
            <GlassMorphism intensity="low" className="rounded-lg p-1">
              <TabsList className={cn(
                "grid w-full grid-cols-2",
                isDark ? "bg-gray-900/50" : "bg-white/50"
              )}>
                <TabsTrigger value="tasks" className={cn(
                  isDark 
                    ? "data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300" 
                    : "data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
                )}>
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Task Manager
                </TabsTrigger>
                <TabsTrigger value="workflows" className={cn(
                  isDark 
                    ? "data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300" 
                    : "data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
                )}>
                  <Workflow className="h-4 w-4 mr-2" />
                  Workflow Library
                </TabsTrigger>
              </TabsList>
            </GlassMorphism>
            
            <TabsContent value="tasks" className="mt-6">
              <SolarpunkPanel
                accentColor="indigo"
                className="p-5 md:p-8"
              >
                {/* Task Filter Bar */}
                <div className="flex flex-wrap justify-between gap-4 mb-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className={cn(
                      "flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border min-w-[250px]",
                      isDark ? 'bg-flow-background/30 border-flow-border/50' : 'bg-white/70 border-indigo-200'
                    )}>
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <input 
                        type="text" 
                        placeholder="Search tasks..." 
                        className="bg-transparent border-none outline-none w-full text-sm placeholder:text-muted-foreground/70"
                      />
                    </div>
                    
                    <Button variant="outline" size="sm" className={cn(
                      isDark ? 'border-flow-border/50 bg-flow-background/30' : 'border-indigo-200 bg-white/70'
                    )}>
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                    
                    <Button variant="outline" size="sm" className={cn(
                      isDark ? 'border-flow-border/50 bg-flow-background/30' : 'border-indigo-200 bg-white/70'
                    )}>
                      <CalendarDays className="h-4 w-4 mr-2" />
                      Due Date
                    </Button>
                  </div>
                  
                  <div>
                    <Tabs 
                      defaultValue="board" 
                      value={taskViewMode}
                      onValueChange={(val) => setTaskViewMode(val as 'board' | 'calendar')}
                      className="w-auto"
                    >
                      <TabsList className={cn(
                        "border",
                        isDark ? 'bg-flow-background/30 border-flow-border/50' : 'bg-white/80 border-indigo-200/50'
                      )}>
                        <TabsTrigger value="board">
                          <ClipboardList className="h-4 w-4 mr-2" />
                          Board
                        </TabsTrigger>
                        <TabsTrigger value="calendar">
                          <Calendar className="h-4 w-4 mr-2" />
                          Calendar
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
                
                {/* Task Board or Calendar View */}
                <TaskProvider>
                  {taskViewMode === 'board' ? (
                    <TaskBoard />
                  ) : (
                    <TaskCalendarView 
                      priorityFilter={priorityFilter}
                      statusFilter={statusFilter}
                      divisionFilter={divisionFilter}
                    />
                  )}
                </TaskProvider>
              </SolarpunkPanel>
            </TabsContent>
            
            <TabsContent value="workflows" className="mt-6">
              <Tabs 
                defaultValue="workflows" 
                value={workflowTab} 
                onValueChange={setWorkflowTab}
                className="mb-6"
              >
                <GlassMorphism intensity="low" className="rounded-lg p-1">
                  <TabsList className={cn(
                    "grid w-full grid-cols-2",
                    isDark ? "bg-gray-900/50" : "bg-white/50"
                  )}>
                    <TabsTrigger value="workflows" className={cn(
                      isDark 
                        ? "data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300" 
                        : "data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
                    )}>
                      <Workflow className="h-4 w-4 mr-2" />
                      Workflow Library
                    </TabsTrigger>
                    <TabsTrigger value="performance" className={cn(
                      isDark 
                        ? "data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300" 
                        : "data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
                    )}>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Performance Metrics
                    </TabsTrigger>
                  </TabsList>
                </GlassMorphism>
                
                <SolarpunkPanel
                  accentColor="indigo"
                  className={cn("p-5 md:p-8", 
                    isDark ? "" : "bg-gradient-to-br from-indigo-50/70 via-white/90 to-indigo-50/70"
                  )}
                >
                  {workflowTab === 'workflows' ? (
                    <WorkflowGrid 
                      onSelectWorkflow={handleWorkflowSelect}
                      onViewVersionHistory={handleVersionHistoryOpen}
                    />
                  ) : (
                    loading ? (
                      <div className="flex items-center justify-center h-64">
                        <div className={cn(
                          "w-12 h-12 rounded-full border-4 border-t-transparent animate-spin",
                          isDark ? "border-indigo-400" : "border-indigo-500"
                        )}></div>
                      </div>
                    ) : (
                      <WorkflowPerformanceGrid 
                        workflows={workflows} 
                        timeRange={timeRange}
                        onTimeRangeChange={setTimeRange}
                      />
                    )
                  )}
                </SolarpunkPanel>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {showCommandCenter && (
        <CommandCenter 
          workflowCount={workflows.length}
          activeWorkflowCount={workflows.filter(w => w.trend === 'up').length}
          systemStatus="healthy"
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />
      )}
      
      {showWorkflowPanel && selectedWorkflow && (
        <TaskWorkflowPanel
          onClose={() => setShowWorkflowPanel(false)}
          workflowId={selectedWorkflow}
        />
      )}
      
      {showVersionHistory && selectedVersionWorkflow && (
        <WorkflowVersionHistory
          workflowId={selectedVersionWorkflow}
          onClose={() => setShowVersionHistory(false)}
        />
      )}
      
      <Footer />
    </ThemedBackground>
  );
};

export default TasksAndFlows;
