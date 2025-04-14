
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useKpiData } from '@/hooks/useKpiData';
import { Card } from '@/components/ui/card';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Brain, MoveUp, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { useToast } from '@/hooks/use-toast';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('7d');
  const kpiData = useKpiData(timeRange);
  const { toast } = useToast();
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  
  const handleAIAssistantToggle = () => {
    setShowAIAssistant(!showAIAssistant);
    if (!showAIAssistant) {
      toast({
        title: "AI Assistant Activated",
        description: "Your personal analytics assistant is now active and will provide real-time insights.",
      });
    }
  };
  
  return (
    <div className="p-4 space-y-6 relative">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
      >
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold tracking-tighter neon-text">Analytics Dashboard</h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 rounded-full border ${showAIAssistant ? 'bg-flow-accent text-white border-flow-accent' : 'border-flow-border/50'}`}
                    onClick={handleAIAssistantToggle}
                  >
                    <Brain className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    {showAIAssistant ? 'AI Assistant is active' : 'Activate AI Assistant for real-time insights'}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-flow-foreground/70 mt-1">
            Comprehensive insights and performance metrics for your agency
          </p>
        </div>
        <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
      </motion.div>

      {/* AI Assistant Top Recommendation */}
      {showAIAssistant && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <AIRecommendation
            title="Analytics Summary"
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
                link: "/analytics/what-if"
              }
            ]}
            className="mb-6"
          />
        </motion.div>
      )}

      {/* Main Content */}
      <div className="space-y-6">
        {/* Headline Metrics Section */}
        <section>
          <HeadlineMetrics data={kpiData} />
        </section>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* Performance Overview */}
          <GlassMorphism className="p-4 lg:col-span-1 xl:col-span-1 h-[400px]">
            <PerformanceOverview data={kpiData} timeRange={timeRange} />
          </GlassMorphism>

          {/* Campaign Performance */}
          <GlassMorphism className="p-4 lg:col-span-1 xl:col-span-1 h-[400px]">
            <CampaignPerformance data={kpiData} timeRange={timeRange} />
          </GlassMorphism>

          {/* Customer Retention */}
          <GlassMorphism className="p-4 lg:col-span-1 xl:col-span-1 h-[400px]">
            <CustomerRetention data={kpiData} timeRange={timeRange} />
          </GlassMorphism>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* AI Insights & Alerts */}
          <GlassMorphism className="p-4 lg:col-span-1 xl:col-span-1 h-[400px]">
            <AIInsights data={kpiData} timeRange={timeRange} />
          </GlassMorphism>

          {/* Engagement Dashboard */}
          <GlassMorphism className="p-4 lg:col-span-1 xl:col-span-1 h-[400px]">
            <EngagementDashboard data={kpiData} timeRange={timeRange} />
          </GlassMorphism>

          {/* Export & Reporting */}
          <GlassMorphism className="p-4 lg:col-span-1 xl:col-span-1 h-[400px]">
            <ExportOptions data={kpiData} timeRange={timeRange} />
          </GlassMorphism>
        </div>
      </div>
      
      {/* Floating AI Assistant Button (Persistent) */}
      <motion.div 
        className="fixed bottom-4 right-4 z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Button 
          variant="outline" 
          size="sm" 
          className={`rounded-full ${showAIAssistant ? 'bg-flow-accent text-white border-flow-accent' : 'bg-flow-background/70 border-flow-border/50'}`}
          onClick={handleAIAssistantToggle}
        >
          <Brain className="h-4 w-4 mr-2" />
          {showAIAssistant ? 'AI Assistant Active' : 'Activate AI Assistant'}
        </Button>
      </motion.div>
    </div>
  );
};

export default Analytics;
