
import React from 'react';
import { Shield } from 'lucide-react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import AISystemStatus from '../AISystemStatus';
import InteractiveSystemDiagram from '../InteractiveSystemDiagram';
import { Button } from '@/components/ui/button';

const SystemTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AISystemStatus />
        <InteractiveSystemDiagram />
      </div>
      
      <GlassMorphism className="p-4 mt-4 rounded-xl bg-flow-background/20 backdrop-blur-lg">
        <h3 className="text-xl font-medium mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-flow-accent" />
          System Settings & Controls
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-flow-border/30 rounded-lg">
            <div>
              <h4 className="text-sm font-medium">AI Autonomy Level</h4>
              <p className="text-xs text-flow-foreground/60">Controls how much freedom agents have to make decisions</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-xs">Low</Button>
              <Button size="sm" className="text-xs bg-flow-accent">Medium</Button>
              <Button variant="outline" size="sm" className="text-xs">High</Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 border border-flow-border/30 rounded-lg">
            <div>
              <h4 className="text-sm font-medium">Human Approval Required</h4>
              <p className="text-xs text-flow-foreground/60">Actions that need your explicit approval</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <input id="critical" type="checkbox" checked className="mr-2" />
                <label htmlFor="critical" className="text-xs">Critical</label>
              </div>
              <div className="flex items-center">
                <input id="financial" type="checkbox" checked className="mr-2" />
                <label htmlFor="financial" className="text-xs">Financial</label>
              </div>
              <div className="flex items-center">
                <input id="external" type="checkbox" className="mr-2" />
                <label htmlFor="external" className="text-xs">External</label>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 border border-flow-border/30 rounded-lg">
            <div>
              <h4 className="text-sm font-medium">System Maintenance</h4>
              <p className="text-xs text-flow-foreground/60">Next scheduled maintenance: Tomorrow at 03:00 AM</p>
            </div>
            <Button size="sm" variant="outline" className="text-xs">
              View Schedule
            </Button>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-flow-foreground/60">
          Use the Command Terminal for advanced system controls and administration
        </div>
      </GlassMorphism>
    </div>
  );
};

export default SystemTab;
