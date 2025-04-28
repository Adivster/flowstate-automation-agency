
import React from 'react';
import { Zap, MousePointerClick, TrendingUp, MessageCircle, FileUp, ChevronRight, Terminal } from 'lucide-react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { Button } from '@/components/ui/button';
import { useDashboardActions } from '@/hooks/useDashboardActions';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/providers/theme-provider';
import { cn } from '@/lib/utils';

const WelcomeHeader: React.FC = () => {
  const { handleAiConsult, handleStartWorkflow, handleQuickTask } = useDashboardActions();
  const { toast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
        className={cn(
          "p-5 rounded-xl border-flow-accent/30 mb-4 relative overflow-hidden",
          isDark && "cyberpunk-border"
        )}
        variant="default"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-flow-accent/7 to-purple-500/5 z-0"></div>
        
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
              className={cn(
                "mr-3 p-2 rounded-lg backdrop-blur-sm border",
                isDark 
                  ? "bg-flow-accent/20 border-flow-accent/30 neon-glow-cyan" 
                  : "bg-blue-500/20 border-blue-400/30"
              )}
            >
              <TrendingUp className={cn(
                "w-6 h-6",
                isDark ? "text-cyan-400" : "text-blue-500"
              )} />
            </motion.div>
            <div>
              <h2 className={cn(
                "text-2xl sm:text-3xl font-bold",
                isDark 
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-flow-foreground/70 neon-text-cyan"
                  : "text-gray-800"
              )}>
                Mission Control
              </h2>
              <p className={cn(
                "text-sm sm:text-base",
                isDark ? "text-gray-300" : "text-gray-600"
              )}>
                Real-Time Command Center
              </p>
            </div>
          </div>
          
          <p className={cn(
            "text-flow-foreground/80 max-w-2xl",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>
            Discover opportunities. Optimize operations. Celebrate wins.
            <span className={cn(
              "font-semibold",
              isDark ? "text-green-400 status-healthy" : "text-green-600"
            )}> 98% operational capacity</span>.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <Button 
              className={cn(
                "bg-gradient-to-r hover:scale-105 group relative overflow-hidden",
                isDark 
                  ? "from-flow-accent/90 to-purple-500/90 hover:from-flow-accent hover:to-purple-500 text-flow-accent-foreground rounded-md border border-flow-accent/50 shadow-[0_0_10px_rgba(217,70,239,0.3)] transition-all duration-300"
                  : "from-blue-500 to-purple-500 text-white shadow-md hover:shadow-lg"
              )}
              onClick={() => handleHeroAction('chat')}
            >
              {/* Terminal-style glowing icon */}
              <div className="mr-2 relative">
                <span className={cn(
                  "text-lg font-mono text-cyan-300 mr-0.5", 
                  isDark && "neon-text-cyan"
                )}>{">"}</span>
                <span className={cn(
                  "text-lg font-mono", 
                  isDark ? "text-purple-300 neon-text-magenta" : "text-purple-200"
                )}>_</span>
                
                {isDark && (
                  <motion.div 
                    className="absolute inset-0 blur-sm opacity-50"
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 1.5, 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <span className="text-lg font-mono text-cyan-300 mr-0.5">{">"}</span>
                    <span className="text-lg font-mono text-purple-300">_</span>
                  </motion.div>
                )}
              </div>
              
              {/* Button text */}
              <span className="relative z-10">Chat with FlowBot</span>
              
              {/* Animated background effect */}
              {isDark && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 0%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "linear",
                  }}
                  style={{ backgroundSize: "200% 100%" }}
                />
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className={cn(
                "border-flow-border/50 transition-all duration-300",
                isDark 
                  ? "hover:border-flow-accent/50 hover:text-flow-accent neon-border-cyan" 
                  : "hover:border-blue-500 hover:text-blue-600"
              )}
              onClick={() => handleHeroAction('spotlight')}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Spotlight New Gains
            </Button>
            <Button 
              variant="outline" 
              className={cn(
                "border-flow-border/50 transition-all duration-300",
                isDark 
                  ? "hover:border-flow-accent/50 hover:text-flow-accent neon-border-purple" 
                  : "hover:border-purple-500 hover:text-purple-600"
              )}
              onClick={() => handleHeroAction('ingest')}
            >
              <FileUp className="w-4 h-4 mr-2" />
              Ingest & Enrich Docs
            </Button>
          </div>
          
          <div className="pt-3 mt-3 border-t border-flow-border/20 text-xs text-flow-foreground/60 flex justify-between items-center">
            <span>Last system update: Today at 09:34 AM</span>
            <Link to="/insights" className={cn(
              "flex items-center",
              isDark 
                ? "text-flow-accent hover:text-flow-accent/80 neon-text-cyan" 
                : "text-blue-600 hover:text-blue-700"
            )}>
              View detailed insights
              <ChevronRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
        </div>
      </GlassMorphism>
    </TransitionWrapper>
  );
};

export default WelcomeHeader;
