
import React from 'react';

export type WorkstationType = {
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  rotation?: number;
};

interface WorkstationProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation?: number;
  hasComputer?: boolean;
  hasPerson?: boolean;
  type?: string;
}

const Workstation: React.FC<WorkstationProps> = ({ 
  x, 
  y, 
  width = 10, 
  height = 6, 
  rotation = 0, 
  hasComputer = true, 
  hasPerson = false, 
  type = 'desk' 
}) => {
  const getStyles = () => {
    switch (type) {
      case 'desk':
        return {
          bgColor: 'bg-gray-400 dark:bg-gray-700',
          hasScreen: hasComputer
        };
      case 'meeting':
        return {
          bgColor: 'bg-amber-800 dark:bg-amber-900',
          hasScreen: false
        };
      case 'server':
        return {
          bgColor: 'bg-slate-600 dark:bg-slate-800',
          hasScreen: false
        };
      case 'sofa':
        return {
          bgColor: 'bg-amber-400 dark:bg-amber-600',
          hasScreen: false
        };
      case 'coffee_table':
        return {
          bgColor: 'bg-amber-700 dark:bg-amber-800',
          hasScreen: false
        };
      default:
        return {
          bgColor: 'bg-gray-400 dark:bg-gray-700',
          hasScreen: hasComputer
        };
    }
  };
  
  const { bgColor, hasScreen } = getStyles();
  
  return (
    <div 
      className={`absolute ${bgColor} rounded-sm shadow-md`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center center',
        zIndex: 10
      }}
    >
      {hasScreen && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-1/2 bg-blue-900 dark:bg-blue-800 rounded-sm flex items-center justify-center">
          <div className="w-3/4 h-3/4 bg-cyan-300 dark:bg-cyan-400 opacity-70"></div>
        </div>
      )}
    </div>
  );
};

export default Workstation;
