
import React, { useState } from 'react';
import { Info, ZoomIn, ZoomOut, Eye, EyeOff, Layers, Settings, Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface OfficeControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onToggleVisualizationControls?: () => void;
  visualizationActive?: boolean;
}

export const OfficeControls: React.FC<OfficeControlsProps> = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onToggleVisualizationControls,
  visualizationActive = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [expanded, setExpanded] = useState(false);
  
  return (
    <>
      <div className="absolute top-3 right-4 z-40">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              size="sm" 
              variant="outline" 
              className={cn(
                "h-8 w-8 p-0 backdrop-blur-md border transition-all duration-300", 
                isDark 
                  ? "bg-black/60 text-white border-white/10 hover:bg-black/80 hover:border-white/20" 
                  : "bg-white/60 text-emerald-800 border-emerald-200/50 hover:bg-white/80 hover:border-emerald-300"
              )}
            >
              <Info className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className={cn(
            "w-80 p-3 border backdrop-blur-lg", 
            isDark
              ? "bg-black/80 border-white/10 text-white" 
              : "bg-white/80 border-emerald-200 text-gray-800"
          )}>
            <h4 className="font-medium mb-2">Office View Controls</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Layers className={cn("h-4 w-4 mt-0.5", isDark ? "text-purple-400" : "text-emerald-600")} />
                <span>Use <strong>Visualization Layers</strong> to toggle different data overlays</span>
              </li>
              <li className="flex items-start gap-2">
                <Info className={cn("h-4 w-4 mt-0.5", isDark ? "text-blue-400" : "text-blue-600")} />
                <span>Click on divisions or agents to view detailed information</span>
              </li>
              <li className="flex items-start gap-2">
                <ZoomIn className={cn("h-4 w-4 mt-0.5", isDark ? "text-green-400" : "text-green-600")} />
                <span>Use zoom controls or hold Option/Alt + drag to pan around</span>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      <AnimatePresence>
        <motion.div 
          className="absolute top-3 left-3 z-40 flex gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            size="sm"
            variant="outline"
            className={cn(
              "h-8 p-0 backdrop-blur-md border transition-all duration-300", 
              visualizationActive 
                ? isDark ? "bg-purple-500/20 border-purple-500/50 text-white" : "bg-emerald-500/20 border-emerald-500/50 text-emerald-800"
                : isDark ? "bg-black/60 border-white/10 text-white" : "bg-white/60 border-emerald-200/50 text-emerald-800",
              "flex items-center gap-2"
            )}
            onClick={onToggleVisualizationControls}
          >
            <Layers className="h-4 w-4" />
            <span className="px-2">Visualization Controls</span>
          </Button>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-3 right-3 flex items-center gap-2 z-40">
        <Button
          size="sm"
          variant="outline"
          className={cn(
            "h-8 w-8 p-0 backdrop-blur-md border transition-all duration-300", 
            isDark 
              ? "bg-black/80 text-white border-gray-600/50 hover:bg-black/90 hover:border-gray-500/50" 
              : "bg-white/80 text-gray-700 border-gray-200/50 hover:bg-white/90 hover:border-gray-300"
          )}
          onClick={onZoomOut}
        >
          <ZoomOut className="h-3.5 w-3.5" />
        </Button>
        
        <Button 
          size="sm"
          variant="outline"
          className={cn(
            "h-8 backdrop-blur-md border transition-all duration-300 px-2 font-mono",
            isDark 
              ? "bg-black/80 text-white border-gray-600/50 hover:bg-black/90 hover:border-gray-500/50" 
              : "bg-white/80 text-gray-700 border-gray-200/50 hover:bg-white/90 hover:border-gray-300"
          )}
          onClick={onResetZoom}
        >
          {Math.round(zoomLevel * 100)}%
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          className={cn(
            "h-8 w-8 p-0 backdrop-blur-md border transition-all duration-300",
            isDark 
              ? "bg-black/80 text-white border-gray-600/50 hover:bg-black/90 hover:border-gray-500/50" 
              : "bg-white/80 text-gray-700 border-gray-200/50 hover:bg-white/90 hover:border-gray-300"
          )}
          onClick={onZoomIn}
        >
          <ZoomIn className="h-3.5 w-3.5" />
        </Button>
        
        <Button
          size="sm"
          variant="outline" 
          className={cn(
            "h-8 w-8 p-0 backdrop-blur-md border transition-all duration-300 ml-2",
            expanded 
              ? isDark ? "bg-blue-500/30 border-blue-500/50 text-white" : "bg-blue-500/30 border-blue-500/50 text-white"
              : isDark ? "bg-black/80 text-white border-gray-600/50" : "bg-white/80 text-gray-700 border-gray-200/50"
          )}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <Minimize className="h-3.5 w-3.5" /> : <Maximize className="h-3.5 w-3.5" />}
        </Button>
      </div>

      {/* Additional controls that appear when expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div 
            className="absolute bottom-14 right-3 z-40"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className={cn(
              "flex flex-col gap-2 p-2 rounded-lg backdrop-blur-md",
              isDark ? "bg-black/70 border border-gray-700/50" : "bg-white/70 border border-gray-200/50"
            )}>
              <Button
                size="sm"
                variant="outline"
                className={cn(
                  "h-8 w-8 p-0", 
                  isDark 
                    ? "bg-black/50 text-white border-gray-700/50" 
                    : "bg-white/50 text-gray-700 border-gray-200/50"
                )}
                onClick={() => {
                  // This could toggle a full-screen mode or other view options
                }}
              >
                <Eye className="h-3.5 w-3.5" />
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                className={cn(
                  "h-8 w-8 p-0", 
                  isDark 
                    ? "bg-black/50 text-white border-gray-700/50" 
                    : "bg-white/50 text-gray-700 border-gray-200/50"
                )}
                onClick={() => {
                  // This could toggle a settings panel or other options
                }}
              >
                <Settings className="h-3.5 w-3.5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
