
import { useMemo } from 'react';

export interface PerformanceData {
  taskCompletion: number;
  resourceUtilization: number;
  efficiency: number;
  uptime: number;
  errorRate: number;
  tasksCompleted: number;
  averageResponseTime: string;
}

export const usePerformanceData = (seed?: number): PerformanceData => {
  // Using useMemo to ensure we don't regenerate on every render
  return useMemo(() => {
    // Optional seed value can be used to get consistent results for the same entity
    const randomSeed = seed || Math.random();
    const seedFactor = seed ? (seed % 100) / 100 : 1;
    
    return {
      taskCompletion: Math.floor((Math.random() * 30 * seedFactor) + 70), // 70-100%
      resourceUtilization: Math.floor((Math.random() * 30 * seedFactor) + 60), // 60-90%
      efficiency: Math.floor((Math.random() * 25 * seedFactor) + 75), // 75-100%
      uptime: Math.floor((Math.random() * 5 * seedFactor) + 95), // 95-100%
      errorRate: Math.floor(Math.random() * 5 * seedFactor), // 0-5%
      tasksCompleted: Math.floor((Math.random() * 100 * seedFactor) + 50), // 50-150
      averageResponseTime: ((Math.random() * 2 * seedFactor) + 0.5).toFixed(2), // 0.5-2.5s
    };
  }, [seed]);
};
