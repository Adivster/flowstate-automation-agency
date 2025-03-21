
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Supported languages
export type Language = 'en' | 'he';

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
  },
  he: {
    // Common - Hebrew translations with improved natural phrasing
    agency: 'סוכנות פלואוסטייט',
    dashboard: 'לוח בקרה',
    agents: 'סוכנים',
    workflows: 'תהליכי עבודה',
    knowledge: 'מאגר ידע',
    analytics: 'ניתוח נתונים',
    settings: 'הגדרות',
    darkMode: 'מצב כהה',
    lightMode: 'מצב בהיר',
    courses: 'קורסים',
    
    // Agents page
    agencyHQ: 'מטה הסוכנות',
    monitorAgents: 'מעקב אחר פעילות הסוכנים וניהול המחלקות במשרד הווירטואלי שלך',
    activeAgents: 'סוכנים פעילים',
    officeView: 'מבט משרד',
    agentList: 'רשימת סוכנים',
    systemMetrics: 'מדדי מערכת',
    interactiveOffice: 'תרשים קומה אינטראקטיבי - לחץ על המחלקות להצגת פרטים נוספים',
    proTip: 'טיפ מקצועי:',
    openTerminal: 'פתח את המסוף בעזרת הכפתור בפינה השמאלית התחתונה כדי להפעיל פקודות',
    openChat: 'פתח צ\'אט',
    allActiveAgents: 'כל הסוכנים הפעילים בסוכנות שלך',
    performanceMetrics: 'מדדי ביצועים והישגי הסוכנות',
    courseDescription: 'למד ניהול סוכנות AI עם הקורסים המקיפים שלנו',
    viewDetails: 'צפה בפרטים',
    
    // Communication bot
    communicationBot: 'בוט תקשורת',
    online: 'מקוון',
    typeMessage: 'הקלד את הודעתך...',
    startConversation: 'התחל שיחה',
    messagePlaceholder: 'במה אוכל לעזור לך?',
    
    // Divisions
    researchDivision: 'מחלקת מחקר',
    researchDesc: 'מתמחה באיסוף וניתוח נתונים',
    developmentDivision: 'מחלקת פיתוח',
    developmentDesc: 'בונה ומטמיעה פתרונות בינה מלאכותית',
    strategyDivision: 'מחלקת אסטרטגיה',
    strategyDesc: 'מתכננת ומתאמת את מאמצי הסוכנות',
    securityDivision: 'מחלקת אבטחה',
    securityDesc: 'מבטיחה פרטיות נתונים ותאימות לתקני אבטחה',
    knowledgeBase: 'מאגר ידע',
    knowledgeBaseDesc: 'מנהל ומארגן משאבי מידע',
    analyticsDivision: 'מחלקת אנליטיקה',
    analyticsDesc: 'מעבדת נתונים ומפיקה תובנות',
    operationsDivision: 'מחלקת תפעול',
    operationsDesc: 'מפקחת על הפעילות היומיומית של הסוכנות',
    loungeName: 'מרחב המנוחה',
    loungeDesc: 'אזור רגיעה לסוכנים פנויים',
    
    // Agent statuses
    working: 'עובד',
    idle: 'פנוי',
    paused: 'מושהה',
    error: 'שגיאה',
    
    // Terminal
    commandTerminal: 'מסוף פקודות',
    enterCommand: 'הקלד פקודה...',
    execute: 'הפעל',
    terminalWelcome: 'ברוכים הבאים לממשק הפקודות של הסוכנות',
    availableCommands: 'פקודות זמינות:',
    
    // Metrics
    completedTasks: 'משימות שהושלמו',
    pendingTasks: 'משימות ממתינות',
    activeTasks: 'משימות פעילות',
    systemHealth: 'בריאות המערכת',
    
    // Division performance
    divisionPerformance: 'ביצועי המחלקה',
    taskCompletion: 'שיעור השלמת משימות',
    resourceUtilization: 'ניצול משאבים',
    efficiency: 'יעילות',
    
    // Agent performance
    agentPerformance: 'ביצועי סוכן',
    tasksCompleted: 'משימות שהושלמו',
    averageResponseTime: 'זמן תגובה ממוצע',
    errorRate: 'שיעור שגיאות',
    uptime: 'זמן פעילות',
  }
};

// Context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
  isRTL: boolean;
};

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  const isRTL = language === 'he';
  
  // Translation function
  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
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
