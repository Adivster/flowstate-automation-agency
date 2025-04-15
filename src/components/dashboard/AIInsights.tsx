
import React, { useState, useEffect } from 'react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import the refactored components
import InsightHeader from './insights/InsightHeader';
import InsightCard, { Insight } from './insights/InsightCard';
import InsightFooter from './insights/InsightFooter';
import InsightFilters from './insights/InsightFilters';
import { useInsights } from './insights/useInsights';

const AIInsights: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('current');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  
  // Use the custom hook to manage insights
  const { 
    insights, 
    loading, 
    expandedInsight, 
    filterType,
    filterSeverity, 
    toggleExpand,
    setFilterType,
    setFilterSeverity
  } = useInsights();
  
  // Calculate counts for the filters
  const typeCount = insights.reduce((acc: Record<string, number>, insight) => {
    acc[insight.type] = (acc[insight.type] || 0) + 1;
    return acc;
  }, {});
  
  const severityCount = insights.reduce((acc: Record<string, number>, insight) => {
    acc[insight.severity] = (acc[insight.severity] || 0) + 1;
    return acc;
  }, {});
  
  // Simulate refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <GlassMorphism className="p-6 rounded-xl bg-gradient-to-br from-indigo-500/5 to-purple-500/10 backdrop-blur-lg border-flow-accent/20 h-full overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <InsightHeader 
        title="AI Insights" 
        description="Real-time intelligence & recommendations" 
      />
      
      <div className="flex justify-between mb-4">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="bg-flow-background/20 border-flow-border/20 border">
            <TabsTrigger value="current" className="text-xs">
              Current Insights
            </TabsTrigger>
            <TabsTrigger value="historical" className="text-xs">
              Historical
            </TabsTrigger>
            <TabsTrigger value="dismissed" className="text-xs">
              Dismissed
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button 
          size="sm" 
          variant="outline" 
          className="ml-2 h-8 border-flow-border/20 bg-flow-background/30"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      
      <InsightFilters
        filterType={filterType}
        filterSeverity={filterSeverity}
        setFilterType={setFilterType}
        setFilterSeverity={setFilterSeverity}
        typeCount={typeCount}
        severityCount={severityCount}
      />

      <ScrollArea className="h-[calc(100%-200px)]">
        <TabsContent value="current" className="m-0 p-0">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <motion.div 
                className="w-8 h-8 border-2 border-flow-accent border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : insights.length > 0 ? (
            <div className="space-y-4">
              {insights.map((insight) => (
                <InsightCard 
                  key={insight.id}
                  insight={insight}
                  isExpanded={expandedInsight === insight.id}
                  onToggleExpand={toggleExpand}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-flow-foreground/50">
              <p>No insights available for the selected filters</p>
              <Button 
                variant="ghost" 
                className="mt-2 text-sm"
                onClick={() => {
                  setFilterType('all');
                  setFilterSeverity('all');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="historical" className="m-0 p-0">
          <div className="flex flex-col items-center justify-center h-40 text-flow-foreground/60">
            <p className="text-sm">Historical insights will be available soon</p>
          </div>
        </TabsContent>
        
        <TabsContent value="dismissed" className="m-0 p-0">
          <div className="flex flex-col items-center justify-center h-40 text-flow-foreground/60">
            <p className="text-sm">No dismissed insights</p>
          </div>
        </TabsContent>
      </ScrollArea>
      
      <div className="pt-2 mt-3">
        <InsightFooter />
      </div>

      <style>
        {`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        `}
      </style>
    </GlassMorphism>
  );
};

export default AIInsights;
