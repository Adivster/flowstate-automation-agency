
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ZIndexLayers } from './types/officeTypes';
import DivisionDecoration from './DivisionDecoration';
import { getDivisionStyle } from './styles/divisionStyles';

interface DivisionProps {
  division: {
    id: string;
    name: string;
    icon: any;
    position: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    backgroundColor: string;
    borderColor: string;
    zIndex?: number;
  };
  isSelected?: boolean;
  isPulsing?: boolean;
  onDivisionClick?: (id: string) => void;
  isDraggable?: boolean;
  onDragEnd?: (id: string, x: number, y: number) => void;
  customPosition?: { x: number; y: number };
  agents?: Array<any>;
}

const Division: React.FC<DivisionProps> = ({
  division,
  isSelected = false,
  isPulsing = false,
  onDivisionClick,
  isDraggable = false,
  onDragEnd,
  customPosition,
  agents = []
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get agents that belong to this division
  const divisionAgents = agents.filter(agent => agent.division === division.id);
  const agentCount = divisionAgents.length;
  
  // Get division style from our division styles
  const divStyle = getDivisionStyle(division.id);
  
  // Use custom position if provided, otherwise use division's position
  const xPos = customPosition?.x !== undefined ? customPosition.x : division.position.x;
  const yPos = customPosition?.y !== undefined ? customPosition.y : division.position.y;
  
  // Calculate box shadow based on state
  const getBoxShadow = () => {
    if (isSelected) {
      return `0 0 30px ${division.borderColor}, inset 0 0 20px ${division.borderColor}`;
    }
    if (isPulsing || isHovered) {
      return `0 0 15px ${division.borderColor}`;
    }
    return `0 0 5px ${division.borderColor}`;
  };
  
  // Calculate z-index based on state
  const getZIndex = () => {
    if (isSelected) {
      return ZIndexLayers.DIVISION_SELECTED;
    }
    if (isHovered) {
      return ZIndexLayers.DIVISION_HOVERED;
    }
    return division.zIndex || ZIndexLayers.DIVISION;
  };
  
  // Decorations for the division
  const decorations = [
    { type: 'light', x: 30, y: 30 },
    { type: division.id === 'kb' ? 'boards' : 
            division.id === 'analytics' ? 'chart' :
            division.id === 'operations' ? 'server' :
            division.id === 'strategy' ? 'desk' :
            division.id === 'research' ? 'monitor' :
            'coffee', x: 70, y: 70 }
  ];
  
  const Icon = division.icon;
  
  return (
    <motion.div
      className="absolute rounded-xl border overflow-hidden cursor-pointer transition-all"
      style={{
        left: `${xPos}%`,
        top: `${yPos}%`,
        width: `${division.position.width}%`,
        height: `${division.position.height}%`,
        backgroundColor: division.backgroundColor,
        borderColor: division.borderColor,
        boxShadow: getBoxShadow(),
        zIndex: getZIndex(),
        backgroundImage: divStyle.pattern
      }}
      initial={{
        opacity: 0,
        scale: 0.9
      }}
      animate={{
        opacity: 1,
        scale: 1,
        boxShadow: getBoxShadow()
      }}
      transition={{
        duration: 0.5,
        boxShadow: {
          duration: 2,
          repeat: isPulsing ? Infinity : 0,
          repeatType: "reverse"
        }
      }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onDivisionClick && onDivisionClick(division.id)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      drag={isDraggable}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      dragMomentum={false}
      onDragEnd={(event, info) => {
        if (onDragEnd) {
          // Convert pixel offsets to percentage of container
          const container = (event.target as HTMLElement).parentElement;
          if (container) {
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;
            
            // Current position in percentage plus delta in percentage
            const newX = xPos + (info.offset.x / containerWidth * 100);
            const newY = yPos + (info.offset.y / containerHeight * 100);
            
            onDragEnd(division.id, newX, newY);
          }
        }
      }}
    >
      <div className="h-full w-full p-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className={`p-1.5 rounded-md flex items-center justify-center`} style={{ backgroundColor: `${division.borderColor}30` }}>
              <Icon className="h-3.5 w-3.5 text-white drop-shadow-glow" style={{ color: divStyle.text }} />
            </div>
            <h3 className="text-xs font-medium ml-1 tracking-wide text-white drop-shadow-md">{division.name}</h3>
          </div>
          
          <div className="bg-white/10 rounded-full text-[0.65rem] px-1.5 flex items-center">
            <span className="text-white/80">{agentCount}</span>
            <span className="ml-1 opacity-70">AI</span>
          </div>
        </div>
        
        {/* Division decorations */}
        {decorations.map((decoration, index) => (
          <DivisionDecoration
            key={`${division.id}-decor-${index}`}
            type={decoration.type}
            x={decoration.x}
            y={decoration.y}
            divisionColor={division.borderColor}
            isHovered={isHovered}
          />
        ))}
        
        {/* Scan lines effect */}
        <div className="absolute inset-0 scan-lines opacity-20 pointer-events-none"></div>
        
        {/* Agent count indicator with glow effect */}
        <div className="absolute bottom-3 right-3">
          <div 
            className={`h-2 w-2 rounded-full ${isPulsing ? 'animate-ping-slow' : ''}`}
            style={{ backgroundColor: divStyle.text, boxShadow: `0 0 5px ${divStyle.glow}` }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

export default Division;
