
import { useState, useEffect } from 'react';
import { WorkflowPerformanceData, WorkflowPerformancePoint } from '@/components/performance/WorkflowPerformanceChart';

// Helper function to generate a random number within a range
function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Helper function to calculate exponential moving average
function calculateEMA(data: number[], period: number = 5): number[] {
  const k = 2 / (period + 1);
  const emaData: number[] = [];
  
  // Initialize with simple moving average
  let sum = 0;
  for (let i = 0; i < period; i++) {
    sum += data[i] || 0;
  }
  emaData.push(sum / period);
  
  // Calculate EMA for the rest
  for (let i = period; i < data.length; i++) {
    emaData.push(data[i] * k + emaData[emaData.length - 1] * (1 - k));
  }
  
  return emaData;
}

export function useWorkflowPerformance(timeRange: '1h' | '24h' | '7d' | '30d' = '24h') {
  const [workflows, setWorkflows] = useState<WorkflowPerformanceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Generate initial workflow data
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    try {
      // Determine how many data points based on time range
      const dataPointCount = timeRange === '1h' ? 12 : 
                            timeRange === '24h' ? 24 : 
                            timeRange === '7d' ? 28 : 60;
      
      // Generate a deterministic seed based on timeRange to ensure consistent results
      const seed = timeRange === '1h' ? 1 : 
                 timeRange === '24h' ? 2 : 
                 timeRange === '7d' ? 3 : 4;
                 
      // Sample workflow names and IDs
      const workflowTemplates = [
        { id: 'wf-data-processing', name: 'Data Processing' },
        { id: 'wf-customer-onboarding', name: 'Customer Onboarding' },
        { id: 'wf-invoice-generation', name: 'Invoice Generation' },
        { id: 'wf-order-fulfillment', name: 'Order Fulfillment' },
        { id: 'wf-inventory-update', name: 'Inventory Update' },
        { id: 'wf-document-approval', name: 'Document Approval' },
        { id: 'wf-email-campaign', name: 'Email Campaign' },
        { id: 'wf-reports-generation', name: 'Reports Generation' },
        { id: 'wf-user-authentication', name: 'User Authentication' }
      ];
      
      // Generate sample data for each workflow
      const generatedWorkflows = workflowTemplates.map((template, workflowIndex) => {
        // Seed for this specific workflow
        const workflowSeed = ((seed * 10) + workflowIndex) / 100;
        
        // Determine if this workflow is improving, declining, or neutral
        // Using the seed and workflow index to get deterministic but varied results
        const trendType: number = (workflowSeed * 10) % 3;
        const trend: 'up' | 'down' | 'neutral' = 
          trendType < 1 ? 'up' : 
          trendType < 2 ? 'down' : 'neutral';
        
        // Base efficiency and change values
        const baseEfficiency = 60 + (workflowIndex * 5) % 30;
        let changePercentage = trend === 'up' ? 
                            randomInRange(5, 20) : 
                            trend === 'down' ? 
                            -randomInRange(5, 20) : 
                            randomInRange(-3, 3);
        
        // Round to 1 decimal place
        changePercentage = Math.round(changePercentage * 10) / 10;
        
        // Generate data points with a trend
        const rawData: number[] = [];
        let currentValue = baseEfficiency;
        
        for (let i = 0; i < dataPointCount; i++) {
          // Add some randomness but maintain the overall trend
          const trendFactor = trend === 'up' ? 0.2 : trend === 'down' ? -0.2 : 0;
          const noise = randomInRange(-3, 3);
          currentValue = Math.max(0, Math.min(100, currentValue + trendFactor + noise));
          rawData.push(currentValue);
        }
        
        // Apply EMA smoothing
        const smoothedData = calculateEMA(rawData, 5);
        
        // Convert to data points with proper formatting
        const data: WorkflowPerformancePoint[] = smoothedData.map((value, index) => {
          // Format timestamp and name based on time range
          let name, timestamp;
          
          if (timeRange === '1h') {
            const minute = index * 5;
            name = `${Math.floor(minute / 60)}:${(minute % 60).toString().padStart(2, '0')}`;
            timestamp = new Date(Date.now() - (dataPointCount - index) * 5 * 60000).toISOString();
          } else if (timeRange === '24h') {
            const hour = index;
            name = `${hour}:00`;
            timestamp = new Date(Date.now() - (dataPointCount - index) * 3600000).toISOString();
          } else {
            const dayOffset = timeRange === '7d' ? index : Math.floor(index / 2);
            const date = new Date();
            date.setDate(date.getDate() - (dataPointCount - dayOffset));
            name = `${date.getMonth() + 1}/${date.getDate()}`;
            timestamp = date.toISOString();
          }
          
          // Add annotations at key points
          let annotation, event;
          if (index === Math.floor(dataPointCount * 0.25)) {
            event = trend === 'up' ? 'Optimization Applied' : trend === 'down' ? 'Resource Contention Detected' : 'Configuration Change';
            annotation = `${event}: ${value.toFixed(1)}`;
          } else if (index === Math.floor(dataPointCount * 0.75)) {
            event = trend === 'up' ? 'Performance Tuning' : trend === 'down' ? 'Increased Workload' : 'Maintenance Window';
            annotation = `${event}: ${value.toFixed(1)}`;
          }
          
          return {
            name,
            value,
            timestamp,
            annotation,
            event
          };
        });
        
        return {
          id: template.id,
          name: template.name,
          data,
          currentEfficiency: data[data.length - 1].value,
          changePercentage,
          trend,
          averageCompletionTime: baseEfficiency / 10,
          successRate: Math.round(85 + (workflowIndex * 3) % 15)
        };
      });
      
      setWorkflows(generatedWorkflows);
    } catch (err) {
      setError('Failed to generate workflow performance data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [timeRange]);
  
  // Simulate real-time updates every 10 seconds
  useEffect(() => {
    if (workflows.length === 0) return;
    
    const interval = setInterval(() => {
      setWorkflows(prevWorkflows => {
        return prevWorkflows.map(workflow => {
          // Only update some workflows randomly
          if (Math.random() > 0.3) return workflow;
          
          const lastDataPoint = workflow.data[workflow.data.length - 1];
          const trend = workflow.trend;
          
          // Generate a new data point with a slight change in the trend direction
          const trendFactor = trend === 'up' ? 0.2 : trend === 'down' ? -0.2 : 0;
          const noise = randomInRange(-1, 1);
          const newValue = Math.max(0, Math.min(100, lastDataPoint.value + trendFactor + noise));
          
          // Create a new timestamp
          const now = new Date();
          let newName: string;
          
          if (timeRange === '1h') {
            newName = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
          } else if (timeRange === '24h') {
            newName = `${now.getHours()}:00`;
          } else {
            newName = `${now.getMonth() + 1}/${now.getDate()}`;
          }
          
          // Add the new data point and remove the oldest one
          const newData = [...workflow.data.slice(1), {
            name: newName,
            value: newValue,
            timestamp: now.toISOString()
          }];
          
          // Recalculate the change percentage
          const oldEfficiency = workflow.currentEfficiency;
          const newEfficiency = newValue;
          const changePercentage = Math.round(((newEfficiency - oldEfficiency) / oldEfficiency * 100) * 10) / 10;
          
          // Update the trend based on the latest change
          let newTrend: 'up' | 'down' | 'neutral' = workflow.trend;
          if (changePercentage > 3) newTrend = 'up';
          else if (changePercentage < -3) newTrend = 'down';
          else newTrend = 'neutral';
          
          return {
            ...workflow,
            data: newData,
            currentEfficiency: newEfficiency,
            changePercentage,
            trend: newTrend
          };
        });
      });
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(interval);
  }, [workflows, timeRange]);
  
  return { workflows, loading, error, timeRange };
}
