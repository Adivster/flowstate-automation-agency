
import { useState, useEffect } from 'react';

export const useDisplayState = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [systemHealth, setSystemHealth] = useState(95);
  const [activeTab, setActiveTab] = useState("mission-control");
  const [dateRange, setDateRange] = useState<'day' | 'week' | 'month' | 'year'>('week');

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth(prev => {
        const change = Math.random() * 2 - 1;
        const newValue = prev + change;
        return Math.min(Math.max(newValue, 90), 99);
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return {
    isFullscreen,
    sidebarCollapsed,
    systemHealth,
    activeTab,
    dateRange,
    setDateRange,
    setActiveTab,
    toggleFullscreen,
    toggleSidebar
  };
};
