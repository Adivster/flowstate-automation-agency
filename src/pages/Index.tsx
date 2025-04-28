
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AgencyDashboard from '@/components/dashboard/AgencyDashboard';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { RefreshCw, AlertCircle, LayoutDashboard, LayoutGrid, Terminal } from 'lucide-react';
import PageHeader from '@/components/ui/design-system/PageHeader';
import { motion } from 'framer-motion';
import { QuickActionButton } from '@/components/ui/quick-action-button';
import ThemedBackground from '@/components/ui/ThemedBackground';
import { useDashboardActions } from '@/hooks/useDashboardActions';
import { ThemeSelector } from '@/components/ui/ThemeSelector'; 
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/theme-provider';
import { cn } from '@/lib/utils';
import { SolarpunkPanel } from '@/components/ui/design-system/SolarpunkPanel';
import CommunicationTerminal from '@/components/communication/CommunicationTerminal';
import '@/components/agents/office/styles/neon-effects.css';

const Index: React.FC = () => {
  const dashboardActions = useDashboardActions();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <ThemedBackground particleCount={80} withPatterns={true} className="cyber-background">
      <Navbar />
      
      <main className="flex-1 mt-24 px-4 sm:px-6 pb-12 overflow-hidden relative z-10">
        <PageHeader 
          title="Mission Control"
          extendedTitle="Real-Time Command Center"
          description="Discover opportunities, track performance, and optimize your operations."
          icon={<LayoutDashboard className="h-12 w-12 text-blue-400 dark:text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />}
          variant="dashboard"
          glassEffect={true}
          actions={
            <div className="flex flex-wrap items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className={cn(
                  isDark ? "cta-button-primary neon-border-cyan" : "bg-blue-500/10 border-blue-500/50 hover:bg-blue-500/20 text-blue-700"
                )}
                onClick={dashboardActions.handleOptimizeResources}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Metrics
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className={cn(
                  isDark ? "cta-button-secondary neon-border-magenta" : "bg-amber-500/10 border-amber-500/50 hover:bg-amber-500/20 text-amber-700"
                )}
                onClick={() => dashboardActions.handleSystemAlert("Viewing system alerts dashboard")}
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                View Alerts
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className={cn(
                  isDark ? "cta-button-primary neon-border-cyan" : "bg-blue-500/10 border-blue-500/50 hover:bg-blue-500/20 text-blue-700"
                )}
              >
                <LayoutGrid className="h-4 w-4 mr-2" />
                Customize Dashboard
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className={cn(
                  isDark ? "cta-button-secondary neon-border-purple" : "bg-purple-500/10 border-purple-500/50 hover:bg-purple-500/20 text-purple-700"
                )}
                onClick={dashboardActions.handleOpenCommandTerminal}
              >
                <Terminal className="h-4 w-4 mr-2" />
                Open CLI
              </Button>
            </div>
          }
        />
        
        <div className="max-w-7xl mx-auto">
          <SolarpunkPanel 
            accentColor={isDark ? 'blue' : 'blue'}
            className="overflow-hidden rounded-2xl shadow-xl"
            elevated
          >
            <div className={cn(
              "rounded-xl overflow-hidden",
              isDark 
                ? "bg-flow-background/40 backdrop-blur-xl scan-lines" 
                : "bg-gradient-to-br from-blue-50/80 via-white/90 to-blue-50/80 backdrop-blur-sm"
            )}>
              <AgencyDashboard />
            </div>
          </SolarpunkPanel>
        </div>
      </main>
      
      <Footer />
      
      {/* Communication Terminal */}
      <CommunicationTerminal />
      
      <style jsx global>{`
        .cyber-background {
          position: relative;
        }
        
        .cyber-background::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(125deg, 
            rgba(16, 16, 32, 0) 0%,
            rgba(6, 182, 212, 0.05) 25%, 
            rgba(139, 92, 246, 0.05) 50%,
            rgba(236, 72, 153, 0.05) 75%,
            rgba(16, 16, 32, 0) 100%
          );
          background-size: 400% 400%;
          animation: gradientPulse 15s ease infinite;
          pointer-events: none;
          z-index: 0;
        }
        
        @keyframes gradientPulse {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .cta-button-primary {
          background-color: rgba(6, 182, 212, 0.15);
          border-color: rgba(6, 182, 212, 0.3);
        }
        
        .cta-button-primary:hover {
          background-color: rgba(6, 182, 212, 0.25);
          border-color: rgba(6, 182, 212, 0.5);
          box-shadow: 0 0 12px rgba(6, 182, 212, 0.4);
        }
        
        .cta-button-secondary {
          background-color: rgba(192, 132, 252, 0.15);
          border-color: rgba(192, 132, 252, 0.3);
        }
        
        .cta-button-secondary:hover {
          background-color: rgba(192, 132, 252, 0.25);
          border-color: rgba(192, 132, 252, 0.5);
          box-shadow: 0 0 12px rgba(192, 132, 252, 0.4);
        }
      `}</style>
    </ThemedBackground>
  );
};

export default Index;
