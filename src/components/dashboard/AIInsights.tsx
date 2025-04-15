
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SearchBar from './insights/SearchBar';
import HeaderControls from './insights/HeaderControls';
import TabContent from './insights/TabContent';
import { useDisplayState } from './insights/useDisplayState';

const AIInsights: React.FC = () => {
  const { t } = useLanguage();
  const {
    isFullscreen,
    sidebarCollapsed,
    systemHealth,
    activeTab,
    setActiveTab,
    toggleFullscreen,
    toggleSidebar
  } = useDisplayState();

  const handleCommandK = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const event = new CustomEvent('openCommandTerminal');
      window.dispatchEvent(event);
    }
  };
  
  return (
    <div className="p-4 relative">
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <SearchBar onKeyDown={handleCommandK} />
        <HeaderControls
          isFullscreen={isFullscreen}
          sidebarCollapsed={sidebarCollapsed}
          onToggleFullscreen={toggleFullscreen}
          onToggleSidebar={toggleSidebar}
        />
      </div>

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
        
        <TabContent systemHealth={systemHealth} />
      </Tabs>

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
