import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  getDivisions, 
  defaultDivisionPositions,
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
import { Button } from '@/components/ui/button';
import { Pencil, Save, RotateCcw, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const OfficeFloorPlan: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dataTransmissions, setDataTransmissions] = useState<DataTransmission[]>([]);
  const [pulsing, setPulsing] = useState<Record<string, boolean>>({});
  const [editMode, setEditMode] = useState(false);
  const [divisionPositions, setDivisionPositions] = useState<Record<string, {x: number, y: number}>>({});
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const divisions = getDivisions(t);
  
  useEffect(() => {
    const savedPositions = localStorage.getItem('officeDivisionPositions');
    if (savedPositions) {
      try {
        setDivisionPositions(JSON.parse(savedPositions));
      } catch (error) {
        console.error('Error loading saved division positions:', error);
      }
    }
  }, []);
  
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
    if (editMode) return;
    
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
    if (editMode) return;
    
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
        
        if (editMode) {
          setEditMode(false);
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [editMode]);
  
  const selectedDivisionObject = selectedDivision 
    ? divisions.find(d => d.id === selectedDivision) 
    : null;
    
  const selectedAgentObject = selectedAgent 
    ? agents.find(a => a.id === selectedAgent) 
    : null;
  
  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      savePositions();
    } else {
      setSelectedDivision(null);
      setSelectedAgent(null);
      setShowInfoPanel(false);
      
      toast({
        title: t('editModeEnabled'),
        description: t('dragDivisionsToReposition'),
        duration: 3000,
      });
    }
  };
  
  const handleDivisionDragEnd = (divisionId: string, x: number, y: number) => {
    const boundedX = Math.max(5, Math.min(95, x));
    const boundedY = Math.max(5, Math.min(85, y));
    
    setDivisionPositions(prev => ({
      ...prev,
      [divisionId]: { x: boundedX, y: boundedY }
    }));
  };
  
  const savePositions = () => {
    try {
      localStorage.setItem('officeDivisionPositions', JSON.stringify(divisionPositions));
      toast({
        title: t('layoutSaved'),
        description: t('officeLayoutSaved'),
        duration: 2000,
      });
    } catch (error) {
      console.error('Error saving division positions:', error);
      toast({
        title: t('error'),
        description: t('errorSavingLayout'),
        variant: 'destructive',
        duration: 3000,
      });
    }
  };
  
  const resetPositions = () => {
    setDivisionPositions({});
    localStorage.removeItem('officeDivisionPositions');
    toast({
      title: t('layoutReset'),
      description: t('officeLayoutReset'),
      duration: 2000,
    });
  };
  
  return (
    <Card className="relative w-full h-[550px] overflow-hidden border-2 p-0 bg-gray-100 dark:bg-gray-900 neon-border">
      <div 
        className="absolute inset-0 bg-gray-200 dark:bg-gray-800 select-none"
        onClick={handleBackgroundClick}
      >
        <div 
          className="absolute inset-0 will-change-transform" 
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
          editMode={editMode}
          onDivisionDragEnd={handleDivisionDragEnd}
          divisionPositions={divisionPositions}
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
        
        <div className="absolute top-3 right-3 flex items-center gap-2 z-40">
          {editMode ? (
            <>
              <Button 
                size="sm" 
                variant="outline"
                className="h-8 px-2.5 bg-gray-800/70 backdrop-blur-sm text-white border-gray-600 hover:bg-gray-700/80"
                onClick={resetPositions}
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                {t('reset')}
              </Button>
              
              <Button 
                size="sm" 
                variant="outline" 
                className="h-8 px-2.5 bg-green-600/70 backdrop-blur-sm text-white border-green-500 hover:bg-green-700/80"
                onClick={savePositions}
              >
                <Save className="h-3.5 w-3.5 mr-1" />
                {t('save')}
              </Button>
              
              <Button 
                size="sm" 
                variant="outline" 
                className="h-8 px-2.5 bg-red-600/70 backdrop-blur-sm text-white border-red-500 hover:bg-red-700/80"
                onClick={toggleEditMode}
              >
                <X className="h-3.5 w-3.5 mr-1" />
                {t('exit')}
              </Button>
            </>
          ) : (
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 px-2.5 bg-gray-800/70 backdrop-blur-sm text-white border-gray-600 hover:bg-gray-700/80"
              onClick={toggleEditMode}
            >
              <Pencil className="h-3.5 w-3.5 mr-1" />
              {t('customize')}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default OfficeFloorPlan;
