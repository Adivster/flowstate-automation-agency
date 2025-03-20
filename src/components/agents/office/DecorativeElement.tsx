
import React from 'react';
import { Coffee, Activity } from 'lucide-react';

interface DecorativeElementProps {
  type: string;
  x: number;
  y: number;
  size?: number;
}

const DecorativeElement: React.FC<DecorativeElementProps> = ({ type, x, y, size = 3 }) => {
  const getElement = () => {
    switch(type) {
      case 'plant':
        return <div className="w-full h-full bg-green-700 dark:bg-green-800 rounded-full"></div>;
      case 'coffee':
        return <Coffee className="w-full h-full text-red-500" />;
      case 'monitor':
        return (
          <div className="w-full h-full bg-gray-800 rounded border border-gray-600 flex items-center justify-center p-1">
            <Activity className="w-2/3 h-2/3 text-cyan-400" />
          </div>
        );
      case 'server':
        return (
          <div className="w-full h-full bg-gray-800 rounded-sm border border-purple-500 flex flex-col gap-1 p-0.5">
            <div className="h-1/4 w-full bg-purple-500 opacity-70 rounded-sm"></div>
            <div className="h-1/4 w-full bg-cyan-500 opacity-70 rounded-sm"></div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div 
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}%`,
        height: `${size}%`,
        zIndex: 11
      }}
    >
      {getElement()}
    </div>
  );
};

export default DecorativeElement;
