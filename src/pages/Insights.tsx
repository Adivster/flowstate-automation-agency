
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ThemedBackground from '@/components/ui/ThemedBackground';
import PageHeader from '@/components/ui/design-system/PageHeader';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  LightbulbIcon, 
  Filter, 
  FileOutput, 
  Brain, 
  TrendingUp, 
  BadgeDollarSign,
  FileSpreadsheet,
  LineChart,
  UserPlus,
  Settings2,
  LinkIcon,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from 'next-themes';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import HeadlineMetrics from '@/components/analytics/HeadlineMetrics';
import TimeRangeSelector from '@/components/analytics/TimeRangeSelector';
import PerformanceOverview from '@/components/analytics/PerformanceOverview';
import CampaignPerformance from '@/components/analytics/CampaignPerformance';
import CustomerRetention from '@/components/analytics/CustomerRetention';
import AIInsights from '@/components/analytics/AIInsights';
import EngagementDashboard from '@/components/analytics/EngagementDashboard';
import ExportOptions from '@/components/analytics/ExportOptions';
import AIRecommendation from '@/components/analytics/AIRecommendation';
import { useKpiData } from '@/hooks/useKpiData';
import FinancialOverview from '@/features/business/FinancialOverview';
import CRMIntegration from '@/features/business/CRMIntegration';
import BudgetManagement from '@/features/business/BudgetManagement';
import ApiSynchronization from '@/features/business/ApiSynchronization';
import ERPDashboard from '@/features/business/ERPDashboard';
import CallCenterDashboard from '@/features/business/CallCenterDashboard';
import InventoryDashboard from '@/features/business/InventoryDashboard';
import BusinessModules from '@/features/business/BusinessModules';

const Insights: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [timeRange, setTimeRange] = useState<string>('7d');
  const kpiData = useKpiData(timeRange);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  
  // Tabs state
  const [activeMainTab, setActiveMainTab] = useState<'analytics' | 'business'>('analytics');
  const [businessTab, setBusinessTab] = useState("overview");
  
  // Cross-platform links state
  const [showCrossPlatformLinks, setShowCrossPlatformLinks] = useState(true);
  
  // Cross-platform navigation links to improve cohesion
  const crossPlatformLinks = [
    { title: 'Dashboard', path: '/', icon: LightbulbIcon, description: 'Return to main dashboard' },
    { title: 'Tasks & Flows', path: '/tasks-flows', icon: LineChart, description: 'View task and workflow management' },
    { title: 'Agents', path: '/agents', icon: UserPlus, description: 'Manage your agent workforce' },
    { title: 'Knowledge', path: '/knowledge', icon: Brain, description: 'Access knowledge base' },
  ];
  
  const handleAIAssistantToggle = () => {
    setShowAIAssistant(!showAIAssistant);
    if (!showAIAssistant) {
      toast({
        title: "AI Assistant Activated",
        description: "Your personal insights assistant is now active and will provide real-time analysis.",
      });
    }
  };
  
  return (
    <ThemedBackground>
      <Helmet>
        <title>Insights | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 mt-20 px-4 sm:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <PageHeader 
            title="Insights"
            extendedTitle="Business Intelligence"
            description="Analyze performance, identify opportunities, and make data-driven decisions."
            icon={<LightbulbIcon className="h-12 w-12 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" />}
            variant="analytics"
            glassEffect={true}
            actions={
              <div className="flex flex-wrap items-center gap-2">
                {activeMainTab === 'analytics' && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-yellow-500/10 border-yellow-500/50 hover:bg-yellow-500/20 text-yellow-500 dark:text-yellow-400"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filter Data
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-yellow-500/10 border-yellow-500/50 hover:bg-yellow-500/20 text-yellow-500 dark:text-yellow-400"
                    >
                      <FileOutput className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-yellow-500/10 border-yellow-500/50 hover:bg-yellow-500/20 text-yellow-500 dark:text-yellow-400"
                      onClick={() => handleAIAssistantToggle()}
                    >
                      <Brain className="h-4 w-4 mr-2" />
                      {showAIAssistant ? 'AI Assistant Active' : 'Activate AI Assistant'}
                    </Button>
                  </>
                )}
                
                {activeMainTab === 'business' && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-yellow-500/10 border-yellow-500/50 hover:bg-yellow-500/20 text-yellow-500 dark:text-yellow-400"
                      onClick={() => setBusinessTab('budget')}
                    >
                      <BadgeDollarSign className="h-4 w-4 mr-2" />
                      View Budget
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-yellow-500/10 border-yellow-500/50 hover:bg-yellow-500/20 text-yellow-500 dark:text-yellow-400"
                    >
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Revenue Report
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-yellow-500/10 border-yellow-500/50 hover:bg-yellow-500/20 text-yellow-500 dark:text-yellow-400"
                    >
                      <LineChart className="h-4 w-4 mr-2" />
                      Analyze ROI
                    </Button>
                  </>
                )}
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowCrossPlatformLinks(!showCrossPlatformLinks)}
                        className="bg-yellow-500/10 border-yellow-500/50 hover:bg-yellow-500/20 text-yellow-500 dark:text-yellow-400"
                      >
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Quick Nav
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-xs">Navigate to related areas</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
              </div>
            }
          />
          
          <AnimatePresence>
            {showCrossPlatformLinks && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <GlassMorphism className="border border-flow-border/30 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-flow-accent">Cross-Platform Navigation</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 w-7 p-0" 
                      onClick={() => setShowCrossPlatformLinks(false)}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {crossPlatformLinks.map((link, i) => (
                      <Link key={i} to={link.path}>
                        <Card className="bg-flow-background/20 border-flow-border/30 hover:bg-flow-background/40 hover:border-flow-accent/50 transition-all duration-200">
                          <div className="flex items-center p-3">
                            <div className="p-2 rounded-full bg-flow-accent/10 mr-3">
                              <link.icon className="h-4 w-4 text-flow-accent" />
                            </div>
                            <div>
                              <div className="text-xs font-medium">{link.title}</div>
                              <div className="text-[10px] text-flow-foreground/60">{link.description}</div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </GlassMorphism>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* AI Assistant Top Recommendation */}
          {showAIAssistant && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <AIRecommendation
                title="Insights Summary"
                description="Based on this week's data, your conversion rate is trending upward (+8%) but customer acquisition cost has increased (+12%). Consider optimizing your ad spend allocation."
                impact="Optimizing your budget allocation could reduce acquisition costs by an estimated 15% while maintaining current growth."
                confidence={91}
                actions={[
                  { 
                    label: "View Recommendations", 
                    onClick: () => toast({
                      title: "Budget Optimization Recommendations",
                      description: "Our AI has analyzed your data and prepared personalized recommendations.",
                    })
                  },
                  {
                    label: "Run What-If Analysis",
                    link: "/insights/what-if"
                  }
                ]}
                className="mb-6 animate-fade-in hover-scale"
              />
            </motion.div>
          )}
          
          <Tabs 
            defaultValue="analytics" 
            value={activeMainTab} 
            onValueChange={(value) => setActiveMainTab(value as 'analytics' | 'business')}
            className="mb-6"
          >
            <GlassMorphism intensity="low" className="rounded-lg p-1">
              <TabsList className={cn(
                "grid w-full grid-cols-2",
                isDark ? "bg-gray-900/50" : "bg-white/50"
              )}>
                <TabsTrigger value="analytics" className={cn(
                  isDark 
                    ? "data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300" 
                    : "data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-700"
                )}>
                  <LineChart className="h-4 w-4 mr-2" />
                  Performance Analytics
                </TabsTrigger>
                <TabsTrigger value="business" className={cn(
                  isDark 
                    ? "data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300" 
                    : "data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-700"
                )}>
                  <BadgeDollarSign className="h-4 w-4 mr-2" />
                  Business Intelligence
                </TabsTrigger>
              </TabsList>
            </GlassMorphism>
            
            <TabsContent value="analytics" className="mt-6 space-y-6">
              <section>
                <HeadlineMetrics data={kpiData} />
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <GlassMorphism 
                  className="p-4 lg:col-span-1 xl:col-span-1 h-[400px] hover-scale"
                  variant="accent"
                  hoverEffect={true}
                >
                  <PerformanceOverview data={kpiData} timeRange={timeRange} />
                </GlassMorphism>

                <GlassMorphism 
                  className="p-4 lg:col-span-1 xl:col-span-1 h-[400px] hover-scale"
                  variant="accent"
                  hoverEffect={true}
                >
                  <CampaignPerformance data={kpiData} timeRange={timeRange} />
                </GlassMorphism>

                <GlassMorphism 
                  className="p-4 lg:col-span-1 xl:col-span-1 h-[400px] hover-scale"
                  variant="accent"
                  hoverEffect={true}
                >
                  <CustomerRetention data={kpiData} timeRange={timeRange} />
                </GlassMorphism>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <GlassMorphism 
                  className="p-4 lg:col-span-1 xl:col-span-1 h-[400px] hover-scale scan-lines"
                  variant="accent"
                  hoverEffect={true}
                >
                  <AIInsights data={kpiData} timeRange={timeRange} />
                </GlassMorphism>

                <GlassMorphism 
                  className="p-4 lg:col-span-1 xl:col-span-1 h-[400px] hover-scale"
                  variant="accent"
                  hoverEffect={true}
                >
                  <EngagementDashboard data={kpiData} timeRange={timeRange} />
                </GlassMorphism>

                <GlassMorphism 
                  className="p-4 lg:col-span-1 xl:col-span-1 h-[400px] hover-scale"
                  variant="accent"
                  hoverEffect={true}
                >
                  <ExportOptions data={kpiData} timeRange={timeRange} />
                </GlassMorphism>
              </div>
            </TabsContent>
            
            <TabsContent value="business" className="mt-6">
              <GlassMorphism className="border border-flow-border/30 rounded-2xl overflow-hidden hover-scale">
                <Tabs value={businessTab} onValueChange={setBusinessTab} className="p-6">
                  <TabsList className="grid max-w-md grid-cols-7 mb-6 bg-flow-background/30 gap-1">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-flow-accent data-[state=active]:text-white">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="budget" className="data-[state=active]:bg-flow-accent data-[state=active]:text-white">
                      Budget
                    </TabsTrigger>
                    <TabsTrigger value="crm" className="data-[state=active]:bg-flow-accent data-[state=active]:text-white">
                      CRM
                    </TabsTrigger>
                    <TabsTrigger value="erp" className="data-[state=active]:bg-flow-accent data-[state=active]:text-white">
                      ERP
                    </TabsTrigger>
                    <TabsTrigger value="call-center" className="data-[state=active]:bg-flow-accent data-[state=active]:text-white">
                      Call Center
                    </TabsTrigger>
                    <TabsTrigger value="inventory" className="data-[state=active]:bg-flow-accent data-[state=active]:text-white">
                      Inventory
                    </TabsTrigger>
                    <TabsTrigger value="api" className="data-[state=active]:bg-flow-accent data-[state=active]:text-white">
                      API Sync
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
                    <FinancialOverview timeRange={timeRange} />
                    <BusinessModules />
                  </TabsContent>
                  
                  <TabsContent value="budget" className="space-y-6">
                    <BudgetManagement />
                  </TabsContent>
                  
                  <TabsContent value="crm" className="space-y-6">
                    <CRMIntegration />
                  </TabsContent>
                  
                  <TabsContent value="erp" className="space-y-6">
                    <ERPDashboard />
                  </TabsContent>
                  
                  <TabsContent value="call-center" className="space-y-6">
                    <CallCenterDashboard />
                  </TabsContent>
                  
                  <TabsContent value="inventory" className="space-y-6">
                    <InventoryDashboard />
                  </TabsContent>
                  
                  <TabsContent value="api" className="space-y-6">
                    <ApiSynchronization />
                  </TabsContent>
                </Tabs>
              </GlassMorphism>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </ThemedBackground>
  );
};

export default Insights;
