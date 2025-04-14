
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useKpiData } from '@/hooks/useKpiData';
import { Card } from '@/components/ui/card';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import HeadlineMetrics from '@/components/analytics/HeadlineMetrics';
import TimeRangeSelector from '@/components/analytics/TimeRangeSelector';
import PerformanceOverview from '@/components/analytics/PerformanceOverview';
import CampaignPerformance from '@/components/analytics/CampaignPerformance';
import CustomerRetention from '@/components/analytics/CustomerRetention';
import AIInsights from '@/components/analytics/AIInsights';
import EngagementDashboard from '@/components/analytics/EngagementDashboard';
import ExportOptions from '@/components/analytics/ExportOptions';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('7d');
  const kpiData = useKpiData(timeRange);
  
  return (
    <div className="p-4 space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tighter neon-text">Analytics Dashboard</h1>
          <p className="text-flow-foreground/70 mt-1">
            Comprehensive insights and performance metrics for your agency
          </p>
        </div>
        <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
      </motion.div>

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
    </div>
  );
};

export default Analytics;
