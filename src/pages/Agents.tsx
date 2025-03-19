
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AgentGrid } from '@/components/agents/AgentGrid';
import TransitionWrapper from '@/components/ui/TransitionWrapper';

const Agents = () => {
  return (
    <div className="min-h-screen bg-flow-background text-flow-foreground flex flex-col">
      <Helmet>
        <title>Agents | FlowState Agency</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <TransitionWrapper>
          <h1 className="text-4xl font-bold mb-8">AI Agents</h1>
          
          <div className="mb-8">
            <p className="text-flow-foreground/80 max-w-3xl">
              FlowState's AI agents work together to automate and optimize workflows. 
              Each agent has specialized skills and can be deployed across multiple divisions.
            </p>
          </div>
          
          <AgentGrid />
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Agents;
