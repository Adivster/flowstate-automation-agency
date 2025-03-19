
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en');
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage}
      className="flex items-center gap-1 neon-border"
    >
      <Globe className="h-3.5 w-3.5" />
      <span className="text-xs">{language === 'en' ? 'עברית' : 'English'}</span>
    </Button>
  );
};

export default LanguageSwitcher;
