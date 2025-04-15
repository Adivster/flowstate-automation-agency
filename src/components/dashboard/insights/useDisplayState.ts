
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useDisplayState = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [systemHealth, setSystemHealth] = useState(95);
  const [activeTab, setActiveTab] = useState("mission-control");
  const [dateRange, setDateRange] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [hasAnomalyAlert, setHasAnomalyAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [anomalyData, setAnomalyData] = useState<any>(null);
  const { toast } = useToast();

  // Simulate real-time system health monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth(prev => {
        const change = Math.random() * 2 - 1;
        return Math.min(Math.max(prev + change, 90), 99);
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Simulate anomaly detection
  useEffect(() => {
    const anomalyTimer = setTimeout(() => {
      // Random chance to trigger an anomaly alert
      if (Math.random() > 0.7 && !hasAnomalyAlert) {
        const anomalyTypes = [
          {
            title: "Task Completion Rate Drop",
            description: "Operations division showing 20% delay in task completion",
            severity: "high",
            division: "Operations"
          },
          {
            title: "Resource Usage Spike",
            description: "Unusual CPU utilization in Analytics division",
            severity: "medium",
            division: "Analytics"
          },
          {
            title: "Agent Performance Anomaly",
            description: "Agent ID#4872 showing irregular response patterns",
            severity: "low",
            division: "Support"
          }
        ];
        
        const selectedAnomaly = anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
        setAnomalyData(selectedAnomaly);
        setHasAnomalyAlert(true);
        
        toast({
          title: `Anomaly Detected: ${selectedAnomaly.title}`,
          description: selectedAnomaly.description,
          variant: selectedAnomaly.severity === "high" ? "destructive" : 
                   selectedAnomaly.severity === "medium" ? "default" : "outline",
          duration: 7000,
        });
      }
    }, 30000); // 30 seconds delay for the simulation
    
    return () => clearTimeout(anomalyTimer);
  }, [hasAnomalyAlert, toast]);

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
  
  const dismissAnomalyAlert = () => {
    setHasAnomalyAlert(false);
    setAnomalyData(null);
  };
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return {
    isFullscreen,
    sidebarCollapsed,
    systemHealth,
    activeTab,
    dateRange,
    hasAnomalyAlert,
    anomalyData,
    searchTerm,
    setDateRange,
    setActiveTab,
    toggleFullscreen,
    toggleSidebar,
    dismissAnomalyAlert,
    handleSearch
  };
};
