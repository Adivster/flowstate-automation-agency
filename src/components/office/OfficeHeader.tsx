
import { Building2 } from "lucide-react";
import { useTheme } from 'next-themes';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import PageHeader from '@/components/ui/design-system/PageHeader';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface OfficeHeaderProps {
  handleActionClick: (action: string) => void;
  selectedAgentInfo: any | null;
  handleViewPerformance: () => void;
  isDark: boolean;
}

const OfficeHeader = ({ 
  handleActionClick, 
  selectedAgentInfo, 
  handleViewPerformance, 
  isDark 
}: OfficeHeaderProps) => {
  const { t } = useLanguage();
  
  const headerIcon = isDark 
    ? <Building2 className="h-12 w-12 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
    : <Building2 className="h-12 w-12 text-emerald-600 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center"
    >
      <PageHeader 
        title="Office"
        extendedTitle={isDark ? "Digital Workspace" : "Collaborative Environment"}
        description={isDark 
          ? "Navigate your AI teams with an interactive, real-time floor plan."
          : "An integrated workspace for your eco-conscious digital agents."
        }
        icon={headerIcon}
        variant="office"
        glassEffect={true}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              variant={isDark ? "cyberpunk" : "eco"} 
              size="sm"
              onClick={() => handleActionClick('reorganize')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M3 15h18" />
                <path d="M9 3v18" />
                <path d="M15 3v18" />
              </svg>
              Reorganize Office
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className={cn(
                isDark 
                  ? "bg-purple-500/10 border-purple-500/50 hover:bg-purple-500/20 text-purple-400" 
                  : "bg-emerald-100 border-emerald-300 hover:bg-emerald-200 text-emerald-700"
              )}
              onClick={() => handleActionClick('agent-details')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M18 21a8 8 0 0 0-16 0" />
                <circle cx="10" cy="8" r="5" />
                <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-8 6c.97 1.33 3 3.5 4 4" />
              </svg>
              {selectedAgentInfo ? 'Close Agent Details' : 'View Agent Details'}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className={cn(
                isDark 
                  ? "bg-purple-500/10 border-purple-500/50 hover:bg-purple-500/20 text-purple-400" 
                  : "bg-emerald-100 border-emerald-300 hover:bg-emerald-200 text-emerald-700"
              )}
              onClick={() => handleActionClick('refresh')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
              Refresh Status
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={cn(
                isDark 
                  ? "bg-blue-500/10 border-blue-500/50 hover:bg-blue-500/20 text-blue-400" 
                  : "bg-blue-100 border-blue-300 hover:bg-blue-200 text-blue-700"
              )}
              onClick={handleViewPerformance}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              Performance Monitoring
            </Button>
          </div>
        }
      />
    </motion.div>
  );
};

export default OfficeHeader;
