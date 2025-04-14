
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun, SunMoon } from "lucide-react";
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
    >
      <Button
        variant="outline"
        size="icon"
        className={`h-9 w-9 ${theme === 'light' ? 'border-emerald-300/50 bg-amber-50/80' : 'border-flow-border/30 bg-black/20'}`}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        title={theme === 'dark' ? "Switch to Light Mode (SolarPunk)" : "Switch to Dark Mode (CyberPunk)"}
      >
        {theme === 'dark' ? (
          <Sun className="h-4 w-4 text-amber-300" />
        ) : (
          <Moon className="h-4 w-4 text-indigo-600/70" />
        )}
      </Button>
    </motion.div>
  );
}
