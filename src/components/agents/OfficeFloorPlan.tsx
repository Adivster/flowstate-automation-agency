
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, MessageCircle, Activity, BarChart, Users, Clock, Zap, Server } from 'lucide-react';
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

// Data transmission path component
const DataTransmissionPath = ({ start, end, color, pulseSpeed = 3 }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
      <svg width="100%" height="100%" className="absolute top-0 left-0">
        <line 
          x1={`${start.x}%`} 
          y1={`${start.y}%`} 
          x2={`${end.x}%`} 
          y2={`${end.y}%`} 
          stroke={color} 
          strokeWidth="1" 
          strokeDasharray="3,3" 
          className="opacity-30" 
        />
        
        {/* Animated pulse along the path */}
        <circle r="2" fill={color} className={`opacity-70`}>
          <animateMotion
            dur={`${pulseSpeed}s`}
            repeatCount="indefinite"
            path={`M${start.x},${start.y} L${end.x},${end.y}`}
          />
        </circle>
      </svg>
    </div>
  );
};

// Animated notification popup
const NotificationPopup = ({ x, y, message, type = 'info', onComplete }) => {
  return (
    <motion.div
      className={`absolute text-xs px-2 py-1 rounded-md z-50 whitespace-nowrap 
        ${type === 'success' ? 'bg-green-600/90 text-white' : 
         type === 'error' ? 'bg-red-600/90 text-white' : 
         type === 'warning' ? 'bg-amber-500/90 text-white' : 
         'bg-blue-600/90 text-white'}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: -20 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={onComplete}
    >
      {message}
    </motion.div>
  );
};

const OfficeFloorPlan = () => {
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [dataTransmissions, setDataTransmissions] = useState([]);
  const [pulsing, setPulsing] = useState({});
  const infoPanelRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  // Get divisions - pass the translation function
  const divisions = getDivisions(t);
  
  // Create initial data transmissions
  useEffect(() => {
    // Create connections between divisions
    const initialTransmissions = [
      { 
        id: 1, 
        start: { x: 25, y: 45 }, 
        end: { x: 65, y: 45 }, 
        color: '#6366f1' 
      },
      { 
        id: 2, 
        start: { x: 29, y: 60 }, 
        end: { x: 61, y: 75 }, 
        color: '#8b5cf6' 
      },
      { 
        id: 3, 
        start: { x: 45, y: 25 }, 
        end: { x: 25, y: 35 }, 
        color: '#ec4899' 
      },
      { 
        id: 4, 
        start: { x: 50, y: 25 }, 
        end: { x: 65, y: 35 }, 
        color: '#14b8a6' 
      }
    ];
    
    setDataTransmissions(initialTransmissions);
    
    // Periodically add temporary transmissions for more dynamic feel
    const interval = setInterval(() => {
      // Randomly select two divisions to connect
      const divs = ['kb', 'analytics', 'operations', 'strategy', 'lounge'];
      const div1 = divs[Math.floor(Math.random() * divs.length)];
      let div2 = divs[Math.floor(Math.random() * divs.length)];
      while (div1 === div2) {
        div2 = divs[Math.floor(Math.random() * divs.length)];
      }
      
      // Get positions for these divisions
      const division1 = divisions.find(d => d.id === div1);
      const division2 = divisions.find(d => d.id === div2);
      
      if (division1 && division2) {
        const newTransmission = {
          id: Math.random().toString(),
          start: { 
            x: division1.position.x + (division1.position.width / 2), 
            y: division1.position.y + (division1.position.height / 2)
          },
          end: { 
            x: division2.position.x + (division2.position.width / 2), 
            y: division2.position.y + (division2.position.height / 2)
          },
          color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`,
          temporary: true
        };
        
        setDataTransmissions(prev => [...prev, newTransmission]);
        
        // Remove the temporary transmission after a delay
        setTimeout(() => {
          setDataTransmissions(prev => prev.filter(t => t.id !== newTransmission.id));
        }, 4000);
        
        // Show notification by random chance
        if (Math.random() > 0.5) {
          const msgTypes = ['Data synced', 'Process completed', 'Update received', 'Task assigned'];
          const msg = msgTypes[Math.floor(Math.random() * msgTypes.length)];
          const notifTypes = ['success', 'info', 'warning'];
          const type = notifTypes[Math.floor(Math.random() * notifTypes.length)];
          
          // Add notification
          const notif = {
            id: Date.now(),
            x: division2.position.x + (division2.position.width / 2),
            y: division2.position.y - 5,
            message: msg,
            type
          };
          
          setNotifications(prev => [...prev, notif]);
          
          // Remove notification after 2 seconds
          setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== notif.id));
          }, 2000);
        }
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [divisions]);

  // Simulate periodic division activity
  useEffect(() => {
    const interval = setInterval(() => {
      const randomDivId = divisions[Math.floor(Math.random() * divisions.length)].id;
      
      // Add pulse effect to division
      setPulsing(prev => ({
        ...prev,
        [randomDivId]: true
      }));
      
      // Remove pulse effect after a delay
      setTimeout(() => {
        setPulsing(prev => ({
          ...prev,
          [randomDivId]: false
        }));
      }, 3000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [divisions]);
  
  // Handle division selection
  const handleDivisionClick = (divisionId: string) => {
    setSelectedDivision(divisionId);
    setSelectedAgent(null);
    setShowInfoPanel(true);
    
    // Pulse the division when selected
    setPulsing(prev => ({
      ...prev,
      [divisionId]: true
    }));
    
    // Remove pulse effect after a delay
    setTimeout(() => {
      setPulsing(prev => ({
        ...prev,
        [divisionId]: false
      }));
    }, 2000);
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
        
        {/* Data transmission paths */}
        {dataTransmissions.map(transmission => (
          <DataTransmissionPath 
            key={transmission.id}
            start={transmission.start}
            end={transmission.end}
            color={transmission.color}
            pulseSpeed={transmission.temporary ? 1.5 : 3 + Math.random() * 3}
          />
        ))}
        
        {/* Animated notifications */}
        <AnimatePresence>
          {notifications.map(notification => (
            <NotificationPopup
              key={notification.id}
              x={notification.x}
              y={notification.y}
              message={notification.message}
              type={notification.type}
              onComplete={() => {}}
            />
          ))}
        </AnimatePresence>
        
        {/* Central server/mainframe with animated glow */}
        <motion.div 
          className="absolute left-1/2 top-[15%] -translate-x-1/2 w-10 h-18 bg-blue-900 dark:bg-blue-800 rounded-sm border border-flow-accent/70 flex flex-col items-center justify-center gap-1 overflow-hidden z-20"
          animate={{ 
            boxShadow: ['0 0 5px rgba(99, 102, 241, 0.3)', '0 0 15px rgba(99, 102, 241, 0.5)', '0 0 5px rgba(99, 102, 241, 0.3)']
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-6 h-1 bg-flow-accent/80 rounded-sm">
            <div className="h-full bg-white/80 animate-pulse" style={{ width: '30%' }}></div>
          </div>
          <div className="w-6 h-1 bg-green-500/80 rounded-sm">
            <div className="h-full bg-white/80 animate-pulse" style={{ width: '60%', animationDelay: '0.3s' }}></div>
          </div>
          <div className="w-6 h-1 bg-purple-500/80 rounded-sm">
            <div className="h-full bg-white/80 animate-pulse" style={{ width: '45%', animationDelay: '0.6s' }}></div>
          </div>
          <Cpu className="w-5 h-5 text-flow-accent/90" />
        </motion.div>
        
        {/* Communication hub with animated ping effect */}
        <div
          className="absolute right-[15%] top-[15%] w-8 h-8 rounded-full bg-indigo-900 border border-indigo-500/70 flex items-center justify-center z-20"
        >
          <MessageCircle className="w-4 h-4 text-indigo-400" />
          <div className="absolute inset-0 rounded-full border border-indigo-400 animate-ping opacity-50"></div>
        </div>
        
        {/* Render workstations with hover effect */}
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
            isPulsing={pulsing[division.id]}
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
