
import { useState, useEffect } from 'react';

// Define the data structure for KPI data
interface KpiData {
  totalRevenue: string;
  conversionRate: number;
  customerSatisfaction: number;
  websiteTraffic: { name: string; value: number }[];
  adCampaignPerformance: { name: string; value: number }[];
  userEngagement: { name: string; value: number }[];
  customerSatisfactionData: { name: string; value: number }[];
  efficiency: { name: string; value: number }[];
  taskCompletion: { name: string; value: number }[];
  responseTime: { name: string; value: number }[];
}

/**
 * Hook to fetch and manage KPI data based on selected time period
 */
export const useKpiData = (timePeriod: string = '7d'): KpiData => {
  const [kpiData, setKpiData] = useState<KpiData>({
    totalRevenue: '$0',
    conversionRate: 0,
    customerSatisfaction: 0,
    websiteTraffic: [],
    adCampaignPerformance: [],
    userEngagement: [],
    customerSatisfactionData: [],
    efficiency: [],
    taskCompletion: [],
    responseTime: [],
  });

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we're simulating data fetching with mock data
    const fetchKpiData = () => {
      // Simulate API loading
      setTimeout(() => {
        // Generate different data based on the selected time period
        const data = generateMockData(timePeriod);
        setKpiData(data);
      }, 300);
    };

    fetchKpiData();
  }, [timePeriod]);

  return kpiData;
};

// Helper function to generate mock data based on time period
const generateMockData = (timePeriod: string): KpiData => {
  // Number of data points based on time period
  const dataPoints = timePeriod === '24h' ? 24 : 
                   timePeriod === '7d' ? 7 : 
                   timePeriod === '30d' ? 30 : 12; // For quarter, use 12 points
  
  // Revenue based on time period
  const revenue = timePeriod === '24h' ? '$4,280' : 
                timePeriod === '7d' ? '$24,890' : 
                timePeriod === '30d' ? '$98,750' : '$342,500';
  
  // Generate data arrays
  const generateDataArray = (min: number, max: number) => {
    return Array.from({ length: dataPoints }, (_, i) => ({
      name: `Point ${i + 1}`,
      value: Math.floor(Math.random() * (max - min)) + min
    }));
  };

  return {
    totalRevenue: revenue,
    conversionRate: Math.floor(Math.random() * 10) + 5,  // 5-15%
    customerSatisfaction: Math.floor(Math.random() * 20) + 75,  // 75-95%
    websiteTraffic: generateDataArray(500, 2000),
    adCampaignPerformance: generateDataArray(100, 500),
    userEngagement: generateDataArray(2, 8),  // minutes
    customerSatisfactionData: generateDataArray(70, 100),  // percentage
    efficiency: generateDataArray(50, 95),  // percentage
    taskCompletion: generateDataArray(10, 50),  // tasks
    responseTime: generateDataArray(100, 500)  // milliseconds
  };
};
