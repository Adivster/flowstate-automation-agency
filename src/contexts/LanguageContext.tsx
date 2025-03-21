
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
    
    // Divisions
    researchDivision: 'Research Division',
    researchDesc: 'Specialized in data collection and analysis',
    developmentDivision: 'Development Division',
    developmentDesc: 'Builds and deploys AI solutions',
    strategyDivision: 'Strategy Division',
    strategyDesc: 'Plans and coordinates agency efforts',
    securityDivision: 'Security Division',
    securityDesc: 'Ensures data privacy and security compliance',
    
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
  },
  he: {
    // Common - Hebrew translations
    agency: 'סוכנות פלואוסטייט',
    dashboard: 'לוח בקרה',
    agents: 'סוכנים',
    workflows: 'זרימות עבודה',
    knowledge: 'מאגר ידע',
    analytics: 'ניתוח נתונים',
    settings: 'הגדרות',
    darkMode: 'מצב כהה',
    lightMode: 'מצב בהיר',
    courses: 'קורסים',
    
    // Agents page
    agencyHQ: 'מטה הסוכנות',
    monitorAgents: 'עקוב אחר פעילות הסוכנים ונהל מחלקות במשרד הווירטואלי שלך',
    activeAgents: 'סוכנים פעילים',
    officeView: 'תצוגת משרד',
    agentList: 'רשימת סוכנים',
    systemMetrics: 'נתוני מערכת',
    interactiveOffice: 'תוכנית קומה אינטראקטיבית - לחץ על מחלקות להצגת פרטים',
    proTip: 'טיפ מקצועי:',
    openTerminal: 'פתח את המסוף באמצעות הלחצן בפינה הימנית התחתונה כדי להפעיל פקודות',
    openChat: 'פתח צ\'אט',
    allActiveAgents: 'כל הסוכנים הפעילים בסוכנות שלך',
    performanceMetrics: 'מדדי ביצועים והישגי הסוכנות',
    courseDescription: 'שלוט בניהול סוכנות AI עם הקורסים המקיפים שלנו',
    viewDetails: 'הצג פרטים',
    
    // Communication bot
    communicationBot: 'בוט תקשורת',
    online: 'מקוון',
    typeMessage: 'הקלד את ההודעה שלך...',
    startConversation: 'התחל שיחה',
    
    // Divisions
    researchDivision: 'מחלקת מחקר',
    researchDesc: 'מתמחה באיסוף וניתוח נתונים',
    developmentDivision: 'מחלקת פיתוח',
    developmentDesc: 'בונה ומפעילה פתרונות בינה מלאכותית',
    strategyDivision: 'מחלקת אסטרטגיה',
    strategyDesc: 'מתכננת ומתאמת מאמצי הסוכנות',
    securityDivision: 'מחלקת אבטחה',
    securityDesc: 'מבטיחה פרטיות נתונים ותאימות אבטחה',
    
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
