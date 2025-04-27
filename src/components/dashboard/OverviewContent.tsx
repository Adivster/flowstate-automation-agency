
import React from 'react';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import GlobalOpportunityPlaybook from './GlobalOpportunityPlaybook';
import SystemVitality from './SystemVitality';
import SnapshotGrid from './SnapshotGrid';
import { useTheme } from '@/providers/theme-provider';

export const OverviewContent: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <TransitionWrapper>
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <GlobalOpportunityPlaybook />
          </div>
          <div className="lg:col-span-1">
            <SystemVitality />
          </div>
        </div>
        
        <SnapshotGrid />
      </div>
    </TransitionWrapper>
  );
};
