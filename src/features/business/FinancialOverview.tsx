
import { useState, useEffect } from 'react';
import { BarChart, PieChart, LineChart, Activity, DollarSign, TrendingUp, TrendingDown, Users, ShoppingCart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useKpiData } from '@/hooks/useKpiData';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface FinancialOverviewProps {
  timeRange: string;
}

const FinancialOverview = ({ timeRange }: FinancialOverviewProps) => {
  const kpiData = useKpiData(timeRange);

  // Prepare chart data
  const revenueData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Revenue',
        data: kpiData.adCampaignPerformance.map(item => item.value),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const conversionData = {
    labels: ['Social', 'Organic', 'Referral', 'Direct', 'Email'],
    datasets: [
      {
        label: 'Conversion Rate %',
        data: [8.2, 5.7, 7.1, 9.3, 11.5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const engagementData = {
    labels: kpiData.userEngagement.map((_, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: 'Engagement Minutes',
        data: kpiData.userEngagement.map(item => item.value),
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassMorphism className="p-4 rounded-xl border-flow-border/30 flex items-center">
          <div className="bg-green-500/20 p-3 rounded-lg mr-4">
            <DollarSign className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{kpiData.totalRevenue}</div>
            <div className="text-xs text-flow-foreground/70">Total Revenue</div>
          </div>
          <div className="ml-auto flex items-center text-green-400">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">+12.5%</span>
          </div>
        </GlassMorphism>
        
        <GlassMorphism className="p-4 rounded-xl border-flow-border/30 flex items-center">
          <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
            <Activity className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{kpiData.conversionRate}%</div>
            <div className="text-xs text-flow-foreground/70">Conversion Rate</div>
          </div>
          <div className="ml-auto flex items-center text-green-400">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">+2.3%</span>
          </div>
        </GlassMorphism>
        
        <GlassMorphism className="p-4 rounded-xl border-flow-border/30 flex items-center">
          <div className="bg-amber-500/20 p-3 rounded-lg mr-4">
            <Users className="h-6 w-6 text-amber-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{kpiData.customerSatisfaction}%</div>
            <div className="text-xs text-flow-foreground/70">Customer Satisfaction</div>
          </div>
          <div className="ml-auto flex items-center text-red-400">
            <TrendingDown className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">-1.2%</span>
          </div>
        </GlassMorphism>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium">Revenue Trend</h3>
              <p className="text-xs text-muted-foreground">Daily revenue performance</p>
            </div>
            <LineChart className="h-5 w-5 text-flow-accent" />
          </div>
          <div className="h-64">
            <Line 
              data={revenueData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)',
                    },
                    ticks: {
                      color: 'rgba(255, 255, 255, 0.7)',
                    }
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      color: 'rgba(255, 255, 255, 0.7)',
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: false,
                  }
                }
              }} 
            />
          </div>
        </Card>
        
        <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium">Conversion by Channel</h3>
              <p className="text-xs text-muted-foreground">Source effectiveness</p>
            </div>
            <PieChart className="h-5 w-5 text-flow-accent" />
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="w-48 h-48">
              <Pie 
                data={conversionData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                          size: 10
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </Card>
      </div>
      
      <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium">User Engagement</h3>
            <p className="text-xs text-muted-foreground">Average time spent per session</p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[120px] h-8 text-xs bg-flow-background/30 border-flow-border/50">
                <SelectValue placeholder="All Sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="web">Web</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="app">Desktop App</SelectItem>
              </SelectContent>
            </Select>
            <BarChart className="h-5 w-5 text-flow-accent" />
          </div>
        </div>
        <div className="h-64">
          <Bar 
            data={engagementData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                  ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                  }
                },
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                  }
                }
              },
              plugins: {
                legend: {
                  display: false,
                }
              }
            }} 
          />
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Top Performing Products</h3>
            <ShoppingCart className="h-4 w-4 text-flow-accent" />
          </div>
          <div className="space-y-3 mt-4">
            {['Product A', 'Product B', 'Product C', 'Product D', 'Product E'].map((product, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b border-flow-border/30">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-flow-accent mr-2"></div>
                  <span className="text-xs">{product}</span>
                </div>
                <div className="text-xs font-medium">
                  ${Math.floor(Math.random() * 10000) / 100}k
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Recent Transactions</h3>
            <DollarSign className="h-4 w-4 text-flow-accent" />
          </div>
          <div className="space-y-3 mt-4">
            {[
              { name: 'Enterprise License', amount: '+$12,500.00', date: '15 Apr 2025' },
              { name: 'Service Subscription', amount: '+$4,200.00', date: '12 Apr 2025' },
              { name: 'Consulting Fee', amount: '-$3,750.00', date: '10 Apr 2025' },
              { name: 'Software Renewal', amount: '-$1,800.00', date: '08 Apr 2025' },
              { name: 'Support Package', amount: '+$5,400.00', date: '05 Apr 2025' }
            ].map((transaction, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b border-flow-border/30">
                <div className="flex flex-col">
                  <span className="text-xs font-medium">{transaction.name}</span>
                  <span className="text-[10px] text-muted-foreground">{transaction.date}</span>
                </div>
                <div className={`text-xs font-medium ${transaction.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FinancialOverview;
