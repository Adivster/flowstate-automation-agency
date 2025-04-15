
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SolarpunkPanel } from '@/components/ui/design-system/SolarpunkPanel';
import { Workflow, Zap, Play, Settings, Users, ActivitySquare, PlayCircle, PlusCircle } from 'lucide-react';
import PageHeader from '@/components/ui/design-system/PageHeader';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import ThemedBackground from '@/components/ui/ThemedBackground';
import WorkflowGrid from '@/components/workflows/WorkflowGrid';

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
            extendedTitle="Process Automation"
            description="Design, monitor, and optimize your automated task sequences."
            icon={<Workflow className="h-12 w-12 text-orange-400 drop-shadow-[0_0_15px_rgba(251,146,60,0.8)]" />}
            variant="workflows"
            glassEffect={true}
            actions={
              <div className="flex flex-wrap items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/20 text-orange-500 dark:text-orange-400"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Workflow
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/20 text-orange-500 dark:text-orange-400"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Run All
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/20 text-orange-500 dark:text-orange-400"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            }
          />
          
          <SolarpunkPanel
            accentColor="orange"
            className="p-5 md:p-8"
          >
            <WorkflowGrid />
          </SolarpunkPanel>
        </div>
      </main>
      
      <Footer />
    </ThemedBackground>
  );
};

export default Workflows;
