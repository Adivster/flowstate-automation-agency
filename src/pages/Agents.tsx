
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AgentGrid from '@/components/agents/AgentGrid';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cpu, Users, Briefcase, BookOpen, MessageCircle } from 'lucide-react';
import OfficeFloorPlan from '@/components/agents/OfficeFloorPlan';
import CommandTerminal from '@/components/agents/CommandTerminal';
import AgencyMetrics from '@/components/agents/AgencyMetrics';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import AgentCommunicationBot from '@/components/agents/AgentCommunicationBot';
import CoursesList from '@/components/courses/CoursesList';

const Agents = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className={`min-h-screen bg-flow-background text-flow-foreground flex flex-col cyber-grid ${isRTL ? 'rtl' : 'ltr'}`}>
      <Helmet>
        <title>{t('agents')} | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-28 pb-12">
        <TransitionWrapper>
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1 neon-text">{t('agencyHQ')}</h1>
              <p className="text-flow-foreground/70">
                {t('monitorAgents')}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center gap-2">
              <div className="text-xs bg-flow-muted/50 px-3 py-1.5 rounded-full flex items-center">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
                24 {t('activeAgents')}
              </div>
              <LanguageSwitcher />
            </div>
          </div>
          
          <Tabs defaultValue="office" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-4 neon-border">
              <TabsTrigger value="office" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">{t('officeView')}</span>
              </TabsTrigger>
              <TabsTrigger value="agents" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">{t('agentList')}</span>
              </TabsTrigger>
              <TabsTrigger value="metrics" className="flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                <span className="hidden sm:inline">{t('systemMetrics')}</span>
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">{t('courses')}</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="office" className="space-y-6">
              <div className="text-sm text-flow-foreground/60 mb-4">
                {t('interactiveOffice')}
              </div>
              
              <OfficeFloorPlan />
              
              <div className="flex justify-between items-center mt-2">
                <div className="text-xs text-flow-foreground/60">
                  <span className="text-flow-accent">{t('proTip')}</span> {t('openTerminal')}
                </div>
                <button 
                  className="text-xs flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition-colors"
                  onClick={() => document.getElementById('communication-bot')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <MessageCircle className="h-3 w-3" />
                  {t('openChat')}
                </button>
              </div>
            </TabsContent>
            
            <TabsContent value="agents" className="space-y-6">
              <div className="text-sm text-flow-foreground/60 mb-4">
                {t('allActiveAgents')}
              </div>
              
              <AgentGrid />
            </TabsContent>
            
            <TabsContent value="metrics" className="space-y-6">
              <div className="text-sm text-flow-foreground/60 mb-4">
                {t('performanceMetrics')}
              </div>
              
              <AgencyMetrics />
            </TabsContent>
            
            <TabsContent value="courses" className="space-y-6">
              <div className="text-sm text-flow-foreground/60 mb-4">
                {t('courseDescription')}
              </div>
              
              <CoursesList />
            </TabsContent>
          </Tabs>
          
          <div id="communication-bot" className="mt-10">
            <AgentCommunicationBot />
          </div>
        </TransitionWrapper>
      </main>
      
      <CommandTerminal />
      
      <Footer />
    </div>
  );
};

export default Agents;
