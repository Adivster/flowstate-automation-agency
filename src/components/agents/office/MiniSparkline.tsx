
import React from 'react';
import { motion } from 'framer-motion';

export type SparklineData = number[];

interface MiniSparklineProps {
  data: SparklineData;
  width?: number;
  height?: number;
  color?: string;
  lineWidth?: number;
  fillOpacity?: number;
  animated?: boolean;
  showDots?: boolean;
  showGrid?: boolean;
}

const MiniSparkline: React.FC<MiniSparklineProps> = ({
  data,
  width = 60,
  height = 20,
  color = '#6366f1',
  lineWidth = 1.5,
  fillOpacity = 0.2,
  animated = true,
  showDots = false,
  showGrid = false
}) => {
  if (!data.length) return null;
  
  // Scale data to fit within the SVG
  const min = Math.min(...data);
  const max = Math.max(...data);
  
  // Create path data
  const points = data.map((value, index) => {
    const x = (width * index) / (data.length - 1);
    const y = height - (((value - min) / (max - min)) * height) || 0;
    return `${x},${y}`;
  }).join(' ');
  
  // Create area path
  const areaPath = `M0,${height} ${data.map((value, index) => {
    const x = (width * index) / (data.length - 1);
    const y = height - (((value - min) / (max - min)) * height) || 0;
    return `L${x},${y}`;
  }).join(' ')} L${width},${height} Z`;
  
  // Create grid lines if enabled
  const gridLines = showGrid ? (
    <>
      {/* Horizontal grid lines */}
      {[0.25, 0.5, 0.75].map((ratio, i) => (
        <line 
          key={`h-${i}`}
          x1="0" 
          y1={height * ratio} 
          x2={width} 
          y2={height * ratio}
          stroke={color}
          strokeWidth="0.5"
          strokeDasharray="2,2"
          opacity="0.2"
        />
      ))}
      {/* Vertical grid lines */}
      {data.map((_, index) => {
        if (index === 0 || index === data.length - 1) return null;
        const x = (width * index) / (data.length - 1);
        return (
          <line 
            key={`v-${index}`}
            x1={x} 
            y1="0" 
            x2={x} 
            y2={height}
            stroke={color}
            strokeWidth="0.5"
            strokeDasharray="2,2"
            opacity="0.2"
          />
        );
      })}
    </>
  ) : null;
  
  // Create data point dots if enabled
  const dataDots = showDots ? (
    <>
      {data.map((value, index) => {
        const x = (width * index) / (data.length - 1);
        const y = height - (((value - min) / (max - min)) * height) || 0;
        return (
          <motion.circle
            key={`dot-${index}`}
            cx={x}
            cy={y}
            r={1.5}
            fill={color}
            initial={animated ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 + (index * 0.05), duration: 0.3 }}
          />
        );
      })}
    </>
  ) : null;
  
  return (
    <svg width={width} height={height} className="overflow-visible">
      {/* Grid lines */}
      {gridLines}
      
      {/* Fill area */}
      <motion.path
        d={areaPath}
        fill={color}
        fillOpacity={fillOpacity}
        initial={animated ? { opacity: 0 } : { opacity: fillOpacity }}
        animate={{ opacity: fillOpacity }}
        transition={{ duration: 1 }}
      />
      
      {/* Line */}
      <motion.polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={lineWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      
      {/* Data point dots */}
      {dataDots}
      
      {/* End dot - always show the last point */}
      <motion.circle
        cx={width}
        cy={height - (((data[data.length - 1] - min) / (max - min)) * height) || 0}
        r={2}
        fill={color}
        initial={animated ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />
    </svg>
  );
};

export default MiniSparkline;
