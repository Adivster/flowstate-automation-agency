
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ZIndexLayers } from './types/officeTypes';
import MiniSparkline, { SparklineData } from './MiniSparkline';
import { Activity, BarChart2, ZapOff, Settings } from 'lucide-react';

interface DivisionProps {
  division: {
    id: string;
    name: string;
    position: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    borderColor: string;
    backgroundColor: string;
    textColor: string;
    agentIds?: number[];
  };
  isSelected: boolean;
  isPulsing: boolean;
  onDivisionClick: (id: string) => void;
  agents?: any[];
  isDraggable?: boolean;
  onDragEnd?: (id: string, x: number, y: number) => void;
  customPosition?: {
    x: number;
    y: number;
  };
  performanceData?: number[];
  activityLevel?: number;
  showQuickActions?: boolean;
  onQuickAction?: (divisionId: string, action: string) => void;
}

const Division: React.FC<DivisionProps> = ({
  division,
  isSelected,
  isPulsing,
  onDivisionClick,
  agents = [],
  isDraggable = false,
  onDragEnd,
  customPosition,
  performanceData,
  activityLevel,
  showQuickActions = false,
  onQuickAction
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showStats, setShowStats] = useState(false);
  
  const position = {
    x: customPosition?.x !== undefined ? customPosition.x : division.position.x,
    y: customPosition?.y !== undefined ? customPosition.y : division.position.y
  };

  // Count agents in this division
  const divisionAgents = agents.filter(agent => agent.division === division.id);
  const workingAgents = divisionAgents.filter(agent => agent.status === 'working').length;
  const totalAgents = divisionAgents.length;
  
  // Calculate metrics
  const utilization = totalAgents > 0 ? (workingAgents / totalAgents) * 100 : 0;
  
  // Handle drag end
  const handleDragEnd = (event: any, info: any) => {
    if (onDragEnd) {
      // Calculate the percentage move based on the container
      const container = document.querySelector('.office-container');
      if (container) {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Convert pixels to percentage
        const deltaXPercent = (info.offset.x / containerWidth) * 100;
        const deltaYPercent = (info.offset.y / containerHeight) * 100;
        
        // New position in percentage
        const newX = position.x + deltaXPercent;
        const newY = position.y + deltaYPercent;
        
        onDragEnd(division.id, newX, newY);
      }
    }
    setIsDragging(false);
  };

  const getEfficiencyColor = (level?: number) => {
    if (level === undefined) return 'text-gray-500';
    if (level >= 80) return 'text-green-500';
    if (level >= 50) return 'text-amber-500';
    return 'text-red-500';
  };
  
  // Determine activity status
  const getActivityStatus = (level?: number) => {
    if (level === undefined) return 'normal';
    if (level >= 80) return 'high';
    if (level <= 30) return 'low';
    return 'normal';
  };
  
  const activityStatus = getActivityStatus(activityLevel);

  return (
    <motion.div
      className="absolute rounded-xl overflow-hidden"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: `${division.position.width}%`,
        height: `${division.position.height}%`,
        backgroundColor: division.backgroundColor,
        border: `2px solid ${division.borderColor}`,
        zIndex: isDragging ? ZIndexLayers.DIVISION_DRAGGING : isSelected ? ZIndexLayers.DIVISION_SELECTED : ZIndexLayers.DIVISION,
        boxShadow: isSelected ? `0 0 15px ${division.borderColor}` : isPulsing ? `0 0 10px ${division.borderColor}80` : 'none',
        cursor: isDraggable ? 'move' : 'pointer',
      }}
      onClick={() => !isDragging && onDivisionClick(division.id)}
      drag={isDraggable}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      dragMomentum={false}
      dragElastic={0.1}
      whileHover={{ boxShadow: `0 0 10px ${division.borderColor}80` }}
      animate={{
        boxShadow: isPulsing && !isSelected ? [
          `0 0 5px ${division.borderColor}50`,
          `0 0 15px ${division.borderColor}90`,
          `0 0 5px ${division.borderColor}50`
        ] : isSelected ? `0 0 15px ${division.borderColor}` : 'none'
      }}
      transition={{
        boxShadow: {
          repeat: isPulsing && !isSelected ? Infinity : 0,
          duration: 2,
          ease: "easeInOut",
        }
      }}
    >
      {/* Division name and metrics */}
      <div className="absolute top-0 left-0 p-2 z-10 flex flex-col">
        <div className="flex items-center mb-1">
          <div 
            className="h-2 w-2 rounded-full mr-1.5"
            style={{
              backgroundColor: activityStatus === 'high' ? '#10B981' : 
                               activityStatus === 'low' ? '#F59E0B' : 
                               '#6B7280'
            }}
          />
          <h3 className="text-xs font-semibold" style={{ color: division.textColor }}>
            {division.name}
          </h3>
        </div>
        
        {/* Mini metrics label */}
        {performanceData && (
          <div 
            className="bg-black/40 backdrop-blur-sm rounded px-1.5 py-1 flex items-center gap-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setShowStats(!showStats);
            }}
          >
            <Activity className="h-2.5 w-2.5 text-white/70" />
            <span className="text-[9px] text-white/70">Metrics</span>
          </div>
        )}
      </div>
      
      {/* Quick actions */}
      {showQuickActions && (
        <div className="absolute bottom-1 right-1 z-20 flex space-x-1">
          <motion.button
            className="h-6 w-6 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm"
            whileHover={{ scale: 1.2 }}
            onClick={(e) => {
              e.stopPropagation();
              onQuickAction && onQuickAction(division.id, 'analyze');
            }}
          >
            <BarChart2 className="h-3 w-3 text-white/80" />
          </motion.button>
          
          <motion.button
            className="h-6 w-6 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm"
            whileHover={{ scale: 1.2 }}
            onClick={(e) => {
              e.stopPropagation();
              onQuickAction && onQuickAction(division.id, 'optimize');
            }}
          >
            <Settings className="h-3 w-3 text-white/80" />
          </motion.button>
          
          <motion.button
            className="h-6 w-6 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm"
            whileHover={{ scale: 1.2 }}
            onClick={(e) => {
              e.stopPropagation();
              onQuickAction && onQuickAction(division.id, 'add-agent');
            }}
          >
            <span className="text-white text-xs font-medium">+</span>
          </motion.button>
        </div>
      )}
      
      {/* Expanded metrics panel */}
      {showStats && performanceData && (
        <motion.div 
          className="absolute bottom-2 left-2 bg-black/70 rounded-lg backdrop-blur-md p-2 z-30 border border-white/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] text-white/70">Efficiency</span>
            <span className={`text-[10px] font-medium ${getEfficiencyColor(performanceData[performanceData.length - 1])}`}>
              {performanceData[performanceData.length - 1]}%
            </span>
          </div>
          
          <div className="h-12 w-32">
            <MiniSparkline 
              data={performanceData} 
              width={120} 
              height={40}
              color="#6366f1"
              fillOpacity={0.3}
              animated={true}
            />
          </div>
          
          <div className="flex justify-between mt-1">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/70">Agents</span>
              <span className="text-xs font-medium text-white">{totalAgents}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-white/70">Active</span>
              <span className="text-xs font-medium text-white">{workingAgents}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-white/70">Activity</span>
              <span className={`text-xs font-medium ${
                activityStatus === 'high' ? 'text-green-400' : 
                activityStatus === 'low' ? 'text-amber-400' : 
                'text-white'
              }`}>
                {activityLevel !== undefined ? `${activityLevel}%` : 'N/A'}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Division;
