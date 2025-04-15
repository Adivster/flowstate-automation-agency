
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { ClipboardList, Leaf } from 'lucide-react';
import PageHeader from '@/components/ui/design-system/PageHeader';
import TaskBoard from '@/components/tasks/TaskBoard';
import { useTheme } from 'next-themes';
import ThemedBackground from '@/components/ui/ThemedBackground';
import { TaskProvider } from '@/contexts/TaskContext';

const Tasks: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <ThemedBackground>
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1 mt-20 px-4 sm:px-6 pb-12">
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
            className={`rounded-2xl p-5 md:p-8 shadow-md hover-scale ${
              isDark 
                ? 'border-flow-border/30 scan-lines bg-flow-background/20 backdrop-blur-lg'
                : 'border-emerald-200/50 eco-card bg-gradient-to-br from-white/60 to-emerald-50/40'
            }`}
          >
            <TaskProvider>
              <TaskBoard />
            </TaskProvider>
          </GlassMorphism>
        </div>
      </main>
      
      <Footer />
    </ThemedBackground>
  );
};

export default Tasks;
