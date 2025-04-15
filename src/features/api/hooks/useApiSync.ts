
import { useState, useEffect } from 'react';
import { 
  APIEndpoint, 
  SyncJob, 
  SyncConfig, 
  SyncStatus 
} from '../types';
import { 
  mockAPIEndpoints, 
  mockSyncJobs, 
  mockSyncConfigs, 
  mockSyncStatus 
} from '../mockApiData';
import { useToast } from '@/hooks/use-toast';

export const useApiSync = () => {
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>([]);
  const [syncJobs, setSyncJobs] = useState<SyncJob[]>([]);
  const [syncConfigs, setSyncConfigs] = useState<SyncConfig[]>([]);
  const [syncStatus, setSyncStatus] = useState<SyncStatus | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Load mock data initially
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 700));
        
        setEndpoints(mockAPIEndpoints);
        setSyncJobs(mockSyncJobs);
        setSyncConfigs(mockSyncConfigs);
        setSyncStatus(mockSyncStatus);
      } catch (error) {
        console.error("Error loading API sync data:", error);
        toast({
          title: "Error loading synchronization data",
          description: "Failed to load API synchronization information. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [toast]);

  // Function to sync a specific endpoint
  const syncEndpoint = async (endpointId: string) => {
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Find the endpoint
      const endpoint = endpoints.find(e => e.id === endpointId);
      if (!endpoint) {
        throw new Error("Endpoint not found");
      }
      
      // Create a new sync job
      const now = new Date();
      const jobId = `job${syncJobs.length + 1}`;
      
      const newJob: SyncJob = {
        id: jobId,
        name: `Manual ${endpoint.name}`,
        status: 'completed',
        endpoint: endpointId,
        startTime: new Date(now.getTime() - 5000).toISOString(), // 5 seconds ago
        endTime: now.toISOString(),
        duration: 5000, // 5 seconds in ms
        dataProcessed: Math.floor(Math.random() * 100) + 50, // Random data size
        nextScheduled: undefined
      };
      
      setSyncJobs(prev => [...prev, newJob]);
      
      // Update endpoint last used
      setEndpoints(prev => 
        prev.map(e => 
          e.id === endpointId 
            ? { ...e, lastUsed: now.toISOString(), responseTime: Math.floor(Math.random() * 500) + 200 } 
            : e
        )
      );
      
      // Update sync status
      setSyncStatus(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          completedToday: prev.completedToday + 1,
          dataProcessedToday: prev.dataProcessedToday + (newJob.dataProcessed || 0)
        };
      });
      
      toast({
        title: "Synchronization Complete",
        description: `Successfully synchronized ${endpoint.name}`,
      });
      
      return true;
    } catch (error) {
      console.error("Error syncing endpoint:", error);
      toast({
        title: "Sync Failed",
        description: "Failed to synchronize endpoint. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to create a new sync configuration
  const createSyncConfig = async (newConfig: Omit<SyncConfig, 'id' | 'lastRun' | 'nextRun'>) => {
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const configId = `config${syncConfigs.length + 1}`;
      
      // Calculate next run based on schedule
      const now = new Date();
      let nextRun = new Date(now);
      
      switch (newConfig.schedule) {
        case 'hourly':
          nextRun.setHours(nextRun.getHours() + 1);
          break;
        case 'daily':
          nextRun.setDate(nextRun.getDate() + 1);
          break;
        case 'weekly':
          nextRun.setDate(nextRun.getDate() + 7);
          break;
        case 'monthly':
          nextRun.setMonth(nextRun.getMonth() + 1);
          break;
      }
      
      const config: SyncConfig = {
        ...newConfig,
        id: configId,
        lastRun: undefined,
        nextRun: nextRun.toISOString()
      };
      
      setSyncConfigs(prev => [...prev, config]);
      
      toast({
        title: "Sync Configuration Created",
        description: `Successfully created "${config.name}" sync configuration`,
      });
      
      return configId;
    } catch (error) {
      console.error("Error creating sync config:", error);
      toast({
        title: "Creation Failed",
        description: "Failed to create sync configuration. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    endpoints,
    syncJobs,
    syncConfigs,
    syncStatus,
    isLoading,
    syncEndpoint,
    createSyncConfig
  };
};
