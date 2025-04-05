
import React, { useState, useEffect, useRef } from 'react';
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
import { fixOverlaps, optimizeLayout } from './office/utils/layoutUtils';
import DataTransmissionManager, { DataTransmission } from './office/DataTransmissionManager';
import NotificationManager, { Notification } from './office/NotificationManager';
import OfficeElements from './office/OfficeElements';
import OfficeControls from './office/OfficeControls';
import InfoPanelManager from './office/InfoPanelManager';
import { Button } from '@/components/ui/button';
import { Pencil, Save, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const OfficeFloorPlan: React.FC = () => {
  // Component state
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dataTransmissions, setDataTransmissions] = useState<DataTransmission[]>([]);
  const [pulsing, setPulsing] = useState<Record<string, boolean>>({});
  const [editMode, setEditMode] = useState(false);
  const [divisionPositions, setDivisionPositions] = useState<Record<string, {x: number, y: number}>>({});
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Hooks
  const { t } = useLanguage();
  const { toast } = useToast();
  const divisions = getDivisions(t);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  
  // Handle initial load to prevent flickering
  useEffect(() => {
    // Immediately set loaded state to avoid flash
    if (isInitialMount.current) {
      isInitialMount.current = false;
      
      // Load positions from localStorage or use optimized positions
      try {
        const savedPositions = localStorage.getItem('officeDivisionPositions');
        
        if (savedPositions) {
          setDivisionPositions(JSON.parse(savedPositions));
        } else {
          // Use optimized layout instead of just fixing overlaps
          setDivisionPositions(optimizeLayout(divisions, defaultDivisionPositions));
        }
      } catch (error) {
        console.error('Error loading saved division positions:', error);
        setDivisionPositions(optimizeLayout(divisions, defaultDivisionPositions));
      }
      
      // Signal that loading is complete
      setIsLoaded(true);
    }
  }, [divisions]);
  
  // Setup data transmissions once loaded
  useEffect(() => {
    if (!isLoaded) return;
    
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
  }, [isLoaded]);
  
  // Handle random data transmissions
  useEffect(() => {
    if (!isLoaded) return;
    
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
  }, [divisions, isLoaded]);
  
  // Handle division pulsing effect
  useEffect(() => {
    if (!isLoaded) return;
    
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
  }, [divisions, isLoaded]);
  
  // Handle division click
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
  
  // Handle agent click
  const handleAgentClick = (agentId: number) => {
    if (editMode) return;
    
    setSelectedAgent(agentId);
    setSelectedDivision(null);
    setShowInfoPanel(true);
  };

  // Handle closing the info panel
  const handleCloseInfoPanel = () => {
    setShowInfoPanel(false);
    setSelectedDivision(null);
    setSelectedAgent(null);
  };
  
  // Handle background click to deselect
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setShowInfoPanel(false);
      setSelectedDivision(null);
      setSelectedAgent(null);
    }
  };
  
  // Handle escape key to exit edit mode or close panels
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showInfoPanel) {
          setSelectedDivision(null);
          setSelectedAgent(null);
          setShowInfoPanel(false);
        } else if (editMode) {
          setEditMode(false);
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [editMode, showInfoPanel]);
  
  const selectedDivisionObject = selectedDivision 
    ? divisions.find(d => d.id === selectedDivision) 
    : null;
    
  const selectedAgentObject = selectedAgent 
    ? agents.find(a => a.id === selectedAgent) 
    : null;
  
  // Toggle edit mode
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
  
  // Handle division drag end
  const handleDivisionDragEnd = (divisionId: string, x: number, y: number) => {
    // Create a safety buffer from edges
    const boundedX = Math.max(5, Math.min(95 - 20, x));
    const boundedY = Math.max(5, Math.min(85 - 20, y));
    
    // Update position without overlap check - we'll provide visual feedback instead
    setDivisionPositions(prev => ({
      ...prev,
      [divisionId]: { x: boundedX, y: boundedY }
    }));
  };
  
  // Save division positions
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
  
  // Reset division positions
  const resetPositions = () => {
    const optimizedPositions = optimizeLayout(divisions, defaultDivisionPositions);
    
    setDivisionPositions(optimizedPositions);
    localStorage.setItem('officeDivisionPositions', JSON.stringify(optimizedPositions));
    
    toast({
      title: t('layoutReset'),
      description: t('officeLayoutReset'),
      duration: 2000,
    });
  };
  
  // Handle zoom in
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  };
  
  // Handle zoom out
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.8));
  };
  
  // Loading placeholder
  if (!isLoaded) {
    return (
      <Card className="relative w-full h-[550px] overflow-hidden border-2 p-0 bg-gray-100 dark:bg-gray-900 neon-border">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-flow-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="relative w-full h-[550px] overflow-hidden border-2 p-0 bg-gray-100 dark:bg-gray-900 neon-border">
      <div 
        ref={contentRef}
        className="absolute inset-0 bg-gray-200 dark:bg-gray-800 select-none overflow-hidden"
        onClick={handleBackgroundClick}
        style={{
          transformOrigin: 'center center',
        }}
      >
        <div 
          className="absolute inset-0 will-change-transform" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, rgba(156, 163, 175, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(156, 163, 175, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center'
          }}
        />
        
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center'
          }}
          className="absolute inset-0"
        >
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
        </div>
        
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
        
        {/* Editing Controls */}
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
        
        {/* Zoom Controls */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 z-40">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 bg-gray-800/70 backdrop-blur-sm text-white border-gray-600 hover:bg-gray-700/80"
            onClick={handleZoomOut}
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          
          <Button 
            size="sm"
            variant="outline"
            className="h-8 bg-gray-800/70 backdrop-blur-sm text-white border-gray-600 hover:bg-gray-700/80 px-2"
            onClick={() => setZoomLevel(1)}
          >
            {Math.round(zoomLevel * 100)}%
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 bg-gray-800/70 backdrop-blur-sm text-white border-gray-600 hover:bg-gray-700/80"
            onClick={handleZoomIn}
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      
      <style>
        {`
        @keyframes pulse-opacity {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.9; }
        }
        .loader {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(99, 102, 241, 0.3);
          border-top-color: rgba(99, 102, 241, 0.9);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        `}
      </style>
    </Card>
  );
};

export default OfficeFloorPlan;
