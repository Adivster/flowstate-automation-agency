
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

/**
 * Hook that provides consistent performance data based on the entity ID
 * @param entityId - A unique identifier for the division or agent
 * @returns Performance data object with consistent values
 */
export const usePerformanceData = (entityId?: string | number): PerformanceData => {
  // Using useMemo to ensure we don't regenerate on every render
  return useMemo(() => {
    // If no entityId is provided, use a default seed
    const seed = entityId 
      ? typeof entityId === 'string' 
        ? hashString(entityId) 
        : entityId
      : 1;
    
    // Generate deterministic random numbers based on the seed
    const random = createSeededRandom(seed);
    
    return {
      taskCompletion: Math.floor(random() * 30 + 70), // 70-100%
      resourceUtilization: Math.floor(random() * 30 + 60), // 60-90%
      efficiency: Math.floor(random() * 25 + 75), // 75-100%
      uptime: Math.floor(random() * 5 + 95), // 95-100%
      errorRate: Math.floor(random() * 5), // 0-5%
      tasksCompleted: Math.floor(random() * 100 + 50), // 50-150
      averageResponseTime: (random() * 2 + 0.5).toFixed(2), // 0.5-2.5s
    };
  }, [entityId]); // Only regenerate if entityId changes
};

/**
 * Creates a seeded random number generator
 * @param seed - Seed value for consistent random number generation
 * @returns Function that generates consistent random numbers between 0 and 1
 */
function createSeededRandom(seed: number): () => number {
  return function() {
    // Simple seeded random algorithm
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
}

/**
 * Convert a string to a numeric hash value
 * @param str - String to hash
 * @returns Numeric hash value
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Make sure we get a positive number
  return Math.abs(hash);
}
