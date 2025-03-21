
import React, { createContext, useContext, ReactNode } from 'react';

// Translation dictionary
export const translations = {
  en: {
    // Common
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
    
    // Agents page
    agencyHQ: 'Agency HQ',
    monitorAgents: 'Monitor agent activities and manage divisions in your virtual office',
    activeAgents: 'Active Agents',
    officeView: 'Office View',
    agentList: 'Agent List',
    systemMetrics: 'System Metrics',
    interactiveOffice: 'Interactive office floor plan - click on divisions to view details',
    proTip: 'Pro tip:',
    openTerminal: 'Open the terminal with the button in the bottom right to run agency commands',
    openChat: 'Open Chat',
    allActiveAgents: 'All active agents within your agency',
    performanceMetrics: 'Performance metrics and agency achievements',
    courseDescription: 'Master AI agency management with our comprehensive courses',
    viewDetails: 'View Details',
    
    // Communication bot
    communicationBot: 'Communication Bot',
    online: 'Online',
    typeMessage: 'Type your message...',
    startConversation: 'Start a conversation',
    messagePlaceholder: 'What can I help you with?',
    
    // Divisions
    researchDivision: 'Research Division',
    researchDesc: 'Specialized in data collection and analysis',
    developmentDivision: 'Development Division',
    developmentDesc: 'Builds and deploys AI solutions',
    strategyDivision: 'Strategy Division',
    strategyDesc: 'Plans and coordinates agency efforts',
    securityDivision: 'Security Division',
    securityDesc: 'Ensures data privacy and security compliance',
    knowledgeBase: 'Knowledge Base',
    knowledgeBaseDesc: 'Manages and organizes information resources',
    analyticsDivision: 'Analytics Division',
    analyticsDesc: 'Processes data and generates insights',
    operationsDivision: 'Operations Division',
    operationsDesc: 'Oversees day-to-day functioning of the agency',
    loungeName: 'Agents Lounge',
    loungeDesc: 'Relaxation area for idle agents',
    
    // Agent statuses
    working: 'Working',
    idle: 'Idle',
    paused: 'Paused',
    error: 'Error',
    
    // Terminal
    commandTerminal: 'Command Terminal',
    enterCommand: 'Enter command...',
    execute: 'Execute',
    terminalWelcome: 'Welcome to the Agency Command Interface',
    availableCommands: 'Available commands:',
    
    // Metrics
    completedTasks: 'Completed Tasks',
    pendingTasks: 'Pending Tasks',
    activeTasks: 'Active Tasks',
    systemHealth: 'System Health',
    
    // Division performance
    divisionPerformance: 'Division Performance',
    taskCompletion: 'Task Completion Rate',
    resourceUtilization: 'Resource Utilization',
    efficiency: 'Efficiency',
    
    // Agent performance
    agentPerformance: 'Agent Performance',
    tasksCompleted: 'Tasks Completed',
    averageResponseTime: 'Average Response Time',
    errorRate: 'Error Rate',
    uptime: 'Uptime',
  }
};

// Context type
type LanguageContextType = {
  t: (key: keyof typeof translations.en) => string;
};

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // Translation function
  const t = (key: keyof typeof translations.en): string => {
    return translations.en[key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
