
import React from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface InsightFooterProps {
  linkTo?: string;
  linkText?: string;
}

const InsightFooter: React.FC<InsightFooterProps> = ({ 
  linkTo = "/analytics/ai-insights", 
  linkText = "View all insights" 
}) => {
  return (
    <div className="pt-2 border-t border-flow-border/10">
      <div className="flex items-center justify-between">
        <span className="text-xs text-flow-foreground/60 flex items-center font-ibm-mono">
          <Sparkles className="h-3 w-3 mr-1 text-amber-400" />
          AI-powered insights based on your data
        </span>
        {linkTo && (
          <Link to={linkTo}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs p-0 h-7 text-flow-foreground/70 hover:text-flow-accent flex items-center"
            >
              {linkText}
              <ChevronRight className="h-3 w-3 ml-0.5" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default InsightFooter;
