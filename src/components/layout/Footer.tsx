
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 px-6 border-t border-flow-border/30 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-flow-foreground/60">
              &copy; {currentYear} FlowState Agency. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <a 
              href="#" 
              className="text-sm text-flow-foreground/60 hover:text-flow-foreground transition-colors"
            >
              Terms
            </a>
            <a 
              href="#" 
              className="text-sm text-flow-foreground/60 hover:text-flow-foreground transition-colors"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="text-sm text-flow-foreground/60 hover:text-flow-foreground transition-colors"
            >
              Contact
            </a>
            <span className="flex items-center text-sm text-flow-foreground/60">
              Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> by AI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
