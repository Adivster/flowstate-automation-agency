
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { ClipboardList, Leaf } from 'lucide-react';
import PageHeader from '@/components/ui/design-system/PageHeader';
import TaskBoard from '@/components/tasks/TaskBoard';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

const Tasks: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Background patterns based on theme
  const backgroundPattern = isDark 
    ? 'circuit-background' 
    : 'bg-gradient-to-br from-amber-50/70 to-emerald-50/70 leaf-pattern';
    
  return (
    <div className={`min-h-screen flex flex-col bg-flow-background ${backgroundPattern}`}>
      <Navbar />
      
      {/* Decorative floating elements for solarpunk theme */}
      {!isDark && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-b from-amber-200/20 to-emerald-200/20"
              style={{
                width: Math.random() * 120 + 40 + 'px',
                height: Math.random() * 120 + 40 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, Math.random() * -30 - 10, 0],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ 
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          ))}
        </div>
      )}
      
      {/* Main Content */}
      <main className="flex-1 mt-20 px-4 sm:px-6 pb-12">
        <TransitionWrapper>
          <div className="max-w-7xl mx-auto">
            <PageHeader 
              title="Tasks"
              description="Manage your agency's tasks, assignments, and deadlines from this central hub."
              icon={isDark 
                ? <ClipboardList className="h-8 w-8 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                : <Leaf className="h-8 w-8 text-emerald-600 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              }
            />
            
            <GlassMorphism 
              className={`rounded-2xl p-5 md:p-8 shadow-md ${
                isDark 
                  ? 'border-flow-border/30 scan-lines bg-flow-background/20 backdrop-blur-lg'
                  : 'border-emerald-200/50 eco-card bg-gradient-to-br from-white/60 to-emerald-50/40'
              }`}
            >
              <TaskBoard />
            </GlassMorphism>
          </div>
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tasks;
