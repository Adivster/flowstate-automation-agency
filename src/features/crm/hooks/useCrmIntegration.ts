
import { useState, useEffect } from 'react';
import { 
  CRMProvider, 
  CRMContact, 
  CRMDeal,
  CRMSyncStats
} from '../types';
import { mockCRMProviders, mockCRMContacts, mockCRMDeals, mockCRMSyncStats } from '../api/mockCRMData';
import { useToast } from '@/hooks/use-toast';

export const useCrmIntegration = () => {
  const [providers, setProviders] = useState<CRMProvider[]>([]);
  const [contacts, setContacts] = useState<CRMContact[]>([]);
  const [deals, setDeals] = useState<CRMDeal[]>([]);
  const [syncStats, setSyncStats] = useState<CRMSyncStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const { toast } = useToast();

  // Load mock data initially
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setProviders(mockCRMProviders);
        setContacts(mockCRMContacts);
        setDeals(mockCRMDeals);
        setSyncStats(mockCRMSyncStats);
        
        // Set the connected provider as selected
        const connectedProvider = mockCRMProviders.find(provider => provider.isConnected);
        if (connectedProvider) {
          setSelectedProvider(connectedProvider.id);
        }
      } catch (error) {
        console.error("Error loading CRM data:", error);
        toast({
          title: "Error loading CRM data",
          description: "Failed to load CRM integration data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [toast]);

  // Function to connect to a CRM provider
  const connectProvider = async (providerId: string) => {
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Update the providers list
      const updatedProviders = providers.map(provider => 
        provider.id === providerId 
          ? { ...provider, isConnected: true, lastSync: new Date().toISOString() } 
          : provider
      );
      
      setProviders(updatedProviders);
      setSelectedProvider(providerId);
      
      toast({
        title: "CRM Connected",
        description: `Successfully connected to ${providers.find(p => p.id === providerId)?.name}`,
      });
    } catch (error) {
      console.error("Error connecting to CRM:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to CRM provider. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to sync data from the CRM
  const syncCrmData = async () => {
    if (!selectedProvider) {
      toast({
        title: "Sync Failed",
        description: "No CRM provider selected. Please connect to a CRM first.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the sync stats
      const now = new Date();
      const nextSync = new Date(now);
      nextSync.setHours(nextSync.getHours() + 12);
      
      setSyncStats({
        contacts: contacts.length + 3,
        deals: deals.length + 1,
        activities: (syncStats?.activities || 0) + 15,
        lastSyncTime: now.toISOString(),
        nextScheduledSync: nextSync.toISOString(),
        errors: 0
      });
      
      toast({
        title: "CRM Sync Completed",
        description: `Successfully synchronized data with ${providers.find(p => p.id === selectedProvider)?.name}`,
      });
    } catch (error) {
      console.error("Error syncing CRM data:", error);
      toast({
        title: "Sync Failed",
        description: "Failed to synchronize CRM data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    providers,
    contacts,
    deals,
    syncStats,
    isLoading,
    selectedProvider,
    connectProvider,
    syncCrmData
  };
};
