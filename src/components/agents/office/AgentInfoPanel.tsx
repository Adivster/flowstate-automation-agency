
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AgentDetails {
  id: number;
  name: string;
  role: string;
  status: 'working' | 'idle' | 'paused' | 'error';
}

interface PerformanceData {
  tasksCompleted: number;
  averageResponseTime: string;
  errorRate: number;
  uptime: number;
}

interface AgentInfoPanelProps {
  agent: AgentDetails;
  performanceData: PerformanceData;
  onClose: () => void;
}

const AgentInfoPanel: React.FC<AgentInfoPanelProps> = ({ 
  agent, 
  performanceData, 
  onClose 
}) => {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      className="absolute bottom-4 left-4 right-4 bg-black/80 rounded-md border border-flow-accent/30 p-4 z-50"
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
      
      <div className="flex justify-end">
        <button className="text-xs bg-flow-accent/90 text-white px-3 py-1 rounded hover:bg-flow-accent">
          {t('viewDetails')}
        </button>
      </div>
    </motion.div>
  );
};

export default AgentInfoPanel;
