
export interface CRMProvider {
  id: string;
  name: string;
  logo: string;
  description: string;
  isConnected: boolean;
  lastSync?: string;
}

export interface CRMContact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  lastInteraction?: string;
  status: 'lead' | 'prospect' | 'customer' | 'churned';
  value?: number;
  tags: string[];
  assignedTo?: string;
  source: string;
  createdAt: string;
}

export interface CRMDeal {
  id: string;
  name: string;
  value: number;
  stage: string;
  probability: number;
  contactId: string;
  assignedTo?: string;
  createdAt: string;
  expectedCloseDate?: string;
  lastUpdated: string;
}

export interface CRMSyncStats {
  contacts: number;
  deals: number;
  activities: number;
  lastSyncTime: string;
  nextScheduledSync: string;
  errors: number;
}

export interface CRMAPIConfig {
  baseUrl: string;
  apiKey: string;
  version: string;
  endpoints: {
    contacts: string;
    deals: string;
    activities: string;
  };
}
