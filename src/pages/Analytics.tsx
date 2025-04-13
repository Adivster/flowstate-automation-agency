import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles, BarChart3, LineChart, PieChart, LayoutDashboard, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useKpiData } from '@/hooks/useKpiData';
import { AreaChart } from '@/components/ui/chart';
import { motion } from 'framer-motion';
import GlassMorphism from '@/components/ui/GlassMorphism';
import PageHeader from '@/components/ui/design-system/PageHeader';

const Analytics = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loaded, setLoaded] = useState(false);
  const [timePeriod, setTimePeriod] = useState('7d');
  const kpiData = useKpiData(timePeriod);
  
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 200);
  }, []);
  
  const kpiInsights = [
    { text: 'Increased user engagement', value: '+15%', isPositive: true },
    { text: 'Improved conversion rate', value: '+8%', isPositive: true },
    { text: 'Decreased bounce rate', value: '-5%', isPositive: false },
  ];
  
  if (!loaded) {
    return (
      <div className="fixed inset-0 bg-flow-background flex flex-col items-center justify-center z-50">
        <div className="w-12 h-12 border-4 border-flow-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-flow-background circuit-background">
      <Helmet>
        <title>{t('analytics')} | {t('agency')}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-20 pb-12">
        <TransitionWrapper>
          <div className="max-w-7xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PageHeader 
                title={t('analyticsDashboard')}
                description={t('monitorAgencyPerformance')}
                icon={<BarChart3 className="h-8 w-8 text-blue-500 drop-shadow-[0_0_15px_rgba(147,197,253,0.8)]" />}
                glassEffect={true}
                className="mb-6"
                actions={
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs bg-flow-muted/30 hover:bg-flow-muted/50 border-flow-border"
                    onClick={(e) => toast({
                      title: "Settings",
                      description: "Opening analytics settings panel",
                      duration: 3000,
                    })}
                  >
                    <Settings className="h-3 w-3 mr-1" />
                    Settings
                  </Button>
                }
              />
            </motion.div>
            
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <GlassMorphism intensity="low" className="p-4 rounded-xl border-blue-500/30 flex items-center">
                  <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                    <LineChart className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{kpiData.totalRevenue}</div>
                    <div className="text-xs text-flow-foreground/70">Total Revenue</div>
                  </div>
                </GlassMorphism>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <GlassMorphism intensity="low" className="p-4 rounded-xl border-purple-500/30 flex items-center">
                  <div className="bg-purple-500/20 p-2 rounded-lg mr-4">
                    <PieChart className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{kpiData.conversionRate}%</div>
                    <div className="text-xs text-flow-foreground/70">Conversion Rate</div>
                  </div>
                </GlassMorphism>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <GlassMorphism intensity="low" className="p-4 rounded-xl border-green-500/30 flex items-center">
                  <div className="bg-green-500/20 p-2 rounded-lg mr-4">
                    <Sparkles className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{kpiData.customerSatisfaction}%</div>
                    <div className="text-xs text-flow-foreground/70">Customer Satisfaction</div>
                  </div>
                </GlassMorphism>
              </motion.div>
            </div>
            
            <GlassMorphism className="border border-flow-border/30 rounded-2xl overflow-hidden">
              <Card className="bg-transparent shadow-none border-none">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-flow-foreground/60 mb-4">
                    <div className="flex items-center">
                      <LayoutDashboard className="h-4 w-4 mr-2 text-flow-accent" />
                      {t('performanceOverview')}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
                      <select
                        className="w-[140px] h-8 text-xs bg-flow-background/30 border-flow-border/50 rounded-md px-2 py-1 focus:outline-none"
                        value={timePeriod}
                        onChange={(e) => setTimePeriod(e.target.value)}
                      >
                        <option value="24h">Last 24 Hours</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                        <option value="90d">Last Quarter</option>
                      </select>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-8 px-2 text-xs bg-flow-background/30 border-flow-border/50"
                        onClick={() => toast({
                          title: "Export Data",
                          description: "Analytics data export functionality can be added here",
                          duration: 3000,
                        })}
                      >
                        Export
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-black/30 border border-flow-border/20 rounded-md p-3">
                        <div className="text-sm font-medium mb-2">Website Traffic</div>
                        <div className="h-32">
                          <AreaChart
                            data={kpiData.websiteTraffic}
                            showGrid={false}
                            showXAxis={true}
                            showYAxis={false}
                            lineColor="#6366f1"
                          />
                        </div>
                        <div className="text-xs text-center mt-1 text-flow-foreground/60">
                          Unique Visitors per Day
                        </div>
                      </div>
                      
                      <div className="bg-black/30 border border-flow-border/20 rounded-md p-3">
                        <div className="text-sm font-medium mb-2">Ad Campaign Performance</div>
                        <div className="h-32">
                          <AreaChart
                            data={kpiData.adCampaignPerformance}
                            showGrid={false}
                            showXAxis={true}
                            showYAxis={false}
                            lineColor="#10b981"
                          />
                        </div>
                        <div className="text-xs text-center mt-1 text-flow-foreground/60">
                          Impressions and Conversions
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-black/30 border border-flow-border/20 rounded-md p-3">
                        <div className="text-sm font-medium mb-2">User Engagement</div>
                        <div className="h-32">
                          <AreaChart
                            data={kpiData.userEngagement}
                            showGrid={false}
                            showXAxis={true}
                            showYAxis={false}
                            lineColor="#f59e0b"
                          />
                        </div>
                        <div className="text-xs text-center mt-1 text-flow-foreground/60">
                          Average Session Duration
                        </div>
                      </div>
                      
                      <div className="bg-black/30 border border-flow-border/20 rounded-md p-3">
                        <div className="text-sm font-medium mb-2">Customer Satisfaction</div>
                        <div className="h-32">
                          <AreaChart
                            data={kpiData.customerSatisfactionData}
                            showGrid={false}
                            showXAxis={true}
                            showYAxis={false}
                            lineColor="#e11d48"
                          />
                        </div>
                        <div className="text-xs text-center mt-1 text-flow-foreground/60">
                          Satisfaction Scores Over Time
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {kpiInsights.map((insight, index) => (
                      <div key={index} className="flex justify-between items-center p-2 rounded-lg bg-black/20">
                        <div className="text-sm">{insight.text}</div>
                        <span className={`text-xs font-medium ${insight.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                          {insight.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </GlassMorphism>
          </div>
        </TransitionWrapper>
      </main>
      
      <Footer />
      
      {/* Background ambient effects */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <motion.div
          className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, rgba(139, 92, 246, 0) 70%)" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(219, 39, 119, 0.03) 0%, rgba(219, 39, 119, 0) 70%)" }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
      
      <style>{`
        .animate-pulse-subtle {
          animation: pulse-subtle 3s infinite ease-in-out;
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes scan {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
        }
        .circuit-background {
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
        
        @media (max-width: 640px) {
          .circuit-background {
            background-size: 25px 25px;
          }
        }
      `}</style>
    </div>
  );
};

export default Analytics;
