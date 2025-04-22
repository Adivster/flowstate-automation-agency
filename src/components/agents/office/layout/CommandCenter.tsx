
import React from 'react';
import { 
  BarChart3, 
  Server, 
  AlertTriangle, 
  Activity 
} from 'lucide-react';

interface CommandCenterProps {
  onToggleVisualizationControls: () => void;
  visualizationActive: boolean;
  onShowMetrics: () => void;
  metricsActive: boolean;
  systemStatus: 'healthy' | 'warning' | 'critical';
  activeAgents: number;
  totalAgents: number;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  onToggleVisualizationControls,
  visualizationActive,
  onShowMetrics,
  metricsActive,
  systemStatus,
  activeAgents,
  totalAgents
}) => {
  const getStatusColor = () => {
    switch (systemStatus) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-gray-700 text-white">
      <div className="flex items-center space-x-4">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <Server className="w-5 h-5 text-blue-400" />
            <span className="text-sm">System Overview</span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
            <span className="text-xs">
              {systemStatus.charAt(0).toUpperCase() + systemStatus.slice(1)} 
              {' '}System Status
            </span>
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-green-400" />
            <span className="text-sm">Agents</span>
          </div>
          <span className="text-xs">
            {activeAgents}/{totalAgents} Active
          </span>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={onToggleVisualizationControls}
            className={`p-2 rounded ${visualizationActive ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition-colors`}
          >
            <BarChart3 className="w-4 h-4" />
          </button>
          
          <button 
            onClick={onShowMetrics}
            className={`p-2 rounded ${metricsActive ? 'bg-green-600' : 'bg-gray-700'} hover:bg-green-500 transition-colors`}
          >
            <AlertTriangle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
