
import { APIEndpoint, SyncJob, SyncConfig, SyncStatus } from './types';

export const mockAPIEndpoints: APIEndpoint[] = [
  {
    id: 'api1',
    name: 'CRM Contacts Sync',
    url: 'https://api.example.com/crm/contacts',
    method: 'GET',
    description: 'Retrieves all contacts from the CRM system',
    category: 'crm',
    isActive: true,
    requiresAuth: true,
    lastUsed: '2025-04-15T08:30:00Z',
    responseTime: 320
  },
  {
    id: 'api2',
    name: 'CRM Deals Sync',
    url: 'https://api.example.com/crm/deals',
    method: 'GET',
    description: 'Retrieves all deals from the CRM system',
    category: 'crm',
    isActive: true,
    requiresAuth: true,
    lastUsed: '2025-04-15T08:35:00Z',
    responseTime: 450
  },
  {
    id: 'api3',
    name: 'Budget Update',
    url: 'https://api.example.com/finance/budget',
    method: 'POST',
    description: 'Updates budget allocations',
    category: 'budget',
    isActive: true,
    requiresAuth: true,
    lastUsed: '2025-04-14T16:20:00Z',
    responseTime: 280
  },
  {
    id: 'api4',
    name: 'Analytics Export',
    url: 'https://api.example.com/analytics/export',
    method: 'GET',
    description: 'Exports analytics data to business intelligence systems',
    category: 'analytics',
    isActive: true,
    requiresAuth: true,
    lastUsed: '2025-04-15T00:05:00Z',
    responseTime: 890
  }
];

export const mockSyncJobs: SyncJob[] = [
  {
    id: 'job1',
    name: 'Daily CRM Contacts Sync',
    status: 'completed',
    endpoint: 'api1',
    startTime: '2025-04-15T08:30:00Z',
    endTime: '2025-04-15T08:35:00Z',
    duration: 300000, // 5 minutes in ms
    dataProcessed: 256, // KB
    nextScheduled: '2025-04-16T08:30:00Z'
  },
  {
    id: 'job2',
    name: 'Daily CRM Deals Sync',
    status: 'completed',
    endpoint: 'api2',
    startTime: '2025-04-15T08:35:00Z',
    endTime: '2025-04-15T08:38:00Z',
    duration: 180000, // 3 minutes in ms
    dataProcessed: 128, // KB
    nextScheduled: '2025-04-16T08:35:00Z'
  },
  {
    id: 'job3',
    name: 'Weekly Budget Reconciliation',
    status: 'pending',
    endpoint: 'api3',
    nextScheduled: '2025-04-17T12:00:00Z'
  },
  {
    id: 'job4',
    name: 'Analytics Export',
    status: 'failed',
    endpoint: 'api4',
    startTime: '2025-04-15T00:05:00Z',
    endTime: '2025-04-15T00:06:30Z',
    duration: 90000, // 1.5 minutes in ms
    error: 'API rate limit exceeded',
    nextScheduled: '2025-04-16T00:05:00Z'
  }
];

export const mockSyncConfigs: SyncConfig[] = [
  {
    id: 'config1',
    name: 'CRM Daily Sync',
    description: 'Syncs all CRM data daily',
    schedule: 'daily',
    isActive: true,
    lastRun: '2025-04-15T08:30:00Z',
    nextRun: '2025-04-16T08:30:00Z',
    endpoints: ['api1', 'api2']
  },
  {
    id: 'config2',
    name: 'Weekly Budget Update',
    description: 'Updates budget data weekly',
    schedule: 'weekly',
    isActive: true,
    lastRun: '2025-04-10T12:00:00Z',
    nextRun: '2025-04-17T12:00:00Z',
    endpoints: ['api3']
  },
  {
    id: 'config3',
    name: 'Daily Analytics Export',
    description: 'Exports analytics data daily',
    schedule: 'daily',
    isActive: true,
    lastRun: '2025-04-15T00:05:00Z',
    nextRun: '2025-04-16T00:05:00Z',
    endpoints: ['api4']
  }
];

export const mockSyncStatus: SyncStatus = {
  activeJobs: 0,
  completedToday: 2,
  failedToday: 1,
  dataProcessedToday: 384, // KB
  averageResponseTime: 485 // ms
};
