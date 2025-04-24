
import React from 'react';
import { Zap, MousePointerClick, TrendingUp, MessageCircle, FileUp } from 'lucide-react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { Button } from '@/components/ui/button';
import { useDashboardActions } from '@/hooks/useDashboardActions';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const WelcomeHeader: React.FC = () => {
  const { handleAiConsult, handleStartWorkflow, handleQuickTask } = useDashboardActions();
  const { toast } = useToast();

  const handleHeroAction = (action: string) => {
    toast({
      title: "Let's uncover your next win!",
      description: `Opening ${action} interface...`,
      duration: 3000,
    });

    switch(action) {
      case 'chat':
        handleAiConsult();
        break;
      case 'spotlight':
        handleStartWorkflow();
        break;
      case 'ingest':
        handleQuickTask();
        break;
    }
  };

  return (
    <TransitionWrapper>
      <GlassMorphism 
        className="p-5 rounded-xl border-flow-accent/30 mb-4 relative overflow-hidden"
        variant="default"
      >
        {/* We'll move the gradient to a className instead of inline style */}
        <div className="absolute inset-0 bg-gradient-to-br from-flow-accent/7 to-purple-500/5 z-0"></div>
        
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
              Mission Control
            </h2>
          </div>
          
          <p className="text-flow-foreground/80 max-w-2xl">
            Your system is thriving at
            <span className="text-green-400 font-semibold"> 98% operational capacity</span>.
            Ready to uncover new opportunities?
          </p>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <Button 
              className="bg-gradient-to-r from-flow-accent/90 to-purple-500/90 hover:from-flow-accent hover:to-purple-500 text-flow-accent-foreground rounded-md border border-flow-accent/50 shadow-[0_0_10px_rgba(217,70,239,0.3)] transition-all duration-300 hover:scale-105"
              onClick={() => handleHeroAction('chat')}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat with FlowBot
            </Button>
            <Button 
              variant="outline" 
              className="border-flow-border/50 hover:border-flow-accent/50 hover:text-flow-accent transition-all duration-300"
              onClick={() => handleHeroAction('spotlight')}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Spotlight New Gains
            </Button>
            <Button 
              variant="outline" 
              className="border-flow-border/50 hover:border-flow-accent/50 hover:text-flow-accent transition-all duration-300"
              onClick={() => handleHeroAction('ingest')}
            >
              <FileUp className="w-4 h-4 mr-2" />
              Ingest & Enrich Docs
            </Button>
          </div>
          
          <div className="pt-3 mt-3 border-t border-flow-border/20 text-xs text-flow-foreground/60 flex justify-between items-center">
            <span>Last system update: Today at 09:34 AM</span>
            <Link to="/insights" className="text-flow-accent hover:text-flow-accent/80 flex items-center">
              View detailed insights
              <TrendingUp className="h-3 w-3 ml-1" />
            </Link>
          </div>
        </div>
      </GlassMorphism>
    </TransitionWrapper>
  );
};

export default WelcomeHeader;
