
import React from 'react';
import { motion } from 'framer-motion';

export type HeatMapData = {
  x: number;
  y: number;
  intensity: number; // 0-100
  radius: number;
}

interface HeatMapOverlayProps {
  data: HeatMapData[];
  colorStart?: string;
  colorEnd?: string;
  opacity?: number;
  visible?: boolean;
  maxRadius?: number;
}

const HeatMapOverlay: React.FC<HeatMapOverlayProps> = ({
  data,
  colorStart = 'rgba(0, 255, 0, 0.5)',
  colorEnd = 'rgba(255, 0, 0, 0.5)',
  opacity = 0.6,
  visible = true,
  maxRadius = 25
}) => {
  if (!visible || !data.length) return null;
  
  // Interpolate between two colors based on intensity
  const getColor = (intensity: number) => {
    // Parse the rgba values
    const startMatch = colorStart.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    const endMatch = colorEnd.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    
    if (!startMatch || !endMatch) return colorStart;
    
    const r1 = parseInt(startMatch[1]);
    const g1 = parseInt(startMatch[2]);
    const b1 = parseInt(startMatch[3]);
    const a1 = startMatch[4] ? parseFloat(startMatch[4]) : 1;
    
    const r2 = parseInt(endMatch[1]);
    const g2 = parseInt(endMatch[2]);
    const b2 = parseInt(endMatch[3]);
    const a2 = endMatch[4] ? parseFloat(endMatch[4]) : 1;
    
    // Interpolate based on intensity (0-100)
    const factor = intensity / 100;
    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);
    const a = a1 + (a2 - a1) * factor;
    
    return `rgba(${r}, ${g}, ${b}, ${a * opacity})`;
  };
  
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {data.map((point, index) => (
        <motion.div
          key={`heat-${index}`}
          className="absolute rounded-full"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            width: `${point.radius * 2}%`,
            height: `${point.radius * 2}%`,
            backgroundColor: getColor(point.intensity),
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${Math.min(point.radius * maxRadius, maxRadius)}px ${getColor(point.intensity)}`,
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </div>
  );
};

export default HeatMapOverlay;
