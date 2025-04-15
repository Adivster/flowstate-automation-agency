
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Leaf, SunMoon, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="h-9 w-9 border-flow-border/30 bg-black/10">
        <SunMoon className="h-4 w-4 opacity-50" />
      </Button>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Button
              variant="outline"
              size="icon"
              className={`h-9 w-9 ${
                theme === 'light' 
                  ? 'border-emerald-300/50 bg-amber-50/80' 
                  : 'border-flow-border/30 bg-black/20'
              }`}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sparkles className="h-4 w-4 text-amber-300" />
              ) : (
                <Leaf className="h-4 w-4 text-emerald-600" />
              )}
            </Button>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`absolute -top-8 text-xs font-medium px-2.5 py-1.5 rounded-md whitespace-nowrap ${
                theme === 'light'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-flow-accent/20 text-flow-accent border border-flow-accent/30'
              }`}
            >
              {theme === 'light' ? (
                <div className="flex items-center">
                  <Leaf className="h-3 w-3 mr-1.5 text-emerald-600" />
                  <span>SolarPunk</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Zap className="h-3 w-3 mr-1.5 text-flow-accent" />
                  <span>CyberPunk</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          {theme === 'dark' ? 'Switch to SolarPunk Theme' : 'Switch to CyberPunk Theme'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ThemeToggle;
