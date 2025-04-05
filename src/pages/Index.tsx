
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AgencyDashboard from '@/components/dashboard/AgencyDashboard';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { LayoutDashboard } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-flow-background circuit-background">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1 mt-20 px-6">
        <TransitionWrapper>
          <div className="max-w-7xl mx-auto mb-6">
            <div className="flex items-center mb-4">
              <div className="mr-4 bg-flow-accent/20 p-3 rounded-xl backdrop-blur-sm border border-flow-accent/30">
                <LayoutDashboard className="h-8 w-8 text-flow-accent drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]" />
              </div>
              <h1 className="text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Dashboard</h1>
            </div>
            <p className="text-flow-foreground/70 max-w-2xl">
              Welcome to your Agency HQ. Monitor performance, manage divisions, and optimize workflows from this central command center.
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <GlassMorphism className="rounded-2xl p-6 md:p-8 shadow-sm border-flow-border/30 scan-lines">
              <AgencyDashboard />
            </GlassMorphism>
          </div>
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
