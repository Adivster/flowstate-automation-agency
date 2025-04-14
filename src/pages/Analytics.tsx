
import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart3, LineChart, PieChart, LayoutDashboard, Settings, ArrowUpRight, ArrowDownRight, Calendar, Filter, Download, AlertTriangle, BellRing, Zap, Share2, TrendingUp, ArrowRight, MessageSquareText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useKpiData } from '@/hooks/useKpiData';
import { AreaChart, LineChart as LineChart2, PieChart as PieChart2 } from '@/components/ui/chart';
import { motion } from 'framer-motion';
import GlassMorphism from '@/components/ui/GlassMorphism';
import PageHeader from '@/components/ui/design-system/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AiInsight {
  id: string;
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  category: string;
  recommendation?: string;
  createdAt: string;
  isNew?: boolean;
}

const Analytics = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loaded, setLoaded] = useState(false);
  const [timePeriod, setTimePeriod] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');
  const [showInsightsPanel, setShowInsightsPanel] = useState(false);
  const [expandedChart, setExpandedChart] = useState<{title: string, data: any[], color: string} | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [comparePeriod, setComparePeriod] = useState('previous');
  const kpiData = useKpiData(timePeriod);
  
  // AI Insights mock data
  const [aiInsights, setAiInsights] = useState<AiInsight[]>([
    {
      id: '1',
      title: 'Conversion rate increasing',
      description: 'Your conversion rate has increased by 8% compared to last period.',
      impact: 'positive',
      category: 'conversion',
      recommendation: 'Continue optimizing your landing pages with similar design patterns.',
      createdAt: '2025-04-14T09:30:00Z',
      isNew: true
    },
    {
      id: '2',
      title: 'Traffic anomaly detected',
      description: 'Unusual spike in traffic from social media sources on Wednesday.',
      impact: 'neutral',
      category: 'traffic',
      recommendation: 'Investigate which campaign caused this spike and consider replicating the strategy.',
      createdAt: '2025-04-13T16:45:00Z',
      isNew: true
    },
    {
      id: '3',
      title: 'Customer satisfaction dropping',
      description: 'Customer satisfaction scores decreased by 5% in the enterprise segment.',
      impact: 'negative',
      category: 'satisfaction',
      recommendation: 'Review recent customer feedback and schedule follow-up calls with key accounts.',
      createdAt: '2025-04-12T11:20:00Z'
    },
    {
      id: '4',
      title: 'Email campaign outperforming',
      description: 'Tuesday newsletter showing 32% higher open rates than average.',
      impact: 'positive',
      category: 'campaigns',
      recommendation: 'Analyze subject line patterns and sending time for optimization.',
      createdAt: '2025-04-11T08:15:00Z'
    },
    {
      id: '5',
      title: 'Resource allocation opportunity',
      description: 'Social media campaigns are generating 3x more leads than PPC with similar budget.',
      impact: 'positive',
      category: 'budget',
      recommendation: 'Consider reallocating 20% of PPC budget to top-performing social campaigns.',
      createdAt: '2025-04-10T14:30:00Z'
    }
  ]);
  
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 200);
  }, []);
  
  const handleExportData = useCallback(() => {
    toast({
      title: "Exporting Data",
      description: "Your analytics report is being generated and will download shortly.",
      duration: 3000,
    });
  }, [toast]);
  
  const handleExpandChart = useCallback((title: string, data: any[], color: string) => {
    setExpandedChart({ title, data, color });
  }, []);
  
  const handleInsightAction = useCallback((insight: AiInsight) => {
    setAiInsights(prev => 
      prev.map(item => item.id === insight.id ? {...item, isNew: false} : item)
    );
    
    toast({
      title: "Implementing Recommendation",
      description: `Action taken on: ${insight.title}`,
      duration: 3000,
    });
  }, [toast]);
  
  // Placeholder function for sharing
  const handleShare = useCallback(() => {
    toast({
      title: "Share Analytics",
      description: "Sharing options dialog would appear here.",
      duration: 3000,
    });
  }, [toast]);
  
  if (!loaded) {
    return (
      <div className="fixed inset-0 bg-flow-background flex flex-col items-center justify-center z-50">
        <div className="w-12 h-12 border-4 border-flow-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-flow-background circuit-background">
      <Helmet>
        <title>{t('analytics')} | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-20 pb-12">
        <TransitionWrapper>
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PageHeader 
                title={t('analyticsDashboard')}
                description={t('monitorAgencyPerformance')}
                icon={<BarChart3 className="h-8 w-8 text-blue-500 drop-shadow-[0_0_15px_rgba(147,197,253,0.8)]" />}
                glassEffect={true}
                className="mb-6"
                actions={
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs bg-flow-muted/30 hover:bg-flow-muted/50 border-flow-border"
                      onClick={() => setShowInsightsPanel(!showInsightsPanel)}
                    >
                      <Zap className="h-3.5 w-3.5 mr-1 text-amber-400" />
                      AI Insights
                      {aiInsights.some(i => i.isNew) && (
                        <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs bg-flow-muted/30 hover:bg-flow-muted/50 border-flow-border"
                      onClick={() => toast({
                        title: "Settings",
                        description: "Opening analytics settings panel",
                        duration: 3000,
                      })}
                    >
                      <Settings className="h-3.5 w-3.5 mr-1" />
                      Settings
                    </Button>
                  </div>
                }
              />
            </motion.div>
            
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="group relative"
              >
                <GlassMorphism intensity="low" className="p-5 rounded-xl border-blue-500/30 flex items-start">
                  <div className="w-full">
                    <div className="flex justify-between">
                      <div className="bg-blue-500/20 p-2 rounded-lg">
                        <LineChart className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="px-2 py-0.5 bg-green-500/20 rounded-full text-xs text-green-400 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" /> +12%
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-sm text-flow-foreground/70 mb-1">Total Revenue</div>
                      <div className="text-2xl font-bold text-white">{kpiData.totalRevenue}</div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-flow-border/20 text-xs text-flow-foreground/50 flex justify-between">
                      <span>vs last period</span>
                      <button 
                        className="text-flow-accent hover:text-flow-accent/80 flex items-center"
                        onClick={() => handleExpandChart("Revenue Trend", kpiData.websiteTraffic, "#3b82f6")}
                      >
                        Details <ArrowRight className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </div>
                </GlassMorphism>
                <div className="absolute top-3 right-3 hidden group-hover:flex space-x-1 opacity-70 hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    onClick={() => handleExpandChart("Revenue Trend", kpiData.websiteTraffic, "#3b82f6")}
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="group relative"
              >
                <GlassMorphism intensity="low" className="p-5 rounded-xl border-purple-500/30 flex items-start">
                  <div className="w-full">
                    <div className="flex justify-between">
                      <div className="bg-purple-500/20 p-2 rounded-lg">
                        <PieChart className="h-5 w-5 text-purple-500" />
                      </div>
                      <div className="px-2 py-0.5 bg-amber-500/20 rounded-full text-xs text-amber-400 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" /> +1.5%
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-sm text-flow-foreground/70 mb-1">Conversion Rate</div>
                      <div className="text-2xl font-bold text-white">{kpiData.conversionRate}%</div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-flow-border/20 text-xs text-flow-foreground/50 flex justify-between">
                      <span>vs last period</span>
                      <button 
                        className="text-flow-accent hover:text-flow-accent/80 flex items-center"
                        onClick={() => handleExpandChart("Conversion Trend", kpiData.adCampaignPerformance, "#8b5cf6")}
                      >
                        Details <ArrowRight className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </div>
                </GlassMorphism>
                <div className="absolute top-3 right-3 hidden group-hover:flex space-x-1 opacity-70 hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    onClick={() => handleExpandChart("Conversion Trend", kpiData.adCampaignPerformance, "#8b5cf6")}
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="group relative"
              >
                <GlassMorphism intensity="low" className="p-5 rounded-xl border-green-500/30 flex items-start">
                  <div className="w-full">
                    <div className="flex justify-between">
                      <div className="bg-green-500/20 p-2 rounded-lg">
                        <BarChart3 className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="px-2 py-0.5 bg-red-500/20 rounded-full text-xs text-red-400 flex items-center">
                        <ArrowDownRight className="h-3 w-3 mr-1" /> -2.3%
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-sm text-flow-foreground/70 mb-1">Customer Satisfaction</div>
                      <div className="text-2xl font-bold text-white">{kpiData.customerSatisfaction}%</div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-flow-border/20 text-xs text-flow-foreground/50 flex justify-between">
                      <span>vs last period</span>
                      <button 
                        className="text-flow-accent hover:text-flow-accent/80 flex items-center"
                        onClick={() => handleExpandChart("Satisfaction Trend", kpiData.customerSatisfactionData, "#10b981")}
                      >
                        Details <ArrowRight className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </div>
                </GlassMorphism>
                <div className="absolute top-3 right-3 hidden group-hover:flex space-x-1 opacity-70 hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    onClick={() => handleExpandChart("Satisfaction Trend", kpiData.customerSatisfactionData, "#10b981")}
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </motion.div>
            </div>
            
            {/* Main Content with Tabs */}
            <GlassMorphism className="border border-flow-border/30 rounded-2xl overflow-hidden">
              <Card className="bg-transparent shadow-none border-none">
                <CardHeader className="pb-0">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center">
                      <LayoutDashboard className="h-4 w-4 mr-2 text-flow-accent" />
                      <CardTitle className="text-md">{t('performanceOverview')}</CardTitle>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Time Period Selector */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 px-3 text-xs bg-flow-background/30 border-flow-border/50 flex items-center gap-2"
                          >
                            <Calendar className="h-3 w-3" />
                            {timePeriod === '24h' ? 'Last 24 Hours' : 
                             timePeriod === '7d' ? 'Last 7 Days' : 
                             timePeriod === '30d' ? 'Last 30 Days' : 
                             'Last Quarter'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-0">
                          <div className="py-2">
                            <button 
                              className={cn("w-full px-4 py-2 text-left text-sm hover:bg-flow-muted/20", 
                                timePeriod === '24h' && "bg-flow-muted/30 text-flow-accent")}
                              onClick={() => setTimePeriod('24h')}
                            >
                              Last 24 Hours
                            </button>
                            <button 
                              className={cn("w-full px-4 py-2 text-left text-sm hover:bg-flow-muted/20", 
                                timePeriod === '7d' && "bg-flow-muted/30 text-flow-accent")}
                              onClick={() => setTimePeriod('7d')}
                            >
                              Last 7 Days
                            </button>
                            <button 
                              className={cn("w-full px-4 py-2 text-left text-sm hover:bg-flow-muted/20", 
                                timePeriod === '30d' && "bg-flow-muted/30 text-flow-accent")}
                              onClick={() => setTimePeriod('30d')}
                            >
                              Last 30 Days
                            </button>
                            <button 
                              className={cn("w-full px-4 py-2 text-left text-sm hover:bg-flow-muted/20", 
                                timePeriod === '90d' && "bg-flow-muted/30 text-flow-accent")}
                              onClick={() => setTimePeriod('90d')}
                            >
                              Last Quarter
                            </button>
                          </div>
                        </PopoverContent>
                      </Popover>
                      
                      {/* Compare Toggle */}
                      <Button 
                        variant={compareMode ? "secondary" : "outline"}
                        size="sm"
                        className={cn(
                          "h-8 px-3 text-xs",
                          compareMode 
                            ? "bg-flow-accent/20 border-flow-accent/40" 
                            : "bg-flow-background/30 border-flow-border/50"
                        )}
                        onClick={toggleCompareMode}
                      >
                        <LineChart className="h-3 w-3 mr-2" />
                        Compare
                      </Button>
                      
                      {/* Filter Button */}
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-8 px-3 text-xs bg-flow-background/30 border-flow-border/50"
                        onClick={() => toast({
                          title: "Filters",
                          description: "Advanced filtering options would appear here",
                          duration: 3000,
                        })}
                      >
                        <Filter className="h-3 w-3 mr-2" />
                        Filter
                      </Button>
                      
                      {/* Export Button */}
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-8 px-3 text-xs bg-flow-background/30 border-flow-border/50"
                        onClick={handleExportData}
                      >
                        <Download className="h-3 w-3 mr-2" />
                        Export
                      </Button>
                      
                      {/* Share Button */}
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-8 px-3 text-xs bg-flow-background/30 border-flow-border/50"
                        onClick={handleShare}
                      >
                        <Share2 className="h-3 w-3 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                  
                  {compareMode && (
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-xs text-flow-foreground/70">Compare with:</span>
                      <select
                        className="text-xs bg-flow-background/30 border border-flow-border/50 rounded-md px-2 py-1"
                        value={comparePeriod}
                        onChange={(e) => setComparePeriod(e.target.value)}
                      >
                        <option value="previous">Previous Period</option>
                        <option value="year">Same Period Last Year</option>
                        <option value="custom">Custom Range</option>
                      </select>
                      <Badge variant="outline" className="text-[10px] bg-flow-background/30">
                        {comparePeriod === 'previous' 
                          ? 'Previous ' + (timePeriod === '24h' ? '24 Hours' : timePeriod === '7d' ? '7 Days' : timePeriod === '30d' ? '30 Days' : 'Quarter')
                          : comparePeriod === 'year' ? 'Last Year' : 'Custom'}
                      </Badge>
                    </div>
                  )}
                  
                  <Tabs 
                    defaultValue="overview"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="mt-4"
                  >
                    <TabsList className="bg-flow-background/20 border border-flow-border/20">
                      <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-flow-accent/20">
                        Overview
                      </TabsTrigger>
                      <TabsTrigger value="traffic" className="text-xs data-[state=active]:bg-flow-accent/20">
                        Traffic
                      </TabsTrigger>
                      <TabsTrigger value="conversion" className="text-xs data-[state=active]:bg-flow-accent/20">
                        Conversion
                      </TabsTrigger>
                      <TabsTrigger value="engagement" className="text-xs data-[state=active]:bg-flow-accent/20">
                        Engagement
                      </TabsTrigger>
                      <TabsTrigger value="retention" className="text-xs data-[state=active]:bg-flow-accent/20">
                        Retention
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <TabsContent value="overview" className="mt-0 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        {/* Website Traffic */}
                        <div className="group relative">
                          <div className="bg-black/30 border border-flow-border/20 rounded-md p-4">
                            <div className="flex justify-between items-center mb-3">
                              <div className="text-sm font-medium">Website Traffic</div>
                              <div className="text-xs text-green-400 flex items-center">
                                <TrendingUp className="h-3 w-3 mr-1" /> +15%
                              </div>
                            </div>
                            <div className="h-48">
                              <AreaChart
                                data={kpiData.websiteTraffic}
                                showGrid={false}
                                showXAxis={true}
                                showYAxis={true}
                                lineColor="#6366f1"
                              />
                            </div>
                            <div className="text-xs mt-2 text-flow-foreground/60 flex justify-between items-center">
                              <span>Unique Visitors per Day</span>
                              {compareMode && (
                                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                                  +1,245 vs previous
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="absolute top-3 right-3 hidden group-hover:flex space-x-1 opacity-70 hover:opacity-100 transition-opacity">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() => handleExpandChart("Website Traffic", kpiData.websiteTraffic, "#6366f1")}
                            >
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Ad Campaign Performance */}
                        <div className="group relative">
                          <div className="bg-black/30 border border-flow-border/20 rounded-md p-4">
                            <div className="flex justify-between items-center mb-3">
                              <div className="text-sm font-medium">Ad Campaign Performance</div>
                              <div className="text-xs text-green-400 flex items-center">
                                <TrendingUp className="h-3 w-3 mr-1" /> +8%
                              </div>
                            </div>
                            <div className="h-48">
                              <AreaChart
                                data={kpiData.adCampaignPerformance}
                                showGrid={false}
                                showXAxis={true}
                                showYAxis={true}
                                lineColor="#f59e0b"
                              />
                            </div>
                            <div className="text-xs mt-2 text-flow-foreground/60 flex justify-between items-center">
                              <span>Impressions and Conversions</span>
                              {compareMode && (
                                <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                                  +320 conversions
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="absolute top-3 right-3 hidden group-hover:flex space-x-1 opacity-70 hover:opacity-100 transition-opacity">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() => handleExpandChart("Ad Performance", kpiData.adCampaignPerformance, "#f59e0b")}
                            >
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {/* User Engagement */}
                        <div className="group relative">
                          <div className="bg-black/30 border border-flow-border/20 rounded-md p-4">
                            <div className="flex justify-between items-center mb-3">
                              <div className="text-sm font-medium">User Engagement</div>
                              <div className="text-xs text-amber-400 flex items-center">
                                <TrendingUp className="h-3 w-3 mr-1" /> +3%
                              </div>
                            </div>
                            <div className="h-48">
                              <AreaChart
                                data={kpiData.userEngagement}
                                showGrid={false}
                                showXAxis={true}
                                showYAxis={true}
                                lineColor="#10b981"
                              />
                            </div>
                            <div className="text-xs mt-2 text-flow-foreground/60 flex justify-between items-center">
                              <span>Average Session Duration</span>
                              {compareMode && (
                                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                                  +0:42 minutes
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="absolute top-3 right-3 hidden group-hover:flex space-x-1 opacity-70 hover:opacity-100 transition-opacity">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() => handleExpandChart("User Engagement", kpiData.userEngagement, "#10b981")}
                            >
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Customer Satisfaction */}
                        <div className="group relative">
                          <div className="bg-black/30 border border-flow-border/20 rounded-md p-4">
                            <div className="flex justify-between items-center mb-3">
                              <div className="text-sm font-medium">Customer Satisfaction</div>
                              <div className="text-xs text-red-400 flex items-center">
                                <ArrowDownRight className="h-3 w-3 mr-1" /> -2%
                              </div>
                            </div>
                            <div className="h-48">
                              <AreaChart
                                data={kpiData.customerSatisfactionData}
                                showGrid={false}
                                showXAxis={true}
                                showYAxis={true}
                                lineColor="#e11d48"
                              />
                            </div>
                            <div className="text-xs mt-2 text-flow-foreground/60 flex justify-between items-center">
                              <span>Satisfaction Scores Over Time</span>
                              {compareMode && (
                                <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/30">
                                  -2.4 points
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="absolute top-3 right-3 hidden group-hover:flex space-x-1 opacity-70 hover:opacity-100 transition-opacity">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() => handleExpandChart("Customer Satisfaction", kpiData.customerSatisfactionData, "#e11d48")}
                            >
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Key Performance Indicators */}
                    <div>
                      <h3 className="text-sm font-medium mb-3 flex items-center">
                        <AlertTriangle className="h-3.5 w-3.5 mr-2 text-amber-400" />
                        Key Performance Indicators
                      </h3>
                      <div className="space-y-2">
                        {/* Anomaly 1 */}
                        <div className="flex justify-between p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                          <div className="flex items-center">
                            <div className="text-sm mr-3">Website conversion increasing</div>
                            <Badge variant="outline" className="bg-amber-500/20 border-amber-500/30 text-amber-400 text-xs">
                              +8%
                            </Badge>
                          </div>
                          <div className="text-xs font-medium text-green-400">
                            Positive trend
                          </div>
                        </div>
                        
                        {/* Anomaly 2 */}
                        <div className="flex justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                          <div className="flex items-center">
                            <div className="text-sm mr-3">Enterprise satisfaction dropping</div>
                            <Badge variant="outline" className="bg-red-500/20 border-red-500/30 text-red-400 text-xs">
                              -5%
                            </Badge>
                          </div>
                          <div className="text-xs font-medium text-red-400">
                            Needs attention
                          </div>
                        </div>
                        
                        {/* Anomaly 3 */}
                        <div className="flex justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                          <div className="flex items-center">
                            <div className="text-sm mr-3">Email newsletter performance</div>
                            <Badge variant="outline" className="bg-green-500/20 border-green-500/30 text-green-400 text-xs">
                              +32%
                            </Badge>
                          </div>
                          <div className="text-xs font-medium text-green-400">
                            Exceptional results
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="traffic" className="mt-0 space-y-4">
                    <div className="bg-black/30 border border-flow-border/20 rounded-md p-4">
                      <h3 className="text-sm font-medium mb-3">Traffic Sources</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="h-64">
                          <PieChart2
                            data={[
                              { name: 'Organic', value: 40, color: '#6366f1' },
                              { name: 'Direct', value: 25, color: '#f59e0b' },
                              { name: 'Social', value: 20, color: '#10b981' },
                              { name: 'Referral', value: 10, color: '#e11d48' },
                              { name: 'Email', value: 5, color: '#8b5cf6' }
                            ]}
                            donut={true}
                            showLabel={true}
                          />
                        </div>
                        <div className="space-y-3">
                          <div className="p-3 bg-black/20 rounded-lg">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="h-3 w-3 rounded-full bg-[#6366f1] mr-2"></div>
                                <span className="text-sm">Organic Search</span>
                              </div>
                              <div className="text-lg font-semibold">40%</div>
                            </div>
                            <div className="text-xs text-flow-foreground/60 mt-1">
                              +12% vs. previous period
                            </div>
                          </div>
                          <div className="p-3 bg-black/20 rounded-lg">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="h-3 w-3 rounded-full bg-[#f59e0b] mr-2"></div>
                                <span className="text-sm">Direct</span>
                              </div>
                              <div className="text-lg font-semibold">25%</div>
                            </div>
                            <div className="text-xs text-flow-foreground/60 mt-1">
                              +5% vs. previous period
                            </div>
                          </div>
                          <div className="p-3 bg-black/20 rounded-lg">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="h-3 w-3 rounded-full bg-[#10b981] mr-2"></div>
                                <span className="text-sm">Social Media</span>
                              </div>
                              <div className="text-lg font-semibold">20%</div>
                            </div>
                            <div className="text-xs text-flow-foreground/60 mt-1">
                              +15% vs. previous period
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-black/30 border border-flow-border/20 rounded-md p-4">
                        <h3 className="text-sm font-medium mb-3">Geographic Distribution</h3>
                        <div className="h-64">
                          <AreaChart
                            data={kpiData.customerSatisfactionData.map((item, i) => ({
                              ...item,
                              value: Math.floor(Math.random() * 50) + 30
                            }))}
                            showGrid={false}
                            lineColor="#6366f1"
                          />
                        </div>
                        <div className="text-xs mt-2 text-flow-foreground/60">
                          Visitors by Region
                        </div>
                      </div>
                      <div className="bg-black/30 border border-flow-border/20 rounded-md p-4">
                        <h3 className="text-sm font-medium mb-3">Device Breakdown</h3>
                        <div className="h-64">
                          <PieChart2
                            data={[
                              { name: 'Desktop', value: 45, color: '#6366f1' },
                              { name: 'Mobile', value: 40, color: '#f59e0b' },
                              { name: 'Tablet', value: 15, color: '#10b981' }
                            ]}
                            donut={false}
                            showLabel={true}
                          />
                        </div>
                        <div className="text-xs mt-2 text-flow-foreground/60">
                          Traffic by Device Type
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="conversion" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <GlassMorphism intensity="low" className="p-4 rounded-xl border-amber-500/30">
                        <div className="flex items-center mb-3">
                          <div className="bg-amber-500/20 p-1.5 rounded-lg mr-3">
                            <LineChart className="h-4 w-4 text-amber-400" />
                          </div>
                          <div className="text-sm font-medium">Conversion Rate</div>
                        </div>
                        <div className="text-2xl font-bold">{kpiData.conversionRate}%</div>
                        <div className="text-xs text-green-400 flex items-center mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" /> +1.5% vs last period
                        </div>
                      </GlassMorphism>
                      
                      <GlassMorphism intensity="low" className="p-4 rounded-xl border-blue-500/30">
                        <div className="flex items-center mb-3">
                          <div className="bg-blue-500/20 p-1.5 rounded-lg mr-3">
                            <LineChart className="h-4 w-4 text-blue-400" />
                          </div>
                          <div className="text-sm font-medium">Cost Per Acquisition</div>
                        </div>
                        <div className="text-2xl font-bold">$42.15</div>
                        <div className="text-xs text-red-400 flex items-center mt-1">
                          <ArrowDownRight className="h-3 w-3 mr-1" /> +$3.25 vs last period
                        </div>
                      </GlassMorphism>
                      
                      <GlassMorphism intensity="low" className="p-4 rounded-xl border-purple-500/30">
                        <div className="flex items-center mb-3">
                          <div className="bg-purple-500/20 p-1.5 rounded-lg mr-3">
                            <LineChart className="h-4 w-4 text-purple-400" />
                          </div>
                          <div className="text-sm font-medium">Revenue Per User</div>
                        </div>
                        <div className="text-2xl font-bold">$128.50</div>
                        <div className="text-xs text-green-400 flex items-center mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" /> +$12.30 vs last period
                        </div>
                      </GlassMorphism>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-black/30 border border-flow-border/20 rounded-md p-4">
                        <h3 className="text-sm font-medium mb-3">Conversion Funnel</h3>
                        <div className="h-64 flex flex-col justify-center items-center">
                          <div className="w-full max-w-md">
                            <div className="mb-4">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Visitors</span>
                                <span className="text-sm">12,450</span>
                              </div>
                              <div className="h-5 bg-blue-600/20 rounded-md w-full"></div>
                            </div>
                            <div className="mb-4">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Product Views</span>
                                <span className="text-sm">8,320 (66%)</span>
                              </div>
                              <div className="h-5 bg-blue-600/30 rounded-md w-[66%]"></div>
                            </div>
                            <div className="mb-4">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Add to Cart</span>
                                <span className="text-sm">3,124 (25%)</span>
                              </div>
                              <div className="h-5 bg-blue-600/40 rounded-md w-[25%]"></div>
                            </div>
                            <div className="mb-4">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Checkout</span>
                                <span className="text-sm">1,862 (15%)</span>
                              </div>
                              <div className="h-5 bg-blue-600/60 rounded-md w-[15%]"></div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Purchase</span>
                                <span className="text-sm">996 (8%)</span>
                              </div>
                              <div className="h-5 bg-blue-600/80 rounded-md w-[8%]"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-black/30 border border-flow-border/20 rounded-md p-4">
                        <h3 className="text-sm font-medium mb-3">Conversion by Channel</h3>
                        <div className="h-64">
                          <LineChart2
                            data={[
                              { name: 'Organic', value: 8.2 },
                              { name: 'Paid', value: 6.5 },
                              { name: 'Social', value: 9.1 },
                              { name: 'Email', value: 12.3 },
                              { name: 'Referral', value: 7.8 },
                              { name: 'Direct', value: 5.2 }
                            ]}
                            lineColor="#8b5cf6"
                          />
                        </div>
                        <div className="text-xs mt-2 text-flow-foreground/60">
                          Conversion Rate (%) by Marketing Channel
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="engagement" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-black/30 border border-flow-border/20 rounded-md p-4">
                        <h3 className="text-sm font-medium mb-3">Session Duration</h3>
                        <div className="h-64">
                          <AreaChart
                            data={kpiData.userEngagement}
                            showGrid={false}
                            showXAxis={true}
                            showYAxis={true}
                            lineColor="#10b981"
                          />
                        </div>
                        <div className="text-xs mt-2 text-flow-foreground/60">
                          Average Time Spent on Site (minutes)
                        </div>
                      </div>
                      
                      <div className="bg-black/30 border border-flow-border/20 rounded-md p-4">
                        <h3 className="text-sm font-medium mb-3">Pages Per Session</h3>
                        <div className="h-64">
                          <AreaChart
                            data={[
                              { name: 'Mon', value: 3.4 },
                              { name: 'Tue', value: 3.8 },
                              { name: 'Wed', value: 3.2 },
                              { name: 'Thu', value: 3.9 },
                              { name: 'Fri', value: 4.2 },
                              { name: 'Sat', value: 3.7 },
                              { name: 'Sun', value: 3.5 }
                            ]}
                            showGrid={false}
                            showXAxis={true}
                            showYAxis={true}
                            lineColor="#f59e0b"
                          />
                        </div>
                        <div className="text-xs mt-2 text-flow-foreground/60">
                          Average Number of Pages Viewed
                        </div>
                      </div>
                      
                      <div className="bg-black/30 border border-flow-border/20 rounded-md p-4 md:col-span-2">
                        <h3 className="text-sm font-medium mb-3">Content Engagement</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-3 bg-black/20 rounded-lg">
                            <div className="text-xs text-flow-foreground/60">Most Viewed Page</div>
                            <div className="text-sm font-medium mt-1">/product/enterprise-solution</div>
                            <div className="text-lg font-semibold mt-1">4,285 views</div>
                            <div className="text-xs text-green-400 flex items-center mt-1">
                              <TrendingUp className="h-3 w-3 mr-1" /> +18% vs last period
                            </div>
                          </div>
                          
                          <div className="p-3 bg-black/20 rounded-lg">
                            <div className="text-xs text-flow-foreground/60">Highest Engagement</div>
                            <div className="text-sm font-medium mt-1">/blog/ai-productivity</div>
                            <div className="text-lg font-semibold mt-1">8:24 avg. time</div>
                            <div className="text-xs text-green-400 flex items-center mt-1">
                              <TrendingUp className="h-3 w-3 mr-1" /> +2:12 vs last period
                            </div>
                          </div>
                          
                          <div className="p-3 bg-black/20 rounded-lg">
                            <div className="text-xs text-flow-foreground/60">Top Exit Page</div>
                            <div className="text-sm font-medium mt-1">/checkout/complete</div>
                            <div className="text-lg font-semibold mt-1">35% exit rate</div>
                            <div className="text-xs text-amber-400 flex items-center mt-1">
                              <TrendingUp className="h-3 w-3 mr-1" /> +5% vs last period
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="retention" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-black/30 border border-flow-border/20 rounded-md p-4">
                        <h3 className="text-sm font-medium mb-3">Customer Retention Rate</h3>
                        <div className="h-64">
                          <AreaChart
                            data={[
                              { name: 'Jan', value: 82 },
                              { name: 'Feb', value: 79 },
                              { name: 'Mar', value: 85 },
                              { name: 'Apr', value: 87 },
                              { name: 'May', value: 84 },
                              { name: 'Jun', value: 88 },
                              { name: 'Jul', value: 91 }
                            ]}
                            showGrid={false}
                            showXAxis={true}
                            showYAxis={true}
                            lineColor="#8b5cf6"
                          />
                        </div>
                        <div className="text-xs mt-2 text-flow-foreground/60">
                          Monthly Retention Rate (%)
                        </div>
                      </div>
                      
                      <div className="bg-black/30 border border-flow-border/20 rounded-md p-4">
                        <h3 className="text-sm font-medium mb-3">Churn Analysis</h3>
                        <div className="h-64">
                          <PieChart2
                            data={[
                              { name: 'Price', value: 38, color: '#e11d48' },
                              { name: 'Features', value: 25, color: '#f59e0b' },
                              { name: 'Support', value: 15, color: '#6366f1' },
                              { name: 'Competitor', value: 12, color: '#8b5cf6' },
                              { name: 'Other', value: 10, color: '#10b981' }
                            ]}
                            donut={true}
                            showLabel={true}
                          />
                        </div>
                        <div className="text-xs mt-2 text-flow-foreground/60">
                          Reasons for Customer Churn
                        </div>
                      </div>
                      
                      <div className="bg-black/30 border border-flow-border/20 rounded-md p-4 md:col-span-2">
                        <h3 className="text-sm font-medium mb-3">Cohort Retention Analysis</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead>
                              <tr>
                                <th className="text-left p-2 bg-black/20">Cohort</th>
                                <th className="p-2 bg-black/20">Month 0</th>
                                <th className="p-2 bg-black/20">Month 1</th>
                                <th className="p-2 bg-black/20">Month 2</th>
                                <th className="p-2 bg-black/20">Month 3</th>
                                <th className="p-2 bg-black/20">Month 4</th>
                                <th className="p-2 bg-black/20">Month 5</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="p-2 bg-black/10">Jan 2025</td>
                                <td className="p-2 bg-green-500/80">100%</td>
                                <td className="p-2 bg-green-500/60">85%</td>
                                <td className="p-2 bg-green-500/40">76%</td>
                                <td className="p-2 bg-green-500/30">72%</td>
                                <td className="p-2 bg-green-500/20">70%</td>
                                <td className="p-2 bg-green-500/10">68%</td>
                              </tr>
                              <tr>
                                <td className="p-2 bg-black/10">Feb 2025</td>
                                <td className="p-2 bg-blue-500/80">100%</td>
                                <td className="p-2 bg-blue-500/60">82%</td>
                                <td className="p-2 bg-blue-500/40">75%</td>
                                <td className="p-2 bg-blue-500/30">70%</td>
                                <td className="p-2 bg-blue-500/20">68%</td>
                                <td className="p-2"></td>
                              </tr>
                              <tr>
                                <td className="p-2 bg-black/10">Mar 2025</td>
                                <td className="p-2 bg-purple-500/80">100%</td>
                                <td className="p-2 bg-purple-500/60">88%</td>
                                <td className="p-2 bg-purple-500/40">79%</td>
                                <td className="p-2 bg-purple-500/30">73%</td>
                                <td className="p-2"></td>
                                <td className="p-2"></td>
                              </tr>
                              <tr>
                                <td className="p-2 bg-black/10">Apr 2025</td>
                                <td className="p-2 bg-amber-500/80">100%</td>
                                <td className="p-2 bg-amber-500/60">87%</td>
                                <td className="p-2 bg-amber-500/40">80%</td>
                                <td className="p-2"></td>
                                <td className="p-2"></td>
                                <td className="p-2"></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="text-xs mt-3 text-flow-foreground/60">
                          User Retention by Starting Month (%)
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            </GlassMorphism>
          </div>
        </TransitionWrapper>
      </main>
      
      <Footer />
      
      {/* AI Insights Slide-In Panel */}
      <motion.div 
        className="fixed top-0 right-0 h-full max-w-md w-full bg-black/90 border-l border-flow-border/30 backdrop-blur-sm shadow-2xl z-50 overflow-hidden"
        initial={{ x: '100%' }}
        animate={{ x: showInsightsPanel ? 0 : '100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-flow-border/20 flex justify-between items-center">
            <div className="flex items-center">
              <Zap className="h-5 w-5 text-amber-400 mr-2" />
              <h2 className="text-lg font-medium">AI Analytics Insights</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowInsightsPanel(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </Button>
          </div>
          
          <ScrollArea className="flex-1 py-4 px-2">
            <div className="space-y-3 px-2">
              {aiInsights.map((insight) => (
                <div 
                  key={insight.id} 
                  className={cn(
                    "p-4 rounded-lg border", 
                    insight.impact === 'positive' ? "bg-green-500/10 border-green-500/30" :
                    insight.impact === 'negative' ? "bg-red-500/10 border-red-500/30" :
                    "bg-amber-500/10 border-amber-500/30",
                    insight.isNew && "relative after:absolute after:top-2 after:right-2 after:w-2 after:h-2 after:bg-amber-400 after:rounded-full"
                  )}
                >
                  <div className="flex items-center mb-2">
                    {insight.impact === 'positive' ? (
                      <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
                    ) : insight.impact === 'negative' ? (
                      <ArrowDownRight className="h-4 w-4 text-red-400 mr-2" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-400 mr-2" />
                    )}
                    <h3 className="font-medium">{insight.title}</h3>
                  </div>
                  
                  <p className="text-sm text-flow-foreground/80 mb-3">{insight.description}</p>
                  
                  {insight.recommendation && (
                    <div className="bg-black/30 p-3 rounded-md mb-3">
                      <div className="flex items-center mb-1">
                        <BellRing className="h-3.5 w-3.5 text-amber-400 mr-2" />
                        <span className="text-xs font-medium text-amber-400">Recommendation</span>
                      </div>
                      <p className="text-xs text-flow-foreground/80">{insight.recommendation}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge variant="outline" className="text-[10px]">
                        {insight.category}
                      </Badge>
                      <span className="text-xs text-flow-foreground/50 ml-2">
                        {new Date(insight.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => handleInsightAction(insight)}
                    >
                      Apply Action
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t border-flow-border/20 bg-black/30">
            <div className="flex items-center text-xs text-flow-foreground/70 mb-4">
              <MessageSquareText className="h-3.5 w-3.5 mr-2" />
              Ask the Analytics Assistant
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask a question about your data..."
                className="flex-1 px-3 py-2 text-xs bg-black/50 border border-flow-border/30 rounded-md focus:outline-none focus:ring-1 focus:ring-flow-accent"
              />
              <Button
                variant="secondary"
                size="sm"
                className="text-xs"
                onClick={() => toast({
                  title: "AI Assistant",
                  description: "This feature would connect to the AI analytics assistant",
                  duration: 3000
                })}
              >
                Ask
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Expanded Chart Modal */}
      <Dialog 
        open={!!expandedChart} 
        onOpenChange={() => setExpandedChart(null)}
      >
        <DialogContent className="max-w-3xl h-[70vh] overflow-hidden p-0">
          <DialogHeader className="px-6 pt-4">
            <DialogTitle>{expandedChart?.title}</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-0 h-full">
            <div className="flex-grow min-h-0 h-[90%]">
              {expandedChart && (
                <AreaChart 
                  data={expandedChart.data || []} 
                  lineColor={expandedChart.color} 
                  showGrid={true}
                  showXAxis={true}
                  showYAxis={true}
                />
              )}
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <Button 
                variant="outline"
                onClick={handleExportData}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button 
                variant="outline"
                onClick={handleShare}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Background ambient effects */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <motion.div
          className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, rgba(139, 92, 246, 0) 70%)" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(219, 39, 119, 0.03) 0%, rgba(219, 39, 119, 0) 70%)" }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
      
      <style>{`
        .animate-pulse-subtle {
          animation: pulse-subtle 3s infinite ease-in-out;
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes scan {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
        }
        .circuit-background {
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
        
        @media (max-width: 640px) {
          .circuit-background {
            background-size: 25px 25px;
          }
        }
      `}</style>
    </div>
  );
};

export default Analytics;
