
import React from 'react';
import { Coffee, Activity, BookOpen, Server, Monitor, Database, Cpu, Tv, Zap, Box, ArrowUpDown, Sofa, Leaf, ChefHat, Pizza, Briefcase, Beaker, Flask } from 'lucide-react';

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
        return (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-2/3 h-2/3 rounded-full bg-green-600 shadow-[0_0_8px_rgba(22,163,74,0.6)] flex items-center justify-center">
              <Leaf className="w-2/3 h-2/3 text-green-300" />
            </div>
            <div className="w-1/4 h-1/4 bg-amber-800 rounded-sm mt-1"></div>
          </div>
        );
      case 'coffee':
        return (
          <div className="w-full h-full flex items-center justify-center bg-amber-800/30 backdrop-blur-sm rounded-sm border border-amber-500/30 shadow-[0_0_5px_rgba(245,158,11,0.4)]">
            <Coffee className="w-3/4 h-3/4 text-amber-400" />
          </div>
        );
      case 'coffeebar':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-amber-900/40 backdrop-blur-sm rounded p-1 border border-amber-500/40 shadow-[0_0_5px_rgba(245,158,11,0.5)]">
            <div className="flex justify-around items-center w-full">
              <Coffee className="w-1/3 h-1/3 text-amber-400" />
              <ChefHat className="w-1/3 h-1/3 text-amber-200" />
            </div>
            <div className="w-full h-1/3 bg-amber-800/60 rounded-sm mt-1 border-t border-amber-400/30"></div>
          </div>
        );
      case 'relaxarea':
        return (
          <div className="w-full h-full flex items-center justify-center bg-amber-700/30 backdrop-blur-sm rounded border border-amber-400/30 shadow-[0_0_5px_rgba(245,158,11,0.4)]">
            <Sofa className="w-3/4 h-3/4 text-amber-300" />
          </div>
        );
      case 'monitor':
        return (
          <div className="w-full h-full bg-gray-900/80 backdrop-blur-sm rounded border border-cyan-500/40 shadow-[0_0_5px_rgba(8,145,178,0.5)] flex items-center justify-center p-1">
            <div className="w-full h-full bg-cyan-500/20 rounded-sm flex items-center justify-center">
              <Activity className="w-2/3 h-2/3 text-cyan-400" />
            </div>
          </div>
        );
      case 'server':
        return (
          <div className="w-full h-full bg-gray-900/80 backdrop-blur-sm rounded-sm border border-purple-500/50 shadow-[0_0_5px_rgba(168,85,247,0.6)] flex flex-col gap-1 p-1">
            <Server className="w-full h-2/3 text-purple-400" />
            <div className="h-1/4 w-full bg-purple-500/40 opacity-70 rounded-sm flex items-center justify-center">
              <div className="w-2/3 h-1/2 bg-purple-300/30 rounded-sm animate-pulse"></div>
            </div>
          </div>
        );
      case 'dashboard':
        return (
          <div className="w-full h-full bg-gray-900/70 backdrop-blur-sm rounded border border-yellow-500/40 shadow-[0_0_5px_rgba(234,179,8,0.5)] flex items-center justify-center p-1">
            <Tv className="w-3/4 h-3/4 text-yellow-400" />
          </div>
        );
      case 'datawall':
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-900/70 backdrop-blur-sm rounded border border-yellow-400/40 shadow-[0_0_5px_rgba(234,179,8,0.3)] p-1">
            <div className="grid grid-cols-2 gap-1 w-full h-full">
              <div className="bg-yellow-500/20 rounded-sm"></div>
              <div className="bg-yellow-500/30 rounded-sm"></div>
              <div className="bg-yellow-500/10 rounded-sm"></div>
              <div className="bg-yellow-500/40 rounded-sm"></div>
            </div>
          </div>
        );
      case 'terminal':
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-900/70 backdrop-blur-sm rounded border border-indigo-500/40 shadow-[0_0_5px_rgba(99,102,241,0.4)] p-1">
            <div className="w-full h-full bg-indigo-500/20 rounded-sm flex items-center justify-center">
              <Cpu className="w-3/4 h-3/4 text-indigo-400" />
            </div>
          </div>
        );
      case 'bookshelf':
        return (
          <div className="w-full h-full flex flex-col bg-indigo-900/30 backdrop-blur-sm rounded border border-indigo-500/30 shadow-[0_0_5px_rgba(99,102,241,0.4)] p-0.5">
            <div className="flex-1 flex items-center justify-center">
              <BookOpen className="w-2/3 h-2/3 text-indigo-300" />
            </div>
            <div className="w-full h-1/3 bg-indigo-800/40 rounded-sm flex items-center justify-around px-0.5">
              <div className="h-3/4 w-1/5 bg-indigo-500/40 rounded-sm"></div>
              <div className="h-3/4 w-1/5 bg-indigo-400/40 rounded-sm"></div>
              <div className="h-3/4 w-1/5 bg-indigo-600/40 rounded-sm"></div>
            </div>
          </div>
        );
      case 'library':
        return (
          <div className="w-full h-full flex items-center justify-center bg-green-900/30 backdrop-blur-sm rounded border border-green-500/30 shadow-[0_0_5px_rgba(34,197,94,0.4)] p-0.5">
            <div className="grid grid-cols-3 gap-0.5 w-full h-4/5">
              <div className="bg-green-500/30 rounded-sm"></div>
              <div className="bg-green-600/30 rounded-sm"></div>
              <div className="bg-green-700/30 rounded-sm"></div>
              <div className="bg-green-800/30 rounded-sm"></div>
              <div className="bg-green-400/30 rounded-sm"></div>
              <div className="bg-green-500/30 rounded-sm"></div>
            </div>
          </div>
        );
      case 'laboratory':
        return (
          <div className="w-full h-full flex items-center justify-center bg-green-900/30 backdrop-blur-sm rounded border border-green-500/30 shadow-[0_0_5px_rgba(34,197,94,0.4)]">
            <Beaker className="w-1/2 h-1/2 text-green-400" />
            <Flask className="w-1/3 h-1/3 text-green-300 ml-1" />
          </div>
        );
      case 'hardware':
        return (
          <div className="w-full h-full flex items-center justify-center bg-purple-900/30 backdrop-blur-sm rounded border border-purple-500/30 shadow-[0_0_5px_rgba(168,85,247,0.4)] p-0.5">
            <Box className="w-3/4 h-3/4 text-purple-400" />
          </div>
        );
      case 'controlpanel':
        return (
          <div className="w-full h-full flex items-center justify-center bg-purple-900/30 backdrop-blur-sm rounded border border-purple-500/30 shadow-[0_0_5px_rgba(168,85,247,0.4)] p-0.5">
            <div className="w-full h-3/4 bg-purple-800/30 rounded-sm flex items-center justify-around">
              <ArrowUpDown className="w-1/3 h-1/2 text-purple-400" />
              <div className="h-2/3 w-1/3 grid grid-rows-3 gap-0.5">
                <div className="bg-purple-500/40 rounded-full"></div>
                <div className="bg-purple-300/40 rounded-full"></div>
                <div className="bg-purple-400/40 rounded-full"></div>
              </div>
            </div>
          </div>
        );
      case 'holotable':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-blue-900/30 backdrop-blur-sm rounded border border-blue-500/30 shadow-[0_0_5px_rgba(59,130,246,0.4)] p-0.5">
            <div className="w-full h-2/3 bg-blue-500/20 rounded-sm"></div>
            <div className="w-2/3 h-1/4 bg-blue-800/50 rounded-sm mt-0.5"></div>
          </div>
        );
      case 'projection':
        return (
          <div className="w-full h-full flex items-center justify-center bg-blue-900/30 backdrop-blur-sm rounded border border-blue-500/30 shadow-[0_0_5px_rgba(59,130,246,0.4)] p-0.5">
            <Zap className="w-3/4 h-3/4 text-blue-400" />
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-all duration-300"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}%`,
        height: `${size}%`,
        zIndex: 11
      }}
      title={type.charAt(0).toUpperCase() + type.slice(1)}
    >
      {getElement()}
    </div>
  );
};

export default DecorativeElement;
