import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    agency: 'FlowState Agency',
    dashboard: 'Dashboard',
    agents: 'Agents',
    workflows: 'Workflows',
    knowledge: 'Knowledge',
    analytics: 'Analytics',
    settings: 'Settings',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    courses: 'Courses',
    flowStateBusinessAgency: 'FlowState Business Agency',
    performanceOverview: 'Performance Overview',
    agencyPerformance: 'Agency Performance',
    agencyAchievements: 'Agency Achievements',
    divisionDistribution: 'Division Distribution',
    taskCompletion: 'Task Completion',
    weeklyTaskOverview: 'Weekly Task Overview',
    systemStatus: 'System Status',
    serverLoad: 'Server Load',
    uptime: 'Uptime',
    activeAgents: 'Active Agents',
    efficiency: 'Efficiency',
    tasksCompleted: 'Tasks Completed',
    knowledgeBase: 'Knowledge Base',
    analyticsDivision: 'Analytics Division',
    operationsDivision: 'Operations Division',
    strategyDivision: 'Strategy Division',
    researchDivision: 'Research Division',
    agentLounge: 'Agent Lounge',
    monitorAgents: 'Monitor and manage your agency\'s AI agents',
    agencyHQ: 'Agency HQ',
    office: "Office",
    tasks: "Tasks",
    officeView: 'Office View',
    agentList: 'Agent List',
    systemMetrics: 'System Metrics',
    interactiveOffice: 'Interactive Office Map - Click on divisions and agents to learn more',
    proTip: 'PRO TIP:',
    openTerminal: 'Open the terminal with the button in the bottom right to run agency commands',
    allActiveAgents: 'All active agents in your organization',
    performanceMetrics: 'Performance Metrics',
    division: 'Division',
    working: 'Working',
    idle: 'Idle',
    paused: 'Paused',
    error: 'Error',
    lastActive: 'Last Active',
    pause: 'Pause',
    resume: 'Resume',
    activate: 'Activate',
    message: 'Message',
    details: 'Details',
    restart: 'Restart',
    searchAgents: 'Search agents...',
    noAgentsFound: 'No agents found matching your search criteria',
    clearSearch: 'Clear Search',
    agentActivity: 'Recent Activity',
    currentTasks: 'Current Tasks',
    agentDetails: 'Agent Details',
    version: 'Version',
    memory: 'Memory',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
