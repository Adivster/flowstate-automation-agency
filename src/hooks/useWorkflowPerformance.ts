
import { useState, useEffect } from 'react';

export interface WorkflowPerformanceData {
  id: string;
  name: string;
  description: string;
  currentEfficiency: number;
  previousEfficiency: number;
  changePercentage: number;
  trend: 'up' | 'down' | 'neutral';
  type: string;
  successRate: number;
  averageCompletionTime?: number;
  data: Array<{
    name: string;
    value: number;
    timestamp: string;
    annotation?: string;
    event?: string;
  }>;
}

export const useWorkflowPerformance = (timeRange: '1h' | '24h' | '7d' | '30d') => {
  const [workflows, setWorkflows] = useState<WorkflowPerformanceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // In a real app, this would be an API call with the timeRange parameter
      // For this demo, we'll use mock data with a simulated delay
      setTimeout(() => {
        const mockWorkflowsData: WorkflowPerformanceData[] = [
          {
            id: '1',
            name: 'Data Processing Pipeline',
            description: 'Automated data processing and analysis workflow',
            currentEfficiency: 85.3,
            previousEfficiency: 80.1,
            changePercentage: 6.5,
            trend: 'up',
            type: 'processing',
            successRate: 94,
            averageCompletionTime: 12.5,
            data: generateMockTimeSeriesData(timeRange, 85.3, 'up'),
          },
          {
            id: '2',
            name: 'Content Generation',
            description: 'AI-powered content creation and optimization',
            currentEfficiency: 78.4,
            previousEfficiency: 82.6,
            changePercentage: -5.1,
            trend: 'down',
            type: 'ai-generation',
            successRate: 87,
            averageCompletionTime: 45.2,
            data: generateMockTimeSeriesData(timeRange, 78.4, 'down'),
          },
          {
            id: '3',
            name: 'Market Analysis',
            description: 'Real-time market data analysis and reporting',
            currentEfficiency: 92.1,
            previousEfficiency: 91.9,
            changePercentage: 0.2,
            trend: 'neutral',
            type: 'analysis',
            successRate: 98,
            averageCompletionTime: 28.6,
            data: generateMockTimeSeriesData(timeRange, 92.1, 'neutral'),
          },
          {
            id: '4',
            name: 'Customer Onboarding',
            description: 'Streamlined customer onboarding process',
            currentEfficiency: 88.7,
            previousEfficiency: 79.3,
            changePercentage: 11.9,
            trend: 'up',
            type: 'customer',
            successRate: 93,
            averageCompletionTime: 15.3,
            data: generateMockTimeSeriesData(timeRange, 88.7, 'up'),
          },
          {
            id: '5',
            name: 'Email Campaign Manager',
            description: 'Automated email marketing campaign workflow',
            currentEfficiency: 76.2,
            previousEfficiency: 84.5,
            changePercentage: -9.8,
            trend: 'down',
            type: 'marketing',
            successRate: 81,
            averageCompletionTime: 32.1,
            data: generateMockTimeSeriesData(timeRange, 76.2, 'down'),
          },
          {
            id: '6',
            name: 'Document Processing',
            description: 'Automated document analysis and extraction',
            currentEfficiency: 90.5,
            previousEfficiency: 88.2,
            changePercentage: 2.6,
            trend: 'up',
            type: 'document',
            successRate: 95,
            averageCompletionTime: 8.4,
            data: generateMockTimeSeriesData(timeRange, 90.5, 'up'),
          },
        ];
        
        setWorkflows(mockWorkflowsData);
        setLoading(false);
      }, 800);
    };
    
    fetchData();
  }, [timeRange]);
  
  return { workflows, loading };
};

// Modified function to generate mock time series data that's compatible with WorkflowPerformanceChart
function generateMockTimeSeriesData(
  timeRange: '1h' | '24h' | '7d' | '30d',
  currentValue: number,
  trend: 'up' | 'down' | 'neutral'
): Array<{ name: string; value: number; timestamp: string; annotation?: string; event?: string }> {
  const dataPoints = timeRange === '1h' ? 60 : timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : 30;
  const result = [];
  
  let value = currentValue;
  const now = new Date();
  let trendFactor = trend === 'up' ? 0.8 : trend === 'down' ? -0.8 : 0;
  
  for (let i = dataPoints; i > 0; i--) {
    // Add some randomness to the data
    const randomVariation = (Math.random() - 0.5) * 2;
    value -= trendFactor + randomVariation;
    
    // Ensure value stays within reasonable range
    value = Math.min(Math.max(value, 50), 100);
    
    const date = new Date(now);
    let nameText: string;
    
    if (timeRange === '1h') {
      date.setMinutes(now.getMinutes() - i);
      nameText = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    } else if (timeRange === '24h') {
      date.setHours(now.getHours() - i);
      nameText = `${date.getHours()}:00`;
    } else if (timeRange === '7d') {
      date.setDate(now.getDate() - i);
      nameText = date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      date.setDate(now.getDate() - i);
      nameText = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    
    const dataPoint: {
      name: string;
      value: number;
      timestamp: string;
      annotation?: string;
      event?: string;
    } = {
      name: nameText,
      value: Number(value.toFixed(1)),
      timestamp: date.toISOString()
    };
    
    // Add annotations to some data points
    if (Math.random() > 0.9) {
      dataPoint.annotation = i % 2 === 0
        ? "Performance spike detected"
        : "Efficiency drop due to API latency";
    }
    
    // Add occasional events
    if (Math.random() > 0.95) {
      dataPoint.event = i % 2 === 0
        ? "System upgrade applied"
        : "Config changes deployed";
    }
    
    result.push(dataPoint);
  }
  
  // Add the current value as the last data point
  const lastPoint: {
    name: string;
    value: number;
    timestamp: string;
  } = {
    name: 'Now',
    value: currentValue,
    timestamp: now.toISOString()
  };
  
  result.push(lastPoint);
  
  return result;
}
