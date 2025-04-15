
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Settings, ZoomIn, ZoomOut, Maximize2, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ZoomableViewProps {
  children: React.ReactNode;
  zoomLevel: number;
  minZoom?: number;
  maxZoom?: number;
  panEnabled?: boolean;
  initialPanOffset?: { x: number, y: number };
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onReset?: () => void;
  showControls?: boolean;
}

const ZoomableView: React.FC<ZoomableViewProps> = ({
  children,
  zoomLevel,
  minZoom = 0.5,
  maxZoom = 2,
  panEnabled = true,
  initialPanOffset = { x: 0, y: 0 },
  onZoomIn,
  onZoomOut,
  onReset,
  showControls = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panOffset, setPanOffset] = useState(initialPanOffset);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [showPanIndicator, setShowPanIndicator] = useState(false);
  
  // Handle initial zoom scale
  useEffect(() => {
    const constrainedZoom = Math.max(minZoom, Math.min(maxZoom, zoomLevel));
    
    if (Math.abs(zoomLevel - 1) > 0.3) {
      setPanOffset(initialPanOffset);
    }
  }, [zoomLevel, minZoom, maxZoom, initialPanOffset]);
  
  // Handle mouse down for pan start
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panEnabled) return;
    
    if (e.altKey || e.button === 1) {
      e.preventDefault();
      setIsPanning(true);
      setStartPoint({
        x: e.clientX - panOffset.x,
        y: e.clientY - panOffset.y
      });
      setShowPanIndicator(true);
    }
  };
  
  // Handle mouse move for panning with smoother motion
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanning || !panEnabled) return;
    
    const newX = e.clientX - startPoint.x;
    const newY = e.clientY - startPoint.y;
    
    // Add bounds to prevent excessive panning
    const maxPan = 1000; // Adjust this value based on your needs
    const boundedX = Math.max(-maxPan, Math.min(maxPan, newX));
    const boundedY = Math.max(-maxPan, Math.min(maxPan, newY));
    
    setPanOffset({
      x: boundedX,
      y: boundedY
    });
  };
  
  // Handle mouse up to end panning
  const handleMouseUp = () => {
    setIsPanning(false);
    setShowPanIndicator(false);
  };
  
  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsPanning(false);
    setShowPanIndicator(false);
  };
  
  // Handle double click to reset
  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    
    setPanOffset(initialPanOffset);
    onReset?.();
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
      <AnimatePresence>
        {showPanIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <Badge 
              variant="secondary" 
              className="bg-black/60 backdrop-blur-md text-white border-white/10 flex items-center gap-2"
            >
              <Move className="h-3 w-3" />
              Panning Mode
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          scale: constrainedZoom,
          x: panOffset.x,
          y: panOffset.y,
          transformOrigin: 'center',
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 1,
        }}
      >
        {children}
      </motion.div>
      
      {showControls && (
        <div className="absolute bottom-4 right-4 z-[100] flex flex-col gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 bg-black/60 backdrop-blur-md hover:bg-white/20 text-white border border-white/10"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="left" className="w-64 bg-black/60 backdrop-blur-lg border-white/10 text-white p-3">
              <h4 className="font-medium mb-2">Display Settings</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Show Agent Status</span>
                  <div className="w-8 h-4 bg-purple-900/50 rounded-full relative">
                    <div className="absolute w-3 h-3 bg-purple-500 rounded-full top-0.5 right-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Show Division Names</span>
                  <div className="w-8 h-4 bg-purple-900/50 rounded-full relative">
                    <div className="absolute w-3 h-3 bg-purple-500 rounded-full top-0.5 right-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Paths</span>
                  <div className="w-8 h-4 bg-purple-900/50 rounded-full relative">
                    <div className="absolute w-3 h-3 bg-purple-500 rounded-full top-0.5 right-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Animations</span>
                  <div className="w-8 h-4 bg-purple-900/50 rounded-full relative">
                    <div className="absolute w-3 h-3 bg-purple-500 rounded-full top-0.5 right-0.5"></div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <div className="flex flex-col gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 bg-black/60 backdrop-blur-md hover:bg-white/20 text-white border border-white/10"
              onClick={onZoomIn}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 bg-black/60 backdrop-blur-md hover:bg-white/20 text-white border border-white/10"
              onClick={onZoomOut}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 bg-black/60 backdrop-blur-md hover:bg-white/20 text-white border border-white/10"
              onClick={onReset}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {isPanning && (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-[1px] pointer-events-none" />
      )}
    </div>
  );
};

export default ZoomableView;
