
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { useLanguage } from '@/contexts/LanguageContext';
import CoursesList from '@/components/courses/CoursesList';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { BookOpen, GraduationCap, ListChecks, UserPlus, Lightbulb } from 'lucide-react';
import PageHeader from '@/components/ui/design-system/PageHeader';
import { Button } from '@/components/ui/button';

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
              extendedTitle="Learning Hub"
              description="Enhance your skills and master AI agency management."
              icon={<GraduationCap className="h-12 w-12 text-orange-400 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]" />}
              variant="courses"
              glassEffect={true}
              actions={
                <div className="flex flex-wrap items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/20 text-orange-500 dark:text-orange-400"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse Courses
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/20 text-orange-500 dark:text-orange-400"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Enroll Now
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/20 text-orange-500 dark:text-orange-400"
                  >
                    <ListChecks className="h-4 w-4 mr-2" />
                    View Progress
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/20 text-orange-500 dark:text-orange-400"
                  >
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Ask AI
                  </Button>
                </div>
              }
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
