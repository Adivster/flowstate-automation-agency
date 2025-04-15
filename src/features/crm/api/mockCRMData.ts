
import { CRMContact, CRMDeal, CRMProvider, CRMSyncStats } from '../types';

export const mockCRMProviders: CRMProvider[] = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    logo: '/crm-logos/salesforce.svg',
    description: 'Enterprise CRM solution with advanced reporting',
    isConnected: true,
    lastSync: '2025-04-15T10:30:00Z'
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    logo: '/crm-logos/hubspot.svg',
    description: 'All-in-one marketing, sales, and service platform',
    isConnected: false
  },
  {
    id: 'zoho',
    name: 'Zoho CRM',
    logo: '/crm-logos/zoho.svg',
    description: 'CRM solution for small and medium businesses',
    isConnected: false
  }
];

export const mockCRMContacts: CRMContact[] = [
  {
    id: 'c1',
    name: 'Jane Smith',
    email: 'jane@company.com',
    phone: '(555) 123-4567',
    company: 'Acme Corp',
    position: 'Marketing Director',
    lastInteraction: '2025-04-14T15:30:00Z',
    status: 'customer',
    value: 45000,
    tags: ['enterprise', 'marketing', 'priority'],
    assignedTo: 'agent3',
    source: 'referral',
    createdAt: '2024-12-10T09:15:00Z'
  },
  {
    id: 'c2',
    name: 'Michael Johnson',
    email: 'michael@techfirm.com',
    phone: '(555) 987-6543',
    company: 'Tech Innovations',
    position: 'CTO',
    lastInteraction: '2025-04-10T11:45:00Z',
    status: 'lead',
    tags: ['tech', 'decision-maker'],
    source: 'website',
    createdAt: '2025-03-22T14:30:00Z'
  },
  {
    id: 'c3',
    name: 'Sarah Williams',
    email: 'sarah@globalretail.com',
    phone: '(555) 456-7890',
    company: 'Global Retail Inc',
    position: 'Sales Manager',
    lastInteraction: '2025-04-12T09:20:00Z',
    status: 'prospect',
    value: 28000,
    tags: ['retail', 'sales'],
    assignedTo: 'agent5',
    source: 'trade show',
    createdAt: '2025-02-15T10:00:00Z'
  }
];

export const mockCRMDeals: CRMDeal[] = [
  {
    id: 'd1',
    name: 'Enterprise Solution Upgrade',
    value: 75000,
    stage: 'proposal',
    probability: 60,
    contactId: 'c1',
    assignedTo: 'agent3',
    createdAt: '2025-03-05T08:45:00Z',
    expectedCloseDate: '2025-05-20T00:00:00Z',
    lastUpdated: '2025-04-12T13:20:00Z'
  },
  {
    id: 'd2',
    name: 'Tech Innovations Annual Contract',
    value: 45000,
    stage: 'discovery',
    probability: 30,
    contactId: 'c2',
    createdAt: '2025-04-01T11:30:00Z',
    expectedCloseDate: '2025-06-15T00:00:00Z',
    lastUpdated: '2025-04-10T09:15:00Z'
  },
  {
    id: 'd3',
    name: 'Global Retail POS Integration',
    value: 28000,
    stage: 'negotiation',
    probability: 75,
    contactId: 'c3',
    assignedTo: 'agent5',
    createdAt: '2025-02-20T15:10:00Z',
    expectedCloseDate: '2025-04-30T00:00:00Z',
    lastUpdated: '2025-04-14T10:45:00Z'
  }
];

export const mockCRMSyncStats: CRMSyncStats = {
  contacts: 127,
  deals: 43,
  activities: 562,
  lastSyncTime: '2025-04-15T10:30:00Z',
  nextScheduledSync: '2025-04-15T22:30:00Z',
  errors: 2
};
