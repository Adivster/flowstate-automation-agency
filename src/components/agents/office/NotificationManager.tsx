
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import NotificationPopup from './NotificationPopup';

export interface Notification {
  id: number;
  x: number;
  y: number;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface NotificationManagerProps {
  notifications: Notification[];
}

const NotificationManager: React.FC<NotificationManagerProps> = ({ notifications }) => {
  return (
    <AnimatePresence>
      {notifications.map(notification => (
        <NotificationPopup
          key={notification.id}
          x={notification.x}
          y={notification.y}
          message={notification.message}
          type={notification.type}
          onComplete={() => {}}
        />
      ))}
    </AnimatePresence>
  );
};

export default NotificationManager;
