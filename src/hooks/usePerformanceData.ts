
import { useState, useEffect } from 'react';

interface PerformanceData {
  taskCompletion: number;
  tasksCompleted: number;
  totalTasks: number;
  agentEfficiency: number;
  responseTime: number;
  resourceUtilization: number;
  division: string;
}

export const usePerformanceData = (divisionId: string): PerformanceData => {
  const [data, setData] = useState<PerformanceData>({
    taskCompletion: 0,
    tasksCompleted: 0,
    totalTasks: 0,
    agentEfficiency: 0,
    responseTime: 0,
    resourceUtilization: 0,
    division: divisionId
  });
  
  useEffect(() => {
    // Generate pseudo-random but consistent data based on division ID
    // This ensures the same division always gets the same initial data
    const seed = divisionId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Generate random values based on the seed
    const generateValue = (min: number, max: number, seedOffset = 0) => {
      const localSeed = (seed + seedOffset) % 100;
      return min + (localSeed / 100) * (max - min);
    };
    
    const tasksCompleted = Math.floor(generateValue(5, 30, 1));
    const totalTasks = tasksCompleted + Math.floor(generateValue(2, 15, 2));
    const taskCompletion = (tasksCompleted / totalTasks) * 100;
    
    setData({
      taskCompletion: Math.round(taskCompletion),
      tasksCompleted,
      totalTasks,
      agentEfficiency: Math.round(generateValue(60, 98, 3)),
      responseTime: Math.round(generateValue(200, 800, 4)),
      resourceUtilization: Math.round(generateValue(20, 80, 5)),
      division: divisionId
    });
    
    // Add a small random fluctuation every 10 seconds
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        resourceUtilization: Math.min(Math.max(prev.resourceUtilization + (Math.random() * 6 - 3), 20), 80),
        agentEfficiency: Math.min(Math.max(prev.agentEfficiency + (Math.random() * 4 - 2), 60), 98),
      }));
    }, 10000);
    
    return () => clearInterval(interval);
  }, [divisionId]);
  
  return data;
};
