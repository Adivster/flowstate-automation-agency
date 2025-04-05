
import React from 'react';
import { motion } from 'framer-motion';

interface DivisionDecorationProps {
  type: string;
  x: number;
  y: number;
  divisionColor?: string;
  isHovered?: boolean;
}

const DivisionDecoration: React.FC<DivisionDecorationProps> = ({ 
  type, 
  x, 
  y, 
  divisionColor = '#ffffff', 
  isHovered = false 
}) => {
  // Convert color to rgba with opacity
  const getColorWithOpacity = (color: string, opacity: number) => {
    if (color.startsWith('#')) {
      // Convert hex to RGB
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
  };

  // Render decoration item with improved cyberpunk visual style
  const getIcon = () => {
    const baseColor = getColorWithOpacity(divisionColor, 0.6);
    const glowColor = getColorWithOpacity(divisionColor, 0.4);
    const shadowStyle = isHovered 
      ? { filter: `drop-shadow(0 0 5px ${glowColor})` } 
      : {};
    
    switch (type) {
      case 'light':
        return (
          <motion.div
            className="h-3 w-3 rounded-full"
            style={{ 
              backgroundColor: getColorWithOpacity(divisionColor, 0.1),
              boxShadow: `0 0 15px ${baseColor}`,
              ...shadowStyle
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        );
      case 'boards': 
        return (
          <div 
            className="h-5 w-7 bg-white/10 rounded-sm border border-white/20 flex flex-col justify-around items-center p-0.5"
            style={{
              boxShadow: isHovered ? `0 0 5px ${baseColor}` : 'none',
              ...shadowStyle
            }}
          >
            <div className="h-0.5 w-full bg-white/40"></div>
            <div className="h-0.5 w-full bg-white/40"></div>
            <div className="h-0.5 w-full bg-white/40"></div>
          </div>
        );
      case 'computer': 
        return (
          <div 
            className="h-5 w-6 bg-black/50 rounded flex flex-col items-center justify-between p-0.5 border" 
            style={{ 
              borderColor: baseColor, 
              boxShadow: isHovered ? `0 0 8px ${glowColor}` : `0 0 3px ${glowColor}`,
              ...shadowStyle
            }}
          >
            <div className="h-3 w-5" style={{ backgroundColor: getColorWithOpacity(divisionColor, 0.2) }}></div>
            <div className="h-0.5 w-4 mt-0.5" style={{ backgroundColor: baseColor }}></div>
          </div>
        );
      case 'chart': 
        return (
          <div 
            className="h-5 w-5 rounded flex items-end justify-center p-1 border" 
            style={{ 
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderColor: baseColor,
              boxShadow: isHovered ? `0 0 8px ${glowColor}` : `0 0 3px ${glowColor}`,
              ...shadowStyle
            }}
          >
            <div className="h-2 w-1 mr-0.5" style={{ backgroundColor: baseColor }}></div>
            <div className="h-3 w-1 mr-0.5" style={{ backgroundColor: baseColor }}></div>
            <div className="h-1 w-1" style={{ backgroundColor: baseColor }}></div>
          </div>
        );
      case 'desk': 
        return (
          <div className="flex flex-col items-center">
            <div 
              className="h-2 w-6 rounded-sm" 
              style={{ 
                backgroundColor: getColorWithOpacity(divisionColor, 0.3),
                boxShadow: isHovered ? `0 0 5px ${glowColor}` : 'none',
                ...shadowStyle
              }}
            ></div>
            <div 
              className="h-2 w-1 rounded-sm mt-0.5" 
              style={{ backgroundColor: getColorWithOpacity(divisionColor, 0.5) }}
            ></div>
          </div>
        );
      case 'server': 
        return (
          <div 
            className="h-6 w-4 bg-black/60 rounded-sm flex flex-col justify-around items-center p-0.5 border" 
            style={{ 
              borderColor: baseColor,
              boxShadow: isHovered ? `0 0 8px ${glowColor}` : `0 0 3px ${glowColor}`,
              ...shadowStyle
            }}
          >
            <div className="h-0.5 w-3" style={{ backgroundColor: baseColor }}></div>
            <div className="h-0.5 w-3" style={{ backgroundColor: baseColor }}></div>
            <motion.div 
              className="h-0.5 w-3" 
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{ backgroundColor: baseColor }}
            ></motion.div>
          </div>
        );
      case 'monitor': 
        return (
          <div className="flex flex-col items-center">
            <div 
              className="h-4 w-5 rounded-t-sm border" 
              style={{ 
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderColor: baseColor,
                boxShadow: isHovered ? `0 0 8px ${glowColor}` : `0 0 3px ${glowColor}`,
                ...shadowStyle
              }}
            >
              <div 
                className="h-3 w-4 mx-auto mt-0.5" 
                style={{ backgroundColor: getColorWithOpacity(divisionColor, 0.2) }}
              ></div>
            </div>
            <div 
              className="h-1 w-3 rounded-sm" 
              style={{ backgroundColor: getColorWithOpacity(divisionColor, 0.5) }}
            ></div>
          </div>
        );
      case 'coffee': 
        return (
          <div className="flex flex-col items-center">
            <motion.div 
              className="h-3 w-3 rounded-sm border" 
              animate={isHovered ? { y: [0, -1, 0] } : {}}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{ 
                backgroundColor: 'rgba(139, 69, 19, 0.7)',
                borderColor: baseColor,
                boxShadow: isHovered ? `0 0 5px ${glowColor}` : 'none',
                ...shadowStyle
              }}
            >
              <div className="h-0.5 w-2 mx-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}></div>
            </motion.div>
            <div 
              className="h-0.5 w-4 mt-0.5 rounded-sm" 
              style={{ backgroundColor: getColorWithOpacity(divisionColor, 0.5) }}
            ></div>
          </div>
        );
      case 'sofa': 
        return (
          <div 
            className="h-2.5 w-6 rounded-sm border" 
            style={{ 
              backgroundColor: getColorWithOpacity(divisionColor, 0.3),
              borderColor: baseColor,
              boxShadow: isHovered ? `0 0 5px ${glowColor}` : 'none',
              ...shadowStyle
            }}
          >
            <div className="h-0.5 w-5 mx-auto mt-1" style={{ backgroundColor: getColorWithOpacity(divisionColor, 0.6) }}></div>
          </div>
        );
      case 'plant': 
        return (
          <div className="flex flex-col items-center">
            <motion.div 
              className="h-3 w-3 rounded-full border" 
              animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{ 
                backgroundColor: 'rgba(34, 197, 94, 0.3)',
                borderColor: 'rgba(34, 197, 94, 0.6)',
                boxShadow: isHovered ? `0 0 8px rgba(34, 197, 94, 0.5)` : `0 0 3px rgba(34, 197, 94, 0.3)`,
                ...shadowStyle
              }}
            ></motion.div>
            <div className="h-1.5 w-0.5 bg-green-800/40"></div>
          </div>
        );
      case 'meeting': 
        return (
          <div 
            className="h-5 w-5 bg-black/40 rounded-full flex items-center justify-center border" 
            style={{ 
              borderColor: baseColor,
              boxShadow: isHovered ? `0 0 8px ${glowColor}` : 'none',
              ...shadowStyle
            }}
          >
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: getColorWithOpacity(divisionColor, 0.3) }}></div>
          </div>
        );
      default: 
        return null;
    }
  };
  
  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
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
