
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { useLanguage } from '@/contexts/LanguageContext';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { BarChart2, TrendingUp, PieChart as PieChartIcon, Activity } from 'lucide-react';
import PageHeader from '@/components/ui/design-system/PageHeader';
import Section from '@/components/ui/design-system/Section';
import { AreaChart, BarChart, LineChart, PieChart } from '@/components/ui/chart';

const Analytics = () => {
  const { t } = useLanguage();
  
  // Sample data for the charts
  const performanceData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 500 },
    { name: "Jun", value: 750 },
    { name: "Jul", value: 900 },
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <GlassMorphism className="rounded-2xl p-6 shadow-sm border-flow-border/30 scan-lines">
                <Section 
                  title="Performance Overview" 
                  icon={<TrendingUp className="h-5 w-5" />} 
                  description="Monthly performance metrics for your agency"
                  noPadding
                >
                  <LineChart 
                    data={performanceData} 
                    lineColor="#f97316" 
                    dotColor="#fef3c7" 
                  />
                </Section>
              </GlassMorphism>

              <GlassMorphism className="rounded-2xl p-6 shadow-sm border-flow-border/30 scan-lines">
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
                  />
                </Section>
              </GlassMorphism>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassMorphism className="rounded-2xl p-6 shadow-sm border-flow-border/30 scan-lines">
                <Section 
                  title="Client Engagement" 
                  icon={<Activity className="h-5 w-5" />} 
                  description="Weekly engagement metrics with clients"
                  noPadding
                >
                  <AreaChart data={engagementData} />
                </Section>
              </GlassMorphism>
              
              <GlassMorphism className="rounded-2xl p-6 shadow-sm border-flow-border/30 scan-lines">
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
          </div>
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analytics;
