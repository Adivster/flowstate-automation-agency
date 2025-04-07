
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, Zap, BarChart3, X, Brain, Gauge } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePerformanceData } from '@/hooks/usePerformanceData';
import { LineChart } from '@/components/ui/chart';
import GlassMorphism from '@/components/ui/GlassMorphism';
import { Progress } from '@/components/ui/progress';
import { AgentMood } from './types/officeTypes';

interface AgentDetails {
  id: number;
  name: string;
  role: string;
  status: 'working' | 'idle' | 'paused' | 'error';
  mood?: AgentMood;
  workload?: number;
}

interface AgentInfoPanelProps {
  agent: AgentDetails;
  onClose: () => void;
}

const AgentInfoPanel: React.FC<AgentInfoPanelProps> = ({ 
  agent, 
  onClose 
}) => {
  const { t } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);
  
  // Pass agent ID to get consistent performance data
  const performanceData = usePerformanceData(agent.id);
  
  // Generate chart data from performance data for visualization
  const chartData = [
    { name: "Jan", value: performanceData.taskCompletion - 10 },
    { name: "Feb", value: performanceData.taskCompletion - 5 },
    { name: "Mar", value: performanceData.taskCompletion - 15 },
    { name: "Apr", value: performanceData.taskCompletion - 8 },
    { name: "May", value: performanceData.taskCompletion },
  ];
  
  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Helper function to get mood emoji and color
  const getMoodInfo = (mood: AgentMood | undefined) => {
    switch(mood) {
      case 'optimal':
        return { emoji: '😎', color: 'text-green-500', label: 'Optimal' };
      case 'focused':
        return { emoji: '🧠', color: 'text-blue-500', label: 'Focused' };
      case 'learning':
        return { emoji: '🤓', color: 'text-cyan-500', label: 'Learning' };
      case 'overwhelmed':
        return { emoji: '😓', color: 'text-red-500', label: 'Overwhelmed' };
      case 'underutilized':
        return { emoji: '😴', color: 'text-amber-500', label: 'Underutilized' };
      case 'frustrated':
        return { emoji: '😤', color: 'text-orange-500', label: 'Frustrated' };
      case 'confused':
        return { emoji: '🤔', color: 'text-purple-500', label: 'Confused' };
      default:
        return { emoji: '😐', color: 'text-gray-500', label: 'Neutral' };
    }
  };

  // Helper function to get workload color
  const getWorkloadColor = (workload: number | undefined) => {
    if (workload === undefined) return 'text-gray-500';
    if (workload > 90) return 'text-red-500';
    if (workload > 75) return 'text-orange-500';
    if (workload > 50) return 'text-yellow-500';
    if (workload > 25) return 'text-green-500';
    return 'text-blue-500';
  };

  // Get mood info
  const moodInfo = getMoodInfo(agent.mood);
  const workloadColor = getWorkloadColor(agent.workload);
  
  return (
    <motion.div 
      ref={panelRef}
      className="absolute bottom-4 left-4 w-[calc(100%-2rem)] max-w-[600px] bg-black/80 backdrop-blur-sm rounded-md border border-flow-accent/30 p-4 z-50 overflow-hidden"
      style={{ maxHeight: 'calc(100% - 8rem)' }}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between mb-3">
        <h3 className="text-white text-lg font-bold flex items-center">
          {agent.name}
        </h3>
        <button 
          className="text-white/70 hover:text-white rounded-full h-6 w-6 flex items-center justify-center bg-flow-muted/30 hover:bg-flow-muted/50"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="flex items-center mb-4">
        <div className={`px-2 py-0.5 rounded-full text-xs
          ${agent.status === 'working' ? 'bg-green-500/20 text-green-400' : 
           agent.status === 'idle' ? 'bg-gray-500/20 text-gray-400' : 
           agent.status === 'paused' ? 'bg-amber-500/20 text-amber-400' : 
           'bg-red-500/20 text-red-400'}`
        }>
          {t(agent.status)}
        </div>
        <div className="text-white/60 text-xs ml-3">{agent.role}</div>
      </div>

      {/* New Mood and Workload Section */}
      {(agent.mood || agent.workload !== undefined) && (
        <GlassMorphism intensity="low" className="p-3 rounded mb-4 backdrop-blur-md">
          <h4 className="text-white/80 text-xs font-semibold mb-2 flex items-center">
            <Brain className="h-3 w-3 mr-1" />
            Agent State
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {agent.mood && (
              <div className="bg-flow-background/20 p-2 rounded-lg flex items-center">
                <div className="text-2xl mr-3" aria-hidden="true">
                  {moodInfo.emoji}
                </div>
                <div>
                  <div className={`text-sm font-medium ${moodInfo.color}`}>
                    {moodInfo.label}
                  </div>
                  <div className="text-xs text-white/60">Current Mood</div>
                </div>
              </div>
            )}
            
            {agent.workload !== undefined && (
              <div className="bg-flow-background/20 p-2 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xs text-white/60">Workload</div>
                  <div className={`text-sm font-medium ${workloadColor}`}>
                    {agent.workload}%
                  </div>
                </div>
                <Progress 
                  value={agent.workload} 
                  className="h-1.5"
                  indicatorColor={
                    agent.workload > 90 ? '#ef4444' :
                    agent.workload > 75 ? '#f97316' :
                    agent.workload > 50 ? '#eab308' :
                    agent.workload > 25 ? '#22c55e' :
                    '#3b82f6'
                  }
                />
                <div className="text-xs mt-1 text-white/40 flex justify-between">
                  <span>Idle</span>
                  <span>Optimal</span>
                  <span>Max</span>
                </div>
              </div>
            )}
          </div>
        </GlassMorphism>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <GlassMorphism intensity="low" className="p-2 text-center rounded">
          <div className="text-white text-sm font-semibold">
            {performanceData.tasksCompleted}
          </div>
          <div className="text-white/70 text-xs flex items-center justify-center">
            <Activity className="h-3 w-3 mr-1" />
            Tasks Completed
          </div>
        </GlassMorphism>
        
        <GlassMorphism intensity="low" className="p-2 text-center rounded">
          <div className="text-white text-sm font-semibold">
            {performanceData.averageResponseTime}s
          </div>
          <div className="text-white/70 text-xs flex items-center justify-center">
            <Clock className="h-3 w-3 mr-1" />
            Avg Response Time
          </div>
        </GlassMorphism>
        
        <GlassMorphism intensity="low" className="p-2 text-center rounded">
          <div className="text-white text-sm font-semibold">
            {performanceData.errorRate}%
          </div>
          <div className="text-white/70 text-xs flex items-center justify-center">
            <Activity className="h-3 w-3 mr-1" />
            Error Rate
          </div>
        </GlassMorphism>
        
        <GlassMorphism intensity="low" className="p-2 text-center rounded">
          <div className="text-white text-sm font-semibold">
            {performanceData.uptime}%
          </div>
          <div className="text-white/70 text-xs flex items-center justify-center">
            <Zap className="h-3 w-3 mr-1" />
            Uptime
          </div>
        </GlassMorphism>
      </div>
      
      <GlassMorphism intensity="low" className="mb-4 p-3 rounded">
        <h4 className="text-white/90 text-xs font-medium mb-2 flex items-center">
          <BarChart3 className="h-3 w-3 mr-1" />
          Performance Trend
        </h4>
        <div className="h-[120px]">
          <LineChart data={chartData} />
        </div>
      </GlassMorphism>
      
      <div className="grid grid-cols-2 gap-3">
        <button className="text-xs bg-flow-accent/90 text-white px-3 py-1.5 rounded hover:bg-flow-accent flex items-center justify-center">
          <Activity className="h-3 w-3 mr-1" />
          {t('agents')}
        </button>
        <button className="text-xs bg-flow-muted/30 text-white/90 px-3 py-1.5 rounded hover:bg-flow-muted/50 flex items-center justify-center">
          {t('analytics')}
        </button>
      </div>
    </motion.div>
  );
};

export default AgentInfoPanel;
