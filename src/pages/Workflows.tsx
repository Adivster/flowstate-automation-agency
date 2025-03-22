import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, CheckCircle, Clock, Code, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Workflows = () => {
  const { t } = useLanguage();
  
  const workflows = [
    {
      id: 'wf-1',
      name: 'Content Automation',
      description: 'Generate and optimize content across platforms',
      status: 'active',
      lastRun: '2 hours ago',
      steps: 5,
      completion: 78
    },
    {
      id: 'wf-2',
      name: 'Market Research',
      description: 'Automated competitive analysis and market insights',
      status: 'active',
      lastRun: '1 day ago',
      steps: 8,
      completion: 100
    },
    {
      id: 'wf-3',
      name: 'SEO Optimization',
      description: 'Analyze and enhance content for better search performance',
      status: 'scheduled',
      lastRun: '3 days ago',
      steps: 6,
      completion: 0
    },
    {
      id: 'wf-4',
      name: 'Social Media Calendar',
      description: 'Auto-generate social content calendar with AI',
      status: 'paused',
      lastRun: '1 week ago',
      steps: 4,
      completion: 25
    }
  ];

  const getStatusClasses = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-500 bg-green-500/10';
      case 'paused':
        return 'text-amber-500 bg-amber-500/10';
      case 'scheduled':
        return 'text-blue-500 bg-blue-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-flow-background text-flow-foreground flex flex-col">
      <Helmet>
        <title>Workflows | FlowState Agency</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <TransitionWrapper>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-1 neon-text">{t('workflows')}</h1>
            <p className="text-flow-foreground/70">
              Automated workflows connect AI agents to accomplish complex tasks. 
              Monitor, adjust, and deploy new workflows from this dashboard.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workflows.map((workflow) => (
              <Card key={workflow.id} className="overflow-hidden border border-flow-border transition-all hover:shadow-md hover:border-flow-border/80">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-semibold">{workflow.name}</CardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses(workflow.status)}`}>
                      {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                    </span>
                  </div>
                  <CardDescription>{workflow.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-flow-foreground/70 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Last run: {workflow.lastRun}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-flow-foreground/70 mb-4">
                    <Code className="w-4 h-4 mr-2" />
                    <span>{workflow.steps} steps</span>
                  </div>
                  
                  {workflow.status === 'active' && (
                    <div className="w-full bg-flow-muted h-2 rounded-full mt-4">
                      <div 
                        className="bg-flow-accent h-2 rounded-full" 
                        style={{ width: `${workflow.completion}%` }}
                      ></div>
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-end">
                    <button className="text-flow-accent hover:text-flow-accent/80 flex items-center text-sm">
                      View details <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TransitionWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Workflows;
