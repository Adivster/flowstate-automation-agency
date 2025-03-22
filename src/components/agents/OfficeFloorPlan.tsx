
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, MessageCircle, Activity, BarChart, Users, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import AgentCharacter from './AgentCharacter';
import Workstation from './office/Workstation';
import DecorativeElement from './office/DecorativeElement';
import HolographicElement from './office/HolographicElement';
import Division from './office/Division';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  getDivisions, 
  workstations, 
  decorations, 
  holograms, 
  agents
} from './office/officeData';

const OfficeFloorPlan = () => {
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const infoPanelRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  // Get divisions
  const divisions = getDivisions();
  
  // Handle division selection
  const handleDivisionClick = (divisionId: string) => {
    setSelectedDivision(divisionId);
    setSelectedAgent(null);
    setShowInfoPanel(true);
  };
  
  // Handle agent selection
  const handleAgentClick = (agentId: number) => {
    setSelectedAgent(agentId);
    setSelectedDivision(null);
    setShowInfoPanel(true);
  };

  // Handle outside clicks for info panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showInfoPanel && 
        infoPanelRef.current && 
        !infoPanelRef.current.contains(event.target as Node)
      ) {
        setShowInfoPanel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showInfoPanel]);

  // Close info panel when clicking escape
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedDivision(null);
        setSelectedAgent(null);
        setShowInfoPanel(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);
  
  // Generate random performance data for divisions and agents
  const generatePerformanceData = () => {
    return {
      taskCompletion: Math.floor(Math.random() * 30) + 70, // 70-100%
      resourceUtilization: Math.floor(Math.random() * 30) + 60, // 60-90%
      efficiency: Math.floor(Math.random() * 25) + 75, // 75-100%
      uptime: Math.floor(Math.random() * 5) + 95, // 95-100%
      errorRate: Math.floor(Math.random() * 5), // 0-5%
      tasksCompleted: Math.floor(Math.random() * 100) + 50, // 50-150
      averageResponseTime: (Math.random() * 2 + 0.5).toFixed(2), // 0.5-2.5s
    };
  };
  
  return (
    <Card className="relative w-full h-[550px] overflow-hidden border-2 p-0 bg-gray-100 dark:bg-gray-900 neon-border">
      {/* Office floor */}
      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800">
        {/* Refined grid pattern */}
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, rgba(156, 163, 175, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(156, 163, 175, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Central server/mainframe */}
        <div 
          className="absolute left-1/2 top-[15%] -translate-x-1/2 w-10 h-18 bg-blue-900 dark:bg-blue-800 rounded-sm border border-flow-accent/70 flex flex-col items-center justify-center gap-1 overflow-hidden z-20"
        >
          <div className="w-6 h-1 bg-flow-accent/80 rounded-sm"></div>
          <div className="w-6 h-1 bg-green-500/80 rounded-sm"></div>
          <div className="w-6 h-1 bg-purple-500/80 rounded-sm"></div>
          <Cpu className="w-5 h-5 text-flow-accent/90" />
        </div>
        
        {/* Communication hub */}
        <div
          className="absolute right-[15%] top-[15%] w-8 h-8 rounded-full bg-indigo-900 border border-indigo-500/70 flex items-center justify-center z-20"
        >
          <MessageCircle className="w-4 h-4 text-indigo-400" />
        </div>
        
        {/* Render workstations */}
        {workstations.map((station, index) => (
          <Workstation
            key={`station-${index}`}
            x={station.x}
            y={station.y}
            width={station.width}
            height={station.height}
            rotation={station.rotation || 0}
            type={station.type}
          />
        ))}
        
        {/* Render decorative elements */}
        {decorations.map((item, index) => (
          <DecorativeElement
            key={`decor-${index}`}
            type={item.type}
            x={item.x}
            y={item.y}
            size={item.size}
          />
        ))}
        
        {/* Render holographic projections */}
        {holograms.map((item, index) => (
          <HolographicElement
            key={`holo-${index}`}
            type={item.type}
            x={item.x}
            y={item.y}
            size={item.size}
          />
        ))}
        
        {/* Render divisions */}
        {divisions.map((division) => (
          <Division
            key={division.id}
            division={division}
            isSelected={selectedDivision === division.id}
            onDivisionClick={handleDivisionClick}
            agents={agents}
          />
        ))}
        
        {/* Render agents with clear visuals */}
        {agents.map(agent => (
          <AgentCharacter 
            key={agent.id} 
            agent={agent}
            routePath={agent.route}
            isSelected={selectedAgent === agent.id}
            onAgentClick={handleAgentClick}
          />
        ))}
        
        {/* Floor markings */}
        <div className="absolute top-2 left-2 p-1 bg-gray-300 dark:bg-gray-700 rounded text-xs z-30">Floor Plan v3.0</div>
        <div className="absolute bottom-3 right-2 p-1 bg-gray-300 dark:bg-gray-700 rounded text-xs z-30">FlowState Agency</div>
        
        {/* Info panel for selected division */}
        <AnimatePresence>
          {selectedDivision && showInfoPanel && (
            <motion.div 
              ref={infoPanelRef}
              className="absolute bottom-4 left-4 right-4 bg-black/80 rounded-md border border-flow-accent/30 p-4 z-50"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between mb-3">
                <h3 className="text-white text-lg font-bold flex items-center">
                  {divisions.find(d => d.id === selectedDivision)?.name}
                </h3>
                <button 
                  className="text-white/70 hover:text-white"
                  onClick={() => setShowInfoPanel(false)}
                >
                  ×
                </button>
              </div>
              
              <p className="text-white/80 text-sm mb-4">
                {divisions.find(d => d.id === selectedDivision)?.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-white/10 rounded p-2 text-center">
                  <div className="text-white text-sm font-semibold">
                    {agents.filter(a => a.division === selectedDivision).length}
                  </div>
                  <div className="text-white/70 text-xs flex items-center justify-center">
                    <Users className="h-3 w-3 mr-1" />
                    Active Agents
                  </div>
                </div>
                
                <div className="bg-white/10 rounded p-2 text-center">
                  <div className="text-white text-sm font-semibold">
                    {generatePerformanceData().taskCompletion}%
                  </div>
                  <div className="text-white/70 text-xs flex items-center justify-center">
                    <Activity className="h-3 w-3 mr-1" />
                    Task Completion
                  </div>
                </div>
                
                <div className="bg-white/10 rounded p-2 text-center">
                  <div className="text-white text-sm font-semibold">
                    {generatePerformanceData().efficiency}%
                  </div>
                  <div className="text-white/70 text-xs flex items-center justify-center">
                    <BarChart className="h-3 w-3 mr-1" />
                    Efficiency
                  </div>
                </div>
                
                <div className="bg-white/10 rounded p-2 text-center">
                  <div className="text-white text-sm font-semibold">
                    {generatePerformanceData().tasksCompleted}
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
          )}
          
          {/* Info panel for selected agent */}
          {selectedAgent && showInfoPanel && (
            <motion.div 
              ref={infoPanelRef}
              className="absolute bottom-4 left-4 right-4 bg-black/80 rounded-md border border-flow-accent/30 p-4 z-50"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {(() => {
                const agent = agents.find(a => a.id === selectedAgent);
                const performance = generatePerformanceData();
                if (!agent) return null;
                
                return (
                  <>
                    <div className="flex justify-between mb-3">
                      <h3 className="text-white text-lg font-bold flex items-center">
                        {agent.name}
                      </h3>
                      <button 
                        className="text-white/70 hover:text-white"
                        onClick={() => setShowInfoPanel(false)}
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
                          {performance.tasksCompleted}
                        </div>
                        <div className="text-white/70 text-xs flex items-center justify-center">
                          <Activity className="h-3 w-3 mr-1" />
                          Tasks Completed
                        </div>
                      </div>
                      
                      <div className="bg-white/10 rounded p-2 text-center">
                        <div className="text-white text-sm font-semibold">
                          {performance.averageResponseTime}s
                        </div>
                        <div className="text-white/70 text-xs flex items-center justify-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Avg Response Time
                        </div>
                      </div>
                      
                      <div className="bg-white/10 rounded p-2 text-center">
                        <div className="text-white text-sm font-semibold">
                          {performance.errorRate}%
                        </div>
                        <div className="text-white/70 text-xs flex items-center justify-center">
                          <Activity className="h-3 w-3 mr-1" />
                          Error Rate
                        </div>
                      </div>
                      
                      <div className="bg-white/10 rounded p-2 text-center">
                        <div className="text-white text-sm font-semibold">
                          {performance.uptime}%
                        </div>
                        <div className="text-white/70 text-xs flex items-center justify-center">
                          <Activity className="h-3 w-3 mr-1" />
                          Uptime
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button className="text-xs bg-flow-accent/90 text-white px-3 py-1 rounded hover:bg-flow-accent">
                        {t('viewDetails')}
                      </button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default OfficeFloorPlan;
