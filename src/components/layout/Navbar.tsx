
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BookOpen, 
  BarChart, 
  LayoutGrid, 
  Users,
  GraduationCap, 
  CheckSquare, 
  Menu, 
  X, 
  Workflow,
  LayoutDashboard,
  Settings,
  Bell,
  FileText,
  LightbulbIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const navItems = [
  {
    name: "dashboard",
    link: "/",
    icon: LayoutDashboard,
  },
  {
    name: "agents",
    link: "/agents",
    icon: Users,
  },
  {
    name: "tasksAndFlows",
    displayName: "Tasks & Flows",
    link: "/tasks-flows",
    icon: Workflow,
  },
  {
    name: "knowledge",
    link: "/knowledge",
    icon: BookOpen,
  },
  {
    name: "insights",
    link: "/insights",
    icon: LightbulbIcon,
  },
  {
    name: "courses",
    link: "/courses",
    icon: GraduationCap,
  },
];

export default function Navbar() {
  const { t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasNewInsights, setHasNewInsights] = useState(true);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Clear notification when clicked
  const viewNotifications = () => {
    setHasNewInsights(false);
  };

  return (
    <>
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

            <div className="hidden lg:flex items-center space-x-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.link || 
                  (item.link !== "/" && location.pathname.startsWith(item.link));
                
                // Use displayName if provided, otherwise use translated name
                const displayName = item.displayName || t(item.name);
                  
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
                    {displayName}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-3">
              <LanguageSwitcher />
              
              {/* Notification Bell with Indicator */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground mr-1"
                  onClick={viewNotifications}
                >
                  <Bell className="h-5 w-5" />
                  {hasNewInsights && (
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-flow-accent-tertiary"
                    >
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.7, 1] 
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                        className="absolute inset-0 rounded-full bg-flow-accent-tertiary animate-pulse"
                      />
                    </motion.div>
                  )}
                </Button>
              </div>
              
              {/* Settings Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-foreground"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 dark:bg-black/80 backdrop-blur-lg">
                  <DropdownMenuItem>
                    <span>Appearance</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Notifications</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Accessibility</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <div className="p-2 flex items-center justify-between">
                    <span className="text-sm">Theme</span>
                    <ThemeToggle />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
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
                  
                  // Use displayName if provided, otherwise use translated name
                  const displayName = item.displayName || t(item.name);
                    
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
                      <item.icon className="h-4 w-4 mr-1.5" />
                      {displayName}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Status Ribbon */}
      <div className="fixed top-16 w-full z-40 bg-gradient-to-r from-black/20 via-black/30 to-black/20 border-y border-flow-border/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-8 font-cyber text-xs">
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-lime-400 mr-2"></span>
            <span className="text-lime-400 font-medium mr-1">All systems operational</span>
            <span className="text-flow-foreground/60">•</span>
            <span className="text-flow-foreground/60 ml-1">Last update: 2 min ago</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Badge variant="outline" className="text-[10px] px-1.5 border-flow-accent-secondary/50 text-flow-accent-secondary">
              CPU: 12%
            </Badge>
            <Badge variant="outline" className="text-[10px] px-1.5 border-lime-400/50 text-lime-400">
              Mem: 46%
            </Badge>
            <Badge variant="outline" className="text-[10px] px-1.5 border-amber-400/50 text-amber-400">
              Net: 22MB/s
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
}
