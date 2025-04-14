
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, BarChart, PieChart as PieChartIcon, ArrowRightCircle, X, Minimize2, Maximize2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePerformanceData } from '@/hooks/usePerformanceData';
import { PieChart } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface Division {
  id: string;
  name: string;
  description: string;
  borderColor?: string;
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
  const panelRef = useRef<HTMLDivElement>(null);
  const [minimized, setMinimized] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("overview");
  
  // Pass division ID to get consistent performance data
  const performanceData = usePerformanceData(division.id);
  
  // Format performance data for chart visualization with enhanced colors and descriptions
  const resourceData = [
    { 
      name: "Used", 
      value: performanceData.resourceUtilization,
      description: "Currently utilized resources for this division's operations.",
      color: division.borderColor || "#8b5cf6"
    },
    { 
      name: "Available", 
      value: 100 - performanceData.resourceUtilization,
      description: "Resources still available for allocation to this division.",
      color: "#22c55e"
    },
  ];
  
  const agentsInDivision = agents.filter(a => a.division === division.id);
  
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

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };
  
  return (
    <motion.div 
      ref={panelRef}
      className={`absolute bottom-4 left-4 ${minimized ? 'w-56 h-10' : 'max-w-[calc(100%-2rem)] w-[500px]'} bg-black/80 backdrop-blur-sm rounded-md border ${division.borderColor ? `border-[${division.borderColor}]/50` : 'border-flow-accent/30'} shadow-lg z-50`}
      style={{
        boxShadow: division.borderColor ? `0 0 15px ${division.borderColor}30` : undefined,
        maxHeight: minimized ? '40px' : 'calc(100% - 8rem)',
        overflow: minimized ? 'hidden' : 'auto'
      }}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`flex justify-between items-center p-2 ${division.borderColor ? `bg-[${division.borderColor}]/20` : 'bg-flow-accent/10'} border-b border-flow-border/30`}>
        <h3 className="text-white text-sm font-medium flex items-center">
          {division.name}
        </h3>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-white/10"
            onClick={toggleMinimize}
          >
            {minimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
          </Button>
          <Button 
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-white/10"
            onClick={onClose}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      {!minimized && (
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100% - 40px)' }}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="agents">Agents</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <p className="text-white/80 text-sm mb-4">
                {division.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className={`${division.borderColor ? `bg-[${division.borderColor}]/10` : 'bg-white/10'} rounded p-2 text-center`}>
                  <div className="text-white text-sm font-semibold">
                    {agentsInDivision.length}
                  </div>
                  <div className="text-white/70 text-xs flex items-center justify-center">
                    <Users className="h-3 w-3 mr-1" />
                    Active Agents
                  </div>
                </div>
                
                <div className={`${division.borderColor ? `bg-[${division.borderColor}]/10` : 'bg-white/10'} rounded p-2 text-center`}>
                  <div className="text-white text-sm font-semibold">
                    {performanceData.taskCompletion}%
                  </div>
                  <div className="text-white/70 text-xs flex items-center justify-center">
                    <Activity className="h-3 w-3 mr-1" />
                    Task Completion
                  </div>
                </div>
                
                <div className={`${division.borderColor ? `bg-[${division.borderColor}]/10` : 'bg-white/10'} rounded p-2 text-center`}>
                  <div className="text-white text-sm font-semibold">
                    {performanceData.efficiency}%
                  </div>
                  <div className="text-white/70 text-xs flex items-center justify-center">
                    <BarChart className="h-3 w-3 mr-1" />
                    Efficiency
                  </div>
                </div>
                
                <div className={`${division.borderColor ? `bg-[${division.borderColor}]/10` : 'bg-white/10'} rounded p-2 text-center`}>
                  <div className="text-white text-sm font-semibold">
                    {performanceData.tasksCompleted}
                  </div>
                  <div className="text-white/70 text-xs flex items-center justify-center">
                    <Activity className="h-3 w-3 mr-1" />
                    Tasks Completed
                  </div>
                </div>
              </div>
              
              <div className={`${division.borderColor ? `bg-[${division.borderColor}]/5` : 'bg-white/5'} rounded-md p-3 mb-4`}>
                <h4 className="text-white/90 text-xs font-medium mb-2 flex items-center">
                  <PieChartIcon className="h-3 w-3 mr-1" />
                  Resource Utilization
                </h4>
                <div className="h-[150px]">
                  <PieChart 
                    data={resourceData} 
                    colors={resourceData.map(item => item.color)}
                    donut={true} 
                    gradient={true}
                    interactive={true}
                    height={150}
                    outerRadius={50}
                    legendPosition="bottom"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="agents">
              <div className="space-y-2 overflow-y-auto max-h-[300px] pr-1 custom-scrollbar">
                {agentsInDivision.length > 0 ? (
                  agentsInDivision.map((agent, index) => (
                    <div 
                      key={agent.id} 
                      className={`flex items-center justify-between ${division.borderColor ? `bg-[${division.borderColor}]/10` : 'bg-white/10'} rounded-sm px-2 py-1.5 hover:bg-white/20 transition-colors duration-150`}
                    >
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
            </TabsContent>

            <TabsContent value="performance">
              <h4 className="text-white/90 text-sm font-medium mb-2">Performance Metrics</h4>
              <div className="space-y-3">
                <div className="bg-white/5 p-3 rounded">
                  <div className="flex justify-between text-xs text-white/70 mb-1">
                    <span>Efficiency</span>
                    <span>{performanceData.efficiency}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-green-500 rounded-full h-2" style={{ width: `${performanceData.efficiency}%` }}></div>
                  </div>
                </div>
                
                <div className="bg-white/5 p-3 rounded">
                  <div className="flex justify-between text-xs text-white/70 mb-1">
                    <span>Task Completion</span>
                    <span>{performanceData.taskCompletion}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-blue-500 rounded-full h-2" style={{ width: `${performanceData.taskCompletion}%` }}></div>
                  </div>
                </div>
                
                <div className="bg-white/5 p-3 rounded">
                  <div className="flex justify-between text-xs text-white/70 mb-1">
                    <span>Resource Utilization</span>
                    <span>{performanceData.resourceUtilization}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-amber-500 rounded-full h-2" style={{ width: `${performanceData.resourceUtilization}%` }}></div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end mt-4">
            <button 
              className={`text-xs ${division.borderColor ? `bg-[${division.borderColor}]/80 hover:bg-[${division.borderColor}]` : 'bg-flow-accent/90 hover:bg-flow-accent'} text-white px-3 py-1.5 rounded transition-colors duration-150 flex items-center`}
            >
              {t('viewDetails')}
              <ArrowRightCircle className="h-3 w-3 ml-1" />
            </button>
          </div>
        </div>
      )}
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${division.borderColor || 'rgba(139, 92, 246, 0.5)'};
          border-radius: 10px;
        }
      `}</style>
    </motion.div>
  );
};

export default DivisionInfoPanel;
