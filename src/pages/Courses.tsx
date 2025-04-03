
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { useLanguage } from '@/contexts/LanguageContext';
import CoursesList from '@/components/courses/CoursesList';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { BookOpen, Zap } from 'lucide-react';

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
          <div className="max-w-7xl mx-auto mb-6">
            <div className="flex items-center mb-4">
              <BookOpen className="h-7 w-7 mr-2 text-flow-accent" />
              <h1 className="text-3xl font-bold neon-text">{t('courses')}</h1>
            </div>
            <p className="text-flow-foreground/70 max-w-2xl">
              Master AI agency management with our comprehensive professional training programs.
            </p>
          </div>
          
          <GlassMorphism className="rounded-2xl p-6 md:p-8 shadow-sm border-flow-border/30 scan-lines">
            <CoursesList />
          </GlassMorphism>
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
