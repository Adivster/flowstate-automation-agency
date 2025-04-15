
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ZIndexLayers } from './types/officeTypes';
import DivisionDecoration from './DivisionDecoration';
import { getDivisionStyle, getDivisionHexColors } from '@/utils/colorSystem';
import MiniSparkline from './MiniSparkline';
import { Activity, Gauge, Plus, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  performanceData?: number[];
  activityLevel?: number;
  showQuickActions?: boolean;
  onQuickAction?: (divisionId: string, action: string) => void;
}

const Division: React.FC<DivisionProps> = ({
  division,
  isSelected = false,
  isPulsing = false,
  onDivisionClick,
  isDraggable = false,
  onDragEnd,
  customPosition,
  agents = [],
  performanceData,
  activityLevel = 0,
  showQuickActions = false,
  onQuickAction
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get agents that belong to this division
  const divisionAgents = agents.filter(agent => agent.division === division.id);
  const agentCount = divisionAgents.length;
  
  // Get division style from our division styles
  const divStyle = getDivisionStyle(division.id);
  
  // Get hex colors for styling
  const hexColors = getDivisionHexColors(division.id);
  
  // Use custom position if provided, otherwise use division's position
  const xPos = customPosition?.x !== undefined ? customPosition.x : division.position.x;
  const yPos = customPosition?.y !== undefined ? customPosition.y : division.position.y;
  
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
  
  // Enhanced styling for selection state
  const getBorderEffect = () => {
    if (isSelected) {
      return `0 0 0 2px ${hexColors.primary}, 0 0 30px ${hexColors.shadow}, inset 0 0 20px ${hexColors.shadow}`;
    } else if (isHovered || isPulsing) {
      return `0 0 15px ${hexColors.shadow}`;
    }
    return `0 0 5px ${hexColors.shadow}`;
  };

  const getActivityIndicator = () => {
    if (activityLevel > 75) return "bg-red-500";
    if (activityLevel > 50) return "bg-amber-500";
    if (activityLevel > 30) return "bg-green-500";
    return "bg-blue-500";
  };

  const handleQuickAction = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    if (onQuickAction) {
      onQuickAction(division.id, action);
    }
  };
  
  return (
    <motion.div
      className="absolute rounded-xl border overflow-hidden cursor-pointer transition-all"
      style={{
        left: `${xPos}%`,
        top: `${yPos}%`,
        width: `${division.position.width}%`,
        height: `${division.position.height}%`,
        backgroundColor: divStyle.bg,
        borderColor: divStyle.border,
        boxShadow: getBorderEffect(),
        zIndex: getZIndex(),
        backgroundImage: divStyle.pattern,
      }}
      initial={{
        opacity: 0,
        scale: 0.9
      }}
      animate={{
        opacity: 1,
        scale: 1,
        boxShadow: getBorderEffect(),
      }}
      transition={{
        duration: 0.4,
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
      {/* Division content */}
      <div className="h-full w-full p-4 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div 
              className="p-1.5 rounded-md flex items-center justify-center bg-white/10" 
              style={{ 
                boxShadow: `0 0 8px ${hexColors.shadow}`,
                background: isSelected ? `linear-gradient(135deg, ${hexColors.primary}40, ${hexColors.primary}20)` : 'rgba(255, 255, 255, 0.1)'
              }}
            >
              <Icon className="h-4 w-4 text-white drop-shadow-md" style={{ color: hexColors.primary }} />
            </div>
            <h3 className="text-sm font-medium ml-2 tracking-wide text-white drop-shadow-md font-cyber">{division.name}</h3>
          </div>
          
          <div 
            className="backdrop-blur-sm rounded-full text-xs px-2 py-0.5 flex items-center gap-1 border"
            style={{
              borderColor: `${hexColors.primary}40`,
              background: `${hexColors.primary}20`,
            }}
          >
            <span className="text-white">{agentCount}</span>
            <span className="opacity-70 text-white/80">AI</span>
          </div>
        </div>
        
        {/* Activity indicator */}
        <div className="flex-1 relative">
          {/* Central division content area - can be extended with more info */}
          {isSelected && (
            <motion.div 
              className="rounded-full w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              style={{ 
                boxShadow: `0 0 15px ${hexColors.shadow}`,
                background: `linear-gradient(135deg, ${hexColors.primary}30, ${hexColors.primary}10)`,
              }}
            >
              <Icon className="h-6 w-6" style={{ color: hexColors.primary }} />
            </motion.div>
          )}

          {/* Activity level indicator (circular pulsing dot) */}
          {activityLevel > 0 && (
            <div className="absolute bottom-0 right-0 flex items-center gap-1">
              <div className={`h-2 w-2 rounded-full ${getActivityIndicator()} animate-pulse`}></div>
            </div>
          )}
          
          {/* Performance sparkline - only show when not selected to avoid cluttering */}
          {performanceData && !isSelected && (
            <div className="absolute bottom-0 left-0 bg-black/30 p-1 rounded backdrop-blur-sm">
              <MiniSparkline 
                data={performanceData} 
                color={hexColors.primary} 
                height={15}
                width={40}
                fillOpacity={0.3}
              />
            </div>
          )}
          
          {/* Quick action buttons that appear on hover */}
          {showQuickActions && isHovered && !isSelected && (
            <motion.div 
              className="absolute top-0 right-0 flex gap-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60"
                onClick={(e) => handleQuickAction(e, 'optimize')}
              >
                <Zap className="h-3 w-3 text-yellow-400" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60"
                onClick={(e) => handleQuickAction(e, 'analyze')}
              >
                <Activity className="h-3 w-3 text-blue-400" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60"
                onClick={(e) => handleQuickAction(e, 'add-agent')}
              >
                <Plus className="h-3 w-3 text-green-400" />
              </Button>
            </motion.div>
          )}
        </div>
        
        {/* Division decorations */}
        {decorations.map((decoration, index) => (
          <DivisionDecoration
            key={`${division.id}-decor-${index}`}
            type={decoration.type}
            x={decoration.x}
            y={decoration.y}
            divisionColor={divStyle.primary}
            isHovered={isHovered}
          />
        ))}
        
        {/* Bottom status area */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1.5">
            <div 
              className={`h-1.5 w-1.5 rounded-full ${isPulsing || isHovered ? 'animate-pulse-subtle' : ''}`}
              style={{ 
                backgroundColor: hexColors.primary, 
                boxShadow: `0 0 5px ${hexColors.shadow}` 
              }}
            ></div>
            <span className="text-[0.65rem] text-white/70">Status: Active</span>
          </div>
          
          {/* Additional division info */}
          {divisionAgents.length > 0 && (
            <div className="flex items-center gap-1 text-[0.65rem] text-white/70">
              <Gauge className="h-3 w-3 text-white/50" />
              {Math.round(divisionAgents.reduce((sum, agent) => sum + agent.efficiency, 0) / divisionAgents.length)}% Eff
            </div>
          )}
        </div>
        
        {/* Scan lines effect */}
        <div className="absolute inset-0 scan-lines opacity-20 pointer-events-none"></div>
        
        {/* Neon border effect on hover */}
        {isHovered && (
          <motion.div 
            className="absolute inset-0 pointer-events-none rounded-xl border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ 
              borderColor: hexColors.primary,
              boxShadow: `0 0 15px ${hexColors.shadow}, inset 0 0 10px ${hexColors.shadow}`
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Division;
