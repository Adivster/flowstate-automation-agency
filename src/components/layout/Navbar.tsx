
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BookOpen, BarChart, LayoutGrid, Compass, GraduationCap, CheckSquare, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Define the navigation items
const navItems = [
  {
    name: "dashboard",
    link: "/",
    icon: LayoutGrid,
  },
  {
    name: "agents",
    link: "/agents",
    icon: Compass,
  },
  {
    name: "workflows",
    link: "/workflows",
    icon: GraduationCap,
  },
  {
    name: "knowledge",
    link: "/knowledge",
    icon: BookOpen,
  },
  {
    name: "analytics",
    link: "/analytics",
    icon: BarChart,
  },
  {
    name: "tasks",
    link: "/tasks",
    icon: CheckSquare,
  },
];

export default function Navbar() {
  const { t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-md bg-opacity-80 bg-background/70 border-b border-border/40 font-cyber">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 rounded bg-indigo-500 flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-bold text-lg text-foreground tracking-wider">Agent HQ</span>
            </Link>
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center space-x-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.link || 
                (item.link !== "/" && location.pathname.startsWith(item.link));
                
              return (
                <Link
                  key={item.name}
                  to={item.link}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-md flex items-center transition-colors",
                    isActive
                      ? "bg-flow-accent/20 text-flow-accent shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                  )}
                >
                  <item.icon className="h-4 w-4 mr-1.5" />
                  {t(item.name)}
                </Link>
              );
            })}
          </div>

          {/* Right side items: language switcher, theme toggle, mobile menu button */}
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border/40 bg-background/90 backdrop-blur-lg"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.link || 
                  (item.link !== "/" && location.pathname.startsWith(item.link));
                  
                return (
                  <Link
                    key={item.name}
                    to={item.link}
                    className={cn(
                      "px-3 py-2 text-sm flex items-center transition-colors rounded-md",
                      isActive
                        ? "bg-flow-accent/20 text-flow-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {t(item.name)}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
