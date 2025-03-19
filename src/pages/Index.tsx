
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AgencyDashboard from '@/components/dashboard/AgencyDashboard';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { GlassMorphism } from '@/components/ui/GlassMorphism';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-flow-background">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1 mt-20 px-6">
        <div className="max-w-7xl mx-auto">
          <TransitionWrapper>
            <GlassMorphism className="rounded-2xl p-6 md:p-8 shadow-sm">
              <AgencyDashboard />
            </GlassMorphism>
          </TransitionWrapper>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
