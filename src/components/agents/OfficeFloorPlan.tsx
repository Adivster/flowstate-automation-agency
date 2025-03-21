
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import AgentCharacter from './AgentCharacter';
import { useLanguage } from '@/contexts/LanguageContext';
import Workstation from './office/Workstation';
import DecorativeElement from './office/DecorativeElement';
import HolographicElement from './office/HolographicElement';
import Division from './office/Division';
import { 
  getDivisions, 
  workstations, 
  decorations, 
  holograms, 
  agents
} from './office/officeData';

const OfficeFloorPlan = () => {
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const { t, isRTL } = useLanguage();
  
  // Get divisions with translations
  const divisions = getDivisions(t);
  
  // Handle division selection
  const handleDivisionClick = (divisionId: string) => {
    setSelectedDivision(selectedDivision === divisionId ? null : divisionId);
    setShowInfoPanel(true);
  };

  // Close info panel when clicking escape
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedDivision(null);
        setShowInfoPanel(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);
  
  return (
    <Card className="relative w-full h-[550px] overflow-hidden border-2 p-0 bg-gray-100 dark:bg-gray-900 scan-lines neon-border">
      {/* Office floor */}
      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 cyber-grid">
        {/* Refined grid pattern */}
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, rgba(156, 163, 175, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(156, 163, 175, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Floor markings - circular central element with improved animations */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-flow-accent/20 opacity-10"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: 360
          }}
          transition={{ 
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 60, repeat: Infinity, ease: "linear" }
          }}
        />
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-flow-accent/30 opacity-20"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: -360
          }}
          transition={{ 
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 50, repeat: Infinity, ease: "linear" }
          }}
        />
        
        {/* Central server/mainframe with enhanced effects */}
        <motion.div 
          className="absolute left-1/2 top-[15%] -translate-x-1/2 w-10 h-18 bg-blue-900 dark:bg-blue-800 rounded-sm border border-flow-accent/70 neon-border flex flex-col items-center justify-center gap-1 overflow-hidden z-20"
          animate={{ 
            boxShadow: [
              '0 0 5px rgba(59, 130, 246, 0.3)',
              '0 0 15px rgba(59, 130, 246, 0.5)',
              '0 0 5px rgba(59, 130, 246, 0.3)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div 
            className="absolute inset-0 bg-blue-500/10"
            animate={{ 
              background: [
                'rgba(59, 130, 246, 0.1)',
                'rgba(59, 130, 246, 0.2)',
                'rgba(59, 130, 246, 0.1)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="w-6 h-1 bg-flow-accent/80 animate-pulse-subtle rounded-sm"></div>
          <div className="w-6 h-1 bg-green-500/80 animate-pulse-subtle rounded-sm"></div>
          <div className="w-6 h-1 bg-purple-500/80 animate-pulse-subtle rounded-sm"></div>
          <Cpu className="w-5 h-5 text-flow-accent/90" />
        </motion.div>
        
        {/* Communication hub - new feature */}
        <motion.div
          className="absolute right-[15%] top-[15%] w-8 h-8 rounded-full bg-indigo-900 border border-indigo-500/70 neon-border flex items-center justify-center z-20"
          whileHover={{ scale: 1.1 }}
          animate={{
            boxShadow: [
              '0 0 5px rgba(99, 102, 241, 0.3)',
              '0 0 15px rgba(99, 102, 241, 0.5)',
              '0 0 5px rgba(99, 102, 241, 0.3)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <MessageCircle className="w-4 h-4 text-indigo-400" />
          <motion.div
            className="absolute w-12 h-12 rounded-full border border-indigo-500/30"
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
        
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
        
        {/* Render agents with improved animations */}
        {agents.map(agent => (
          <AgentCharacter 
            key={agent.id} 
            agent={agent}
            routePath={agent.route}
          />
        ))}
        
        {/* Decorative elements with better positioning */}
        <div className="absolute top-2 left-2 p-1 bg-gray-300 dark:bg-gray-700 rounded text-xs neon-border z-30">Floor Plan v2.1</div>
        <div className="absolute bottom-6 right-2 p-1 bg-gray-300 dark:bg-gray-700 rounded text-xs neon-border z-30">Agency HQ</div>
        
        {/* Info panel for selected division */}
        <AnimatePresence>
          {selectedDivision && showInfoPanel && (
            <motion.div 
              className="absolute bottom-2 left-2 right-2 h-24 bg-black/60 backdrop-blur-sm rounded-md border border-flow-accent/30 p-3 z-50"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between">
                <h3 className="text-white text-sm font-bold">
                  {divisions.find(d => d.id === selectedDivision)?.name}
                </h3>
                <button 
                  className="text-white/70 hover:text-white"
                  onClick={() => setShowInfoPanel(false)}
                >
                  ×
                </button>
              </div>
              <p className="text-white/80 text-xs mt-1">
                {divisions.find(d => d.id === selectedDivision)?.description}
              </p>
              <div className="flex justify-end mt-1">
                <button className="text-xs bg-flow-accent/90 text-white px-2 py-0.5 rounded hover:bg-flow-accent">
                  {t('viewDetails')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default OfficeFloorPlan;
