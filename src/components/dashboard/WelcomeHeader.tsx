
import React from 'react';
import { Zap, MousePointerClick, UserPlus, TrendingUp } from 'lucide-react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { Button } from '@/components/ui/button';
import { useDashboardActions } from '@/hooks/useDashboardActions';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WelcomeHeader: React.FC = () => {
  const { handleCreateAgent, handleStartWorkflow, handleQuickTask } = useDashboardActions();

  return (
    <TransitionWrapper>
      <GlassMorphism 
        className="p-5 rounded-xl border-flow-accent/30 mb-4 relative overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(139, 92, 246, 0.07) 0%, rgba(217, 70, 239, 0.05) 100%)',
        }}
      >
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-0 right-0 w-64 h-64 bg-flow-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="relative z-10 space-y-3">
          <div className="flex items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mr-3 p-2 bg-flow-accent/20 rounded-lg backdrop-blur-sm border border-flow-accent/30"
            >
              <TrendingUp className="w-6 h-6 text-flow-accent" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-flow-foreground/70">
              FlowState Business Agency
            </h2>
          </div>
          
          <p className="text-flow-foreground/80 max-w-2xl">
            AI-powered automation for your growing business. Your system is running at optimal efficiency with 
            <span className="text-green-400 font-semibold"> 98% operational capacity</span>.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <Button 
              className="bg-gradient-to-r from-flow-accent/90 to-purple-500/90 hover:from-flow-accent hover:to-purple-500 text-flow-accent-foreground rounded-md border border-flow-accent/50 shadow-[0_0_10px_rgba(217,70,239,0.3)] transition-all duration-300 hover:scale-105"
              onClick={handleStartWorkflow}
            >
              <Zap className="w-4 h-4 mr-2" />
              Start New Workflow
            </Button>
            <Button 
              variant="outline" 
              className="border-flow-border/50 hover:border-flow-accent/50 hover:text-flow-accent transition-all duration-300"
              onClick={handleQuickTask}
            >
              <MousePointerClick className="w-4 h-4 mr-2" />
              Quick Task Creation
            </Button>
            <Button 
              variant="outline" 
              className="border-flow-border/50 hover:border-flow-accent/50 hover:text-flow-accent transition-all duration-300"
              onClick={handleCreateAgent}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              New Agent
            </Button>
          </div>
          
          <div className="pt-3 mt-3 border-t border-flow-border/20 text-xs text-flow-foreground/60 flex justify-between items-center">
            <span>Last system update: Today at 09:34 AM</span>
            <Link to="/analytics" className="text-flow-accent hover:text-flow-accent/80 flex items-center">
              View detailed analytics
              <TrendingUp className="h-3 w-3 ml-1" />
            </Link>
          </div>
        </div>
      </GlassMorphism>
    </TransitionWrapper>
  );
};

export default WelcomeHeader;
