
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useKpiData } from '@/hooks/useKpiData';
import { Card } from '@/components/ui/card';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Brain, MoveUp, Info, Sparkles, Zap, Activity } from 'lucide-react';
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
    <div className="p-4 space-y-6 relative bg-grid-pattern">
      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-flow-accent to-cyan-400 animate-pulse-subtle"></div>
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-flow-accent to-purple-500 animate-pulse-subtle"></div>
      
      {/* Floating Particles */}
      <motion.div 
        className="fixed top-20 right-20 h-24 w-24 rounded-full bg-flow-accent/5 backdrop-blur-xl border border-flow-accent/20"
        animate={{ 
          y: [0, -15, 0], 
          boxShadow: ['0 0 10px rgba(147, 51, 234, 0.3)', '0 0 20px rgba(147, 51, 234, 0.5)', '0 0 10px rgba(147, 51, 234, 0.3)']
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="fixed bottom-40 left-20 h-16 w-16 rounded-full bg-cyan-400/5 backdrop-blur-xl border border-cyan-400/20"
        animate={{ 
          y: [0, 15, 0], 
          boxShadow: ['0 0 10px rgba(6, 182, 212, 0.3)', '0 0 20px rgba(6, 182, 212, 0.5)', '0 0 10px rgba(6, 182, 212, 0.3)']
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
      >
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold tracking-tighter neon-text-blue font-cyber">Analytics Dashboard</h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 rounded-full border neon-border ${
                      showAIAssistant ? 'bg-flow-accent text-white border-flow-accent animate-glow-pulse' : 'border-flow-border/50'
                    }`}
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
          <p className="text-flow-foreground/70 mt-1 font-ibm-mono">
            <span className="text-flow-accent animate-text-glow">Comprehensive insights</span> and performance metrics for your agency
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
            className="mb-6 animate-fade-in"
          />
        </motion.div>
      )}

      {/* Main Content */}
      <div className="space-y-6 relative z-10">
        {/* Headline Metrics Section */}
        <section>
          <HeadlineMetrics data={kpiData} />
        </section>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* Performance Overview */}
          <GlassMorphism 
            className="p-4 lg:col-span-1 xl:col-span-1 h-[400px] hover:neon-border-purple interactive-card"
            variant="accent"
            hoverEffect={true}
          >
            <PerformanceOverview data={kpiData} timeRange={timeRange} />
          </GlassMorphism>

          {/* Campaign Performance */}
          <GlassMorphism 
            className="p-4 lg:col-span-1 xl:col-span-1 h-[400px] hover:neon-border-green interactive-card"
            variant="accent"
            hoverEffect={true}
          >
            <CampaignPerformance data={kpiData} timeRange={timeRange} />
          </GlassMorphism>

          {/* Customer Retention */}
          <GlassMorphism 
            className="p-4 lg:col-span-1 xl:col-span-1 h-[400px] hover:neon-border-blue interactive-card"
            variant="accent"
            hoverEffect={true}
          >
            <CustomerRetention data={kpiData} timeRange={timeRange} />
          </GlassMorphism>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* AI Insights & Alerts */}
          <GlassMorphism 
            className="p-4 lg:col-span-1 xl:col-span-1 h-[400px] hover:neon-border-orange interactive-card scan-lines"
            variant="accent"
            hoverEffect={true}
          >
            <AIInsights data={kpiData} timeRange={timeRange} />
          </GlassMorphism>

          {/* Engagement Dashboard */}
          <GlassMorphism 
            className="p-4 lg:col-span-1 xl:col-span-1 h-[400px] hover:neon-border-purple interactive-card"
            variant="accent"
            hoverEffect={true}
          >
            <EngagementDashboard data={kpiData} timeRange={timeRange} />
          </GlassMorphism>

          {/* Export & Reporting */}
          <GlassMorphism 
            className="p-4 lg:col-span-1 xl:col-span-1 h-[400px] hover:neon-border-blue interactive-card"
            variant="accent"
            hoverEffect={true}
          >
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
          className={`rounded-full cyber-button ${
            showAIAssistant 
              ? 'bg-flow-accent/80 text-white border-flow-accent/80 animate-glow-pulse' 
              : 'bg-flow-background/30 border-flow-border/50'
          }`}
          onClick={handleAIAssistantToggle}
        >
          {showAIAssistant ? <Sparkles className="h-4 w-4 mr-2" /> : <Brain className="h-4 w-4 mr-2" />}
          {showAIAssistant ? 'AI Assistant Active' : 'Activate AI Assistant'}
        </Button>
      </motion.div>

      {/* Decorative Circuit Lines */}
      <svg className="fixed bottom-0 left-0 w-full h-full pointer-events-none z-0 opacity-10" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none">
        <path 
          d="M0,50 Q25,40 50,50 T100,50" 
          fill="none" 
          stroke="url(#gradient1)" 
          strokeWidth="0.2"
          className="animated-path"
        />
        <path 
          d="M0,30 Q25,50 50,30 T100,30" 
          fill="none" 
          stroke="url(#gradient2)" 
          strokeWidth="0.2"
          className="animated-path"
        />
        <path 
          d="M0,70 Q25,50 50,70 T100,70" 
          fill="none" 
          stroke="url(#gradient3)" 
          strokeWidth="0.2"
          className="animated-path"
        />
        
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Analytics;
