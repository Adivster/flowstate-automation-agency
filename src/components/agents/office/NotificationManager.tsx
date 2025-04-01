
import React, { useState, useEffect } from 'react';
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
  const [activeNotifications, setActiveNotifications] = useState<Notification[]>([]);
  
  useEffect(() => {
    setActiveNotifications(notifications);
  }, [notifications]);
  
  const handleComplete = (id: number) => {
    setActiveNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <AnimatePresence>
      {activeNotifications.map(notification => (
        <NotificationPopup
          key={notification.id}
          x={notification.x}
          y={notification.y}
          message={notification.message}
          type={notification.type}
          onComplete={() => handleComplete(notification.id)}
        />
      ))}
    </AnimatePresence>
  );
};

export default NotificationManager;
