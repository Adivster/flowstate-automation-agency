
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Sparkles, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/providers/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="h-9 w-9 border-flow-border/30 bg-black/10">
        <Moon className="h-4 w-4 opacity-50" />
      </Button>
    );
  }

  const isDark = theme === 'dark';

  const handleToggle = () => {
    setShowParticles(true);
    setTheme(isDark ? 'light' : 'dark');
    
    // Reset particle effect after animation completes
    setTimeout(() => setShowParticles(false), 750);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
              onClick={handleToggle}
            >
              <Button
                variant="outline"
                size="icon"
                className={`relative h-9 w-9 ${
                  !isDark 
                    ? 'border-emerald-300/50 bg-amber-50/80' 
                    : 'border-flow-border/30 bg-black/20'
                }`}
              >
                {isDark ? (
                  <Moon className="h-4 w-4 text-flow-accent-secondary" />
                ) : (
                  <Sun className="h-4 w-4 text-amber-500" />
                )}

                {/* Particle effects on toggle */}
                {showParticles && isDark && (
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-cyan-400"
                        initial={{ 
                          opacity: 1, 
                          x: '50%', 
                          y: '50%'
                        }}
                        animate={{ 
                          opacity: 0,
                          x: `${50 + (Math.random() * 100 - 50)}%`,
                          y: `${50 + (Math.random() * 100 - 50)}%`,
                          scale: 0
                        }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      />
                    ))}
                  </div>
                )}

                {showParticles && !isDark && (
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-emerald-400"
                        initial={{ 
                          opacity: 1, 
                          x: '50%', 
                          y: '50%'
                        }}
                        animate={{ 
                          opacity: 0,
                          x: `${50 + (Math.random() * 100 - 50)}%`,
                          y: `${50 + (Math.random() * 100 - 50)}%`,
                          scale: 0
                        }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      />
                    ))}
                  </div>
                )}
              </Button>
            </motion.div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          {isDark ? 'Switch to Solarpunk Theme' : 'Switch to Cyberpunk Theme'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ThemeToggle;
