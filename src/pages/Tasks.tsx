
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ClipboardList, Plus, Edit2, UserPlus, CheckSquare, Filter, CalendarDays, Search, Calendar } from 'lucide-react';
import PageHeader from '@/components/ui/design-system/PageHeader';
import TaskBoard from '@/components/tasks/TaskBoard';
import { useTheme } from 'next-themes';
import ThemedBackground from '@/components/ui/ThemedBackground';
import { TaskProvider } from '@/contexts/TaskContext';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { SolarpunkPanel } from '@/components/ui/design-system/SolarpunkPanel';
import { QuickActionButton } from '@/components/ui/quick-action-button';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskCalendarView from '@/components/tasks/TaskCalendarView';

const Tasks: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'board' | 'calendar'>('board');
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [divisionFilter, setDivisionFilter] = useState<string | null>(null);
  
  return (
    <ThemedBackground>
      <Helmet>
        <title>{t('tasks')} | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1 mt-20 px-4 sm:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <PageHeader 
            title="Tasks"
            extendedTitle="Task Manager"
            description="Manage and execute your daily operations with ease."
            icon={<ClipboardList className="h-12 w-12 text-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />}
            variant="tasks"
            glassEffect={true}
            actions={
              <div className="flex flex-wrap items-center gap-2">
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
                
                <QuickActionButton
                  icon={<CheckSquare className="h-4 w-4" />}
                  label="Mark Complete"
                  variant="tasks"
                />
              </div>
            }
          />
          
          <SolarpunkPanel
            accentColor="coral"
            className="p-5 md:p-8"
          >
            {/* Task Filter Bar */}
            <div className="flex flex-wrap justify-between gap-4 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <div className={cn(
                  "flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border min-w-[250px]",
                  isDark ? 'bg-flow-background/30 border-flow-border/50' : 'bg-white/70 border-red-200'
                )}>
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search tasks..." 
                    className="bg-transparent border-none outline-none w-full text-sm placeholder:text-muted-foreground/70"
                  />
                </div>
                
                <Button variant="outline" size="sm" className={cn(
                  isDark ? 'border-flow-border/50 bg-flow-background/30' : 'border-red-200 bg-white/70'
                )}>
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                
                <Button variant="outline" size="sm" className={cn(
                  isDark ? 'border-flow-border/50 bg-flow-background/30' : 'border-red-200 bg-white/70'
                )}>
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Due Date
                </Button>
              </div>
              
              <div>
                <Tabs 
                  defaultValue="board" 
                  value={viewMode}
                  onValueChange={(val) => setViewMode(val as 'board' | 'calendar')}
                  className="w-auto"
                >
                  <TabsList className={cn(
                    "border",
                    isDark ? 'bg-flow-background/30 border-flow-border/50' : 'bg-white/80 border-red-200/50'
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
              {viewMode === 'board' ? (
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
        </div>
      </main>
      
      <Footer />
    </ThemedBackground>
  );
};

export default Tasks;
