
import { useState, useEffect } from 'react';
import { BarChart as BarChartIcon, PieChart as PieChartIcon, LineChart as LineChartIcon, Activity, DollarSign, TrendingUp, TrendingDown, Users, ShoppingCart, Info, Plus, EyeOff } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useKpiData } from '@/hooks/useKpiData';
import { LineChart, BarChart, PieChart } from '@/components/ui/chart';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AIRecommendation from '@/components/analytics/AIRecommendation';
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface FinancialOverviewProps {
  timeRange: string;
}

const FinancialOverview = ({ timeRange }: FinancialOverviewProps) => {
  const kpiData = useKpiData(timeRange);
  const [selectedDataPoint, setSelectedDataPoint] = useState<any>(null);
  const [hiddenKPIs, setHiddenKPIs] = useState<string[]>([]);
  
  // Prepare chart data for LineChart
  const revenueData = kpiData.adCampaignPerformance.map((item, index) => ({
    name: `Day ${index + 1}`,
    value: item.value,
    description: `Performance on day ${index + 1}: ${item.value.toFixed(2)}`
  }));

  // Prepare chart data for PieChart with additional data for tooltips
  const conversionData = [
    { name: 'Social', value: 8.2, color: 'rgba(255, 99, 132, 0.6)', description: 'Social media conversion rate: 8.2%' },
    { name: 'Organic', value: 5.7, color: 'rgba(54, 162, 235, 0.6)', description: 'Organic search conversion rate: 5.7%' },
    { name: 'Referral', value: 7.1, color: 'rgba(255, 206, 86, 0.6)', description: 'Referral conversion rate: 7.1%' },
    { name: 'Direct', value: 9.3, color: 'rgba(75, 192, 192, 0.6)', description: 'Direct traffic conversion rate: 9.3%' },
    { name: 'Email', value: 11.5, color: 'rgba(153, 102, 255, 0.6)', description: 'Email campaign conversion rate: 11.5%' },
  ];

  // Prepare chart data for BarChart with richer data
  const engagementData = kpiData.userEngagement.map((item, index) => ({
    name: `Day ${index + 1}`,
    value: item.value,
    description: `User engagement on day ${index + 1}: ${item.value.toFixed(2)} minutes average session time`
  }));

  const handleDataPointClick = (data: any) => {
    setSelectedDataPoint(data);
  };

  const toggleKPI = (kpiId: string) => {
    setHiddenKPIs(prev => 
      prev.includes(kpiId) 
        ? prev.filter(id => id !== kpiId)
        : [...prev, kpiId]
    );
  };

  const isKPIVisible = (kpiId: string) => !hiddenKPIs.includes(kpiId);

  return (
    <div className="space-y-6">
      {/* KPI Cards with Tooltips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {isKPIVisible('revenue') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GlassMorphism className="p-4 rounded-xl border-flow-border/30 flex items-center relative">
              <div className="absolute top-2 right-2 flex items-center space-x-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-flow-foreground/50 hover:text-flow-accent">
                        <Info className="h-3.5 w-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-xs">Total revenue across all channels for the selected period</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-flow-foreground/50 hover:text-red-400" onClick={() => toggleKPI('revenue')}>
                  <EyeOff className="h-3.5 w-3.5" />
                </Button>
              </div>
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
          </motion.div>
        )}
        
        {isKPIVisible('conversion') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <GlassMorphism className="p-4 rounded-xl border-flow-border/30 flex items-center relative">
              <div className="absolute top-2 right-2 flex items-center space-x-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-flow-foreground/50 hover:text-flow-accent">
                        <Info className="h-3.5 w-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-xs">Average conversion rate from visitor to customer</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-flow-foreground/50 hover:text-red-400" onClick={() => toggleKPI('conversion')}>
                  <EyeOff className="h-3.5 w-3.5" />
                </Button>
              </div>
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
          </motion.div>
        )}
        
        {isKPIVisible('satisfaction') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <GlassMorphism className="p-4 rounded-xl border-flow-border/30 flex items-center relative">
              <div className="absolute top-2 right-2 flex items-center space-x-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-flow-foreground/50 hover:text-flow-accent">
                        <Info className="h-3.5 w-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-xs">Customer satisfaction score from surveys and feedback</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-flow-foreground/50 hover:text-red-400" onClick={() => toggleKPI('satisfaction')}>
                  <EyeOff className="h-3.5 w-3.5" />
                </Button>
              </div>
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
          </motion.div>
        )}
        
        <Button 
          variant="outline" 
          size="sm" 
          className="md:hidden h-12 w-full border-dashed border-flow-border/50 bg-flow-background/20 text-flow-foreground/70 hover:bg-flow-accent/10"
          onClick={() => {
            // Reset hidden KPIs to show all
            setHiddenKPIs([]);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Restore Hidden Metrics
        </Button>
      </div>
      
      {/* AI Recommendations Section */}
      <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium flex items-center">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 5 }}
              >
                <Plus className="h-4 w-4 mr-2 text-amber-400" />
              </motion.div>
              AI Business Insights
            </h3>
            <p className="text-xs text-muted-foreground">Actionable recommendations based on your data</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <AIRecommendation 
            title="Budget Reallocation Opportunity" 
            description="Moving 15% of marketing budget from underperforming channels to top performers could increase ROI by 23%"
            impact="Estimated $42,500 additional revenue over 30 days based on current trends"
            confidence={92}
            actions={[
              { label: "Apply Recommendation", onClick: () => console.log("Apply budget recommendation") },
              { label: "View Detailed Analysis", onClick: () => console.log("View analysis") }
            ]}
          />
          
          <AIRecommendation
            title="Customer Satisfaction Alert"
            description="Support response time has increased by 18% in the last week"
            impact="Current CSAT trend indicates a potential 5% drop in retention metrics if not addressed"
            confidence={87}
            actions={[
              { label: "Assign Support Resources", onClick: () => console.log("Assign resources") },
              { label: "View Support Dashboard", link: "/support" }
            ]}
          />
          
          <AIRecommendation
            title="Inventory Optimization"
            description="3 products are at risk of stockout within 7 days based on current sales velocity"
            impact="Potential revenue loss of $18,200 if inventory levels aren't adjusted"
            confidence={79}
            actions={[
              { label: "Reorder Inventory", onClick: () => console.log("Reorder inventory") },
              { label: "Adjust Inventory Alerts", onClick: () => console.log("Adjust alerts") }
            ]}
          />
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium">Revenue Trend</h3>
              <p className="text-xs text-muted-foreground">Daily revenue performance</p>
            </div>
            <LineChartIcon className="h-5 w-5 text-flow-accent" />
          </div>
          <div className="h-64">
            <LineChart 
              data={revenueData}
              height={250}
              showGrid={true}
              showTooltip={true}
              lineColor="rgba(75, 192, 192, 1)"
              showArea={true}
              areaOpacity={0.2}
              onClick={handleDataPointClick}
            />
          </div>
          
          {/* Interactive Drill-Down Panel */}
          {selectedDataPoint && selectedDataPoint.name && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-3 bg-flow-background/40 border border-flow-border/30 rounded-md"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-medium">{selectedDataPoint.name} Details</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0" 
                  onClick={() => setSelectedDataPoint(null)}
                >
                  <EyeOff className="h-3.5 w-3.5" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-flow-foreground/70">Revenue</div>
                  <div className="font-medium">${selectedDataPoint.value.toFixed(2)}k</div>
                </div>
                <div>
                  <div className="text-flow-foreground/70">Transactions</div>
                  <div className="font-medium">{Math.floor(selectedDataPoint.value * 12)}</div>
                </div>
                <div>
                  <div className="text-flow-foreground/70">Avg Order Value</div>
                  <div className="font-medium">${(selectedDataPoint.value * 83.5).toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-flow-foreground/70">Conversion Rate</div>
                  <div className="font-medium">{(selectedDataPoint.value / 4.2).toFixed(2)}%</div>
                </div>
              </div>
              
              <div className="mt-2 flex justify-end">
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  View Full Analysis
                </Button>
              </div>
            </motion.div>
          )}
        </Card>
        
        <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4 relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium">Conversion by Channel</h3>
              <p className="text-xs text-muted-foreground">Source effectiveness</p>
            </div>
            <PieChartIcon className="h-5 w-5 text-flow-accent" />
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="w-full h-48">
              <PieChart 
                data={conversionData}
                height={200}
                showLegend={true}
                legendPosition="side"
                onClick={handleDataPointClick}
              />
            </div>
          </div>
          
          {/* Contextual Annotation Layer */}
          <div className="absolute top-12 right-8">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="h-5 w-5 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center cursor-help">
                    <span className="text-[10px] text-amber-400">!</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-[200px]">
                  <p className="text-xs">Email has the highest conversion rate at 11.5%. Consider reallocating budget to this channel.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
            <BarChartIcon className="h-5 w-5 text-flow-accent" />
          </div>
        </div>
        <div className="h-64">
          <BarChart 
            data={engagementData}
            height={250}
            showGrid={true}
            showTooltip={true}
            lineColor="rgba(153, 102, 255, 0.7)"
            onClick={handleDataPointClick}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-flow-background/20 backdrop-blur-md border-flow-border p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Top Performing Products</h3>
            <ShoppingCart className="h-4 w-4 text-flow-accent" />
          </div>
          <div className="space-y-3 mt-4">
            {['Product A', 'Product B', 'Product C', 'Product D', 'Product E'].map((product, i) => {
              const value = Math.floor(Math.random() * 10000) / 100;
              const change = Math.floor(Math.random() * 200) / 10 - 10;
              
              return (
                <div key={i} className="flex items-center justify-between py-1 border-b border-flow-border/30 relative group">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-flow-accent mr-2"></div>
                    <span className="text-xs">{product}</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`text-xs font-medium mr-2`}>
                      ${value}k
                    </div>
                    <span className={`text-[10px] ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {change > 0 ? '+' : ''}{change}%
                    </span>
                  </div>
                  
                  {/* Mini sparkline visualization */}
                  <div className="absolute -right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity w-12 h-6">
                    <div className="flex items-end h-full w-full justify-between">
                      {[...Array(5)].map((_, j) => {
                        const barHeight = Math.max(20, Math.random() * 100);
                        return (
                          <div 
                            key={j}
                            className={`w-1 ${change > 0 ? 'bg-green-500/50' : 'bg-red-500/50'}`}
                            style={{ height: `${barHeight}%` }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
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
