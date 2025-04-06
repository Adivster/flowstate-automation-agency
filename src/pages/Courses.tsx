
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { useLanguage } from '@/contexts/LanguageContext';
import CoursesList from '@/components/courses/CoursesList';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { BookOpen } from 'lucide-react';
import PageHeader from '@/components/ui/design-system/PageHeader';

const Courses = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-flow-background text-flow-foreground flex flex-col circuit-background">
      <Helmet>
        <title>{t('courses')} | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-28 pb-12">
        <TransitionWrapper>
          <div className="max-w-7xl mx-auto">
            <PageHeader 
              title={t('courses')}
              description="Master AI agency management with our comprehensive professional training programs."
              icon={<BookOpen className="h-8 w-8 text-pink-600 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" />}
              glassEffect={false}
            />
            
            <GlassMorphism className="rounded-2xl p-6 md:p-8 shadow-sm border-flow-border/30 scan-lines">
              <CoursesList />
            </GlassMorphism>
          </div>
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
