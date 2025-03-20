
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
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
  const { t, isRTL } = useLanguage();
  
  // Get divisions with translations
  const divisions = getDivisions(t);
  
  // Handle division selection
  const handleDivisionClick = (divisionId: string) => {
    setSelectedDivision(selectedDivision === divisionId ? null : divisionId);
  };
  
  return (
    <Card className="relative w-full h-[500px] overflow-hidden border-2 p-0 bg-gray-100 dark:bg-gray-900 scan-lines neon-border">
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
        
        {/* Floor markings - circular central element */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-flow-accent/20 opacity-10"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-flow-accent/30 opacity-20"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Central server/mainframe */}
        <motion.div 
          className="absolute left-1/2 top-[15%] -translate-x-1/2 w-8 h-16 bg-blue-900 dark:bg-blue-800 rounded-sm border border-flow-accent/70 neon-border flex flex-col items-center justify-center gap-1 overflow-hidden z-20"
          animate={{ 
            boxShadow: [
              '0 0 5px rgba(var(--flow-accent), 0.3)',
              '0 0 15px rgba(var(--flow-accent), 0.5)',
              '0 0 5px rgba(var(--flow-accent), 0.3)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="w-6 h-1 bg-flow-accent/80 animate-pulse-subtle rounded-sm"></div>
          <div className="w-6 h-1 bg-green-500/80 animate-pulse-subtle rounded-sm"></div>
          <div className="w-6 h-1 bg-purple-500/80 animate-pulse-subtle rounded-sm"></div>
          <Cpu className="w-5 h-5 text-flow-accent/90" />
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
        
        {/* Render agents */}
        {agents.map(agent => (
          <AgentCharacter 
            key={agent.id} 
            agent={agent}
            routePath={agent.route}
          />
        ))}
        
        {/* Decorative elements */}
        <div className="absolute top-2 left-2 p-1 bg-gray-300 dark:bg-gray-700 rounded text-xs neon-border z-30">Floor Plan v2.0</div>
        <div className="absolute bottom-2 right-2 p-1 bg-gray-300 dark:bg-gray-700 rounded text-xs neon-border z-30">Agency HQ</div>
      </div>
    </Card>
  );
};

export default OfficeFloorPlan;
