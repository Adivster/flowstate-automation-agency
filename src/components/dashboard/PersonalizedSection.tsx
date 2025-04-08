
import React from 'react';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Clock, Star, User, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const PersonalizedSection: React.FC = () => {
  // Mock data - in real app this would be personalized based on user behavior
  const recentlyViewed = [
    { name: 'Knowledge Base', path: '/knowledge', icon: 'BookOpen' },
    { name: 'Agent Configurations', path: '/agents', icon: 'Users' },
    { name: 'Analytics Dashboard', path: '/analytics', icon: 'BarChart' }
  ];
  
  const recommendedActions = [
    { 
      title: 'Complete Task Training', 
      description: 'Finish the task management course to unlock advanced features',
      path: '/courses',
      progress: 60
    },
    { 
      title: 'Optimize Knowledge Base', 
      description: 'Your KB needs updating with recent changes',
      path: '/knowledge',
      progress: 25
    },
    { 
      title: 'Review Agent Performance', 
      description: '3 agents have efficiency ratings below threshold',
      path: '/agents',
      progress: 0
    }
  ];

  return (
    <GlassMorphism className="p-6 rounded-xl bg-flow-background/20 backdrop-blur-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <User className="h-5 w-5 mr-2 text-flow-accent" />
          <h3 className="text-lg font-medium">Your Dashboard</h3>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Recently viewed */}
        <div>
          <div className="flex items-center text-sm mb-3">
            <Clock className="h-4 w-4 mr-1.5 text-flow-foreground/70" />
            <h4>Recently Viewed</h4>
          </div>
          <div className="flex gap-2 flex-wrap">
            {recentlyViewed.map((item) => (
              <Link key={item.name} to={item.path}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs bg-flow-background/40 border-flow-border/30 hover:bg-flow-accent/10 hover:text-flow-accent hover:border-flow-accent/30"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Recommended actions */}
        <div>
          <div className="flex items-center text-sm mb-3">
            <Star className="h-4 w-4 mr-1.5 text-yellow-500" />
            <h4>Recommended Actions</h4>
          </div>
          
          <div className="space-y-3">
            {recommendedActions.map((action) => (
              <Link key={action.title} to={action.path}>
                <div className="bg-flow-card/30 rounded-lg p-3 hover:bg-flow-card/40 transition-colors group cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-sm font-medium group-hover:text-flow-accent">{action.title}</h5>
                      <p className="text-xs text-flow-foreground/70 mt-0.5">{action.description}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-flow-foreground/40 group-hover:text-flow-accent" />
                  </div>
                  
                  {action.progress > 0 && (
                    <div className="mt-2.5">
                      <div className="h-1.5 bg-flow-muted/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-flow-accent/80 rounded-full"
                          style={{ width: `${action.progress}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-flow-foreground/50 mt-1 text-right">
                        {action.progress}% complete
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </GlassMorphism>
  );
};

export default PersonalizedSection;
