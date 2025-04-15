
import React from 'react';
import { Activity, AlertTriangle, Check, Clock, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export type StatusMarkerType = 'success' | 'warning' | 'error' | 'info' | 'pending';

export type StatusMarker = {
  id: string;
  type: StatusMarkerType;
  x: number;
  y: number;
  message?: string;
  value?: string | number;
  entityId?: string;
  entityType?: 'agent' | 'division' | 'system';
};

interface StatusMarkersOverlayProps {
  markers: StatusMarker[];
  onClick?: (marker: StatusMarker) => void;
}

const StatusMarkersOverlay: React.FC<StatusMarkersOverlayProps> = ({ markers, onClick }) => {
  const getIcon = (type: StatusMarkerType) => {
    switch (type) {
      case 'success':
        return <Check className="h-3 w-3" />;
      case 'warning':
        return <AlertTriangle className="h-3 w-3" />;
      case 'error':
        return <X className="h-3 w-3" />;
      case 'info':
        return <Activity className="h-3 w-3" />;
      case 'pending':
        return <Clock className="h-3 w-3" />;
    }
  };
  
  const getColor = (type: StatusMarkerType) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 border-green-600';
      case 'warning':
        return 'bg-amber-500 border-amber-600';
      case 'error':
        return 'bg-red-500 border-red-600';
      case 'info':
        return 'bg-blue-500 border-blue-600';
      case 'pending':
        return 'bg-purple-500 border-purple-600';
    }
  };
  
  const handleClick = (marker: StatusMarker) => {
    if (onClick) {
      onClick(marker);
    }
  };
  
  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      <TooltipProvider>
        {markers.map(marker => (
          <motion.div
            key={marker.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute pointer-events-auto"
            style={{
              left: `${marker.x}%`,
              top: `${marker.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div 
                  className={`h-5 w-5 rounded-full flex items-center justify-center border text-white cursor-pointer ${getColor(marker.type)}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleClick(marker)}
                >
                  {getIcon(marker.type)}
                </motion.div>
              </TooltipTrigger>
              <TooltipContent className="bg-black/80 border-white/10 text-white">
                <div>
                  {marker.message && <p className="text-xs">{marker.message}</p>}
                  {marker.value && (
                    <p className="text-xs">
                      <span className="opacity-70">Value: </span>
                      <span className="font-medium">{marker.value}</span>
                    </p>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </motion.div>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default StatusMarkersOverlay;
