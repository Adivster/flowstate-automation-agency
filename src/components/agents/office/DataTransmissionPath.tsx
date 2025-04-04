
import React from 'react';

interface DataTransmissionPathProps {
  start: { x: number | string; y: number | string };
  end: { x: number | string; y: number | string };
  color: string;
  pulseSpeed?: number;
}

const DataTransmissionPath: React.FC<DataTransmissionPathProps> = ({ 
  start, 
  end, 
  color, 
  pulseSpeed = 3 
}) => {
  // Convert to string with % for SVG attributes
  const startX = typeof start.x === 'number' ? `${start.x}%` : start.x;
  const startY = typeof start.y === 'number' ? `${start.y}%` : start.y;
  const endX = typeof end.x === 'number' ? `${end.x}%` : end.x;
  const endY = typeof end.y === 'number' ? `${end.y}%` : end.y;
  
  // Convert to numbers for the animation path
  const startXNum = typeof start.x === 'number' ? start.x : parseFloat(start.x);
  const startYNum = typeof start.y === 'number' ? start.y : parseFloat(start.y);
  const endXNum = typeof end.x === 'number' ? end.x : parseFloat(end.x);
  const endYNum = typeof end.y === 'number' ? end.y : parseFloat(end.y);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 will-change-transform">
      <svg width="100%" height="100%" className="absolute top-0 left-0">
        {/* Base path */}
        <line 
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke={color} 
          strokeWidth="1" 
          strokeDasharray="3,3" 
          className="opacity-30" 
        />
        
        {/* Glow effect for the path */}
        <line 
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke={color} 
          strokeWidth="2" 
          strokeOpacity="0.2"
          filter="blur(3px)"
        />
        
        {/* Animated pulse along the path */}
        <circle r="2" fill={color} className="opacity-70">
          <animateMotion
            dur={`${pulseSpeed}s`}
            repeatCount="indefinite"
            path={`M${startXNum},${startYNum} L${endXNum},${endYNum}`}
          />
        </circle>
        
        {/* Smaller secondary pulse (data packet) */}
        <circle r="1.5" fill="white" className="opacity-60">
          <animateMotion
            dur={`${pulseSpeed * 0.7}s`}
            repeatCount="indefinite"
            path={`M${startXNum},${startYNum} L${endXNum},${endYNum}`}
            begin={`${pulseSpeed * 0.3}s`}
          />
        </circle>
      </svg>
    </div>
  );
};

export default DataTransmissionPath;
