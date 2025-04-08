
import { useMemo } from 'react';

export interface PerformanceData {
  taskCompletion: number;
  resourceUtilization: number;
  efficiency: number;
  uptime: number;
  errorRate: number;
  tasksCompleted: number;
  averageResponseTime: string;
  // Additional fields for better visualizations
  historicalData: {
    taskCompletion: number[];
    efficiency: number[];
    errorRate: number[];
    responseTime: number[];
  };
  resourceAllocation: {
    cpu: number;
    memory: number;
    network: number;
    storage: number;
  };
  priorityDistribution: {
    high: number;
    medium: number;
    low: number;
  };
  systemStatus: 'optimal' | 'normal' | 'warning' | 'critical';
  agentPerformance: {
    topAgents: string[];
    needsAttention: string[];
  };
  workloadTrend: 'increasing' | 'steady' | 'decreasing';
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
    
    // Base performance metrics
    const taskCompletion = Math.floor(random() * 30 + 70); // 70-100%
    const efficiency = Math.floor(random() * 25 + 75); // 75-100%
    const errorRate = Math.floor(random() * 5); // 0-5%
    
    // Generate consistent historical data (for charts)
    const generateHistoricalPoints = (baseValue: number, variance: number, count: number) => {
      const result = [];
      let current = baseValue;
      
      for (let i = 0; i < count; i++) {
        // Randomize within a small range for realistic data fluctuation
        const change = (random() * variance * 2) - variance;
        current = Math.max(0, Math.min(100, current + change));
        result.push(Math.round(current));
      }
      
      return result;
    };

    // Generate response time data (in seconds)
    const generateResponseTimes = (baseValue: number, variance: number, count: number) => {
      const result = [];
      let current = baseValue;
      
      for (let i = 0; i < count; i++) {
        const change = (random() * variance * 2) - variance;
        current = Math.max(0.1, current + change);
        result.push(parseFloat(current.toFixed(2)));
      }
      
      return result;
    };

    // Determine workload trend
    const trendValue = random();
    let workloadTrend: 'increasing' | 'steady' | 'decreasing';
    if (trendValue > 0.66) {
      workloadTrend = 'increasing';
    } else if (trendValue > 0.33) {
      workloadTrend = 'steady';
    } else {
      workloadTrend = 'decreasing';
    }

    // Determine system status
    const statusValue = efficiency - errorRate * 5;
    let systemStatus: 'optimal' | 'normal' | 'warning' | 'critical';
    if (statusValue > 90) {
      systemStatus = 'optimal';
    } else if (statusValue > 80) {
      systemStatus = 'normal';
    } else if (statusValue > 70) {
      systemStatus = 'warning';
    } else {
      systemStatus = 'critical';
    }

    // Generate agent names for performance metrics
    const generateAgentName = (index: number) => {
      const prefixes = ['Agent', 'AI', 'Bot', 'Assistant', 'Helper'];
      const prefix = prefixes[Math.floor((random() + index/10) * 5) % prefixes.length];
      const number = Math.floor((random() + index/5) * 900) + 100;
      return `${prefix}-${number}`;
    };

    const topAgentsCount = Math.floor(random() * 3) + 3; // 3-5 agents
    const needsAttentionCount = Math.floor(random() * 2) + 1; // 1-2 agents
    
    const topAgents = Array.from({ length: topAgentsCount }, (_, i) => generateAgentName(i));
    const needsAttention = Array.from({ length: needsAttentionCount }, (_, i) => generateAgentName(i + 10));
    
    return {
      taskCompletion,
      resourceUtilization: Math.floor(random() * 30 + 60), // 60-90%
      efficiency,
      uptime: Math.floor(random() * 5 + 95), // 95-100%
      errorRate,
      tasksCompleted: Math.floor(random() * 100 + 50), // 50-150
      averageResponseTime: (random() * 2 + 0.5).toFixed(2), // 0.5-2.5s
      
      // Additional data for visualization
      historicalData: {
        taskCompletion: generateHistoricalPoints(taskCompletion, 5, 10),
        efficiency: generateHistoricalPoints(efficiency, 3, 10),
        errorRate: generateHistoricalPoints(errorRate, 1, 10),
        responseTime: generateResponseTimes(1.5, 0.3, 10),
      },
      resourceAllocation: {
        cpu: Math.floor(random() * 40 + 60), // 60-100%
        memory: Math.floor(random() * 50 + 50), // 50-100%
        network: Math.floor(random() * 60 + 40), // 40-100%
        storage: Math.floor(random() * 70 + 30), // 30-100%
      },
      priorityDistribution: {
        high: Math.floor(random() * 40), // 0-40%
        medium: Math.floor(random() * 40), // 0-40%
        low: 100 - Math.floor(random() * 40) - Math.floor(random() * 40), // Remaining %
      },
      systemStatus,
      agentPerformance: {
        topAgents,
        needsAttention,
      },
      workloadTrend,
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
