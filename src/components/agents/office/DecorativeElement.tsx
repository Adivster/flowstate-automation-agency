import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Terminal, Server, BarChart3, Map, HelpingHand, Coffee, PieChart, Cpu, Radio, Box, Tablet, PanelTop, Globe, TestTube, Microscope, Rocket } from 'lucide-react';

interface DecorativeElementProps {
  type: string;
  x: number;
  y: number;
  size: number;
}

const DecorativeElement: React.FC<DecorativeElementProps> = ({ type, x, y, size }) => {
  const getDecoration = () => {
    const scale = size / 2;
    
    const decorations = {
      // Knowledge Base Division
      bookshelf: {
        icon: BookOpen,
        color: '#6366f1',
        bgColor: 'rgba(99, 102, 241, 0.2)',
        tooltip: 'Digital Library',
        animation: {
          y: [0, -3, 0],
          transition: { repeat: Infinity, duration: 3 }
        }
      },
      terminal: {
        icon: Terminal,
        color: '#6366f1',
        bgColor: 'rgba(99, 102, 241, 0.2)',
        tooltip: 'Knowledge Terminal',
        animation: {
          opacity: [0.7, 1, 0.7],
          transition: { repeat: Infinity, duration: 2 }
        }
      },
      server: {
        icon: Server,
        color: '#6366f1',
        bgColor: 'rgba(99, 102, 241, 0.2)',
        tooltip: 'Archive Server',
        animation: {
          scale: [1, 1.05, 1],
          transition: { repeat: Infinity, duration: 3 }
        }
      },
      
      // Analytics Division
      hologram: {
        icon: PieChart,
        color: '#eab308',
        bgColor: 'rgba(234, 179, 8, 0.2)',
        tooltip: 'Data Hologram',
        animation: {
          rotate: [0, 5, 0, -5, 0],
          transition: { repeat: Infinity, duration: 4 }
        }
      },
      chart: {
        icon: BarChart3,
        color: '#eab308',
        bgColor: 'rgba(234, 179, 8, 0.2)',
        tooltip: 'Live Charts',
        animation: {
          y: [0, -3, 0],
          transition: { repeat: Infinity, duration: 2.5 }
        }
      },
      dashboard: {
        icon: PanelTop,
        color: '#eab308',
        bgColor: 'rgba(234, 179, 8, 0.2)',
        tooltip: 'Analytics Dashboard',
        animation: {
          scale: [1, 1.05, 1],
          transition: { repeat: Infinity, duration: 2 }
        }
      },
      
      // Operations Division
      drone: {
        icon: Cpu,
        color: '#a855f7',
        bgColor: 'rgba(168, 85, 247, 0.2)',
        tooltip: 'Monitoring Drone',
        animation: {
          x: [0, 3, 0, -3, 0],
          y: [0, -3, 0],
          transition: { repeat: Infinity, duration: 4 }
        }
      },
      robot: {
        icon: Cpu,
        color: '#a855f7',
        bgColor: 'rgba(168, 85, 247, 0.2)',
        tooltip: 'Utility Robot',
        animation: {
          scale: [1, 1.05, 1],
          transition: { repeat: Infinity, duration: 2 }
        }
      },
      securityPanel: {
        icon: Radio,
        color: '#a855f7',
        bgColor: 'rgba(168, 85, 247, 0.2)',
        tooltip: 'Security Panel',
        animation: {
          opacity: [0.7, 1, 0.7],
          transition: { repeat: Infinity, duration: 3 }
        }
      },
      
      // Strategy Division
      map: {
        icon: Map,
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.2)',
        tooltip: 'Strategic Map',
        animation: {
          scale: [1, 1.05, 1],
          transition: { repeat: Infinity, duration: 3 }
        }
      },
      holomap: {
        icon: Globe,
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.2)',
        tooltip: '3D Projection',
        animation: {
          rotate: [0, 5, 0, -5, 0],
          transition: { repeat: Infinity, duration: 4 }
        }
      },
      board: {
        icon: Tablet,
        color: '#3b82f6',
        bgColor: 'rgba(59, 130, 246, 0.2)',
        tooltip: 'Planning Board',
        animation: {
          y: [0, -2, 0],
          transition: { repeat: Infinity, duration: 3 }
        }
      },
      
      // Research Division
      lab: {
        icon: TestTube,
        color: '#22c55e',
        bgColor: 'rgba(34, 197, 94, 0.2)',
        tooltip: 'Research Lab',
        animation: {
          y: [0, -3, 0],
          transition: { repeat: Infinity, duration: 3 }
        }
      },
      microscope: {
        icon: Microscope,
        color: '#22c55e',
        bgColor: 'rgba(34, 197, 94, 0.2)',
        tooltip: 'Advanced Microscope',
        animation: {
          opacity: [0.7, 1, 0.7],
          transition: { repeat: Infinity, duration: 2 }
        }
      },
      prototype: {
        icon: Rocket,
        color: '#22c55e',
        bgColor: 'rgba(34, 197, 94, 0.2)',
        tooltip: 'Prototype Device',
        animation: {
          scale: [1, 1.05, 1],
          transition: { repeat: Infinity, duration: 2.5 }
        }
      },
      
      // Lounge Division
      coffeeBar: {
        icon: Coffee,
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.2)',
        tooltip: 'Coffee Station',
        animation: {
          rotate: [0, 5, 0, -5, 0],
          transition: { repeat: Infinity, duration: 4 }
        }
      },
      lounge: {
        icon: Box,
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.2)',
        tooltip: 'Relaxation Pod',
        animation: {
          scale: [1, 1.05, 1],
          transition: { repeat: Infinity, duration: 3 }
        }
      },
      arcade: {
        icon: HelpingHand,
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.2)',
        tooltip: 'Recreation Zone',
        animation: {
          y: [0, -2, 0],
          transition: { repeat: Infinity, duration: 2.5 }
        }
      }
    };
    
    const decoration = decorations[type] || decorations.terminal;
    const Icon = decoration.icon;
    
    return (
      <motion.div 
        className="absolute flex items-center justify-center cursor-pointer group"
        style={{ 
          left: `${x}%`, 
          top: `${y}%`,
          width: `${scale * 15}px`,
          height: `${scale * 15}px`,
          backgroundColor: decoration.bgColor,
          borderRadius: '50%',
          zIndex: 10
        }}
        animate={decoration.animation}
        whileHover={{ scale: 1.2 }}
      >
        <Icon 
          style={{ 
            color: decoration.color,
            width: `${scale * 8}px`,
            height: `${scale * 8}px`
          }} 
        />
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900/90 text-white text-[8px] whitespace-nowrap rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
          {decoration.tooltip}
        </div>
        
        {/* Glowing effect */}
        <div 
          className="absolute inset-0 rounded-full opacity-20 group-hover:opacity-50 transition-opacity"
          style={{ 
            boxShadow: `0 0 15px ${decoration.color}`,
            backgroundColor: 'transparent'
          }}
        ></div>
      </motion.div>
    );
  };
  
  return getDecoration();
};

export default DecorativeElement;
