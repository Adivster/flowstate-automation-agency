
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { useLanguage } from '@/contexts/LanguageContext';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { BookOpen } from 'lucide-react';
import PageHeader from '@/components/ui/design-system/PageHeader';
import Section from '@/components/ui/design-system/Section';

const Knowledge = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-flow-background text-flow-foreground flex flex-col circuit-background">
      <Helmet>
        <title>{t('knowledge')} | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-28 pb-12">
        <TransitionWrapper>
          <div className="max-w-7xl mx-auto">
            <PageHeader 
              title={t('knowledge')}
              description="Access your agency's collective intelligence repository. Search, browse, and utilize AI-optimized knowledge documents."
              icon={<BookOpen className="h-8 w-8 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />}
              glassEffect={false}
            />
            
            <GlassMorphism className="rounded-2xl p-6 md:p-8 shadow-sm border-flow-border/30 scan-lines">
              <div className="text-center py-12">
                <h3 className="text-2xl font-semibold mb-3">Knowledge Base Content</h3>
                <p className="text-flow-foreground/70">Knowledge base content will be displayed here.</p>
              </div>
            </GlassMorphism>
          </div>
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Knowledge;
