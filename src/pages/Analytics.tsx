import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { useLanguage } from '@/contexts/LanguageContext';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { 
  BarChart2, 
  TrendingUp, 
  PieChart as PieChartIcon, 
  Activity, 
  Calendar, 
  Users, 
  Globe,
  Zap,
  ArrowRight,
  Maximize2,
  Download,
  Share2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageHeader from '@/components/ui/design-system/PageHeader';
import Section from '@/components/ui/design-system/Section';
import { AreaChart, BarChart, LineChart, PieChart } from '@/components/ui/chart';
import { usePerformanceData } from '@/hooks/usePerformanceData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Analytics = () => {
  const { t } = useLanguage();
  const [activeTimeframe, setActiveTimeframe] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const performanceData = usePerformanceData();
  const { toast } = useToast();
  
  const [expandedChart, setExpandedChart] = useState<{
    title: string;
    data: any[];
    type: 'line' | 'bar' | 'pie' | 'area';
    color: string;
  } | null>(null);
  
  const performanceMetrics = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 320 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 780 },
    { name: "May", value: 520 },
    { name: "Jun", value: 750 },
    { name: "Jul", value: 890 },
  ];
  
  const categoryData = [
    { name: "Content Creation", value: 35, description: "AI-generated content and assets" },
    { name: "Customer Service", value: 25, description: "AI customer support and engagement" },
    { name: "Data Processing", value: 20, description: "Data analysis and processing tasks" },
    { name: "Research", value: 15, description: "Market and competitive research" },
    { name: "Other", value: 5, description: "Miscellaneous tasks and activities" },
  ];
  
  const engagementData = [
    { name: "Week 1", value: 40 },
    { name: "Week 2", value: 45 },
    { name: "Week 3", value: 60 },
    { name: "Week 4", value: 70 },
    { name: "Week 5", value: 85 },
    { name: "Week 6", value: 75 },
    { name: "Week 7", value: 90 },
  ];
  
  const efficiencyData = [
    { name: "Team A", value: 85 },
    { name: "Team B", value: 70 },
    { name: "Team C", value: 92 },
    { name: "Team D", value: 65 },
    { name: "Team E", value: 78 },
  ];

  const regionData = [
    { name: "North America", value: 45 },
    { name: "Europe", value: 30 },
    { name: "Asia-Pacific", value: 15 },
    { name: "Latin America", value: 7 },
    { name: "Africa", value: 3 },
  ];

  const taskTypeData = [
    { name: "Analysis", value: 122 },
    { name: "Research", value: 98 },
    { name: "Content", value: 86 },
    { name: "Support", value: 64 },
    { name: "Development", value: 42 },
  ];

  const enhanceHistoricalData = (data: number[]) => {
    if (!data || data.length === 0) return data;
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    
    if (range < 10) {
      const enhancedData = data.map(value => {
        const randomVariance = (Math.random() - 0.5) * (range * 0.8);
        return Math.max(0, value + randomVariance);
      });
      return enhancedData;
    }
    
    return data;
  };
  
  const enhancedTaskCompletionData = performanceData.historicalData.taskCompletion.map((value, index) => ({
    name: `Day ${index + 1}`,
    value: value + (Math.random() * 5 - 2.5)
  }));
  
  const enhancedResponseTimeData = performanceData.historicalData.responseTime.map((value, index) => ({
    name: `Day ${index + 1}`,
    value: value * (1 + (Math.random() * 0.4 - 0.2))
  }));
  
  const enhancedUserData = [
    { name: "Day 1", value: 198 },
    { name: "Day 2", value: 210 },
    { name: "Day 3", value: 215 },
    { name: "Day 4", value: 222 },
    { name: "Day 5", value: 231 },
    { name: "Day 6", value: 235 },
    { name: "Day 7", value: 246 },
  ];

  const handleDataPointClick = useCallback((data: any, index: number, chartTitle: string) => {
    toast({
      title: `${chartTitle} - ${data.name}`,
      description: `Value: ${data.value}`,
      duration: 3000
    });
  }, [toast]);
  
  const handleExpandChart = useCallback((title, data, type, color) => {
    setExpandedChart({
      title,
      data,
      type,
      color
    });
  }, []);
  
  const handleExportData = useCallback((title, data) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-data.json`;
    link.click();
    
    toast({
      title: "Data Exported",
      description: `${title} data has been exported successfully`,
      duration: 3000
    });
  }, [toast]);
  
  const handleShareData = useCallback((title) => {
    toast({
      title: "Share Feature",
      description: `Sharing ${title} data (would open sharing dialog in production)`,
      duration: 3000
    });
  }, [toast]);

  const getTrendInsight = () => {
    const trends = performanceData.historicalData.efficiency;
    const lastIndex = trends.length - 1;
    const currentValue = trends[lastIndex];
    const previousValue = trends[lastIndex - 1];
    const change = currentValue - previousValue;
    const isPositive = change >= 0;
    
    return {
      value: `${isPositive ? '+' : ''}${change}%`,
      text: isPositive 
        ? 'Improvement in overall efficiency' 
        : 'Decrease in overall efficiency',
      trend: isPositive ? 'positive' : 'negative',
      action: isPositive ? 'Maintain current workflows' : 'Review process bottlenecks'
    };
  };

  const insight = getTrendInsight();
  
  const renderChartActions = (title, data, type, color) => (
    <div className="absolute top-4 right-4 flex space-x-1 opacity-50 hover:opacity-100 transition-opacity">
      <Button 
        size="icon" 
        variant="ghost" 
        className="h-6 w-6"
        onClick={() => handleExpandChart(title, data, type, color)}
      >
        <Maximize2 className="h-3.5 w-3.5" />
      </Button>
      <Button 
        size="icon" 
        variant="ghost" 
        className="h-6 w-6"
        onClick={() => handleExportData(title, data)}
      >
        <Download className="h-3.5 w-3.5" />
      </Button>
      <Button 
        size="icon" 
        variant="ghost" 
        className="h-6 w-6"
        onClick={() => handleShareData(title)}
      >
        <Share2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-flow-background text-flow-foreground flex flex-col circuit-background">
      <Helmet>
        <title>{t('analytics')} | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-28 pb-12">
        <TransitionWrapper>
          <div className="max-w-7xl mx-auto">
            <PageHeader 
              title={t('analytics')}
              description="Track your agency's performance metrics, identify trends, and make data-driven decisions with comprehensive analytics."
              icon={<BarChart2 className="h-8 w-8 text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />}
              glassEffect={false}
            />

            <div className="flex justify-center mb-8">
              <Tabs value={activeTimeframe} onValueChange={(value) => setActiveTimeframe(value as 'week' | 'month' | 'quarter' | 'year')}>
                <TabsList className="bg-flow-background/30 p-1">
                  <TabsTrigger 
                    value="week" 
                    className={activeTimeframe === 'week' ? 'bg-orange-500/20 text-orange-500' : ''}
                  >
                    Week
                  </TabsTrigger>
                  <TabsTrigger 
                    value="month" 
                    className={activeTimeframe === 'month' ? 'bg-orange-500/20 text-orange-500' : ''}
                  >
                    Month
                  </TabsTrigger>
                  <TabsTrigger 
                    value="quarter" 
                    className={activeTimeframe === 'quarter' ? 'bg-orange-500/20 text-orange-500' : ''}
                  >
                    Quarter
                  </TabsTrigger>
                  <TabsTrigger 
                    value="year" 
                    className={activeTimeframe === 'year' ? 'bg-orange-500/20 text-orange-500' : ''}
                  >
                    Year
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <GlassMorphism className="p-4 rounded-xl border-orange-500/20 hover:border-orange-500/30 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-flow-foreground/60">Task Completion Rate</p>
                    <p className="text-2xl font-bold text-orange-500">{performanceData.taskCompletion}%</p>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500 border-green-500/30">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +4.2%
                      </Badge>
                    </div>
                  </div>
                  <div className="p-2 rounded-full bg-orange-500/10">
                    <Activity className="w-5 h-5 text-orange-500" />
                  </div>
                </div>
                <div className="mt-3 h-12 cursor-pointer" onClick={() => handleExpandChart("Task Completion Rate", enhancedTaskCompletionData, "line", "#f97316")}>
                  <LineChart 
                    data={enhancedTaskCompletionData}
                    lineColor="#f97316"
                    height={50}
                    showArea={true}
                    areaOpacity={0.2}
                    domain={[85, 100]}
                    showGrid={false}
                    referenceLineY={null}
                    referenceLineLabel=""
                    onClick={(data, index) => handleDataPointClick(data, index, "Task Completion Rate")}
                  />
                </div>
              </GlassMorphism>

              <GlassMorphism className="p-4 rounded-xl border-blue-500/20 hover:border-blue-500/30 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-flow-foreground/60">Avg Response Time</p>
                    <p className="text-2xl font-bold text-blue-500">{performanceData.averageResponseTime}s</p>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500 border-green-500/30">
                        <TrendingUp className="w-3 h-3 mr-1 rotate-180" />
                        -0.3s
                      </Badge>
                    </div>
                  </div>
                  <div className="p-2 rounded-full bg-blue-500/10">
                    <Zap className="w-5 h-5 text-blue-500" />
                  </div>
                </div>
                <div className="mt-3 h-12 cursor-pointer" onClick={() => handleExpandChart("Response Time", enhancedResponseTimeData, "line", "#0ea5e9")}>
                  <LineChart 
                    data={enhancedResponseTimeData}
                    lineColor="#0ea5e9"
                    height={50}
                    showArea={true}
                    areaOpacity={0.2}
                    domain={[0.5, 2.5]}
                    showGrid={false}
                    referenceLineY={null}
                    referenceLineLabel=""
                    onClick={(data, index) => handleDataPointClick(data, index, "Response Time")}
                  />
                </div>
              </GlassMorphism>

              <GlassMorphism className="p-4 rounded-xl border-purple-500/20 hover:border-purple-500/30 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-flow-foreground/60">Active Users</p>
                    <p className="text-2xl font-bold text-purple-500">246</p>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500 border-green-500/30">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +12.8%
                      </Badge>
                    </div>
                  </div>
                  <div className="p-2 rounded-full bg-purple-500/10">
                    <Users className="w-5 h-5 text-purple-500" />
                  </div>
                </div>
                <div className="mt-3 h-12 cursor-pointer" onClick={() => handleExpandChart("Active Users", enhancedUserData, "line", "#8b5cf6")}>
                  <LineChart 
                    data={enhancedUserData}
                    lineColor="#8b5cf6"
                    height={50}
                    showArea={true}
                    areaOpacity={0.2}
                    domain={[180, 260]}
                    showGrid={false}
                    referenceLineY={null}
                    referenceLineLabel=""
                    onClick={(data, index) => handleDataPointClick(data, index, "Active Users")}
                  />
                </div>
              </GlassMorphism>

              <GlassMorphism className="p-4 rounded-xl border-green-500/20 hover:border-green-500/30 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-flow-foreground/60">Global Reach</p>
                    <p className="text-2xl font-bold text-green-500">24</p>
                    <p className="text-xs text-flow-foreground/60">Countries</p>
                  </div>
                  <div className="p-2 rounded-full bg-green-500/10">
                    <Globe className="w-5 h-5 text-green-500" />
                  </div>
                </div>
                <div className="mt-3 h-12 flex items-center justify-center cursor-pointer" onClick={() => handleExpandChart("Global Reach", regionData, "pie", "#22c55e")}>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div 
                        key={i}
                        className={`w-1.5 rounded-full bg-green-500`}
                        initial={{ height: 10 }}
                        animate={{ 
                          height: `${(Math.random() * 20) + 10}px`,
                          transition: { 
                            repeat: Infinity, 
                            repeatType: "reverse", 
                            duration: 1.5 + (i * 0.2), 
                            ease: "easeInOut" 
                          } 
                        }}
                      />
                    ))}
                  </div>
                </div>
              </GlassMorphism>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <GlassMorphism className="p-6 rounded-xl border-flow-border/30 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
                <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-4 md:gap-0">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-orange-500/20">
                        <Zap className="w-4 h-4 text-orange-500" />
                      </div>
                      <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                        AI-Generated Insight
                      </span>
                    </h3>
                    <p className="text-sm text-flow-foreground/70 mt-1">
                      {insight.text}: <span className={`font-medium ${insight.trend === 'positive' ? 'text-green-400' : 'text-red-400'}`}>{insight.value}</span>
                    </p>
                    <p className="text-sm text-flow-foreground/70 mt-1">
                      Recommended action: {insight.action}
                    </p>
                  </div>
                  <Button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-none">
                    Generate Full Report <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </GlassMorphism>
            </motion.div>
            
            <Tabs defaultValue="performance" className="mb-8">
              <div className="flex justify-center mb-4">
                <TabsList className="bg-flow-background/30">
                  <TabsTrigger value="performance" className="data-[state=active]:bg-flow-accent/20">
                    Performance
                  </TabsTrigger>
                  <TabsTrigger value="engagement" className="data-[state=active]:bg-flow-accent/20">
                    Engagement
                  </TabsTrigger>
                  <TabsTrigger value="distributions" className="data-[state=active]:bg-flow-accent/20">
                    Distributions
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="performance" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GlassMorphism className="rounded-2xl p-6 shadow-sm border-flow-border/30 scan-lines relative">
                    {renderChartActions("Performance Trends", performanceMetrics, "line", "#f97316")}
                    <Section 
                      title="Performance Trends" 
                      icon={<TrendingUp className="h-5 w-5" />} 
                      description="Monthly performance metrics for your agency"
                      noPadding
                    >
                      <LineChart 
                        data={performanceMetrics} 
                        lineColor="#f97316" 
                        dotColor="#fef3c7"
                        showArea={true}
                        areaOpacity={0.15}
                        referenceLineY={500}
                        referenceLineLabel="Target"
                        domain={[0, 1000]}
                        onClick={(data, index) => handleDataPointClick(data, index, "Performance Trends")}
                      />
                    </Section>
                  </GlassMorphism>

                  <GlassMorphism className="rounded-2xl p-6 shadow-sm border-flow-border/30 scan-lines relative">
                    {renderChartActions("Team Efficiency", efficiencyData, "bar", "#8884d8")}
                    <Section 
                      title="Team Efficiency" 
                      icon={<BarChart2 className="h-5 w-5" />} 
                      description="Efficiency ratings across agency teams (%)"
                      noPadding
                    >
                      <BarChart data={efficiencyData} />
                    </Section>
                  </GlassMorphism>
                </div>
              </TabsContent>
              
              <TabsContent value="engagement" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GlassMorphism className="rounded-2xl p-6 shadow-sm border-flow-border/30 scan-lines relative">
                    {renderChartActions("Client Engagement", engagementData, "area", "#0ea5e9")}
                    <Section 
                      title="Client Engagement" 
                      icon={<Activity className="h-5 w-5" />} 
                      description="Weekly engagement metrics with clients"
                      noPadding
                    >
                      <AreaChart data={engagementData} />
                    </Section>
                  </GlassMorphism>
                  
                  <GlassMorphism className="rounded-2xl p-6 shadow-sm border-flow-border/30 scan-lines relative">
                    {renderChartActions("Task Types", taskTypeData, "bar", "#8884d8")}
                    <Section 
                      title="Task Types" 
                      icon={<Calendar className="h-5 w-5" />} 
                      description="Distribution of tasks by type"
                      noPadding
                    >
                      <BarChart data={taskTypeData} />
                    </Section>
                  </GlassMorphism>
                </div>
              </TabsContent>
              
              <TabsContent value="distributions" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GlassMorphism className="rounded-2xl p-6 shadow-sm border-flow-border/30 scan-lines relative">
                    {renderChartActions("Task Categories", categoryData, "pie", "#f97316")}
                    <Section 
                      title="Task Categories" 
                      icon={<PieChartIcon className="h-5 w-5" />} 
                      description="Distribution of tasks by category"
                      noPadding
                    >
                      <PieChart 
                        data={categoryData} 
                        colors={['#f97316', '#fb923c', '#fdba74', '#fed7aa', '#ffedd5']}
                        donut
                        showLegend
                        interactive
                        onClick={(data, index) => handleDataPointClick(data, index, "Task Categories")}
                      />
                    </Section>
                  </GlassMorphism>

                  <GlassMorphism className="rounded-2xl p-6 shadow-sm border-flow-border/30 scan-lines relative">
                    {renderChartActions("Regional Distribution", regionData, "pie", "#3b82f6")}
                    <Section 
                      title="Regional Distribution" 
                      icon={<Globe className="h-5 w-5" />} 
                      description="Distribution of activity by region"
                      noPadding
                    >
                      <PieChart 
                        data={regionData} 
                        colors={['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe']}
                        donut
                        showLegend
                        interactive
                        onClick={(data, index) => handleDataPointClick(data, index, "Regional Distribution")}
                      />
                    </Section>
                  </GlassMorphism>
                </div>
              </TabsContent>
            </Tabs>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                Key Findings & Recommendations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <GlassMorphism className="p-4 rounded-xl border-flow-border/20 hover:border-orange-500/20 transition-all">
                  <div className="flex items-start mb-2">
                    <div className="p-2 mr-3 rounded-full bg-orange-500/10">
                      <TrendingUp className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Productivity Trend</h3>
                      <p className="text-xs text-flow-foreground/60 mt-1">
                        Task completion efficiency has increased by 12% this month. 
                        Continue optimizing workflows for sustained growth.
                      </p>
                    </div>
                  </div>
                </GlassMorphism>

                <GlassMorphism className="p-4 rounded-xl border-flow-border/20 hover:border-purple-500/20 transition-all">
                  <div className="flex items-start mb-2">
                    <div className="p-2 mr-3 rounded-full bg-purple-500/10">
                      <Users className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">User Engagement</h3>
                      <p className="text-xs text-flow-foreground/60 mt-1">
                        User retention has improved to 87%. Consider implementing 
                        gamification to reach our 90% target.
                      </p>
                    </div>
                  </div>
                </GlassMorphism>

                <GlassMorphism className="p-4 rounded-xl border-flow-border/20 hover:border-blue-500/20 transition-all">
                  <div className="flex items-start mb-2">
                    <div className="p-2 mr-3 rounded-full bg-blue-500/10">
                      <Globe className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Market Expansion</h3>
                      <p className="text-xs text-flow-foreground/60 mt-1">
                        APAC region shows 32% growth potential. 
                        Consider allocating resources for expansion in this market.
                      </p>
                    </div>
                  </div>
                </GlassMorphism>
              </div>
            </section>
          </div>
        </TransitionWrapper>
      </main>
      
      <Footer />
      
      <Dialog open={!!expandedChart} onOpenChange={() => setExpandedChart(null)}>
        <DialogContent className="max-w-3xl h-[70vh] overflow-hidden p-0">
          <DialogHeader className="px-6 pt-4">
            <DialogTitle>{expandedChart?.title}</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-0 h-full flex flex-col">
            <div className="flex-grow min-h-0">
              {expandedChart?.type === 'line' && (
                <LineChart 
                  data={expandedChart.data} 
                  lineColor={expandedChart.color} 
                  showArea={true}
                  areaOpacity={0.2}
                  height={500}
                  referenceLineY={null}
                  referenceLineLabel=""
                  domain={null}
                  onClick={(data, index) => handleDataPointClick(data, index, expandedChart.title)}
                />
              )}
              {expandedChart?.type === 'bar' && (
                <BarChart 
                  data={expandedChart.data} 
                  height={500}
                />
              )}
              {expandedChart?.type === 'pie' && (
                <PieChart 
                  data={expandedChart.data} 
                  colors={[expandedChart.color, `${expandedChart.color}CC`, `${expandedChart.color}99`, `${expandedChart.color}66`, `${expandedChart.color}33`]}
                  donut
                  showLegend
                  interactive
                  height={500}
                  onClick={(data, index) => handleDataPointClick(data, index, expandedChart.title)}
                />
              )}
              {expandedChart?.type === 'area' && (
                <AreaChart 
                  data={expandedChart.data} 
                  height={500}
                />
              )}
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleExportData(expandedChart.title, expandedChart.data)}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleShareData(expandedChart.title)}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Analytics;
