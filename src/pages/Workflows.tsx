import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Workflow, Edit2, ActivitySquare, PlayCircle } from 'lucide-react';
import PageHeader from '@/components/ui/design-system/PageHeader';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import ThemedBackground from '@/components/ui/ThemedBackground';

const Workflows: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <ThemedBackground>
      <Helmet>
        <title>{t('workflows')} | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 mt-20 px-4 sm:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <PageHeader 
            title="Workflows"
            extendedTitle="Automated Processes"
            description="Design, monitor, and optimize your sequence of automated tasks."
            icon={<Workflow className="h-12 w-12 text-lime-400 dark:text-lime-400 drop-shadow-[0_0_15px_rgba(163,230,53,0.8)]" />}
            variant="workflows"
            glassEffect={true}
            actions={
              <div className="flex flex-wrap items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-lime-500/10 border-lime-500/50 hover:bg-lime-500/20 text-lime-500 dark:text-lime-400"
                >
                  <Workflow className="h-4 w-4 mr-2" />
                  Create Workflow
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-lime-500/10 border-lime-500/50 hover:bg-lime-500/20 text-lime-500 dark:text-lime-400"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Workflow
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-lime-500/10 border-lime-500/50 hover:bg-lime-500/20 text-lime-500 dark:text-lime-400"
                >
                  <ActivitySquare className="h-4 w-4 mr-2" />
                  Optimize
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-lime-500/10 border-lime-500/50 hover:bg-lime-500/20 text-lime-500 dark:text-lime-400"
                >
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Run Simulation
                </Button>
              </div>
            }
          />
          
          <GlassMorphism className="rounded-2xl p-6 md:p-8 shadow-sm border-flow-border/30 scan-lines">
            {/* Workflow content will go here */}
            <div className="text-center text-flow-foreground/70">
              <p>Workflow management interface coming soon...</p>
            </div>
          </GlassMorphism>
        </div>
      </main>
      
      <Footer />
    </ThemedBackground>
  );
};

export default Workflows;
