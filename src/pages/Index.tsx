
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AgencyDashboard from '@/components/dashboard/AgencyDashboard';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { LayoutDashboard, PlayCircle, UserPlus, Building2, Terminal } from 'lucide-react';
import PageHeader from '@/components/ui/design-system/PageHeader';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ThemedBackground from '@/components/ui/ThemedBackground';
import { useDashboardActions } from '@/hooks/useDashboardActions';
import CommunicationTerminal from '@/components/communication/CommunicationTerminal';
import ThemeSelector from '@/components/ui/ThemeSelector';

const Index: React.FC = () => {
  const [theme, setTheme] = useState<'default' | 'retro' | 'vapor' | 'tactical'>('default');
  const dashboardActions = useDashboardActions();
  
  return (
    <ThemedBackground>
      <Navbar />
      
      <main className="flex-1 mt-20 px-4 sm:px-6 pb-12 overflow-hidden relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between mb-8 max-w-7xl mx-auto"
        >
          <PageHeader 
            title="Mission Control"
            description="Welcome to your Agency HQ. Monitor performance, manage divisions, and optimize workflows from this central command center."
            icon={<LayoutDashboard className="h-8 w-8 text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" />}
          />
          
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <ThemeSelector />
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-black/20 border-flow-border/30 text-xs"
              onClick={dashboardActions.handleStartWorkflow}
            >
              <PlayCircle className="h-3.5 w-3.5 mr-1.5 text-cyan-400" />
              Start Workflow
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-black/20 border-flow-border/30 text-xs"
              onClick={dashboardActions.handleCreateAgent}
            >
              <UserPlus className="h-3.5 w-3.5 mr-1.5 text-green-400" />
              Deploy Agent
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-black/20 border-flow-border/30 text-xs"
              onClick={dashboardActions.handleCreateDivision}
            >
              <Building2 className="h-3.5 w-3.5 mr-1.5 text-yellow-400" />
              Create Division
            </Button>
          </div>
        </motion.div>
        
        <div className="max-w-7xl mx-auto">
          <GlassMorphism 
            className="rounded-2xl shadow-xl border-flow-border/30 scan-lines bg-flow-background/20 backdrop-blur-lg overflow-hidden bg-glassmorphism-gradient"
          >
            <AgencyDashboard />
          </GlassMorphism>
        </div>
      </main>
      
      <Footer />
      <CommunicationTerminal />
    </ThemedBackground>
  );
};

export default Index;
