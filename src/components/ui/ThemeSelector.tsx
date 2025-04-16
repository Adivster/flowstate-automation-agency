
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { Sparkles, Leaf } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-black/20 border-flow-border/30 text-xs flex items-center gap-1.5 relative"
        >
          {theme === 'dark' ? (
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
          ) : (
            <Leaf className="h-3.5 w-3.5 text-green-400" />
          )}
          {theme === 'dark' ? 'Cyberpunk' : 'Solarpunk'}
          
          {/* Enhanced floating theme indicator with more distinct styling */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className={`absolute -top-6 px-2 py-0.5 text-[10px] rounded-md ${
              theme === 'dark' 
                ? 'bg-purple-500/30 border border-purple-500/40 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                : 'bg-green-500/30 border border-green-500/40 text-green-600 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
            }`}
          >
            {theme === 'dark' ? 'Tech Mode' : 'Nature Mode'}
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-black/80 border-flow-border/30 backdrop-blur-lg">
        <DropdownMenuItem 
          className="flex items-center gap-2 text-xs cursor-pointer"
          onClick={() => setTheme('dark')}
        >
          <Sparkles className="h-3.5 w-3.5 text-purple-400" />
          <span>Cyberpunk Theme</span>
          <span className="ml-auto text-[10px] opacity-60">System-wide</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center gap-2 text-xs cursor-pointer"
          onClick={() => setTheme('light')}
        >
          <Leaf className="h-3.5 w-3.5 text-green-400" />
          <span>Solarpunk Theme</span>
          <span className="ml-auto text-[10px] opacity-60">System-wide</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
