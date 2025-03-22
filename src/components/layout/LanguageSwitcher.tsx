
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  // Since we've removed language switching functionality,
  // we'll just display English as the active language
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-1 neon-border"
      disabled
    >
      <Globe className="h-3.5 w-3.5" />
      <span className="text-xs">English</span>
    </Button>
  );
};

export default LanguageSwitcher;
