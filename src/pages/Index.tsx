
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AgencyDashboard from '@/components/dashboard/AgencyDashboard';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { LayoutDashboard } from 'lucide-react';
import PageHeader from '@/components/ui/design-system/PageHeader';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-flow-background circuit-background">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1 mt-20 px-4 sm:px-6 pb-12">
        <TransitionWrapper>
          <div className="max-w-7xl mx-auto">
            <PageHeader 
              title="Dashboard"
              description="Welcome to your Agency HQ. Monitor performance, manage divisions, and optimize workflows from this central command center."
              icon={<LayoutDashboard className="h-8 w-8 text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />}
            />
            
            <GlassMorphism className="rounded-2xl p-5 md:p-8 shadow-md border-flow-border/30 scan-lines bg-flow-background/20 backdrop-blur-lg">
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
