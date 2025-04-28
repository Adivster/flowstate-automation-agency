import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AgencyDashboard from '@/components/dashboard/AgencyDashboard';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { RefreshCw, LayoutGrid, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/providers/theme-provider';
import { cn } from '@/lib/utils';
import { SolarpunkPanel } from '@/components/ui/design-system/SolarpunkPanel';
import CommunicationTerminal from '@/components/communication/CommunicationTerminal';
import '@/components/agents/office/styles/neon-effects.css';

const Index: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <Navbar />
      
      <main className="flex-1 mt-24 px-4 sm:px-6 pb-12 overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
            <div className="relative flex-grow max-w-md">
              <Input 
                placeholder="Search dashboard..." 
                className="h-8 w-full text-xs pl-8 bg-black/30 border-flow-border/30"
              />
              <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-flow-foreground/50" />
              <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 bg-flow-background/30 px-1 rounded text-[10px] text-flow-foreground/60">
                Ctrl+K
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className={cn(
                  isDark ? "bg-flow-accent/20 border-flow-accent/30 text-flow-accent" : "bg-blue-500/10 border-blue-500/50 hover:bg-blue-500/20 text-blue-700"
                )}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className={cn(
                  isDark ? "bg-purple-500/20 border-purple-500/30 text-purple-400" : "bg-purple-500/10 border-purple-500/50 hover:bg-purple-500/20 text-purple-700"
                )}
              >
                <LayoutGrid className="h-4 w-4 mr-2" />
                View
              </Button>
            </div>
          </div>

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

      <style>
        {`
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
        `}
      </style>
    </div>
  );
};

export default Index;
