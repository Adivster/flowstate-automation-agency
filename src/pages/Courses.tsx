
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { useLanguage } from '@/contexts/LanguageContext';
import CoursesList from '@/components/courses/CoursesList';

const Courses = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className={`min-h-screen bg-flow-background text-flow-foreground flex flex-col cyber-grid ${isRTL ? 'rtl' : 'ltr'}`}>
      <Helmet>
        <title>{t('courses')} | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-28 pb-12">
        <TransitionWrapper>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-1 neon-text">{t('courses')}</h1>
            <p className="text-flow-foreground/70">
              Master AI agency management with our comprehensive courses
            </p>
          </div>
          
          <CoursesList />
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
