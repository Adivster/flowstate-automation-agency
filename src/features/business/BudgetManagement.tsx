
import { useState } from 'react';
import { 
  BadgeDollarSign, 
  PieChart, 
  BarChart4, 
  ArrowUpRight, 
  Wallet, 
  Calendar, 
  Building, 
  Plus,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useBudgetManagement } from '@/features/budget/hooks/useBudgetManagement';
import { format, parseISO } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PieChart as RechartsDonut, Pie, Cell, ResponsiveContainer } from 'recharts';

const BudgetManagement = () => {
  const [subTab, setSubTab] = useState('overview');
  const { 
    budgets, 
    transactions, 
    divisionBudgets, 
    isLoading, 
    selectedBudget,
    setSelectedBudget
  } = useBudgetManagement();
  
  // Find the currently selected budget
  const currentBudget = budgets.find(b => b.id === selectedBudget);

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(parseISO(dateString), 'dd MMM yyyy');
    } catch (e) {
      return 'Invalid date';
    }
  };

  const getBudgetStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500 text-green-50';
      case 'planning': return 'bg-amber-500 text-amber-50';
      case 'completed': return 'bg-blue-500 text-blue-50';
      case 'archived': return 'bg-zinc-500 text-zinc-50';
      default: return 'bg-zinc-500 text-zinc-50';
    }
  };

  // Calculate remaining percentage
  const calculateRemainingPercentage = (remaining: number, total: number) => {
    return Math.max(0, Math.min(100, (remaining / total) * 100));
  };

  // Prepare data for donut chart
  const budgetAllocationData = currentBudget?.categories.map(category => ({
    name: category.name,
    value: category.allocation
  })) || [];
  
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-medium mb-1">Budget Management</h2>
          <p className="text-sm text-muted-foreground">Track and manage division budgets and transactions</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs h-8 bg-flow-accent/10 text-flow-accent border-flow-accent/50"
          >
            <Plus className="h-3 w-3 mr-2" />
            Create Budget
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassMorphism className="p-4 rounded-xl border-flow-border/30 flex items-center">
          <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
            <BadgeDollarSign className="h-6 w-6 text-indigo-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              ${divisionBudgets.reduce((sum, div) => sum + div.totalBudget, 0).toLocaleString()}
            </div>
            <div className="text-xs text-flow-foreground/70">Total Budget</div>
          </div>
        </GlassMorphism>
        
        <GlassMorphism className="p-4 rounded-xl border-flow-border/30 flex items-center">
          <div className="bg-emerald-500/20 p-3 rounded-lg mr-4">
            <BarChart4 className="h-6 w-6 text-emerald-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              ${divisionBudgets.reduce((sum, div) => sum + div.allocated, 0).toLocaleString()}
            </div>
            <div className="text-xs text-flow-foreground/70">Allocated</div>
          </div>
        </GlassMorphism>
        
        <GlassMorphism className="p-4 rounded-xl border-flow-border/30 flex items-center">
          <div className="bg-amber-500/20 p-3 rounded-lg mr-4">
            <Wallet className="h-6 w-6 text-amber-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              ${divisionBudgets.reduce((sum, div) => sum + div.remaining, 0).toLocaleString()}
            </div>
            <div className="text-xs text-flow-foreground/70">Remaining</div>
          </div>
        </GlassMorphism>
      </div>
      
      <Tabs value={subTab} onValueChange={setSubTab} className="space-y-4">
        <TabsList className="bg-flow-background/30 border border-flow-border/20 inline-flex h-9 items-center text-muted-foreground w-full sm:w-auto">
          <TabsTrigger 
            value="overview" 
            className="text-xs data-[state=active]:bg-flow-accent/20 data-[state=active]:text-flow-accent"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="budgets" 
            className="text-xs data-[state=active]:bg-flow-accent/20 data-[state=active]:text-flow-accent"
          >
            Budgets
          </TabsTrigger>
          <TabsTrigger 
            value="transactions" 
            className="text-xs data-[state=active]:bg-flow-accent/20 data-[state=active]:text-flow-accent"
          >
            Transactions
          </TabsTrigger>
          <TabsTrigger 
            value="allocations" 
            className="text-xs data-[state=active]:bg-flow-accent/20 data-[state=active]:text-flow-accent"
          >
            Allocations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {divisionBudgets.map((division) => (
              <Card 
                key={division.divisionId}
                className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4 hover:border-flow-accent/50 transition-colors cursor-pointer"
                onClick={() => {
                  // Find the budget for this division
                  const divBudget = budgets.find(b => b.ownerDivision === division.divisionId);
                  if (divBudget) {
                    setSelectedBudget(divBudget.id);
                    setSubTab('budgets');
                  }
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="bg-flow-background/30 p-2 rounded-lg mr-3">
                      <Building className="h-4 w-4 text-flow-accent" />
                    </div>
                    <h3 className="font-medium text-sm">{division.divisionName}</h3>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {division.budgetCount} {division.budgetCount === 1 ? 'Budget' : 'Budgets'}
                  </Badge>
                </div>
                
                <div className="mb-3">
                  <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                    <span>Budget Utilization</span>
                    <span>
                      ${(division.allocated - division.remaining).toLocaleString()} / ${division.allocated.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={((division.allocated - division.remaining) / division.allocated) * 100} 
                    className="h-1.5"
                  />
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span>${division.remaining.toLocaleString()} remaining</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
          
          <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4">
            <div className="mb-4 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium">Recent Transactions</h3>
                <p className="text-xs text-muted-foreground">Last 5 budget transactions</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs h-7"
                onClick={() => setSubTab('transactions')}
              >
                View All
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.slice(0, 5).map((transaction) => {
                    // Find the budget for this transaction
                    const budget = budgets.find(b => b.id === transaction.budgetId);
                    
                    return (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.description}</TableCell>
                        <TableCell>{formatDate(transaction.date)}</TableCell>
                        <TableCell>{budget?.name || 'Unknown'}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}
                          >
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}>
                            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`
                              ${transaction.status === 'completed' ? 'bg-green-500/20 text-green-500' : 
                                transaction.status === 'pending' ? 'bg-amber-500/20 text-amber-500' : 
                                'bg-red-500/20 text-red-500'}
                            `}
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="budgets" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {budgets.map((budget) => (
              <Card 
                key={budget.id} 
                className={`bg-flow-background/20 backdrop-blur-md p-4 cursor-pointer transition-all hover:border-flow-accent/50 ${
                  selectedBudget === budget.id ? 'border-flow-accent/80' : 'border-flow-border'
                }`}
                onClick={() => setSelectedBudget(budget.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-sm">{budget.name}</h3>
                  <Badge className={`text-xs ${getBudgetStatusColor(budget.status)}`}>
                    {budget.status.charAt(0).toUpperCase() + budget.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="mb-3">
                  <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                    <span>Utilized</span>
                    <span>
                      ${(budget.allocatedAmount - budget.remainingAmount).toLocaleString()} / ${budget.allocatedAmount.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={((budget.allocatedAmount - budget.remainingAmount) / budget.allocatedAmount) * 100} 
                    className="h-1.5"
                  />
                </div>
                
                <div className="flex items-center text-xs text-muted-foreground mt-3 space-x-3">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(budget.startDate)} - {formatDate(budget.endDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="h-3 w-3 mr-1" />
                    <span className="capitalize">{budget.ownerDivision}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {currentBudget && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4 h-full">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium">Budget Details: {currentBudget.name}</h3>
                    <p className="text-xs text-muted-foreground">Category breakdown</p>
                  </div>
                  
                  <div className="space-y-4">
                    {currentBudget.categories.map((category) => (
                      <div key={category.id} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <div>{category.name}</div>
                          <div className="text-right">${category.spent.toLocaleString()} of ${category.allocation.toLocaleString()}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={(category.spent / category.allocation) * 100} 
                            className="h-1.5 flex-1"
                          />
                          <div className="text-xs text-muted-foreground w-12 text-right">
                            {Math.round((category.spent / category.allocation) * 100)}%
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">{category.description}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
              
              <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4">
                <div className="mb-4">
                  <h3 className="text-sm font-medium">Allocation Summary</h3>
                  <p className="text-xs text-muted-foreground">Budget distribution by category</p>
                </div>
                
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsDonut>
                      <Pie
                        data={budgetAllocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {budgetAllocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </RechartsDonut>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4">
                  <div className="text-xs text-center">
                    <span className="font-medium">Total Allocation: </span>
                    ${currentBudget.allocatedAmount.toLocaleString()}
                  </div>
                  <div className="text-xs text-center text-muted-foreground">
                    Last updated {formatDate(currentBudget.lastUpdated)}
                  </div>
                </div>
              </Card>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4">
          <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4">
            <div className="mb-4 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium">Transaction History</h3>
                <p className="text-xs text-muted-foreground">{transactions.length} transactions recorded</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs h-7 bg-flow-accent/10 text-flow-accent border-flow-accent/50"
              >
                <Plus className="h-3 w-3 mr-2" />
                New Transaction
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => {
                    // Find the budget for this transaction
                    const budget = budgets.find(b => b.id === transaction.budgetId);
                    // Find the category for this transaction
                    const category = budget?.categories.find(c => c.id === transaction.categoryId);
                    
                    return (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.description}</TableCell>
                        <TableCell>{formatDate(transaction.date)}</TableCell>
                        <TableCell>{budget?.name || 'Unknown'}</TableCell>
                        <TableCell>{category?.name || 'Unknown'}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}
                          >
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}>
                            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`
                              ${transaction.status === 'completed' ? 'bg-green-500/20 text-green-500' : 
                                transaction.status === 'pending' ? 'bg-amber-500/20 text-amber-500' : 
                                'bg-red-500/20 text-red-500'}
                            `}
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{transaction.createdBy}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="allocations" className="space-y-4">
          <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4">
            <div className="mb-4 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium">Budget Allocation Requests</h3>
                <p className="text-xs text-muted-foreground">Pending and processed allocation requests</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs h-7 bg-flow-accent/10 text-flow-accent border-flow-accent/50"
              >
                <Plus className="h-3 w-3 mr-2" />
                New Request
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Division</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Approved By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: 'req1',
                      divisionId: 'marketing',
                      divisionName: 'Marketing Division',
                      amount: 15000,
                      reason: 'Additional ad spend for Q2 campaign',
                      status: 'approved',
                      requestedBy: 'user123',
                      requestedAt: '2025-04-10T09:15:00Z',
                      approvedBy: 'user456',
                      approvedAt: '2025-04-11T14:30:00Z'
                    },
                    {
                      id: 'req2',
                      divisionId: 'development',
                      divisionName: 'Product Development',
                      amount: 25000,
                      reason: 'New feature development resources',
                      status: 'pending',
                      requestedBy: 'user789',
                      requestedAt: '2025-04-14T11:20:00Z'
                    },
                    {
                      id: 'req3',
                      divisionId: 'operations',
                      divisionName: 'Operations',
                      amount: 8000,
                      reason: 'Staff training for new system',
                      status: 'approved',
                      requestedBy: 'user123',
                      requestedAt: '2025-04-08T13:45:00Z',
                      approvedBy: 'user456',
                      approvedAt: '2025-04-09T10:30:00Z'
                    },
                    {
                      id: 'req4',
                      divisionId: 'marketing',
                      divisionName: 'Marketing Division',
                      amount: 5000,
                      reason: 'Emergency content creation',
                      status: 'rejected',
                      requestedBy: 'user789',
                      requestedAt: '2025-04-05T16:20:00Z',
                      approvedBy: 'user456',
                      approvedAt: '2025-04-06T09:15:00Z'
                    }
                  ].map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.divisionName}</TableCell>
                      <TableCell className="text-right">${request.amount.toLocaleString()}</TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`
                            ${request.status === 'approved' ? 'bg-green-500/20 text-green-500' : 
                              request.status === 'pending' ? 'bg-amber-500/20 text-amber-500' : 
                              'bg-red-500/20 text-red-500'}
                          `}
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{request.requestedBy}</TableCell>
                      <TableCell>{formatDate(request.requestedAt)}</TableCell>
                      <TableCell>{request.approvedBy || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetManagement;
