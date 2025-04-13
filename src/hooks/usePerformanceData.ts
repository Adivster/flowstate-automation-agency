
import { useState, useEffect } from 'react';

interface PerformanceData {
  // Original properties
  taskCompletion: number;
  tasksCompleted: number;
  totalTasks: number;
  agentEfficiency: number;
  responseTime: number;
  resourceUtilization: number;
  division: string;
  
  // Additional properties needed by components
  efficiency: number;
  averageResponseTime: string;
  uptime: number;
  historicalData?: {
    tasks: { name: string; value: number }[];
    response: { name: string; value: number }[];
    resource: { name: string; value: number }[];
  };
}

export const usePerformanceData = (divisionId?: string): PerformanceData => {
  const [data, setData] = useState<PerformanceData>({
    taskCompletion: 0,
    tasksCompleted: 0,
    totalTasks: 0,
    agentEfficiency: 0,
    responseTime: 0,
    resourceUtilization: 0,
    division: divisionId || 'main',
    efficiency: 0,
    averageResponseTime: '0ms',
    uptime: 0,
    historicalData: {
      tasks: [],
      response: [],
      resource: []
    }
  });
  
  useEffect(() => {
    // Generate pseudo-random but consistent data based on division ID
    // This ensures the same division always gets the same initial data
    const seed = (divisionId || 'main').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Generate random values based on the seed
    const generateValue = (min: number, max: number, seedOffset = 0) => {
      const localSeed = (seed + seedOffset) % 100;
      return min + (localSeed / 100) * (max - min);
    };
    
    const tasksCompleted = Math.floor(generateValue(5, 30, 1));
    const totalTasks = tasksCompleted + Math.floor(generateValue(2, 15, 2));
    const taskCompletion = (tasksCompleted / totalTasks) * 100;
    const efficiency = Math.round(generateValue(60, 98, 6));
    const uptime = Math.round(generateValue(90, 99.9, 7));
    
    // Generate historical data
    const generateHistoricalData = (min: number, max: number, count: number, seedOffset: number) => {
      return Array.from({ length: count }, (_, i) => {
        const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i % 7];
        const value = min + (((seed + i + seedOffset) % 100) / 100) * (max - min);
        return { name: day, value: Math.round(value * 10) / 10 };
      });
    };
    
    const responseTime = Math.round(generateValue(200, 800, 4));
    
    setData({
      taskCompletion: Math.round(taskCompletion),
      tasksCompleted,
      totalTasks,
      agentEfficiency: Math.round(generateValue(60, 98, 3)),
      responseTime,
      resourceUtilization: Math.round(generateValue(20, 80, 5)),
      division: divisionId || 'main',
      efficiency,
      averageResponseTime: `${(responseTime / 1000).toFixed(1)}s`,
      uptime,
      historicalData: {
        tasks: generateHistoricalData(5, 30, 7, 10),
        response: generateHistoricalData(0.8, 2.2, 7, 20),
        resource: generateHistoricalData(20, 60, 7, 30)
      }
    });
    
    // Add a small random fluctuation every 10 seconds
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        resourceUtilization: Math.min(Math.max(prev.resourceUtilization + (Math.random() * 6 - 3), 20), 80),
        agentEfficiency: Math.min(Math.max(prev.agentEfficiency + (Math.random() * 4 - 2), 60), 98),
        efficiency: Math.min(Math.max(prev.efficiency + (Math.random() * 4 - 2), 60), 98),
      }));
    }, 10000);
    
    return () => clearInterval(interval);
  }, [divisionId]);
  
  return data;
};
