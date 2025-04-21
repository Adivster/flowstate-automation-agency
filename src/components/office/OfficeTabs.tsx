
import { useTheme } from 'next-themes';
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AgentGrid from '@/components/agents/AgentGrid';
import AgencyMetrics from '@/components/agents/AgencyMetrics';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { SolarpunkPanel } from '@/components/ui/design-system/SolarpunkPanel';
import { TaskProvider } from '@/contexts/TaskContext';
import OfficeFloorPlan from '@/components/agents/OfficeFloorPlan';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VisualizationState } from '@/components/agents/office/types/visualizationTypes';

interface OfficeTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleActionClick: (action: string) => void;
  handleHotspotAction: (action: string, entityId: string, entityType: string) => void;
  handleAgentFloorClick: (agentId: number) => void;
  visualizationState: VisualizationState;
  zoomLevel: number;
  isDark: boolean;
}

const OfficeTabs = ({
  activeTab,
  setActiveTab,
  handleActionClick,
  handleHotspotAction,
  handleAgentFloorClick,
  visualizationState,
  zoomLevel,
  isDark
}: OfficeTabsProps) => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <SolarpunkPanel 
      accentColor={isDark ? "blue" : "green"} 
      className={cn(
        "overflow-hidden hover-scale",
        isDark 
          ? "border-[1px] border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]" 
          : "border-[1px] border-emerald-400/70 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
      )}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 p-6">
        <TabsList className={cn(
          "grid w-full max-w-md grid-cols-3",
          isDark 
            ? "bg-flow-background/30 border border-flow-border/50" 
            : "bg-white/60 border border-emerald-200"
        )}>
          <TabsTrigger 
            value="office" 
            className={cn(
              "flex items-center gap-2",
              isDark
                ? "data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
                : "data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=inactive]:text-emerald-700"
            )}
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
              <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
            </svg>
            <span className="hidden sm:inline">{t('officeView')}</span>
          </TabsTrigger>
          <TabsTrigger 
            value="agents" 
            className={cn(
              "flex items-center gap-2",
              isDark
                ? "data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
                : "data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=inactive]:text-emerald-700"
            )}
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
            <span className="hidden sm:inline">{t('agentList')}</span>
          </TabsTrigger>
          <TabsTrigger 
            value="metrics" 
            className={cn(
              "flex items-center gap-2",
              isDark
                ? "data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
                : "data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=inactive]:text-emerald-700"
            )}
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
            <span className="hidden sm:inline">{t('systemMetrics')}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="office" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm mb-4">
            <div className={cn(
              "flex items-center", 
              isDark ? "text-flow-foreground/60" : "text-gray-600"
            )}>
              {isDark 
                ? <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2 text-flow-accent"
                  >
                    <path d="M13 2H9a2 2 0 0 0-2 2v5h9V4a2 2 0 0 0-2-2Z" />
                    <path d="M18 5h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-1" />
                    <path d="M5 5H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h1" />
                    <path d="M3 12h18" />
                    <path d="m6 19-2 3" />
                    <path d="m18 22-2-3" />
                    <path d="M10 22h4" />
                  </svg>
                : <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2 text-emerald-600"
                  >
                    <path d="M2 22c1.25-1.25 2.5-2.5 3.75-2.5 1.25 0 1.25 2.5 2.5 2.5s1.25-2.5 2.5-2.5 1.25 2.5 2.5 2.5 1.25-2.5 2.5-2.5 1.25 2.5 2.5 2.5 1.25-2.5 2.5-2.5 1.25 2.5 3.75 1.25" />
                    <path d="M19 16c.8-.8 1.9-.8 2.5-.3a8.02 8.02 0 0 0-6.132-12.669A8.1 8.1 0 0 0 9 5.1a8.08 8.08 0 0 0-6.978 6.959 8 8 0 0 0 .274 3.334c.15.54.398 1.189.573 1.607.313.742.687 1.219 1.13 1.5.443.282.956.394 1.71.3.772-.095 1.543-.558 2.297-1.3.279-.276.613-.329 1.009-.172.395.157.605.406.694.72.089.313.13.678.041 1.085-.178.815-.377 1.203-.297 1.762.08.56.378 1.199 1.046 1.057.669-.142 1.93-1.851 2.046-2.318.117-.467-.299-.897-.63-1.323-.33-.426-.564-.845-.564-1.18s.526-.795.985-.993c.458-.198 1.074-.395 1.664-.734s1.051-.94 1.2-1.404c.15-.464.15-.824.15-.824" />
                    <path d="M14.41 5.47a5 5 0 0 0-7.94 6.07" />
                  </svg>
              }
              {isDark 
                ? t('interactiveOffice')
                : "Navigate your sustainable digital workspace"
              }
            </div>
          </div>
          
          <div className={cn(
            "min-h-[550px] h-[550px] relative",
            isDark 
              ? "bg-black/40 rounded-xl backdrop-blur-sm overflow-hidden border border-purple-500/20" 
              : "bg-white/10 rounded-xl backdrop-blur-sm overflow-hidden border border-emerald-300/30"
          )}
            style={{ 
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center',
              transition: 'transform 0.3s ease-out'
            }}
          >
            <TaskProvider>
              <OfficeFloorPlan 
                visualizationState={visualizationState}
                onHotspotAction={handleHotspotAction}
                onAgentClick={handleAgentFloorClick}
                hideTopControls={true}
              />
            </TaskProvider>
          </div>
          
          <div className="flex justify-end items-center mt-2">
            <div className={cn(
              "text-xs px-3 py-1.5 backdrop-blur-sm rounded-full border animate-pulse-subtle",
              isDark 
                ? "bg-flow-background/30 border-flow-accent/30 text-flow-foreground/60" 
                : "bg-emerald-50/60 border-emerald-300/50 text-emerald-800"
            )}>
              <span className={isDark ? "text-flow-accent" : "text-emerald-600"}>
                {t('proTip')}
              </span>{" "}
              Press <kbd className="font-mono px-1 py-0.5 text-[10px] bg-black/20 rounded">Ctrl+Space</kbd> to open the command terminal
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="agents" className="space-y-6">
          <div className={cn(
            "h-[60vh] overflow-y-auto pr-1 custom-scrollbar",
            isDark 
              ? "scrollbar-dark" 
              : "scrollbar-light"
          )}>
            <AgentGrid />
          </div>
          
          <div className="flex justify-center mt-4">
            <Button 
              variant={isDark ? "cyberpunk" : "eco"}
              onClick={() => handleActionClick('deploy-agent')}
            >
              {isDark 
                ? <svg
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
                    <path d="M13 2H9a2 2 0 0 0-2 2v5h9V4a2 2 0 0 0-2-2Z" />
                    <path d="M18 5h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-1" />
                    <path d="M5 5H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h1" />
                    <path d="M3 12h18" />
                    <path d="m6 19-2 3" />
                    <path d="m18 22-2-3" />
                    <path d="M10 22h4" />
                  </svg>
                : <svg
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
                    <path d="M2 22c1.25-1.25 2.5-2.5 3.75-2.5 1.25 0 1.25 2.5 2.5 2.5s1.25-2.5 2.5-2.5 1.25 2.5 2.5 2.5 1.25-2.5 2.5-2.5 1.25 2.5 2.5 2.5 1.25-2.5 2.5-2.5 1.25 2.5 3.75 1.25" />
                    <path d="M19 16c.8-.8 1.9-.8 2.5-.3a8.02 8.02 0 0 0-6.132-12.669A8.1 8.1 0 0 0 9 5.1a8.08 8.08 0 0 0-6.978 6.959 8 8 0 0 0 .274 3.334c.15.54.398 1.189.573 1.607.313.742.687 1.219 1.13 1.5.443.282.956.394 1.71.3.772-.095 1.543-.558 2.297-1.3.279-.276.613-.329 1.009-.172.395.157.605.406.694.72.089.313.13.678.041 1.085-.178.815-.377 1.203-.297 1.762.08.56.378 1.199 1.046 1.057.669-.142 1.93-1.851 2.046-2.318.117-.467-.299-.897-.63-1.323-.33-.426-.564-.845-.564-1.18s.526-.795.985-.993c.458-.198 1.074-.395 1.664-.734s1.051-.94 1.2-1.404c.15-.464.15-.824.15-.824" />
                    <path d="M14.41 5.47a5 5 0 0 0-7.94 6.07" />
                  </svg>
              }
              Deploy New Agent
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="metrics" className="space-y-6">
          <GlassMorphism 
            intensity="low" 
            className={cn(
              "p-4 rounded-xl mb-4",
              isDark 
                ? "border-flow-border/30" 
                : "border-emerald-200"
            )}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm">
              <div className={cn(
                "flex items-center",
                isDark ? "text-flow-foreground/70" : "text-gray-600"
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
                    "h-4 w-4 mr-2",
                    isDark ? "text-cyan-400" : "text-cyan-600"
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
                {t('performanceMetrics')}
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-0">
                <Select defaultValue="7d">
                  <SelectTrigger className={cn(
                    "w-[140px] h-8 text-xs",
                    isDark 
                      ? "bg-flow-background/30 border-flow-border/50" 
                      : "bg-white/50 border-emerald-200"
                  )}>
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent className={cn(
                    isDark 
                      ? "bg-flow-background/90 backdrop-blur-md border-flow-border" 
                      : "bg-white/90 backdrop-blur-md border-emerald-200"
                  )}>
                    <SelectItem value="24h">Last 24 Hours</SelectItem>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </GlassMorphism>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-gray-200/20 p-4">
            <AgencyMetrics />
          </div>
        </TabsContent>
      </Tabs>
    </SolarpunkPanel>
  );
};

export default OfficeTabs;
