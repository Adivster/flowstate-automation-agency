
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AgencyDashboard from '@/components/dashboard/AgencyDashboard';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Zap } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-flow-background circuit-background">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1 mt-20 px-6">
        <TransitionWrapper>
          <div className="max-w-7xl mx-auto mb-6">
            <div className="flex items-center mb-4">
              <Zap className="h-7 w-7 mr-2 text-flow-accent" />
              <h1 className="text-3xl font-bold neon-text">Dashboard</h1>
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
