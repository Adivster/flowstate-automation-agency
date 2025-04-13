
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ZoomableViewProps {
  children: React.ReactNode;
  zoomLevel: number;
  minZoom?: number;
  maxZoom?: number;
  panEnabled?: boolean;
  initialPanOffset?: { x: number, y: number };
}

/**
 * A component that allows zooming and panning functionality
 */
const ZoomableView: React.FC<ZoomableViewProps> = ({
  children,
  zoomLevel,
  minZoom = 0.5,
  maxZoom = 2,
  panEnabled = true,
  initialPanOffset = { x: 0, y: 0 }
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panOffset, setPanOffset] = useState(initialPanOffset);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  
  // Handle initial zoom scale
  useEffect(() => {
    // Constrain zoom level to min/max
    const constrainedZoom = Math.max(minZoom, Math.min(maxZoom, zoomLevel));
    
    // If there's a big zoom change, reset panning to prevent content from getting lost
    if (Math.abs(zoomLevel - 1) > 0.3) {
      setPanOffset(initialPanOffset);
    }
    
  }, [zoomLevel, minZoom, maxZoom, initialPanOffset]);
  
  // Handle mouse down for pan start
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panEnabled) return;
    
    // Only start panning on alt key or middle mouse button
    if (e.altKey || e.button === 1) {
      e.preventDefault();
      setIsPanning(true);
      setStartPoint({
        x: e.clientX - panOffset.x,
        y: e.clientY - panOffset.y
      });
    }
  };
  
  // Handle mouse move for panning
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanning || !panEnabled) return;
    
    setPanOffset({
      x: e.clientX - startPoint.x,
      y: e.clientY - startPoint.y
    });
  };
  
  // Handle mouse up to end panning
  const handleMouseUp = () => {
    setIsPanning(false);
  };
  
  // Handle mouse leave to end panning
  const handleMouseLeave = () => {
    setIsPanning(false);
  };
  
  // Handle double click to reset
  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    
    setPanOffset(initialPanOffset);
  };
  
  // Calculate constrained zoom level
  const constrainedZoom = Math.max(minZoom, Math.min(maxZoom, zoomLevel));
  
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={handleDoubleClick}
      style={{ cursor: isPanning ? 'grabbing' : 'default' }}
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          scale: constrainedZoom,
          x: panOffset.x,
          y: panOffset.y,
          transformOrigin: 'center',
        }}
        transition={{
          type: 'tween',
          duration: isPanning ? 0 : 0.3,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ZoomableView;
