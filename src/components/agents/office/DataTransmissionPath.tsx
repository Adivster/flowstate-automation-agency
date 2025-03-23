
import React from 'react';

interface DataTransmissionPathProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
  color: string;
  pulseSpeed?: number;
}

const DataTransmissionPath: React.FC<DataTransmissionPathProps> = ({ 
  start, 
  end, 
  color, 
  pulseSpeed = 3 
}) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
      <svg width="100%" height="100%" className="absolute top-0 left-0">
        <line 
          x1={`${start.x}%`} 
          y1={`${start.y}%`} 
          x2={`${end.x}%`} 
          y2={`${end.y}%`} 
          stroke={color} 
          strokeWidth="1" 
          strokeDasharray="3,3" 
          className="opacity-30" 
        />
        
        {/* Animated pulse along the path */}
        <circle r="2" fill={color} className="opacity-70">
          <animateMotion
            dur={`${pulseSpeed}s`}
            repeatCount="indefinite"
            path={`M${start.x},${start.y} L${end.x},${end.y}`}
          />
        </circle>
      </svg>
    </div>
  );
};

export default DataTransmissionPath;
