
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SearchBar from './insights/SearchBar';
import HeaderControls from './insights/HeaderControls';
import TabContent from './insights/TabContent';
import { useDisplayState } from './insights/useDisplayState';
import { 
  AlertTriangle, 
  Calendar, 
  ChevronDown, 
  X, 
  ArrowRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import StatusBadge from '../ui/design-system/StatusBadge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const AIInsights: React.FC = () => {
  const { t } = useLanguage();
  const {
    isFullscreen,
    sidebarCollapsed,
    systemHealth,
    activeTab,
    dateRange,
    hasAnomalyAlert,
    anomalyData,
    searchTerm,
    setDateRange,
    setActiveTab,
    toggleFullscreen,
    toggleSidebar,
    dismissAnomalyAlert,
    handleSearch
  } = useDisplayState();

  const [showAnomalyDialog, setShowAnomalyDialog] = useState(false);

  const handleCommandK = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const event = new CustomEvent('openCommandTerminal');
      window.dispatchEvent(event);
    }
  };
  
  const handleAnomalyAction = () => {
    setShowAnomalyDialog(true);
  };
  
  const getDateRangeText = (range: string) => {
    switch (range) {
      case 'day': return 'Last 24 hours';
      case 'week': return 'Last 7 days';
      case 'month': return 'Last 30 days';
      case 'year': return 'Last 12 months';
      default: return 'Last 7 days';
    }
  };
  
  return (
    <div className="p-4 relative">
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <SearchBar onKeyDown={handleCommandK} onSearch={handleSearch} />
        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 px-3 text-xs border-flow-border/30 bg-black/20 hover:bg-black/30 flex items-center gap-1"
              >
                <Calendar className="h-3.5 w-3.5 mr-1" />
                {getDateRangeText(dateRange)}
                <ChevronDown className="h-3.5 w-3.5 ml-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2 bg-black/80 border-flow-border/50">
              <div className="flex flex-col gap-1 min-w-[120px]">
                <Button 
                  variant={dateRange === 'day' ? "default" : "ghost"} 
                  size="sm" 
                  className="justify-start text-xs"
                  onClick={() => setDateRange('day')}
                >
                  Last 24 hours
                </Button>
                <Button 
                  variant={dateRange === 'week' ? "default" : "ghost"} 
                  size="sm" 
                  className="justify-start text-xs"
                  onClick={() => setDateRange('week')}
                >
                  Last 7 days
                </Button>
                <Button 
                  variant={dateRange === 'month' ? "default" : "ghost"} 
                  size="sm" 
                  className="justify-start text-xs"
                  onClick={() => setDateRange('month')}
                >
                  Last 30 days
                </Button>
                <Button 
                  variant={dateRange === 'year' ? "default" : "ghost"} 
                  size="sm" 
                  className="justify-start text-xs"
                  onClick={() => setDateRange('year')}
                >
                  Last 12 months
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <HeaderControls
            isFullscreen={isFullscreen}
            sidebarCollapsed={sidebarCollapsed}
            onToggleFullscreen={toggleFullscreen}
            onToggleSidebar={toggleSidebar}
          />
        </div>
      </div>
      
      <AnimatePresence>
        {hasAnomalyAlert && anomalyData && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-4 p-3 rounded-lg border flex items-center justify-between
              ${anomalyData.severity === 'high' ? 'border-red-500/50 bg-red-500/10 animate-pulse-slow' : 
                anomalyData.severity === 'medium' ? 'border-amber-500/50 bg-amber-500/10' : 
                'border-blue-500/50 bg-blue-500/10'}`
            }
          >
            <div className="flex items-center">
              <div className={`p-1.5 rounded-full mr-3 
                ${anomalyData.severity === 'high' ? 'bg-red-500/20' : 
                  anomalyData.severity === 'medium' ? 'bg-amber-500/20' : 
                  'bg-blue-500/20'}`
              }>
                <AlertTriangle className={`h-4 w-4 
                  ${anomalyData.severity === 'high' ? 'text-red-500' : 
                    anomalyData.severity === 'medium' ? 'text-amber-500' : 
                    'text-blue-500'}`
                } />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">{anomalyData.title}</h3>
                  <StatusBadge 
                    status={anomalyData.severity === 'high' ? 'error' : 
                           anomalyData.severity === 'medium' ? 'warning' : 'info'}
                    text={anomalyData.severity.charAt(0).toUpperCase() + anomalyData.severity.slice(1)}
                    size="sm"
                    pulsing={anomalyData.severity === 'high'}
                  />
                </div>
                <p className="text-xs text-flow-foreground/70">{anomalyData.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs hover:bg-white/10"
                onClick={dismissAnomalyAlert}
              >
                Dismiss
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`h-7 text-xs
                  ${anomalyData.severity === 'high' ? 'border-red-500/50 text-red-500 hover:bg-red-500/20' : 
                    anomalyData.severity === 'medium' ? 'border-amber-500/50 text-amber-500 hover:bg-amber-500/20' : 
                    'border-blue-500/50 text-blue-500 hover:bg-blue-500/20'}`
                }
                onClick={handleAnomalyAction}
              >
                Investigate <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-flow-background/30 border border-flow-border/20 p-1">
          <TabsTrigger value="mission-control" className="data-[state=active]:bg-flow-accent/20 text-xs">
            Mission Control
          </TabsTrigger>
          <TabsTrigger value="divisions" className="data-[state=active]:bg-flow-accent/20 text-xs">
            Divisions
          </TabsTrigger>
          <TabsTrigger value="agents" className="data-[state=active]:bg-flow-accent/20 text-xs">
            Agents
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-flow-accent/20 text-xs">
            System
          </TabsTrigger>
        </TabsList>
        
        <TabContent 
          systemHealth={systemHealth} 
          searchTerm={searchTerm}
          dateRange={dateRange}
          hasAnomalyAlert={hasAnomalyAlert}
          anomalyData={anomalyData}
        />
      </Tabs>

      {/* Anomaly Investigation Dialog */}
      <Dialog open={showAnomalyDialog} onOpenChange={setShowAnomalyDialog}>
        <DialogContent className="sm:max-w-lg bg-flow-background/95 border-flow-border/50 text-flow-foreground backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className={`h-5 w-5 mr-2 
                ${anomalyData?.severity === 'high' ? 'text-red-500' : 
                  anomalyData?.severity === 'medium' ? 'text-amber-500' : 
                  'text-blue-500'}`
              } />
              {anomalyData?.title}
            </DialogTitle>
            <DialogDescription>
              Detailed analysis of the detected anomaly
            </DialogDescription>
          </DialogHeader>
          
          {anomalyData && (
            <div className="py-2">
              <div className="mb-4 space-y-3">
                <div className="flex justify-between items-center p-2 rounded bg-black/20">
                  <span className="text-sm">Division</span>
                  <span className="text-sm font-medium">{anomalyData.division}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-black/20">
                  <span className="text-sm">Detected At</span>
                  <span className="text-sm font-medium">{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-black/20">
                  <span className="text-sm">Severity</span>
                  <StatusBadge 
                    status={anomalyData.severity === 'high' ? 'error' : 
                           anomalyData.severity === 'medium' ? 'warning' : 'info'}
                    text={anomalyData.severity.charAt(0).toUpperCase() + anomalyData.severity.slice(1)}
                    size="sm"
                  />
                </div>
              </div>
              
              <div className="my-4">
                <h4 className="text-sm font-medium mb-2">Recommended Actions</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-xs bg-black/20 p-2 rounded">
                    <div className="h-1 w-1 bg-flow-accent rounded-full mr-2"></div>
                    {anomalyData.severity === 'high' 
                      ? "Reallocate resources to address the bottleneck"
                      : anomalyData.severity === 'medium'
                      ? "Monitor the situation closely for the next hour"
                      : "Review and update operational parameters"}
                  </li>
                  <li className="flex items-center text-xs bg-black/20 p-2 rounded">
                    <div className="h-1 w-1 bg-flow-accent rounded-full mr-2"></div>
                    {anomalyData.division === 'Operations' 
                      ? "Check for recent workflow changes that might affect task completion"
                      : anomalyData.division === 'Analytics'
                      ? "Verify if any heavy processing jobs are running"
                      : "Review agent communication logs for irregularities"}
                  </li>
                  <li className="flex items-center text-xs bg-black/20 p-2 rounded">
                    <div className="h-1 w-1 bg-flow-accent rounded-full mr-2"></div>
                    Generate a detailed anomaly report for further analysis
                  </li>
                </ul>
              </div>
              
              <div className="py-4">
                <h4 className="text-sm font-medium mb-2">Historical Context</h4>
                <div className="bg-black/20 rounded p-3">
                  <div className="h-[100px]">
                    {/* Mini chart visualization would go here */}
                    <div className="h-full w-full flex items-end">
                      {[...Array(12)].map((_, i) => {
                        const normalHeight = 20 + Math.random() * 30;
                        const anomalyPosition = 8; // Example fixed position of anomaly
                        const height = i === anomalyPosition ? 80 : normalHeight;
                        return (
                          <motion.div
                            key={i}
                            className={`flex-1 mx-0.5 rounded-t-sm ${i === anomalyPosition ? 'bg-red-500/70' : 'bg-flow-accent/50'}`}
                            style={{ height: '10%' }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                          ></motion.div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="text-xs text-flow-foreground/60 mt-2 text-center">
                    Metric variation over the last 12 hours
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setShowAnomalyDialog(false)}>Close</Button>
            <Button onClick={() => {
              setShowAnomalyDialog(false);
              dismissAnomalyAlert();
              window.location.href = `/divisions/${anomalyData?.division.toLowerCase()}`;
            }}>
              Go to {anomalyData?.division} Division
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
    </div>
  );
};

export default AIInsights;
