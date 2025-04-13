
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ZoomableViewProps {
  children: React.ReactNode;
  zoomLevel: number;
  minZoom?: number;
  maxZoom?: number;
}

const ZoomableView: React.FC<ZoomableViewProps> = ({ 
  children, 
  zoomLevel, 
  minZoom = 0.5, 
  maxZoom = 3 
}) => {
  const [isPanning, setIsPanning] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset position when zoom level changes
  useEffect(() => {
    // Center the view when zooming
    setPosition({ x: 0, y: 0 });
  }, [zoomLevel]);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only pan with middle mouse button (button 1) or if alt/option key is pressed
    if (e.button === 1 || e.altKey) {
      setIsPanning(true);
      setStartPos({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
      e.preventDefault();
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      });
      e.preventDefault();
    }
  };
  
  const handleMouseUp = () => {
    setIsPanning(false);
  };
  
  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setIsPanning(true);
      setStartPos({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isPanning && e.touches.length === 2) {
      setPosition({
        x: e.touches[0].clientX - startPos.x,
        y: e.touches[0].clientY - startPos.y
      });
    }
  };
  
  const handleTouchEnd = () => {
    setIsPanning(false);
  };
  
  // Add a double click handler to reset the view
  const handleDoubleClick = () => {
    setPosition({ x: 0, y: 0 });
  };
  
  return (
    <div 
      ref={containerRef}
      className="w-full h-full overflow-hidden relative"
      style={{ cursor: isPanning ? 'grabbing' : 'default' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDoubleClick}
    >
      <motion.div
        className="w-full h-full"
        style={{
          transformOrigin: 'center',
          cursor: isPanning ? 'grabbing' : 'default',
        }}
        animate={{
          x: position.x,
          y: position.y,
          scale: zoomLevel
        }}
        transition={{
          x: { type: 'spring', stiffness: 300, damping: 30 },
          y: { type: 'spring', stiffness: 300, damping: 30 },
          scale: { type: 'spring', stiffness: 300, damping: 30 }
        }}
      >
        {children}
      </motion.div>
      
      {/* Info text for how to pan and zoom */}
      <div className="absolute bottom-2 left-2 right-2 text-xs text-center text-flow-foreground/50 bg-black/30 backdrop-blur-sm rounded-md py-1 px-2 pointer-events-none opacity-70">
        <span className="mr-2">Use Alt + Drag to pan</span>
        <span className="mr-2">•</span>
        <span className="mr-2">Double-click to reset view</span>
        <span className="mr-2">•</span>
        <span>Zoom: {Math.round(zoomLevel * 100)}%</span>
      </div>
    </div>
  );
};

export default ZoomableView;
