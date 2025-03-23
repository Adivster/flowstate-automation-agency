
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, BarChart, PieChart as PieChartIcon, ArrowRightCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePerformanceData } from '@/hooks/usePerformanceData';
import { PieChart } from '@/components/ui/chart';

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
  
  // Format performance data for chart visualization
  const resourceData = [
    { name: "Used", value: performanceData.resourceUtilization },
    { name: "Available", value: 100 - performanceData.resourceUtilization },
  ];
  
  const agentsInDivision = agents.filter(a => a.division === division.id);
  
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
            {agentsInDivision.length}
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white/5 rounded-md p-3">
          <h4 className="text-white/90 text-xs font-medium mb-2 flex items-center">
            <PieChartIcon className="h-3 w-3 mr-1" />
            Resource Utilization
          </h4>
          <div className="h-[150px]">
            <PieChart data={resourceData} />
          </div>
        </div>
        
        <div className="bg-white/5 rounded-md p-3">
          <h4 className="text-white/90 text-xs font-medium mb-2">Active Agents</h4>
          <div className="space-y-2 overflow-y-auto max-h-[150px] pr-1">
            {agentsInDivision.length > 0 ? (
              agentsInDivision.map((agent, index) => (
                <div key={agent.id} className="flex items-center justify-between bg-white/10 rounded-sm px-2 py-1.5">
                  <span className="text-white/90 text-xs">Agent #{agent.id}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full 
                    ${index % 3 === 0 ? 'bg-green-500/20 text-green-400' : 
                     index % 3 === 1 ? 'bg-amber-500/20 text-amber-400' : 
                     'bg-blue-500/20 text-blue-400'}`
                  }>
                    {index % 3 === 0 ? 'Active' : index % 3 === 1 ? 'Busy' : 'Idle'}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-white/50 text-xs text-center py-4">No agents assigned</div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button className="text-xs bg-flow-accent/90 text-white px-3 py-1.5 rounded hover:bg-flow-accent flex items-center">
          {t('viewDetails')}
          <ArrowRightCircle className="h-3 w-3 ml-1" />
        </button>
      </div>
    </motion.div>
  );
};

export default DivisionInfoPanel;
