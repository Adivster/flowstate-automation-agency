
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { ClipboardList, Plus, Edit2, UserPlus, CheckSquare } from 'lucide-react';
import PageHeader from '@/components/ui/design-system/PageHeader';
import TaskBoard from '@/components/tasks/TaskBoard';
import { useTheme } from 'next-themes';
import ThemedBackground from '@/components/ui/ThemedBackground';
import { TaskProvider } from '@/contexts/TaskContext';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

const Tasks: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { t } = useLanguage();
  
  return (
    <ThemedBackground>
      <Helmet>
        <title>{t('tasks')} | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1 mt-20 px-4 sm:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <PageHeader 
            title="Tasks"
            extendedTitle="Task Manager"
            description="Manage and execute your daily operations with ease."
            icon={<ClipboardList className="h-12 w-12 text-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />}
            variant="tasks"
            glassEffect={true}
            actions={
              <div className="flex flex-wrap items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-red-500/10 border-red-500/50 hover:bg-red-500/20 text-red-500 dark:text-red-400"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-red-500/10 border-red-500/50 hover:bg-red-500/20 text-red-500 dark:text-red-400"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Bulk Edit
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-red-500/10 border-red-500/50 hover:bg-red-500/20 text-red-500 dark:text-red-400"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Reassign
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-red-500/10 border-red-500/50 hover:bg-red-500/20 text-red-500 dark:text-red-400"
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Mark Complete
                </Button>
              </div>
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
