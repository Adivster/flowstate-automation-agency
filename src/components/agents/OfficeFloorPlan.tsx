
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  getDivisions, 
  workstations, 
  decorations, 
  holograms, 
  agents
} from './office/data';
import DataTransmissionManager, { DataTransmission } from './office/DataTransmissionManager';
import NotificationManager, { Notification } from './office/NotificationManager';
import OfficeElements from './office/OfficeElements';
import OfficeControls from './office/OfficeControls';
import InfoPanelManager from './office/InfoPanelManager';

const OfficeFloorPlan: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dataTransmissions, setDataTransmissions] = useState<DataTransmission[]>([]);
  const [pulsing, setPulsing] = useState<Record<string, boolean>>({});
  const { t } = useLanguage();
  
  const divisions = getDivisions(t);
  
  useEffect(() => {
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
    
    return () => {
      setDataTransmissions([]);
    };
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const divs = ['kb', 'analytics', 'operations', 'strategy', 'lounge', 'research'];
      let div1 = divs[Math.floor(Math.random() * divs.length)];
      let div2 = divs[Math.floor(Math.random() * divs.length)];
      while (div1 === div2) {
        div2 = divs[Math.floor(Math.random() * divs.length)];
      }
      
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
          temporary: true,
          pulseSpeed: 1.5
        };
        
        setDataTransmissions(prev => [...prev, newTransmission]);
        
        setTimeout(() => {
          setDataTransmissions(prev => prev.filter(t => t.id !== newTransmission.id));
        }, 4000);
        
        if (Math.random() > 0.5) {
          const msgTypes = ['Data synced', 'Process completed', 'Update received', 'Task assigned'];
          const msg = msgTypes[Math.floor(Math.random() * msgTypes.length)];
          const notifTypes = ['success', 'info', 'warning', 'error'] as const;
          const type = notifTypes[Math.floor(Math.random() * 3)];
          
          const notif: Notification = {
            id: Date.now(),
            x: division2.position.x + (division2.position.width / 2),
            y: division2.position.y - 5,
            message: msg,
            type
          };
          
          setNotifications(prev => [...prev, notif]);
          
          setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== notif.id));
          }, 2000);
        }
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [divisions]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const randomDivId = divisions[Math.floor(Math.random() * divisions.length)].id;
      
      setPulsing(prev => ({
        ...prev,
        [randomDivId]: true
      }));
      
      setTimeout(() => {
        setPulsing(prev => ({
          ...prev,
          [randomDivId]: false
        }));
      }, 3000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [divisions]);
  
  const handleDivisionClick = (divisionId: string) => {
    setSelectedDivision(divisionId);
    setSelectedAgent(null);
    setShowInfoPanel(true);
    
    setPulsing(prev => ({
      ...prev,
      [divisionId]: true
    }));
    
    setTimeout(() => {
      setPulsing(prev => ({
        ...prev,
        [divisionId]: false
      }));
    }, 2000);
  };
  
  const handleAgentClick = (agentId: number) => {
    setSelectedAgent(agentId);
    setSelectedDivision(null);
    setShowInfoPanel(true);
  };

  const handleCloseInfoPanel = () => {
    setShowInfoPanel(false);
    setSelectedDivision(null);
    setSelectedAgent(null);
  };
  
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setShowInfoPanel(false);
      setSelectedDivision(null);
      setSelectedAgent(null);
    }
  };
  
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
  
  const selectedDivisionObject = selectedDivision 
    ? divisions.find(d => d.id === selectedDivision) 
    : null;
    
  const selectedAgentObject = selectedAgent 
    ? agents.find(a => a.id === selectedAgent) 
    : null;
  
  return (
    <Card className="relative w-full h-[550px] overflow-hidden border-2 p-0 bg-gray-100 dark:bg-gray-900 neon-border">
      <div 
        className="absolute inset-0 bg-gray-200 dark:bg-gray-800"
        onClick={handleBackgroundClick}
      >
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, rgba(156, 163, 175, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(156, 163, 175, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
        
        <DataTransmissionManager transmissions={dataTransmissions} />
        
        <NotificationManager notifications={notifications} />
        
        <OfficeElements 
          divisions={divisions}
          workstations={workstations}
          decorations={decorations}
          holograms={holograms}
          agents={agents}
          selectedDivision={selectedDivision}
          selectedAgent={selectedAgent}
          pulsing={pulsing}
          onDivisionClick={handleDivisionClick}
          onAgentClick={handleAgentClick}
        />
        
        <OfficeControls translationFunction={t} />
        
        <InfoPanelManager 
          selectedDivision={selectedDivision}
          selectedDivisionObject={selectedDivisionObject}
          selectedAgent={selectedAgent}
          selectedAgentObject={selectedAgentObject}
          showInfoPanel={showInfoPanel}
          agents={agents}
          onClose={handleCloseInfoPanel}
        />
      </div>
    </Card>
  );
};

export default OfficeFloorPlan;
