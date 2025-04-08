
import React from 'react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { ActivityIcon, BrainCircuit, Cpu, Heart, CircleAlert, BatteryFull, Zap } from 'lucide-react';
import { Button } from '../ui/button';

const AISystemStatus: React.FC = () => {
  // Mock data - in a real application, this would come from an API
  const systemHealth = 98;
  const activeProcesses = 14;
  const recentActivities = [
    { id: 1, description: "Task prioritization algorithm updated", time: "2 mins ago" },
    { id: 2, description: "Agent efficiency analysis completed", time: "15 mins ago" },
    { id: 3, description: "Workflow optimization suggestions generated", time: "32 mins ago" }
  ];
  
  const getHealthColor = (health: number) => {
    if (health >= 90) return "text-green-500";
    if (health >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const openCommandTerminal = () => {
    const event = new CustomEvent('openCommandTerminal');
    window.dispatchEvent(event);
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
          <Heart className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">{systemHealth}%</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-flow-card/30 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center">
            <Cpu className="h-4 w-4 mr-2 text-blue-400" />
            <span className="text-sm">Active Processes</span>
          </div>
          <span className="text-sm font-medium">{activeProcesses}</span>
        </div>
        
        <div className="bg-flow-card/30 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center">
            <BatteryFull className="h-4 w-4 mr-2 text-green-400" />
            <span className="text-sm">System Resources</span>
          </div>
          <span className="text-sm font-medium">87%</span>
        </div>
        
        <div className="bg-flow-card/30 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center">
            <ActivityIcon className="h-4 w-4 mr-2 text-purple-400" />
            <span className="text-sm">AI Activity</span>
          </div>
          <span className="text-sm font-medium">High</span>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Recent AI Activities</h4>
        <div className="space-y-2 max-h-28 overflow-y-auto custom-scrollbar">
          {recentActivities.map(activity => (
            <div key={activity.id} className="bg-flow-card/20 rounded-lg p-2.5 text-xs flex justify-between">
              <span>{activity.description}</span>
              <span className="text-flow-foreground/60">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex gap-2 mt-3">
        <Button 
          size="sm" 
          onClick={openCommandTerminal}
          className="text-xs gap-1.5 bg-flow-accent/70 hover:bg-flow-accent text-flow-accent-foreground"
        >
          <Zap className="h-3.5 w-3.5" />
          Open Command Terminal
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs gap-1.5 border-flow-border/60 hover:bg-flow-accent/20 hover:text-flow-accent hover:border-flow-accent/40"
        >
          <CircleAlert className="h-3.5 w-3.5" />
          View System Logs
        </Button>
      </div>
      
      <style jsx>{`
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
      `}</style>
    </GlassMorphism>
  );
};

export default AISystemStatus;
