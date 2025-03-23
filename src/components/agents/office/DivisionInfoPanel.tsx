
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, BarChart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePerformanceData } from '@/hooks/usePerformanceData';

interface Division {
  id: string;
  name: string;
  description: string;
}

interface Agent {
  id: number;
  division: string;
}

interface DivisionInfoPanelProps {
  division: Division;
  agents: Agent[];
  onClose: () => void;
}

const DivisionInfoPanel: React.FC<DivisionInfoPanelProps> = ({ 
  division, 
  agents,
  onClose 
}) => {
  const { t } = useLanguage();
  // Pass division ID to get consistent performance data
  const performanceData = usePerformanceData(division.id);
  
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
          {division.name}
        </h3>
        <button 
          className="text-white/70 hover:text-white"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      
      <p className="text-white/80 text-sm mb-4">
        {division.description}
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white/10 rounded p-2 text-center">
          <div className="text-white text-sm font-semibold">
            {agents.filter(a => a.division === division.id).length}
          </div>
          <div className="text-white/70 text-xs flex items-center justify-center">
            <Users className="h-3 w-3 mr-1" />
            Active Agents
          </div>
        </div>
        
        <div className="bg-white/10 rounded p-2 text-center">
          <div className="text-white text-sm font-semibold">
            {performanceData.taskCompletion}%
          </div>
          <div className="text-white/70 text-xs flex items-center justify-center">
            <Activity className="h-3 w-3 mr-1" />
            Task Completion
          </div>
        </div>
        
        <div className="bg-white/10 rounded p-2 text-center">
          <div className="text-white text-sm font-semibold">
            {performanceData.efficiency}%
          </div>
          <div className="text-white/70 text-xs flex items-center justify-center">
            <BarChart className="h-3 w-3 mr-1" />
            Efficiency
          </div>
        </div>
        
        <div className="bg-white/10 rounded p-2 text-center">
          <div className="text-white text-sm font-semibold">
            {performanceData.tasksCompleted}
          </div>
          <div className="text-white/70 text-xs flex items-center justify-center">
            <Activity className="h-3 w-3 mr-1" />
            Tasks Completed
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

export default DivisionInfoPanel;
