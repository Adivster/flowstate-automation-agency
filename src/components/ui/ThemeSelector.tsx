import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Leaf } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';
import { useTheme } from '@/providers/theme-provider';

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  
  const isDark = theme === 'dark';
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`text-xs flex items-center gap-1.5 relative
            ${isDark 
              ? 'bg-black/20 border-flow-border/30' 
              : 'bg-emerald-50/80 border-emerald-200/50'}`
          }
        >
          {isDark ? (
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
          ) : (
            <Leaf className="h-3.5 w-3.5 text-emerald-500" />
          )}
          {isDark ? 'Cyberpunk' : 'Solarpunk'}
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className={`absolute -top-6 px-2 py-0.5 text-[10px] rounded-md ${
              isDark 
                ? 'bg-flow-accent-secondary/30 border border-flow-accent-secondary/40 text-flow-accent-secondary shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                : 'bg-emerald-500/30 border border-emerald-500/40 text-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
            }`}
          >
            {isDark ? 'Tech Mode' : 'Nature Mode'}
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className={isDark 
          ? "w-48 bg-black/80 border-flow-border/30 backdrop-blur-lg" 
          : "w-48 bg-white/90 border-emerald-200/50 backdrop-blur-md"}
      >
        <DropdownMenuItem 
          className="flex items-center gap-2 text-xs cursor-pointer"
          onClick={() => setTheme('dark')}
        >
          <Sparkles className={`h-3.5 w-3.5 ${isDark ? 'text-flow-accent-secondary' : 'text-purple-400'}`} />
          <span>Cyberpunk Theme</span>
          <span className="ml-auto text-[10px] opacity-60">System-wide</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center gap-2 text-xs cursor-pointer"
          onClick={() => setTheme('light')}
        >
          <Leaf className={`h-3.5 w-3.5 ${isDark ? 'text-green-400' : 'text-emerald-500'}`} />
          <span>Solarpunk Theme</span>
          <span className="ml-auto text-[10px] opacity-60">System-wide</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
