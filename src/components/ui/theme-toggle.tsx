
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Leaf, SunMoon } from "lucide-react";
import { motion } from "framer-motion";

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
        title={theme === 'dark' ? "Switch to SolarPunk Theme" : "Switch to CyberPunk Theme"}
      >
        {theme === 'dark' ? (
          <Sun className="h-4 w-4 text-amber-300" />
        ) : (
          <Leaf className="h-4 w-4 text-emerald-600" />
        )}
      </Button>
      
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className={`absolute -top-8 text-xs font-medium px-2 py-1 rounded whitespace-nowrap ${
          theme === 'light'
            ? 'bg-emerald-100 text-emerald-800'
            : 'bg-flow-accent/20 text-flow-accent'
        }`}
      >
        {theme === 'light' ? 'SolarPunk' : 'CyberPunk'}
      </motion.span>
    </motion.div>
  );
}
