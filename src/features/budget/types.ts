
export interface Budget {
  id: string;
  name: string;
  totalAmount: number;
  allocatedAmount: number;
  remainingAmount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'planning' | 'completed' | 'archived';
  lastUpdated: string;
  ownerDivision: string;
  categories: BudgetCategory[];
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocation: number;
  spent: number;
  remaining: number;
  description?: string;
}

export interface BudgetTransaction {
  id: string;
  budgetId: string;
  categoryId: string;
  amount: number;
  description: string;
  date: string;
  type: 'income' | 'expense';
  status: 'pending' | 'completed' | 'rejected';
  createdBy: string;
  createdAt: string;
}

export interface DivisionBudgetSummary {
  divisionId: string;
  divisionName: string;
  totalBudget: number;
  allocated: number;
  remaining: number;
  budgetCount: number;
  transactions: number;
  lastTransaction?: string;
}

export interface BudgetAllocationRequest {
  id: string;
  divisionId: string;
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedBy: string;
  requestedAt: string;
  approvedBy?: string;
  approvedAt?: string;
}
