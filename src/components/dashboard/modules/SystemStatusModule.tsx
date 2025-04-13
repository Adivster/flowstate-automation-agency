
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface SystemStatusModuleProps {
  systemHealth: number;
}

const SystemStatusModule: React.FC<SystemStatusModuleProps> = ({ systemHealth }) => {
  return (
    <Card className="p-4 border-flow-border/30 bg-black/30 backdrop-blur-md overflow-hidden relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium neon-text-blue flex items-center">
          <Shield className="mr-2 h-5 w-5 text-cyan-400" />
          System Status
        </h3>
        <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-black/20 rounded-md p-2 text-center">
          <div className="text-xs text-flow-foreground/60">CPU</div>
          <div className="text-sm font-mono font-bold text-cyan-300">28%</div>
          <div className="w-full bg-flow-border/20 h-1.5 mt-1 rounded-full overflow-hidden">
            <motion.div 
              className="bg-cyan-500 h-full rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "28%" }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
        <div className="bg-black/20 rounded-md p-2 text-center">
          <div className="text-xs text-flow-foreground/60">Memory</div>
          <div className="text-sm font-mono font-bold text-cyan-300">42%</div>
          <div className="w-full bg-flow-border/20 h-1.5 mt-1 rounded-full overflow-hidden">
            <motion.div 
              className="bg-cyan-500 h-full rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "42%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>
        </div>
        <div className="bg-black/20 rounded-md p-2 text-center">
          <div className="text-xs text-flow-foreground/60">Network</div>
          <div className="text-sm font-mono font-bold text-cyan-300">14%</div>
          <div className="w-full bg-flow-border/20 h-1.5 mt-1 rounded-full overflow-hidden">
            <motion.div 
              className="bg-cyan-500 h-full rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "14%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
      
      <div className="h-24 relative mb-1">
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-5 gap-0.5">
          {[...Array(50)].map((_, i) => {
            const activity = Math.random();
            let bgClass = "bg-flow-background/20";
            if (activity > 0.8) bgClass = "bg-green-500/40";
            else if (activity > 0.6) bgClass = "bg-green-500/20";
            return (
              <div 
                key={i} 
                className={`rounded-sm ${bgClass}`}
                style={{
                  animation: activity > 0.6 ? `pulse-subtle ${2 + Math.random() * 3}s infinite` : 'none'
                }}
              ></div>
            );
          })}
        </div>
        <div className="absolute top-0 left-0 text-xs text-flow-foreground/50">Agent Runtime</div>
      </div>
      
      <div className="text-xs text-right text-flow-foreground/50">
        System Health: {systemHealth.toFixed(1)}% • Uptime: 18d 7h 42m
      </div>
      
      {/* Live pulse indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5">
        <motion.div 
          className="h-full bg-cyan-500" 
          animate={{
            width: ["0%", "100%", "0%"],
            opacity: [0, 1, 0],
            x: ["0%", "0%", "100%"]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Add subtle scan lines effect */}
      <div className="absolute inset-0 scan-lines pointer-events-none opacity-30"></div>
    </Card>
  );
};

export default SystemStatusModule;
