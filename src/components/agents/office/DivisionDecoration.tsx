
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Server, LineChart, BookOpen, Coffee, Monitor } from 'lucide-react';

interface DivisionDecorationProps {
  type: string;
  x: number;
  y: number;
  divisionColor: string;
  isHovered?: boolean;
}

const DivisionDecoration: React.FC<DivisionDecorationProps> = ({
  type,
  x,
  y,
  divisionColor,
  isHovered = false
}) => {
  const getIcon = () => {
    switch (type) {
      case 'server':
        return <Server className="h-4 w-4" style={{ color: divisionColor }} />;
      case 'chart':
        return <LineChart className="h-4 w-4" style={{ color: divisionColor }} />;
      case 'boards':
        return <BookOpen className="h-4 w-4" style={{ color: divisionColor }} />;
      case 'desk':
        return <Monitor className="h-4 w-4" style={{ color: divisionColor }} />;
      case 'coffee':
        return <Coffee className="h-4 w-4" style={{ color: divisionColor }} />;
      case 'monitor':
        return <Cpu className="h-4 w-4" style={{ color: divisionColor }} />;
      case 'light':
        return (
          <motion.div 
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: divisionColor }}
            animate={{
              opacity: isHovered ? [0.4, 1, 0.4] : [0.2, 0.5, 0.2],
              scale: isHovered ? [0.9, 1.1, 0.9] : [1, 1, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: isHovered ? 1 : 2,
              ease: "easeInOut"
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {getIcon()}
    </div>
  );
};

export default DivisionDecoration;
