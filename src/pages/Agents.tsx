
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AgentGrid from '@/components/agents/AgentGrid';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cpu, Users, Briefcase } from 'lucide-react';
import OfficeFloorPlan from '@/components/agents/OfficeFloorPlan';
import CommandTerminal from '@/components/agents/CommandTerminal';
import AgencyMetrics from '@/components/agents/AgencyMetrics';

const Agents = () => {
  return (
    <div className="min-h-screen bg-flow-background text-flow-foreground flex flex-col">
      <Helmet>
        <title>Agents | FlowState Agency</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <TransitionWrapper>
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1">Agency HQ</h1>
              <p className="text-flow-foreground/70">
                Monitor agent activities and manage divisions in your virtual office
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs bg-flow-muted/50 px-3 py-1.5 rounded-full">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              24 Active Agents
            </div>
          </div>
          
          <Tabs defaultValue="office" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="office" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">Office View</span>
              </TabsTrigger>
              <TabsTrigger value="agents" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Agent List</span>
              </TabsTrigger>
              <TabsTrigger value="metrics" className="flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                <span className="hidden sm:inline">System Metrics</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="office" className="space-y-6">
              <div className="text-sm text-flow-foreground/60 mb-4">
                Interactive office floor plan - click on divisions to view details
              </div>
              
              <OfficeFloorPlan />
              
              <div className="text-xs text-flow-foreground/60 mt-2">
                <span className="text-flow-accent">Pro tip:</span> Open the terminal with the button in the bottom right to run agency commands
              </div>
            </TabsContent>
            
            <TabsContent value="agents" className="space-y-6">
              <div className="text-sm text-flow-foreground/60 mb-4">
                All active agents within your agency
              </div>
              
              <AgentGrid />
            </TabsContent>
            
            <TabsContent value="metrics" className="space-y-6">
              <div className="text-sm text-flow-foreground/60 mb-4">
                Performance metrics and agency achievements
              </div>
              
              <AgencyMetrics />
            </TabsContent>
          </Tabs>
        </TransitionWrapper>
      </main>
      
      <CommandTerminal />
      
      <Footer />
    </div>
  );
};

export default Agents;
