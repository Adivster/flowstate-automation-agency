
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SolarpunkPanel } from '@/components/ui/design-system/SolarpunkPanel';
import { Workflow, Zap, Play, Settings, Users, ActivitySquare, PlayCircle, PlusCircle, BarChart3, History } from 'lucide-react';
import PageHeader from '@/components/ui/design-system/PageHeader';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import ThemedBackground from '@/components/ui/ThemedBackground';
import WorkflowGrid from '@/components/workflows/WorkflowGrid';
import WorkflowPerformanceGrid from '@/components/performance/WorkflowPerformanceGrid';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useWorkflowPerformance } from '@/hooks/useWorkflowPerformance';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { CommandCenter } from '@/components/workflows/CommandCenter';
import TaskWorkflowPanel from '@/components/workflows/TaskWorkflowPanel';
import WorkflowVersionHistory from '@/components/workflows/WorkflowVersionHistory';

const Workflows: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('workflows');
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const { workflows, loading } = useWorkflowPerformance(timeRange);
  const [showCommandCenter, setShowCommandCenter] = useState(true);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [showWorkflowPanel, setShowWorkflowPanel] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [selectedVersionWorkflow, setSelectedVersionWorkflow] = useState<string | null>(null);
  
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
        <title>{t('workflows')} | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 mt-20 px-4 sm:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <PageHeader 
            title="Workflows"
            extendedTitle="Process Automation"
            description="Design, monitor, and optimize your automated task sequences."
            icon={<Workflow className="h-12 w-12 text-orange-400 drop-shadow-[0_0_15px_rgba(251,146,60,0.8)]" />}
            variant="workflows"
            glassEffect={true}
            actions={
              <div className="flex flex-wrap items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/20 text-orange-500 dark:text-orange-400"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Workflow
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/20 text-orange-500 dark:text-orange-400"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Run All
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/20 text-orange-500 dark:text-orange-400"
                  onClick={() => setShowCommandCenter(!showCommandCenter)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {showCommandCenter ? 'Hide' : 'Show'} Controls
                </Button>
              </div>
            }
          />
          
          <Tabs 
            defaultValue="workflows" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="mb-6"
          >
            <GlassMorphism intensity="low" className="rounded-lg p-1">
              <TabsList className={cn(
                "grid w-full grid-cols-2",
                isDark ? "bg-gray-900/50" : "bg-white/50"
              )}>
                <TabsTrigger value="workflows" className={cn(
                  isDark 
                    ? "data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-300" 
                    : "data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700"
                )}>
                  <Workflow className="h-4 w-4 mr-2" />
                  Workflow Library
                </TabsTrigger>
                <TabsTrigger value="performance" className={cn(
                  isDark 
                    ? "data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-300" 
                    : "data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700"
                )}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Performance Metrics
                </TabsTrigger>
              </TabsList>
            </GlassMorphism>
            
            <TabsContent value="workflows" className="mt-6">
              <SolarpunkPanel
                accentColor="orange"
                className={cn("p-5 md:p-8", 
                  isDark ? "" : "bg-gradient-to-br from-orange-50/70 via-white/90 to-orange-50/70"
                )}
              >
                <WorkflowGrid 
                  onSelectWorkflow={handleWorkflowSelect}
                  onViewVersionHistory={handleVersionHistoryOpen}
                />
              </SolarpunkPanel>
            </TabsContent>
            
            <TabsContent value="performance" className="mt-6">
              <SolarpunkPanel
                accentColor="orange"
                className={cn("p-5 md:p-8", 
                  isDark ? "" : "bg-gradient-to-br from-orange-50/70 via-white/90 to-orange-50/70"
                )}
              >
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className={cn(
                      "w-12 h-12 rounded-full border-4 border-t-transparent animate-spin",
                      isDark ? "border-orange-400" : "border-orange-500"
                    )}></div>
                  </div>
                ) : (
                  <WorkflowPerformanceGrid 
                    workflows={workflows} 
                    timeRange={timeRange}
                    onTimeRangeChange={setTimeRange}
                  />
                )}
              </SolarpunkPanel>
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

export default Workflows;
