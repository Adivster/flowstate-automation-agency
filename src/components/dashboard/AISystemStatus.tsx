
import React, { useState } from 'react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { 
  ActivityIcon, 
  BrainCircuit, 
  Cpu, 
  Heart, 
  CircleAlert, 
  BatteryFull, 
  Zap, 
  Shield,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const AISystemStatus: React.FC = () => {
  // Mock data - in a real application, this would come from an API
  const systemHealth = 98;
  const activeProcesses = 14;
  const [expanded, setExpanded] = useState(false);
  const { toast } = useToast();
  
  const recentActivities = [
    { id: 1, description: "Task prioritization algorithm updated", time: "2 mins ago", status: "success" },
    { id: 2, description: "Agent efficiency analysis completed", time: "15 mins ago", status: "success" },
    { id: 3, description: "Workflow optimization suggestions generated", time: "32 mins ago", status: "success" },
    { id: 4, description: "Minor network latency detected", time: "47 mins ago", status: "warning" },
    { id: 5, description: "Security protocols verified", time: "1 hour ago", status: "success" },
  ];
  
  const getHealthColor = (health: number) => {
    if (health >= 90) return "text-green-500";
    if (health >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="h-3.5 w-3.5 text-yellow-400" />;
      case 'error':
        return <CircleAlert className="h-3.5 w-3.5 text-red-400" />;
      default:
        return null;
    }
  };

  const openCommandTerminal = () => {
    const event = new CustomEvent('openCommandTerminal');
    window.dispatchEvent(event);
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: { 
        repeat: Infinity, 
        duration: 2.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <GlassMorphism className="p-6 rounded-xl bg-flow-background/20 backdrop-blur-lg border-flow-accent/20 overflow-hidden relative">
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-flow-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <BrainCircuit className="h-5 w-5 mr-2 text-flow-accent" />
          <h3 className="text-lg font-medium">AI System Status</h3>
        </div>
        <div className={`flex items-center ${getHealthColor(systemHealth)}`}>
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className={`h-2 w-2 rounded-full mr-2 ${systemHealth >= 90 ? 'bg-green-500' : systemHealth >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
          />
          <Heart className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">{systemHealth}% Operational</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-flow-card/30 rounded-lg p-3 flex items-center justify-between hover:bg-flow-card/40 transition-colors duration-300">
          <div className="flex items-center">
            <Cpu className="h-4 w-4 mr-2 text-blue-400" />
            <span className="text-sm">Active Processes</span>
          </div>
          <span className="text-sm font-medium">{activeProcesses}</span>
        </div>
        
        <div className="bg-flow-card/30 rounded-lg p-3 flex items-center justify-between hover:bg-flow-card/40 transition-colors duration-300">
          <div className="flex items-center">
            <BatteryFull className="h-4 w-4 mr-2 text-green-400" />
            <span className="text-sm">System Resources</span>
          </div>
          <span className="text-sm font-medium">87%</span>
        </div>
        
        <div className="bg-flow-card/30 rounded-lg p-3 flex items-center justify-between hover:bg-flow-card/40 transition-colors duration-300">
          <div className="flex items-center">
            <Shield className="h-4 w-4 mr-2 text-purple-400" />
            <span className="text-sm">Security Status</span>
          </div>
          <span className="text-sm font-medium bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs">Secured</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium">Recent AI Activities</h4>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "Show All"}
          </Button>
        </div>
        <div className="space-y-2 max-h-28 overflow-y-auto custom-scrollbar">
          {recentActivities.slice(0, expanded ? recentActivities.length : 3).map(activity => (
            <div 
              key={activity.id} 
              className="bg-flow-card/20 rounded-lg p-2.5 text-xs flex justify-between hover:bg-flow-card/30 transition-colors duration-300"
            >
              <div className="flex items-center">
                {getStatusIcon(activity.status)}
                <span className="ml-1.5">{activity.description}</span>
              </div>
              <span className="text-flow-foreground/60 ml-2">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex gap-2 mt-3">
        <Button 
          size="sm" 
          onClick={openCommandTerminal}
          className="text-xs gap-1.5 bg-gradient-to-r from-flow-accent/70 to-purple-500/70 hover:from-flow-accent hover:to-purple-500 text-flow-accent-foreground"
        >
          <Zap className="h-3.5 w-3.5" />
          Open Command Terminal
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs gap-1.5 border-flow-border/60 hover:bg-flow-accent/20 hover:text-flow-accent hover:border-flow-accent/40"
          onClick={() => {
            toast({
              title: "System Logs",
              description: "Opening system logs in a new panel...",
              duration: 3000
            });
          }}
        >
          <CircleAlert className="h-3.5 w-3.5" />
          View System Logs
        </Button>
      </div>
      
      {/* Fix: Remove the jsx property from style element */}
      <style>
        {`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        `}
      </style>
    </GlassMorphism>
  );
};

export default AISystemStatus;
