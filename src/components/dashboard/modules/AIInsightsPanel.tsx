
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ChevronDown, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AIInsightsPanel: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <Card className="p-4 border-flow-border/30 bg-black/30 backdrop-blur-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium neon-text-pink flex items-center">
          <Brain className="mr-2 h-5 w-5 text-pink-400" />
          AI Insights
        </h3>
        <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      
      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div 
          className="bg-black/20 border border-pink-500/20 rounded-md p-3 animate-pulse-subtle shadow-[0_0_10px_rgba(236,72,153,0.1)]"
          variants={itemVariants}
        >
          <div className="flex items-start justify-between">
            <div className="flex-grow">
              <div className="flex items-center">
                <span className="text-xs font-semibold text-pink-400">High Priority</span>
                <div className="ml-2 h-1.5 w-1.5 rounded-full bg-pink-500"></div>
              </div>
              <p className="text-sm my-1">Workflow bottleneck in compliance division</p>
              <div className="h-8 w-32">
                {/* Mini sparkline chart would go here */}
                <div className="h-full w-full flex items-end">
                  {[...Array(10)].map((_, i) => {
                    const height = Math.max(10, Math.random() * 100);
                    return (
                      <motion.div
                        key={i}
                        className="flex-1 bg-pink-500/50 mx-0.5 rounded-t-sm"
                        style={{ height: '10%' }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                      ></motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-black/20 border border-green-500/20 rounded-md p-3 shadow-[0_0_10px_rgba(34,197,94,0.1)]"
          variants={itemVariants}
        >
          <div className="flex items-start justify-between">
            <div className="flex-grow">
              <div className="flex items-center">
                <span className="text-xs font-semibold text-green-400">Medium Priority</span>
                <div className="ml-2 h-1.5 w-1.5 rounded-full bg-green-500"></div>
              </div>
              <p className="text-sm my-1">Response time improved 24% since last tuning</p>
              <div className="h-8 w-32">
                <div className="h-full w-full flex items-end">
                  {[...Array(10)].map((_, i) => {
                    // Trend showing improvement
                    const height = 30 + i * 7 + (Math.random() * 10 - 5);
                    return (
                      <motion.div
                        key={i}
                        className="flex-1 bg-green-500/50 mx-0.5 rounded-t-sm"
                        style={{ height: '10%' }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                      ></motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-black/20 border border-indigo-500/20 rounded-md p-3 shadow-[0_0_10px_rgba(99,102,241,0.1)]"
          variants={itemVariants}
        >
          <div className="flex items-start justify-between">
            <div className="flex-grow">
              <div className="flex items-center">
                <span className="text-xs font-semibold text-indigo-400">Insight</span>
                <div className="ml-2 h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
              </div>
              <p className="text-sm my-1">Knowledge Base needs indexing - 218 untagged entries</p>
              <div className="flex mt-1">
                <div className="text-xs text-indigo-300 font-mono">
                  Last scan: 2h ago
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <Button variant="ghost" size="sm" className="w-full text-xs">
          View All Insights <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
      </motion.div>
    </Card>
  );
};

export default AIInsightsPanel;
