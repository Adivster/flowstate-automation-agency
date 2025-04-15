
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useKpiData } from '@/hooks/useKpiData';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { Card } from '@/components/ui/card';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Brain, MoveUp, Info, Sparkles, Zap, Activity, BarChart } from 'lucide-react';
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
import PageHeader from '@/components/ui/design-system/PageHeader';
import { useTheme } from 'next-themes';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('7d');
  const kpiData = useKpiData(timeRange);
  const { toast } = useToast();
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const handleAIAssistantToggle = () => {
    setShowAIAssistant(!showAIAssistant);
    if (!showAIAssistant) {
      toast({
        title: "AI Assistant Activated",
        description: "Your personal analytics assistant is now active and will provide real-time insights.",
      });
    }
  };
  
  // Background patterns based on theme
  const backgroundPattern = isDark 
    ? 'circuit-background' 
    : 'bg-gradient-to-br from-amber-50/70 to-emerald-50/70 leaf-pattern';
  
  return (
    <div className={`min-h-screen flex flex-col bg-flow-background ${backgroundPattern}`}>
      <Navbar />
      
      {/* Decorative floating elements for solarpunk theme */}
      {!isDark && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-b from-amber-200/20 to-emerald-200/20"
              style={{
                width: Math.random() * 120 + 40 + 'px',
                height: Math.random() * 120 + 40 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, Math.random() * -30 - 10, 0],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ 
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          ))}
        </div>
      )}
      
      {/* Main Content */}
      <main className="flex-1 mt-20 px-4 sm:px-6 pb-12">
        <TransitionWrapper>
          <div className="max-w-7xl mx-auto">
            <PageHeader 
              title="Analytics"
              description="Comprehensive insights and performance metrics for your agency. Monitor campaign effectiveness, customer engagement, and growth trends."
              icon={isDark 
                ? <BarChart className="h-8 w-8 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                : <BarChart className="h-8 w-8 text-emerald-600 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              }
            />
            
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
                className={`rounded-full ${
                  isDark
                    ? `cyber-button ${showAIAssistant ? 'bg-flow-accent/80 text-white border-flow-accent/80 animate-glow-pulse' : 'bg-flow-background/30 border-flow-border/50'}`
                    : `solar-button ${showAIAssistant ? 'bg-emerald-500/80 text-white border-emerald-400 animate-glow-pulse' : 'bg-white/70 border-emerald-200'}`
                }`}
                onClick={handleAIAssistantToggle}
              >
                {showAIAssistant ? 
                  <Sparkles className="h-4 w-4 mr-2" /> : 
                  <Brain className="h-4 w-4 mr-2" />
                }
                {showAIAssistant ? 'AI Assistant Active' : 'Activate AI Assistant'}
              </Button>
            </motion.div>
          </div>
        </TransitionWrapper>
      </main>
      
      <Footer />
      
      {/* Decorative Circuit Lines for dark theme */}
      {isDark && (
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
      )}

      {/* Decorative organic patterns for light theme */}
      {!isDark && (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0 organic-pattern opacity-30"></div>
      )}
    </div>
  );
};

export default Analytics;
