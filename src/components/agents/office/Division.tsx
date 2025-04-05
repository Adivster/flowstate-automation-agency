
import React, { useState, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Division as DivisionType, ZIndexLayers } from './types/officeTypes';
import { GripVertical } from 'lucide-react';
import DivisionDecoration from './DivisionDecoration';
import { getDivisionStyle, getDivisionGlow, getDefaultDecorations } from './styles/divisionStyles';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface DivisionProps {
  division: DivisionType;
  isSelected: boolean;
  isPulsing?: boolean;
  onDivisionClick: (id: string) => void;
  agents: Array<any>;
  isDraggable?: boolean;
  onDragEnd?: (divisionId: string, x: number, y: number) => void;
  customPosition?: { x: number, y: number };
}

const Division: React.FC<DivisionProps> = ({ 
  division, 
  isSelected, 
  isPulsing = false,
  onDivisionClick, 
  agents,
  isDraggable = false,
  onDragEnd,
  customPosition
}) => {
  const { t } = useLanguage();
  const Icon = division.icon;
  const agentsInDivision = agents.filter(agent => agent.division === division.id);
  const activeAgents = agentsInDivision.filter(agent => agent.status === 'working');
  const dragControls = useDragControls();
  const [isHovered, setIsHovered] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  
  // Use custom position if provided, otherwise use the default position from division data
  const positionX = customPosition ? customPosition.x : division.position.x;
  const positionY = customPosition ? customPosition.y : division.position.y;
  
  // Get division style based on division ID
  const style = getDivisionStyle(division.id);
  
  // Get default decorations for this division
  const decorations = getDefaultDecorations(division.id);
  
  // Handle division drag end with improved position calculation
  const handleDragEnd = (event, info) => {
    if (onDragEnd) {
      // Get the parent container dimensions
      const parentWidth = event.target.parentElement.clientWidth;
      const parentHeight = event.target.parentElement.clientHeight;
      
      // Calculate new position as percentage
      const newX = positionX + (info.delta.x / parentWidth * 100);
      const newY = positionY + (info.delta.y / parentHeight * 100);
      
      onDragEnd(division.id, newX, newY);
    }
  };
  
  // Function to start drag only from the drag handle
  const startDrag = (event) => {
    dragControls.start(event);
  };

  // Calculate box shadow based on selection and pulse states
  const boxShadow = getDivisionGlow(division.id, isSelected, isPulsing);
  
  // Calculate z-index based on state
  const zIndex = isSelected 
    ? ZIndexLayers.DIVISION_SELECTED 
    : isHovered 
      ? ZIndexLayers.DIVISION_HOVERED 
      : division.zIndex || ZIndexLayers.DIVISION;

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <motion.div
          ref={divRef}
          key={division.id}
          className={`absolute rounded-lg overflow-hidden transition-all duration-300 backdrop-blur-sm ${isDraggable ? 'cursor-move' : 'cursor-pointer'}`}
          style={{
            left: `${positionX}%`,
            top: `${positionY}%`,
            width: `${division.position.width}%`,
            height: `${division.position.height}%`,
            backgroundColor: division.backgroundColor || style.bg,
            backgroundImage: style.pattern,
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: isSelected ? '#ffffff' : division.borderColor || style.border,
            boxShadow,
            zIndex,
            willChange: 'transform',
          }}
          onClick={() => !isDraggable && onDivisionClick(division.id)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={!isDraggable ? { scale: 1.01 } : {}}
          animate={
            isSelected ? { 
              scale: 1.03,
            } : 
            isPulsing ? {
              boxShadow: [
                `0 0 5px ${style.border}30`,
                style.shadow,
                `0 0 5px ${style.border}30`
              ]
            } : { 
              scale: 1
            }
          }
          drag={isDraggable}
          dragControls={dragControls}
          dragMomentum={false}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          transition={{
            boxShadow: {
              duration: 1.8,
              repeat: isPulsing ? Infinity : 0,
              repeatType: "reverse"
            }
          }}
        >
          {/* Enhanced Glass Reflection Effect */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: `linear-gradient(135deg, ${style.border}25 0%, transparent 50%, ${style.border}15 100%)`,
              zIndex: 1
            }}
          ></div>

          {/* Division Header with enhanced cyberpunk styling */}
          <div className="absolute top-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-1.5 flex items-center justify-between border-b" 
               style={{ borderColor: `${style.border}40`, zIndex: 5 }}>
            <div className="flex items-center">
              <motion.div 
                className="p-1 rounded-full mr-1.5" 
                animate={isPulsing || isSelected ? { 
                  boxShadow: [
                    `0 0 3px ${style.border}`, 
                    `0 0 8px ${style.border}`, 
                    `0 0 3px ${style.border}`
                  ] 
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ 
                  backgroundColor: `${style.border}20`,
                }}
              >
                <Icon className="h-4 w-4" style={{ color: style.text }} />
              </motion.div>
              <div className="text-xs font-semibold font-cyber" style={{ color: style.text }}>
                {division.name}
              </div>
            </div>
            
            {/* Drag handle - only visible in edit mode */}
            {isDraggable && (
              <div 
                className="p-1 rounded hover:bg-white/10 cursor-grab active:cursor-grabbing"
                onPointerDown={startDrag}
              >
                <GripVertical className="h-4 w-4 text-white/70" />
              </div>
            )}
          </div>
          
          {/* Active Agents Count */}
          <div className="absolute bottom-1 right-1" style={{ zIndex: 4 }}>
            <Badge 
              variant="outline" 
              className="text-[0.6rem] py-0 px-1.5 bg-black/50 backdrop-blur-sm text-white border-white/20 flex items-center gap-1"
              style={{ 
                borderColor: style.border, 
                boxShadow: isSelected ? `0 0 5px ${style.border}80` : 'none' 
              }}
            >
              <motion.span 
                className="inline-block w-1.5 h-1.5 rounded-full" 
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ backgroundColor: style.text }}
              ></motion.span>
              {activeAgents.length} {t('activeAgents')}
            </Badge>
          </div>
          
          {/* Division decoration items - these move with the division */}
          {decorations.map(item => (
            <DivisionDecoration 
              key={`${item.type}-${item.x}-${item.y}`} 
              type={item.type} 
              x={item.x} 
              y={item.y}
              divisionColor={style.border}
              isHovered={isHovered || isSelected}
            />
          ))}
          
          {/* Activity indicators - enhanced visibility */}
          {isPulsing && (
            <div className="absolute right-2 top-9 flex items-center" style={{ zIndex: 3 }}>
              <motion.span 
                className="absolute h-2 w-2 rounded-full opacity-75" 
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ backgroundColor: style.text }}
              ></motion.span>
              <span className="relative h-2 w-2 rounded-full" style={{ backgroundColor: style.text }}></span>
            </div>
          )}
          
          {/* Division Border Glow Effect for selected state */}
          {isSelected && (
            <div 
              className="absolute inset-0 rounded-lg pointer-events-none" 
              style={{ 
                boxShadow: `inset 0 0 15px ${style.border}40`,
                border: `1px solid ${style.border}60`,
                zIndex: 2
              }}
            />
          )}
          
          {/* Enhanced Scan Lines Effect */}
          <div 
            className="absolute inset-0 scan-lines pointer-events-none opacity-20"
            style={{ backgroundSize: '3px 3px', zIndex: 3 }}
          ></div>
          
          {/* Division Content Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
              zIndex: 1
            }}
          ></div>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent 
        className="bg-black/80 border border-flow-accent/30 text-white text-xs p-2 backdrop-blur-sm"
        side="top"
        style={{ zIndex: ZIndexLayers.UI_CONTROLS }}
      >
        <div className="font-medium" style={{ color: style.text }}>{division.name}</div>
        <div className="text-xs text-white/80">
          {agentsInDivision.length} agents ({activeAgents.length} active)
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default Division;
