
import { useState, useEffect } from 'react';
import { 
  Budget, 
  BudgetTransaction, 
  DivisionBudgetSummary,
  BudgetCategory,
  BudgetAllocationRequest 
} from '../types';
import { mockBudgets, mockTransactions, mockDivisionBudgets } from '../api/mockBudgetData';
import { useToast } from '@/hooks/use-toast';

export const useBudgetManagement = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [transactions, setTransactions] = useState<BudgetTransaction[]>([]);
  const [divisionBudgets, setDivisionBudgets] = useState<DivisionBudgetSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const { toast } = useToast();

  // Load mock data initially
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        setBudgets(mockBudgets);
        setTransactions(mockTransactions);
        setDivisionBudgets(mockDivisionBudgets);
        
        // Set first budget as selected by default
        if (mockBudgets.length > 0) {
          setSelectedBudget(mockBudgets[0].id);
        }
      } catch (error) {
        console.error("Error loading budget data:", error);
        toast({
          title: "Error loading budget data",
          description: "Failed to load budget information. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [toast]);

  // Function to create a new budget
  const createBudget = async (newBudget: Omit<Budget, 'id' | 'lastUpdated'>) => {
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const budgetId = `b${budgets.length + 1}`;
      const now = new Date().toISOString();
      
      const budget: Budget = {
        ...newBudget,
        id: budgetId,
        lastUpdated: now,
      };
      
      setBudgets(prev => [...prev, budget]);
      
      // Also update division budget summary
      setDivisionBudgets(prev => 
        prev.map(div => 
          div.divisionId === budget.ownerDivision 
            ? { 
                ...div, 
                totalBudget: div.totalBudget + budget.totalAmount,
                allocated: div.allocated + budget.allocatedAmount,
                remaining: div.remaining + budget.remainingAmount,
                budgetCount: div.budgetCount + 1
              } 
            : div
        )
      );
      
      toast({
        title: "Budget Created",
        description: `Successfully created budget "${budget.name}"`,
      });
      
      return budgetId;
    } catch (error) {
      console.error("Error creating budget:", error);
      toast({
        title: "Creation Failed",
        description: "Failed to create budget. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to add a transaction
  const addTransaction = async (newTransaction: Omit<BudgetTransaction, 'id' | 'createdAt'>) => {
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const transactionId = `t${transactions.length + 1}`;
      const now = new Date().toISOString();
      
      const transaction: BudgetTransaction = {
        ...newTransaction,
        id: transactionId,
        createdAt: now
      };
      
      setTransactions(prev => [...prev, transaction]);
      
      // Update the budget amounts
      if (transaction.status === 'completed') {
        updateBudgetAmounts(transaction);
      }
      
      toast({
        title: "Transaction Added",
        description: `Successfully added ${transaction.type === 'expense' ? 'expense' : 'income'} transaction`,
      });
      
      return transactionId;
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast({
        title: "Transaction Failed",
        description: "Failed to add transaction. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to update budget amounts when a transaction is completed
  const updateBudgetAmounts = (transaction: BudgetTransaction) => {
    setBudgets(prev => 
      prev.map(budget => {
        if (budget.id === transaction.budgetId) {
          // Find the category
          const updatedCategories = budget.categories.map(category => {
            if (category.id === transaction.categoryId) {
              if (transaction.type === 'expense') {
                return {
                  ...category,
                  spent: category.spent + transaction.amount,
                  remaining: category.remaining - transaction.amount
                };
              } else { // income
                return {
                  ...category,
                  allocation: category.allocation + transaction.amount,
                  remaining: category.remaining + transaction.amount
                };
              }
            }
            return category;
          });
          
          // Calculate new budget totals
          const newAllocated = updatedCategories.reduce((sum, cat) => sum + cat.allocation, 0);
          const newSpent = updatedCategories.reduce((sum, cat) => sum + cat.spent, 0);
          const newRemaining = newAllocated - newSpent;
          
          return {
            ...budget,
            allocatedAmount: newAllocated,
            remainingAmount: newRemaining,
            categories: updatedCategories,
            lastUpdated: new Date().toISOString()
          };
        }
        return budget;
      })
    );
    
    // Also update division budgets
    const affectedBudget = budgets.find(b => b.id === transaction.budgetId);
    if (affectedBudget) {
      setDivisionBudgets(prev => 
        prev.map(div => {
          if (div.divisionId === affectedBudget.ownerDivision) {
            return {
              ...div,
              transactions: div.transactions + 1,
              lastTransaction: new Date().toISOString(),
              allocated: transaction.type === 'income' 
                ? div.allocated + transaction.amount 
                : div.allocated,
              remaining: transaction.type === 'income' 
                ? div.remaining + transaction.amount 
                : div.remaining - transaction.amount
            };
          }
          return div;
        })
      );
    }
  };

  return {
    budgets,
    transactions,
    divisionBudgets,
    isLoading,
    selectedBudget,
    setSelectedBudget,
    createBudget,
    addTransaction
  };
};
