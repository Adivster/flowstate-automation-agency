
import { Budget, BudgetCategory, BudgetTransaction, DivisionBudgetSummary } from '../types';

export const mockBudgets: Budget[] = [
  {
    id: 'b1',
    name: 'Q2 Marketing Campaign',
    totalAmount: 50000,
    allocatedAmount: 42000,
    remainingAmount: 8000,
    startDate: '2025-04-01T00:00:00Z',
    endDate: '2025-06-30T00:00:00Z',
    status: 'active',
    lastUpdated: '2025-04-14T16:30:00Z',
    ownerDivision: 'marketing',
    categories: [
      {
        id: 'b1c1',
        name: 'Digital Advertising',
        allocation: 25000,
        spent: 18000,
        remaining: 7000,
        description: 'SEM, social media ads, display advertising'
      },
      {
        id: 'b1c2',
        name: 'Content Production',
        allocation: 15000,
        spent: 12000,
        remaining: 3000,
        description: 'Blog posts, videos, infographics'
      },
      {
        id: 'b1c3',
        name: 'Events',
        allocation: 10000,
        spent: 10000,
        remaining: 0,
        description: 'Trade shows and webinars'
      }
    ]
  },
  {
    id: 'b2',
    name: 'Product Development',
    totalAmount: 75000,
    allocatedAmount: 50000,
    remainingAmount: 25000,
    startDate: '2025-03-15T00:00:00Z',
    endDate: '2025-07-15T00:00:00Z',
    status: 'active',
    lastUpdated: '2025-04-10T11:45:00Z',
    ownerDivision: 'development',
    categories: [
      {
        id: 'b2c1',
        name: 'Engineering',
        allocation: 40000,
        spent: 30000,
        remaining: 10000,
        description: 'Development resources and tools'
      },
      {
        id: 'b2c2',
        name: 'QA & Testing',
        allocation: 20000,
        spent: 12000,
        remaining: 8000,
        description: 'Quality assurance and user testing'
      },
      {
        id: 'b2c3',
        name: 'Design',
        allocation: 15000,
        spent: 8000,
        remaining: 7000,
        description: 'UI/UX design services'
      }
    ]
  },
  {
    id: 'b3',
    name: 'Operations Optimization',
    totalAmount: 30000,
    allocatedAmount: 18000,
    remainingAmount: 12000,
    startDate: '2025-04-01T00:00:00Z',
    endDate: '2025-05-31T00:00:00Z',
    status: 'active',
    lastUpdated: '2025-04-13T09:20:00Z',
    ownerDivision: 'operations',
    categories: [
      {
        id: 'b3c1',
        name: 'Training',
        allocation: 10000,
        spent: 8000,
        remaining: 2000,
        description: 'Staff training and workshops'
      },
      {
        id: 'b3c2',
        name: 'Software',
        allocation: 15000,
        spent: 10000,
        remaining: 5000,
        description: 'Productivity and automation tools'
      },
      {
        id: 'b3c3',
        name: 'Consulting',
        allocation: 5000,
        spent: 0,
        remaining: 5000,
        description: 'External consulting services'
      }
    ]
  }
];

export const mockTransactions: BudgetTransaction[] = [
  {
    id: 't1',
    budgetId: 'b1',
    categoryId: 'b1c1',
    amount: 5000,
    description: 'LinkedIn advertising campaign',
    date: '2025-04-05T10:30:00Z',
    type: 'expense',
    status: 'completed',
    createdBy: 'user123',
    createdAt: '2025-04-05T10:30:00Z'
  },
  {
    id: 't2',
    budgetId: 'b1',
    categoryId: 'b1c2',
    amount: 3000,
    description: 'Blog article series production',
    date: '2025-04-08T14:15:00Z',
    type: 'expense',
    status: 'completed',
    createdBy: 'user456',
    createdAt: '2025-04-08T14:15:00Z'
  },
  {
    id: 't3',
    budgetId: 'b2',
    categoryId: 'b2c1',
    amount: 8000,
    description: 'Developer tools licenses',
    date: '2025-04-10T09:45:00Z',
    type: 'expense',
    status: 'completed',
    createdBy: 'user789',
    createdAt: '2025-04-10T09:45:00Z'
  },
  {
    id: 't4',
    budgetId: 'b3',
    categoryId: 'b3c1',
    amount: 1500,
    description: 'Additional budget for training',
    date: '2025-04-12T11:20:00Z',
    type: 'income',
    status: 'completed',
    createdBy: 'user123',
    createdAt: '2025-04-12T11:20:00Z'
  },
  {
    id: 't5',
    budgetId: 'b1',
    categoryId: 'b1c3',
    amount: 2500,
    description: 'Upcoming trade show booking',
    date: '2025-04-15T13:10:00Z',
    type: 'expense',
    status: 'pending',
    createdBy: 'user456',
    createdAt: '2025-04-15T13:10:00Z'
  }
];

export const mockDivisionBudgets: DivisionBudgetSummary[] = [
  {
    divisionId: 'marketing',
    divisionName: 'Marketing Division',
    totalBudget: 50000,
    allocated: 42000,
    remaining: 8000,
    budgetCount: 1,
    transactions: 3,
    lastTransaction: '2025-04-15T13:10:00Z'
  },
  {
    divisionId: 'development',
    divisionName: 'Product Development',
    totalBudget: 75000,
    allocated: 50000,
    remaining: 25000,
    budgetCount: 1,
    transactions: 1,
    lastTransaction: '2025-04-10T09:45:00Z'
  },
  {
    divisionId: 'operations',
    divisionName: 'Operations',
    totalBudget: 30000,
    allocated: 18000,
    remaining: 12000,
    budgetCount: 1,
    transactions: 1,
    lastTransaction: '2025-04-12T11:20:00Z'
  }
];
