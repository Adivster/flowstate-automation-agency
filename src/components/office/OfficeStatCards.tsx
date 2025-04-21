
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from '@/components/ui/badge';
import { GlassMorphism } from '@/components/ui/GlassMorphism';

interface AgentStats {
  total: number;
  active: number;
  idle: number;
  paused: number;
  error: number;
}

interface OfficeStatCardsProps {
  agentStats: AgentStats;
  isDark: boolean;
}

const OfficeStatCards = ({ agentStats, isDark }: OfficeStatCardsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="hover-scale"
      >
        <GlassMorphism 
          intensity="low" 
          className={cn(
            "p-4 rounded-xl flex items-center",
            isDark 
              ? "border-green-500/30" 
              : "border-emerald-300 bg-gradient-to-br from-emerald-50/90 to-white/90"
          )}
        >
          <div className={cn(
            "p-2 rounded-lg mr-4",
            isDark ? "bg-green-500/20" : "bg-emerald-200/50"
          )}>
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
              className={cn(
                "h-5 w-5", 
                isDark ? "text-green-500" : "text-emerald-600",
                "agent-glow-green"
              )}
            >
              <path d="M13 2H9a2 2 0 0 0-2 2v5h9V4a2 2 0 0 0-2-2Z" />
              <path d="M18 5h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-1" />
              <path d="M5 5H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h1" />
              <path d="M3 12h18" />
              <path d="m6 19-2 3" />
              <path d="m18 22-2-3" />
              <path d="M10 22h4" />
            </svg>
          </div>
          <div>
            <div className={cn(
              "text-xl font-bold", 
              isDark ? "text-white" : "text-gray-800"
            )}>
              {agentStats.active}
            </div>
            <div className={cn(
              "text-xs", 
              isDark ? "text-flow-foreground/70" : "text-gray-600"
            )}>
              Active Agents
            </div>
          </div>
          <Badge className={cn(
            "ml-auto text-xs",
            isDark ? "bg-green-500" : "bg-emerald-500"
          )}>
            Working
          </Badge>
        </GlassMorphism>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="hover-scale"
      >
        <GlassMorphism 
          intensity="low" 
          className={cn(
            "p-4 rounded-xl flex items-center",
            isDark 
              ? "border-blue-500/30" 
              : "border-blue-300 bg-gradient-to-br from-blue-50/90 to-white/90"
          )}
        >
          <div className={cn(
            "p-2 rounded-lg mr-4",
            isDark ? "bg-blue-500/20" : "bg-blue-200/50"
          )}>
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
              className={cn(
                "h-5 w-5", 
                isDark ? "text-blue-500" : "text-blue-600",
                "agent-glow-blue"
              )}
            >
              <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
              <rect x="9" y="9" width="6" height="6" />
              <path d="M9 2v2" />
              <path d="M15 2v2" />
              <path d="M9 22v-2" />
              <path d="M15 22v-2" />
              <path d="M2 9h2" />
              <path d="M2 15h2" />
              <path d="M22 9h-2" />
              <path d="M22 15h-2" />
            </svg>
          </div>
          <div>
            <div className={cn(
              "text-xl font-bold", 
              isDark ? "text-white" : "text-gray-800"
            )}>
              {agentStats.idle}
            </div>
            <div className={cn(
              "text-xs", 
              isDark ? "text-flow-foreground/70" : "text-gray-600"
            )}>
              Idle Agents
            </div>
          </div>
          <Badge className={cn(
            "ml-auto text-xs",
            isDark ? "bg-blue-500/70" : "bg-blue-500"
          )}>
            Ready
          </Badge>
        </GlassMorphism>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="hover-scale"
      >
        <GlassMorphism 
          intensity="low" 
          className={cn(
            "p-4 rounded-xl flex items-center",
            isDark 
              ? "border-amber-500/30" 
              : "border-amber-300 bg-gradient-to-br from-amber-50/90 to-white/90"
          )}
        >
          <div className={cn(
            "p-2 rounded-lg mr-4",
            isDark ? "bg-amber-500/20" : "bg-amber-200/50"
          )}>
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
              className={cn(
                "h-5 w-5", 
                isDark ? "text-amber-500" : "text-amber-600",
                "agent-glow-amber"
              )}
            >
              <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
              <rect x="9" y="9" width="6" height="6" />
              <path d="M9 2v2" />
              <path d="M15 2v2" />
              <path d="M9 22v-2" />
              <path d="M15 22v-2" />
              <path d="M2 9h2" />
              <path d="M2 15h2" />
              <path d="M22 9h-2" />
              <path d="M22 15h-2" />
            </svg>
          </div>
          <div>
            <div className={cn(
              "text-xl font-bold", 
              isDark ? "text-white" : "text-gray-800"
            )}>
              {agentStats.paused}
            </div>
            <div className={cn(
              "text-xs", 
              isDark ? "text-flow-foreground/70" : "text-gray-600"
            )}>
              Paused Agents
            </div>
          </div>
          <Badge className={cn(
            "ml-auto text-xs",
            isDark ? "bg-amber-500" : "bg-amber-500"
          )}>
            Paused
          </Badge>
        </GlassMorphism>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="hover-scale"
      >
        <GlassMorphism 
          intensity="low" 
          className={cn(
            "p-4 rounded-xl flex items-center",
            isDark 
              ? "border-red-500/30" 
              : "border-red-300 bg-gradient-to-br from-red-50/90 to-white/90"
          )}
        >
          <div className={cn(
            "p-2 rounded-lg mr-4",
            isDark ? "bg-red-500/20" : "bg-red-200/50"
          )}>
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
              className={cn(
                "h-5 w-5", 
                isDark ? "text-red-500" : "text-red-600",
                "agent-glow-red"
              )}
            >
              <path d="M10 16.5v-9l-5 3.75 5 5.25" />
              <path d="M14.5 16.5v-9l5 3.75-5 5.25" />
              <path d="M2 16.5h20" />
            </svg>
          </div>
          <div>
            <div className={cn(
              "text-xl font-bold", 
              isDark ? "text-white" : "text-gray-800"
            )}>
              {agentStats.error}
            </div>
            <div className={cn(
              "text-xs", 
              isDark ? "text-flow-foreground/70" : "text-gray-600"
            )}>
              Error State
            </div>
          </div>
          <Badge className={cn(
            "ml-auto text-xs",
            isDark ? "bg-red-500" : "bg-red-500"
          )}>
            Action Required
          </Badge>
        </GlassMorphism>
      </motion.div>
    </div>
  );
};

export default OfficeStatCards;
