
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, Zap, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePerformanceData } from '@/hooks/usePerformanceData';
import { LineChart } from '@/components/ui/chart';

interface AgentDetails {
  id: number;
  name: string;
  role: string;
  status: 'working' | 'idle' | 'paused' | 'error';
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
  
  return (
    <motion.div 
      className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-md border border-flow-accent/30 p-4 z-50"
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
          className="text-white/70 hover:text-white"
          onClick={onClose}
        >
          ×
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
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white/10 rounded p-2 text-center">
          <div className="text-white text-sm font-semibold">
            {performanceData.tasksCompleted}
          </div>
          <div className="text-white/70 text-xs flex items-center justify-center">
            <Activity className="h-3 w-3 mr-1" />
            Tasks Completed
          </div>
        </div>
        
        <div className="bg-white/10 rounded p-2 text-center">
          <div className="text-white text-sm font-semibold">
            {performanceData.averageResponseTime}s
          </div>
          <div className="text-white/70 text-xs flex items-center justify-center">
            <Clock className="h-3 w-3 mr-1" />
            Avg Response Time
          </div>
        </div>
        
        <div className="bg-white/10 rounded p-2 text-center">
          <div className="text-white text-sm font-semibold">
            {performanceData.errorRate}%
          </div>
          <div className="text-white/70 text-xs flex items-center justify-center">
            <Activity className="h-3 w-3 mr-1" />
            Error Rate
          </div>
        </div>
        
        <div className="bg-white/10 rounded p-2 text-center">
          <div className="text-white text-sm font-semibold">
            {performanceData.uptime}%
          </div>
          <div className="text-white/70 text-xs flex items-center justify-center">
            <Zap className="h-3 w-3 mr-1" />
            Uptime
          </div>
        </div>
      </div>
      
      <div className="mb-4 bg-white/5 p-3 rounded-md">
        <h4 className="text-white/90 text-xs font-medium mb-2 flex items-center">
          <BarChart3 className="h-3 w-3 mr-1" />
          Performance Trend
        </h4>
        <div className="h-[120px]">
          <LineChart data={chartData} />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <button className="text-xs bg-flow-accent/90 text-white px-3 py-1.5 rounded hover:bg-flow-accent flex items-center justify-center">
          <Activity className="h-3 w-3 mr-1" />
          {t('assignTask')}
        </button>
        <button className="text-xs bg-flow-muted/30 text-white/90 px-3 py-1.5 rounded hover:bg-flow-muted/50 flex items-center justify-center">
          {t('viewDetails')}
        </button>
      </div>
    </motion.div>
  );
};

export default AgentInfoPanel;
