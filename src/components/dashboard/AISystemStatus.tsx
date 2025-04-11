
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
  CheckCircle2,
  BarChart,
  ArrowUp,
  ArrowDown,
  Database
} from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Progress } from '../ui/progress';

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

  const getHealthBgColor = (health: number) => {
    if (health >= 90) return "bg-green-500";
    if (health >= 70) return "bg-yellow-500";
    return "bg-red-500";
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

  // System metrics data
  const systemMetrics = [
    { label: "CPU", value: 42, trend: "up", change: "+5%" },
    { label: "Memory", value: 67, trend: "down", change: "-3%" },
    { label: "Network", value: 53, trend: "neutral", change: "0%" },
  ];

  return (
    <GlassMorphism className="p-6 rounded-xl bg-flow-background/20 backdrop-blur-lg border-flow-accent/20 overflow-hidden relative">
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-flow-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-flow-accent/20 mr-2">
            <BrainCircuit className="h-5 w-5 text-flow-accent" />
          </div>
          <h3 className="text-lg font-medium bg-gradient-to-r from-flow-accent to-purple-400 bg-clip-text text-transparent">
            AI System Status
          </h3>
        </div>
        <div className={`flex items-center ${getHealthColor(systemHealth)}`}>
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className={`h-2 w-2 rounded-full mr-2 ${getHealthBgColor(systemHealth)}`}
          />
          <Heart className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">{systemHealth}% Operational</span>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {systemMetrics.map((metric, index) => (
          <div key={index} className="bg-flow-card/30 rounded-lg p-3 hover:bg-flow-card/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-flow-foreground/70">{metric.label}</span>
              <div className="flex items-center text-xs">
                {metric.trend === 'up' ? (
                  <ArrowUp className="h-3 w-3 text-green-500 mr-0.5" />
                ) : metric.trend === 'down' ? (
                  <ArrowDown className="h-3 w-3 text-red-500 mr-0.5" />
                ) : null}
                <span className={metric.trend === 'up' ? 'text-green-500' : metric.trend === 'down' ? 'text-red-500' : 'text-flow-foreground/60'}>
                  {metric.change}
                </span>
              </div>
            </div>
            <Progress 
              value={metric.value} 
              className="h-1.5 bg-flow-foreground/10" 
              indicatorClassName={
                metric.value > 75 ? "bg-red-500" :
                metric.value > 50 ? "bg-yellow-500" :
                "bg-green-500"
              }
            />
            <div className="mt-1 text-right text-xs font-medium">{metric.value}%</div>
          </div>
        ))}
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
          <div className="flex items-center">
            <Database className="h-4 w-4 mr-1.5 text-flow-accent" />
            <h4 className="text-sm font-medium">Recent AI Activities</h4>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-7 px-2 text-xs hover:bg-flow-accent/10 hover:text-flow-accent"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "Show All"}
          </Button>
        </div>
        <div className="space-y-2 max-h-28 overflow-y-auto custom-scrollbar">
          <AnimatedActivityList 
            activities={recentActivities.slice(0, expanded ? recentActivities.length : 3)} 
            getStatusIcon={getStatusIcon}
          />
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
          <BarChart className="h-3.5 w-3.5" />
          View System Logs
        </Button>
      </div>
      
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

// Animated activity list component
const AnimatedActivityList = ({ activities, getStatusIcon }: { 
  activities: { id: number, description: string, time: string, status: string }[],
  getStatusIcon: (status: string) => JSX.Element | null
}) => {
  return (
    <>
      {activities.map((activity, index) => (
        <motion.div 
          key={activity.id} 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-flow-card/20 rounded-lg p-2.5 text-xs flex justify-between hover:bg-flow-card/30 transition-colors duration-300"
        >
          <div className="flex items-center">
            {getStatusIcon(activity.status)}
            <span className="ml-1.5">{activity.description}</span>
          </div>
          <span className="text-flow-foreground/60 ml-2">{activity.time}</span>
        </motion.div>
      ))}
    </>
  );
};

export default AISystemStatus;
