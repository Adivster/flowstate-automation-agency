
export interface APIEndpoint {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  category: 'crm' | 'budget' | 'analytics' | 'system';
  isActive: boolean;
  requiresAuth: boolean;
  lastUsed?: string;
  responseTime?: number; // in ms
}

export interface SyncJob {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  endpoint: string;
  startTime?: string;
  endTime?: string;
  duration?: number; // in ms
  dataProcessed?: number;
  nextScheduled?: string;
  error?: string;
}

export interface SyncConfig {
  id: string;
  name: string;
  description: string;
  schedule: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'custom';
  customCron?: string;
  isActive: boolean;
  lastRun?: string;
  nextRun?: string;
  endpoints: string[]; // endpoint IDs
}

export interface SyncStatus {
  activeJobs: number;
  completedToday: number;
  failedToday: number;
  dataProcessedToday: number; // in KB
  averageResponseTime: number; // in ms
}
