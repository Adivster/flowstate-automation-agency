
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { useLanguage } from '@/contexts/LanguageContext';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { BarChart2 } from 'lucide-react';
import PageHeader from '@/components/ui/design-system/PageHeader';
import Section from '@/components/ui/design-system/Section';

const Analytics = () => {
  const { t } = useLanguage();
  
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
            
            <GlassMorphism className="rounded-2xl p-6 md:p-8 shadow-sm border-flow-border/30 scan-lines">
              <div className="text-center py-12">
                <h3 className="text-2xl font-semibold mb-3">Analytics Content</h3>
                <p className="text-flow-foreground/70">Performance metrics and charts will be displayed here.</p>
              </div>
            </GlassMorphism>
          </div>
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analytics;
