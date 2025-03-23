
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import AgentCharacter from './AgentCharacter';
import Workstation from './office/Workstation';
import DecorativeElement from './office/DecorativeElement';
import HolographicElement from './office/HolographicElement';
import Division from './office/Division';
import DataTransmissionPath from './office/DataTransmissionPath';
import NotificationPopup from './office/NotificationPopup';
import CentralServer from './office/CentralServer';
import CommunicationHub from './office/CommunicationHub';
import DivisionInfoPanel from './office/DivisionInfoPanel';
import AgentInfoPanel from './office/AgentInfoPanel';
import { usePerformanceData } from '@/hooks/usePerformanceData';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  getDivisions, 
  workstations, 
  decorations, 
  holograms, 
  agents
} from './office/officeData';

interface Notification {
  id: number;
  x: number;
  y: number;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface DataTransmission {
  id: string | number;
  start: { x: number; y: number };
  end: { x: number; y: number };
  color: string;
  temporary?: boolean;
  pulseSpeed?: number;
}

const OfficeFloorPlan: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dataTransmissions, setDataTransmissions] = useState<DataTransmission[]>([]);
  const [pulsing, setPulsing] = useState<Record<string, boolean>>({});
  const { t } = useLanguage();
  
  // Get performance data
  const performanceData = usePerformanceData();
  
  // Get divisions - pass the translation function
  const divisions = getDivisions(t);
  
  // Create initial data transmissions
  useEffect(() => {
    // Create connections between divisions
    const initialTransmissions: DataTransmission[] = [
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
    
    // Clean up to avoid memory leaks
    return () => {
      setDataTransmissions([]);
    };
  }, []);
  
  // Create temporary data transmissions periodically
  useEffect(() => {
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
        const newTransmission: DataTransmission = {
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
          const notifTypes = ['success', 'info', 'warning', 'error'] as const;
          const type = notifTypes[Math.floor(Math.random() * 3)]; // Avoid error type most of the time
          
          // Add notification
          const notif: Notification = {
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

  // Handle closing info panel
  const handleCloseInfoPanel = () => {
    setShowInfoPanel(false);
  };
  
  // Handle escape key to close info panel
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
        <CentralServer />
        
        {/* Communication hub with animated ping effect */}
        <CommunicationHub />
        
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
            isPulsing={pulsing[division.id]}
            onDivisionClick={handleDivisionClick}
            agents={agents}
          />
        ))}
        
        {/* Render agents */}
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
        
        {/* Info panels */}
        <AnimatePresence>
          {selectedDivision && showInfoPanel && (
            <DivisionInfoPanel
              division={divisions.find(d => d.id === selectedDivision)!}
              agents={agents}
              performanceData={performanceData}
              onClose={handleCloseInfoPanel}
            />
          )}
          
          {selectedAgent && showInfoPanel && (
            <AgentInfoPanel
              agent={agents.find(a => a.id === selectedAgent)!}
              performanceData={performanceData}
              onClose={handleCloseInfoPanel}
            />
          )}
        </AnimatePresence>
        
        {/* Chat button */}
        <div className="flex justify-end items-center absolute bottom-3 left-2 z-30">
          <button 
            className="text-xs flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition-colors"
            onClick={() => window.dispatchEvent(new CustomEvent('openCommunicationTerminal'))}
          >
            <MessageCircle className="h-3 w-3" />
            {t('openChat')}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default OfficeFloorPlan;
