
import React from 'react';
import { motion } from 'framer-motion';

interface NotificationPopupProps {
  x: number;
  y: number;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  onComplete: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ 
  x, 
  y, 
  message, 
  type = 'info', 
  onComplete 
}) => {
  return (
    <motion.div
      className={`absolute text-xs px-2 py-1 rounded-md z-50 whitespace-nowrap 
        ${type === 'success' ? 'bg-green-600/90 text-white' : 
         type === 'error' ? 'bg-red-600/90 text-white' : 
         type === 'warning' ? 'bg-amber-500/90 text-white' : 
         'bg-blue-600/90 text-white'}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: -20 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={onComplete}
    >
      {message}
    </motion.div>
  );
};

export default NotificationPopup;
