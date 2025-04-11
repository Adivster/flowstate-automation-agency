
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AgencyDashboard from '@/components/dashboard/AgencyDashboard';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { LayoutDashboard } from 'lucide-react';
import PageHeader from '@/components/ui/design-system/PageHeader';
import { motion } from 'framer-motion';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-flow-background circuit-background">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1 mt-8 px-4 sm:px-6 pb-12 overflow-hidden relative">
        {/* Ambient background effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div
            className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, rgba(139, 92, 246, 0) 70%)" }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(219, 39, 119, 0.05) 0%, rgba(219, 39, 119, 0) 70%)" }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          
          {/* Grid lines */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          {/* Particle drift effect */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-indigo-500/20"
                style={{
                  width: Math.random() * 8 + 2 + 'px',
                  height: Math.random() * 8 + 2 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                }}
                animate={{
                  x: [
                    0, 
                    Math.random() * 40 - 20,
                    Math.random() * 40 - 20,
                    0
                  ],
                  y: [
                    0,
                    Math.random() * 40 - 20,
                    Math.random() * 40 - 20,
                    0
                  ],
                  opacity: [0.7, 0.9, 0.7]
                }}
                transition={{ 
                  duration: Math.random() * 20 + 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      
        <TransitionWrapper>
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PageHeader 
                title="Mission Control"
                description="Welcome to your Agency HQ. Monitor performance, manage divisions, and optimize workflows from this central command center."
                icon={<LayoutDashboard className="h-8 w-8 text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" />}
                className="mb-4"
              />
            </motion.div>
            
            <GlassMorphism 
              className="rounded-2xl shadow-xl border-flow-border/30 scan-lines bg-flow-background/20 backdrop-blur-lg overflow-hidden"
              style={{
                boxShadow: "0 10px 30px -10px rgba(139, 92, 246, 0.3)",
                backgroundImage: "radial-gradient(circle at top right, rgba(139, 92, 246, 0.05), transparent 500px)"
              }}
            >
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
