
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SolarpunkPanel } from '@/components/ui/design-system/SolarpunkPanel';
import { Activity, LineChart, BarChart3, ArrowRight, Info, Zap } from 'lucide-react';
import PageHeader from '@/components/ui/design-system/PageHeader';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import ThemedBackground from '@/components/ui/ThemedBackground';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import WorkflowPerformanceGrid from '@/components/performance/WorkflowPerformanceGrid';
import { useWorkflowPerformance } from '@/hooks/useWorkflowPerformance';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { GlassMorphism } from '@/components/ui/GlassMorphism';

const Performance: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [activeTab, setActiveTab] = useState<string>('workflows');
  const { workflows, loading } = useWorkflowPerformance(timeRange);
  
  const handleTimeRangeChange = (range: '1h' | '24h' | '7d' | '30d') => {
    setTimeRange(range);
  };
  
  return (
    <ThemedBackground>
      <Helmet>
        <title>Performance Monitoring | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 mt-20 px-4 sm:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <PageHeader 
            title="Performance"
            extendedTitle="Real-Time Monitoring"
            description="Track and optimize workflow efficiency with real-time feedback loops."
            icon={<Activity className="h-12 w-12 text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.8)]" />}
            variant="performance"
            glassEffect={true}
            actions={
              <div className="flex flex-wrap items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className={cn(
                    isDark 
                      ? "bg-teal-500/10 border-teal-500/50 hover:bg-teal-500/20 text-teal-500" 
                      : "bg-teal-100 border-teal-300 hover:bg-teal-200 text-teal-700"
                  )}
                >
                  <LineChart className="h-4 w-4 mr-2" />
                  Detailed Analytics
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className={cn(
                    isDark 
                      ? "bg-teal-500/10 border-teal-500/50 hover:bg-teal-500/20 text-teal-500" 
                      : "bg-teal-100 border-teal-300 hover:bg-teal-200 text-teal-700"
                  )}
                >
                  <Info className="h-4 w-4 mr-2" />
                  Performance Insights
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className={cn(
                    isDark 
                      ? "bg-teal-500/10 border-teal-500/50 hover:bg-teal-500/20 text-teal-500" 
                      : "bg-teal-100 border-teal-300 hover:bg-teal-200 text-teal-700"
                  )}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Optimization Actions
                </Button>
              </div>
            }
          />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className={cn(
              "w-full max-w-md grid grid-cols-2 mb-6",
              isDark 
                ? "bg-teal-900/20 border border-teal-700/30" 
                : "bg-white/80 border border-teal-200"
            )}>
              <TabsTrigger 
                value="workflows" 
                className={cn(
                  "flex items-center gap-2 py-2",
                  "data-[state=active]:bg-teal-500 data-[state=active]:text-white",
                  isDark 
                    ? "data-[state=inactive]:text-gray-300"
                    : "data-[state=inactive]:text-teal-800"
                )}
              >
                <Activity className="h-4 w-4" />
                <span>Workflow Performance</span>
              </TabsTrigger>
              <TabsTrigger 
                value="system" 
                className={cn(
                  "flex items-center gap-2 py-2",
                  "data-[state=active]:bg-teal-500 data-[state=active]:text-white",
                  isDark 
                    ? "data-[state=inactive]:text-gray-300"
                    : "data-[state=inactive]:text-teal-800"
                )}
              >
                <BarChart3 className="h-4 w-4" />
                <span>System Metrics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="workflows" className="space-y-6 mt-0">
              <SolarpunkPanel
                accentColor="teal"
                className={cn("p-5 md:p-8", 
                  isDark 
                    ? "" 
                    : "bg-gradient-to-br from-teal-50/70 via-white/90 to-teal-50/70"
                )}
              >
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-12 w-full rounded-xl" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-[250px] rounded-xl" />
                      ))}
                    </div>
                  </div>
                ) : (
                  <WorkflowPerformanceGrid 
                    workflows={workflows} 
                    timeRange={timeRange} 
                    onTimeRangeChange={handleTimeRangeChange}
                  />
                )}
              </SolarpunkPanel>
              
              <GlassMorphism intensity="low" className="p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-teal-400" />
                  About the Feedback Loop System
                </h3>
                <p className="text-sm text-muted-foreground">
                  This real-time feedback loop system continuously monitors workflow performance, displaying color-coded trend lines to indicate efficiency improvements. 
                  The system applies smoothing techniques like exponential moving averages (EMA) to calculate continuous trends in performance.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <div className="font-medium text-green-500 mb-1">Green Trend Lines</div>
                    <div className="text-sm">Indicate efficiency improvements and positive performance trends</div>
                  </div>
                  <div className="bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                    <div className="font-medium text-amber-500 mb-1">Amber Trend Lines</div>
                    <div className="text-sm">Indicate neutral or marginal changes in workflow efficiency</div>
                  </div>
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <div className="font-medium text-red-500 mb-1">Red Trend Lines</div>
                    <div className="text-sm">Indicate a decrease in efficiency or potential performance issues</div>
                  </div>
                </div>
              </GlassMorphism>
            </TabsContent>
            
            <TabsContent value="system" className="mt-0">
              <SolarpunkPanel
                accentColor="teal"
                className={cn("p-8 h-64 flex items-center justify-center", 
                  isDark 
                    ? "" 
                    : "bg-gradient-to-br from-teal-50/70 via-white/90 to-teal-50/70"
                )}
              >
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">System Metrics Coming Soon</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Advanced system metrics and resource utilization analytics will be available in the next update.
                  </p>
                </div>
              </SolarpunkPanel>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </ThemedBackground>
  );
};

export default Performance;
