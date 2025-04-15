
import React from 'react';
import { Card } from '@/components/ui/card';

export const OfficeLoadingState: React.FC = () => {
  return (
    <Card className="relative w-full h-[550px] overflow-hidden border-2 p-0 bg-flow-background/20 border-flow-border neon-border">
      <div className="absolute inset-0 flex items-center justify-center bg-flow-background/50 backdrop-blur-sm">
        <div className="w-12 h-12 border-4 border-flow-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    </Card>
  );
};
