
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, Activity, Command, Search, Menu, X } from 'lucide-react';
import GlassMorphism from '../ui/GlassMorphism';

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Agents', href: '/agents' },
    { label: 'Workflows', href: '/workflows' },
    { label: 'Knowledge Base', href: '/knowledge' },
    { label: 'Analytics', href: '/analytics' },
  ];

  return (
    <header className={cn('fixed top-0 w-full z-50 px-6 py-4', className)}>
      <GlassMorphism className="rounded-2xl px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-flow-foreground hover:text-flow-accent transition-colors"
            >
              <Layers className="h-6 w-6" />
              <span className="font-semibold text-lg">FlowState</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-medium text-flow-foreground/70 hover:text-flow-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-full text-flow-foreground/70 hover:text-flow-foreground hover:bg-flow-muted transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            
            <button 
              className="p-2 rounded-full text-flow-foreground/70 hover:text-flow-foreground hover:bg-flow-muted transition-colors"
              aria-label="Command"
            >
              <Command className="h-5 w-5" />
            </button>
            
            <button 
              className="p-2 rounded-full text-flow-foreground/70 hover:text-flow-foreground hover:bg-flow-muted transition-colors md:hidden"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </GlassMorphism>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mt-2 p-4 rounded-xl bg-flow-background border border-flow-border shadow-lg md:hidden"
        >
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="px-4 py-2 text-flow-foreground hover:bg-flow-muted rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
