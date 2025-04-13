
import React from 'react';
import { Card } from '@/components/ui/card';
import { Globe, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const GlobalMeshStatus: React.FC = () => {
  return (
    <Card className="p-4 border-flow-border/30 bg-black/30 backdrop-blur-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium neon-text-green flex items-center">
          <Globe className="mr-2 h-5 w-5 text-green-400" />
          Global Mesh Status
        </h3>
        <motion.div whileHover={{ x: 3 }} transition={{ type: 'spring', stiffness: 400 }}>
          <a href="#" className="text-xs text-flow-foreground/70 hover:text-flow-accent flex items-center">
            View Network <ChevronRight className="ml-1 h-3 w-3" />
          </a>
        </motion.div>
      </div>
      
      <div className="flex items-stretch gap-4">
        <div className="flex-grow relative overflow-hidden h-24 border border-flow-border/20 rounded-lg bg-black/20">
          <div className="absolute inset-0">
            {/* World map visualization */}
            <svg width="100%" height="100%" viewBox="0 0 800 400" className="opacity-20">
              <path d="M400,50 Q550,150 400,250 Q250,350 400,50" fill="none" stroke="rgba(99, 102, 241, 0.8)" strokeWidth="1" />
              <path d="M400,50 Q250,150 400,250 Q550,350 400,50" fill="none" stroke="rgba(236, 72, 153, 0.8)" strokeWidth="1" />
              
              {/* Nodes */}
              <motion.circle cx="400" cy="50" r="5" fill="#8b5cf6" 
                animate={{ r: [5, 8, 5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle cx="250" cy="150" r="4" fill="#ec4899" 
                animate={{ r: [4, 6, 4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />
              <motion.circle cx="400" cy="250" r="4" fill="#6366f1" 
                animate={{ r: [4, 7, 4] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
              />
              <motion.circle cx="550" cy="150" r="3" fill="#22c55e" 
                animate={{ r: [3, 5, 3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              />
              <motion.circle cx="550" cy="350" r="3" fill="#f97316" 
                animate={{ r: [3, 5, 3] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.8 }}
              />
              <motion.circle cx="250" cy="350" r="3" fill="#0ea5e9" 
                animate={{ r: [3, 5, 3] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: 0.3 }}
              />
            </svg>
            
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/5"></div>
            
            {/* Animated connection lines */}
            <svg width="100%" height="100%" className="absolute top-0 left-0">
              <motion.path 
                d="M400,50 Q550,150 400,250" 
                stroke="rgba(139, 92, 246, 0.5)"
                strokeWidth="1"
                strokeDasharray="5,5"
                fill="none"
                animate={{ strokeDashoffset: [0, -100] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.path 
                d="M400,50 Q250,150 400,250" 
                stroke="rgba(236, 72, 153, 0.5)"
                strokeWidth="1"
                strokeDasharray="5,5"
                fill="none"
                animate={{ strokeDashoffset: [0, -100] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>
          
          <div className="absolute top-2 left-3 text-xs font-medium text-flow-foreground/80">Global Agent Network</div>
        </div>
        
        <div className="w-72 bg-black/20 border border-flow-border/20 rounded-lg p-3">
          <div className="text-xs font-medium mb-2 text-flow-foreground/80">Mesh Updates</div>
          <div className="space-y-1.5">
            <div className="text-xs text-flow-foreground/70">
              <span className="text-indigo-400">⦿</span> Your agents received 2 upgrades from Mesh today
            </div>
            <div className="text-xs text-flow-foreground/70">
              <span className="text-green-400">⦿</span> Research Guild alignment: 86% compatibility
            </div>
            <div className="text-xs text-flow-foreground/70">
              <span className="text-amber-400">⦿</span> 24 agents in your network, 3 pending connections
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GlobalMeshStatus;
