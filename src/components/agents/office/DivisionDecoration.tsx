
import React from 'react';

interface DivisionDecorationProps {
  type: string;
  x: number;
  y: number;
}

const DivisionDecoration: React.FC<DivisionDecorationProps> = ({ type, x, y }) => {
  // Render decoration item with improved cyberpunk visual style
  const getIcon = () => {
    switch (type) {
      case 'boards': 
        return <div className="h-4 w-6 bg-white/30 rounded-sm border border-white/20 shadow-glow"></div>;
      case 'computer': 
        return (
          <div className="h-4 w-5 bg-blue-500/30 rounded-sm flex items-center justify-center border border-blue-500/30 shadow-[0_0_3px_rgba(59,130,246,0.5)]">
            <div className="h-2 w-3 bg-blue-200/50 rounded-sm"></div>
          </div>
        );
      case 'chart': 
        return (
          <div className="h-4 w-4 bg-cyan-500/30 rounded-sm flex items-center justify-center border border-cyan-500/30 shadow-[0_0_3px_rgba(8,145,178,0.5)]">
            <div className="h-2 w-2 border-b border-l border-cyan-200/70"></div>
          </div>
        );
      case 'desk': 
        return <div className="h-2 w-5 bg-gray-300/30 dark:bg-gray-600/30 rounded-sm border border-gray-300/20 dark:border-gray-600/20"></div>;
      case 'server': 
        return (
          <div className="h-4 w-3 bg-purple-500/30 rounded-sm flex flex-col justify-around items-center border border-purple-500/30 shadow-[0_0_3px_rgba(168,85,247,0.5)]">
            <div className="h-0.5 w-2 bg-purple-200/70"></div>
            <div className="h-0.5 w-2 bg-purple-200/70"></div>
          </div>
        );
      case 'monitor': 
        return (
          <div className="h-3 w-4 bg-blue-400/30 rounded-t-sm flex items-center justify-center border border-blue-400/30 shadow-[0_0_3px_rgba(96,165,250,0.5)]">
            <div className="h-1.5 w-3 bg-blue-100/50 rounded-[1px]"></div>
          </div>
        );
      case 'coffee': 
        return (
          <div className="h-3 w-2.5 bg-amber-700/30 rounded-sm border border-amber-700/20">
            <div className="h-0.5 w-1.5 bg-amber-200/40 mx-auto"></div>
          </div>
        );
      case 'sofa': 
        return (
          <div className="h-2 w-5 bg-amber-400/30 rounded-sm border border-amber-400/20">
            <div className="h-0.5 w-4 bg-amber-200/40 mx-auto"></div>
          </div>
        );
      case 'plant': 
        return (
          <div className="h-3 w-3 flex flex-col items-center">
            <div className="h-2 w-2 bg-green-500/40 rounded-full border border-green-500/30 shadow-[0_0_3px_rgba(34,197,94,0.5)]"></div>
            <div className="h-1 w-0.5 bg-green-800/40"></div>
          </div>
        );
      case 'meeting': 
        return (
          <div className="h-4 w-4 bg-gray-400/20 rounded-full flex items-center justify-center border border-gray-400/20">
            <div className="h-2 w-2 bg-gray-600/30 rounded-full"></div>
          </div>
        );
      default: 
        return null;
    }
  };
  
  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
      style={{
        left: `${x}%`,
        top: `${y}%`
      }}
    >
      <div className="rounded-sm">
        {getIcon()}
      </div>
    </div>
  );
};

export default DivisionDecoration;
